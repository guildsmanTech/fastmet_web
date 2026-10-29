import { BadgePercent, PhilippinePeso, MapPinned } from "lucide-react";
import PageContainer from "../PageContainer";
import { homeBg, homeMain } from "@/constants/images";
import type { IHeroBadge } from "@/types/home";
import CTAButton from "../CTAButton";

const heroCtaClass: string =
  "w-full px-5 py-2.5 text-xs sm:w-auto sm:px-6 sm:py-3 sm:text-sm";

const heroBadges: IHeroBadge[] = [
  {
    title: "Proudly Pinoy-Made",
    caption: "Filipino-built platform",
    icon: PhilippinePeso,
  },
  {
    title: "Zero Commission for Life",
    caption: "Drivers keep 100%",
    icon: BadgePercent,
  },
  {
    title: "Personal, Business & Bulk Deliveries",
    caption: "Any vehicle, any load",
    icon: MapPinned,
  },
];

export default function HeroSection() {
  return (
    <section
      className="px-2 md:px-0 flex relative items-center w-full min-h-dvh bg-secondary"
      id="hero"
    >
      <img
        src={homeBg}
        alt="FastMet delivery"
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-black/20" />

      <PageContainer className="flex relative z-10 flex-col justify-between items-center py-16 gap-10 sm:py-20 lg:flex-row lg:gap-6 lg:py-24 2xl:py-28">
        {/* Left: headline */}
        <div className="pt-16 md:pt-0 flex flex-col gap-4 w-full max-w-2xl text-white sm:gap-5 md:gap-6">
          <span className="inline-flex self-start items-center px-3 py-1.5 text-[10px] font-extrabold tracking-wide rounded-full sm:px-3.5 sm:text-[11px] 2xl:text-xs bg-primary text-secondary">
            Gawang Pinoy, Bagong Sistema ng Delivery.
          </span>

          <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.15] text-primary sm:text-4xl lg:text-[2.5rem] 2xl:text-5xl">
            Delivery? <br /> FastMet Agad!
          </h1>

          {/* Description */}
          <div className="flex flex-col gap-3 max-w-xl text-[13px] font-medium leading-relaxed text-white/90 sm:text-sm md:gap-4 lg:text-[15px] 2xl:text-base">
            <p>
              Meet FastMet, the Philippines&apos; first-ever subscription-based
              delivery platform, proudly made by Filipinos for Filipinos.
            </p>
            <p>
              Mula sa small parcels at personal items hanggang business supplies
              at bulk cargo, FastMet connects you with the right vehicle and
              partner-driver for your delivery needs.
            </p>
            <p>
              And for our partner-drivers?{" "}
              <span className="font-extrabold text-primary">
                ZERO COMMISSION FOR LIFE!
              </span>{" "}
              Through our subscription-based model, drivers keep 100% of their
              delivery earnings.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-2">
            <CTAButton
              to="/user-register"
              variant="primary"
              size="md"
              // basis-full + flex-1: on phones this button takes the full row width
              // sm:flex-none sm:basis-auto: from 640px up it shrinks back to its content width
              className={`${heroCtaClass} text-secondary shadow-lg flex-1 basis-full sm:flex-none sm:basis-auto`}
            >
              Book a Delivery
            </CTAButton>

            <CTAButton
              to="/partner-driver"
              variant="user"
              size="md"
              className={`${heroCtaClass} flex-1 basis-full sm:flex-none sm:basis-auto`}
            >
              Drive with FastMet
            </CTAButton>

            <CTAButton
              to="/get-a-quote"
              variant="hero-outline"
              size="md"
              className={`${heroCtaClass} flex-1 basis-full sm:flex-none sm:basis-auto`}
            >
              Get a Quote
            </CTAButton>
          </div>
        </div>

        {/* Right: vehicle image + supporting badges */}
        <div className="mt-4 md:mt-0 flex flex-col gap-3 w-full lg:w-1/2">
          <div className="max-w-xl w-full self-center">
            <img
              src={homeMain}
              alt="FastMet delivery vehicles"
              className="object-contain w-full"
            />
          </div>

          {/* Hairline feature row (glass, no card backgrounds) */}
          <div className="grid grid-cols-1 gap-4 w-full pt-7 mt-1 border-t border-white/15 md:grid-cols-3 md:gap-0">
            {heroBadges.map(({ title, caption, icon: Icon }, index) => (
              <div
                key={title}
                className={`flex gap-2.5 items-center ${
                  index > 0 ? "md:pl-4 md:border-l md:border-white/15" : ""
                }`}
              >
                <Icon
                  className="size-5 shrink-0 text-primary"
                  strokeWidth={1.8}
                />
                <div className="min-w-0">
                  <h4 className="text-[13px] font-semibold leading-[1.25] text-white">
                    {title}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-white/65">{caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
