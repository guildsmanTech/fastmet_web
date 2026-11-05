import { Coins, HandCoins, ReceiptText, type LucideIcon } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";

interface IZeroCommissionPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

const points: IZeroCommissionPoint[] = [
  {
    title: "Walang commission sa bawat delivery",
    description:
      "No percentage-based commission deductions from completed bookings.",
    icon: Coins,
  },
  {
    title: "Buong delivery earnings, sa'yo",
    description:
      "Keep 100% of your delivery earnings without platform commission deductions.",
    icon: HandCoins,
  },
  {
    title: "Subscription-based ang sistema",
    description:
      "Instead of paying commission per delivery, partner-drivers operate under FastMet's subscription-based model.",
    icon: ReceiptText,
  },
];

export default function ZeroCommission() {
  return (
    <section
      id="zero-commission"
      className="w-full scroll-mt-24 bg-secondary py-20 lg:py-28 px-3 md:px-0"
    >
      <PageContainer className="flex flex-col items-center gap-12 lg:gap-16">
        {/* Header */}
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-4 w-full max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              No commission required
            </p>
            <h2 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Zero commission. <span className="text-primary">For life.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate-400 sm:text-base w-full max-w-2xl">
            <p>
              Sa FastMet, naniniwala kami na dapat mas sulit ang bawat biyahe
              para sa ating partner-drivers. That's why we're introducing a
              subscription-based delivery model.
            </p>
            <p>
              Unlike traditional delivery platforms that deduct a percentage
              from every completed booking,{" "}
              <span className="font-semibold text-white">
                walang commission na kinukuha ang FastMet sa delivery earnings
                ng partner-drivers.
              </span>
            </p>
          </div>
        </div>

        {/* Benefits: joined cards, hairline dividers */}
        <ul className="grid w-full max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {points.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="group flex flex-col gap-5 bg-secondary p-8 text-center transition-colors duration-200 hover:bg-white/[0.03] lg:p-9"
            >
              <div className="flex size-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-primary transition-colors duration-200 group-hover:border-primary/40">
                <Icon aria-hidden className="size-5" strokeWidth={1.8} />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <h3 className="text-base font-semibold leading-snug text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <p className="text-base font-medium leading-relaxed text-white sm:text-lg">
            Instead, FastMet operates through a subscription-based system,
            allowing partner-drivers to keep{" "}
            <span className="text-primary">
              100% of their delivery earnings.
            </span>
          </p>

          <div className="flex flex-col items-center gap-3">
            <CTAButton
              to="/partner-driver"
              variant="primary"
              size="md"
              className="px-8 text-secondary"
            >
              Drive with FastMet
            </CTAButton>
            <p className="text-xs text-slate-500">
              Subscription fees and applicable terms and conditions apply.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
