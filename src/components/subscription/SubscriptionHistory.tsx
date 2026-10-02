import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {formatDay, formatManilaDate, formatPeso} from "@/helper/subscription";
import {cn} from "@/lib/utils";
import type {HistoryItem} from "@/types/subscription";

const STATUS_LABEL: Record<HistoryItem["status"], string> = {
  revoked: "Revoked",
  completed: "Paid",
  pending: "Awaiting payment",
  under_review: "Under review",
};

const STATUS_STYLE: Record<HistoryItem["status"], string> = {
  revoked: "bg-red-100 text-red-700",
  completed: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  under_review: "bg-blue-100 text-blue-700",
};

function StatusBadge({item}: {item: HistoryItem}) {
  const complimentary =
    item.source === "admin_grant" && item.status === "completed";
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full whitespace-nowrap",
        complimentary ? "bg-blue-100 text-blue-700" : STATUS_STYLE[item.status],
      )}
    >
      {complimentary ? "Complimentary" : STATUS_LABEL[item.status]}
    </span>
  );
}

function amountLabel(item: HistoryItem) {
  return item.source === "admin_grant" ? "Free" : formatPeso(item.amount);
}

function coverage(item: HistoryItem) {
  if (item.startsOn && item.endsOn) {
    return `${formatDay(item.startsOn)} â€“ ${formatDay(item.endsOn)}`;
  }
  return "â€”";
}

type Props = {
  items: HistoryItem[];
  loading: boolean;
  error: string;
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
};

export default function SubscriptionHistory({
  items,
  loading,
  error,
  hasMore,
  loadingMore,
  onLoadMore,
}: Props) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl md:text-2xl font-bold text-secondary">
        Subscription history
      </h2>

      {error && (
        <p className="p-3 text-xs md:text-sm text-red-700 bg-red-50 rounded-lg">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <p className="p-6 text-xs md:text-sm text-center text-gray-500 bg-white border border-gray-200 border-dashed rounded-2xl">
          No subscription purchases yet.
        </p>
      ) : (
        <>
          {/* Table: tablet and up */}
          <div className="hidden overflow-hidden bg-white border border-gray-200 md:block rounded-2xl">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-5 py-3 font-semibold">Plan</th>
                  <th className="px-5 py-3 font-semibold">Coverage</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100">
                    <td className="px-5 py-3 font-semibold text-secondary">
                      {item.label}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{coverage(item)}</td>
                    <td className="px-5 py-3 text-gray-900">
                      {amountLabel(item)}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge item={item} />
                    </td>
                    <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                      {formatManilaDate(item.paidAt ?? item.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards: mobile */}
          <div className="flex flex-col gap-3 md:hidden">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white border border-gray-200 rounded-xl"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-secondary">{item.label}</p>
                  <StatusBadge item={item} />
                </div>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {amountLabel(item)}
                </p>
                <p className="mt-1 text-xs text-gray-500">{coverage(item)}</p>
                <p className="text-xs text-gray-400">
                  {formatManilaDate(item.paidAt ?? item.createdAt)}
                </p>
              </div>
            ))}
          </div>

          {hasMore && (
            <Button
              type="button"
              variant="outline"
              disabled={loadingMore}
              onClick={onLoadMore}
              className="self-center cursor-pointer"
            >
              {loadingMore ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Loadingâ€¦
                </span>
              ) : (
                "Load more"
              )}
            </Button>
          )}
        </>
      )}
    </section>
  );
}
