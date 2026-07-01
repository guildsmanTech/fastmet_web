import React, { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import LoaderModal from "../modals/Loader";
import SuccessModal from "../modals/Success";
import ReCAPTCHA from "react-google-recaptcha";
import { Loader2 } from "lucide-react";
import OTPModal from "../modals/OTPModal";
import { userRegistrationSchema } from "@/schemas/userRegistration";
import { formatPHNumber } from "@/helper/format";
import { OtpCountdown } from "@/components/ui/OtpCountdown";

interface FormData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  gender: string;
}

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer_not", label: "Prefer not to say" },
];

const API_URL = import.meta.env.VITE_API_URL;

export default function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    contactNumber: "",
    gender: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Captcha
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  // OTP modal — only open/close lives here
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [sendRateLimit, setSendRateLimit] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = userRegistrationSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!captchaValue) {
      setErrors({ form: "Please complete the captcha." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/send-otp-web`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Type": "client",
        },
        body: JSON.stringify({
          phoneNumber: formData.contactNumber,
          captcha: captchaValue,
        }),
      });

      if (res.status === 429) {
        const raw = res.headers.get("Retry-After");
        const secs = raw ? parseInt(raw, 10) : 60;
        setSendRateLimit(isNaN(secs) ? 60 : secs);
      } else if (res.ok) {
        setOtpModalOpen(true);
      } else {
        const d = await res.json();
        setErrors({ form: d.error || "Failed to send OTP. Please try again." });
      }
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // ── OTP callbacks passed down to OTPModal ─────────────────────────────────

  const handleVerify = async (
    code: string,
  ): Promise<{
    success: boolean;
    error?: string;
    rateLimitSeconds?: number;
    locked?: boolean;
  }> => {
    try {
      // 1. Verify OTP
      const otpRes = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.contactNumber,
          otpCode: code,
        }),
      });
      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        if (otpRes.status === 429) {
          const raw = otpRes.headers.get("Retry-After");
          const secs = raw ? parseInt(raw, 10) : 60;
          return { success: false, rateLimitSeconds: isNaN(secs) ? 60 : secs };
        }
        const locked =
          otpData.error?.includes("Too many failed attempts") ?? false;
        return {
          success: false,
          error: otpData.error ?? "Incorrect code. Try again.",
          locked,
        };
      }

      const { verifyToken } = otpData; // short-lived JWT (10 min)

      // 2. OTP passed — save to DB
      const registerRes = await fetch(`${API_URL}/api/register/register-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifyToken}`,
        },
        body: JSON.stringify(formData),
      });

      const registerData = await registerRes.json();

      if (registerRes.ok) return { success: true };

      return {
        success: false,
        error: registerData.error ?? "Server error. Please try again.",
      };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const handleResend = async (): Promise<{ error?: string }> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/resend-otp-web`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Type": "client",
        },
        body: JSON.stringify({ phoneNumber: formData.contactNumber }),
      });
      if (!res.ok) {
        const d = await res.json();
        return { error: d.error || "Failed to resend OTP. Please try again." };
      }
      return {};
    } catch {
      return { error: "Network error. Please try again." };
    }
  };

  const handleVerifySuccess = () => {
    setOtpModalOpen(false);
    setSuccess(true);
    setFormData({
      firstName: "",
      lastName: "",
      contactNumber: "+63",
      gender: "",
    });
    captchaRef.current?.reset();
    setCaptchaValue("");
    setErrors({});
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex items-center justify-center">
      <div className="w-full lg:flex-1 max-w-2xl mx-auto lg:mx-0 px-4 lg:px-6">
        <p className="font-semibold text-base md:text-lg lg:text-xl text-center mb-8 text-gray-900">
          User's Pre-Registration
        </p>

        <form onSubmit={formSubmit} className="space-y-6">
          {/* ── Name ─────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-semibold text-gray-900">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Juan"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-semibold text-gray-900">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="dela Cruz"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* ── Contact + Email ───────────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-semibold text-gray-900">
                Contact Number
              </label>
              <PhoneInput
                country="ph"
                value={formData.contactNumber}
                onChange={(value) => {
                  // IMPORTANT: do not reformat here aggressively
                  setFormData((prev) => ({
                    ...prev,
                    contactNumber: value,
                  }));
                }}
                inputProps={{
                  maxLength: 15,
                  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
                    e.preventDefault();

                    const pasted = e.clipboardData.getData("Text");
                    const formatted = formatPHNumber(pasted);

                    setFormData((prev) => ({
                      ...prev,
                      contactNumber: formatted,
                    }));
                  },
                }}
                onlyCountries={["ph"]}
                countryCodeEditable={false}
                disableDropdown
                inputClass="!w-full !py-2.5 !px-12 !rounded-lg !text-sm !h-auto !border-gray-300"
                buttonClass="!border !border-gray-300 !rounded-l-lg !bg-white"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-xs">{errors.contactNumber}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-semibold text-gray-900">
                Gender
              </label>
              <div className="flex gap-2 flex-wrap">
                {GENDER_OPTIONS.map((option) => {
                  const isSelected = formData.gender === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          gender: option.value,
                        }));
                        if (errors.gender)
                          setErrors((prev) => ({ ...prev, gender: "" }));
                      }}
                      className={`
                      px-4 py-2 rounded-lg border-2 text-xs font-semibold transition-all duration-200 cursor-pointer
                      ${
                        isSelected
                          ? "border-primary bg-primary text-white shadow-sm"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }
                    `}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* ── Form error ────────────────────────────────────────────────── */}
          {errors.form && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-red-600 text-xs text-center">{errors.form}</p>
            </div>
          )}

          {/* ── Captcha + Submit ──────────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={setCaptchaValue}
              theme="light"
              size="normal"
            />
            {sendRateLimit !== null ? (
              <button
                type="button"
                disabled
                className="w-full py-3 rounded-lg font-semibold text-sm text-white bg-primary opacity-60 cursor-not-allowed"
              >
                <OtpCountdown
                  seconds={sendRateLimit}
                  label="Try again in {s}s"
                  onDone={() => setSendRateLimit(null)}
                />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !captchaValue}
                className={`
                  w-full py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200
                  ${
                    loading || !captchaValue
                      ? "bg-primary opacity-60 cursor-not-allowed"
                      : "bg-primary hover:bg-orange-500 cursor-pointer"
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Sending OTP…
                  </span>
                ) : (
                  "Submit User's Pre-Registration"
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── OTP Modal ─────────────────────────────────────────────────────────── */}
      <OTPModal
        open={otpModalOpen}
        onOpenChange={setOtpModalOpen}
        phone={formData.contactNumber}
        onVerify={handleVerify}
        onVerifySuccess={handleVerifySuccess}
        onResend={handleResend}
        onClose={() => setOtpModalOpen(false)}
      />

      <LoaderModal open={loading} />
      <SuccessModal isOpen={success} setIsOpen={setSuccess} userType="client" />
    </div>
  );
}
