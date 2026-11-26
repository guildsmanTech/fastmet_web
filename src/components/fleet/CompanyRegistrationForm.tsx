import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type SyntheticEvent } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, LockKeyhole } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { Popover } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FieldGroup, FieldSet, FieldLegend } from "@/components/ui/field";
import { fleetApplicationsUrl, submitFleetApplication } from "@/api/fleetApplications";
import {
  AgreementField,
  BusinessTypeField,
  FileField,
  TextField,
} from "./CompanyRegistrationFields";
import {
  fleetApplicationFormSchema,
  fleetFileFields,
  type FleetFormInput,
  type FleetFormOutput,
} from "@/schemas/fleetRegistration";

interface CompanyRegistrationFormProps {
  onClose: () => void;
  onDirtyChange: (dirty: boolean) => void;
  onBusyChange: (busy: boolean) => void;
  onSuccessChange: (success: boolean) => void;
}
const defaults: FleetFormInput = {
  companyName: "",
  registeredBusinessName: "",
  businessType: "",
  garageAddress: "",
  dispatchPhone: "",
  companyEmail: "",
  repFullName: "",
  repPosition: "",
  repMobile: "",
  tin: "",
  acceptTerms: false,
  logo: undefined,
  repGovernmentId: undefined,
  registrationDocument: undefined,
  businessPermit: undefined,
  birCertificate: undefined,
};

const sections = [
  { label: "Company", fields: ["logo", "companyName", "registeredBusinessName", "businessType", "garageAddress", "dispatchPhone", "companyEmail"] },
  { label: "Representative", fields: ["repFullName", "repPosition", "repMobile", "repGovernmentId"] },
  { label: "Documents", fields: ["registrationDocument", "businessPermit", "birCertificate", "tin"] },
  { label: "Agreement", fields: ["acceptTerms"] },
] as const satisfies ReadonlyArray<{ label: string; fields: ReadonlyArray<keyof FleetFormInput> }>;

function getActiveSection(container: HTMLDivElement) {
  // The final section can be too short to reach the usual scroll threshold.
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 8) {
    return sections.length;
  }

  const threshold = container.getBoundingClientRect().top + 100;
  const sectionElements = [...container.querySelectorAll(".fleet-section")];
  const nextSection = sectionElements.findIndex((section) => section.getBoundingClientRect().top > threshold);
  return nextSection === -1 ? sectionElements.length : Math.max(1, nextSection);
}

function FormSection({
  title,
  number,
  description,
  children,
}: Readonly<{
  title: string;
  number: number;
  description: string;
  children: ReactNode;
}>) {
  const id = `fleet-section-${number}`;
  return (
    <FieldSet id={id} aria-describedby={`${id}-description`} className="fleet-section">
      <FieldLegend className="sr-only">{title}</FieldLegend>
      <div className="fleet-section-heading">
        <div>
          <h3 aria-hidden="true">{title}</h3>
          <p id={`${id}-description`}>{description}</p>
        </div>
      </div>
      <FieldGroup className="fleet-section-fields">{children}</FieldGroup>
    </FieldSet>
  );
}

export default function CompanyRegistrationForm({
  onClose,
  onDirtyChange,
  onBusyChange,
  onSuccessChange,
}: Readonly<CompanyRegistrationFormProps>) {
  const form = useForm<FleetFormInput, unknown, FleetFormOutput>({
    resolver: zodResolver(fleetApplicationFormSchema),
    defaultValues: defaults,
    mode: "onSubmit",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });
  const { isSubmitting, isDirty, errors } = form.formState;
  const values = useWatch({ control: form.control });
  // Preview section completion without triggering visible errors on untouched fields.
  const completed = sections.map(({ fields }) =>
    fields.every((name) => fleetApplicationFormSchema.shape[name].safeParse(values[name]).success),
  );
  const selectedFiles = useWatch({ control: form.control, name: [...fleetFileFields] });
  const [activeSection, setActiveSection] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const captchaSection = useRef<HTMLDivElement>(null);
  const [captchaSize, setCaptchaSize] = useState<"normal" | "compact" | null>(null);
  const submitButton = useRef<HTMLButtonElement>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);
  const submitting = useRef(false);
  useLayoutEffect(() => {
    const section = captchaSection.current;
    if (!section) return;
    let currentSize: "normal" | "compact" | undefined;
    const fitWidget = () => {
      // reCAPTCHA v2 has fixed iframe sizes and needs a new widget when the size changes.
      const size = section.clientWidth >= 304 ? "normal" : "compact";
      if (size === currentSize) return;
      if (currentSize) setCaptcha(null);
      currentSize = size;
      setCaptchaSize(size);
    };
    fitWidget();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(fitWidget);
    observer.observe(section);
    return () => observer.disconnect();
  }, [success]);
  useLayoutEffect(() => {
    // Track files separately because React Hook Form's dirty check can miss File objects.
    onDirtyChange(!success && (isDirty || selectedFiles.some(Boolean)));
  }, [isDirty, onDirtyChange, selectedFiles, success]);
  useEffect(() => {
    onBusyChange(isSubmitting);
  }, [isSubmitting, onBusyChange]);
  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || success) return;
    const update = () => setActiveSection(getActiveSection(container));
    container.addEventListener("scroll", update, { passive: true });
    return () => container.removeEventListener("scroll", update);
  }, [success]);
  function jumpToSection(number: number) {
    const container = scrollRef.current;
    const section = container?.querySelector(`#fleet-section-${number}`);
    if (!container || !section) return;
    container.scrollTop += section.getBoundingClientRect().top - container.getBoundingClientRect().top - 24;
    section.querySelector<HTMLElement>("input, select, button")?.focus({ preventScroll: true });
    setActiveSection(number);
  }
  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    // Guard before validation so a second submit cannot clear the first one's busy state.
    if (submitting.current) return;

    submitting.current = true;
    try {
      await form.handleSubmit(submit)(event);
    } finally {
      submitting.current = false;
    }
  }
  async function submit(values: FleetFormOutput) {
    if (!captcha) {
      setCaptchaError("Complete the CAPTCHA before submitting.");
      captchaSection.current?.scrollIntoView({block: "nearest"});
      return;
    }
    setRateLimitMessage(null);
    form.clearErrors("root");
    try {
      const result = await submitFleetApplication(values, captcha);
      if (result.ok) {
        onDirtyChange(false);
        setSuccess(true);
        onSuccessChange(true);
        return;
      }
      if (result.rateLimited) {
        const wait = result.retryAfterSeconds;
        setRateLimitMessage(wait ? `Try again in about ${Math.ceil(wait / 60)} min. Your entries and files are still here.` : result.message);
        return;
      }

      form.setError("root.server", { message: result.message });
      for (const { name, message } of result.fieldErrors) {
        form.setError(name, { type: "server", message });
      }
      const firstError = result.fieldErrors[0];
      // Wait for the disabled fieldset to re-enable before focusing the rejected field.
      if (firstError) requestAnimationFrame(() => form.setFocus(firstError.name));
    } finally {
      // reCAPTCHA tokens are single-use, including when an application needs a retry.
      captchaRef.current?.reset();
      setCaptcha(null);
    }
  }
  if (success)
    return (
      <section className="fleet-success">
        <div className="fleet-success-check"><Check aria-hidden="true" /></div>
        {/* Link the result to the heading so it can be read when focus moves here. */}
        <h2 ref={successRef} tabIndex={-1} aria-describedby="fleet-application-result">
          Application received
        </h2>
        <p>
          <output id="fleet-application-result">
            We’ve received the application for <strong>{form.getValues("registeredBusinessName")}</strong>.
            A FastMet admin will review it and email the decision to <strong>{form.getValues("companyEmail")}</strong>.
          </output>
        </p>
        <div className="fleet-next-card">
          <h3>What happens next</h3>
          {[
            ["We review your documents", "If corrections are required, you’ll sign in to view feedback and upload replacements."],
            ["We email your sign-in details", "You’ll receive an initial password if your application is approved or corrections are required."],
            ["You get full Fleet access", "The dashboard opens when FastMet approves your application."],
          ].map(([title, description], i) => <div key={title} className="fleet-next-item"><span>{i + 1}</span><div><h4>{title}</h4><p>{description}</p></div></div>)}
        </div>
        <Button type="button" onClick={onClose} className="fleet-submit fleet-done">Done</Button>
      </section>
    );
  return (
    <FormProvider {...form}>
      <nav className="fleet-section-nav" aria-label="Application sections">
        {sections.map(({ label }, index) => {
          const number = index + 1;
          const active = activeSection === number;
          const complete = completed[index];

          return (
            <button
              key={label}
              type="button"
              aria-current={active ? "step" : undefined}
              aria-controls={`fleet-section-${number}`}
              onClick={() => jumpToSection(number)}
              className={`${active ? "is-active" : ""} ${complete ? "is-complete" : ""}`}
            >
              <span aria-hidden="true">{complete && !active ? <Check /> : number}</span>
              {label}
              {complete && <span className="sr-only"> (complete)</span>}
            </button>
          );
        })}
      </nav>
      <form
        id="fleet-company-application"
        method="post"
        action={fleetApplicationsUrl}
        encType="multipart/form-data"
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        aria-label="Company application"
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div ref={scrollRef} className="fleet-form-scroll">
          <p className="fleet-required-note">Fields marked <span aria-hidden="true">*</span> are required.</p>
          <fieldset disabled={isSubmitting} className="fleet-sections disabled:opacity-65">
            <legend className="sr-only">Company application details</legend>
            <FormSection
              number={1}
              title="Company details"
              description="Your business name and contact details."
            >
              <FileField name="logo" label="Company logo" />
              <TextField
                name="companyName"
                label="Company name (trade name)"
                autoComplete="section-company organization"
              />
              <TextField name="registeredBusinessName" label="Registered business name" />
              <BusinessTypeField />
              <TextField
                name="dispatchPhone"
                label="Dispatch phone"
                type="tel"
                autoComplete="section-company tel"
              />
              <TextField
                name="garageAddress"
                label="Garage address"
                autoComplete="section-garage street-address"
              />
              <TextField
                name="companyEmail"
                label="Company email"
                type="email"
                autoComplete="section-company email"
                hint="Application decisions and sign-in details go to this address."
              />
            </FormSection>
            <FormSection
              number={2}
              title="Authorized representative"
              description="Who should we contact about this application?"
            >
              <TextField
                name="repFullName"
                label="Full name"
                autoComplete="section-representative name"
              />
              <TextField
                name="repPosition"
                label="Position"
                autoComplete="section-representative organization-title"
              />
              <TextField
                name="repMobile"
                label="Mobile number"
                type="tel"
                autoComplete="section-representative tel"
                hint="PH mobile: 09XX XXX XXXX or +63 9XX XXX XXXX."
              />
              <FileField name="repGovernmentId" label="Government ID" />
            </FormSection>
            <FormSection
              number={3}
              title="Business documents"
              description="Upload clear, complete copies of the company’s documents."
            >
              <FileField name="registrationDocument" label="DTI or SEC registration" />
              <FileField name="businessPermit" label="Mayor’s / Business Permit" />
              <FileField name="birCertificate" label="BIR Certificate (Form 2303)" />
              <TextField
                name="tin"
                label="Tax Identification Number (TIN)"
                inputMode="numeric"
                pattern="[0-9]{9}|[0-9]{12}|[0-9]{3}-[0-9]{3}-[0-9]{3}(-[0-9]{3})?"
                hint="9 or 12 digits. Dashes between groups of three are accepted."
              />
            </FormSection>
            <FormSection
              number={4}
              title="Agreement"
              description="Please read the terms and privacy policy before submitting."
            >
              <AgreementField />
              <p className="fleet-agreement-note">Check your company email for the review decision and next steps.</p>
              <div ref={captchaSection} className="col-span-full min-w-0">
                {captchaSize && <ReCAPTCHA
                  key={captchaSize}
                  ref={captchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  size={captchaSize}
                  onChange={(value) => {
                    setCaptcha(value);
                    if (value) setCaptchaError(null);
                  }}
                  onExpired={() => {
                    setCaptcha(null);
                    setCaptchaError("CAPTCHA expired. Please verify again.");
                  }}
                  onErrored={() => {
                    setCaptcha(null);
                    setCaptchaError("CAPTCHA could not load. Check your connection and try again.");
                  }}
                />}
                {captchaError && <p role="alert" className="mt-2 text-sm text-destructive">{captchaError}</p>}
              </div>
            </FormSection>
          </fieldset>
        </div>
        <footer className="fleet-form-footer">
          {errors.root?.server?.message && (
            <Alert variant="destructive" className="text-sm">
              <AlertTitle>Application not submitted</AlertTitle>
              <AlertDescription>{errors.root.server.message}</AlertDescription>
            </Alert>
          )}
          <p className="fleet-privacy-note">
            <LockKeyhole className="size-3.5" aria-hidden="true" />
            Only authorized FastMet reviewers can access your supporting documents.
          </p>
          <div className="fleet-footer-actions">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={onClose}
              className="fleet-cancel"
            >
              Cancel
            </Button>
            <Popover.Root open={Boolean(rateLimitMessage)} onOpenChange={(open) => { if (!open) setRateLimitMessage(null); }}>
              <Popover.Anchor asChild>
                <Button ref={submitButton} type="submit" disabled={isSubmitting} className="fleet-submit">
                  {isSubmitting && <Loader2 className="motion-safe:animate-spin" aria-hidden="true" />}
                  {isSubmitting ? "Submitting application…" : "Submit application"}
                </Button>
              </Popover.Anchor>
              <Popover.Content side="top" align="end" sideOffset={8}
                aria-label="Application submission limit"
                onOpenAutoFocus={(event) => event.preventDefault()}
                onCloseAutoFocus={(event) => {
                  event.preventDefault();
                  if (document.activeElement === document.body) submitButton.current?.focus();
                }}
                onInteractOutside={(event) => event.preventDefault()}
                className="z-60 w-72 max-w-[calc(100vw-32px)] rounded-lg border bg-background p-4 text-sm shadow-lg">
                <div role="alert">
                  <p className="font-semibold">Too many application attempts</p>
                  <p className="mt-1 text-muted-foreground">{rateLimitMessage}</p>
                </div>
                <Popover.Close asChild><Button type="button" variant="outline" size="sm" className="mt-3">Dismiss</Button></Popover.Close>
              </Popover.Content>
            </Popover.Root>
          </div>
        </footer>
      </form>
    </FormProvider>
  );
}
