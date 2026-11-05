import { BadgePercent, PhilippinePeso, MapPinned } from "lucide-react";
import PageContainer from "../PageContainer";
import { homeBg, homeMain } from "@/constants/images";
import type { IHeroBadge } from "@/types/home";
import CTAButton from "../CTAButton";

const heroCtaClass: string =
  "w-full px-5 py-2.5 text-xs sm:w-auto sm:px-6 sm:py-3 sm:text-sm";

const heroBadges: IHeroBadge[] = [
  {
    title: "Proudly Pinoy-made",
    caption: "Filipino-built platform",
    icon: PhilippinePeso,
  },
  {
    title: "Zero commission for life",
    caption: "Drivers keep 100%",
    icon: BadgePercent,
  },
  {
    title: "Personal, business & bulk deliveries",
    caption: "Any vehicle, any load",
    icon: MapPinned,
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center w-full min-h-dvh bg-secondary pt-10"
      id="hero"
    >
      <img
        src={homeBg}
        alt="FastMet delivery"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/20" />

      <PageContainer className="relative z-10 flex flex-col justify-between w-full  py-16 sm:py-20 lg:py-24 2xl:py-28">
        {/* Main content */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-6">
          {/* Left: headline + text + CTAs (unchanged content) */}
          <div className="flex flex-col gap-4 w-full max-w-2xl text-white pt-16 md:pt-0 sm:gap-5 md:gap-6">
            <span className="inline-flex self-start items-center px-3 py-1.5 text-[10px] font-extrabold tracking-wide rounded-full sm:px-3.5 sm:text-[11px] 2xl:text-xs bg-primary text-secondary">
              Gawang Pinoy, bagong sistema ng delivery.
            </span>

            <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.15] text-primary sm:text-4xl lg:text-[2.5rem] 2xl:text-5xl">
              Delivery? <br /> FastMet agad!
            </h1>

            <div className="flex flex-col gap-3 max-w-xl text-[13px] font-medium leading-relaxed text-white/90 sm:text-sm md:gap-4 lg:text-[15px] 2xl:text-base">
              <p>
                Meet FastMet — the first subscription-based delivery platform in
                the Philippines, built by Filipinos for Filipinos.
              </p>
              <p>
                Whether it’s a small parcel or bulk cargo, we match you with the
                right vehicle and partner-driver. And for our drivers?{" "}
                <span className="font-extrabold text-primary">
                  Zero commission for life
                </span>
                . They keep every peso they earn.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <CTAButton
                to="/user-register"
                variant="primary"
                size="md"
                className={`${heroCtaClass} text-secondary shadow-lg flex-1 basis-full sm:flex-none sm:basis-auto`}
              >
                Book a delivery
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
                Get a quote
              </CTAButton>
            </div>
          </div>

          {/* Right: vehicle image (kept as-is) */}
          <div className="mt-4 md:mt-0 hidden md:flex flex-col gap-3 w-full lg:w-1/2">
            <div className="max-w-xl w-full self-center">
              <img
                src={homeMain}
                alt="FastMet delivery vehicles"
                className="object-contain w-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom stats row — placed below like the reference, fully responsive */}
        <div className="w-full self-center md:absolute md:bottom-0 md:transform md:translate-y-15">
          <div className="grid grid-cols-1 gap-5 w-full pt-10 mt-8 border-t border-white/15 sm:grid-cols-3 sm:gap-0">
            {heroBadges.map(({ title, caption, icon: Icon }, index) => (
              <div
                key={title}
                className={`flex gap-2.5 items-center ${
                  index > 0 ? "sm:pl-5 sm:border-l sm:border-white/15" : ""
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
