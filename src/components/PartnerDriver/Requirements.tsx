import {
  license,
  vehicleDocu,
  vehicleImage,
  vehicleNumbers,
} from "@/constants/images";
import {ChevronRight} from "lucide-react";
import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";

const REQUIREMENTS_STEPS = [
  {
    icon: license,
    title: "Driver's License",
    items: [
      "License Number",
      "Front and Back Photos of License",
      "Selfie holding your driver's license",
    ],
  },
  {
    icon: vehicleNumbers,
    title: "Vehicle Information",
    items: ["Plate Number", "Engine Number", "Chassis Number"],
  },
  {
    icon: vehicleImage,
    title: "Vehicle Photos",
    items: ["Front View", "Left Side View", "Right Side View", "Back View"],
  },
  {
    icon: vehicleDocu,
    title: "Vehicle Documents",
    items: [
      "Official Receipt (OR)",
      "Certificate of Registration (CR)",
      "Plate Number Photo",
      "Engine Number Photo",
      "Chassis Number Photo",
      "LTFRB PA/CPC (L300, Closed Van, and Wing Van)",
      "NBI or Police Clearance",
      "Deed of Sale — if not yet transferred to your name",
      "Letter of Authorization + Owner's Valid ID — if using someone else's vehicle",
    ],
  },
];

export function Requirements() {
  return (
    <section className="py-10 w-full bg-secondary" id="requirements">
      <PageContainer className="flex flex-col gap-10">
        <h2 className="text-2xl font-bold text-center text-primary md:text-3xl">
          Requirements to Become a FastMet Partner-Driver
        </h2>

        <div className="grid grid-cols-1 gap-8 px-6 mx-auto w-full max-w-5xl md:grid-cols-2 lg:grid-cols-4 lg:gap-2">
          {REQUIREMENTS_STEPS.map(({icon: Icon, title, items}, i) => (
            <div
              key={title}
              className="flex relative flex-row gap-4 items-start text-left lg:flex-col lg:items-center lg:text-center lg:gap-3"
            >
              <div className="flex justify-center items-center rounded-full border-2 size-14 lg:size-16 shrink-0 border-primary text-primary">
                <img
                  src={Icon}
                  alt={title}
                  className="object-contain size-6 lg:size-8"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold text-primary">{title}</p>
                <ul className="flex flex-col gap-1 text-xs list-disc list-inside text-left text-white/80 md:text-sm">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {i < REQUIREMENTS_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute top-7 -right-4 items-center gap-0.5">
                  {Array.from({length: 5}).map((_, j) => (
                    <ChevronRight
                      key={j}
                      className="size-4 text-primary/60 -mx-1.5"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 items-center mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold text-primary lg:text-base">
            Before Submitting Your Application
          </p>
          <ul className="flex flex-col gap-1 text-xs list-disc list-inside text-left text-white/80 md:text-sm">
            <li>Ensure all photos are clear and readable</li>
            <li>Prepare valid and updated documents</li>
            <li>Provide accurate information for verification</li>
          </ul>
          <p className="text-xs text-white/60 lg:text-sm">
            Once your application is reviewed, FastMet will send official
            updates regarding onboarding and activation.
          </p>
          <CTAButton
            to="/driver-register"
            variant="driver"
            className="mt-2 px-6 py-2.5"
          >
            Pre-Register as a Driver
          </CTAButton>
        </div>
      </PageContainer>
    </section>
  );
}
