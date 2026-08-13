import {Helmet} from "react-helmet-async";
import {homeBg, zero} from "@/constants/images";
import {
  BadgePercent,
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
import {GreaterManilaBanner} from "@/components/PartnerDriver/GreaterManilaBanner";
import {DriverFAQ} from "@/components/PartnerDriver/Faq";
import {FinalCTA} from "@/components/PartnerDriver/FinalCTA";

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

        <div className="relative z-10 w-full px-4 md:px-12 xl:px-20 py-20 flex flex-col lg:flex-row items-center justify-between gap-6">
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
        </div>
      </section>

      {/* ===== WHY PRE-REGISTER NOW ===== */}
      <section className="w-full px-4 md:px-12 xl:px-20 flex flex-col gap-8">
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
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-12 xl:px-20">
        {[
          {
            text: "Introductory 0% Commission",
            subtext:
              "Eligible partner-drivers can keep 100% of their delivery earnings during the introductory period.",
            icon: BadgePercent,
          },
          {
            text: "Ikaw ang May Hawak ng Oras Mo",
            subtext:
              "Choose when you are available once delivery opportunities begin.",
            icon: Clock3,
          },
          {
            text: "Walang Fixed Hours",
            subtext:
              "FastMet offers flexible opportunities for partner-drivers.",
            icon: CalendarClock,
          },
          {
            text: "Walang Daily Quota",
            subtext: "No required number of deliveries per day.",
            icon: Target,
          },
          {
            text: "Iba't Ibang Sasakyan, Iba't Ibang Delivery",
            subtext:
              "FastMet accepts different vehicles for different delivery needs.",
            icon: Truck,
          },
          {
            text: "Makatanggap ng Official Updates",
            subtext:
              "Be among the first to receive onboarding, activation, and launch updates.",
            icon: BellRing,
          },
        ].map(({text, subtext, icon: Icon}) => (
          <div
            key={text}
            className="flex gap-4 rounded-2xl border border-gray-200 items-center bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Icon className="size-5" />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm md:text-base font-bold text-gray-900">
                {text}
              </h3>

              <p className="mt-1.5 text-xs md:text-sm leading-relaxed text-gray-500">
                {subtext}
              </p>
            </div>
          </div>
        ))}
      </section>

      <AcceptedVehicles />
      <Requirements />
      <GreaterManilaBanner />
      <DriverFAQ />
      <FinalCTA />
    </div>
  );
}
