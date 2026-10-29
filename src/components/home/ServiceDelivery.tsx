// components/delivery-services.tsx
import { Bike, Car, Truck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PageContainer from "../PageContainer";

interface IServices {
  id: string;
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
}

const services: IServices[] = [
  {
    id: "01",
    icon: Bike,
    category: "MOTOR",
    title: "Small Parcel",
    description:
      "Mabilis na padala para sa dokumento, pagkain, at maliliit na package sa loob ng siyudad.",
  },
  {
    id: "02",
    icon: Car,
    category: "SASAKYAN",
    title: "Personal & Business",
    description:
      "Para sa mas malalaking kahon, grocery, at gamit ng negosyo na kailangan ng mas maluwag na espasyo.",
  },
  {
    id: "03",
    icon: Truck,
    category: "TRUCK",
    title: "Large & Bulk",
    description:
      "Para sa muwebles, appliances, at maramihang kargamento na kailangan ng malaking sasakyan.",
  },
];

export default function ServiceDelivery({ className }: { className?: string }) {
  return (
    <PageContainer
      className={cn("w-full max-w-6xl mx-auto px-4 py-16", className)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left content */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
            Maliit Man o
            <br />
            Malaki,
            <br />
            <span className="text-primary">FastMet Ang</span>
            <br />
            <span className="text-primary">Bahala!</span>
          </h2>

          <p className="max-w-md text-slate-600 text-base leading-relaxed">
            Mula sa maliit na parcel hanggang sa mabigat na kargamento, may
            partner-driver at sasakyan na akma sa padala mo.
          </p>
        </div>

        {/* Right cards (stacked) */}
        <div className="flex flex-col gap-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="flex items-start gap-4 rounded-2xl border border-orange-100/80 bg-white p-5 shadow-sm transition-colors hover:bg-orange-50/40"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                </div>

                {/* Text */}
                <div className="space-y-1 pt-0.5">
                  <p className="text-xs font-semibold tracking-wider text-primary">
                    {service.category}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
