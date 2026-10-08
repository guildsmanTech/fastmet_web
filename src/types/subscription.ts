export type SubscriptionPlanId = "days_15" | "month_1" | "year_1";

export type SubscriptionStatus = {
  enforced: boolean;
  launched: boolean;
  launchAt: string | null;
  today: string;
  active: boolean;
  endsOn: string | null;
};

export type PlanCard = {
  plan: SubscriptionPlanId;
  label: string;
  durationDays: number;
  originalPrice: number;
  finalPrice: number;
  discountPercent: number;
  perDayPrice: number;
  bestValue: boolean;
  available: boolean;
};

export type CurrentPlan = {
  plan: SubscriptionPlanId;
  label: string;
  startsOn: string;
  endsOn: string;
  notStarted: boolean;
  daysRemaining: number;
};

export type PendingCheckout = {
  id: string;
  plan: SubscriptionPlanId;
  checkoutUrl: string;
  createdAt: string;
};

export type PlansResponse = {
  status: SubscriptionStatus;
  driver: {firstName: string};
  currentPlan: CurrentPlan | null;
  minStartDate: string | null;
  discount: {percent: number; expiresAt: string} | null;
  plans: PlanCard[];
  pendingCheckout: PendingCheckout | null;
};

export type HistoryItem = {
  id: string;
  plan: SubscriptionPlanId;
  label: string;
  status: "completed" | "pending" | "under_review" | "revoked";
  /** "admin_grant" = complimentary plan, nothing was paid. */
  source: "checkout" | "admin_grant";
  amount: number;
  originalAmount: number;
  discountPercent: number;
  startsOn: string | null;
  endsOn: string | null;
  paidAt: string | null;
  createdAt: string;
};

export type HistoryResponse = {
  items: HistoryItem[];
  nextCursor: string | null;
};

export type CheckoutResult = {
  id: string;
  plan: SubscriptionPlanId;
  checkoutUrl: string;
  reused: boolean;
};

export type CheckoutState = {
  id: string;
  plan: SubscriptionPlanId;
  label: string;
  status: "completed" | "pending" | "closed" | "under_review";
  startsOn: string | null;
  endsOn: string | null;
};
