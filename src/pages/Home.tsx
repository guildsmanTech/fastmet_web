import { Helmet } from "react-helmet-async";
import QuestionForm from "@/components/home/QuestionForm";
import LoaderModal from "@/components/modals/Loader";
import { useRegistrationCounts } from "@/hooks/useRegistrationQueries";
import { useVehicles } from "@/hooks/useVehicleQueries";
import CTAButton from "@/components/CTAButton";
import { DRIVER_PLAY_STORE_URL } from "@/helper/constant";

import {
  BadgePercent,
  Coins,
  Download,
  MapPinned,
  PhilippinePeso,
  Truck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { homeBg, homeMain } from "@/constants/images";
import ServiceAreas from "@/components/home/ServiceAreas";
import UserDriverSplit from "@/components/home/UserDriverSplit";
import CoverageExplainer from "@/components/home/Coverage";
import PageContainer from "@/components/PageContainer";
import Registrations from "@/components/home/Registrations";
import PhSunIcon from "@/assets/home/PhSunIcon";
import type { ElementType } from "react";

interface IHeroBadge {
  title: string;
  caption: string;
  icon: ElementType;
}

interface IWhyFastMet extends Omit<IHeroBadge, "caption"> {
  description: string;
}

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

const whyFastmet: IWhyFastMet[] = [
  {
    title: "Gawang Pinoy",
    description:
      "Binuo sa Pilipinas, para sa mga Pilipinong nagpapadala at nagde-deliver.",
    icon: PhSunIcon,
  },
  {
    title: "Zero Commission for Life",
    description:
      "Walang kinukuhang komisyon sa partner-driver. Sa kanila napupunta ang kita.",
    icon: Coins,
  },
  {
    title: "Vehicle Options",
    description:
      "Mula documents at small parcels hanggang appliances at larger cargo, may sasakyang akma.",
    icon: Truck,
  },
  {
    title: "Personal & Business",
    description:
      "Para sa personal, business, at bulk deliveries, iisang platform lang.",
    icon: UsersRound,
  },
];

// TAKE_NOTE: px-2 md:px-0 (OVERALL EACH SECTION)

export default function Home() {
  const { isPending: countsLoading } = useRegistrationCounts();
  const { isPending: vehiclesLoading } = useVehicles();

  return (
    <div className="flex overflow-x-hidden flex-col justify-center items-center w-full">
      <Helmet>
        <title>
          FastMet – Fast & Reliable On-Demand Delivery in Greater Manila
        </title>
        <meta
          name="description"
          content="Book a courier in seconds. FastMet connects users and businesses with the right partner-driver and vehicle — from motorcycle to wing van — across Greater Manila and nationwide land routes. Pre-register now."
        />
        <link rel="canonical" href="https://fastmet.com.ph/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FastMet",
            url: "https://fastmet.com.ph",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "FastMet",
            url: "https://fastmet.com.ph",
            logo: "https://fastmet.com.ph/fastmet_icon.png",
            description: "On-demand delivery platform in Greater Manila",
            areaServed: "Greater Manila",
            sameAs: [],
          })}
        </script>
      </Helmet>
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
                Meet FastMet, the Philippines&apos; first-ever
                subscription-based delivery platform, proudly made by Filipinos
                for Filipinos.
              </p>
              <p>
                Mula sa small parcels at personal items hanggang business
                supplies at bulk cargo, FastMet connects you with the right
                vehicle and partner-driver for your delivery needs.
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
          <div className="mt-5 md:mt-0 flex flex-col gap-3 w-full lg:w-1/2">
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
                    <p className="mt-0.5 text-[11px] text-white/65">
                      {caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ===== WHY FASTMET ===== bg-[#fffaf3] */}
      <section className="mb-12 relative isolate w-full overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* <div
          aria-hidden="true"
          className="absolute -right-24 -top-28 -z-10 size-72 rounded-full bg-[#fff0d9]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-24 -z-10 size-80 rounded-full bg-[#fff0d9]"
        /> */}

        <PageContainer className="flex flex-col gap-7 sm:gap-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-[#fff0d9] px-4 py-2 text-sm font-bold text-primary">
                WHY FASTMET?
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-secondary sm:text-4xl lg:text-5xl">
                Mas madaling biyahe.
                <br />
                Mas maraming <span className="text-primary">oportunidad.</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Isang on-demand delivery platform na nag-uugnay sa mga users at
                negosyo sa tamang partner-driver at sasakyan, mula documents
                hanggang malaking cargo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <CTAButton
                to="/user-register"
                variant="driver"
                size="md"
                icon={UserRound}
              >
                Pre-Register as a User
              </CTAButton>
              <CTAButton
                href={DRIVER_PLAY_STORE_URL}
                variant="outline-primary"
                size="md"
                icon={Download}
              >
                Download Driver App
              </CTAButton>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {whyFastmet.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="relative min-h-60 overflow-hidden rounded-2xl border border-orange-100 bg-white/80 py-10 px-8 shadow-sm"
              >
                <div
                  aria-hidden="true"
                  className="absolute -bottom-16 -right-8 size-36 rotate-[-28deg] rounded-[45%] bg-gradient-to-br from-orange-50 to-orange-100/80"
                />
                <div className="relative z-10">
                  <h3 className="max-w-[14rem] text-xl font-bold leading-tight text-secondary sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-600">
                    {description}
                  </p>
                </div>
                <Icon
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 z-10 size-12 text-orange-300"
                  strokeWidth={1.8}
                />
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <UserDriverSplit />

      <CoverageExplainer />

      <ServiceAreas />

      <Registrations />

      <QuestionForm />

      <LoaderModal open={countsLoading || vehiclesLoading} />
    </div>
  );
}
