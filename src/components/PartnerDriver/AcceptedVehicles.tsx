import { useVehicles } from "@/hooks/useVehicleQueries";
import type { IVehicleType } from "@/types/vehicle";
import PageContainer from "@/components/PageContainer";

interface VehicleCardProps {
  readonly vehicle: IVehicleType;
}

const VEHICLE_DESCRIPTION: Record<string, string> = {
  motorcycle: "Para sa documents, small parcels, at magagaang items.",
  sedan: "Para sa multiple packages, delicate items, at medium-sized orders.",
  subcompact_suv:
    "Para sa business orders, multiple boxes, at medium-sized cargo.",
  suv_smallvan:
    "Para sa appliances, larger boxes, supplies, at multiple orders.",
  small_pickup: "Para sa furniture, tools, equipment, at bulky items.",
  l300_cargo_van:
    "Para sa inventory, appliances, equipment, at large-volume deliveries.",
  closed_van:
    "Para sa heavy items, commercial deliveries, at cargo na kailangang enclosed.",
  wing_van:
    "Para sa warehouse deliveries, palletized goods, oversized items, at large commercial cargo.",
};

function VehicleCard({ vehicle }: VehicleCardProps) {
  const maxLoad = Math.max(...vehicle.variants.map((v) => v.maxLoadKg));

  return (
    <div className="flex overflow-hidden flex-col bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="flex justify-center items-center p-4 bg-gray-50 aspect-[4/3]">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="object-contain w-full h-22 lg:h-28 xl:h-30"
        />
      </div>

      <div className="flex flex-col flex-1 gap-3 px-4 pt-4 pb-5">
        <div className="flex flex-col gap-1.5 pb-3 border-b border-primary/30">
          <h3 className="text-sm font-bold tracking-wide text-secondary uppercase">
            {vehicle.name}
          </h3>

          <span className="text-xs font-semibold text-primary">
            Up to {maxLoad} kg
          </span>
        </div>

        <p className="flex-1 text-xs leading-relaxed text-gray-600 sm:text-sm">
          {VEHICLE_DESCRIPTION[vehicle.key as keyof typeof VEHICLE_DESCRIPTION]}
        </p>
      </div>
    </div>
  );
}

export function AcceptedVehicles() {
  const { data, isPending, isError } = useVehicles();

  return (
    <section
      className="w-full bg-white py-20 lg:py-28 border-t"
      id="accepted-vehicles"
    >
      <PageContainer className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: vehicle grid */}
        <div className="lg:col-span-7">
          {isPending && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-16 text-center text-sm text-slate-500">
              Unable to load vehicle list right now. Please try again later.
            </div>
          )}

          {!isPending && !isError && data && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[...data].map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>

        {/* Right: sticky intro / CTA text */}
        <div className="flex flex-col gap-4 lg:col-span-5 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Vehicles
          </p>

          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Accepted <span className="text-primary">Vehicles</span>
          </h2>

          <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
            Vehicle categories, payload capacities, and operational guidelines
            are strictly subject to final FastMet confirmation, review, and
            verification upon application submission.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
