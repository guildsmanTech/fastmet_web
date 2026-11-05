import React, { useRef, useState } from "react";
import {
  Send,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  Loader2,
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { inquirySchema } from "@/schemas/inquiry";
import { API_URL } from "@/helper/constant";
import PageContainer from "@/components/PageContainer";

interface InquiryFormData {
  name: string;
  email: string;
  message: string;
}

export default function QuestionForm() {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const MAX_MESSAGE = 500;

  const baseField =
    "w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 " +
    "placeholder:text-zinc-400 transition-all duration-200 " +
    "focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary";

  const fieldState = (hasError: boolean) =>
    hasError
      ? "border-red-400 bg-red-50/40 focus:ring-red-200 focus:border-red-400"
      : "border-zinc-200 hover:border-zinc-300";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const parsed = inquirySchema.safeParse(formData);
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
      setErrors({ form: "Please complete the CAPTCHA." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/inquiry/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captcha: captchaValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fields) {
          const backendErrors: Record<string, string> = {};
          data.fields.forEach(
            (f: { field: string; message: string }) =>
              (backendErrors[f.field] = f.message),
          );
          setErrors(backendErrors);
        } else if (data.error) {
          setErrors({ form: data.error });
        }
        captchaRef.current?.reset();
        setCaptchaValue(null);
        return;
      }

      setSubmitted(true);
    } catch (err: unknown) {
      let message = "Network error. Please try again.";
      if (err instanceof Error) message = err.message;
      setErrors({ form: message });
      captchaRef.current?.reset();
      setCaptchaValue(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setSubmitted(false);
    captchaRef.current?.reset();
    setCaptchaValue(null);
  };

  return (
    <section
      id="contact"
      className="w-full scroll-mt-24 bg-gradient-to-br from-white to-[#FFF6ED] px-3"
    >
      <PageContainer className="py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left side */}
          <div className="flex items-start gap-5 flex-1">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight">
                May tanong ka?
                <br />
                <span className="text-primary">FastMet agad!</span>
              </h2>

              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-lg">
                May tanong ka ba tungkol sa mga rate, pickup, o sa status ng
                padala mo? I-message mo lang kami—mabilis kaming sasagot.
              </p>
            </div>
          </div>

          {/* Right side – Form */}
          <div className="shrink-0 w-full md:w-[420px] lg:w-[460px]">
            {submitted ? (
              <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 p-8 flex flex-col items-center justify-center gap-4 text-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Send className="text-primary size-8" />
                </div>
                <h3 className="text-primary font-bold text-xl">
                  Message sent!
                </h3>
                <p className="text-zinc-600 text-sm md:text-base">
                  Thank you for reaching out. We&apos;ll get back to you
                  shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 border border-primary text-primary cursor-pointer bg-white px-6 py-2.5 rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-2xl shadow-sm md:shadow-lg border border-zinc-100 p-6 sm:p-8 flex flex-col gap-5"
              >
                {errors.form && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 py-3 px-4 rounded-xl"
                  >
                    <AlertCircle className="size-4 mt-0.5 shrink-0" />
                    <span>{errors.form}</span>
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-zinc-700"
                  >
                    Name{" "}
                    <span className="text-zinc-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Juan dela Cruz"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`${baseField} ${fieldState(!!errors.name)}`}
                    />
                  </div>
                  {errors.name && (
                    <p
                      id="name-error"
                      className="flex items-center gap-1 text-red-500 text-xs"
                    >
                      <AlertCircle className="size-3.5" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-zinc-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className={`${baseField} ${fieldState(!!errors.email)}`}
                    />
                  </div>
                  {errors.email && (
                    <p
                      id="email-error"
                      className="flex items-center gap-1 text-red-500 text-xs"
                    >
                      <AlertCircle className="size-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-end justify-between">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <span
                      className={`text-xs tabular-nums ${
                        formData.message.length > MAX_MESSAGE * 0.9
                          ? "text-orange-500"
                          : "text-zinc-400"
                      }`}
                    >
                      {formData.message.length}/{MAX_MESSAGE}
                    </span>
                  </div>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-zinc-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={MAX_MESSAGE}
                      rows={5}
                      placeholder="Type your question or concern here..."
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={`${baseField} resize-y min-h-[130px] max-h-60 ${fieldState(!!errors.message)}`}
                    />
                  </div>
                  {errors.message && (
                    <p
                      id="message-error"
                      className="flex items-center gap-1 text-red-500 text-xs"
                    >
                      <AlertCircle className="size-3.5" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Captcha – clean, no background box */}
                <div className="flex justify-center overflow-x-auto">
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(value) => {
                      setCaptchaValue(value);
                      if (value) setErrors((prev) => ({ ...prev, form: "" }));
                    }}
                    onExpired={() => {
                      setCaptchaValue(null);
                      setErrors({
                        form: "CAPTCHA expired. Please verify again.",
                      });
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.email ||
                    !formData.message ||
                    !captchaValue
                  }
                  className="group flex items-center justify-center gap-2 w-full rounded-full px-6 py-3.5
               bg-primary text-white font-semibold text-sm shadow-md shadow-primary/20
               hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5
               active:translate-y-0 active:scale-[0.98]
               focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
               disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
               disabled:hover:translate-y-0 disabled:active:scale-100
               transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
