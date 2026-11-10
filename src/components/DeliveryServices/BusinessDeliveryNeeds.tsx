import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import { servicesNeeds } from "@/constants/images";
import { getBusinessInquiryMailto } from "@/helper/constant";
import { Check } from "lucide-react";

const CHECKLIST = [
  "On-demand business deliveries",
  "Scheduled or recurring deliveries",
  "Online shop and customer order deliveries",
  "Documents, supplies, and equipment transport",
  "Bulk and larger cargo deliveries",
  "Customized delivery arrangements",
];

export default function BusinessDeliveryNeeds() {
  return (
    <section className="w-full bg-secondary py-20 lg:py-28 px-3 md:px-0">
      <PageContainer className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Image (left) */}
        <div className="overflow-hidden rounded-2xl border border-white/10 lg:col-span-5">
          <img
            src={servicesNeeds}
            alt="FastMet delivery"
            className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/5]"
          />
        </div>

        {/* Content (right) */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              For business
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              May delivery needs ang business mo?
            </h2>
            <div className="flex max-w-xl flex-col gap-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              <p>
                Mula customer orders at small parcels hanggang supplies,
                equipment, at malalaking cargo, FastMet offers delivery options
                para sa iba’t ibang business needs.
              </p>
              <p>
                Online shop, restaurant, retail store, office, o growing local
                brand man ang business mo, kausapin ang FastMet team tungkol sa
                iyong delivery requirements.
              </p>
            </div>
          </div>

          {/* Checklist: joined grid with hairline dividers */}
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 bg-secondary px-4 py-3.5 text-sm text-white"
              >
                <Check
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  strokeWidth={2.5}
                />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4">
            <CTAButton
              href={getBusinessInquiryMailto()}
              variant="user"
              className="w-full justify-center px-7 py-3 sm:w-fit"
            >
              Send a business inquiry
            </CTAButton>
            <p className="max-w-xl text-xs leading-relaxed text-slate-500">
              Our team will review your requirements and contact you about
              available delivery arrangements, service coverage, and next steps.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
