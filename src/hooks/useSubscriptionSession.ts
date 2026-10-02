import {useCallback, useState} from "react";

const STORAGE_KEY = "fastmet.subscription.session";

export type SubscriptionSession = {
  token: string;
  firstName: string;
  expiresAt: number;
};

function readSession(): SubscriptionSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SubscriptionSession>;
    if (
      typeof parsed.token !== "string" ||
      typeof parsed.expiresAt !== "number" ||
      parsed.expiresAt <= Date.now()
    ) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return {
      token: parsed.token,
      firstName: typeof parsed.firstName === "string" ? parsed.firstName : "",
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
}

/**
 * Website session for the subscription pages. Kept in sessionStorage (tab
 * scoped, cleared when the tab closes) so the payment-result page can still
 * read it after the provider redirects back. The server re-validates the token
 * on every request; this is only a convenience cache.
 */
export function useSubscriptionSession() {
  const [session, setSession] = useState<SubscriptionSession | null>(
    readSession,
  );

  const save = useCallback(
    (token: string, expiresInSeconds: number, firstName: string) => {
      const next: SubscriptionSession = {
        token,
        firstName,
        expiresAt: Date.now() + expiresInSeconds * 1000,
      };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage unavailable: the session still works for this page view.
      }
      setSession(next);
    },
    [],
  );

  const clear = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setSession(null);
  }, []);

  return {session, save, clear};
}
