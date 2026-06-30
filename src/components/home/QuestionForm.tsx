import React, {useRef, useState} from "react";
import {Send, MessageCircleQuestion} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import {inquirySchema} from "@/schemas/inquiry";
import {API_URL} from "@/helper/constant";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    if (errors[name]) setErrors((prev) => ({...prev, [name]: ""}));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // 1. Validate client-side
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

    // 2. Captcha check
    if (!captchaValue) {
      setErrors({form: "Please complete the captcha."});
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/inquiry/submit`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...formData, captcha: captchaValue}),
      });

      const data = await res.json();

      if (!res.ok) {
        // Display backend validation errors if available
        if (data.fields) {
          const backendErrors: Record<string, string> = {};
          data.fields.forEach(
            (f: {field: string; message: string}) =>
              (backendErrors[f.field] = f.message),
          );
          setErrors(backendErrors);
        } else if (data.error) {
          setErrors({form: data.error});
        }
        captchaRef.current?.reset();
        setCaptchaValue(null);
        return;
      }

      // Success
      setSubmitted(true);
    } catch (err: unknown) {
      let message = "Network error. Please try again.";

      if (err instanceof Error) {
        message = err.message;
      }

      setErrors({form: message});
      captchaRef.current?.reset();
      setCaptchaValue(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({name: "", email: "", message: ""});
    setErrors({});
    setSubmitted(false);
    captchaRef.current?.reset();
    setCaptchaValue(null);
  };

  return (
    <section className="flex flex-col md:flex-row items-center gap-10 py-10 md:mx-4 xl:mx-40 lg:mx-20 px-6 bg-gradient-to-br from-white to-[#FFF6ED]">
      {/* Left Side */}
      <div className="flex-1 flex flex-col gap-4 text-center md:text-left md:pl-10">
        <div className="flex justify-center md:justify-start">
          <div className="bg-primary/10 p-3 rounded-full w-fit">
            <MessageCircleQuestion className="text-primary size-8 md:size-12" />
          </div>
        </div>
        <h2 className="text-primary font-bold text-2xl lg:text-5xl md:text-4xl uppercase">
          Got Questions?
        </h2>
        <p className="text-gray-700 text-justify  md:text-lg leading-relaxed">
          We&apos;d love to hear from you! Send us a message and we&apos;ll get
          back to you shortly.
        </p>
      </div>

      {/* Right Side — Form */}
      <div className="flex-1 w-full grid place-items-center">
        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Send className="text-primary size-8" />
            </div>
            <h3 className="text-primary font-bold text-xl">Message Sent!</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Thank you for reaching out. We&apos;ll get back to you shortly.
            </p>
            <button
              onClick={handleReset}
              className="border border-primary text-primary cursor-pointer bg-white px-5 py-2 rounded-full hover:bg-primary hover:text-white transition"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl py-10 2xl:w-2/3 shadow-md border border-orange-100 p-6 flex flex-col gap-4"
          >
            {errors.form && (
              <p className="text-red-500 text-sm text-center">{errors.form}</p>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600">
                Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Juan dela Cruz"
                className={`border  ${errors.name ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs ml-2">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`border  ${errors.email ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs ml-2">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Type your question or concern here..."
                className={`border  ${errors.message ? "border-red-500" : "border-gray-200"} rounded-xl max-h-52 min-h-24 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs ml-2">{errors.message}</p>
              )}
            </div>

            <div className="flex justify-center">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(value) => {
                  setCaptchaValue(value);
                  if (value) setErrors((prev) => ({...prev, form: ""}));
                }}
                onExpired={() => {
                  setCaptchaValue(null);
                  setErrors({form: "Captcha expired. Please verify again."});
                }}
              />
            </div>

            <button
              type="submit"
              disabled={
                loading || !formData.email || !formData.message || !captchaValue
              }
              className="mt-1 flex items-center justify-center gap-2 bg-primary cursor-pointer text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
