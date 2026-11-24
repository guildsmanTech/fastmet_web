import { z } from "zod";
import { API_URL } from "@/helper/constant";
import {
  fleetApplicationFormSchema,
  type FleetFormInput,
  type FleetFormOutput,
} from "@/schemas/fleetRegistration";

export const fleetApplicationsUrl = `${API_URL}/api/fleet/applications`;

const errorResponse = z.object({
  message: z.string().optional(),
  errors: z.record(z.string(), z.unknown()).optional(),
  retryAfterSeconds: z.number().int().nonnegative().optional(),
});

type FieldError = Readonly<{ name: keyof FleetFormInput; message: string }>;
type SubmissionResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors: FieldError[]; rateLimited?: true; retryAfterSeconds?: number };

function isFieldName(name: string): name is keyof FleetFormInput {
  return Object.hasOwn(fleetApplicationFormSchema.shape, name);
}

function readFailure(payload: unknown): SubmissionResult {
  const parsed = errorResponse.safeParse(payload);
  const details = parsed.success ? parsed.data : undefined;
  const fieldErrors: FieldError[] = [];
  for (const [name, message] of Object.entries(details?.errors ?? {})) {
    if (isFieldName(name) && typeof message === "string") {
      fieldErrors.push({ name, message });
    }
  }
  return {
    ok: false,
    message: details?.message ?? "Unable to submit your application. Please try again.",
    fieldErrors,
  };
}

export async function submitFleetApplication(
  values: Readonly<FleetFormOutput>,
  captcha: string,
): Promise<SubmissionResult> {
  const body = new FormData();
  for (const [name, value] of Object.entries(values)) {
    if (value !== undefined) body.set(name, value instanceof File ? value : String(value));
  }
  body.set("captcha", captcha);

  try {
    const response = await fetch(fleetApplicationsUrl, { method: "POST", body });
    if (response.status === 201) return { ok: true };

    const payload: unknown = await response.json().catch(() => null);
    if (response.status === 429) {
      const parsed = errorResponse.safeParse(payload);
      return {
        ok: false,
        rateLimited: true,
        message: parsed.data?.message ?? "Too many application attempts. Please try again later.",
        fieldErrors: [],
        retryAfterSeconds: parsed.data?.retryAfterSeconds,
      };
    }
    return readFailure(payload);
  } catch {
    return {
      ok: false,
      message: "Unable to reach FastMet. Your entries and files are still here. Please try again.",
      fieldErrors: [],
    };
  }
}
