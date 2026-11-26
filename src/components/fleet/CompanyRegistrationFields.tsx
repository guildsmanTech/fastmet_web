import { useEffect, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { Building2, Check, CircleAlert, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import {
  fleetApplicationFormSchema,
  fleetBusinessTypes,
  type FleetFileField,
  type FleetFormInput,
  type FleetFormOutput,
} from "@/schemas/fleetRegistration";

type TextName = Exclude<keyof FleetFormInput, FleetFileField | "acceptTerms" | "businessType">;
const placeholders = { companyName: "e.g. Bayani Trucking Services", registeredBusinessName: "As shown on your DTI or SEC papers",
  garageAddress: "Street, barangay, city", dispatchPhone: "0917 555 0142", companyEmail: "dispatch@yourcompany.com",
  repFullName: "Full name of your representative", repPosition: "e.g. Owner or Operations Manager", repMobile: "0917 555 0142", tin: "000-000-000" };
function describedBy(name: string, hasHint: boolean, invalid: boolean) {
  const ids = [];
  if (hasHint) ids.push(`${name}-help`);
  if (invalid) ids.push(`${name}-error`);
  return ids.length ? ids.join(" ") : undefined;
}

export function TextField({
  name,
  label,
  hint,
  autoComplete,
  type = "text",
  pattern,
  inputMode,
}: Readonly<{
  name: TextName;
  label: string;
  hint?: string;
  autoComplete?: string;
  type?: "text" | "email" | "tel";
  pattern?: string;
  inputMode?: "numeric" | "tel";
}>) {
  const { control, clearErrors, trigger } = useFormContext<FleetFormInput, unknown, FleetFormOutput>();
  const { field, fieldState, formState } = useController({ control, name });
  const isIdentifier = type === "email" || name === "tin";
  return (
    <Field data-name={name} data-invalid={fieldState.invalid} className="fleet-field">
      <FieldLabel htmlFor={name}>
        {label} <span aria-hidden="true">*</span>
      </FieldLabel>
      {hint && <FieldDescription id={`${name}-help`}>{hint}</FieldDescription>}
      <Input
        {...field}
        id={name}
        placeholder={placeholders[name]}
        required
        type={type}
        inputMode={inputMode}
        pattern={pattern}
        autoComplete={autoComplete}
        maxLength={name === "companyEmail" ? 254 : 250}
        autoCapitalize={isIdentifier ? "none" : undefined}
        autoCorrect={isIdentifier ? "off" : undefined}
        spellCheck={isIdentifier ? false : undefined}
        className="fleet-control"
        aria-invalid={fieldState.invalid}
        aria-describedby={describedBy(name, Boolean(hint), fieldState.invalid)}
        onBlur={() => {
          field.onBlur();
          // After submission, the form's reValidateMode already handles blur.
          if (!formState.isSubmitted && fieldState.isDirty) void trigger(name);
        }}
        onChange={(event) => {
          field.onChange(event);
          if (
            fieldState.error &&
            fleetApplicationFormSchema.shape[name].safeParse(event.target.value).success
          )
            clearErrors(name);
        }}
      />
      {fieldState.error && (
        <FieldError id={`${name}-error`} role="alert" errors={[fieldState.error]} />
      )}
    </Field>
  );
}

function CompanyLogoPreview({ file }: Readonly<{ file?: File }>) {
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    // Preview the local file and release its URL when the selection changes.
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="fleet-logo-preview">
      {preview ? <img src={preview} alt="Selected company logo" /> : <Building2 aria-hidden="true" />}
    </div>
  );
}

function UploadDetails({ file, ready, help }: Readonly<{ file?: File; ready: boolean; help: string }>) {
  const Icon = ready ? Check : FileText;
  const status = ready ? "Ready to submit" : "Check this file";
  const details = file ? `${(file.size / 1024 / 1024).toFixed(1)} MB · ${status}` : help;

  return (
    <>
      <span className="fleet-upload-icon"><Icon aria-hidden="true" /></span>
      <div className="fleet-upload-copy">
        <strong>{file?.name ?? "Drag a file here, or browse"}</strong>
        <span>{details}</span>
      </div>
    </>
  );
}

export function FileField({ name, label }: Readonly<{ name: FleetFileField; label: string }>) {
  const { control, trigger } = useFormContext<FleetFormInput, unknown, FleetFormOutput>();
  const inputRef = useRef<HTMLInputElement>(null);
  const chooseButtonRef = useRef<HTMLButtonElement>(null);
  const { field, fieldState } = useController({ control, name });
  const [dragging, setDragging] = useState(false);
  const selected = field.value;
  const ready = Boolean(selected) && !fieldState.invalid;
  const isLogo = name === "logo";
  const uploadLabel = isLogo ? "Upload image" : "Choose file";
  const help = isLogo
    ? "JPG or PNG · up to 10 MB. Your company logo will be public."
    : "JPG, PNG or PDF · up to 10 MB";

  function selectFile(file: File | undefined) {
    field.onChange(file);
    void trigger(name);
  }

  function removeFile() {
    selectFile(undefined);
    // Reset the picker so the same file can be selected again.
    if (inputRef.current) inputRef.current.value = "";
    // The Remove button disappears, so return keyboard focus to the picker button.
    chooseButtonRef.current?.focus();
  }

  return (
    <Field
      data-name={name}
      data-invalid={fieldState.invalid}
      className={cn("fleet-field fleet-file-field", isLogo && "fleet-logo-field")}
    >
      {isLogo && <CompanyLogoPreview file={ready ? selected : undefined} />}
      <div className="fleet-file-content">
        <FieldLabel htmlFor={name}>{label} <span aria-hidden="true">*</span></FieldLabel>
        <div
          className={cn("fleet-upload", ready && "is-ready", dragging && "is-dragging")}
          onDragOver={(event) => {
            event.preventDefault();
            if (event.dataTransfer.types.includes("Files") && !event.currentTarget.closest("fieldset:disabled")) {
              setDragging(true);
            }
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            const file = event.dataTransfer.files[0];
            // Check the fieldset explicitly because divs still receive drops during submission.
            if (file && !event.currentTarget.closest("fieldset:disabled")) selectFile(file);
          }}
        >
          <input
            type="file"
            name={field.name}
            id={name}
            ref={(element) => {
              inputRef.current = element;
              field.ref(element);
            }}
            onBlur={field.onBlur}
            required
            accept={isLogo ? "image/jpeg,image/png" : "image/jpeg,image/png,application/pdf"}
            className="fleet-file-input"
            aria-invalid={fieldState.invalid}
            aria-describedby={describedBy(name, true, fieldState.invalid)}
            onChange={(event) => selectFile(event.target.files?.[0])}
          />
          {!isLogo && <UploadDetails file={selected} ready={ready} help={help} />}
          <Button ref={chooseButtonRef} type="button" variant="outline" className="fleet-file-choose" onClick={() => inputRef.current?.click()}>
            {selected ? "Replace" : uploadLabel}
          </Button>
          {selected && (
            <Button type="button" variant="outline" className="fleet-file-remove" aria-label={`Remove ${label}`} onClick={removeFile}>
              <X aria-hidden="true" />
            </Button>
          )}
        </div>
        <FieldDescription id={`${name}-help`} className={isLogo ? undefined : "sr-only"}>{help}</FieldDescription>
        {fieldState.error && (
          <div className="fleet-file-error">
            <CircleAlert aria-hidden="true" />
            <FieldError id={`${name}-error`} errors={[fieldState.error]} />
          </div>
        )}
      </div>
    </Field>
  );
}

export function BusinessTypeField() {
  const { control, clearErrors } = useFormContext<FleetFormInput, unknown, FleetFormOutput>();
  const { field, fieldState } = useController({ control, name: "businessType" });
  return (
    <Field data-name="businessType" data-invalid={fieldState.invalid} className="fleet-field">
      <FieldLabel htmlFor="businessType">
        Business type <span aria-hidden="true">*</span>
      </FieldLabel>
      <div className="fleet-input-wrap">
      <NativeSelect
        {...field}
        id="businessType"
        required
        className="fleet-control"
        aria-invalid={fieldState.invalid}
        aria-describedby={fieldState.error ? "businessType-error" : undefined}
        onChange={(event) => {
          field.onChange(event);
          if (event.target.value) clearErrors("businessType");
        }}
      >
        <NativeSelectOption value="">Choose business type</NativeSelectOption>
        {fleetBusinessTypes.map((value) => (
          <NativeSelectOption key={value} value={value}>
            {value}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      </div>
      {fieldState.error && (
        <FieldError id="businessType-error" role="alert" errors={[fieldState.error]} />
      )}
    </Field>
  );
}
export function AgreementField() {
  const { control, clearErrors } = useFormContext<FleetFormInput, unknown, FleetFormOutput>();
  const { field, fieldState } = useController({ control, name: "acceptTerms" });
  return (
    <Field data-invalid={fieldState.invalid} className="fleet-field fleet-agreement">
      <div className="fleet-agreement-box">
        <Checkbox
          id="acceptTerms"
          name={field.name}
          checked={field.value}
          onCheckedChange={(checked) => {
            field.onChange(checked === true);
            if (checked === true) clearErrors("acceptTerms");
          }}
          ref={field.ref}
          onBlur={field.onBlur}
          required
          className="size-5 shrink-0 mt-0.5 border-foreground/50"
          aria-invalid={fieldState.invalid}
          aria-describedby={fieldState.error ? "acceptTerms-error" : undefined}
        />
        <div className="fleet-agreement-copy">
          <FieldLabel
            htmlFor="acceptTerms"
            className="block font-normal leading-relaxed cursor-pointer"
          >
            I agree to the{" "}
            <Link
              to="/fleet/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              FastMet Fleet Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              to="/legal/privacy-policy/user"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            . <span aria-hidden="true">*</span>
          </FieldLabel>
          <FieldDescription>Both links open in a new tab.</FieldDescription>
        </div>
      </div>
      {fieldState.error && (
        <FieldError id="acceptTerms-error" role="alert" errors={[fieldState.error]} />
      )}
    </Field>
  );
}
