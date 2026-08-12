"use client";

import Link from "next/link";

import type { ConsentState } from "@/lib/consent/analytics-consent";

type AnalyticsConsentBannerProps = {
  onRespond: (state: ConsentState) => void;
};

export function AnalyticsConsentBanner({
  onRespond,
}: AnalyticsConsentBannerProps) {
  return (
    <div
      className="consent-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Analytics preferences"
    >
      <p>
        We use privacy-respecting analytics to see which resources help
        learners most. Analytics only loads if you accept. Read the{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <div className="consent-banner__actions">
        <button
          type="button"
          className="button button--secondary"
          onClick={() => onRespond("denied")}
        >
          Decline
        </button>

        <button
          type="button"
          className="button button--primary"
          onClick={() => onRespond("granted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
