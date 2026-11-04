import { Fragment } from "react/jsx-runtime";
import PageContainer from "../PageContainer";
import { partnerZero } from "@/constants/images";
import { Calendar, Clock, Package, Smartphone, Truck } from "lucide-react";
import type { IHeroBadge } from "@/types/home";

interface IFeature extends Omit<IHeroBadge, "caption"> {
  description: string;
}

const features: IFeature[] = [
  {
    title: "Ikaw ang May Hawak ng Oras Mo",
    description:
      "Piliin kung kailan ka available tumanggap ng delivery opportunities.",
    icon: Clock,
  },
  {
    title: "Walang Fixed Hours",
    description:
      "FastMet offers flexible earning opportunities for partner-drivers.",
    icon: Calendar,
  },
  {
    title: "Walang Daily Quota",
    description: "Walang required na bilang ng deliveries bawat araw.",
    icon: Package,
  },
  {
    title: "Iba’t Ibang Sasakyan, Iba’t Ibang Delivery",
    description:
      "FastMet accepts different vehicle types para sa iba’t ibang delivery needs.",
    icon: Truck,
  },
  {
    title: "Makatanggap ng Official Updates",
    description:
      "Receive official FastMet updates tungkol sa iyong application, onboarding, at activation.",
    icon: Smartphone,
  },
];

export default function WhyJoinNow() {
  return (
    <Fragment>
      <section className="w-full px-3 md:px-0">
        <PageContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 justify-center items-center text-center">
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-secondary sm:text-4xl lg:text-5xl">
              Bakit Maging FastMet
              <br />
              <span className="text-primary">Partner-Driver? </span>
            </h2>
            <div className="flex flex-col gap-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg font-medium md:gap-4 lg:text-[15px] 2xl:text-base">
              <p>
                Sa aming subscription-based model, walang percentage-based
                commission na ibabawas sa iyong delivery earnings.
              </p>
            </div>
          </div>

          <img
            src={partnerZero}
            alt="FastMet 0% commission, subscription fee lang"
            className="w-full min-h-40 object-cover rounded-xl"
          />
        </PageContainer>
      </section>

      <section className="px-3 md:px-0">
        <PageContainer className="flex flex-wrap justify-center gap-4">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="overflow-hidden relative md:max-w-sm flex w-full flex-col gap-3 rounded-2xl border p-5 transition-colors hover:border-primary/30 hover:bg-white/[0.05] sm:p-6"
            >
              <div
                className="flex size-11 items-center justify-center
      rounded-xl bg-primary/10 text-primary
      transition-colors group-hover:bg-primary/15"
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0"
                  strokeWidth={1.8}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold leading-snug sm:text-lg">
                  {title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </PageContainer>
      </section>
    </Fragment>
  );
}
