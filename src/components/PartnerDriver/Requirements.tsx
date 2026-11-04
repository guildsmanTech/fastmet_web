import {
  license,
  vehicleDocu,
  vehicleImage,
  vehicleNumbers,
} from "@/constants/images";
import { ChevronRight, Check } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import { DRIVER_PLAY_STORE_URL } from "@/helper/constant";

export interface RequirementStep {
  icon: string; // Replace 'any' with your actual icon type/import (e.g., LucideIcon, StaticImageData)
  title: string;
  items: string[];
}

export type RequirementsStepsList = RequirementStep[];

const REQUIREMENTS_STEPS: RequirementsStepsList = [
  {
    icon: license,
    title: "Driver's Identification",
    items: [
      "License number",
      "Clear photos of the front and back of your driver’s license",
      "Selfie holding your driver’s license",
      "NBI or police clearance",
    ],
  },
  {
    icon: vehicleNumbers,
    title: "Vehicle Information",
    items: ["Plate number", "Engine number", "Chassis number"],
  },
  {
    icon: vehicleImage,
    title: "Vehicle Photos",
    items: ["Front view", "Left side view", "Right side view", "Back view"],
  },
  {
    icon: vehicleDocu,
    title: "Vehicle Documents",
    items: [
      "Official Receipt (OR)",
      "Certificate of Registration (CR)",
      "Plate number photo",
      "Engine number photo",
      "Chassis number photo",
      "LTFRB PA/CPC (for L300, closed van, and wing van)",
      "Deed of Sale (if the vehicle has not yet been transferred to your name)",
      "Letter of Authorization and owner’s valid ID (if using someone else’s vehicle)",
    ],
  },
];

export function Requirements() {
  return (
    // relative + overflow-hidden: lets the decorative grid below sit behind content and never cause horizontal scroll
    <section
      id="requirements"
      className="relative px-3 md:px-0 w-full overflow-hidden bg-secondary py-24 lg:py-32"
    >
      {/* Decorative background grid: purely visual, hidden from screen readers.
          The mask fades it out toward the bottom so it never competes with the content. 
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />
     */}

      <PageContainer className="relative flex flex-col gap-14 lg:gap-16">
        {/* ───────── 1. Header ─────────
            Two-column on desktop: title left, supporting copy right, bottoms aligned.
            Left-aligned text reads as editorial/product-grade; centered stacks read as template. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            {/* Eyebrow: small uppercase label that tells the user where they are */}
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Driver onboarding
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Requirements to become a{" "}
              <span className="text-primary">FastMet partner-driver</span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-400 sm:text-base lg:col-span-5 lg:pb-1">
            Maging FastMet partner-driver at gamitin ang iyong sasakyan para sa
            mga delivery earning opportunities.
          </p>
        </div>

        {/* ───────── 2. Requirements grid ─────────
            Technique: the wrapper has a 1px gap and a translucent background, and each cell has the
            solid section color. The gap "shows through" as perfect hairline dividers at any column
            count, with no per-breakpoint border logic. */}
        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {REQUIREMENTS_STEPS.map(({ icon: Icon, title, items }, i) => (
            <li
              key={title}
              // group: lets children react when the whole cell is hovered
              className="group relative flex flex-col gap-6 bg-secondary p-6 transition-colors duration-200 hover:bg-white/[0.03] lg:p-7"
            >
              {/* Top row: icon tile on the left, step index on the right */}
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-colors duration-200 group-hover:border-primary/40">
                  <img src={Icon} alt="" className="size-5 object-contain" />
                </div>
                {/* Zero-padded index (01, 02...) built from the array index; tabular-nums keeps widths equal */}
                <span className="text-xs font-medium tabular-nums text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-base font-semibold text-white">{title}</h3>

                {/* Checklist: real check icons instead of default bullets, aligned with the first text line */}
                <ul className="flex flex-col gap-2.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-snug text-slate-400"
                    >
                      <Check
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        strokeWidth={2.5}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Small arrow badge on the seam between columns, desktop only, hidden on the last cell.
                  It hints at sequence without the noisy 5-chevron strip. */}
              {i < REQUIREMENTS_STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-7 z-10 hidden size-6 items-center justify-center rounded-full border border-white/10 bg-secondary text-white/40 lg:flex"
                >
                  <ChevronRight className="size-3.5" />
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* ───────── 3. Before you apply + CTA ─────────
            One bordered panel: checklist on the left, action on the right. Stacks on mobile. */}
        <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <h3 className="text-base font-semibold text-white">
              Before submitting your application
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                "Ensure all photos are clear and readable",
                "Prepare valid and updated documents",
                "Provide accurate information for verification",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-2.5 text-sm text-slate-400"
                >
                  <Check
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    strokeWidth={2.5}
                  />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* shrink-0 keeps the button from compressing; items-start on mobile, right-aligned feel on desktop */}
          <div className="flex shrink-0 flex-col gap-3 lg:items-end">
            <CTAButton
              href={DRIVER_PLAY_STORE_URL}
              variant="driver"
              className="px-6 py-3"
            >
              Download Driver App
            </CTAButton>
            <p className="max-w-xs text-xs leading-relaxed text-slate-500 lg:text-right">
              Once your application is reviewed, FastMet will send official
              updates regarding onboarding and activation.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
