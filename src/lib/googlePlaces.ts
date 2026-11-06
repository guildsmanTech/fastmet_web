/**
 * Google Places (New) autocomplete for the browser.
 * Uses a SEPARATE browser key (VITE_GOOGLE_PLACES_BROWSER_KEY) restricted by
 * HTTP referrer. The server GOOGLE_MAPS_API_KEY must never be used here.
 *
 * Cost control: session tokens (one session = typing + one selection), a 3
 * character minimum, and `fetchFields(["location"])` only (coords, nothing else).
 */

export type PlaceSuggestion = {
  id: string;
  mainText: string;
  secondaryText: string;
  fullText: string;
  /** Opaque prediction handle used by resolve(). */
  prediction: unknown;
};

export type PlaceCoords = {lat: number; lng: number};

// Minimal structural types so we do not need @types/google.maps.
type LatLngLike = {lat: () => number; lng: () => number};
type PlaceLike = {
  fetchFields: (req: {fields: string[]}) => Promise<unknown>;
  location?: LatLngLike | null;
};
type PlacePredictionLike = {
  placeId: string;
  text: {text: string};
  mainText?: {text: string} | null;
  secondaryText?: {text: string} | null;
  toPlace: () => PlaceLike;
};
type PlacesLibrary = {
  AutocompleteSessionToken: new () => unknown;
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions: (req: Record<string, unknown>) => Promise<{
      suggestions: {placePrediction?: PlacePredictionLike | null}[];
    }>;
  };
};

type GoogleMapsGlobal = {
  maps: {importLibrary: (name: string) => Promise<unknown>};
};

const BROWSER_KEY = import.meta.env.VITE_GOOGLE_PLACES_BROWSER_KEY as
  | string
  | undefined;

export const MIN_QUERY_LENGTH = 3;

// Metro Manila centre; soft bias only (the backend enforces the service area).
const BIAS_CENTER = {lat: 14.5995, lng: 120.9842};
const BIAS_RADIUS_M = 50_000;

let libraryPromise: Promise<PlacesLibrary> | null = null;

const MAPS_INIT_TIMEOUT_MS = 10_000;
const MAPS_INIT_POLL_MS = 50;

function getImportLibrary():
  | GoogleMapsGlobal["maps"]["importLibrary"]
  | undefined {
  const g = (window as unknown as {google?: GoogleMapsGlobal}).google;
  return g?.maps?.importLibrary;
}

/** With `loading=async`, script `onload` can fire before `importLibrary` exists. */
function waitForImportLibrary(
  timeoutMs = MAPS_INIT_TIMEOUT_MS,
): Promise<GoogleMapsGlobal["maps"]["importLibrary"]> {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const poll = () => {
      const importLibrary = getImportLibrary();
      if (importLibrary) {
        resolve(importLibrary);
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        reject(new Error("Google Maps failed to initialise"));
        return;
      }
      setTimeout(poll, MAPS_INIT_POLL_MS);
    };
    poll();
  });
}

function importPlacesLibrary(): Promise<PlacesLibrary> {
  return waitForImportLibrary().then((importLibrary) =>
    importLibrary("places").then((lib) => lib as PlacesLibrary),
  );
}

function loadPlaces(): Promise<PlacesLibrary> {
  if (!BROWSER_KEY) {
    return Promise.reject(new Error("Google Places browser key is not configured"));
  }
  if (libraryPromise) return libraryPromise;

  libraryPromise = (() => {
    if (getImportLibrary()) {
      return importPlacesLibrary();
    }

    return new Promise<PlacesLibrary>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        BROWSER_KEY,
      )}&loading=async&v=weekly`;
      script.async = true;
      script.onload = () => {
        importPlacesLibrary().then(resolve, reject);
      };
      script.onerror = () => {
        libraryPromise = null; // allow retry
        reject(new Error("Google Maps failed to load"));
      };
      document.head.appendChild(script);
    });
  })().catch((err) => {
    libraryPromise = null;
    throw err;
  });

  return libraryPromise;
}

/**
 * One autocomplete "session": the token is reused across keystrokes and
 * renewed after a selection, which is what Google bills as a single session.
 */
export function createPlacesSession() {
  let token: unknown = null;

  const ensureToken = (lib: PlacesLibrary) => {
    if (!token) token = new lib.AutocompleteSessionToken();
    return token;
  };

  return {
    async search(input: string): Promise<PlaceSuggestion[]> {
      const query = input.trim();
      if (query.length < MIN_QUERY_LENGTH) return [];
      const lib = await loadPlaces();
      const {suggestions} =
        await lib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: query,
          sessionToken: ensureToken(lib),
          includedRegionCodes: ["ph"],
          locationBias: {center: BIAS_CENTER, radius: BIAS_RADIUS_M},
        });

      return suggestions
        .map((s) => s.placePrediction)
        .filter((p): p is PlacePredictionLike => Boolean(p))
        .map((p) => ({
          id: p.placeId,
          mainText: p.mainText?.text ?? p.text.text,
          secondaryText: p.secondaryText?.text ?? "",
          fullText: p.text.text,
          prediction: p,
        }));
    },

    /** Place Details with the cheapest field set that returns coords. */
    async resolve(suggestion: PlaceSuggestion): Promise<PlaceCoords> {
      const place = (suggestion.prediction as PlacePredictionLike).toPlace();
      await place.fetchFields({fields: ["location"]});
      // The session ends with the details request; start a fresh one next time.
      token = null;
      const loc = place.location;
      if (!loc) throw new Error("Place has no location");
      return {lat: loc.lat(), lng: loc.lng()};
    },
  };
}
