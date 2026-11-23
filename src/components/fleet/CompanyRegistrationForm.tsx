import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, LockKeyhole } from "lucide-react";
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
  return (
    <FieldSet id={`fleet-section-${number}`} className="fleet-section">
      <FieldLegend className="sr-only">{title}</FieldLegend>
      <div className="fleet-section-heading" aria-hidden="true">
        <div><h3>{title}</h3><p>{description}</p></div>
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
  const sectionFields: (keyof FleetFormInput)[][] = [
    ["logo", "companyName", "registeredBusinessName", "businessType", "garageAddress", "dispatchPhone", "companyEmail"],
    ["repFullName", "repPosition", "repMobile", "repGovernmentId"],
    ["registrationDocument", "businessPermit", "birCertificate", "tin"],
    ["acceptTerms"],
  ];
  const completed = sectionFields.map((names) => names.every((name) => fleetApplicationFormSchema.shape[name].safeParse(values[name]).success));
  const selectedFiles = useWatch({ control: form.control, name: [...fleetFileFields] });
  const [activeSection, setActiveSection] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const submitting = useRef(false);
  useLayoutEffect(() => {
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
    const update = () => {
      const top = container.getBoundingClientRect().top;
      const sections = [...container.querySelectorAll<HTMLElement>(".fleet-section")];
      const current = sections.filter((section) => section.getBoundingClientRect().top <= top + 100).at(-1);
      setActiveSection(container.scrollTop + container.clientHeight >= container.scrollHeight - 8 ? 4 : current ? Number(current.id.split("-").at(-1)) : 1);
    };
    container.addEventListener("scroll", update, { passive: true });
    return () => container.removeEventListener("scroll", update);
  }, [success]);
  function jumpToSection(number: number) {
    const section = document.getElementById(`fleet-section-${number}`);
    if (!section || !scrollRef.current) return;
    scrollRef.current.scrollTop += section.getBoundingClientRect().top - scrollRef.current.getBoundingClientRect().top - 24;
    section.querySelector<HTMLElement>("input, select, button")?.focus({ preventScroll: true });
    setActiveSection(number);
  }
  async function submit(values: FleetFormOutput) {
    if (submitting.current) return;
    submitting.current = true;
    form.clearErrors("root");
    try {
      const result = await submitFleetApplication(values);
      if (result.ok) {
        onDirtyChange(false);
        setSuccess(true);
        onSuccessChange(true);
        return;
      }

      form.setError("root.server", { message: result.message });
      for (const { name, message } of result.fieldErrors) {
        form.setError(name, { type: "server", message });
      }
      const firstError = result.fieldErrors[0];
      if (firstError) requestAnimationFrame(() => form.setFocus(firstError.name));
    } finally {
      submitting.current = false;
    }
  }
  if (success)
    return (
      <section className="fleet-success" role="status">
        <div className="fleet-success-check"><Check aria-hidden="true" /></div>
        <h2 ref={successRef} tabIndex={-1}>Application received</h2>
        <p>We’ve received the application for <strong>{form.getValues("registeredBusinessName")}</strong>.
          A FastMet admin will review it. Once approved, we’ll email your login details to <strong>{form.getValues("companyEmail")}</strong>.</p>
        <div className="fleet-next-card">
          <h3>What happens next</h3>
          {[
            ["We review your documents", "If something needs fixing, we’ll tell you what to update."],
            ["We create your company account", "Your login details arrive by email. You don’t need to set a password."],
            ["You add vehicles and drivers", "Vehicles are verified by FastMet admin. Drivers register through the FastMet Driver app."],
          ].map(([title, description], i) => <div key={title} className="fleet-next-item"><span>{i + 1}</span><div><h4>{title}</h4><p>{description}</p></div></div>)}
        </div>
        <Button type="button" onClick={onClose} className="fleet-submit fleet-done">Done</Button>
      </section>
    );
  return (
    <FormProvider {...form}>
      <nav className="fleet-section-nav" aria-label="Application sections">
        {["Company", "Representative", "Documents", "Agreement"].map((label, index) => (
          <button key={label} type="button" aria-current={activeSection === index + 1 ? "step" : undefined}
            onClick={() => jumpToSection(index + 1)} className={`${activeSection === index + 1 ? "is-active" : ""} ${completed[index] ? "is-complete" : ""}`}>
            <span>{completed[index] && activeSection !== index + 1 ? <Check aria-hidden="true" /> : index + 1}</span>{label}
          </button>
        ))}
      </nav>
      <form
        id="fleet-company-application"
        method="post"
        action={fleetApplicationsUrl}
        encType="multipart/form-data"
        noValidate
        onSubmit={form.handleSubmit(submit)}
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
                hint="Login details will be sent here after admin approval."
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
              <p className="fleet-agreement-note">Once approved, your company login details will arrive by email.</p>
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
            <Button
              type="submit"
              disabled={isSubmitting}
              className="fleet-submit"
            >
              {isSubmitting && <Loader2 className="motion-safe:animate-spin" aria-hidden="true" />}
              {isSubmitting ? "Submitting application…" : "Submit application"}
            </Button>
          </div>
        </footer>
      </form>
    </FormProvider>
  );
}
