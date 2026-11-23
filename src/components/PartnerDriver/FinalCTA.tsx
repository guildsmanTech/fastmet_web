import CTAButton from "@/components/CTAButton";
import ClosingCallToAction from "@/components/ClosingCallToAction";
import { DRIVER_PLAY_STORE_URL } from "@/helper/constant";
import { Smartphone } from "lucide-react";

export function FinalCTA() {
  return (
    <ClosingCallToAction
      title="Maging FastMet partner-driver na!"
      badge="Zero commission. For life."
      description="Gamitin ang iyong sasakyan para sa delivery earning opportunities at panatilihin ang iyong delivery earnings nang walang commission sa bawat biyahe."
      note="Subscription fees and applicable terms and conditions apply. Partner-driver applications are subject to review and verification."
      action={
        <CTAButton
          href={DRIVER_PLAY_STORE_URL}
          variant="driver"
          className="bg-secondary px-7 py-3 text-white hover:bg-secondary/90"
        >
          Become a partner-driver
          <Smartphone className="text-white ml-1" size={16} />
        </CTAButton>
      }
    />
  );
}
