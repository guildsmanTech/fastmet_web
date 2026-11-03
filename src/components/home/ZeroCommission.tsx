import { Coins, HandCoins, ReceiptText, type LucideIcon } from "lucide-react";

import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import { homeDriver } from "@/constants/images";

interface IZeroCommissionPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

const points: IZeroCommissionPoint[] = [
  {
    title: "Walang Commission sa Bawat Delivery",
    description:
      "No percentage-based commission deductions from completed bookings.",
    icon: Coins,
  },
  {
    title: "Buong Delivery Earnings, Sa'yo",
    description:
      "Keep 100% of your delivery earnings without platform commission deductions.",
    icon: HandCoins,
  },
  {
    title: "Subscription-Based ang Sistema",
    description:
      "Instead of paying commission per delivery, partner-drivers operate under FastMet's subscription-based model.",
    icon: ReceiptText,
  },
];

export default function ZeroCommission() {
  return (
    <section
      id="zero-commission"
      className="relative isolate mb-12 w-full scroll-mt-24 overflow-hidden bg-secondary px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[34rem] rounded-full bg-primary/[0.07] blur-3xl"
      />

      <PageContainer>
        <div className="grid items-center gap-10 lg:gap-14 xl:grid-cols-[0.78fr_1.5fr] xl:gap-16">
          {/* Driver image */}
          <div className="relative w-full min-w-0">
            <div className="group relative w-full overflow-hidden rounded-3xl sm:rounded-[2rem]">
              <img
                src={homeDriver}
                alt="FastMet partner-driver"
                className="aspect-[3/4] md:aspect-[5/4]  w-full object-cover object-center sm:aspect-[16/9] xl:aspect-[4/5]"
              />

              {/* Image overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
              />

              {/* Image content */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5 sm:p-7 lg:p-8">
                <h3 className="max-w-sm text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
                  Walang Commission.
                  <br />
                  Buong Kita sa Bawat Biyahe.
                </h3>

                <p className="max-w-xs text-xs leading-relaxed text-white/75 sm:text-sm">
                  Subscription fees and applicable terms and conditions apply
                </p>

                <CTAButton
                  to="/partner-driver"
                  variant="primary"
                  size="md"
                  className="mt-1 w-full px-8 text-secondary shadow-lg shadow-black/20 sm:w-auto"
                >
                  Drive with FastMet
                </CTAButton>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex min-w-0 flex-col gap-8 sm:gap-10">
            {/* Heading and description */}
            <div className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Zero Commission.
                  <span className="block text-primary">For Life.</span>
                </h2>
              </div>

              <div className="max-w-2xl space-y-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                <p>
                  Sa FastMet, naniniwala kami na dapat mas sulit ang bawat
                  biyahe para sa ating partner-drivers. That's why we're
                  introducing a subscription-based delivery model.
                </p>

                <p>
                  Unlike traditional delivery platforms that deduct a percentage
                  from every completed booking,{" "}
                  <span className="font-bold text-primary">
                    walang commission na kinukuha ang FastMet sa delivery
                    earnings ng partner-drivers.
                  </span>
                </p>

                <p className="font-bold text-primary">
                  Instead, FastMet operates through a subscription-based system,
                  allowing partner-drivers to keep 100% of their delivery
                  earnings.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-2 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 xl:grid-cols-3">
              {points.map(({ title, description, icon: Icon }) => (
                <article
                  key={title}
                  className="relative flex min-w-0 flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-primary/30 hover:bg-white/[0.05] sm:p-6"
                >
                  <div className="absolute right-0 bottom-0 bg-primary p-2 rounded-full transform translate-x-3 translate-y-3">
                    <Icon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-secondary"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-white">
                    {title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-400">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
