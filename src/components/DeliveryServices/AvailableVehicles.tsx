import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import { useVehicles } from "@/hooks/useVehicleQueries";

export default function AvailableVehicles() {
  const { data, isPending, isError } = useVehicles();

  return (
    <section className="w-full bg-secondary py-20 lg:py-28">
      <PageContainer className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: sticky intro + CTA */}
        <div className="flex flex-col gap-8 lg:col-span-5 lg:sticky lg:top-28">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Vehicles
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Available FastMet{" "}
              <span className="text-primary">vehicle options</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
              Final vehicle availability will depend on the cargo size, pickup
              location, destination, route accessibility, and partner-driver
              availability.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div>
              <h3 className="text-base font-semibold text-white">
                Ready to send your first delivery?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                Pre-register to get official FastMet updates before our public
                launch.
              </p>
            </div>
            <CTAButton
              to="/user-register"
              variant="user"
              className="w-full justify-center border border-primary/30 px-6 py-3 sm:w-fit"
            >
              Pre-Register as a User
            </CTAButton>
          </div>
        </div>

        {/* Right: vehicle grid */}
        <div className="lg:col-span-7">
          {isError ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center text-sm text-slate-400">
              Unable to load vehicle options right now.
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
              {isPending
                ? Array.from({ length: 8 }).map((_, i) => (
                    <li
                      key={i}
                      className="flex aspect-[4/3] animate-pulse flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="size-14 rounded-lg bg-white/10" />
                      <div className="h-3 w-20 rounded bg-white/10" />
                    </li>
                  ))
                : data?.map((vehicle) => (
                    <li
                      key={vehicle.key}
                      className="group flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-primary/40 hover:bg-white/[0.06]"
                    >
                      <img
                        src={vehicle.imageUrl}
                        alt=""
                        className="h-16 w-full object-contain transition-transform duration-300 group-hover:scale-105 md:h-20"
                      />
                      <span className="text-center text-sm font-medium leading-snug text-white">
                        {vehicle.name}
                      </span>
                    </li>
                  ))}
            </ul>
          )}
        </div>
      </PageContainer>
    </section>
  );
}   
