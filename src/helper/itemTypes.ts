import type {
  QuoteTab,
  QuoteVariant,
  QuoteVehicle,
  RecommendedVariant,
} from "@/types/quote";

/**
 * Mirrors the mobile app's booking "What are you sending?" rules
 * (app/(root_screens)/booking/additionalInfo.tsx): each item needs a vehicle
 * of at least a given size rank. Keep in sync with the app.
 */
export const VEHICLE_SIZE_RANK: Record<string, number> = {
  motorcycle: 0,
  sedan: 1,
  mpv_suv: 2,
  light_van: 3,
  small_pickup: 4,
  l300: 5,
  closed_van: 6,
  wing_van: 7,
};

export const ITEM_OPTIONS: {label: string; value: string; minRank: number}[] = [
  {label: "Documents / Envelope", value: "Documents / Envelope", minRank: 0},
  {label: "Small Package / Bag", value: "Small Package / Bag", minRank: 0},
  {label: "Medium Box / Carton", value: "Medium Box / Carton", minRank: 1},
  {
    label: "Large Box / Furniture / Appliance",
    value: "Large Box / Furniture / Appliance",
    minRank: 2,
  },
  {label: "Other / Oversized", value: "Other / Oversized", minRank: 5},
];

/** Vehicle types the app would allow for this item. Unknown keys rank high (like the app). */
export const isVehicleCompatible = (vehicleKey: string, minRank: number) =>
  (VEHICLE_SIZE_RANK[vehicleKey] ?? 99) >= minRank;

/** Price used to rank variants. Uses ASAP so the pick stays stable across tabs. */
const rankingPrice = (v: QuoteVariant): number | null =>
  v.asapPrice ?? v.scheduledPrice ?? v.poolingPrice;

export const priceForTab = (v: QuoteVariant, tab: QuoteTab): number | null =>
  tab === "asap"
    ? v.asapPrice
    : tab === "schedule"
      ? v.scheduledPrice
      : v.poolingPrice;

/**
 * Rule-based (no AI): among variants of vehicle types that suit the item,
 * the cheapest; ties go to the smaller load. No item selected, or nothing
 * compatible, means no recommendation (never guesses a default).
 */
export function pickRecommended(
  vehicles: QuoteVehicle[],
  itemValue: string | null,
): RecommendedVariant | null {
  if (!itemValue) return null;
  const item = ITEM_OPTIONS.find((o) => o.value === itemValue);
  if (!item) return null;

  let best: {
    vehicleTypeId: string;
    variantId: string;
    price: number;
    load: number;
  } | null = null;

  for (const vehicle of vehicles) {
    if (!isVehicleCompatible(vehicle.key, item.minRank)) continue;
    for (const variant of vehicle.variants) {
      const price = rankingPrice(variant);
      if (price === null) continue;
      if (
        !best ||
        price < best.price ||
        (price === best.price && variant.maxLoadKg < best.load)
      ) {
        best = {
          vehicleTypeId: vehicle.vehicleTypeId,
          variantId: variant.variantId,
          price,
          load: variant.maxLoadKg,
        };
      }
    }
  }

  return best
    ? {vehicleTypeId: best.vehicleTypeId, variantId: best.variantId}
    : null;
}
