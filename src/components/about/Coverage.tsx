import {Link} from "react-router-dom";
import PageContainer from "@/components/PageContainer";

export default function Coverage() {
  return (
    <section className="w-full">
      <PageContainer className="flex flex-col md:flex-row gap-8 md:gap-14 items-center justify-center">
      {/* TODO: no source image for this block yet */}
      <div className="w-full md:w-1/2 aspect-[4/3] sm:aspect-video max-w-md bg-gray-300 rounded-lg shrink-0" />

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

        <Link
          to="/"
          className=" px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 font-semibold text-sm hover:from-yellow-500 hover:to-orange-600 transition text-white"
        >
          Pre-Register for Coverage Updates
        </Link>

        <p className="text-xs text-zinc-500 leading-relaxed">
          Final availability may vary depending on the route, vehicle type,
          cargo requirements, and available partner-drivers.
        </p>
      </div>
      </PageContainer>
    </section>
  );
}
