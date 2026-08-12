import {
  license,
  vehicleDocu,
  vehicleImage,
  vehicleNumbers,
} from "@/constants/images";
import {ChevronRight} from "lucide-react";
import {Link} from "react-router-dom";

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
    ],
  },
];

export function Requirements() {
  return (
    <section
      className="w-full bg-secondary px-4 md:px-12 xl:px-20 py-10 flex flex-col gap-10"
      id="requirements"
    >
      <h2 className="text-primary font-bold text-2xl md:text-3xl text-center">
        Requirements to Become a FastMet Partner-Driver
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-2 max-w-5xl mx-auto w-full px-6">
        {REQUIREMENTS_STEPS.map(({icon: Icon, title, items}, i) => (
          <div
            key={title}
            className="relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-4 lg:gap-3"
          >
            <div className="flex items-center justify-center size-14 lg:size-16 shrink-0 rounded-full border-2 border-primary text-primary">
              <img
                src={Icon}
                alt={title}
                className="size-6 lg:size-8 object-contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-primary font-bold text-sm">{title}</p>
              <ul className="text-white/80 text-xs flex flex-col gap-1 list-disc list-inside text-left">
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

      <div className="flex flex-col items-center gap-4 text-center max-w-xl mx-auto">
        <p className="text-primary font-semibold text-sm lg:text-base">
          Before Submitting Your Application
        </p>
        <ul className="text-white/80 text-xs flex flex-col gap-1 list-disc list-inside text-left">
          <li>Ensure all photos are clear and readable</li>
          <li>Prepare valid and updated documents</li>
          <li>Provide accurate information for verification</li>
        </ul>
        <p className="text-white/60 text-xs lg:text-sm">
          Once your application is reviewed, FastMet will send official updates
          regarding onboarding and activation.
        </p>
        <Link
          to="/driver-register"
          className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-sm hover:from-yellow-500 hover:to-orange-600 transition"
        >
          Pre-Register as a Driver
        </Link>
      </div>
    </section>
  );
}
