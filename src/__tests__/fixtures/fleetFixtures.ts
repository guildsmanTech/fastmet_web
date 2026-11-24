import type { FleetFormInput } from "@/schemas/fleetRegistration";

export function validFleetApplication(): FleetFormInput {
  const image = () => new File(["sample image"], "logo.png", { type: "image/png" });
  const document = () => new File(["sample PDF"], "document.pdf", { type: "application/pdf" });
  return {
    companyName: " Demo Fleet ", registeredBusinessName: "Demo Fleet Inc.",
    businessType: "Corporation", garageAddress: "Manila",
    dispatchPhone: "0912 345 6789", companyEmail: "TEST@example.com",
    repFullName: "Test Representative", repPosition: "Manager",
    repMobile: "+63 (912) 345-6789", tin: "001-002-003", acceptTerms: true,
    logo: image(), repGovernmentId: document(), registrationDocument: document(),
    businessPermit: document(), birCertificate: document(),
  };
}
