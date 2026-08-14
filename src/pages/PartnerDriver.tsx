import {Helmet} from "react-helmet-async";
import {homeBg, zero} from "@/constants/images";
import {
  BellRing,
  BookOpenText,
  CalendarClock,
  Clock3,
  Target,
  Truck,
} from "lucide-react";
import {Link} from "react-router-dom";
import {VEHICLE_TYPES} from "./Home";
import {Requirements} from "@/components/PartnerDriver/Requirements";
import {AcceptedVehicles} from "@/components/PartnerDriver/AcceptedVehicles";
import {Commission} from "@/components/PartnerDriver/GreaterManilaBanner";
import {DriverFAQ} from "@/components/PartnerDriver/Faq";
import {FinalCTA} from "@/components/PartnerDriver/FinalCTA";
import PageContainer from "@/components/PageContainer";

export default function PartnerDriver() {
  return (
    <div className="flex flex-col gap-10">
      <Helmet>
        <title>Become a FastMet Partner-Driver | Greater Manila</title>
        <meta
          name="description"
          content="Pre-register as a FastMet partner-driver. Own a motorcycle, sedan, van, or truck? Get updates on onboarding, activation, and delivery opportunities across Greater Manila."
        />
        <link rel="canonical" href="https://fastmet.com.ph/partner-driver" />
      </Helmet>
      {/* ===== HERO ===== */}
      <section
        className="relative w-full min-h-dvh flex items-center bg-secondary"
        id="hero"
      >
        <img
          src={homeBg}
          alt="FastMet delivery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <PageContainer className="relative z-10 py-20 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: headline */}
          <div className="flex flex-col gap-5 text-white max-w-xl">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              May sasakyan ka? <br /> FastMet agad!
            </h1>
            <p className="text-primary font-semibold text-base md:text-lg">
              Pre-register as a FastMet partner-driver and receive updates about
              onboarding, activation, and future delivery opportunities.
            </p>

            {/* Desktop: pre-register buttons */}
            <div className="gap-3 mt-2 hidden lg:flex">
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-white text-secondary font-semibold text-sm hover:bg-zinc-200 transition"
              >
                Learn More
              </Link>
              <Link
                to="/driver-register"
                className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-sm hover:from-yellow-500 hover:to-orange-600 transition"
              >
                <Truck className="size-4" />
                Pre-Register as a Driver
              </Link>
            </div>

            <p className="text-white/80 text-xs md:text-base mt-2 hidden lg:block">
              Pre-registration pa lamang ito. Official updates will be sent
              through the contact details you provide.
            </p>
          </div>

          {/* Right: 0% commission badge */}
          <div className="flex md:flex-col items-center justify-center w-full gap-3 md:gap-6 lg:items-center">
            <img
              src={zero}
              alt="0% commission"
              className="size-30 lg:size-40 object-contain xl:size-50"
            />
            <div className="w-full max-w-sm">
              <span className="block bg-primary text-[11px] md:text-sm font-bold uppercase tracking-wide text-center px-3 py-2 rounded-t-md text-white">
                Introductory 0% Commission
              </span>
              <div className="bg-black/50 border border-primary/60 border-t-0 rounded-b-md px-3 py-3 text-center">
                <p className="text-white/90 text-[11px] md:text-sm leading-snug">
                  Keep 100% of your delivery earnings during the introductory
                  zero-commission period.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile: pre-register buttons */}
          <div className="flex flex-col justify-center items-center gap-4 mt-2 w-full lg:hidden">
            <div className="flex justify-center gap-3 w-full md:w-5/6">
              <Link
                to="/"
                title="Learn More"
                aria-label="Learn More"
                className="flex items-center justify-center size-10 rounded-full bg-white hover:bg-zinc-200 transition"
              >
                <BookOpenText className="size-5" />
              </Link>

              <Link
                to="/driver-register"
                className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-sm hover:from-yellow-500 hover:to-orange-600 transition max-w-[300px]"
              >
                <Truck className="size-4" />
                Pre-Register as a Driver
              </Link>
            </div>
          </div>
          <p className="text-white/80 text-xs md:text-base mt-2 lg:hidden text-center">
            Pre-registration pa lamang ito. Official updates will be sent
            through the contact details you provide.
          </p>
        </PageContainer>
      </section>

      {/* ===== WHY PRE-REGISTER NOW ===== */}
      <section className="w-full">
        <PageContainer className="flex flex-col gap-8">
        <h2 className="text-primary font-bold text-2xl md:text-3xl text-center">
          Why Pre-Register Now?
        </h2>

        <div className="relative w-full rounded-2xl overflow-hidden">
          <img
            src={homeBg}
            alt="FastMet fleet"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-6 md:p-10">
            {/* Left: commission callout */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/3 lg:shrink-0">
              <img
                src={zero}
                alt="0% commission"
                className="size-20 md:size-30 object-contain"
              />
              <p className="text-primary font-bold text-lg md:text-xl mt-1">
                Introductory 0% Commission
              </p>
              <p className="text-white/80 text-sm md:text-base mt-2 max-w-xs">
                Eligible partner-drivers can keep 100% of their delivery
                earnings during the introductory period.
              </p>
            </div>

            {/* Right: vehicle grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-2/3">
              {VEHICLE_TYPES.map(({label, img}) => (
                <div
                  key={label}
                  className="relative aspect-square rounded-lg overflow-hidden shadow-md bg-gray-200"
                >
                  {img && (
                    <img
                      src={img}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        </PageContainer>
      </section>

      <section>
        <PageContainer className="flex flex-wrap justify-center gap-4">
        {[
          {
            title: "Ikaw ang May Hawak ng Oras Mo",
            description:
              "Choose when you are available once delivery opportunities begin.",
            icon: Clock3,
          },
          {
            title: "Walang Fixed Hours",
            description:
              "FastMet offers flexible opportunities for partner-drivers.",
            icon: CalendarClock,
          },
          {
            title: "Walang Daily Quota",
            description: "No required number of deliveries per day.",
            icon: Target,
          },
          {
            title: "Iba't Ibang Sasakyan, Iba't Ibang Delivery",
            description:
              "FastMet accepts different vehicles for different delivery needs.",
            icon: Truck,
          },
          {
            title: "Makatanggap ng Official Updates",
            description:
              "Be among the first to receive onboarding, activation, and launch updates.",
            icon: BellRing,
          },
        ].map(({title, description, icon: Icon}) => (
          <div
            key={title}
            className="group rounded-xl border w-[400px] border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>

            <h3 className="text-sm md:text-base font-bold text-gray-900">
              {title}
            </h3>

            <p className="mt-2 text-xs md:text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
        ))}
        </PageContainer>
      </section>

      <AcceptedVehicles />
      <Requirements />
      <Commission />
      <DriverFAQ />
      <FinalCTA />
    </div>
  );
}
