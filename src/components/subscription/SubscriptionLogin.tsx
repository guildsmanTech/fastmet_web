import {useRef, useState} from "react";
import PhoneInput from "react-phone-input-2";
import ReCAPTCHA from "react-google-recaptcha";
import {Loader2, ShieldCheck} from "lucide-react";
import OTPModal from "@/components/modals/OTPModal";
import {Button} from "@/components/ui/button";
import {OtpCountdown} from "@/components/ui/OtpCountdown";
import {
  createWebSession,
  sendSubscriptionOtp,
  verifySubscriptionOtp,
} from "@/api/subscription";
import {formatPHNumber} from "@/helper/format";

type Props = {
  notice?: string;
  onLoggedIn: (token: string, expiresInSeconds: number, firstName: string) => void;
};

export default function SubscriptionLogin({notice, onLoggedIn}: Props) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sendRateLimit, setSendRateLimit] = useState<number | null>(null);
  const [otpOpen, setOtpOpen] = useState(false);
  // New key per OTP request so a reopened dialog never shows stale digits.
  const [otpSession, setOtpSession] = useState(0);

  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const normalizedPhone = phone.replace(/\D/g, "");

  const resetCaptcha = () => {
    captchaRef.current?.reset();
    setCaptchaValue(null);
  };

  const sendOtp = async (): Promise<{error?: string}> => {
    setError("");
    if (normalizedPhone.length < 12) {
      const message = "Enter a valid Philippine mobile number.";
      setError(message);
      return {error: message};
    }
    if (!captchaValue) {
      const message = "Please complete the captcha.";
      setError(message);
      return {error: message};
    }

    setSending(true);
    try {
      const result = await sendSubscriptionOtp(phone, captchaValue);
      // A captcha token is single-use, whatever the outcome.
      resetCaptcha();
      if (!result.ok) {
        if (result.status === 429) setSendRateLimit(result.retryAfter ?? 60);
        const message =
          result.data.error ||
          result.data.message ||
          "Failed to send OTP. Please try again.";
        setError(message);
        return {error: message};
      }
      setOtpSession((n) => n + 1);
      setOtpOpen(true);
      return {};
    } catch {
      resetCaptcha();
      const message = "Network error. Please try again.";
      setError(message);
      return {error: message};
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (code: string) => {
    try {
      const verified = await verifySubscriptionOtp(phone, code);
      if (!verified.ok || !verified.data.verifyToken) {
        if (verified.status === 429) {
          return {success: false, rateLimitSeconds: verified.retryAfter ?? 60};
        }
        return {
          success: false,
          error: verified.data.error || "Incorrect code. Try again.",
          locked: Boolean(verified.data.error?.includes("Too many failed")),
        };
      }

      const session = await createWebSession(verified.data.verifyToken);
      if (!session.ok || !session.data.token) {
        // The code was valid, so there is nothing to retype: close the dialog
        // and explain (not registered, not activated yet, ...).
        setOtpOpen(false);
        setError(
          session.data.message ||
            "We couldn't open your subscription page. Please try again.",
        );
        return {success: true};
      }

      onLoggedIn(
        session.data.token,
        session.data.expiresInSeconds ?? 7200,
        session.data.firstName ?? "",
      );
      setOtpOpen(false);
      return {success: true};
    } catch {
      return {success: false, error: "Network error. Please try again."};
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 md:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-center mb-4 size-12 mx-auto rounded-full bg-primary/10 text-primary">
        <ShieldCheck className="size-6" />
      </div>
      <h2 className="text-lg md:text-xl font-bold text-center text-secondary">
        Log in to manage your subscription
      </h2>
      <p className="mt-2 text-xs md:text-sm text-center text-gray-600">
        Enter the mobile number of your FastMet driver account. We will send a
        6-digit code by SMS.
      </p>

      {notice && (
        <p className="p-3 mt-4 text-xs md:text-sm text-amber-800 bg-amber-50 rounded-lg">
          {notice}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="p-3 mt-4 text-xs md:text-sm text-red-700 bg-red-50 rounded-lg"
        >
          {error}
        </p>
      )}

      <form
        className="flex flex-col items-center gap-4 mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          void sendOtp();
        }}
      >
        <div className="w-full">
          <label className="block mb-2 text-sm font-semibold text-gray-900">
            Mobile number
          </label>
          <PhoneInput
            country="ph"
            value={phone}
            onChange={setPhone}
            inputProps={{
              maxLength: 15,
              onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
                e.preventDefault();
                setPhone(formatPHNumber(e.clipboardData.getData("Text")));
              },
            }}
            onlyCountries={["ph"]}
            countryCodeEditable={false}
            disableDropdown
            containerClass="!w-full"
            inputClass="!w-full !py-2.5 !px-12 !rounded-lg !text-sm !h-auto !border-gray-300"
            buttonClass="!border !border-gray-300 !rounded-l-lg !bg-white"
          />
        </div>

        <div className="max-w-full overflow-x-auto">
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={setCaptchaValue}
            onExpired={() => setCaptchaValue(null)}
            theme="light"
          />
        </div>

        <Button
          type="submit"
          disabled={
            sending ||
            sendRateLimit !== null ||
            normalizedPhone.length < 12 ||
            !captchaValue
          }
          className="w-full py-5 text-white cursor-pointer"
        >
          {sending ? (
            <span className="flex gap-2 items-center">
              <Loader2 className="animate-spin size-4" />
              Sending code…
            </span>
          ) : sendRateLimit !== null ? (
            <OtpCountdown
              seconds={sendRateLimit}
              label="Try again in {s}s"
              onDone={() => setSendRateLimit(null)}
            />
          ) : (
            "Send OTP"
          )}
        </Button>
      </form>

      <OTPModal
        key={otpSession}
        open={otpOpen}
        onOpenChange={setOtpOpen}
        phone={phone}
        verifyButtonLabel="Verify"
        onVerifySuccess={() => undefined}
        onVerify={handleVerify}
        onResend={async () => {
          // Resending needs a fresh captcha: close the dialog so it can be solved.
          setOtpOpen(false);
          const message = "Please complete the captcha to get a new code.";
          setError(message);
          return {error: message};
        }}
      />
    </div>
  );
}
