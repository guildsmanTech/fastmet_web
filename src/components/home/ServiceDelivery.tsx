// components/delivery-services.tsx
import { ArrowRight, Bike, Car, Truck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PageContainer from "../PageContainer";
import CTAButton from "../CTAButton";

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
    title: "Small Parcel Deliveries",
    description:
      "Para sa documents, small packages, at everyday delivery needs.",
  },
  {
    id: "02",
    icon: Car,
    category: "SASAKYAN",
    title: "Personal & Business Deliveries",
    description:
      "Para sa personal belongings, merchandise, business supplies, at medium-sized items.",
  },
  {
    id: "03",
    icon: Truck,
    category: "TRUCK",
    title: "Large & Bulk Deliveries",
    description:
      "Para sa appliances, equipment, business inventory, at mas malalaking cargo.",
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

          <div className="space-y-4 max-w-md">
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-700 leading-snug">
                May Delivery Option Para sa Iba&apos;t Ibang Pangangailangan.
              </h3>
              <div className="h-1 w-11 rounded-full bg-primary" />
            </div>

            <div className="space-y-3 text-base leading-relaxed text-slate-600">
              <p>
                May documents ka bang ipapadala? Business supplies na kailangang
                ihatid? O malalaking gamit na kailangang i-transport?
              </p>
              <p>
                FastMet offers different vehicle options to match your delivery
                needs. Mula motorcycle hanggang wing van, may FastMet para sa
                iba&apos;t ibang klase ng padala.
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Cards + Highlight */}
        <div className="flex flex-col gap-6">
          {/* Cards */}
          <div className="flex flex-col gap-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="flex items-start gap-4 rounded-2xl border border-orange-100/80 bg-white p-5 shadow-sm transition-colors hover:bg-orange-50/40"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                    <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  </div>

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

          {/* Highlight + Button */}
          <div className="space-y-3 text-right">
            <div className="text-lg font-semibold text-slate-900 leading-snug">
              <p>From Motorcycle to Wing Van</p>
              <span className="text-primary">May FastMet Para Diyan!</span>
            </div>

            <CTAButton
              to="/delivery-services"
              variant="driver"
              size="md"
              icon={ArrowRight}
              className="self-start"
            >
              Explore Delivery Services
            </CTAButton>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
