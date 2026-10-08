import {API_URL} from "@/helper/constant";
import type {PublicQuoteRequest, PublicQuoteResponse} from "@/types/quote";

/** Quote failure carrying a user-safe message and the HTTP status. */
export class QuoteApiError extends Error {
  status: number;
  code?: string;
  retryAfter?: number;

  constructor(
    message: string,
    status: number,
    opts?: {code?: string; retryAfter?: number},
  ) {
    super(message);
    this.name = "QuoteApiError";
    this.status = status;
    this.code = opts?.code;
    this.retryAfter = opts?.retryAfter;
  }
}

type ErrorBody = {message?: string; error?: string; code?: string};

function messageFor(status: number, body: ErrorBody): string {
  if (body.code === "PICKUP_AREA") {
    return (
      body.message ||
      "We don't service this pickup location yet. Check our list of covered cities."
    );
  }
  if (body.code === "DROPOFF_AREA") {
    return (
      body.message ||
      "This drop-off must be reachable by road (no ferry required)."
    );
  }
  if (status === 403) return "Verification failed. Please try again.";
  if (status === 429) {
    return body.message || "Too many requests. Please wait a moment and try again.";
  }
  if (status === 502 || status === 503) {
    return body.message || "We couldn't calculate your price right now. Please try again later.";
  }
  return body.message || body.error || "We couldn't get your price. Please try again.";
}

export async function fetchPublicQuote(
  body: PublicQuoteRequest,
): Promise<PublicQuoteResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/public/quote`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    });
  } catch {
    throw new QuoteApiError(
      "Network error. Please check your connection and try again.",
      0,
    );
  }

  if (!res.ok) {
    let errBody: ErrorBody = {};
    try {
      errBody = (await res.json()) as ErrorBody;
    } catch {
      /* non-JSON error body */
    }
    const raw = res.headers.get("Retry-After");
    const retryAfter = raw ? parseInt(raw, 10) : NaN;
    throw new QuoteApiError(messageFor(res.status, errBody), res.status, {
      code: errBody.code,
      retryAfter: Number.isNaN(retryAfter) ? undefined : retryAfter,
    });
  }

  return (await res.json()) as PublicQuoteResponse;
}
