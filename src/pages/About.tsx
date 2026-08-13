import {Helmet} from "react-helmet-async";
import ConnectNeeds from "@/components/about/ConnectNeeds";
import Coverage from "@/components/about/Coverage";
import Founder from "@/components/about/Founder";
import JoinFastMet from "@/components/about/Join";
import MissionVision from "@/components/about/MissionVision";
import OurValues from "@/components/about/Values";
import LoaderModal from "@/components/modals/Loader";
import {aboutBg} from "@/constants/images";
import {useVehicles} from "@/hooks/useVehicleQueries";
import {UserRound, Truck} from "lucide-react";
import {Link} from "react-router-dom";

export default function About() {
  const {isPending: vehiclesLoading, data, isError} = useVehicles();

  return (
    <div>
      <Helmet>
        <title>About FastMet | On-Demand Delivery in Greater Manila</title>
        <meta
          name="description"
          content="FastMet is an on-demand delivery platform for individuals, online sellers, businesses, and partner-drivers. Learn our mission, values, and how we connect Greater Manila to nationwide deliveries."
        />
        <link rel="canonical" href="https://fastmet.com.ph/about" />
      </Helmet>
      <section
        className="relative w-full min-h-dvh flex items-center bg-secondary"
        id="hero"
      >
        <img
          src={aboutBg}
          alt="FastMet delivery"
          className="absolute inset-0 w-full h-full object-cover md:object-fill "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-black/50" />

        <div className="relative z-10 w-full px-4 md:px-12 xl:px-20 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: headline */}
          <div className="flex flex-col gap-5 text-white max-w-xl">
            <h1 className="text-4xl text-primary md:text-5xl font-extrabold leading-tight">
              Para sa Mas Mabilis at Mas Madaling Delivery
            </h1>
            <p className="text-white font-semibold text-base md:text-lg">
              FastMet is an on-demand delivery platform created for individuals,
              online sellers, businesses, and partner-drivers.
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

          {/* Right: TODO — no source for this asset yet, tell me what goes here */}
          <div className="size-80 bg-gray-300 rounded-lg" />

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
        </div>
      </section>

      {/* Right vehicle for every delivery */}
      <section className="w-full px-4 md:px-12 xl:px-20 py-12 md:py-16 flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center items-center">
        <div className="flex flex-col gap-4 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
            The right vehicle for every delivery
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-zinc-700 list-disc pl-4">
            <li>
              <span className="font-semibold">FastMet</span> is a delivery
              platform built to make moving items easier for individuals and
              businesses.
            </li>
            <li>Hindi pare-pareho ang bawat delivery.</li>
            <li>
              May documents na kasya sa motorcycle. May online orders na
              kailangan ng sedan. May appliances, supplies, at equipment na mas
              bagay sa pickup, cargo van, o truck.
            </li>
            <li>
              FastMet brings different vehicle options together in one platform
              so users can be connected with a vehicle that matches their
              delivery needs.
            </li>
            <li>
              We accept delivery requests within Greater Manila and can deliver
              to land-accessible destinations nationwide.
            </li>
          </ul>
        </div>

        {/* Vehicle grid */}
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-[280px] mx-auto lg:mx-0 grid grid-cols-2 gap-3 lg:gap-4 shrink-0">
          {vehiclesLoading &&
            Array.from({length: 4}).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-zinc-200 animate-pulse"
              />
            ))}

          {isError && (
            <p className="col-span-2 text-sm text-red-500">
              Couldn't load vehicle types.
            </p>
          )}

          {!vehiclesLoading &&
            !isError &&
            [
              {
                image: data![0]?.imageUrl,
                label: "Small Parcel",
              },
              {
                image: data![1]?.imageUrl,
                label: "Multiple Boxes",
              },
              {
                image: data![5]?.imageUrl,
                label: "Bulky Items",
              },
              {
                image: data![6]?.imageUrl,
                label: "Commercial Cargo",
              },
            ].map((vehicle) => (
              <div
                key={vehicle.label}
                className="relative aspect-square rounded-lg bg-secondary/90 overflow-hidden flex flex-col items-center justify-center gap-4 p-2 sm:p-3"
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.label}
                  className="w-full h-1/2 object-contain"
                />
                <span className="text-white text-[10px] sm:text-xs font-semibold text-center leading-tight px-1">
                  {vehicle.label}
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* Better route for everyone */}
      <section className="w-full px-4 md:px-12 xl:px-20 py-16 bg-zinc-50">
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
            A better route for everyone.
          </h2>
          <p className="text-sm text-zinc-700">
            Sa Greater Manila, mabilis ang takbo ng buhay at negosyo.
          </p>
          <p className="text-sm text-zinc-700">
            Customers need a more convenient way to send their items. Online
            sellers and businesses need delivery support that can keep up with
            their daily operations. Drivers also need flexible opportunities to
            earn using their own vehicles.
          </p>
        </div>

        {/* TODO: no source for this box's content yet — image / testimonial / stat? */}
        <div className="relative mt-10 max-w-3xl mx-auto">
          <div className="w-full h-64 md:h-80 bg-gray-300 rounded-lg" />
        </div>
      </section>

      <ConnectNeeds />
      <MissionVision />
      <OurValues />
      <Founder />
      <Coverage />
      <JoinFastMet />

      <LoaderModal open={vehiclesLoading} />
    </div>
  );
}
