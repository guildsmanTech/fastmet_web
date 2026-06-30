import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { OtpCountdown } from "@/components/ui/OtpCountdown";

interface OTPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string;
  onVerifySuccess: () => void;
  onResend: () => Promise<void>;
  onVerify: (code: string) => Promise<{
    success: boolean;
    error?: string;
    rateLimitSeconds?: number;
    locked?: boolean;
  }>;
  onClose?: () => void;
}

export default function OTPModal({
  open,
  onOpenChange,
  phone,
  onVerifySuccess,
  onResend,
  onVerify,
  onClose,
}: OTPModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [resendCooldown, setResendCooldown] = useState<number | null>(null);
  const [verifyRateLimit, setVerifyRateLimit] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const reset = () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setResendCooldown(null);
    setVerifyRateLimit(null);
    setIsLocked(false);
  };

  const handleOtpInput = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      otpRefs.current[index - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setOtpError("Enter all 6 digits");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    const result = await onVerify(code);

    if (result.success) {
      reset();
      onVerifySuccess();
    } else if (result.rateLimitSeconds) {
      setVerifyRateLimit(result.rateLimitSeconds);
    } else if (result.locked) {
      setIsLocked(true);
      setOtpError(
        result.error ?? "Too many failed attempts. Please request a new OTP.",
      );
    } else {
      setOtpError(result.error ?? "Incorrect code. Try again.");
    }

    setOtpLoading(false);
  };

  const handleResend = async () => {
    setOtpLoading(true);
    setOtpError("");
    await onResend();
    setResendCooldown(60);
    reset();
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
    setOtpLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !isLocked) return;
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-xs gap-6 rounded-2xl"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Verify your number</DialogTitle>
          <DialogDescription>
            6-digit code sent to{" "}
            <span className="font-semibold text-foreground">+{phone}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                otpRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpInput(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              className={`
                w-10 h-12 text-center text-lg font-bold border-2 rounded-xl
                focus:outline-none transition-colors focus:border-primary
                ${digit ? "border-primary text-primary" : "border-gray-300 text-gray-900"}
              `}
            />
          ))}
        </div>

        {otpError && (
          <p className="text-red-500 text-xs text-center">{otpError}</p>
        )}

        {verifyRateLimit !== null ? (
          <Button
            type="button"
            disabled
            className="w-full py-6 text-white cursor-not-allowed"
          >
            <OtpCountdown
              seconds={verifyRateLimit}
              label="Try again in {s}s"
              onDone={() => setVerifyRateLimit(null)}
            />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleVerify}
            disabled={otpLoading || otp.join("").length < 6 || isLocked}
            className="w-full py-6 text-white cursor-pointer"
          >
            {otpLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Verifying…
              </span>
            ) : (
              "Verify & Complete Registration"
            )}
          </Button>
        )}

        {isLocked ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="w-full cursor-pointer"
          >
            Cancel &amp; start over
          </Button>
        ) : (
          <p className="text-xs text-center text-muted-foreground">
            Didn't receive a code?{" "}
            {resendCooldown !== null ? (
              <span className="text-primary font-semibold text-xs">
                <OtpCountdown
                  seconds={resendCooldown}
                  label="Resend in {s}s"
                  onDone={() => setResendCooldown(null)}
                />
              </span>
            ) : (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={handleResend}
                disabled={otpLoading}
                className="text-primary p-0 h-auto font-semibold"
              >
                Resend OTP
              </Button>
            )}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
