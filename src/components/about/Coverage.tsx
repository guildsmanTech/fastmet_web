import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import { holdingMap } from "@/constants/images";
import { Check, X } from "lucide-react";

export default function Coverage() {
  return (
    <section className="w-full px-3 md:px-0 py-20 lg:py-28">
      <PageContainer className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Image (left) */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-6">
          <img
            src={holdingMap}
            alt="Greater Manila coverage"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        {/* Content (right) */}
        <div className="flex flex-col gap-8 lg:col-span-6">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Coverage
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
              Greater Manila to <span className="text-primary">Nationwide</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              FastMet accepts delivery requests within Greater Manila.
              Deliveries may be sent to different parts of the Philippines as
              long as the destination is accessible through continuous land
              travel.
            </p>
          </div>

          {/* Quick facts: same copy, easier to scan */}
          <dl className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <dt className="shrink-0 text-sm text-slate-500">Pickup</dt>
              <dd className="flex min-w-0 items-center justify-end gap-2 text-right text-sm font-semibold text-secondary">
                <span>Within Greater Manila</span>
                <Check
                  aria-hidden
                  className="size-4 shrink-0 text-primary"
                  strokeWidth={2.5}
                />
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <dt className="shrink-0 text-sm text-slate-500">Delivery</dt>
              <dd className="flex min-w-0 items-center justify-end gap-2 text-right text-sm font-semibold text-secondary">
                <span>Reachable by continuous land travel</span>
                <Check
                  aria-hidden
                  className="size-4 shrink-0 text-primary"
                  strokeWidth={2.5}
                />
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <dt className="shrink-0 text-sm text-slate-500">
                Not yet covered
              </dt>
              <dd className="flex min-w-0 items-center justify-end gap-2 text-right text-sm font-semibold text-secondary">
                <span>Routes with ferry or sea transport</span>
                <X
                  aria-hidden
                  className="size-4 shrink-0 text-slate-400"
                  strokeWidth={2.5}
                />
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-4">
            <CTAButton
              to="/user-register"
              variant="driver"
              className="w-full justify-center px-7 py-3 sm:w-fit"
            >
              Pre-Register for Coverage Updates
            </CTAButton>
            <p className="max-w-xl text-xs leading-relaxed text-slate-500">
              Final availability may vary depending on the route, vehicle type,
              cargo requirements, and available partner-drivers.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
