import {useCallback, useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {
  FaceLivenessDetectorCore,
  type AwsCredentialProvider,
} from "@aws-amplify/ui-react-liveness";
import "@aws-amplify/ui-react/styles.css";
import {Button} from "@/components/ui/button";
import {
  fetchLivenessCredentials,
  type LivenessCredentials,
} from "@/api/faceLiveness";

/**
 * Embedded in the FastMet client app's webview (app/(auth)/face-verification).
 * The app creates the liveness session and passes its ID in the URL; this
 * page asks for consent, runs the AWS Face Liveness check, and posts the
 * outcome back to the app, which then asks the backend for the result.
 */

type AppMessage =
  | {type: "complete"}
  | {type: "cancel"}
  | {type: "error"; message: string};

declare global {
  interface Window {
    ReactNativeWebView?: {postMessage: (message: string) => void};
  }
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function postToApp(message: AppMessage) {
  window.ReactNativeWebView?.postMessage(JSON.stringify(message));
}

// ErrorState values from @aws-amplify/ui-react-liveness.
const ERROR_MESSAGES: Record<string, string> = {
  CAMERA_ACCESS_ERROR:
    "We couldn't access your camera. Allow camera access for FastMet and try again.",
  CAMERA_FRAMERATE_ERROR:
    "Your camera isn't working well enough for the scan. Please try again.",
  TIMEOUT: "The scan timed out. Keep your face inside the oval and try again.",
  FACE_DISTANCE_ERROR:
    "Hold your phone at arm's length before the scan starts, then try again.",
  MULTIPLE_FACES_ERROR: "Make sure only your face is in view, then try again.",
  CONNECTION_TIMEOUT:
    "Your connection is too slow for the scan. Please try again on a better connection.",
  MOBILE_LANDSCAPE_ERROR: "Hold your phone upright and try again.",
};

const DEFAULT_ERROR = "The face scan stopped. Please try again.";

export default function FaceVerificationAppView() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId") ?? "";
  const validSession = UUID_RE.test(sessionId);

  const [credentials, setCredentials] = useState<LivenessCredentials | null>(
    null,
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const credentialsRef = useRef<LivenessCredentials | null>(null);

  // Credentials are fetched before the check starts (also gives the region)
  // and reused until shortly before they expire; the backend caps how many
  // times one session can ask.
  const loadCredentials = useCallback(async () => {
    const current = credentialsRef.current;
    if (current && current.expiration.getTime() - Date.now() > 60_000) {
      return current;
    }
    const fresh = await fetchLivenessCredentials(sessionId);
    credentialsRef.current = fresh;
    return fresh;
  }, [sessionId]);

  useEffect(() => {
    if (!validSession) return;
    loadCredentials()
      .then(setCredentials)
      .catch((err: Error) => setLoadError(err.message || DEFAULT_ERROR));
  }, [validSession, loadCredentials]);

  const credentialProvider: AwsCredentialProvider = useCallback(async () => {
    const c = await loadCredentials();
    return {
      accessKeyId: c.accessKeyId,
      secretAccessKey: c.secretAccessKey,
      sessionToken: c.sessionToken,
      expiration: c.expiration,
    };
  }, [loadCredentials]);

  const head = (
    <Helmet>
      <title>Face Verification | FastMet</title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
    </Helmet>
  );

  if (!validSession || !window.ReactNativeWebView) {
    return (
      <Centered>
        {head}
        <h1 className="text-xl font-bold text-secondary">Open the FastMet app</h1>
        <p className="mt-2 text-sm text-gray-600">
          Face verification can only be completed inside the FastMet app.
        </p>
      </Centered>
    );
  }

  if (loadError) {
    return (
      <Centered>
        {head}
        <h1 className="text-xl font-bold text-secondary">
          Couldn&apos;t start the scan
        </h1>
        <p className="mt-2 text-sm text-gray-600">{loadError}</p>
        <Button
          className="mt-6 w-full"
          size="lg"
          onClick={() => postToApp({type: "error", message: loadError})}
        >
          Go back
        </Button>
      </Centered>
    );
  }

  if (done) {
    return (
      <Centered>
        {head}
        <div className="mx-auto mb-4 size-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm text-gray-600">Checking your scan...</p>
      </Centered>
    );
  }

  if (!started) {
    return (
      <main className="flex flex-col px-4 py-6 min-h-screen bg-white">
        {head}
        <h1 className="text-xl font-bold text-secondary">
          Before we scan your face
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-700">
          FastMet uses a live face scan to make sure every account belongs to a
          real, unique person. During the scan:
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-700 list-disc pl-5">
          <li>
            Your camera checks that you are physically present. The video is
            analyzed in real time and is not stored by FastMet.
          </li>
          <li>
            We keep one photo of your face and a face template (numbers that
            describe your facial features and can&apos;t be turned back into a
            photo).
          </li>
          <li>
            Your face template is compared with other FastMet user accounts to
            detect duplicate or previously banned accounts. A close match is
            reviewed by a FastMet administrator.
          </li>
          <li>
            The check is processed by Amazon Web Services (Amazon Rekognition),
            and your photo is stored securely with Cloudinary.
          </li>
          <li>
            Your face data is deleted when you delete your account, unless the
            account was banned or not approved, in which case it is kept to
            prevent repeat fraudulent sign-ups.
          </li>
        </ul>
        <p className="mt-3 text-sm leading-6 text-gray-700">
          Read more in Section 2.D of the FastMet User Privacy Policy, available
          in the app and at fastmet.com.ph/legal/privacy-policy/user.
        </p>

        <label className="flex gap-3 items-start p-4 mt-6 rounded-lg border border-gray-200 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-[var(--color-primary)]"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span className="text-sm leading-6 text-gray-800">
            I agree to FastMet collecting and processing my face data for
            account verification and fraud prevention, as described above.
          </span>
        </label>

        <div className="flex flex-col gap-3 pt-6 mt-auto">
          <Button
            size="lg"
            className="w-full"
            disabled={!agreed || !credentials}
            onClick={() => setStarted(true)}
          >
            {credentials ? "Start face scan" : "Preparing..."}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full"
            onClick={() => postToApp({type: "cancel"})}
          >
            Not now
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {head}
      <FaceLivenessDetectorCore
        sessionId={sessionId}
        region={credentials!.region}
        disableStartScreen
        config={{credentialProvider}}
        onAnalysisComplete={async () => {
          setDone(true);
          postToApp({type: "complete"});
        }}
        onUserCancel={() => postToApp({type: "cancel"})}
        onError={(livenessError) => {
          postToApp({
            type: "error",
            message: ERROR_MESSAGES[livenessError.state] ?? DEFAULT_ERROR,
          });
        }}
      />
    </main>
  );
}

function Centered({children}: {children: React.ReactNode}) {
  return (
    <main className="flex flex-col justify-center items-center px-4 min-h-screen text-center bg-white">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
