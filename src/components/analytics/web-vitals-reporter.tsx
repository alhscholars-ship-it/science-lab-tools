"use client";

import { useReportWebVitals } from "next/web-vitals";

import {
  createWebVitalAnalyticsEvent,
  reportAnalyticsEvent,
  type GtagCommand,
  type GtagParameters,
} from "@/lib/analytics/web-vitals";

declare global {
  interface Window {
    dataLayer?: GtagCommand[];
    gtag?: (
      command: "event",
      eventName: string,
      parameters: GtagParameters,
    ) => void;
  }
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const event = createWebVitalAnalyticsEvent(metric);

    reportAnalyticsEvent(window, [
      "event",
      event.eventName,
      event.parameters,
    ]);
  });

  return null;
}
