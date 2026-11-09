"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Rome",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());

    const frame = window.requestAnimationFrame(() => setTime(format()));
    const timer = window.setInterval(() => setTime(format()), 30_000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <span className="local-time">
      <span>Milano</span>
      <strong>{time ?? "—:—"}</strong>
      <span>CET</span>
    </span>
  );
}
