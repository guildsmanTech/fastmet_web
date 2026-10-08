import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatPeso } from "@/helper/subscription";
import { priceForTab } from "@/helper/itemTypes";
import { cn } from "@/lib/utils";
import type { QuoteTab, QuoteVehicle } from "@/types/quote";

type Props = {
  vehicle: QuoteVehicle;
  tab: QuoteTab;
};

export default function VehicleQuoteCard({ vehicle, tab }: Props) {
  const [open, setOpen] = useState(false);

  const rows = vehicle.variants
    .map((v) => ({ variant: v, price: priceForTab(v, tab) }))
    .filter((r): r is { variant: typeof r.variant; price: number } => r.price !== null);

  if (rows.length === 0) return null;

  const cheapest = Math.min(...rows.map((r) => r.price));

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-start w-full gap-3 p-3.5 text-left cursor-pointer sm:p-4"
      >
        <div className="flex items-center justify-center rounded-xl shrink-0 size-12 sm:size-14 bg-gray-50">
          {vehicle.imageUrl ? (
            <img
              src={vehicle.imageUrl}
              alt=""
              loading="lazy"
              className="object-contain size-9 sm:size-11"
            />
          ) : (
            <span className="text-xs font-semibold text-gray-400">N/A</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold leading-snug text-secondary sm:text-base">
              {vehicle.name}
            </h3>
            <ChevronDown
              className={cn(
                "mt-0.5 size-4 text-gray-400 transition-transform shrink-0 sm:size-5",
                open && "rotate-180 text-primary",
              )}
            />
          </div>

          <p className="mt-1.5 text-xs text-gray-500">
            {rows.length} load size{rows.length === 1 ? "" : "s"}
            <span className="mx-1 text-gray-300">·</span>
            <span className="text-gray-500">
              {rows.length > 1 ? "from " : ""}
            </span>
            <span className="font-bold text-secondary">{formatPeso(cheapest)}</span>
          </p>
        </div>
      </button>

      {open && (
        <ul className="mt-auto border-t border-gray-100 bg-gray-50/60">
          {rows.map(({ variant, price }) => (
            <li
              key={variant.variantId}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 sm:px-4 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-xs text-gray-700">
                Up to{" "}
                <span className="font-semibold text-gray-900">
                  {variant.maxLoadKg.toLocaleString()} kg
                </span>
              </span>
              <span className="text-xs font-bold tabular-nums text-secondary shrink-0 sm:text-sm">
                {formatPeso(price)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
