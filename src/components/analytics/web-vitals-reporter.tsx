"use client";

import { useReportWebVitals } from "next/web-vitals";

import { createWebVitalAnalyticsEvent } from "@/lib/analytics/web-vitals";

type GtagParameters = Record<
  string,
  string | number | boolean
>;

type GtagCommand = [
  command: "event",
  eventName: string,
  parameters: GtagParameters,
];

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

function reportAnalyticsEvent(command: GtagCommand) {
  if (window.gtag) {
    window.gtag(...command);
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(command);
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const event = createWebVitalAnalyticsEvent(metric);

    reportAnalyticsEvent([
      "event",
      event.eventName,
      event.parameters,
    ]);
  });

  return null;
}
