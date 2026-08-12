export type ConsentState = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "alh-analytics-consent";

export type ConsentStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

type ConsentListener = () => void;

const listeners = new Set<ConsentListener>();

function isConsentState(value: string | null): value is ConsentState {
  return value === "granted" || value === "denied";
}

function getBrowserStorage(): ConsentStorage | undefined {
  return typeof window === "undefined" ? undefined : window.localStorage;
}

function notifyListeners(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeToConsent(listener: ConsentListener): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getStoredConsent(
  storage: ConsentStorage | undefined = getBrowserStorage(),
): ConsentState | null {
  if (!storage) {
    return null;
  }

  try {
    const value = storage.getItem(CONSENT_STORAGE_KEY);

    return isConsentState(value) ? value : null;
  } catch {
    return null;
  }
}

export function getServerConsentSnapshot(): ConsentState | null {
  return null;
}

export function respondToConsent(
  state: ConsentState,
  storage: ConsentStorage | undefined = getBrowserStorage(),
): void {
  if (storage) {
    try {
      storage.setItem(CONSENT_STORAGE_KEY, state);
    } catch {
      // Ignore storage failures (private browsing, quota, disabled
      // storage). Analytics simply will not load until it can persist.
    }
  }

  notifyListeners();
}

export function openConsentPreferences(
  storage: ConsentStorage | undefined = getBrowserStorage(),
): void {
  if (storage) {
    try {
      storage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      // Ignore storage failures; the banner still reopens for this visit.
    }
  }

  notifyListeners();
}
