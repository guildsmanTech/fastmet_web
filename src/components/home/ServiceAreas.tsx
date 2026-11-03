import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import { ArrowUpRight } from "lucide-react";

export const SERVICE_AREAS = [
  {
    name: "Metro Manila",
    locations: [
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
  },
  {
    name: "Bulacan",
    locations: [
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
  },
  {
    name: "Rizal",
    locations: [
      "Antipolo",
      "Cainta",
      "Rodriguez (Montalban)",
      "San Mateo",
      "Taytay",
    ],
  },
  {
    name: "Cavite",
    locations: ["Bacoor", "General Trias", "Imus", "Kawit", "Dasmariñas"],
  },
  {
    name: "Laguna",
    locations: ["Cabuyao", "Calamba", "Santa Rosa"],
  },
];

export default function ServiceAreas() {
  return (
    <section
      id="service-areas"
      className="w-full py-10 scroll-mt-24 px-3 md:px-0"
    >
      <PageContainer className="flex flex-col gap-8">
        <div className="mt-10">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                  Where we pick up
                </span>
              </div>

              <h3 className="text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-slate-950">
                Greater Manila
                <br />
                <span className="text-primary">Service Areas</span>
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
                We currently accept pickups across Metro Manila and selected
                nearby cities and municipalities.
              </p>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-6">
            {SERVICE_AREAS.map((area) => {
              // 4. Treat any long list as "wide": it spans 2 grid columns on sm and lg.
              //    Full class strings are written out so Tailwind can detect them.
              const isWide = area.locations.length > 10;

              return (
                <div
                  key={area.name}
                  className={`bg-white p-6 ${isWide ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-1"}`}
                >
                  {/* 5. Name + count as plain text, no pill */}
                  <div className="mb-4 flex items-baseline justify-between gap-3">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {area.name}
                    </h4>
                  </div>

                  {/* 6. Plain list. Wide cells split into 2 columns with CSS columns,
                     which fills top-to-bottom so alphabetical order stays readable.
                     break-inside-avoid stops an item from splitting across columns. */}
                  <ul
                    className={`text-sm text-slate-600 ${isWide ? "columns-2 gap-6" : ""}`}
                  >
                    {area.locations.map((location) => (
                      <li
                        key={location}
                        className="break-inside-avoid py-1 leading-6"
                      >
                        {location}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-secondary p-7 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Planning a delivery?
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
              Check your delivery fare and see if your route is covered by
              FastMet.
            </p>
          </div>
          <CTAButton
            variant="primary"
            className="px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-primary/90"
            to="/get-a-quote"
          >
            Check Your Delivery Fare
            <ArrowUpRight className="h-4 w-4" />
          </CTAButton>
        </div>

        {/* Supporting Note */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-400">
          Delivery availability depends on pickup location, destination, vehicle
          type, cargo requirements, route accessibility, and partner-driver
          availability.
        </p>
      </PageContainer>
    </section>
  );
}
