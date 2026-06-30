import { useEffect, useState } from "react";

interface OtpCountdownProps {
  seconds: number;
  label: string; // use {s} as placeholder, e.g. "Resend in {s}s"
  onDone: () => void;
}

/**
 * Self-contained countdown component. Only this component re-renders each
 * second — the parent is not involved in the tick cycle.
 */
export function OtpCountdown({ seconds, label, onDone }: OtpCountdownProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          onDone();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>{label.replace("{s}", String(remaining))}</span>;
}
