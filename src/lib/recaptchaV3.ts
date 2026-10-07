/**
 * Invisible reCAPTCHA v3 for the "Get a Quote" page only. Separate from the v2
 * checkbox used on form submits (different site key + secret).
 * A token is single-use and short-lived, so call getRecaptchaV3Token() on every
 * "Get price" click rather than once on page load.
 */

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: {action: string}) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY as string | undefined;
const TOKEN_TIMEOUT_MS = 10_000;

let loadPromise: Promise<Grecaptcha> | null = null;

function loadScript(): Promise<Grecaptcha> {
  if (!SITE_KEY) {
    return Promise.reject(new Error("reCAPTCHA v3 site key is not configured"));
  }
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<Grecaptcha>((resolve, reject) => {
    const done = () => {
      const g = window.grecaptcha;
      if (!g) {
        reject(new Error("reCAPTCHA failed to initialise"));
        return;
      }
      g.ready(() => resolve(g));
    };

    if (window.grecaptcha) {
      done();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
    script.async = true;
    script.defer = true;
    script.onload = done;
    script.onerror = () => {
      loadPromise = null; // allow a retry on the next click
      reject(new Error("reCAPTCHA failed to load"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

/** Preload so the first click does not wait on the script. */
export function preloadRecaptchaV3(): void {
  void loadScript().catch(() => undefined);
}

/** Fresh single-use token for the given action. Throws on failure/timeout. */
export async function getRecaptchaV3Token(action: string): Promise<string> {
  const grecaptcha = await loadScript();
  const token = await Promise.race([
    grecaptcha.execute(SITE_KEY as string, {action}),
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error("reCAPTCHA timed out")),
        TOKEN_TIMEOUT_MS,
      ),
    ),
  ]);
  if (!token) throw new Error("reCAPTCHA returned no token");
  return token;
}
