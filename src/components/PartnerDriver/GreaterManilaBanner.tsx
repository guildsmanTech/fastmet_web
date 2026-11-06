import CTAButton from "@/components/CTAButton";
import { Smartphone } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { partnerComms } from "@/constants/images";

export function Commission() {
  return (
    <section
      id="greater-manila"
      className="w-full bg-white px-3 py-20 md:px-0 lg:py-28"
    >
      <PageContainer className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Image */}
        <div className="relative lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={partnerComms}
              alt="FastMet delivery"
              className="block h-auto w-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-7 lg:col-span-6">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
              Mas sulit ang bawat biyahe.{" "}
              <span className="text-primary"> Walang commission.</span>
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

          {/* Earnings highlight */}
          <div className="flex w-full max-w-lg items-center gap-5 rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 sm:p-6">
            <span className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              100%
            </span>

            <div className="h-12 w-px bg-primary/20" />

            <div className="space-y-1">
              <p className="text-sm font-bold text-secondary sm:text-base">
                Your delivery earnings
              </p>
              <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                Go directly to you, without percentage-based commission.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex w-full max-w-lg flex-col items-start gap-3">
            <CTAButton
              href="/subscription"
              variant="driver"
              size="compact"
              className="w-full py-3 sm:w-auto sm:py-0"
            >
              Get started today
              <Smartphone className="ml-1 text-white" size={16} />
            </CTAButton>

            <p className="text-xs leading-relaxed text-slate-500">
              Subscription fees and applicable terms and conditions apply.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
