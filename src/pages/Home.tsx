import {Helmet} from "react-helmet-async";
import QuestionForm from "@/components/home/QuestionForm";
import LoaderModal from "@/components/modals/Loader";
import {useRegistrationCounts} from "@/hooks/useRegistrationQueries";
import {useVehicles} from "@/hooks/useVehicleQueries";
import {Link} from "react-router-dom";

import {UserRound, Truck, BriefcaseBusiness, MapPinned} from "lucide-react";
import {
  motor,
  sedan,
  pickUp,
  smallVan,
  subcompact,
  l300,
  closedVan,
  wingVan,
  homeBg,
  homeBox,
} from "@/constants/images";
import ServiceAreas from "@/components/home/ServiceAreas";
import UserDriverSplit from "@/components/home/UserDriverSplit";
import CoverageExplainer from "@/components/home/Coverage";
import PageContainer from "@/components/PageContainer";

export const VEHICLE_TYPES = [
  {label: "Motorcycle", img: motor},
  {label: "Sedan", img: sedan},
  {label: "Pick-up", img: pickUp},
  {label: "SUV / Small Van", img: smallVan},
  {label: "Subcompact SUV", img: subcompact},
  {label: "L300", img: l300},
  {label: "Closed Van", img: closedVan},
  {label: "Wing Van", img: wingVan},
];

export default function Home() {
  const {isPending: countsLoading} = useRegistrationCounts();
  const {isPending: vehiclesLoading} = useVehicles();

  return (
    <div className="flex items-center justify-center flex-col w-full overflow-x-hidden gap-12">
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
            "name": "FastMet",
            "url": "https://fastmet.com.ph",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "FastMet",
            "url": "https://fastmet.com.ph",
            "logo": "https://fastmet.com.ph/fastmet_icon.png",
            "description": "On-demand delivery platform in Greater Manila",
            "areaServed": "Greater Manila",
            "sameAs": [],
          })}
        </script>
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

        <PageContainer className="relative z-10 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: headline */}
          <div className="flex flex-col gap-5 text-white max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Delivery? <br /> FastMet Agad.
            </h1>
            <p className="text-primary font-semibold text-base md:text-lg">
              On-demand delivery for personal, business, and bulk delivery
              needs. FastMet accepts delivery requests within Greater Manila and
              can deliver nationwide through land-accessible routes.
            </p>
            {/* Desktop: pre-register buttons */}
            <div className="gap-3 mt-2 hidden lg:flex">
              <Link
                to="/user-register"
                className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-white text-secondary font-semibold text-sm hover:bg-zinc-200 transition"
              >
                <UserRound className="size-4" />
                Pre-Register as a User
              </Link>
              <Link
                to="/driver-register"
                className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-sm hover:from-yellow-500 hover:to-orange-600 transition"
              >
                <Truck className="size-4" />
                Pre-Register as a Driver
              </Link>
            </div>
          </div>

          {/* Right: vehicle grid */}
          <div className="grid grid-cols-4 gap-1 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl 2xl:max-w-2xl mx-auto lg:mx-0">
            {VEHICLE_TYPES.map(({label, img}) => (
              <div
                className="relative aspect-square rounded-lg overflow-hidden shadow-md bg-gray-200"
                key={label}
              >
                <img
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Mobile: pre-register buttons */}
          <div className="flex flex-col justify-center items-center gap-4 mt-2 w-full lg:hidden">
            <span className="text-white/90 font-semibold text-xs uppercase tracking-wide">
              Pre-Register as a:
            </span>
            <div className="flex gap-3 w-full md:w-5/6">
              <Link
                to="/user-register"
                className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-white text-secondary font-semibold text-sm hover:bg-zinc-200 transition"
              >
                <UserRound className="size-4" />
                User
              </Link>
              <Link
                to="/driver-register"
                className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-sm hover:from-yellow-500 hover:to-orange-600 transition"
              >
                <Truck className="size-4" />
                Driver
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ===== ANO ANG FASTMET ===== */}
      <section className="w-full">
        <PageContainer className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row gap-5 md:gap-10">
            <img
              src={homeBox}
              alt="FastMet delivery"
              className="w-full md:w-1/2 aspect-[4/3] lg:w-1/3 object-cover rounded-2xl"
            />

            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-primary font-bold text-2xl md:text-3xl text-center lg:text-start">
                Ano ang FastMet?
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
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
              <div className="flex gap-3 mt-2 flex-row justify-center lg:justify-start">
                <Link
                  to="/user-register"
                  className="px-3 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-xs hover:from-yellow-500 hover:to-orange-600 transition text-center lg:text-sm lg:py-3 lg:px-5"
                >
                  Pre-Register as a User
                </Link>
                <Link
                  to="/driver-register"
                  className="px-3 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-xs hover:from-yellow-500 hover:to-orange-600 transition text-center lg:text-sm lg:py-3 lg:px-5"
                >
                  Pre-Register as a Driver
                </Link>
              </div>
            </div>
          </div>

          {/* Feature strip — icons still placeholder, none provided yet */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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
          </div>

          <div className="flex flex-col gap-6 border-b-2 border-primary pb-10 justify-center items-center lg:pt-5">
            <div className="flex flex-col gap-1 text-center">
              <h2 className="text-lg font-bold lg:text-2xl">
                Introductory 0% Commission for Partner-Drivers
              </h2>

              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                During the introductory zero-commission period, eligible FastMet
                partner-drivers can keep 100% of their delivery earnings.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Link
                to="/blog/filipino-made-delivery-app-fastmet"
                className="rounded-full border-2 w-fit shadow-xl border-primary py-2 px-3 lg:px-5 text-sm md:text-base hover:text-white cursor-pointer hover:bg-primary-hover transition"
              >
                Learn More About FastMet
              </Link>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Full terms, duration, and eligibility details will be shared
                through official FastMet updates.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <UserDriverSplit />

      <CoverageExplainer />

      <ServiceAreas />

      <QuestionForm />

      <LoaderModal open={countsLoading || vehiclesLoading} />
    </div>
  );
}
