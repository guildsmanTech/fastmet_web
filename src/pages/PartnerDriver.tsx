import {Helmet} from "react-helmet-async";
import {partnerBg, partnerMain, partnerZero} from "@/constants/images";
import {BellRing, CalendarClock, Clock3, Target, Truck} from "lucide-react";
import CTAButton from "@/components/CTAButton";
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
          src={partnerBg}
          alt="FastMet delivery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <PageContainer className="relative z-10 py-20 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: headline */}
          <div className="flex flex-col gap-5 text-white max-w-xl">
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary leading-tight">
              May sasakyan ka? <br /> FastMet agad!
            </h1>
            <p className="text-white font-semibold text-base md:text-lg">
              Pre-register as a FastMet partner-driver and receive updates about
              onboarding, activation, and future delivery opportunities.
            </p>

            <div className="mt-2 hidden lg:block">
              <CTAButton
                to="/driver-register"
                variant="driver"
                size="sm"
                icon={Truck}
                className="px-10"
              >
                Pre-Register as a Driver
              </CTAButton>
            </div>

            <p className="text-white/80 text-xs md:text-base mt-2 hidden lg:block">
              Pre-registration pa lamang ito. Official updates will be sent
              through the contact details you provide.
            </p>
          </div>

          <img
            src={partnerMain}
            alt="FastMet delivery"
            className="w-full md:w-1/2 object-cover"
          />

          <div className="mt-2 w-full lg:hidden flex justify-center">
            <CTAButton
              to="/driver-register"
              variant="driver"
              size="sm"
              icon={Truck}
              fullWidth
              className="max-w-[300px]"
            >
              Pre-Register as a Driver
            </CTAButton>
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

          <img
            src={partnerZero}
            alt="FastMet Zero Commission"
            className="w-full min-h-40 object-cover"
          />
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
