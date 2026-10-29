import { Helmet } from "react-helmet-async";
import QuestionForm from "@/components/home/QuestionForm";
import LoaderModal from "@/components/modals/Loader";
import { useRegistrationCounts } from "@/hooks/useRegistrationQueries";
import { useVehicles } from "@/hooks/useVehicleQueries";
import ServiceAreas from "@/components/home/ServiceAreas";
import ZeroCommission from "@/components/home/ZeroCommission";
import Registrations from "@/components/home/Registrations";
import ServiceDelivery from "@/components/home/ServiceDelivery";
import FareCalculator from "@/components/home/FareCalculator";
import HeroSection from "@/components/home/HeroSection";
import WhyFastMet from "@/components/home/WhyFastmet";

// TAKE_NOTE: px-2 md:px-0 (OVERALL EACH SECTION)

export default function Home() {
  const { isPending: countsLoading } = useRegistrationCounts();
  const { isPending: vehiclesLoading } = useVehicles();

  return (
    <div className="flex overflow-x-hidden flex-col justify-center items-center w-full">
      <Helmet>
        <title>
          FastMet – Fast & Reliable On-Demand Delivery in Greater Manila
        </title>
        <meta
          name="description"
          content="Book a courier in seconds. FastMet connects users and businesses with the right partner-driver and vehicle — from motorcycle to wing van — across Greater Manila and nationwide land routes. Pre-register now."
        />
        <link rel="canonical" href="https://fastmet.com.ph/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FastMet",
            url: "https://fastmet.com.ph",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "FastMet",
            url: "https://fastmet.com.ph",
            logo: "https://fastmet.com.ph/fastmet_icon.png",
            description: "On-demand delivery platform in Greater Manila",
            areaServed: "Greater Manila",
            sameAs: [],
          })}
        </script>
      </Helmet>
      <HeroSection />
      <WhyFastMet />
      <ZeroCommission /> {/* <UserDriverSplit /> */}
      <ServiceDelivery /> {/* <CoverageExplainer /> */}
      <FareCalculator />
      <ServiceAreas />
      <Registrations />
      <QuestionForm />
      <LoaderModal open={countsLoading || vehiclesLoading} />
    </div>
  );
}
