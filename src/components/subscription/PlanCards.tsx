import {Check, Loader2, Sparkles, Tag} from "lucide-react";
import {Button} from "@/components/ui/button";
import {formatManilaDateTime, formatPeso} from "@/helper/subscription";
import {cn} from "@/lib/utils";
import type {PlanCard, PlansResponse, SubscriptionPlanId} from "@/types/subscription";

const PLAN_NOTES: Record<SubscriptionPlanId, string> = {
  days_15: "Good for trying it out",
  month_1: "30 days of coverage",
  year_1: "365 days of coverage",
};

type Props = {
  data: PlansResponse;
  /** Plan currently being sent to checkout (disables every button). */
  busyPlan: SubscriptionPlanId | null;
  disabled?: boolean;
  onSubscribe: (plan: SubscriptionPlanId) => void;
};

function PlanCardView({
  card,
  busyPlan,
  disabled,
  onSubscribe,
  hasCurrentPlan,
}: {
  card: PlanCard;
  busyPlan: SubscriptionPlanId | null;
  disabled?: boolean;
  onSubscribe: (plan: SubscriptionPlanId) => void;
  hasCurrentPlan: boolean;
}) {
  const busy = busyPlan === card.plan;
  const hasDiscount = card.discountPercent > 0 && card.originalPrice > card.finalPrice;

  return (
    <div
      className={cn(
        "relative flex flex-col p-5 md:p-6 bg-white rounded-2xl border transition",
        card.bestValue
          ? "border-primary shadow-lg ring-1 ring-primary/30"
          : "border-gray-200 shadow-sm",
      )}
    >
      {card.bestValue && (
        <span className="absolute -top-3 left-1/2 flex items-center gap-1 px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase -translate-x-1/2 rounded-full bg-primary whitespace-nowrap">
          <Sparkles className="size-3" /> Best choice
        </span>
      )}

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base md:text-lg font-bold text-secondary">
            {card.label}
          </h3>
          <p className="text-xs text-gray-500">{PLAN_NOTES[card.plan]}</p>
        </div>
        {hasDiscount && (
          <span className="px-2 py-1 text-[11px] font-bold text-green-700 bg-green-100 rounded-full whitespace-nowrap">
            {card.discountPercent}% OFF
          </span>
        )}
      </div>

      <div className="mt-5">
        {hasDiscount && (
          <p className="text-sm text-gray-400 line-through">
            {formatPeso(card.originalPrice)}
          </p>
        )}
        <p className="text-3xl md:text-4xl font-extrabold text-secondary">
          {card.available ? formatPeso(card.finalPrice) : "—"}
        </p>
        {card.available && (
          <p className="mt-1 text-xs text-gray-500">
            about {formatPeso(Math.round(card.perDayPrice * 100) / 100)} per day
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-2 my-5 text-xs md:text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <Check className="size-4 text-primary shrink-0" />
          Full access to the FastMet driver app
        </li>
        <li className="flex items-center gap-2">
          <Check className="size-4 text-primary shrink-0" />
          {card.durationDays} days of coverage
        </li>
        {hasCurrentPlan && (
          <li className="flex items-center gap-2">
            <Check className="size-4 text-primary shrink-0" />
            Added after your current plan ends
          </li>
        )}
      </ul>

      <Button
        type="button"
        disabled={disabled || !card.available || busyPlan !== null}
        onClick={() => onSubscribe(card.plan)}
        className="mt-auto w-full py-5 text-white cursor-pointer"
      >
        {busy ? (
          <span className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Preparing payment…
          </span>
        ) : card.available ? (
          hasCurrentPlan ? "Renew with this plan" : "Subscribe"
        ) : (
          "Unavailable"
        )}
      </Button>
    </div>
  );
}

export default function PlanCards({data, busyPlan, disabled, onSubscribe}: Props) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-bold text-secondary">
          Choose your plan
        </h2>
        <p className="text-xs md:text-sm text-gray-500">
          The price shown is the exact amount you will pay. Payment is secure
          through Xendit.
        </p>
      </div>

      {data.discount && (
        <div className="flex items-start gap-3 p-4 text-xs md:text-sm text-green-800 bg-green-50 border border-green-200 rounded-xl">
          <Tag className="mt-0.5 size-4 shrink-0" />
          <p>
            <span className="font-bold">{data.discount.percent}% off</span> on
            all plans until{" "}
            <span className="font-semibold">
              {formatManilaDateTime(data.discount.expiresAt)}
            </span>{" "}
            (Philippine time).
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 pt-3 md:grid-cols-3">
        {data.plans.map((card) => (
          <PlanCardView
            key={card.plan}
            card={card}
            busyPlan={busyPlan}
            disabled={disabled}
            onSubscribe={onSubscribe}
            hasCurrentPlan={data.currentPlan !== null}
          />
        ))}
      </div>
    </section>
  );
}
