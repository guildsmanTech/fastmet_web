import { z } from "zod";
export const fleetBusinessTypes = [
  "Sole proprietor",
  "Partnership",
  "Corporation",
  "Cooperative",
] as const;

const text = z
  .string()
  .trim()
  .min(1, "This field is required.")
  .max(250, "Use 250 characters or fewer.");
const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s()-]/g, ""))
  .refine(
    (v) => /^(09\d{9}|\+639\d{9})$/.test(v),
    "Enter a PH mobile number: 09XX XXX XXXX or +63 9XX XXX XXXX.",
  );
const fleetRegistrationSchema = z
  .object({
    companyName: text,
    registeredBusinessName: text,
    businessType: z.enum(fleetBusinessTypes, {
      error: "Choose a business type.",
    }),
    garageAddress: text,
    dispatchPhone: phone,
    companyEmail: z.email("Enter a valid email address.").trim().toLowerCase().max(254),
    repFullName: text,
    repPosition: text,
    repMobile: phone,
    tin: z
      .string()
      .trim()
      .regex(
        /^(\d{9}|\d{12}|\d{3}-\d{3}-\d{3}(?:-\d{3})?)$/,
        "Enter 9 or 12 digits, optionally grouped with dashes.",
      )
      .transform((v) => v.replace(/-/g, "")),
    acceptTerms: z.literal(true, { error: "Agree to the terms before submitting." }),
  })
  .strict();
export const fleetFileFields = [
  "logo",
  "repGovernmentId",
  "registrationDocument",
  "businessPermit",
  "birCertificate",
] as const;
export type FleetFileField = (typeof fleetFileFields)[number];
function fileError(file: File, logo: boolean) {
  if (file.size === 0) return "The file is empty.";
  if (file.size > 10 * 1024 * 1024) return "Choose a file no larger than 10 MB.";
  if (
    !(logo ? ["image/jpeg", "image/png"] : ["image/jpeg", "image/png", "application/pdf"]).includes(
      file.type,
    )
  )
    return logo ? "Choose a JPG or PNG image." : "Choose a JPG, PNG or PDF file.";
  return "";
}

// The form keeps files in memory; only the normalized submission is sent to the API.
const applicationFile = (required: boolean, logo = false) =>
  z
    .custom<File | undefined>((value) => value === undefined || value instanceof File)
    .superRefine((file, context) => {
      const missingMessage = required ? "Upload this document." : "";
      const message = file ? fileError(file, logo) : missingMessage;
      if (message) context.addIssue({ code: "custom", message });
    });

export const fleetApplicationFormSchema = fleetRegistrationSchema.extend({
  businessType: z.string().pipe(fleetRegistrationSchema.shape.businessType),
  acceptTerms: z.boolean().pipe(fleetRegistrationSchema.shape.acceptTerms),
  logo: applicationFile(true, true),
  repGovernmentId: applicationFile(true),
  registrationDocument: applicationFile(true),
  businessPermit: applicationFile(true),
  birCertificate: applicationFile(true),
});
export type FleetFormInput = z.input<typeof fleetApplicationFormSchema>;
export type FleetFormOutput = z.output<typeof fleetApplicationFormSchema>;
