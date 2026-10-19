/// <reference types="google.maps" />

/**
 * Google Maps JS loader for the public tracking page.
 *
 * Billing: one map load per page view, plus one Directions request (see
 * TrackMap). The server decides beforehand whether this page load may use the
 * map at all (per-link and daily caps), so this file is only reached when the
 * budget allows it.
 *
 * Failure handling: every way the API can fail ends in a rejected promise or
 * an `onAuthFailure` callback, so the page can fall back to its status-only
 * view instead of showing Google's grey "can't load Google Maps" box.
 * - Script blocked / offline          -> script.onerror
 * - Never initialises                 -> timeout
 * - Bad key, referrer, billing, quota -> window.gm_authFailure (when Google calls it)
 */

const MAPS_KEY = (import.meta.env.VITE_GOOGLE_MAPS_BROWSER_KEY ??
  import.meta.env.VITE_GOOGLE_PLACES_BROWSER_KEY) as string | undefined;

const LOAD_TIMEOUT_MS = 12_000;
const POLL_MS = 50;

export type TrackMapsLibs = {
  maps: google.maps.MapsLibrary;
  routes: google.maps.RoutesLibrary;
  core: google.maps.CoreLibrary;
};

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

const authFailureListeners = new Set<() => void>();
let authFailed = false;
let hookInstalled = false;

function installAuthFailureHook() {
  if (hookInstalled) return;
  hookInstalled = true;
  const previous = window.gm_authFailure;
  window.gm_authFailure = () => {
    authFailed = true;
    authFailureListeners.forEach((fn) => fn());
    previous?.();
  };
}

/** Called if Google rejects the key (invalid, wrong referrer, billing, quota). */
export function onGoogleMapsAuthFailure(fn: () => void): () => void {
  installAuthFailureHook();
  authFailureListeners.add(fn);
  if (authFailed) fn();
  return () => authFailureListeners.delete(fn);
}

export const hasGoogleMapsKey = () => !!MAPS_KEY;

type ImportLibrary = typeof google.maps.importLibrary;

function currentImportLibrary(): ImportLibrary | undefined {
  const g = (window as unknown as {google?: {maps?: {importLibrary?: ImportLibrary}}})
    .google;
  return g?.maps?.importLibrary;
}

function waitForImportLibrary(deadline: number): Promise<ImportLibrary> {
  return new Promise((resolve, reject) => {
    const poll = () => {
      const fn = currentImportLibrary();
      if (fn) return resolve(fn);
      if (Date.now() >= deadline) {
        return reject(new Error("Google Maps did not initialise"));
      }
      setTimeout(poll, POLL_MS);
    };
    poll();
  });
}

function withTimeout<T>(promise: Promise<T>, deadline: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Google Maps timed out")),
      Math.max(0, deadline - Date.now()),
    );
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

let libsPromise: Promise<TrackMapsLibs> | null = null;

export function loadTrackMaps(): Promise<TrackMapsLibs> {
  if (!MAPS_KEY) return Promise.reject(new Error("Google Maps key is not configured"));
  if (authFailed) return Promise.reject(new Error("Google Maps authentication failed"));
  if (libsPromise) return libsPromise;

  installAuthFailureHook();
  const deadline = Date.now() + LOAD_TIMEOUT_MS;

  const scriptReady: Promise<void> = currentImportLibrary()
    ? Promise.resolve()
    : new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
          MAPS_KEY,
        )}&loading=async&v=weekly`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Google Maps failed to load"));
        document.head.appendChild(script);
      });

  libsPromise = withTimeout(
    scriptReady
      .then(() => waitForImportLibrary(deadline))
      .then(async (importLibrary) => {
        const [maps, routes, core] = await Promise.all([
          importLibrary("maps") as Promise<google.maps.MapsLibrary>,
          importLibrary("routes") as Promise<google.maps.RoutesLibrary>,
          importLibrary("core") as Promise<google.maps.CoreLibrary>,
        ]);
        return {maps, routes, core};
      }),
    deadline,
  ).catch((err) => {
    libsPromise = null;
    throw err;
  });

  return libsPromise;
}
