import { describe, expect, it } from "vitest";
import { formatDate, formatPHNumber, formatReadTime } from "@/helper/format";
import { isAllowedEmailDomain } from "@/helper/emailDomain";
import { formatDay, formatManilaDate, formatManilaDateTime, formatPeso, isSafeCheckoutUrl } from "@/helper/subscription";
import { priceForTab } from "@/helper/itemTypes";

describe("Phone and display formatting", () => {
  it.each(["09123456789", "+63 912 345 6789", "9123456789"])("formats PH phone %s", (phone) => {
    expect(formatPHNumber(phone)).toBe("0912-345-6789");
  });
  it("preserves unsupported numbers and handles empty values", () => {
    expect(formatPHNumber("")).toBe("");
    expect(formatPHNumber("+1 555 123 4567")).toBe("+1 555 123 4567");
    expect(formatReadTime(5)).toBe("5 min read");
    expect(formatDate("2026-11-23T12:00:00+08:00")).toBe("November 23, 2026");
  });
  it("formats whole and fractional peso amounts", () => {
    expect(formatPeso(1250)).toBe("₱1,250");
    expect(formatPeso(1250.5)).toBe("₱1,250.50");
    expect(formatPeso(0)).toBe("₱0");
  });
});
describe("Date handling", () => {
  it("keeps calendar dates stable and gracefully handles missing input", () => {
    expect(formatDay("2026-11-07")).toBe("November 7, 2026");
    expect(formatDay(null)).toBe("");
    expect(formatDay(undefined)).toBe("");
    expect(formatDay("unrecognized")).toBe("unrecognized");
  });
  it("uses Manila time across the UTC day boundary", () => {
    const input = "2026-11-22T18:30:00Z";
    expect(formatManilaDate(input)).toBe("Nov 23, 2026");
    expect(formatManilaDateTime(input)).toMatch(/November 23, 2026.*2:30\s*AM/i);
  });
  it.each([null, undefined, "", "invalid"])("handles absent or invalid timestamps: %s", (input) => {
    expect(formatManilaDateTime(input)).toBe("");
    expect(formatManilaDate(input)).toBe("");
  });
});
describe("Checkout and email validation", () => {
  it.each(["https://checkout.example.com/pay", "https://checkout.example.com/pay?id=123"])("accepts secure checkout URL %s", (url) => {
    expect(isSafeCheckoutUrl(url)).toBe(true);
  });
  it.each(["http://example.com", "javascript:alert(1)", "data:text/html,test", "//example.com", "/pay", "invalid", ""])("rejects unsafe checkout URL %s", (url) => {
    expect(isSafeCheckoutUrl(url)).toBe(false);
  });
  it.each(["person@gmail.com", "person@YAHOO.COM", "person@icloud.com"])("accepts supported email domain %s", (email) => {
    expect(isAllowedEmailDomain(email)).toBe(true);
  });
  it.each(["person@example.com", "person@gmail.com.evil.test", "missing-at", ""])("rejects unsupported domain %s", (email) => {
    expect(isAllowedEmailDomain(email)).toBe(false);
  });
});
describe("Quote pricing", () => {
  const variant = { variantId: "van", maxLoadKg: 1000, asapPrice: 100, scheduledPrice: 120, poolingPrice: null };
  it("selects the appropriate rate and preserves unavailable or zero rates", () => {
    expect(priceForTab(variant, "asap")).toBe(100);
    expect(priceForTab(variant, "schedule")).toBe(120);
    expect(priceForTab(variant, "pooling")).toBeNull();
    expect(priceForTab({ ...variant, asapPrice: 0 }, "asap")).toBe(0);
  });
});
