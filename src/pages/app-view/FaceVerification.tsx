import {useCallback, useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {
  FaceLivenessDetectorCore,
  type AwsCredentialProvider,
} from "@aws-amplify/ui-react-liveness";
import "@aws-amplify/ui-react/styles.css";
import {
  Camera,
  CircleAlert,
  Fingerprint,
  LoaderCircle,
  ScanFace,
  Server,
  ShieldCheck,
  Smartphone,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
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
  | {type: "error"; code: string; message: string};

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

// getUserMedia only exists in a secure context (HTTPS or localhost). Over
// plain HTTP the webview never asks for the camera, and Amplify fails with
// CAMERA_ACCESS_ERROR, so check up front and say so clearly.
const CAMERA_UNAVAILABLE = "CAMERA_UNAVAILABLE";
const LOAD_ERROR = "LOAD_ERROR";

function cameraSupported() {
  return window.isSecureContext && !!navigator.mediaDevices?.getUserMedia;
}

const CONSENT_POINTS: {icon: LucideIcon; title: string; body: string}[] = [
  {
    icon: Camera,
    title: "Live presence check",
    body: "Your camera checks that you are physically present. The video is analyzed in real time and is not stored by FastMet.",
  },
  {
    icon: Fingerprint,
    title: "What we keep",
    body: "We keep one photo of your face and a face template (numbers that describe your facial features and can't be turned back into a photo).",
  },
  {
    icon: Users,
    title: "Duplicate account check",
    body: "Your face template is compared with other FastMet user accounts to detect duplicate or previously banned accounts. A close match is reviewed by a FastMet administrator.",
  },
  {
    icon: Server,
    title: "Who processes it",
    body: "The check is processed by Amazon Web Services (Amazon Rekognition), and your photo is stored securely with Cloudinary.",
  },
  {
    icon: Trash2,
    title: "How long it's kept",
    body: "Your face data is deleted when you delete your account. If your account is banned for violating our Terms, it is kept for up to 3 years from the ban to stop the same person from signing up again.",
  },
];

// Large touch targets for the app webview. Disabled primary drops to gray
// instead of faded orange so it clearly reads as not yet tappable.
const PRIMARY_BUTTON =
  "w-full h-12 rounded-xl text-base font-semibold bg-primary text-white shadow-md shadow-primary/30 hover:bg-primary-hover active:scale-[0.98] disabled:opacity-100 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none [&_svg:not([class*='size-'])]:size-5";
const GHOST_BUTTON =
  "w-full h-12 rounded-xl text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-secondary";

export default function FaceVerificationAppView() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId") ?? "";
  const validSession = UUID_RE.test(sessionId);

  const [credentials, setCredentials] = useState<LivenessCredentials | null>(
    null,
  );
  const [failure, setFailure] = useState<string | null>(null);
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

  // The app shows its own error screen as soon as it gets the message; the
  // local one only covers the moment before the webview closes.
  const fail = useCallback((code: string, message: string) => {
    setFailure(message);
    postToApp({type: "error", code, message});
  }, []);

  useEffect(() => {
    if (!validSession) return;
    loadCredentials()
      .then(setCredentials)
      .catch((err: Error) => fail(LOAD_ERROR, err.message || DEFAULT_ERROR));
  }, [validSession, loadCredentials, fail]);

  const onStart = () => {
    if (!cameraSupported()) {
      fail(
        CAMERA_UNAVAILABLE,
        "Your camera can't be used on this connection. Please update the FastMet app or try again later.",
      );
      return;
    }
    setStarted(true);
  };

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
        <StatusIcon tone="neutral">
          <Smartphone className="size-7" />
        </StatusIcon>
        <h1 className="text-xl font-bold text-secondary">
          Open the FastMet app
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Face verification can only be completed inside the FastMet app.
        </p>
      </Centered>
    );
  }

  if (failure) {
    return (
      <Centered>
        {head}
        <StatusIcon tone="error">
          <CircleAlert className="size-7" />
        </StatusIcon>
        <h1 className="text-xl font-bold text-secondary">
          The scan didn&apos;t work
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">{failure}</p>
      </Centered>
    );
  }

  if (done) {
    return (
      <Centered>
        {head}
        <StatusIcon tone="primary">
          <LoaderCircle className="size-7 animate-spin" />
        </StatusIcon>
        <h1 className="text-lg font-bold text-secondary">Checking your scan</h1>
        <p className="mt-2 text-sm text-gray-600">
          This only takes a moment. Please keep this screen open.
        </p>
      </Centered>
    );
  }

  if (!started) {
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        {head}
        <div className="flex-1 px-4 pt-8 pb-6">
          <div className="flex flex-col items-center text-center">
            <StatusIcon tone="primary">
              <ScanFace className="size-8" />
            </StatusIcon>
            <h1 className="text-xl font-bold text-secondary">
              Before we scan your face
            </h1>
            <p className="max-w-sm mt-2 text-sm leading-6 text-gray-600">
              FastMet uses a live face scan to make sure every account belongs
              to a real, unique person. During the scan:
            </p>
          </div>

          <ul className="mt-6 overflow-hidden bg-white border border-gray-200 divide-y divide-gray-100 rounded-xl">
            {CONSENT_POINTS.map(({icon: Icon, title, body}) => (
              <li key={title} className="flex gap-3 p-4">
                <span className="flex items-center justify-center rounded-full shrink-0 size-9 bg-primary/10 text-primary-hover">
                  <Icon className="size-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-secondary">
                    {title}
                  </p>
                  <p className="mt-0.5 text-sm leading-6 text-gray-600">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="flex gap-2 mt-4 text-xs leading-5 text-gray-500">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" />
            <span>
              Read more in Section 2.D of the FastMet User Privacy Policy,
              available in the app and at{" "}
              <span className="font-medium text-gray-700">
                fastmet.com.ph/legal/privacy-policy/user
              </span>
              .
            </span>
          </p>

          <label
            className={cn(
              "flex items-start gap-3 p-4 mt-6 border rounded-xl cursor-pointer transition-colors",
              agreed
                ? "border-primary bg-primary/5"
                : "border-gray-200 bg-white",
            )}
          >
            <input
              type="checkbox"
              className="mt-1 size-4 shrink-0 accent-white"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="text-sm leading-6 text-gray-800">
              I agree to FastMet collecting and processing my face data for
              account verification and fraud prevention, as described above.
            </span>
          </label>
        </div>

        <div className="sticky bottom-0 flex flex-col gap-2 px-4 pt-3 bg-white border-t border-gray-200">
          <Button
            className={PRIMARY_BUTTON}
            disabled={!agreed || !credentials}
            onClick={onStart}
          >
            {credentials ? (
              <>
                <ScanFace />
                Start face scan
              </>
            ) : (
              <>
                <LoaderCircle className="animate-spin" />
                Preparing...
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className={GHOST_BUTTON}
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
        onError={(livenessError) =>
          fail(
            livenessError.state,
            ERROR_MESSAGES[livenessError.state] ?? DEFAULT_ERROR,
          )
        }
      />
    </main>
  );
}

function Centered({children}: {children: React.ReactNode}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
      <div className="flex flex-col items-center w-full max-w-sm">
        {children}
      </div>
    </main>
  );
}

const TONES = {
  primary: "bg-primary/15 text-primary-hover",
  error: "bg-red-50 text-red-500",
  neutral: "bg-gray-100 text-secondary",
};

function StatusIcon({
  tone,
  children,
}: {
  tone: keyof typeof TONES;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mb-4 flex size-16 items-center justify-center rounded-full ${TONES[tone]}`}
    >
      {children}
    </div>
  );
}
