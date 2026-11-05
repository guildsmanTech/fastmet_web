import { MapPin, Route, Ban } from "lucide-react";
import PageContainer from "../PageContainer";
import { holdingMap } from "@/constants/images";
import { SERVICE_AREAS } from "./ServiceAreas";

const coverageDetails = [
  {
    icon: MapPin,
    title: "Pickup area",
    description: "Greater Manila",
  },
  {
    icon: Route,
    title: "Delivery destinations",
    description: "Nationwide through land-accessible routes",
  },
  {
    icon: Ban,
    title: "Not yet covered",
    description: "Routes requiring ferry or sea transport",
  },
];

export default function CoverageSection() {
  return (
    <PageContainer className="py-20 px-6 md:px-0 sm:py-28">
      <div className="px-0">
        {/* Main Coverage Section */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Visuals */}
          <div className="relative order-2 md:order-1 w-full">
            {/* Map */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-primary/20 bg-primary/[0.04] sm:aspect-[1.12/0.8]">
              {holdingMap ? (
                <img
                  src={holdingMap}
                  alt="FastMet delivery coverage map"
                  className="h-full w-full object-cover shadow-sm md:shadow-none"
                />
              ) : (
                <div className="flex h-full flex-col p-7">
                  <MapPin className="mb-3 h-7 w-7 text-primary" />
                  <h3 className="font-semibold text-slate-900">Coverage map</h3>
                  <p className="mt-2 max-w-[190px] text-sm leading-relaxed text-slate-500">
                    Greater Manila pickup and nationwide delivery coverage.
                  </p>
                </div>
              )}
            </div>

            {/* Service Areas card — under map on mobile, overlap on md+ */}
            <div
              className="
        relative z-10 mt-4 w-full
        rounded-[22px] bg-secondary p-5 text-white shadow-sm md:shadow-xl
        md:absolute md:bottom-0 md:right-0 md:mt-0
        md:w-[min(280px,48%)] md:p-6
        md:translate-y-[12%]
      "
            >
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold uppercase tracking-widest text-primary">
                  Service areas
                </span>
              </div>

              <ul className="mt-4">
                {SERVICE_AREAS.map((area) => (
                  <li
                    key={area.name}
                    className="flex items-baseline justify-between gap-3 border-t border-white/10 py-2.5 first:border-t-0"
                  >
                    <span className="text-sm font-semibold text-white">
                      {area.name}
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-slate-400">
                      {area.locations.length} areas
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Pickup across this belt. Delivery continues anywhere the road
                does.
              </p>
            </div>

            <div className="hidden md:block md:h-16" aria-hidden="true" />
          </div>

          {/* Coverage Information */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-slate-950">
              Greater Manila pickup.
              <br className="hidden sm:block" />{" "}
              <span className="text-primary">Nationwide land delivery.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
              FastMet accepts delivery bookings with pickup locations within
              Greater Manila. Mula rito, puwedeng magpadala sa iba't ibang lugar
              sa Pilipinas na accessible through continuous land travel.
            </p>

            {/* Coverage Details */}
            <div className="mt-8 border-t border-slate-200">
              {coverageDetails.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`flex gap-5 border-slate-200 py-6 ${
                      index === 2
                        ? "opacity-75"
                        : index === 3
                          ? "border-none"
                          : "border-b"
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Greater Manila Service Areas */}
      </div>
    </PageContainer>
  );
}
