import { describe, expect, it } from "vitest";
import { fleetApplicationFormSchema as schema, fleetFileFields } from "@/schemas/fleetRegistration";
import { validFleetApplication } from "@/__tests__/fixtures/fleetFixtures";

describe("Fleet application validation", () => {
  it("normalizes names, email, phones and TIN without losing leading zeroes", () => {
    expect(schema.parse(validFleetApplication())).toMatchObject({ companyName: "Demo Fleet", companyEmail: "test@example.com", dispatchPhone: "09123456789", repMobile: "+639123456789", tin: "001002003" });
  });
  it.each(fleetFileFields)("requires %s, including the company logo", (field) => {
    const result = schema.safeParse({ ...validFleetApplication(), [field]: undefined });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0].path).toEqual([field]);
  });
  it.each(["logo", "repGovernmentId"] as const)("rejects empty, oversized or unsupported %s uploads", (field) => {
    for (const file of [new File([], "empty.png", { type: "image/png" }), new File([new Uint8Array(10 * 1024 * 1024 + 1)], "large.png", { type: "image/png" }), new File(["text"], "text.txt", { type: "text/plain" })]) {
      expect(schema.safeParse({ ...validFleetApplication(), [field]: file }).success).toBe(false);
    }
  });
  it("accepts PDFs as documents but rejects a PDF logo", () => {
    const values = validFleetApplication();
    expect(schema.safeParse(values).success).toBe(true);
    expect(schema.safeParse({ ...values, logo: values.registrationDocument }).success).toBe(false);
  });
  it.each([
    { acceptTerms: false }, { businessType: "Unknown" }, { dispatchPhone: "12345" },
    { repMobile: "+1 555 123 4567" }, { companyEmail: "invalid" }, { tin: "1234" },
    { companyName: "   " }, { repFullName: "x".repeat(251) }, { password: "unexpected" },
  ])("rejects invalid or unexpected fields: %j", (change) => {
    expect(schema.safeParse({ ...validFleetApplication(), ...change }).success).toBe(false);
  });
  it("accepts 12-digit TINs and supported business types", () => {
    for (const businessType of ["Sole proprietor", "Partnership", "Corporation", "Cooperative"]) {
      expect(schema.parse({ ...validFleetApplication(), tin: "001-002-003-004", businessType }).tin).toBe("001002003004");
    }
  });
});
