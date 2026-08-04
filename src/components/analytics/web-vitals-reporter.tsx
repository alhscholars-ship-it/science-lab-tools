"use client";

import { useReportWebVitals } from "next/web-vitals";

import { createWebVitalAnalyticsEvent } from "@/lib/analytics/web-vitals";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters: Record<string, string | number | boolean>,
    ) => void;
  }
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (!window.gtag) {
      return;
    }

    const event = createWebVitalAnalyticsEvent(metric);
    window.gtag("event", event.eventName, event.parameters);
  });

  return null;
}
