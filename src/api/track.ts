import {API_URL} from "@/helper/constant";
import type {TrackData, TrackErrorCode} from "@/types/track";

/** Error carrying a stable code so the page can show the right screen. */
export class TrackApiError extends Error {
  code: TrackErrorCode;
  status: number;
  retryAfter?: number;

  constructor(code: TrackErrorCode, status: number, message: string, retryAfter?: number) {
    super(message);
    this.name = "TrackApiError";
    this.code = code;
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

/** A link that is gone for good: stop polling and close the socket. */
export const isTerminalTrackError = (err: unknown) =>
  err instanceof TrackApiError &&
  (err.code === "LINK_INVALID" || err.code === "TRIP_ENDED");

/**
 * `initial` is sent once per page load. It counts one Google map load on the
 * server, which answers with `map.enabled`. Status polls must not send it.
 */
export async function fetchTrack(
  token: string,
  opts: {initial?: boolean; signal?: AbortSignal} = {},
): Promise<TrackData> {
  const url = `${API_URL}/api/web/track/${encodeURIComponent(token)}${
    opts.initial ? "?initial=1" : ""
  }`;

  let res: Response;
  try {
    res = await fetch(url, {signal: opts.signal, cache: "no-store"});
  } catch (err) {
    if ((err as Error)?.name === "AbortError") throw err;
    throw new TrackApiError("NETWORK", 0, "Network error");
  }

  let body: Partial<TrackData> & {code?: string; message?: string} = {};
  try {
    body = await res.json();
  } catch {
    // Non-JSON (proxy error page): handled by status below.
  }

  if (res.ok && body.success) return body as TrackData;

  if (res.status === 404) {
    throw new TrackApiError("LINK_INVALID", 404, body.message ?? "Link not found");
  }
  if (res.status === 410) {
    throw new TrackApiError("TRIP_ENDED", 410, body.message ?? "Trip ended");
  }
  if (res.status === 429) {
    const secs = parseInt(res.headers.get("Retry-After") ?? "", 10);
    throw new TrackApiError(
      "RATE_LIMITED",
      429,
      body.message ?? "Too many requests",
      Number.isNaN(secs) ? undefined : secs,
    );
  }
  throw new TrackApiError("UNKNOWN", res.status, body.message ?? "Request failed");
}
