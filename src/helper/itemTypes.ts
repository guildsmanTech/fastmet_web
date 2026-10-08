import type { QuoteTab, QuoteVariant } from "@/types/quote";

export const priceForTab = (v: QuoteVariant, tab: QuoteTab): number | null =>
  tab === "asap"
    ? v.asapPrice
    : tab === "schedule"
      ? v.scheduledPrice
      : v.poolingPrice;
