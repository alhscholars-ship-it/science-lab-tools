"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";

import {
  getServerConsentSnapshot,
  getStoredConsent,
  respondToConsent,
  subscribeToConsent,
} from "@/lib/consent/analytics-consent";

import { AnalyticsConsentBanner } from "./analytics-consent-banner";
import { WebVitalsReporter } from "./web-vitals-reporter";

type AnalyticsGateProps = {
  measurementId: string | null;
};

export function AnalyticsGate({ measurementId }: AnalyticsGateProps) {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getStoredConsent,
    getServerConsentSnapshot,
  );

  if (!measurementId) {
    return null;
  }

  return (
    <>
      {consent === null ? (
        <AnalyticsConsentBanner onRespond={respondToConsent} />
      ) : null}

      {consent === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}', { anonymize_ip: true });
            `}
          </Script>
          <WebVitalsReporter />
        </>
      ) : null}
    </>
  );
}
