import CTAButton from "@/components/CTAButton";
import {zero} from "@/constants/images";
import PageContainer from "@/components/PageContainer";
import {DRIVER_PLAY_STORE_URL} from "@/helper/constant";
import {Smartphone} from "lucide-react";

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
            alt="0% commission, subscription fee lang"
            className="size-30 lg:size-40 object-contain xl:size-50"
          />
          <p className="text-secondary font-bold text-xl md:text-2xl text-left leading-tight">
            0% Commission
            <br />
            <span className="text-base md:text-lg font-semibold text-gray-600">
              Subscription fee lang
            </span>
          </p>
        </div>

        <p className="text-gray-600 text-xs md:text-sm max-w-md">
          Download the FastMet Driver app and start managing deliveries,
          earnings, and opportunities as a partner-driver.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <CTAButton
            href={DRIVER_PLAY_STORE_URL}
            variant="driver"
            icon={Smartphone}
            className="px-6 py-2.5"
          >
            Download Driver App
          </CTAButton>
          <CTAButton to="/subscription" variant="outline" className="px-6 py-2.5">
            Get Subscription
          </CTAButton>
        </div>
      </PageContainer>
    </section>
  );
}
