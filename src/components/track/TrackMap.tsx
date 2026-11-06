/// <reference types="google.maps" />
import {useEffect, useRef} from "react";
import {
  loadTrackMaps,
  onGoogleMapsAuthFailure,
  type TrackMapsLibs,
} from "@/lib/googleMapsTrack";
import type {DriverPosition, TrackCoords, TrackStatus} from "@/types/track";
import {bearingDeg, distanceM} from "@/utils/geo";

export type MapFailure = "load" | "auth" | "timeout";

type Props = {
  pickup: TrackCoords;
  dropoff: TrackCoords;
  status: TrackStatus;
  driver: DriverPosition | null;
  onMapFailed: (reason: MapFailure) => void;
  /** Route request failed (quota, denied, no route). Markers still work. */
  onRouteUnavailable: (status: string) => void;
};

/** No tiles within this long after creating the map = treat the map as broken. */
const TILES_TIMEOUT_MS = 20_000;
const DRIVER_ANIMATION_MS = 1_000;
/** Bigger jumps (e.g. reconnect after a long gap) are not animated. */
const TELEPORT_M = 2_000;
/** Ignore heading changes from GPS jitter. */
const MIN_HEADING_MOVE_M = 3;

const ROUTE_COLOR = "#2563EB";

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  {featureType: "poi.business", stylers: [{visibility: "off"}]},
  {featureType: "transit", stylers: [{visibility: "off"}]},
];

const PIN_SVG = (color: string, label: string) => `
<svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M18 45c0 0 16-15.2 16-27A16 16 0 1 0 2 18c0 11.8 16 27 16 27z" fill="${color}" stroke="#fff" stroke-width="2.5"/>
  <text x="18" y="23" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="13" font-weight="700" fill="#fff">${label}</text>
</svg>`;

const DRIVER_SVG = `
<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:block;transition:transform .4s ease-out">
  <circle cx="20" cy="20" r="17" fill="#ED8718" stroke="#fff" stroke-width="3"/>
  <path d="M20 9l7 18-7-4-7 4z" fill="#fff"/>
</svg>`;

type HtmlMarker = google.maps.OverlayView & {
  element: HTMLDivElement;
  setPosition: (p: google.maps.LatLngLiteral) => void;
};

/** OverlayView-based marker: plain HTML, no Map ID needed, cheap to move. */
function createHtmlMarker(
  libs: TrackMapsLibs,
  map: google.maps.Map,
  html: string,
  initialPosition: google.maps.LatLngLiteral,
  anchor: "bottom" | "center",
  zIndex: number,
): HtmlMarker {
  class Marker extends libs.maps.OverlayView {
    element = document.createElement("div");
    position = initialPosition;

    constructor() {
      super();
      this.element.innerHTML = html;
      this.element.style.position = "absolute";
      this.element.style.zIndex = String(zIndex);
      this.element.style.pointerEvents = "none";
      this.element.style.willChange = "transform";
    }

    onAdd() {
      this.getPanes()?.overlayMouseTarget.appendChild(this.element);
    }

    draw() {
      const point = this.getProjection()?.fromLatLngToDivPixel(
        new libs.core.LatLng(this.position),
      );
      if (!point) return;
      const shift = anchor === "bottom" ? "-50%, -100%" : "-50%, -50%";
      this.element.style.transform = `translate(${point.x}px, ${point.y}px) translate(${shift})`;
    }

    onRemove() {
      this.element.remove();
    }

    setPosition(p: google.maps.LatLngLiteral) {
      this.position = p;
      this.draw();
    }
  }

  const marker = new Marker();
  marker.setMap(map);
  return marker;
}

/** Pin with an optional pulsing ring (the current destination). */
function pinHtml(color: string, label: string) {
  return `
<div style="position:relative;width:36px;height:46px">
  <span data-pulse style="display:none;position:absolute;left:3px;bottom:-12px;width:30px;height:30px;border-radius:9999px;background:${color};opacity:.35" class="animate-ping"></span>
  ${PIN_SVG(color, label)}
</div>`;
}

export default function TrackMap({
  pickup,
  dropoff,
  status,
  driver,
  onMapFailed,
  onRouteUnavailable,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const libsRef = useRef<TrackMapsLibs | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const pickupMarkerRef = useRef<HtmlMarker | null>(null);
  const dropoffMarkerRef = useRef<HtmlMarker | null>(null);
  const driverMarkerRef = useRef<HtmlMarker | null>(null);
  const driverShownRef = useRef<google.maps.LatLngLiteral | null>(null);
  const headingRef = useRef(0);
  const fittedWithDriverRef = useRef(false);
  const animationRef = useRef(0);

  // Latest props for async callbacks, without re-running the map effect.
  const latest = useRef({pickup, dropoff, driver, status, onMapFailed, onRouteUnavailable});
  latest.current = {pickup, dropoff, driver, status, onMapFailed, onRouteUnavailable};

  // Create the map once per page view (one billed map load + one route).
  useEffect(() => {
    let cancelled = false;
    let failed = false;
    let tilesTimer = 0;
    const listeners: google.maps.MapsEventListener[] = [];

    const fail = (reason: MapFailure) => {
      if (cancelled || failed) return;
      failed = true;
      latest.current.onMapFailed(reason);
    };

    const offAuth = onGoogleMapsAuthFailure(() => fail("auth"));

    loadTrackMaps()
      .then((libs) => {
        if (cancelled || !containerRef.current) return;
        libsRef.current = libs;
        const {pickup: p, dropoff: d} = latest.current;

        const map = new libs.maps.Map(containerRef.current, {
          center: p,
          zoom: 13,
          styles: MAP_STYLES,
          disableDefaultUI: true,
          zoomControl: true,
          clickableIcons: false,
          gestureHandling: "greedy",
        });
        mapRef.current = map;

        tilesTimer = window.setTimeout(() => fail("timeout"), TILES_TIMEOUT_MS);
        listeners.push(
          map.addListener("tilesloaded", () => window.clearTimeout(tilesTimer)),
        );

        pickupMarkerRef.current = createHtmlMarker(
          libs, map, pinHtml("#16A34A", "P"), p, "bottom", 2,
        );
        dropoffMarkerRef.current = createHtmlMarker(
          libs, map, pinHtml("#DC2626", "D"), d, "bottom", 2,
        );

        fitAll();
        syncHighlight();
        syncDriver();

        // One Routes API request per page load (pickup -> drop-off). Kept in
        // memory only; never stored.
        libs.routes.Route.computeRoutes({
          origin: p,
          destination: d,
          travelMode: "DRIVING",
          routingPreference: "TRAFFIC_UNAWARE",
          fields: ["path"],
        }).then(
          ({routes}) => {
            if (cancelled) return;
            const path = routes?.[0]?.path;
            if (!path?.length) {
              latest.current.onRouteUnavailable("ZERO_RESULTS");
              return;
            }
            new libs.maps.Polyline({
              map,
              path: path.map((pt) => ({lat: pt.lat, lng: pt.lng})),
              strokeColor: ROUTE_COLOR,
              strokeOpacity: 0.85,
              strokeWeight: 5,
              clickable: false,
              zIndex: 1,
            });
          },
          (err: unknown) => {
            if (cancelled) return;
            const code = (err as {code?: unknown} | null)?.code;
            latest.current.onRouteUnavailable(String(code ?? "ERROR"));
          },
        );
      })
      .catch((err) => {
        console.error("[TrackMap] Google Maps failed:", err);
        fail("load");
      });

    return () => {
      cancelled = true;
      offAuth();
      window.clearTimeout(tilesTimer);
      window.cancelAnimationFrame(animationRef.current);
      listeners.forEach((l) => l.remove());
      pickupMarkerRef.current?.setMap(null);
      dropoffMarkerRef.current?.setMap(null);
      driverMarkerRef.current?.setMap(null);
      pickupMarkerRef.current = dropoffMarkerRef.current = driverMarkerRef.current = null;
      driverShownRef.current = null;
      mapRef.current = null;
      libsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fitAll() {
    const libs = libsRef.current;
    const map = mapRef.current;
    if (!libs || !map) return;
    const {pickup: p, dropoff: d, driver: drv} = latest.current;
    const bounds = new libs.core.LatLngBounds();
    bounds.extend(p);
    bounds.extend(d);
    if (drv) {
      bounds.extend(drv);
      fittedWithDriverRef.current = true;
    }
    map.fitBounds(bounds, {top: 120, right: 48, bottom: 200, left: 48});
  }

  function syncHighlight() {
    const {status: s} = latest.current;
    const setPulse = (m: HtmlMarker | null, on: boolean) => {
      const ring = m?.element.querySelector<HTMLElement>("[data-pulse]");
      if (ring) ring.style.display = on ? "block" : "none";
    };
    setPulse(pickupMarkerRef.current, s === "active");
    setPulse(dropoffMarkerRef.current, s === "picked_up");
  }

  function syncDriver() {
    const libs = libsRef.current;
    const map = mapRef.current;
    const drv = latest.current.driver;
    if (!libs || !map || !drv) return;

    const to = {lat: drv.lat, lng: drv.lng};
    let marker = driverMarkerRef.current;
    if (!marker) {
      marker = createHtmlMarker(libs, map, DRIVER_SVG, to, "center", 3);
      driverMarkerRef.current = marker;
      driverShownRef.current = to;
      if (!fittedWithDriverRef.current) fitAll();
      return;
    }

    const from = driverShownRef.current ?? to;
    const moved = distanceM(from, to);
    if (moved >= MIN_HEADING_MOVE_M) {
      headingRef.current = bearingDeg(from, to);
      const arrow = marker.element.querySelector<SVGElement>("svg");
      if (arrow) arrow.style.transform = `rotate(${headingRef.current}deg)`;
    }

    window.cancelAnimationFrame(animationRef.current);
    if (moved > TELEPORT_M) {
      driverShownRef.current = to;
      marker.setPosition(to);
      return;
    }

    const start = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / DRIVER_ANIMATION_MS);
      const pos = {
        lat: from.lat + (to.lat - from.lat) * k,
        lng: from.lng + (to.lng - from.lng) * k,
      };
      driverShownRef.current = pos;
      marker!.setPosition(pos);
      if (k < 1) animationRef.current = window.requestAnimationFrame(step);
    };
    animationRef.current = window.requestAnimationFrame(step);
  }

  useEffect(() => {
    syncDriver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driver?.lat, driver?.lng]);

  useEffect(() => {
    syncHighlight();
  }, [status]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
