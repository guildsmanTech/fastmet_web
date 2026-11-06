import {CalendarCheck, CircleAlert} from "lucide-react";
import {formatDay} from "@/helper/subscription";
import type {PlansResponse} from "@/types/subscription";

type Props = {
  data: PlansResponse;
};

export default function ActivePlanCard({data}: Props) {
  const {currentPlan, status, minStartDate} = data;

  if (currentPlan) {
    return (
      <div className="flex flex-col gap-4 p-5 md:p-6 rounded-2xl border border-green-200 bg-green-50/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center size-11 shrink-0 rounded-xl bg-green-100 text-green-700">
            <CalendarCheck className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-green-700 uppercase">
              {currentPlan.notStarted ? "Plan starts soon" : "Active plan"}
            </p>
            <h3 className="text-lg md:text-xl font-bold text-secondary">
              {currentPlan.label}
            </h3>
            <p className="mt-1 text-xs md:text-sm text-gray-600">
              {currentPlan.notStarted
                ? `Starts ${formatDay(currentPlan.startsOn)}`
                : `Started ${formatDay(currentPlan.startsOn)}`}
            </p>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="text-xs text-gray-500">Your subscription ends on</p>
          <p className="text-base md:text-lg font-bold text-secondary">
            {formatDay(status.endsOn ?? currentPlan.endsOn)}
          </p>
          <p className="text-xs font-semibold text-green-700">
            {currentPlan.daysRemaining}{" "}
            {currentPlan.daysRemaining === 1 ? "day" : "days"}{" "}
            {currentPlan.notStarted ? "of coverage" : "remaining"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 p-5 md:p-6 rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-center justify-center size-11 shrink-0 rounded-xl bg-amber-100 text-amber-700">
        <CircleAlert className="size-5" />
      </div>
      <div>
        <h3 className="text-base md:text-lg font-bold text-secondary">
          You don&apos;t have an active plan
        </h3>
        <p className="mt-1 text-xs md:text-sm text-gray-600">
          Choose a plan below to start using FastMet as a partner-driver.
          {minStartDate &&
            ` Plans start counting on ${formatDay(minStartDate)} at the earliest, even if you subscribe earlier.`}
        </p>
      </div>
    </div>
  );
}
