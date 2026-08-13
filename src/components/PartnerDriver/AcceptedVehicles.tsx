import {useVehicles} from "@/hooks/useVehicleQueries";
import type {IVehicleType} from "@/types/vehicle";
import {Link} from "react-router-dom";

function VehicleCard({vehicle}: {vehicle: IVehicleType}) {
  const maxLoad = Math.max(...vehicle.variants.map((v) => v.maxLoadKg));

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-4">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="object-contain w-full h-22 lg:h-28 xl:h-36"
        />
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2 flex-1">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 border-b border-primary pb-2">
          <span className="text-[11px] md:text-xs font-bold uppercase text-secondary">
            {vehicle.name}
          </span>
          <span className="text-[10px] text-gray-500 whitespace-nowrap">
            Up to {maxLoad} kg
          </span>
        </div>
        <p className="text-xs text-gray-600 lg:text-sm leading-relaxed flex-1">
          {vehicle.desc}
        </p>
        <Link
          to={`/driver-register?vehicle=${vehicle.key}`}
          className="mt-1 text-center text-[11px] md:text-xs font-semibold border border-primary text-primary hover:bg-primary hover:text-white rounded-full px-3 py-2 transition"
        >
          Pre-Register This Vehicle
        </Link>
      </div>
    </div>
  );
}

export function AcceptedVehicles() {
  const {data, isPending, isError} = useVehicles();

  return (
    <section
      className="w-full px-4 md:px-12 xl:px-20 flex flex-col gap-8"
      id="accepted-vehicles"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-primary font-bold text-2xl md:text-3xl">
          Accepted Vehicles
        </h2>
        <p className="text-gray-500 text-[11px] md:text-sm">
          NOTE: Vehicle categories and capacities are subject to final FastMet
          confirmation.
        </p>
      </div>

      {isPending && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({length: 8}).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-lg bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-center text-sm text-red-500">
          Unable to load vehicle list right now. Please try again later.
        </p>
      )}

      {!isPending && !isError && data && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...data].map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </section>
  );
}
