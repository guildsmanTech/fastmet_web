import { describe, expect, it, vi } from "vitest";
import { fleetApplicationFormSchema } from "@/schemas/fleetRegistration";
import { validFleetApplication } from "@/__tests__/fixtures/fleetFixtures";
import { fleetApplicationsUrl, submitFleetApplication } from "@/api/fleetApplications";

vi.mock("@/helper/constant", () => ({ API_URL: "https://api.example.test" }));
const values = () => fleetApplicationFormSchema.parse(validFleetApplication());

describe("Fleet submissions", () => {
  it("posts normalized multipart values and files without setting a broken content-type boundary", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await submitFleetApplication(values())).toEqual({ ok: true });
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe(fleetApplicationsUrl);
    expect(options.method).toBe("POST");
    expect(options.headers).toBeUndefined();
    const body = options.body as FormData;
    expect(body.get("companyEmail")).toBe("test@example.com");
    expect(body.get("tin")).toBe("001002003");
    expect(body.get("acceptTerms")).toBe("true");
    expect(body.get("logo")).toBeInstanceOf(File);
    expect(body.get("repGovernmentId")).toBeInstanceOf(File);
    expect(body.has("password")).toBe(false);
  });
  it("maps known server errors while ignoring unknown fields and non-text errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ message: "Duplicate email", errors: { companyEmail: "Already used", logo: "Required", password: "Unexpected", tin: 123 } }, { status: 409 })));
    expect(await submitFleetApplication(values())).toEqual({ ok: false, message: "Duplicate email", fieldErrors: [{ name: "companyEmail", message: "Already used" }, { name: "logo", message: "Required" }] });
  });
  it.each(["not JSON", JSON.stringify({ message: 123 }), JSON.stringify({})])("handles malformed server responses", async (body) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body, { status: 503 })));
    expect(await submitFleetApplication(values())).toEqual({ ok: false, message: "Unable to submit your application. Please try again.", fieldErrors: [] });
  });
  it("returns a recoverable error after a network failure without changing the selected files", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Network error")));
    const input = values(); const logo = input.logo;
    expect(await submitFleetApplication(input)).toMatchObject({ ok: false, message: expect.stringContaining("Your entries and files are still here") });
    expect(input.logo).toBe(logo);
  });
});
