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
        "bg-white border rounded-2xl shadow-sm",
        hasRecommended ? "border-primary ring-1 ring-primary/30" : "border-gray-200",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center w-full gap-3 p-4 text-left cursor-pointer md:p-5"
      >
        {vehicle.imageUrl && (
          <img
            src={vehicle.imageUrl}
            alt=""
            loading="lazy"
            className="object-contain size-14 md:size-16 shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold md:text-lg text-secondary">
              {vehicle.name}
            </h3>
            {hasRecommended && (
              <span className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-white rounded-full bg-primary">
                <Sparkles className="size-3" /> Recommended
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {rows.length > 1 ? "from " : ""}
            <span className="font-semibold text-gray-900">
              {formatPeso(cheapest)}
            </span>
          </p>
        </div>
        <ChevronDown
          className={cn("size-5 text-gray-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul className="border-t border-gray-100 divide-y divide-gray-100">
          {rows.map(({ variant, price }) => {
            const recommended = variant.variantId === recommendedVariantId;
            return (
              <li
                key={variant.variantId}
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-3 md:px-5",
                  recommended && "bg-primary/5",
                )}
              >
                <span className="flex items-center gap-2 text-sm text-gray-700">
                  Up to {variant.maxLoadKg.toLocaleString()} kg
                  {recommended && (
                    <span className="px-2 py-0.5 text-[10px] font-bold text-primary bg-primary/10 rounded-full">
                      Recommended
                    </span>
                  )}
                </span>
                <span className="text-sm font-bold text-gray-900">
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
