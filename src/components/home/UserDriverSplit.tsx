import CTAButton from "@/components/CTAButton";
import {homeUser, homeDriver} from "@/constants/images";
import {DRIVER_PLAY_STORE_URL} from "@/helper/constant";
import {Calculator, Smartphone, ChevronRight} from "lucide-react";
import PageContainer from "@/components/PageContainer";

export default function UserDriverSplit() {
  return (
    <section className="w-full">
      <PageContainer className="flex flex-col md:flex-row gap-10 md:gap-3">
        {/* User card */}
        <div className="flex-1 flex flex-col gap-4">
          <img
            className="w-full aspect-[4/3] lg:aspect-auto rounded-2xl "
            src={homeUser}
            alt="User"
          />
          <h3 className="text-primary font-bold text-lg">May Ipapadala Ka?</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Get an instant delivery quote for your parcel, cargo, or business
            shipment — from motorcycle to wing van across Greater Manila and
            land-accessible routes.
          </p>
          <CTAButton
            to="/get-a-quote"
            variant="primary"
            icon={Calculator}
            className="w-fit px-5 py-2.5"
          >
            Get a Quote
          </CTAButton>
        </div>

        {/* Driver card */}
        <div className="flex-1 flex flex-col gap-4">
          <img
            className="w-full aspect-[4/3] lg:aspect-auto rounded-2xl"
            src={homeDriver}
            alt="Driver"
          />
          <h3 className="text-primary font-bold text-lg">May Sasakyan Ka?</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Download the FastMet Driver app to manage deliveries, track
            earnings, and join as a partner-driver.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <CTAButton
              href={DRIVER_PLAY_STORE_URL}
              variant="primary"
              icon={Smartphone}
              className="w-fit px-5 py-2.5"
            >
              Download Driver App
            </CTAButton>
            <ChevronRight className="text-primary size-4 shrink-0" />
            <span className="leading-tight">
              <span className="text-primary font-bold text-2xl">
                0%{" "}
                <span className="font-semibold text-gray-700 text-sm">
                  Commission
                </span>
              </span>
              <span className="block text-[10px] text-gray-500">
                Subscription fee lang
              </span>
            </span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
