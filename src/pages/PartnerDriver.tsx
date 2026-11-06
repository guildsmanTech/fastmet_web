import { Helmet } from "react-helmet-async";
import { Requirements } from "@/components/PartnerDriver/Requirements";
import { AcceptedVehicles } from "@/components/PartnerDriver/AcceptedVehicles";
import { Commission } from "@/components/PartnerDriver/GreaterManilaBanner";
import { DriverFAQ } from "@/components/PartnerDriver/Faq";
import { FinalCTA } from "@/components/PartnerDriver/FinalCTA";
import HeroSection from "@/components/PartnerDriver/HeroSection";
import WhyJoinNow from "@/components/PartnerDriver/WhyJoinNow";

export default function PartnerDriver() {
  return (
    <div className="flex flex-col gap-10">
      <Helmet>
        <title>Become a FastMet Partner-Driver | Greater Manila</title>
        <meta
          name="description"
          content="Download the FastMet Driver app. Own a motorcycle, sedan, van, or truck? Manage deliveries and grow as a partner-driver across Greater Manila."
        />
        <link rel="canonical" href="https://fastmet.com.ph/partner-driver" />
      </Helmet>
      <HeroSection />
      <WhyJoinNow />
      <AcceptedVehicles />
      <Requirements />
      <Commission />
      <DriverFAQ />
      <FinalCTA />
    </div>
  );
}
