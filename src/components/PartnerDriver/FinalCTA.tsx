import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import { Smartphone } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="final-cta" className="w-full bg-primary py-20">
      <PageContainer className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Maging FastMet partner-driver na!
          </h2>
          <p className="text-sm font-semibold text-zinc-900 bg-secondary/10 rounded-full px-4 py-2 w-fit self-center">
            Zero commission. For life.
          </p>

          <p className="max-w-xl text-sm leading-relaxed text-secondary/80 sm:text-base">
            Gamitin ang iyong sasakyan para sa delivery earning opportunities at
            panatilihin ang iyong delivery earnings nang walang commission sa
            bawat biyahe.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <CTAButton
            href="/subscription"
            variant="driver"
            className="bg-secondary px-7 py-3 text-white hover:bg-secondary/90"
          >
            Become a partner-driver
            <Smartphone className="text-white ml-1" size={16} />
          </CTAButton>
          <p className="max-w-md text-xs leading-relaxed text-secondary/70">
            Subscription fees and applicable terms and conditions apply.
            Partner-driver applications are subject to review and verification.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
