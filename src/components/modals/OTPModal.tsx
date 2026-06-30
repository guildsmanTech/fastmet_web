import {useEffect, useRef, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {OtpCountdown} from "@/components/ui/OtpCountdown";

export function formatPHNumber(input: string) {
  if (!input) return "";

  // Strip non-digits
  let digits = input.replace(/\D/g, "");

  // Normalize to 0XXXXXXXXXX
  if (digits.startsWith("63")) {
    digits = "0" + digits.slice(2);
  } else if (digits.startsWith("9") && digits.length === 10) {
    digits = "0" + digits;
  }

  // Validate PH mobile format (11 digits starting with 09)
  if (!/^09\d{9}$/.test(digits)) {
    return input;
  }

  // Format: 0XXX-XXX-XXXX
  return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
}

interface OTPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string;
  onVerifySuccess: () => void;
  onResend: () => Promise<{ error?: string }>;
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

  // Start resend cooldown the moment the modal opens (OTP was just sent)
  useEffect(() => {
    if (open) {
      setResendCooldown(60);
    }
  }, [open]);

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
    const result = await onResend();
    if (result.error) {
      // Surface the error but keep the inputs and don't start a cooldown
      // so the user can try again or close and fix the issue
      setOtpError(result.error);
    } else {
      // Success: clear inputs first, then set cooldown so reset() can't wipe it
      setOtp(["", "", "", "", "", ""]);
      setResendCooldown(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    }
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
        className="gap-6 max-w-xs rounded-2xl"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Verify your number</DialogTitle>
          <DialogDescription>
            6-digit code sent to{" "}
            <span className="font-semibold text-foreground">
              {formatPHNumber(phone)}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
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
                ${digit ? "border-primary text-primary" : "text-gray-900 border-gray-300"}
              `}
            />
          ))}
        </div>

        {otpError && (
          <p className="text-xs text-center text-red-500">{otpError}</p>
        )}

        {verifyRateLimit !== null ? (
          <Button
            type="button"
            disabled
            className="py-6 w-full text-white cursor-not-allowed"
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
            className="py-6 w-full text-white cursor-pointer"
          >
            {otpLoading ? (
              <span className="flex gap-2 items-center">
                <Loader2 className="animate-spin size-4" />
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
              <span className="text-xs font-semibold text-primary">
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
                className="p-0 h-auto font-semibold text-primary"
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
