import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import {useVehicles} from "@/hooks/useVehicleQueries";

export default function AvailableVehicles() {
  const {data, isPending, isError} = useVehicles();

  return (
    <section className="w-full py-16 md:py-20 bg-secondary">
      <PageContainer className="text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
        Available FastMet vehicle options may include:
      </h2>

      {isPending && (
        <p className="text-white/70 text-sm mt-8">Loading vehicles...</p>
      )}

      {isError && (
        <p className="text-white/70 text-sm mt-8">
          Unable to load vehicle options right now.
        </p>
      )}

      {data && (
        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-16 mt-10">
          {data.map((vehicle) => (
            <div
              key={vehicle.key}
              className="flex flex-col items-center gap-2 w-20"
            >
              <img
                src={vehicle.imageUrl}
                alt={vehicle.name}
                className="size-16 object-contain md:size-22"
              />
              <span className="text-white font-semibold text-xs sm:text-sm text-center">
                {vehicle.name}
              </span>
            </div>
          ))}
        </div>
      )}

      <CTAButton
        to="/user-register"
        variant="user"
        className="mt-10 border border-primary/30"
      >
        Pre-Register as a User
      </CTAButton>

      <p className="text-white/70 text-xs mt-4 max-w-md mx-auto">
        Final vehicle availability will depend on the cargo size, pickup
        location, destination, route accessibility, and partner-driver
        availability.
      </p>
      </PageContainer>
    </section>
  );
}
