import { Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";

export default function FleetPromotion() {
  return (
    <section
      aria-labelledby="fleet-prompt"
      className="w-full bg-primary py-10 text-primary-foreground"
    >
      <PageContainer className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h2 id="fleet-prompt" className="text-xl font-bold">
            Run a trucking or logistics company?
          </h2>
          <p className="mt-2">
            Apply for FastMet Fleet to manage your vehicles, drivers and bookings.
          </p>
        </div>
        <Link
          to="/fleet"
          className="w-fit shrink-0 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"
        >
          Explore FastMet Fleet
        </Link>
      </PageContainer>
    </section>
  );
}
