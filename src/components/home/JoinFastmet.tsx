// components/join-fastmet.tsx
import { Package, User, Truck, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import PageContainer from "../PageContainer";
import CTAButton from "../CTAButton";

export default function JoinFastMet({ className }: { className?: string }) {
  return (
    <PageContainer className={cn("w-full px-6 md:px-4 py-14 md:py-16", className)}>
      <div className="flex w-full flex-col xl:flex-row xl:items-center">
        {/* Right: Texts */}
        <div className="w-full max-w-4xl space-y-6 lg:pt-4 h-full text-left  flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
            May ipapadala? May
            <br />
            sasakyan?
            <br />
            <span className="text-primary">FastMet na!</span>
          </h2>

          <p className="max-w-xl text-slate-600 text-base leading-relaxed">
            May documents, parcels, business supplies, o malalaking gamit na
            kailangang ihatid? With FastMet, you can find the right vehicle and
            partner-driver for your delivery needs. Personal man o
            pang-business, FastMet is here to help you move what matters.
          </p>
        </div>
        {/* Cards (stacked) */}
        <div className="flex flex-col w-full gap-x-5 mt-6">
          <div className="flex flex-col text-left gap-6">
            {/* Customer Card */}
            <div className="relative overflow-hidden rounded-3xl bg-orange-50/80 border border-orange-100 p-8">
              <Package
                className="absolute -bottom-6 -right-6 h-40 w-40 text-primary/20"
                strokeWidth={1}
              />

              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wider text-primary">
                    For customers
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    May ipapadala?
                  </h3>
                  <p className="text-slate-600 leading-relaxed max-w-sm">
                    May documents, parcels, business supplies, o malalaking
                    gamit na kailangang ihatid? With FastMet, you can find the
                    right vehicle and partner-driver for your delivery needs.
                    Personal man o pang-business, FastMet is here to help you
                    move what matters.
                  </p>
                </div>
                <CTAButton
                  to="/user-register"
                  variant="primary"
                  size="md"
                  icon={CalendarCheck}
                  className="mt-1 w-full px-8 sm:w-auto"
                >
                  Book a delivery
                </CTAButton>
              </div>
            </div>

            {/* Driver Card */}
            <div className="relative overflow-hidden rounded-3xl bg-secondary p-8">
              <User
                className="absolute -bottom-4 -right-4 h-36 w-36 text-slate-700/80"
                strokeWidth={1}
              />

              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold tracking-wider text-primary">
                    For partner-drivers
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    May sasakyan?
                  </h3>
                  <p className="text-slate-400 leading-relaxed max-w-sm">
                    Gamitin ang iyong sasakyan para magkaroon ng delivery
                    earning opportunities with FastMet. With our
                    subscription-based model, zero commission for life ang mga
                    partner-drivers. Walang percentage-based commission
                    deductions sa bawat completed delivery.
                  </p>
                </div>
                <CTAButton
                  to="/partner-driver"
                  variant="primary"
                  size="md"
                  icon={Truck}
                  className="mt-1 w-full px-8 sm:w-auto"
                >
                  Drive with FastMet
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}