import {coverage} from "@/constants/images";
import {MapPin, MapPinned, MapPinOff} from "lucide-react";

export default function CoverageExplainer() {
  const ITEMS = [
    {icon: MapPin, label: "Request Area", desc: "Greater Manila"},
    {
      icon: MapPinned,
      label: "Delivery Area",
      desc: "Nationwide through land-accessible routes",
    },
    {
      icon: MapPinOff,
      label: "Not Yet Covered",
      desc: "Routes requiring ferry or sea transport",
    },
  ];

  return (
    <section className="w-full bg-white px-6 md:px-12 xl:px-20 flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-primary font-bold text-2xl md:text-3xl leading-tight">
          Greater Manila Requests.
          <br />
          Nationwide Land Delivery.
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          FastMet accepts delivery requests within Greater Manila.
          <br />
          From Greater Manila, deliveries may be sent to destinations across the
          Philippines that are accessible through continuous land travel.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {ITEMS.map(({icon: Icon, label, desc}) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit">
                <Icon className="text-primary size-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 uppercase">
                {label}
              </span>
              <span className="text-[11px] text-gray-500 leading-snug">
                {desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      <img
        className="flex-1 w-full aspect-[4/3] md:w-[400px] bg-gray-300 rounded-2xl"
        src={coverage}
        alt="Coverage"
      />
    </section>
  );
}
