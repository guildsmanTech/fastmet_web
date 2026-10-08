import {useEffect, useState} from "react";
import {useInfiniteQuery, useQuery, useQueryClient} from "@tanstack/react-query";
import {Loader2, LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  cancelCheckout,
  fetchHistory,
  fetchPlans,
  startCheckout,
  SubscriptionApiError,
} from "@/api/subscription";
import {isSafeCheckoutUrl} from "@/helper/subscription";
import type {SubscriptionPlanId} from "@/types/subscription";
import ActivePlanCard from "./ActivePlanCard";
import PlanCards from "./PlanCards";
import SubscriptionHistory from "./SubscriptionHistory";

type Props = {
  token: string;
  firstName: string;
  onLogout: () => void;
  onSessionExpired: () => void;
};

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Something went wrong. Please try again.";

export default function SubscriptionDashboard({
  token,
  firstName,
  onLogout,
  onSessionExpired,
}: Props) {
  const queryClient = useQueryClient();
  const [busyPlan, setBusyPlan] = useState<SubscriptionPlanId | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionNotice, setActionNotice] = useState("");

  // The shared client defaults to staleTime: Infinity; money-related data must
  // always be re-read from the server.
  const plansQuery = useQuery({
    queryKey: ["subscription", "plans", token],
    queryFn: () => fetchPlans(token),
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const historyQuery = useInfiniteQuery({
    queryKey: ["subscription", "history", token],
    queryFn: ({pageParam}) => fetchHistory(token, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const sessionExpired = [plansQuery.error, historyQuery.error].some(
    (err) => err instanceof SubscriptionApiError && err.sessionExpired,
  );
  useEffect(() => {
    if (sessionExpired) onSessionExpired();
  }, [sessionExpired, onSessionExpired]);

  const refreshAll = () =>
    queryClient.invalidateQueries({queryKey: ["subscription"]});

  const handleSubscribe = async (plan: SubscriptionPlanId) => {
    if (busyPlan) return;
    setActionError("");
    setActionNotice("");
    setBusyPlan(plan);
    try {
      const result = await startCheckout(token, plan);
      if (!isSafeCheckoutUrl(result.checkoutUrl)) {
        throw new Error("We couldn't open the payment page. Please try again.");
      }
      // Leave the button disabled: the browser is navigating away.
      window.location.assign(result.checkoutUrl);
    } catch (err) {
      if (err instanceof SubscriptionApiError && err.sessionExpired) {
        onSessionExpired();
        return;
      }
      setActionError(errorMessage(err));
      setBusyPlan(null);
      void refreshAll();
    }
  };

  const handleCancelPending = async (id: string) => {
    setActionError("");
    setActionNotice("");
    setCancelling(true);
    try {
      const state = await cancelCheckout(token, id);
      if (state.status === "completed") {
        setActionNotice(
          "That payment was already completed, so your plan is now active.",
        );
      }
    } catch (err) {
      if (err instanceof SubscriptionApiError && err.sessionExpired) {
        onSessionExpired();
        return;
      }
      setActionError(errorMessage(err));
    } finally {
      setCancelling(false);
      void refreshAll();
    }
  };

  const plans = plansQuery.data;
  const historyItems = historyQuery.data?.pages.flatMap((p) => p.items) ?? [];

  if (plansQuery.isPending) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (plansQuery.isError || !plans) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 mx-auto text-center bg-white border border-gray-200 max-w-md rounded-2xl">
        <p className="text-sm text-red-700">{errorMessage(plansQuery.error)}</p>
        <div className="flex gap-3">
          <Button
            type="button"
            className="text-white cursor-pointer"
            onClick={() => void plansQuery.refetch()}
          >
            Try again
          </Button>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={onLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm md:text-base text-gray-700">
          Hi, <span className="font-bold text-secondary">{firstName || plans.driver.firstName || "Driver"}</span>
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={onLogout}
        >
          <LogOut className="size-4" /> Log out
        </Button>
      </div>

      {actionError && (
        <p
          role="alert"
          className="p-3 text-xs md:text-sm text-red-700 bg-red-50 rounded-lg"
        >
          {actionError}
        </p>
      )}
      {actionNotice && (
        <p className="p-3 text-xs md:text-sm text-green-800 bg-green-50 rounded-lg">
          {actionNotice}
        </p>
      )}

      <ActivePlanCard data={plans} />

      {plans.pendingCheckout && (
        <div className="flex flex-col gap-3 p-4 border border-amber-200 bg-amber-50 rounded-xl sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs md:text-sm text-amber-900">
            You have an unfinished payment. If you already paid, please wait a
            few minutes and refresh this page — don&apos;t pay again.
          </p>
          <div className="flex gap-2 shrink-0">
            <Button
              type="button"
              size="sm"
              className="text-white cursor-pointer"
              disabled={
                cancelling ||
                busyPlan !== null ||
                !isSafeCheckoutUrl(plans.pendingCheckout.checkoutUrl)
              }
              onClick={() =>
                window.location.assign(plans.pendingCheckout!.checkoutUrl)
              }
            >
              Continue payment
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="cursor-pointer"
              disabled={cancelling || busyPlan !== null}
              onClick={() => void handleCancelPending(plans.pendingCheckout!.id)}
            >
              {cancelling ? "Cancelling…" : "Cancel payment"}
            </Button>
          </div>
        </div>
      )}

      <PlanCards
        data={plans}
        busyPlan={busyPlan}
        disabled={cancelling}
        onSubscribe={(plan) => void handleSubscribe(plan)}
      />

      <SubscriptionHistory
        items={historyItems}
        loading={historyQuery.isPending}
        error={historyQuery.isError ? errorMessage(historyQuery.error) : ""}
        hasMore={Boolean(historyQuery.hasNextPage)}
        loadingMore={historyQuery.isFetchingNextPage}
        onLoadMore={() => void historyQuery.fetchNextPage()}
      />
    </div>
  );
}
