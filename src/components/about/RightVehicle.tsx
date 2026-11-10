import {
  Van,
  Truck,
  Motorbike,
  Car,
  type LucideIcon,
  ArrowRight,
} from "lucide-react";
import PageContainer from "../PageContainer";

interface IVehicle {
  icon: LucideIcon;
  label: string;
  vehicle: string;
}

const vehicles = [
  { icon: Motorbike, label: "Small Parcel", vehicle: "Motorcycle" },
  { icon: Car, label: "Multiple Boxes", vehicle: "Car" },
  { icon: Van, label: "Bulky Items", vehicle: "Van" },
  { icon: Truck, label: "Commercial Cargo", vehicle: "Truck" },
] satisfies IVehicle[];

export default function RightVehicle() {
  return (
    <section className="w-full bg-white py-20 lg:py-28 px-3 md:px-0">
      <PageContainer className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Vehicles (left on desktop, below the text on mobile) */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {/* Column labels */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 sm:px-6">
              <span>Cargo</span>
              <span className="w-36 sm:w-40">Vehicle</span>
            </div>

            <ul className="divide-y divide-slate-200">
              {vehicles.map(({ icon: Icon, label, vehicle }) => (
                <li
                  key={label}
                  className="group flex items-center gap-3 px-5 py-4 transition-colors duration-200 hover:bg-slate-50 sm:gap-4 sm:px-6 sm:py-5"
                >
                  {/* Cargo type */}
                  <span className="text-sm font-semibold text-secondary sm:text-base">
                    {label}
                  </span>

                  {/* Connector: dotted line ending in an arrow */}
                  <span
                    aria-hidden
                    className="flex min-w-6 flex-1 items-center text-primary"
                  >
                    <span className="h-px flex-1 border-t border-dashed border-primary/50" />
                    <ArrowRight className="-ml-1 size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>

                  {/* Vehicle */}
                  <div className="flex w-36 shrink-0 items-center gap-3 sm:w-40">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-white transition-colors duration-200 group-hover:bg-primary group-hover:text-secondary sm:size-11">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </div>
                    <span className="text-sm font-semibold text-secondary">
                      {vehicle}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Text (right on desktop, first on mobile) */}
        <div className="order-1 flex flex-col gap-8 lg:order-2 lg:col-span-6">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Vehicle options
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
              May sasakyan para sa{" "}
              <span className="text-primary">iba’t ibang padala</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            <p>
              <span className="font-semibold text-secondary">FastMet</span>{" "}
              brings different vehicle options together in one platform, so you
              can easily find the right ride for your delivery.
            </p>
            <p className="font-semibold text-secondary">
              Hindi pare-pareho ang bawat padala.
            </p>
            <p>
              From documents for motorcycles and online orders for sedans, to
              appliances and equipment for vans or trucks—personal man o
              pang-business, FastMet connects you with the right vehicle and
              partner-driver.
            </p>
          </div>

          {/* Coverage note */}
          <div className="border-l-2 border-primary pl-5">
            <p className="text-sm leading-relaxed text-slate-600">
              We accept bookings with pickup locations within Greater Manila,
              with deliveries to destinations reachable through continuous land
              travel. Routes requiring ferry or sea transport are not yet
              covered.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
