import {Helmet} from "react-helmet-async";
import {partnerBg, partnerMain, partnerZero} from "@/constants/images";
import {
  BellRing,
  CalendarClock,
  Clock3,
  Smartphone,
  Target,
  Truck,
} from "lucide-react";
import CTAButton from "@/components/CTAButton";
import {Requirements} from "@/components/PartnerDriver/Requirements";
import {AcceptedVehicles} from "@/components/PartnerDriver/AcceptedVehicles";
import {Commission} from "@/components/PartnerDriver/GreaterManilaBanner";
import {DriverFAQ} from "@/components/PartnerDriver/Faq";
import {FinalCTA} from "@/components/PartnerDriver/FinalCTA";
import PageContainer from "@/components/PageContainer";
import {DRIVER_PLAY_STORE_URL} from "@/helper/constant";

export default function PartnerDriver() {
  return (
    <div className="flex flex-col gap-10">
      <Helmet>
        <title>Become a FastMet Partner-Driver | Greater Manila</title>
        <meta
          name="description"
          content="Download the FastMet Driver app. Own a motorcycle, sedan, van, or truck? Manage deliveries and grow as a partner-driver across Greater Manila."
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
              May Sasakyan Ka? <br /> FastMet Agad!
            </h1>
            <p className="text-white font-semibold text-base md:text-lg">
              Download the FastMet Driver app to start as a partner-driver and
              manage deliveries, earnings, and opportunities.
            </p>

            <div className="mt-2 hidden lg:flex gap-3">
              <CTAButton
                href={DRIVER_PLAY_STORE_URL}
                variant="driver"
                size="sm"
                icon={Smartphone}
                className="px-10"
              >
                Download Driver App
              </CTAButton>
              <CTAButton
                to="/subscription"
                variant="user"
                size="sm"
                className="px-6"
              >
                Get Subscription
              </CTAButton>
            </div>

            <p className="text-white/80 text-xs md:text-base mt-2 hidden lg:block">
              Available on Google Play. Manage your plan anytime via
              Subscription.
            </p>
          </div>

          <img
            src={partnerMain}
            alt="FastMet delivery"
            className="w-full md:w-1/2 object-cover"
          />

          <div className="mt-2 w-full lg:hidden flex flex-col items-center gap-3">
            <CTAButton
              href={DRIVER_PLAY_STORE_URL}
              variant="driver"
              size="sm"
              icon={Smartphone}
              fullWidth
              className="max-w-[300px]"
            >
              Download Driver App
            </CTAButton>
            <CTAButton
              to="/subscription"
              variant="user"
              size="sm"
              fullWidth
              className="max-w-[300px]"
            >
              Get Subscription
            </CTAButton>
          </div>
          <p className="text-white/80 text-xs md:text-base mt-2 lg:hidden text-center">
            Available on Google Play. Manage your plan anytime via Subscription.
          </p>
        </PageContainer>
      </section>

      {/* ===== WHY JOIN NOW ===== */}
      <section className="w-full">
        <PageContainer className="flex flex-col gap-8">
          <h2 className="text-primary font-bold text-2xl md:text-3xl text-center">
            Why Join Now?
          </h2>

          <img
            src={partnerZero}
            alt="FastMet 0% commission, subscription fee lang"
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
