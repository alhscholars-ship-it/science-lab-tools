"use client";

import { openConsentPreferences } from "@/lib/consent/analytics-consent";

export function CookiePreferencesButton() {
  return (
    <button type="button" onClick={() => openConsentPreferences()}>
      Cookie preferences
    </button>
  );
}
