import type { QuoteTab, QuoteVariant } from "@/types/quote";

export const priceForTab = (v: QuoteVariant, tab: QuoteTab): number | null => {
  const prices: Record<QuoteTab, number | null> = {
    asap: v.asapPrice,
    schedule: v.scheduledPrice,
    pooling: v.poolingPrice,
  };

  return prices[tab];
};
