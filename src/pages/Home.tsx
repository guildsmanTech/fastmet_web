import { Helmet } from "react-helmet-async";
import QuestionForm from "@/components/home/QuestionForm";
import LoaderModal from "@/components/modals/Loader";
import { useRegistrationCounts } from "@/hooks/useRegistrationQueries";
import { useVehicles } from "@/hooks/useVehicleQueries";
import CTAButton from "@/components/CTAButton";
import { DRIVER_PLAY_STORE_URL } from "@/helper/constant";

import {
  Truck,
  BriefcaseBusiness,
  MapPinned,
  PhilippinePeso,
  BadgePercent,
} from "lucide-react";
import { homeBg, homeBox, homeMain } from "@/constants/images";
import ServiceAreas from "@/components/home/ServiceAreas";
import UserDriverSplit from "@/components/home/UserDriverSplit";
import CoverageExplainer from "@/components/home/Coverage";
import PageContainer from "@/components/PageContainer";
import Registrations from "@/components/home/Registrations";

const heroCtaClass =
  "w-full px-5 py-2.5 text-xs sm:w-auto sm:px-6 sm:py-3 sm:text-sm";

const heroBadges = [
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

export default function Home() {
  const { isPending: countsLoading } = useRegistrationCounts();
  const { isPending: vehiclesLoading } = useVehicles();

  return (
    <div className="flex overflow-x-hidden flex-col gap-12 justify-center items-center w-full">
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
        className="flex relative items-center w-full min-h-dvh bg-secondary"
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
          <div className="flex flex-col gap-3 w-full lg:w-1/2">
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

      {/* ===== ANO ANG FASTMET ===== */}
      <section className="w-full">
        <PageContainer className="flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:flex-row md:gap-10">
            <img
              src={homeBox}
              alt="FastMet delivery"
              className="w-full md:w-1/2 aspect-[4/3] lg:w-1/3 object-cover rounded-2xl"
            />

            <div className="flex flex-col flex-1 gap-4">
              <h2 className="text-2xl font-bold text-center text-primary md:text-3xl lg:text-start">
                Ano ang FastMet?
              </h2>
              <p className="text-sm leading-relaxed text-justify text-gray-700 md:text-base">
                FastMet is an on-demand delivery platform that connects users
                and businesses with the right partner-driver and vehicle for
                their delivery needs. <br /> <br />
                Mula documents at small parcels hanggang appliances, business
                supplies, equipment, at larger cargo, may FastMet vehicle option
                para sa iba't ibang klase ng delivery. <br />
                <br />
                Delivery requests may come from Greater Manila, while
                destinations may reach different parts of the country through
                land-accessible routes.
              </p>
              <div className="flex flex-row gap-3 justify-center mt-2 lg:justify-start">
                <CTAButton to="/user-register" variant="driver" size="compact">
                  Pre-Register as a User
                </CTAButton>
                <CTAButton
                  href={DRIVER_PLAY_STORE_URL}
                  variant="driver"
                  size="compact"
                >
                  Download Driver App
                </CTAButton>
              </div>
            </div>
          </div>

          {/* Feature strip — icons still placeholder, none provided yet */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: "Different Vehicle Options",
                description: "From motorcycle to wing van.",
                icon: Truck,
              },
              {
                title: "For Personal and Business Use",
                description:
                  "For parcels, supplies, equipment, and larger cargo.",
                icon: BriefcaseBusiness,
              },
              {
                title: "Greater Manila to Nationwide",
                description:
                  "Delivery requests within Greater Manila, with delivery through land-accessible routes.",
                icon: MapPinned,
              },
            ].map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm transition group hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex justify-center items-center mb-4 rounded-lg size-11 bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>

                <h3 className="text-sm font-bold text-gray-900 md:text-base">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-gray-600 md:text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/*<div className="flex flex-col gap-6 justify-center items-center pb-10 border-b-2 border-primary lg:pt-5">
            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-lg font-bold lg:text-2xl">
                0% Commission — Subscription Fee Lang
              </h2>

              <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                FastMet partner-drivers keep 100% of their delivery earnings.
                Walang commission cut — subscription fee lang ang babayaran.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center text-center">
              <CTAButton
                to="/subscription"
                variant="ghost-border"
                size="md"
                className="px-3 py-2 text-sm cursor-pointer w-fit lg:px-5 md:text-base"
              >
                View Subscription Plans
              </CTAButton> 
              <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                Manage your plan anytime on the Subscription page or in the
                FastMet Driver app.
              </p>
            </div> 
          </div>*/}
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
