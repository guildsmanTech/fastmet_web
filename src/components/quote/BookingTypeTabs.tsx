import { cn } from "@/lib/utils";
import type { QuoteTab } from "@/types/quote";

const TAB_LABELS: Record<QuoteTab, string> = {
  asap: "ASAP",
  schedule: "Scheduled",
  pooling: "Pooling",
};

type Props = {
  readonly tabs: QuoteTab[];
  readonly active: QuoteTab;
  readonly onChange: (tab: QuoteTab) => void;
};

export default function BookingTypeTabs({ tabs, active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Booking type"
      className="flex w-full p-1 bg-gray-100 rounded-lg sm:inline-flex sm:w-auto"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          type="button"
          aria-selected={active === tab}
          onClick={() => onChange(tab)}
          className={cn(
            "flex-1 px-3 py-2 text-sm font-semibold whitespace-nowrap rounded-md transition cursor-pointer sm:flex-none sm:px-4",
            active === tab
              ? "bg-white text-secondary shadow-sm"
              : "text-gray-500 hover:text-gray-900",
          )}
        >
          {TAB_LABELS[tab]}
        </button>
      ))}
    </div>
  );
}
