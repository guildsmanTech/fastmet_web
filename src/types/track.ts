export type TrackCoords = {lat: number; lng: number};

export type TrackStatus = "active" | "picked_up" | "need_continuance";

export type DriverPosition = TrackCoords & {
  /** Server receive time (ms epoch). Used to drop out-of-order points. */
  ts: number;
};

/** GET /api/web/track/:token. No names, phones, addresses or ids by design. */
export type TrackData = {
  success: true;
  status: TrackStatus;
  pickup: TrackCoords;
  dropoff: TrackCoords;
  vehicleName: string | null;
  driverLoc: DriverPosition | null;
  expiresAt: string;
  /** Only on the `initial=1` request: whether this page load may use Google Maps. */
  map?: {enabled: boolean};
};

export type TrackErrorCode =
  | "LINK_INVALID"
  | "TRIP_ENDED"
  | "RATE_LIMITED"
  | "NETWORK"
  | "UNKNOWN";
