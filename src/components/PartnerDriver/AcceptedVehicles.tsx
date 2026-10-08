import {useVehicles} from "@/hooks/useVehicleQueries";
import type {IVehicleType} from "@/types/vehicle";
import PageContainer from "@/components/PageContainer";
import {DRIVER_PLAY_STORE_URL} from "@/helper/constant";

const VEHICLE_DESCRIPTION = {
  motorcycle:
    "Para sa documents, food orders, small parcels, at magaang na items.",
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

function VehicleCard({vehicle}: {vehicle: IVehicleType}) {
  const maxLoad = Math.max(...vehicle.variants.map((v) => v.maxLoadKg));

  return (
    <div className="flex overflow-hidden flex-col bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-4">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="object-contain w-full h-22 lg:h-28 xl:h-30"
        />
      </div>
      <div className="flex flex-col flex-1 gap-2 px-4 pt-3 pb-4">
        <div className="flex flex-col gap-2 justify-between items-center pb-2 border-b md:flex-row border-primary">
          <span className="text-[11px] md:text-xs font-bold uppercase text-secondary">
            {vehicle.name}
          </span>
          <span className="text-[10px] text-gray-500 whitespace-nowrap">
            Up to {maxLoad} kg
          </span>
        </div>
        <p className="flex-1 text-xs leading-relaxed text-gray-600 lg:text-sm">
          {VEHICLE_DESCRIPTION[vehicle.key as keyof typeof VEHICLE_DESCRIPTION]}
        </p>
      </div>
    </div>
  );
}

export function AcceptedVehicles() {
  const {data, isPending, isError} = useVehicles();

  return (
    <section className="w-full" id="accepted-vehicles">
      <PageContainer className="flex flex-col gap-8">
        <div className="flex flex-col gap-1 items-center text-center">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Accepted Vehicles
          </h2>
          <p className="text-gray-500 text-[11px] md:text-sm">
            NOTE: Vehicle categories and capacities are subject to final FastMet
            confirmation.
          </p>
        </div>

        {isPending && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({length: 8}).map((_, i) => (
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
