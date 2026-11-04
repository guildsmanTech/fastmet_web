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
    <section className="w-full px-3 md:px-0 py-10 md:py-20" id="accepted-vehicles">
      <PageContainer className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 items-center text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
            Accepted Vehicles
          </h2>

          <p className="max-w-2xl text-xs leading-relaxed text-gray-500 sm:text-sm">
            Vehicle categories and capacities are subject to final FastMet
            confirmation.
          </p>
        </div>

        {isPending && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-lg bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-center text-red-500">
            Unable to load vehicle list right now. Please try again later.
          </p>
        )}

        {!isPending && !isError && data && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[...data].map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </PageContainer>
    </section>
  );
}
