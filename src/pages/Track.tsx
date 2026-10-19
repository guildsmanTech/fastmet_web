import {useCallback, useEffect, useMemo, useState, type ReactNode} from "react";
import {Helmet} from "react-helmet-async";
import {useParams} from "react-router-dom";
import {Clock, Loader2, MapPinOff, RefreshCw, Route, Truck} from "lucide-react";
import {logo} from "@/constants/images";
import {Button} from "@/components/ui/button";
import TrackMap, {type MapFailure} from "@/components/track/TrackMap";
import {isTerminalTrackError, TrackApiError} from "@/api/track";
import {useTrackInitial, useTrackStatus} from "@/hooks/useTrackQueries";
import {useTrackSocket} from "@/hooks/useTrackSocket";
import {hasGoogleMapsKey} from "@/lib/googleMapsTrack";
import type {DriverPosition, TrackData, TrackStatus} from "@/types/track";
import {distanceM} from "@/utils/geo";

/** Show "last updated" once the driver has been silent this long. */
const STALE_AFTER_MS = 60_000;

const HEADLINES: Record<TrackStatus, string> = {
  active: "Driver is on the way to pickup",
  picked_up: "Package picked up, heading to drop-off",
  need_continuance: "Finding a replacement driver",
};

function formatAgo(ts: number, now: number) {
  const mins = Math.floor((now - ts) / 60_000);
  if (mins <= 0) return "just now";
  if (mins === 1) return "1 min ago";
  if (mins < 60) return `${mins} mins ago`;
  return "over an hour ago";
}

function formatKm(m: number) {
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
}

export default function TrackPage() {
  const {token = ""} = useParams();

  const initial = useTrackInitial(token);
  const seed = useMemo(
    () => (initial.data ? {data: initial.data, updatedAt: initial.dataUpdatedAt} : null),
    [initial.data, initial.dataUpdatedAt],
  );
  const status = useTrackStatus(token, seed);

  const data: TrackData | undefined = status.data ?? initial.data;
  const terminalError = [status.error, initial.error].find(isTerminalTrackError) as
    | TrackApiError
    | undefined;

  // Newest driver position from either the socket or the status poll.
  const [socketPos, setSocketPos] = useState<DriverPosition | null>(null);
  const driver = useMemo(() => {
    const polled = data?.driverLoc ?? null;
    if (!socketPos) return polled;
    if (!polled) return socketPos;
    return socketPos.ts >= polled.ts ? socketPos : polled;
  }, [data?.driverLoc, socketPos]);

  const handlePosition = useCallback((p: DriverPosition) => {
    setSocketPos((prev) => (prev && prev.ts > p.ts ? prev : p));
  }, []);
  const refetchStatus = status.refetch;
  const handleTerminal = useCallback(() => {
    void refetchStatus();
  }, [refetchStatus]);

  const socketState = useTrackSocket(token, !!data && !terminalError, {
    onPosition: handlePosition,
    onTerminal: handleTerminal,
  });

  const [mapFailure, setMapFailure] = useState<MapFailure | null>(null);
  const [routeUnavailable, setRouteUnavailable] = useState(false);
  const mapAllowed = !!initial.data?.map?.enabled && hasGoogleMapsKey();
  const showMap = !!data && !terminalError && mapAllowed && !mapFailure;

  // Clock for "last updated".
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  const head = (
    <Helmet>
      <title>Live tracking | FastMet</title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
    </Helmet>
  );

  // ── Terminal / error screens (no map, no socket) ─────────────────────────
  if (terminalError) {
    const ended = terminalError.code === "TRIP_ENDED";
    return (
      <MessageScreen
        head={head}
        icon={<MapPinOff className="h-10 w-10 text-primary" />}
        title={ended ? "This trip has ended" : "Link not available"}
        body={
          ended
            ? "Live tracking stops once the delivery is completed or cancelled."
            : "This tracking link is invalid or has expired."
        }
      />
    );
  }

  if (initial.isPending) {
    return (
      <MessageScreen
        head={head}
        icon={<Loader2 className="h-8 w-8 animate-spin text-primary" />}
        title="Loading live tracking…"
      />
    );
  }

  if (!data) {
    const err = initial.error instanceof TrackApiError ? initial.error : null;
    const limited = err?.code === "RATE_LIMITED";
    return (
      <MessageScreen
        head={head}
        icon={<RefreshCw className="h-8 w-8 text-primary" />}
        title={limited ? "Too many requests" : "Couldn't load tracking"}
        body={
          limited
            ? "Please wait a moment, then try again."
            : "Check your connection and try again."
        }
        action={
          <Button onClick={() => void initial.refetch()} disabled={initial.isFetching}>
            {initial.isFetching ? <Loader2 className="animate-spin" /> : <RefreshCw />}
            Try again
          </Button>
        }
      />
    );
  }

  // ── Live view ────────────────────────────────────────────────────────────
  const target = data.status === "picked_up" ? data.dropoff : data.pickup;
  const distanceToTarget =
    driver && data.status !== "need_continuance" ? distanceM(driver, target) : null;
  const isStale = !!driver && now - driver.ts > STALE_AFTER_MS;

  const mapNotice = !mapAllowed
    ? "The live map is unavailable right now. The status below still updates."
    : mapFailure
      ? "The map couldn't load. The status below still updates."
      : null;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-gray-100">
      {head}

      {showMap && (
        <TrackMap
          pickup={data.pickup}
          dropoff={data.dropoff}
          status={data.status}
          driver={driver}
          onMapFailed={setMapFailure}
          onRouteUnavailable={() => setRouteUnavailable(true)}
        />
      )}

      {/* Header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 p-4">
        <div className="pointer-events-auto mx-auto flex max-w-md items-center gap-2 rounded-2xl bg-white/95 px-4 py-2 shadow">
          <img src={logo} alt="FastMet" className="h-7 w-auto" />
          <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-500">
            <span
              className={
                socketState === "live"
                  ? "h-2 w-2 rounded-full bg-green-500"
                  : socketState === "connecting"
                    ? "h-2 w-2 rounded-full bg-amber-400"
                    : "h-2 w-2 rounded-full bg-gray-400"
              }
            />
            {socketState === "live" ? "Live" : socketState === "connecting" ? "Connecting…" : "Updating every 30s"}
          </span>
        </div>
      </div>

      {/* Status card */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-5 shadow-lg">
          <p className="text-lg font-bold text-secondary">{HEADLINES[data.status]}</p>

          <div className="mt-2 space-y-1.5 text-sm text-gray-600">
            {data.vehicleName && (
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                {data.vehicleName}
              </p>
            )}
            {distanceToTarget !== null && (
              <p className="flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" />
                About {formatKm(distanceToTarget)} from the{" "}
                {data.status === "picked_up" ? "drop-off" : "pickup"} (straight line)
              </p>
            )}
            {!driver && data.status !== "need_continuance" && (
              <p className="flex items-center gap-2 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Waiting for the driver&apos;s location…
              </p>
            )}
            {driver && (isStale || socketState !== "live") && (
              <p className="flex items-center gap-2 text-gray-500">
                <Clock className="h-4 w-4" />
                Location updated {formatAgo(driver.ts, now)}
              </p>
            )}
          </div>

          {(mapNotice || (showMap && routeUnavailable)) && (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
              {mapNotice ?? "Route preview is unavailable right now."}
            </p>
          )}

          {showMap && (
            <div className="mt-3 flex gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" /> Pickup
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#DC2626]" /> Drop-off
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ED8718]" /> Driver
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageScreen({
  head,
  icon,
  title,
  body,
  action,
}: {
  head: ReactNode;
  icon: ReactNode;
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-gray-50 px-6 text-center">
      {head}
      <img src={logo} alt="FastMet" className="mb-4 h-9 w-auto" />
      {icon}
      <h1 className="text-xl font-bold text-secondary">{title}</h1>
      {body && <p className="max-w-sm text-sm text-gray-500">{body}</p>}
      {action}
    </div>
  );
}
