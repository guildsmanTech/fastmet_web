import AvailableVehicles from "@/components/DeliveryServices/AvailableVehicles";
import BusinessDeliveryNeeds from "@/components/DeliveryServices/BusinessDeliveryNeeds";
import Documents from "@/components/DeliveryServices/Documents";
import AnoAngFastmet from "@/components/DeliveryServices/Fastmet";
import PaanoMagPreRegister from "@/components/DeliveryServices/PaanoMagPreRegister";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/DeliveryServices/HeroSection";
import FinalkCTA from "@/components/DeliveryServices/FinalCTA";

export default function DeliveryServices() {
  return (
    <div className="w-full flex flex-col">
      <Helmet>
        <title>
          FastMet Delivery Services | On-Demand Delivery in Greater Manila
        </title>
        <meta
          name="description"
          content="Pre-register as a FastMet user for fast, reliable delivery across Greater Manila. Get updates on launch, coverage, promos, and platform access."
        />
        <link rel="canonical" href="https://fastmet.com.ph/delivery-services" />
      </Helmet>
      <HeroSection />
      <AnoAngFastmet />
      <Documents />
      <AvailableVehicles />
      <PaanoMagPreRegister />
      <BusinessDeliveryNeeds />
      <FinalkCTA />
    </div>
  );
}
