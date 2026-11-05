// components/delivery-services.tsx
import { ArrowRight, Bike, Car, Truck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PageContainer from "../PageContainer";
import CTAButton from "../CTAButton";

interface IServiceDelivery {
  readonly className?: string;
}

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
    category: "Motor",
    title: "Small parcel deliveries",
    description:
      "Para sa documents, small packages, at everyday delivery needs.",
  },
  {
    id: "02",
    icon: Car,
    category: "Sasakyan",
    title: "Personal & business deliveries",
    description:
      "Para sa personal belongings, merchandise, business supplies, at medium-sized items.",
  },
  {
    id: "03",
    icon: Truck,
    category: "Truck",
    title: "Large & bulk deliveries",
    description:
      "Para sa appliances, equipment, business inventory, at mas malalaking cargo.",
  },
];

export default function ServiceDelivery({ className }: IServiceDelivery) {
  return (
    <PageContainer
      className={cn("mx-auto w-full max-w-6xl px-4 pb-16 pt-18", className)}
    >
      <div className="grid grid-cols-1 items-start gap-12 px-2 lg:grid-cols-2 lg:gap-16 md:px-0">
        {/* Left content */}
        <div className="flex flex-col gap-7">
          <h2 className="text-4xl font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl">
            Maliit man o
            <br />
            malaki,
            <br />
            <span className="text-primary">FastMet ang</span>
            <br />
            <span className="text-primary">bahala!</span>
          </h2>
          <div className="flex max-w-md flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold leading-snug text-slate-700 sm:text-xl">
                May delivery option para sa iba&apos;t ibang pangangailangan.
              </h3>

              <div className="h-1 w-10 rounded-full bg-primary" />
            </div>

            <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate-600 sm:text-base">
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
        <div className="flex min-w-0 flex-col gap-7">
          {/* Service cards */}
          <div className="flex flex-col gap-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.id}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition-colors duration-200 hover:border-primary/30 hover:bg-orange-50/20 sm:gap-5 sm:p-6"
                >
                  {/* Icon */}
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-primary transition-colors duration-200 group-hover:border-orange-200 group-hover:bg-orange-100/70">
                    <Icon
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.8}
                    />
                  </div>
                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                      {service.category}
                    </span>

                    <h3 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
                      {service.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Highlight + CTA */}
          <div className="flex flex-col items-center gap-4 border-t border-slate-200 pt-6 text-center md:items-end md:text-right">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                From motorcycle to wing van
              </p>

              <p className="text-lg font-bold leading-snug text-primary sm:text-xl">
                May FastMet para diyan!
              </p>
            </div>

            <CTAButton
              to="/delivery-services"
              variant="driver"
              size="md"
              icon={ArrowRight}
              className="justify-center"
            >
              Explore delivery services
            </CTAButton>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
