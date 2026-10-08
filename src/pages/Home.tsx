import {Helmet} from "react-helmet-async";
import QuestionForm from "@/components/home/QuestionForm";
import LoaderModal from "@/components/modals/Loader";
import {useRegistrationCounts} from "@/hooks/useRegistrationQueries";
import {useVehicles} from "@/hooks/useVehicleQueries";
import CTAButton from "@/components/CTAButton";
import PreRegisterActions from "@/components/PreRegisterActions";
import {DRIVER_PLAY_STORE_URL} from "@/helper/constant";

import {Truck, BriefcaseBusiness, MapPinned} from "lucide-react";
import {homeBg, homeBox, homeMain} from "@/constants/images";
import ServiceAreas from "@/components/home/ServiceAreas";
import UserDriverSplit from "@/components/home/UserDriverSplit";
import CoverageExplainer from "@/components/home/Coverage";
import PageContainer from "@/components/PageContainer";
import Registrations from "@/components/home/Registrations";

export default function Home() {
  const {isPending: countsLoading} = useRegistrationCounts();
  const {isPending: vehiclesLoading} = useVehicles();

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

        <PageContainer className="flex relative z-10 flex-col justify-between items-center py-20 lg:flex-row lg:gap-6">
          {/* Left: headline */}
          <div className="flex flex-col gap-5 max-w-xl text-white">
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl text-primary">
              Delivery? <br /> FastMet Agad!
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base font-semibold md:text-lg">
              On-demand delivery for personal, business, and bulk delivery
              needs. FastMet accepts delivery requests within Greater Manila and
              can deliver nationwide through land-accessible routes.
            </p>
            <PreRegisterActions
              layout="inline"
              userVariant="user"
              driverVariant="user"
              size="md"
              className="hidden mt-2 w-full lg:flex"
            />
          </div>

          <img
            src={homeMain}
            alt="FastMet delivery"
            className="object-cover w-full md:w-1/2"
          />

          <PreRegisterActions
            layout="stacked-mobile"
            userVariant="user"
            driverVariant="user"
            shortLabels
            className="lg:hidden"
          />
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
            ].map(({title, description, icon: Icon}) => (
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

          <div className="flex flex-col gap-6 justify-center items-center pb-10 border-b-2 border-primary lg:pt-5">
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
