import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import {coverage} from "@/constants/images";

export default function Coverage() {
  return (
    <section className="w-full">
      <PageContainer className="flex flex-col md:flex-row gap-8 md:gap-14 items-center justify-center">
        <img
          src={coverage}
          alt="Greater Manila"
          className="w-full md:w-1/2 object-cover"
        />

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4 md:items-start">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
            Greater Manila to Nationwide
          </h2>
          <p className="text-sm text-zinc-700 leading-relaxed text-justify">
            FastMet accepts delivery requests within Greater Manila. Deliveries
            may be sent to different parts of the Philippines as long as the
            destination is accessible through continuous land travel. Routes
            requiring ferry or sea transport are not yet covered.
          </p>

          <CTAButton to="/" variant="driver" className="px-5 py-2.5">
            Pre-Register for Coverage Updates
          </CTAButton>

          <p className="text-xs text-zinc-500 leading-relaxed">
            Final availability may vary depending on the route, vehicle type,
            cargo requirements, and available partner-drivers.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
