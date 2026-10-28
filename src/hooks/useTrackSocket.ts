import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {API_URL} from "@/helper/constant";
import type {DriverPosition} from "@/types/track";

export type TrackSocketState = "connecting" | "live" | "offline";

/** Errors the server sends at handshake (see backend sockets/track.ts). */
const TERMINAL_ERRORS = new Set(["LINK_INVALID", "TRIP_ENDED"]);

const isPosition = (p: unknown): p is DriverPosition => {
  const v = p as Partial<DriverPosition> | null;
  return (
    !!v &&
    Number.isFinite(v.lat) &&
    Number.isFinite(v.lng) &&
    Number.isFinite(v.ts)
  );
};

/**
 * View-only live position feed for a share link. When the socket can't be
 * used (rate limited, gave up reconnecting) the page keeps working on its
 * 30s status poll, which also carries the last driver position.
 */
export function useTrackSocket(
  token: string,
  enabled: boolean,
  handlers: {
    onPosition: (p: DriverPosition) => void;
    /** Link died (trip ended / expired): the page should re-check status. */
    onTerminal: () => void;
  },
): TrackSocketState {
  const [state, setState] = useState<TrackSocketState>("connecting");
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!enabled || !token) return;

    const socket = io(`${API_URL}/track`, {
      auth: {token},
      transports: ["websocket", "polling"],
      reconnectionAttempts: 8,
      reconnectionDelay: 2_000,
      reconnectionDelayMax: 30_000,
      timeout: 10_000,
    });

    socket.on("connect", () => setState("live"));
    socket.on("driverLocation", (p: unknown) => {
      if (isPosition(p)) handlersRef.current.onPosition(p);
    });
    socket.on("connect_error", (err) => {
      if (TERMINAL_ERRORS.has(err.message)) {
        socket.disconnect();
        setState("offline");
        handlersRef.current.onTerminal();
        return;
      }
      if (err.message === "RATE_LIMITED") {
        // Too many open views from this network / link: rely on polling.
        socket.disconnect();
        setState("offline");
        return;
      }
      setState("connecting");
    });
    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // Server closed the room (trip ended or link expired).
        setState("offline");
        handlersRef.current.onTerminal();
      } else {
        setState("connecting");
      }
    });
    socket.io.on("reconnect_failed", () => setState("offline"));

    return () => {
      socket.removeAllListeners();
      socket.io.removeAllListeners();
      socket.disconnect();
    };
  }, [enabled, token]);

  return enabled ? state : "offline";
}
