import React, {useEffect, useMemo, useRef, useState} from "react";
import PhoneInput from "react-phone-input-2";
import LoaderModal from "../modals/Loader";
import SuccessModal from "../modals/Success";
import ReCAPTCHA from "react-google-recaptcha";
import {CheckCircle2, Loader2} from "lucide-react";
import OTPModal from "../modals/OTPModal";
import {driverRegistrationSchema} from "@/schemas/driverRegistration";
import {useVehicles} from "@/hooks/useVehicleQueries";
import {formatPHNumber} from "@/helper/format";
import type {IVehicleType} from "@/types/vehicle";
import {OtpCountdown} from "@/components/ui/OtpCountdown";

interface FormData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function DriverForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Captcha
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  // Vehicles
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicleType | null>(
    null,
  );
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [sendRateLimit, setSendRateLimit] = useState<number | null>(null);

  const {data: vehiclesData} = useVehicles();

  const vehicles = useMemo(() => vehiclesData ?? [], [vehiclesData]);

  useEffect(() => {
    if (!selectedVehicle && vehicles.length > 0) {
      const first = vehicles[0];
      const firstActive = first.variants.filter((v) => v.isActive);

      setSelectedVehicle(first);
      setSelectedVariantId(firstActive.length > 0 ? firstActive[0]._id : "");
    }
  }, [selectedVehicle, vehicles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    if (errors[name]) setErrors((prev) => ({...prev, [name]: ""}));
  };

  const handleSelectVehicle = (vehicle: IVehicleType) => {
    const active = vehicle.variants.filter((v) => v.isActive);
    setSelectedVehicle(vehicle);
    setSelectedVariantId(active.length > 0 ? active[0]._id : "");
    setErrors((prev) => ({...prev, vehicle: "", variant: ""}));
  };

  // ── Submit: validate → captcha → send OTP → open modal ────────────────────
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = driverRegistrationSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Vehicle validation (kept separate since it's not part of formData)
    const activeVariants =
      selectedVehicle?.variants.filter((v) => v.isActive) ?? [];
    const vehicleErrors: Record<string, string> = {};
    if (!selectedVehicle)
      vehicleErrors.vehicle = "Please select a vehicle type";
    else if (activeVariants.length > 1 && !selectedVariantId)
      vehicleErrors.variant = "Please select a load capacity";

    if (Object.keys(vehicleErrors).length > 0) {
      setErrors(vehicleErrors);
      return;
    }

    if (!captchaValue) {
      setErrors({form: "Please complete the captcha."});
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/send-otp-web`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Type": "driver", // or "client"
        },
        body: JSON.stringify({
          phoneNumber: formData.contactNumber,
          captcha: captchaValue,
          email: formData.email,
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
        setErrors({form: d.error || "Failed to send OTP. Please try again."});
      }
    } catch {
      setErrors({form: "Network error. Please try again."});
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
      // 1. Verify OTP — receives a short-lived token on success
      const otpRes = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
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
          return {success: false, rateLimitSeconds: isNaN(secs) ? 60 : secs};
        }
        const locked =
          otpData.error?.includes("Too many failed attempts") ?? false;
        return {
          success: false,
          error: otpData.error ?? "Incorrect code. Try again.",
          locked,
        };
      }

      const {verifyToken} = otpData; // short-lived JWT (10 min)

      // 2. OTP passed — pre-register the driver
      //    Token is forwarded in Authorization to prove OTP was verified server-side
      const registerRes = await fetch(
        `${API_URL}/api/register/register-driver`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifyToken}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            contactNumber: formData.contactNumber,
            email: formData.email,
            vehicleId: selectedVehicle?._id,
            vehicleVariantId: selectedVariantId || undefined,
          }),
        },
      );

      const registerData = await registerRes.json();

      if (registerRes.ok) return {success: true};

      return {
        success: false,
        error: registerData.error ?? "Server error. Please try again.",
      };
    } catch {
      return {success: false, error: "Network error. Please try again."};
    }
  };

  const handleResend = async (): Promise<{error?: string}> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/resend-otp-web`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Type": "driver",
        },
        body: JSON.stringify({phoneNumber: formData.contactNumber}),
      });
      if (!res.ok) {
        const d = await res.json();
        return {error: d.error || "Failed to resend OTP. Please try again."};
      }
      return {};
    } catch {
      return {error: "Network error. Please try again."};
    }
  };

  const handleVerifySuccess = () => {
    setOtpModalOpen(false);
    setSuccess(true);
    setFormData({
      firstName: "",
      lastName: "",
      contactNumber: "+63",
      email: "",
    });
    if (vehicles.length > 0) {
      const first = vehicles[0];
      const firstActive = first.variants.filter((v) => v.isActive);
      setSelectedVehicle(first);
      setSelectedVariantId(firstActive.length > 0 ? firstActive[0]._id : "");
    } else {
      setSelectedVehicle(null);
      setSelectedVariantId("");
    }
    captchaRef.current?.reset();
    setCaptchaValue("");
    setErrors({});
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const activeVariants =
    selectedVehicle?.variants.filter((v) => v.isActive) ?? [];
  const showVariants = activeVariants.length > 1;

  return (
    <div className="flex justify-center items-center">
      <div className="px-4 mx-auto w-full max-w-2xl lg:flex-1 lg:mx-0 lg:px-6">
        <p className="mb-8 text-base font-semibold text-center text-gray-900 md:text-lg lg:text-xl">
          Driver's Pre-Registration
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
                <p className="text-xs text-red-500">{errors.firstName}</p>
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
                <p className="text-xs text-red-500">{errors.lastName}</p>
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
                  setFormData((prev) => ({...prev, contactNumber: value}));

                  if (errors.contactNumber) {
                    setErrors((prev) => ({...prev, contactNumber: ""}));
                  }
                }}
                onlyCountries={["ph"]}
                countryCodeEditable={false}
                disableDropdown
                inputProps={{
                  maxLength: 15,
                  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => {
                    e.preventDefault();

                    const pasted = e.clipboardData.getData("text");
                    const formatted = formatPHNumber(pasted);

                    setFormData((prev) => ({
                      ...prev,
                      contactNumber: formatted,
                    }));

                    if (errors.contactNumber) {
                      setErrors((prev) => ({...prev, contactNumber: ""}));
                    }
                  },
                }}
                inputClass="!w-full !py-2.5 !px-12 !rounded-lg !text-sm !h-auto !border-gray-300"
                buttonClass="!border !border-gray-300 !rounded-l-lg !bg-white"
              />
              {errors.contactNumber && (
                <p className="text-xs text-red-500">{errors.contactNumber}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-semibold text-gray-900">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="juandelacruz@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
              <p className="text-xs text-gray-500">
                For your onboarding discussion via Google Meet
              </p>
            </div>
          </div>

          {/* ── Vehicle type ──────────────────────────────────────────────── */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Vehicle Type
              </label>
              <p className="mt-1 text-xs text-gray-500">
                Select the vehicle you'll use for FastMet deliveries
              </p>
            </div>
            {vehicles.length === 0 ? (
              <p className="py-8 text-sm text-center text-gray-400">
                No vehicles available at this time.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {vehicles.map((vehicle) => {
                  const isSelected = selectedVehicle?._id === vehicle._id;

                  const activeVariants = vehicle.variants.filter(
                    (v) => v.isActive,
                  );

                  const minLoad = activeVariants.length
                    ? Math.max(...activeVariants.map((v) => v.maxLoadKg))
                    : null;

                  return (
                    <button
                      key={vehicle._id}
                      type="button"
                      onClick={() => handleSelectVehicle(vehicle)}
                      className={`
                        relative flex flex-col items-center justify-start gap-2
                        p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                        ${
                          isSelected
                            ? "shadow-md border-primary bg-primary/5"
                            : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        }
                      `}
                    >
                      {isSelected && (
                        <CheckCircle2 className="absolute top-2 right-2 size-4 text-primary" />
                      )}
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.name}
                        className="object-contain w-full h-12"
                      />
                      <div className="w-full text-center">
                        <p
                          className={`text-xs font-bold leading-tight ${isSelected ? "text-primary" : "text-gray-800"}`}
                        >
                          {vehicle.name}
                        </p>
                        {minLoad !== null && (
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            up to {minLoad.toLocaleString()}kg
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            {errors.vehicle && (
              <p className="text-xs text-red-500">{errors.vehicle}</p>
            )}
          </div>

          {/* ── Variant selection ─────────────────────────────────────────── */}
          {showVariants && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-900">
                  Load Capacity
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  Select the max load for your {selectedVehicle?.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {activeVariants.map((variant) => {
                  const isSelected = selectedVariantId === variant._id;
                  return (
                    <button
                      key={variant._id}
                      type="button"
                      onClick={() => {
                        setSelectedVariantId(variant._id);
                        if (errors.variant)
                          setErrors((prev) => ({...prev, variant: ""}));
                      }}
                      className={`
                        px-3 py-2.5 rounded-lg border-2 text-xs font-semibold
                        transition-all duration-200 whitespace-nowrap cursor-pointer
                        ${
                          isSelected
                            ? "border-primary bg-primary text-white shadow-md"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                        }
                      `}
                    >
                      {variant.maxLoadKg.toLocaleString()}kg
                    </button>
                  );
                })}
              </div>
              {errors.variant && (
                <p className="text-xs text-red-500">{errors.variant}</p>
              )}
            </div>
          )}

          {/* ── Form error ────────────────────────────────────────────────── */}
          {errors.form && (
            <div className="px-4 py-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-center text-red-600">{errors.form}</p>
            </div>
          )}

          {/* ── Captcha + Submit ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-4 items-center pt-2">
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
                className="py-3 w-full text-sm font-semibold text-white rounded-lg opacity-60 cursor-not-allowed bg-primary"
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
                  <span className="flex gap-2 justify-center items-center">
                    <Loader2 className="animate-spin size-4" />
                    Sending OTP…
                  </span>
                ) : (
                  "Submit Driver's Pre-Registration"
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
      <SuccessModal isOpen={success} setIsOpen={setSuccess} userType="driver" />
    </div>
  );
}
