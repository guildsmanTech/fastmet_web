import CTAButton from "@/components/CTAButton";
import {Smartphone} from "lucide-react";
import PageContainer from "@/components/PageContainer";
import {partnerComms} from "@/constants/images";
import {DRIVER_PLAY_STORE_URL} from "@/helper/constant";

export function Commission() {
  return (
    <section
      className="w-full border-b-2 border-primary pb-10"
      id="greater-manila"
    >
      <PageContainer className="flex flex-col md:gap-10 md:flex-row gap-4 justify-center items-center">
        <img
          src={partnerComms}
          alt="FastMet delivery"
          className="w-full md:w-1/2 object-cover"
        />

        <div className="w-full md:w-1/2 flex flex-col gap-3 justify-center items-center md:items-start">
          <h1 className="text-lg font-bold md:text-2xl">
            Mas Maraming Kita. Walang Commission
          </h1>
          <p className="text-xs text-gray-600 md:text-sm ">
            FastMet partner-drivers keep 100% of their delivery earnings. Walang
            commission cut — subscription fee lang.
          </p>
          <h3 className="text-xs font-semibold">
            Delivery Earnings →{" "}
            <span className="font-bold text-primary text-sm">100%</span> for the
            Driver
          </h3>
          <CTAButton
            href={DRIVER_PLAY_STORE_URL}
            variant="driver"
            size="compact"
            icon={Smartphone}
            className="[&_svg]:hidden lg:[&_svg]:block"
          >
            Download Driver App
          </CTAButton>
        </div>
      </PageContainer>
    </section>
  );
}
