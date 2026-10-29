// components/delivery-services.tsx
import { Bike, Car, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import PageContainer from "../PageContainer";

const services = [
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

export default function DeliveryServices({
  className,
}: {
  className?: string;
}) {
  return (
    <PageContainer className={cn("w-full px-4 py-16", className)}>
      {/* Header */}
      <div className="flex flex-col lg:items-start lg:justify-between mb-12">
        <div className="space-y-4">
          <Badge
            variant="secondary"
            className="bg-amber-50 font-semibold text-amber-700 border-amber-200 hover:bg-amber-50 tracking-wide"
          >
            DELIVERY SERVICES
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Maliit Man o Malaki,{" "}
            <span className="text-orange-500">FastMet Ang Bahala!</span>
          </h2>
        </div>
        <p className="max-w-md text-slate-600 text-base leading-relaxed pt-5">
          Mula sa maliit na parcel hanggang sa mabigat na kargamento, may
          partner-driver at sasakyan na akma sa padala mo.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.id}
              className="relative group rounded-2xl bg-orange-50/60 border border-orange-100/80 p-6 transition-colors hover:bg-orange-50"
            >
              {/* Large faded number */}
              <span className="absolute top-5 right-6 text-5xl font-bold text-orange-200/70 select-none">
                {service.id}
              </span>

              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-none">
                <Icon className="h-6 w-6 text-orange-500" strokeWidth={1.75} />
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold tracking-wider text-orange-500">
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
    </PageContainer>
  );
}
