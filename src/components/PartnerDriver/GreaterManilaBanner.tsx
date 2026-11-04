import CTAButton from "@/components/CTAButton";
import { Smartphone } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { partnerComms } from "@/constants/images";

export function Commission() {
  return (
    <section id="greater-manila" className="px-3 md:px-0 -full bg-white py-20 lg:py-28">
      <PageContainer className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Image */}
        <div className="relative w-full lg:col-span-6">
          <div>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={partnerComms}
                alt="FastMet delivery"
                className="block h-auto w-full object-cover self-center"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-6 lg:col-span-6">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Zero commission
            </p>

            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
              Mas Sulit ang Bawat Biyahe.{" "}
              <span className="text-primary">Walang commission.</span>
            </h2>

            <div className="max-w-lg space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>
                Walang percentage-based commission na ibabawas sa bawat
                completed delivery, so you keep 100% of your delivery earnings.
              </p>
              <p>
                Sa FastMet, zero commission for life ang partner-drivers through
                our subscription-based model.
              </p>
            </div>
          </div>

          {/* Earnings stat */}
          <div className="flex w-full max-w-lg items-center gap-5 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <span className="text-4xl font-bold tracking-tight text-primary">
              100%
            </span>
            <div className="h-10 w-px bg-slate-200" />
            <p className="text-sm font-medium leading-snug text-secondary">
              Delivery earnings
              <br />
              <span className="font-normal text-slate-600">
                go to the driver
              </span>
            </p>
          </div>

          {/* CTA */}
          <div className="flex w-full max-w-lg flex-col items-start gap-3">
            <CTAButton
              href="/subscription"
              variant="driver"
              size="compact"
              className="w-full md:w-auto py-3 md:py-0"
            >
              Get Started Today
              <Smartphone className="text-white ml-1" size={16} />
            </CTAButton>

            <p className="text-xs text-slate-500 text-center md:text-left">
              Subscription fees and applicable terms and conditions apply.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
