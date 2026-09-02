"use client";

import { useEffect, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeCountdown(targetIso: string): CountdownValue {
  const diff = new Date(targetIso).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const seconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    isPast: false,
  };
}

const ZERO_COUNTDOWN: CountdownValue = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isPast: false,
};

export function useCountdown(targetIso: string): CountdownValue {
  // Starts at zero and computes on mount to avoid a server/client hydration
  // mismatch (Date.now() differs between server render and client render).
  const [value, setValue] = useState<CountdownValue>(ZERO_COUNTDOWN);

  useEffect(() => {
    const tick = () => setValue(computeCountdown(targetIso));

    // Un frame de diferencia es imperceptible y evita disparar el setState
    // de forma síncrona en el cuerpo del efecto.
    const frame = requestAnimationFrame(tick);
    const interval = setInterval(tick, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, [targetIso]);

  return value;
}
