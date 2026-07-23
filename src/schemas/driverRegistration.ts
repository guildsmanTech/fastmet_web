import {
  ALLOWED_EMAIL_DOMAINS,
  isAllowedEmailDomain,
} from "@/helper/emailDomain";
import {z} from "zod";

export const driverRegistrationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(/^[a-zA-Z\s\\-]+$/, "First name must contain letters only")
    .max(20, "First name must be less than 20 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[a-zA-Z\s\\-]+$/, "Last name must contain letters only")
    .max(20, "Last name must be less than 20 characters"),
  contactNumber: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^639\d{9}$/, "Invalid PH contact number"),
  email: z.email("Invalid email address").refine(isAllowedEmailDomain, {
    message: `Only ${ALLOWED_EMAIL_DOMAINS.join(", ")} addresses are accepted`,
  }),
});
