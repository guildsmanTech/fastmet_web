import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { formatPeso } from "@/helper/subscription";
import { priceForTab } from "@/helper/itemTypes";
import { cn } from "@/lib/utils";
import type { QuoteTab, QuoteVehicle } from "@/types/quote";

type Props = {
  vehicle: QuoteVehicle;
  tab: QuoteTab;
  recommendedVariantId: string | null;
  defaultOpen?: boolean;
};

export default function VehicleQuoteCard({
  vehicle,
  tab,
  recommendedVariantId,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const rows = vehicle.variants
    .map((v) => ({ variant: v, price: priceForTab(v, tab) }))
    .filter((r): r is { variant: typeof r.variant; price: number } => r.price !== null);

  if (rows.length === 0) return null;

  const cheapest = Math.min(...rows.map((r) => r.price));
  const hasRecommended = rows.some((r) => r.variant.variantId === recommendedVariantId);

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden bg-white border rounded-2xl transition-shadow",
        hasRecommended
          ? "border-primary shadow-md shadow-primary/10 ring-1 ring-primary/25"
          : "border-gray-200 shadow-sm hover:shadow-md",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-start w-full gap-3 p-3.5 text-left cursor-pointer sm:p-4"
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-xl shrink-0 size-12 sm:size-14",
            hasRecommended ? "bg-primary/10" : "bg-gray-50",
          )}
        >
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

          {hasRecommended && (
            <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 text-[10px] font-bold text-white rounded-full bg-primary">
              <Sparkles className="size-3" /> Recommended
            </span>
          )}

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
          {rows.map(({ variant, price }) => {
            const recommended = variant.variantId === recommendedVariantId;
            return (
              <li
                key={variant.variantId}
                className={cn(
                  "flex items-center justify-between gap-2 px-3.5 py-2.5 sm:px-4 border-b border-gray-100 last:border-b-0",
                  recommended && "bg-primary/10",
                )}
              >
                <span className="flex flex-wrap items-center gap-1.5 text-xs text-gray-700">
                  <span>
                    Up to{" "}
                    <span className="font-semibold text-gray-900">
                      {variant.maxLoadKg.toLocaleString()} kg
                    </span>
                  </span>
                  {recommended && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold text-primary bg-primary/15 rounded-full">
                      Best fit
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold tabular-nums text-secondary shrink-0 sm:text-sm">
                  {formatPeso(price)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
