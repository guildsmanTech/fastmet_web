import { useEffect, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { Building2, Check, CircleAlert, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
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
const controlClass =
  "fleet-control";
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
  const { control, clearErrors } = useFormContext<FleetFormInput, unknown, FleetFormOutput>();
  const { field, fieldState } = useController({ control, name });
  return (
    <Field data-name={name} data-invalid={fieldState.invalid} className="fleet-field">
      <FieldLabel htmlFor={name}>
        {label} <span aria-hidden="true">*</span>
      </FieldLabel>
      <div className="fleet-input-wrap">
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
        autoCapitalize={type === "email" ? "none" : undefined}
        autoCorrect={type === "email" || name === "tin" ? "off" : undefined}
        spellCheck={type === "email" || name === "tin" ? false : undefined}
        className={controlClass}
        aria-invalid={fieldState.invalid}
        aria-describedby={describedBy(name, Boolean(hint), fieldState.invalid)}
        onChange={(event) => {
          field.onChange(event);
          if (
            fieldState.error &&
            fleetApplicationFormSchema.shape[name].safeParse(event.target.value).success
          )
            clearErrors(name);
        }}
      />
      </div>
      {hint && <FieldDescription id={`${name}-help`}>{hint}</FieldDescription>}
      {fieldState.error && (
        <FieldError id={`${name}-error`} role="alert" errors={[fieldState.error]} />
      )}
    </Field>
  );
}

export function FileField({ name, label }: Readonly<{ name: FleetFileField; label: string }>) {
  const { control, trigger } = useFormContext<FleetFormInput, unknown, FleetFormOutput>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { field, fieldState } = useController({ control, name });
  const logo = name === "logo" && !fieldState.invalid ? field.value : undefined;
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (!logo) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(logo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [logo]);
  const [dragging, setDragging] = useState(false);
  function selectFile(file: File | undefined) {
    field.onChange(file);
    void trigger(name);
  }
  const selected = field.value;
  const ready = selected && !fieldState.invalid;
  const help = name === "logo" ? "JPG or PNG · up to 10 MB" : "JPG, PNG or PDF · up to 10 MB";
  const chooser = <input type="file" name={field.name} id={name}
    ref={(element) => { inputRef.current = element; field.ref(element); }}
    onBlur={field.onBlur} required
    accept={name === "logo" ? "image/jpeg,image/png" : "image/jpeg,image/png,application/pdf"}
    className="fleet-file-input" aria-invalid={fieldState.invalid}
    aria-describedby={describedBy(name, true, fieldState.invalid)}
    onChange={(event) => selectFile(event.target.files?.[0])} />;
  return (
    <Field data-name={name} data-invalid={fieldState.invalid} className={`fleet-field fleet-file-field ${name === "logo" ? "fleet-logo-field" : ""}`}>
      {name === "logo" && <div className="fleet-logo-preview">{preview ? <img src={preview} alt="Selected company logo" /> : <Building2 aria-hidden="true" />}</div>}
      <div className="fleet-file-content">
        <FieldLabel htmlFor={name}>{label} <span aria-hidden="true">*</span></FieldLabel>
        <div className={`fleet-upload ${ready ? "is-ready" : ""} ${dragging ? "is-dragging" : ""}`}
          onDragOver={(event) => { event.preventDefault(); if (!event.currentTarget.closest("fieldset:disabled")) setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); if (!event.currentTarget.closest("fieldset:disabled")) selectFile(event.dataTransfer.files[0]); }}>
          {chooser}
          {name !== "logo" && <span className="fleet-upload-icon">{ready ? <Check aria-hidden="true" /> : <FileText aria-hidden="true" />}</span>}
          {name !== "logo" && <div className="fleet-upload-copy"><strong>{selected ? selected.name : "Drag a file here, or browse"}</strong><span>{selected ? `${(selected.size / 1024 / 1024).toFixed(1)} MB · ${ready ? "Ready to submit" : "Check this file"}` : help}</span></div>}
          <Button type="button" variant="outline" className="fleet-file-choose" onClick={() => inputRef.current?.click()}>
            {selected ? "Replace" : name === "logo" ? "Upload image" : "Choose file"}
          </Button>
          {selected && <Button type="button" variant="outline" className="fleet-file-remove" aria-label={`Remove ${label}`}
            onClick={() => { selectFile(undefined); if (inputRef.current) inputRef.current.value = ""; }}><X aria-hidden="true" /></Button>}
        </div>
        <FieldDescription id={`${name}-help`} className={name === "logo" ? "" : "sr-only"}>{help}</FieldDescription>
        {fieldState.error && <div className="fleet-file-error"><CircleAlert aria-hidden="true" /><FieldError id={`${name}-error`} role="alert" errors={[fieldState.error]} /></div>}
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
        className={controlClass}
        aria-invalid={fieldState.invalid}
        aria-describedby={fieldState.error ? "businessType-error" : undefined}
        onChange={(event) => {
          field.onChange(event);
          clearErrors("businessType");
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
