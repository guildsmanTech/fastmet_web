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
    title: "Ikaw ang may hawak ng oras mo",
    description:
      "Piliin kung kailan ka available tumanggap ng delivery opportunities.",
    icon: Clock,
  },
  {
    title: "Walang fixed hours",
    description:
      "FastMet offers flexible earning opportunities for partner-drivers.",
    icon: Calendar,
  },
  {
    title: "Walang daily quota",
    description: "Walang required na bilang ng deliveries bawat araw.",
    icon: Package,
  },
  {
    title: "Iba’t ibang sasakyan, iba’t ibang delivery",
    description:
      "FastMet accepts different vehicle types para sa iba’t ibang delivery needs.",
    icon: Truck,
  },
  {
    title: "Makatanggap ng official updates",
    description:
      "Receive official FastMet updates tungkol sa iyong application, onboarding, at activation.",
    icon: Smartphone,
  },
];

export default function WhyJoinNow() {
  return (
    <section className="w-full py-20 lg:py-28">
      <PageContainer className="flex flex-col gap-12 lg:gap-16">
        {/* Header / CTA text */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Partner-driver benefits
          </p>

          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Bakit maging FastMet
            <br className="hidden sm:block" />
            <span className="text-primary"> partner-driver?</span>
          </h2>

          <p className="max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base lg:text-lg">
            Sa aming subscription-based model, walang percentage-based
            commission na ibabawas sa iyong delivery earnings.
          </p>
        </div>

        {/* Featured image */}
        <div className="mx-auto w-full max-w-5xl">
          <img
            src={partnerZero}
            alt="FastMet 0% commission, subscription fee lang"
            className="h-auto w-full rounded-2xl object-cover shadow-sm"
          />
        </div>

        {/* Feature cards */}
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
      </PageContainer>
    </section>
  );
}
