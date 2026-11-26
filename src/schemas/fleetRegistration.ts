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
    // The API receives a digit string so TINs retain their leading zeroes.
    tin: z
      .string()
      .trim()
      .regex(
        /^(\d{9}|\d{12}|\d{3}-\d{3}-\d{3}(?:-\d{3})?)$/,
        "Enter 9 or 12 digits, optionally grouped with dashes.",
      )
      .transform((v) => v.replaceAll("-", "")),
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
// Check the filename against the browser-reported MIME type for early feedback.
const fileExtensions = new Map([
  ["image/jpeg", /\.jpe?g$/i],
  ["image/png", /\.png$/i],
  ["application/pdf", /\.pdf$/i],
]);

function fileError(file: File, logo: boolean) {
  if (file.size === 0) return "The file is empty.";
  if (file.size > 10 * 1024 * 1024) return "Choose a file no larger than 10 MB.";
  const extension = fileExtensions.get(file.type);
  if (!extension || (logo && file.type === "application/pdf")) {
    return logo ? "Choose a JPG or PNG image." : "Choose a JPG, PNG or PDF file.";
  }
  if (!extension.test(file.name)) return "Choose a file with an extension that matches its type.";
  return "";
}

// The form keeps files in memory; only the normalized submission is sent to the API.
const applicationFile = (logo = false) =>
  z
    .custom<File | undefined>((value) => value === undefined || value instanceof File)
    .superRefine((file, context) => {
      const message = file ? fileError(file, logo) : "Upload this document.";
      if (message) context.addIssue({ code: "custom", message });
    });

export const fleetApplicationFormSchema = fleetRegistrationSchema.extend({
  businessType: z.string().pipe(fleetRegistrationSchema.shape.businessType),
  acceptTerms: z.boolean().pipe(fleetRegistrationSchema.shape.acceptTerms),
  logo: applicationFile(true),
  repGovernmentId: applicationFile(),
  registrationDocument: applicationFile(),
  businessPermit: applicationFile(),
  birCertificate: applicationFile(),
});
export type FleetFormInput = z.input<typeof fleetApplicationFormSchema>;
export type FleetFormOutput = z.output<typeof fleetApplicationFormSchema>;
