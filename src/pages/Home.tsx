import { Helmet } from "react-helmet-async";
import Info from "@/components/home/Info";
import Phone from "@/components/home/Phone";
import QuestionForm from "@/components/home/QuestionForm";
import { ClientFAQModal } from "@/components/modals/ClientFAQModal";
import { DriverFAQModal } from "@/components/modals/DriverFAQModal";
import LoaderModal from "@/components/modals/Loader";
import {
  bg_map,
  logo,
  phone_map,
  phoneBG,
  single_phone,
  closed_van,
  wing_van,
} from "@/constants/images";
import { useRegistrationCounts } from "@/hooks/useRegistrationQueries";

import { useVehicles } from "@/hooks/useVehicleQueries";
import { Play } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const driverRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const { isPending: countsLoading } = useRegistrationCounts();
  const { isPending: vehiclesLoading } = useVehicles();

  const scrollToDriver = () => {
    if (driverRef.current) {
      const offset = 300; // space from top in px
      const top =
        driverRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToUser = () => {
    if (userRef.current) {
      const offset = 300; // space from top in px
      const top =
        userRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <Helmet>
        <title>FastMet – Fast & Reliable Delivery Service in Greater Manila</title>
        <meta
          name="description"
          content="FastMet is a fast and reliable logistics platform connecting clients with trusted drivers across Greater Manila. Pre-register now and claim exclusive launch rewards."
        />
        <link rel="canonical" href="https://fastmet.com.ph/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "FastMet",
          "url": "https://fastmet.com.ph",
          "logo": "https://fastmet.com.ph/fastmet_icon.png",
          "description": "Fast and reliable logistics platform in Greater Manila",
          "areaServed": "Greater Manila",
          "sameAs": []
        })}</script>
      </Helmet>
      <section
        className="flex relative justify-center flex-col min-h-dvh w-full"
        style={{
          backgroundImage: `url(${bg_map})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/60" />

        <div className="flex flex-col z-10 lg:flex-1 md:flex-row gap-8 items-center justify-center">
          <Info />
          <Phone />
        </div>
        <div className="bg-primary/90 h-16 absolute bottom-0 w-full md:gap-5 gap-2 justify-center flex items-center z-20">
          <button
            onClick={scrollToDriver}
            className="px-4 cursor-pointer py-2 rounded-full md:text-sm shadow-md text-[.70rem] bg-white font-semibold md:font-bold xl:text-base xl:py-2.5 xl:px-5 hover:bg-zinc-200 hover:scale-110 transition-all duration-200"
          >
            Driver's Pre-Registration
          </button>
          <button
            onClick={scrollToUser}
            className="px-4 cursor-pointer py-2 rounded-full md:text-sm shadow-md text-[.70rem] bg-white font-semibold md:font-bold xl:text-base xl:py-2.5 xl:px-5 hover:bg-zinc-200 hover:scale-110 transition-all duration-200"
          >
            User's Pre-Registration
          </button>
        </div>
      </section>

      <div className="space-y-5 md:space-y-10 py-10">
        <section className="p-4 lg:px-20 xl:px-40">
          <div className=" p-4  bg-[linear-gradient(to_bottom,_#FFFFFF_30%,_#E0F2FF_100%)] flex flex-col gap-8 items-center justify-center">
            <div className="bg-white shadow-2xl size-28 md:size-32 xl:size-40 flex flex-col items-center justify-center rounded-full border-2 border-primary">
              <img
                src={logo}
                alt="Fastmet Logo"
                className="size-12 md:size-14 object-contain xl:size-16"
              />
              <p className="font-semibold md:text-lg xl:text-2xl">FastMet</p>
            </div>
            <div className="lg:px-10 xl:px-20">
              <p className="text-sm md:text-base font-bold tracking-wide text-gray-500 mb-2">
                WHO WE ARE
              </p>

              <p className="text-justify md:text-base text-xs leading-relaxed text-gray-800">
                <span className="font-semibold">
                  FastMet is a proudly Pinoy-made delivery platform
                </span>{" "}
                built for the everyday needs of Filipinos. As we launch in{" "}
                <span className="font-semibold">Greater Manila</span>, we are
                bringing a smarter, faster, and more dependable way to handle
                deliveries and errands.
                <br />
                <br />
                FastMet is{" "}
                <span className="font-semibold">
                  built for employees, students, professionals, and businesses
                </span>{" "}
                — and for every Filipino who needs a reliable partner for daily
                deliveries. Beyond serving customers, we are equally committed
                to{" "}
                <span className="font-semibold">
                  empowering drivers through better opportunities
                </span>
                , support, and flexibility.
                <br />
                <br />
                We understand that{" "}
                <span className="font-semibold">every delivery matters</span>.
                That is why our goal is simple:{" "}
                <span className="font-semibold">on-time delivery</span> you can
                depend on—bringing speed, reliability, and convenience to
                everyday life.
                <br />
                <br />
                <span className="font-semibold">
                  Made by Filipinos, for Filipinos, FastMet is here to deliver
                  the service you can count on.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* heads up drivers */}
        <section
          ref={driverRef}
          className="flex xl:mx-40 flex-col md:flex-row items-center xl:px-20 xl:gap-16 gap-10 py-10 px-6 xl:py-16 md:mx-4 lg:mx-20 bg-gradient-to-br from-white to-[#FFF6ED] overflow-hidden"
        >
          {/* Left Side - Mockup */}
          <div
            className="lg:size-72 size-56 md:size-64 flex justify-center relative items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${phoneBG})` }}
          >
            <div className="absolute bg-gradient-to-b from-[#FFD07F] to-primary rounded-full blur-2xl size-64 md:size-80 opacity-40" />

            <img
              src={single_phone}
              alt="Phone Mockup"
              className="size-60 scale-125 lg:scale-150 object-contain"
              draggable={false}
            />
            <img
              src={closed_van}
              alt="Closed Van"
              className="w-24 lg:size-28 object-contain absolute -bottom-5 -right-5 z-10"
              draggable={false}
            />
          </div>
          {/* Right Side - Text Content */}
          <div className="flex-1 flex flex-col gap-5 text-center md:text-left md:px-4 xl:gap-8">
            <h2 className="text-primary font-bold text-2xl md:text-3xl uppercase">
              Be a FastMet Driver
            </h2>

            <p className="text-gray-700 text-justify indent-5 md:text-lg leading-relaxed">
              Sign up today and get ready to be among the first to earn when
              FastMet goes live. Enjoy fast payments, flexible hours, and
              exclusive early rewards. Join the fastest-growing delivery service
              in the Philippines!
            </p>

            <div className="flex justify-center lg:justify-start items-center gap-3 md:gap-2">
              <span className="font-semibold hidden md:block text-sm lg:text-base xl:text-lg">
                Click Here
              </span>

              <div className="hidden md:flex flex-row items-center">
                <Play className="size-4 fill-primary lg:size-5 xl:size-6" />
                <Play className="size-4 fill-primary lg:size-5 xl:size-6" />
              </div>

              <Link
                to="/driver-register"
                className="border border-primary xl:text-lg text-primary bg-white cursor-pointer hover:bg-primary hover:text-white px-5 py-2 text-sm lg:text-base rounded-full font-medium transition inline-block"
              >
                Driver's Pre-Registration
              </Link>

              <DriverFAQModal />
            </div>
          </div>
        </section>

        {/* get ready */}
        <section
          ref={userRef}
          className="flex xl:mx-40 flex-col items-center xl:px-20 xl:gap-16 gap-10 py-10 px-6 xl:py-16 md:mx-4 lg:mx-20 bg-gradient-to-bl from-white to-[#FFF6ED] overflow-hidden md:flex-row-reverse"
        >
          {/* Left Side - Mockup */}
          <div
            className="lg:size-72 size-56 md:size-64 flex justify-center relative items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${phoneBG})` }}
          >
            <div className="absolute bg-gradient-to-b from-[#FFD07F] to-primary rounded-full blur-2xl size-64 md:size-80 opacity-40" />

            <img
              src={phone_map}
              alt="Phone Mockup"
              className="size-60 scale-125 lg:scale-150 object-contain"
              draggable={false}
            />
            <img
              src={wing_van}
              alt="Wing Van"
              className="size-24 md:size-28 lg:size-36 object-contain absolute -bottom-5 lg:-bottom-10 right-3 z-10"
              draggable={false}
            />
          </div>
          {/* Right Side - Text Content */}
          <div className="flex-1 flex flex-col gap-5 text-center md:text-left md:px-4 xl:gap-8">
            <h2 className="text-primary font-bold text-2xl md:text-3xl uppercase">
              Be a FastMet User
            </h2>

            <p className="text-gray-700 text-justify indent-5 md:text-lg leading-relaxed">
              Be the first to book deliveries with FastMet once we go live, and
              unlock exclusive early rewards. Get the convenience of fast,
              reliable deliveries right at your fingertips. Pre-register now to
              get in on the action!
            </p>

            <div className="flex justify-center lg:justify-start items-center gap-3 md:gap-2">
              <span className="font-semibold hidden md:block text-sm lg:text-base xl:text-lg">
                Click Here
              </span>

              <div className="hidden md:flex flex-row items-center">
                <Play className="size-4 fill-primary lg:size-5 xl:size-6" />
                <Play className="size-4 fill-primary lg:size-5 xl:size-6" />
              </div>

              <Link
                to="/user-register"
                className="border border-primary xl:text-lg text-primary bg-white cursor-pointer hover:bg-primary hover:text-white px-5 py-2 text-sm lg:text-base rounded-full font-medium transition inline-block"
              >
                User's Pre-Registration
              </Link>
              <ClientFAQModal />
            </div>
          </div>
        </section>

        {/* <JoinSection /> */}

        <QuestionForm />
      </div>
      <LoaderModal open={countsLoading || vehiclesLoading} />
    </div>
  );
}
