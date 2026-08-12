import {
  aboutBg2,
  aboutUser,
  aboutBusiness,
  aboutTruck,
} from "@/constants/images";

const needs = [
  {
    icon: aboutUser,
    label: "Users",
    desc: "Need a simple and convenient delivery option.",
  },
  {
    icon: aboutBusiness,
    label: "Businesses",
    desc: "Need dependable support for daily operations.",
  },
  {
    icon: aboutTruck,
    label: "Partner-Drivers",
    desc: "Need flexible earning opportunities.",
  },
];

export default function ConnectNeeds() {
  return (
    <section className="relative w-full px-4 sm:px-8 md:px-12 xl:px-20 py-16 md:py-20 overflow-hidden">
      <img
        src={aboutBg2}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-secondary/85" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
          FastMet was created to connect these needs.
        </h2>
        <p className="text-white text-xs sm:text-sm leading-relaxed">
          Our goal is to build a delivery community where users, businesses, and
          partner-drivers can move forward together. Hindi lang kami tungkol sa
          paglipat ng package mula isang lugar papunta sa iba. Gusto naming
          makatulong sa negosyo, gawing mas convenient ang delivery, at magbigay
          ng mas maraming oportunidad para sa Pilipinong drivers.
        </p>
      </div>

      <div className="relative z-10 mt-10 grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-8 sm:gap-6 justify-items-center max-w-2xl mx-auto">
        {needs.map((need) => (
          <div
            key={need.label}
            className="flex flex-col items-center gap-2 max-w-[180px] text-center"
          >
            <img
              src={need.icon}
              alt=""
              className="size-14 sm:size-16 object-contain"
            />
            <span className="text-primary font-semibold text-sm">
              {need.label}
            </span>
            <p className="text-white/80 text-xs leading-relaxed">{need.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
