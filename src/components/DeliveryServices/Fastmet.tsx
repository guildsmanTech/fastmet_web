import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import { Bell, Smartphone, Ticket, type LucideIcon } from "lucide-react";

interface IPerk {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const PERKS = [
  {
    icon: Ticket,
    title: "Exclusive delivery vouchers",
    desc: "Pre-registered users may receive exclusive vouchers that can be used for eligible FastMet deliveries once the service becomes available.",
  },
  {
    icon: Smartphone,
    title: "Chance to win mobile load",
    desc: "Successful pre-registrants may get a chance to win mobile load worth up to ₱500.",
  },
  {
    icon: Bell,
    title: "Early FastMet updates",
    desc: "Receive official announcements about our launch, service coverage, promotions, and future access to the FastMet mobile app.",
  },
] satisfies IPerk[];

export default function AnoAngFastmet() {
  return (
    <section className="w-full py-20 lg:py-28 px-3 md:px-0">
      <PageContainer className="flex flex-col gap-12 lg:gap-14">
        {/* Header + CTA */}
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex max-w-3xl flex-col items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Pre-registration
            </p>

            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
              Bakit FastMet?
            </h2>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Be among the first to receive official FastMet updates before our
              public launch. Pre-registration pa lamang ito. FastMet will send
              official updates and next steps through the contact details you
              provide.
            </p>
          </div>

          <CTAButton
            to="/user-register"
            variant="primary"
            className="px-7 py-3"
          >
            Pre-register now
          </CTAButton>
        </div>

        {/* Perks: joined grid with hairline dividers */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
          {PERKS.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group flex flex-col gap-5 bg-white p-6 transition-colors duration-200 hover:bg-slate-50 lg:p-8"
            >
              <div className="flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-primary transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/10">
                <Icon aria-hidden className="size-5" strokeWidth={1.8} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-secondary">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="max-w-3xl text-xs leading-relaxed text-slate-500 text-center mx-auto">
          Vouchers, prizes, eligibility requirements, and redemption details are
          subject to the official promotion mechanics and FastMet terms and
          conditions.
        </p>
      </PageContainer>
    </section>
  );
}
