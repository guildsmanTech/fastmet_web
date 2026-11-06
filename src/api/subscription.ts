import {API_URL} from "@/helper/constant";
import type {
  CheckoutResult,
  CheckoutState,
  HistoryResponse,
  PlansResponse,
  SubscriptionPlanId,
} from "@/types/subscription";

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data: T;
  retryAfter?: number;
};

/** Error carrying the HTTP status so callers can react to 401 / 403 / 502. */
export class SubscriptionApiError extends Error {
  status: number;
  sessionExpired: boolean;

  constructor(message: string, status: number, sessionExpired = false) {
    super(message);
    this.name = "SubscriptionApiError";
    this.status = status;
    this.sessionExpired = sessionExpired;
  }
}

type ErrorBody = {message?: string; error?: string; sessionExpired?: boolean};

async function readJson<T>(res: Response): Promise<T> {
  try {
    return (await res.json()) as T;
  } catch {
    return {} as T;
  }
}

function parseRetryAfter(res: Response): number | undefined {
  const raw = res.headers.get("Retry-After");
  const secs = raw ? parseInt(raw, 10) : NaN;
  return Number.isNaN(secs) ? undefined : secs;
}

// ─── OTP login (unauthenticated) ─────────────────────────────────────────

export async function sendSubscriptionOtp(
  phoneNumber: string,
  captcha: string,
): Promise<ApiResult<ErrorBody & {code?: string}>> {
  const res = await fetch(`${API_URL}/api/auth/send-otp-driver-subscription`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({phoneNumber, captcha}),
  });
  return {
    ok: res.ok,
    status: res.status,
    data: await readJson(res),
    retryAfter: parseRetryAfter(res),
  };
}

export async function verifySubscriptionOtp(
  phoneNumber: string,
  otpCode: string,
): Promise<ApiResult<ErrorBody & {verifyToken?: string}>> {
  const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({phoneNumber, otpCode}),
  });
  return {
    ok: res.ok,
    status: res.status,
    data: await readJson(res),
    retryAfter: parseRetryAfter(res),
  };
}

export type WebSession = {
  token: string;
  expiresInSeconds: number;
  firstName: string;
};

export async function createWebSession(
  verifyToken: string,
): Promise<ApiResult<ErrorBody & Partial<WebSession>>> {
  const res = await fetch(`${API_URL}/api/web/driver/session`, {
    method: "POST",
    headers: {Authorization: `Bearer ${verifyToken}`},
  });
  return {ok: res.ok, status: res.status, data: await readJson(res)};
}

// ─── Authenticated calls ─────────────────────────────────────────────────

async function authed<T>(
  token: string,
  path: string,
  init: {method?: string; body?: unknown} = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/web/driver${path}`, {
      method: init.method ?? "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...(init.body !== undefined ? {"Content-Type": "application/json"} : {}),
      },
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    });
  } catch {
    throw new SubscriptionApiError(
      "Network error. Please check your connection and try again.",
      0,
    );
  }

  const data = await readJson<T & ErrorBody>(res);
  if (!res.ok) {
    throw new SubscriptionApiError(
      data.message || data.error || "Something went wrong. Please try again.",
      res.status,
      res.status === 401 && data.sessionExpired === true,
    );
  }
  return data;
}

export const fetchPlans = (token: string) =>
  authed<PlansResponse>(token, "/subscription/plans");

export const fetchHistory = (token: string, before?: string) => {
  const query = new URLSearchParams({limit: "10"});
  if (before) query.set("before", before);
  return authed<HistoryResponse>(token, `/subscription/history?${query}`);
};

export const startCheckout = (token: string, plan: SubscriptionPlanId) =>
  authed<{success: boolean} & CheckoutResult>(token, "/subscription/checkout", {
    method: "POST",
    body: {plan},
  });

export const fetchCheckout = async (token: string, id: string) =>
  (
    await authed<{success: boolean; checkout: CheckoutState}>(
      token,
      `/subscription/checkout/${encodeURIComponent(id)}`,
    )
  ).checkout;

export const cancelCheckout = async (token: string, id: string) =>
  (
    await authed<{success: boolean; checkout: CheckoutState}>(
      token,
      `/subscription/checkout/${encodeURIComponent(id)}/cancel`,
      {method: "POST", body: {}},
    )
  ).checkout;
