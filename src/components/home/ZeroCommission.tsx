import { Coins, HandCoins, ReceiptText, type LucideIcon } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import { homeDriver } from "@/constants/images";
import { cn } from "@/lib/utils";

interface IZeroCommissionPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

const points: IZeroCommissionPoint[] = [
  {
    title: "Walang Commission sa Bawat Delivery",
    description: "Buong delivery fee, sa'yo mapupunta.",
    icon: Coins,
  },
  {
    title: "Buong Delivery Earnings, Sa'yo",
    description: "Ikaw ang may kontrol sa kinikita mo.",
    icon: HandCoins,
  },
  {
    title: "Subscription-Based ang Sistema",
    description: "Simple at malinaw na paraan para magamit ang platform.",
    icon: ReceiptText,
  },
];

export default function ZeroCommission() {
  return (
    <section
      id="zero-commission"
      className="mb-12 px-2 md:px-0 relative isolate w-full scroll-mt-24 overflow-hidden bg-secondary py-16 sm:py-20 lg:py-24"
    >
      {/* Soft glow accent */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 size-[34rem] rounded-full bg-primary/10 blur-3xl"
      />

      <PageContainer className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[25rem_minmax(0,1fr)] 2xl:gap-20">
        {/* Photo with CTA overlaid inside the image */}
        <div className="w-full rounded-[2.25rem] border-2 border-dashed border-primary/70 p-3 sm:p-4">
          <div className="relative overflow-hidden rounded-[1.6rem]">
            <img
              src={homeDriver}
              alt="FastMet partner-driver handing over parcels"
              className="aspect-[4/3] w-full object-cover lg:aspect-[3/4]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center px-5 pb-5 sm:px-6 sm:pb-6">
              <CTAButton
                to="/partner-driver"
                variant="primary"
                size="md"
                className="w-full px-8 text-secondary shadow-lg shadow-black/30 sm:w-auto"
              >
                Drive with FastMet
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Copy + benefits */}
        <div className="flex flex-col gap-5">
          <span className="inline-flex self-start items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary sm:text-[11px]">
            Zero Commission
          </span>

          <h2 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem] 2xl:text-6xl">
            Zero Commission.
            <br />
            <span className="text-primary">For Life.</span>
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Mas malaking kita sa bawat delivery—walang kaltas na komisyon, at
            100% ng bayad sa delivery ay direktang napupunta sa partner-driver.
          </p>

          <div className="mt-2 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 md:grid-cols-3 md:gap-0">
            {points.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className={cn(
                  "flex flex-col gap-3 md:px-5",
                  index === 0 && "md:pl-0",
                  index > 0 && "md:border-l md:border-white/10",
                )}
              >
                <Icon
                  aria-hidden="true"
                  className="size-7 text-primary"
                  strokeWidth={1.8}
                />
                <h3 className="text-lg font-bold leading-tight text-white">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
