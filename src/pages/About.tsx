import {Helmet} from "react-helmet-async";
import ConnectNeeds from "@/components/about/ConnectNeeds";
import Coverage from "@/components/about/Coverage";
import JoinFastMet from "@/components/about/Join";
import MissionVision from "@/components/about/MissionVision";
import OurValues from "@/components/about/Values";
import {aboutBg, aboutMain} from "@/constants/images";
import PreRegisterActions from "@/components/PreRegisterActions";
import {Van, Truck, Motorbike, Car} from "lucide-react";
import PageContainer from "@/components/PageContainer";

export default function About() {
  return (
    <div className="w-full flex flex-col gap-16 md:gap-20">
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
        <div className="absolute inset-0 bg-black/70" />

        <PageContainer className="relative z-10 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: headline */}
          <div className="flex flex-col gap-5 text-white max-w-xl">
            <h1 className="text-4xl text-primary md:text-5xl font-extrabold leading-tight">
              Para sa Mas Mabilis at Mas Madaling Delivery
            </h1>
            <p className="text-white font-semibold text-base md:text-lg">
              FastMet is an on-demand delivery platform created for individuals,
              online sellers, businesses, and partner-drivers. We connect users
              with the right vehicle and partner-driver for different delivery
              needs.
            </p>
            <PreRegisterActions
              layout="inline"
              size="sm"
              fullWidth
              className="mt-2 hidden lg:flex"
            />
          </div>

          <img
            src={aboutMain}
            alt="FastMet delivery"
            className="w-full lg:w-1/2"
          />

          <PreRegisterActions
            layout="stacked-mobile"
            shortLabels
            className="mt-2 lg:hidden"
          />
        </PageContainer>
      </section>

      {/* Right vehicle for every delivery */}
      <section className="w-full">
        <PageContainer className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center items-center">
          <div className="flex flex-col gap-4 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
              The right vehicle for every delivery
            </h2>
            <div className="flex flex-col gap-3 text-sm text-zinc-700 pl-4">
              <p>
                <span className="font-semibold">FastMet</span> is a delivery
                platform built to make moving items easier for individuals and
                businesses.
              </p>
              <p>Hindi pare-pareho ang bawat delivery.</p>
              <p>
                May documents na kasya sa motorcycle. May online orders na
                kailangan ng sedan. May appliances, supplies, at equipment na
                mas bagay sa pickup, cargo van, o truck.
              </p>
              <p>
                FastMet brings different vehicle options together in one
                platform so users can be connected with a vehicle that matches
                their delivery needs.
              </p>
              <p>
                We accept delivery requests within Greater Manila and can
                deliver to land-accessible destinations nationwide.
              </p>
            </div>
          </div>
          <div className="w-full max-w-md lg:max-w-sm bg-secondary/10 rounded-xl p-6 sm:p-8 shrink-0">
            {[
              {icon: Motorbike, label: "Small Parcel", vehicle: "Motorcycle"},
              {icon: Car, label: "Multiple Boxes", vehicle: "Car"},
              {icon: Van, label: "Bulky Items", vehicle: "Van"},
              {icon: Truck, label: "Commercial Cargo", vehicle: "Truck"},
            ].map(({icon: Icon, label, vehicle}, i, arr) => (
              <div
                key={label}
                className={`flex items-center gap-3 ${i !== 0 ? "pt-4" : ""} ${
                  i !== arr.length - 1
                    ? "pb-4 border-b border-secondary/10"
                    : ""
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 shrink-0 w-24 sm:w-28">
                  {label}
                </span>

                <span
                  className="flex-1 h-0 border-t-2 border-dotted border-primary min-w-4"
                  aria-hidden="true"
                />
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  className="text-primary fill-current -ml-2 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M0 0 L8 4 L0 8 Z" />
                </svg>

                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary bg-secondary flex items-center justify-center shrink-0">
                  <Icon
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    strokeWidth={2}
                  />
                </div>

                <span className="text-xs sm:text-sm font-semibold text-zinc-800 shrink-0 w-20 sm:w-24">
                  {vehicle}
                </span>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Better route for everyone */}
      <section className="w-full py-10 bg-zinc-50">
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
              A better route for everyone.
            </h2>
            <p className="text-sm text-zinc-700">
              <span className="font-semibold">
                Sa Greater Manila, mabilis ang takbo ng buhay at negosyo.
              </span>
              <br />
              Customers need a more convenient way to send their items. Online
              sellers and businesses need delivery support that can keep up with
              their daily operations. Drivers also need flexible opportunities
              to earn using their own vehicles.
            </p>
            <p className="text-sm text-zinc-700">
              <span className="font-semibold">FastMet </span> was created to
              connect these needs. Our goal is to build a delivery community
              where users, businesses, and partner-drivers can move forward
              together. Hindi lang kami tungkol sa paglipat ng package mula
              isang lugar papunta sa iba. Gusto naming makatulong sa negosyo,
              gawing mas convenient ang delivery, at magbigay ng mas maraming
              opportunities para sa Filipino drivers.
            </p>
          </div>
        </PageContainer>
      </section>

      <ConnectNeeds />
      <MissionVision />
      <OurValues />
      {/* <Founder /> */}
      <Coverage />
      <JoinFastMet />
    </div>
  );
}
