import { Helmet } from "react-helmet-async";
import Coverage from "@/components/about/Coverage";
import JoinFastMet from "@/components/about/Join";
import MissionVision from "@/components/about/MissionVision";
import OurValues from "@/components/about/Values";
import Founder from "@/components/about/Founder";
import HeroSection from "@/components/about/HeroSection";
import RightVehicle from "@/components/about/RightVehicle";
import BetterRoute from "@/components/about/BetterRoute";

export default function About() {
  return (
    <div className="w-full flex flex-col">
      <Helmet>
        <title>About FastMet | On-Demand Delivery in Greater Manila</title>
        <meta
          name="description"
          content="FastMet is an on-demand delivery platform for individuals, online sellers, businesses, and partner-drivers. Learn our mission, values, and how we connect Greater Manila to nationwide deliveries."
        />
        <link rel="canonical" href="https://fastmet.com.ph/about" />
      </Helmet>
      <HeroSection />
      <RightVehicle />

      {/* Better route for everyone */}
      <BetterRoute />
      <MissionVision />
      <OurValues />
      <Founder />
      <Coverage />
      <JoinFastMet />
    </div>
  );
}
