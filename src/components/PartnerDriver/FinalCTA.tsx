import CTAButton from "@/components/CTAButton";
import {zero} from "@/constants/images";
import PageContainer from "@/components/PageContainer";

export function FinalCTA() {
  return (
    <section className="w-full py-10" id="final-cta">
      <PageContainer className="flex flex-col items-center text-center gap-6">
      <h2 className="text-primary font-bold text-2xl md:text-3xl max-w-md">
        Be One of the First FastMet Partner-Drivers
      </h2>

      <div className="flex items-center gap-3 md:gap-4">
        <img
          src={zero}
          alt="0% commission"
          className="size-30 lg:size-40 object-contain xl:size-50"
        />
        <p className="text-secondary font-bold text-xl md:text-2xl text-left leading-tight">
          Introductory 0%
          <br />
          Commission
        </p>
      </div>

      <p className="text-gray-600 text-xs md:text-sm max-w-md">
        Pre-register now and receive updates about onboarding, activation,
        accepted vehicles, and future delivery opportunities.
      </p>

      <CTAButton to="/driver-register" variant="driver" className="px-6 py-2.5">
        Pre-Register as a Driver
      </CTAButton>
      </PageContainer>
    </section>
  );
}
