import {useQuery} from "@tanstack/react-query";
import {fetchTrack, isTerminalTrackError, TrackApiError} from "@/api/track";

const STATUS_POLL_MS = 30_000;

const retryTransient = (failureCount: number, error: unknown) =>
  error instanceof TrackApiError &&
  (error.code === "NETWORK" || error.code === "UNKNOWN") &&
  failureCount < 2;

/**
 * First load. Counted server-side as one map load, so it must run exactly
 * once per page view: never refetched, never stale.
 */
export function useTrackInitial(token: string) {
  return useQuery({
    queryKey: ["track", token, "initial"],
    queryFn: ({signal}) => fetchTrack(token, {initial: true, signal}),
    enabled: !!token,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: retryTransient,
  });
}

/**
 * Status poll (trip stage, end of trip). Not counted against the map budget.
 * Seeded from the initial response so it doesn't fire right after it. Stops
 * once the link is invalid or the trip has ended, and pauses in hidden tabs.
 */
export function useTrackStatus(
  token: string,
  seed: {data: Awaited<ReturnType<typeof fetchTrack>>; updatedAt: number} | null,
) {
  return useQuery({
    queryKey: ["track", token, "status"],
    queryFn: ({signal}) => fetchTrack(token, {signal}),
    enabled: !!token && !!seed,
    initialData: seed?.data,
    initialDataUpdatedAt: seed?.updatedAt,
    staleTime: STATUS_POLL_MS - 5_000,
    refetchInterval: (query) =>
      isTerminalTrackError(query.state.error) ? false : STATUS_POLL_MS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: (query) => !isTerminalTrackError(query.state.error),
    retry: retryTransient,
  });
}
