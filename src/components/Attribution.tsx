"use client";
import { useEffect } from "react";

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "gclid", "fbclid"] as const;

/** First-touch attribution: stores landing page, referrer and UTMs once per session, logs a session_start event. */
export default function Attribution() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("zp_ft")) return;
      const p = new URLSearchParams(location.search);
      const ft: Record<string, string> = { landing: location.pathname, referrer: document.referrer.slice(0, 200) };
      for (const k of KEYS) { const v = p.get(k); if (v) ft[k] = v.slice(0, 120); }
      sessionStorage.setItem("zp_ft", JSON.stringify(ft));
      let id = sessionStorage.getItem("zp_session");
      if (!id) { id = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem("zp_session", id); }
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: id, event_name: "session_start", properties: ft }),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  }, []);
  return null;
}

export function readFirstTouch(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem("zp_ft") || "{}"); } catch { return {}; }
}
