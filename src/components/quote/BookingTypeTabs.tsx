import { cn } from "@/lib/utils";
import type { QuoteTab } from "@/types/quote";

const TAB_LABELS: Record<QuoteTab, string> = {
  asap: "ASAP",
  schedule: "Scheduled",
  pooling: "Pooling",
};

type Props = {
  tabs: QuoteTab[];
  active: QuoteTab;
  onChange: (tab: QuoteTab) => void;
};

export default function BookingTypeTabs({ tabs, active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Booking type"
      className="inline-flex p-1 bg-gray-100 rounded-lg"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          type="button"
          aria-selected={active === tab}
          onClick={() => onChange(tab)}
          className={cn(
            "px-4 py-2 text-sm font-semibold rounded-md transition cursor-pointer",
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
