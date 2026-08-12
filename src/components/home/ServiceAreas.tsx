import {phMap} from "@/constants/images";

const SERVICE_AREAS = {
  "Metro Manila": [
    "Caloocan",
    "Las Piñas",
    "Makati",
    "Malabon",
    "Mandaluyong",
    "Manila",
    "Marikina",
    "Muntinlupa",
    "Navotas",
    "Parañaque",
    "Pasay",
    "Pasig",
    "Pateros",
    "Quezon City",
    "San Juan",
    "Taguig",
    "Valenzuela",
  ],
  "Bulacan": [
    "Meycauayan",
    "Marilao",
    "Bocaue",
    "Santa Maria",
    "Balagtas",
    "Guiguinto",
    "San Jose del Monte",
    "Malolos",
    "Plaridel",
  ],
  "Cavite": ["Bacoor", "General Trias", "Imus", "Kawit", "Dasmariñas"],
  "Rizal": [
    "Antipolo",
    "Cainta",
    "Rodriguez (Montalban)",
    "San Mateo",
    "Taytay",
  ],
  "Laguna": ["Cabuyao", "Calamba", "Santa Rosa"],
};
export default function ServiceAreas() {
  return (
    <section className="w-full bg-gray-50 px-6 md:px-12 xl:px-40 py-10 flex flex-col gap-8">
      <div className="text-center flex flex-col gap-1">
        <h2 className="text-primary font-bold text-xl md:text-2xl">
          Greater Manila Service Areas
        </h2>
        <p className="text-gray-600 text-sm">
          FastMet is currently available for delivery requests in the following
          locations:
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 ">
          {Object.entries(SERVICE_AREAS).map(([province, cities]) => (
            <div key={province} className="flex flex-col gap-1.5">
              <span className="text-primary font-bold text-sm">{province}</span>
              {cities.map((city) => (
                <span key={city} className="text-gray-700 text-xs">
                  {city}
                </span>
              ))}
            </div>
          ))}
        </div>

        <img
          className="w-full md:w-[350px] lg:w-[500px] shrink-0 aspect-square rounded-2xl"
          src={phMap}
          alt="Philippine Map"
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          className="w-fit flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition"
          onClick={() =>
            document
              .getElementById("hero")
              ?.scrollIntoView({behavior: "smooth"})
          }
        >
          Pre-Register for Updates
        </button>
        <p className="text-gray-500 text-xs">
          Final service availability may depend on the pickup location,
          destination, vehicle type, cargo size, route accessibility, and
          partner-driver availability.
        </p>
      </div>
    </section>
  );
}
