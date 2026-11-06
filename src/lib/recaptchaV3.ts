/**
 * Invisible reCAPTCHA v3 for the "Get a Quote" page. Separate site key from the
 * v2 checkbox on forms. Tokens are single-use — call getRecaptchaV3Token() on
 * every "Get price" click.
 *
 * Important: other pages load v2 (`react-google-recaptcha`), which sets
 * `window.grecaptcha` without `?render=<v3_key>`. We must still inject the v3
 * script or execute() fails / the badge never appears after SPA navigation.
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
const SCRIPT_ATTR = "data-fastmet-recaptcha-v3";

let loadPromise: Promise<Grecaptcha> | null = null;

function waitUntilReady(g: Grecaptcha): Promise<Grecaptcha> {
  return new Promise((resolve) => {
    g.ready(() => resolve(g));
  });
}

function v3ScriptPresent(): boolean {
  return Boolean(document.querySelector(`script[${SCRIPT_ATTR}]`));
}

function loadScript(): Promise<Grecaptcha> {
  if (!SITE_KEY) {
    return Promise.reject(new Error("reCAPTCHA v3 site key is not configured"));
  }
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<Grecaptcha>((resolve, reject) => {
    const finish = () => {
      const g = window.grecaptcha;
      if (!g) {
        reject(new Error("reCAPTCHA failed to initialise"));
        return;
      }
      void waitUntilReady(g).then(resolve, reject);
    };

    // Our v3 script already in the DOM (prior visit to Get Quote this session).
    if (v3ScriptPresent() && window.grecaptcha) {
      finish();
      return;
    }

    // Always load with render=<v3_key>, even if v2 already defined grecaptcha.
    const script = document.createElement("script");
    script.setAttribute(SCRIPT_ATTR, "1");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
    script.async = true;
    script.defer = true;
    script.onload = finish;
    script.onerror = () => {
      loadPromise = null;
      script.remove();
      reject(new Error("reCAPTCHA failed to load"));
    };
    document.head.appendChild(script);
  }).catch((err) => {
    loadPromise = null;
    throw err;
  });

  return loadPromise;
}

/** Preload so SPA navigation / first click does not wait on the script. */
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
