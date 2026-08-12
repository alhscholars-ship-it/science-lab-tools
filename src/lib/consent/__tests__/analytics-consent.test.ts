import { describe, expect, it, vi } from "vitest";

import {
  CONSENT_STORAGE_KEY,
  type ConsentStorage,
  getServerConsentSnapshot,
  getStoredConsent,
  openConsentPreferences,
  respondToConsent,
  subscribeToConsent,
} from "../analytics-consent";

function createMemoryStorage(): ConsentStorage {
  const values = new Map<string, string>();

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
    removeItem: (key) => {
      values.delete(key);
    },
  };
}

describe("analytics consent storage", () => {
  it("returns null when no consent decision has been stored", () => {
    expect(getStoredConsent(createMemoryStorage())).toBeNull();
  });

  it("persists a granted decision and notifies subscribers", () => {
    const storage = createMemoryStorage();
    const listener = vi.fn();
    const unsubscribe = subscribeToConsent(listener);

    respondToConsent("granted", storage);

    expect(getStoredConsent(storage)).toBe("granted");
    expect(storage.getItem(CONSENT_STORAGE_KEY)).toBe("granted");
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
  });

  it("persists a denied decision", () => {
    const storage = createMemoryStorage();

    respondToConsent("denied", storage);

    expect(getStoredConsent(storage)).toBe("denied");
  });

  it("ignores unrecognized stored values", () => {
    const storage = createMemoryStorage();

    storage.setItem(CONSENT_STORAGE_KEY, "yes-please");

    expect(getStoredConsent(storage)).toBeNull();
  });

  it("tolerates a missing storage backend", () => {
    expect(getStoredConsent(undefined)).toBeNull();
    expect(() => respondToConsent("granted", undefined)).not.toThrow();
    expect(() => openConsentPreferences(undefined)).not.toThrow();
  });

  it("tolerates storage access failures", () => {
    const throwingStorage: ConsentStorage = {
      getItem: () => {
        throw new Error("storage disabled");
      },
      setItem: () => {
        throw new Error("storage disabled");
      },
      removeItem: () => {
        throw new Error("storage disabled");
      },
    };

    expect(getStoredConsent(throwingStorage)).toBeNull();
    expect(() =>
      respondToConsent("granted", throwingStorage),
    ).not.toThrow();
    expect(() =>
      openConsentPreferences(throwingStorage),
    ).not.toThrow();
  });

  it("clears the stored decision and notifies subscribers when preferences reopen", () => {
    const storage = createMemoryStorage();
    const listener = vi.fn();

    respondToConsent("granted", storage);

    const unsubscribe = subscribeToConsent(listener);
    openConsentPreferences(storage);

    expect(getStoredConsent(storage)).toBeNull();
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
  });

  it("stops notifying a listener after it unsubscribes", () => {
    const storage = createMemoryStorage();
    const listener = vi.fn();
    const unsubscribe = subscribeToConsent(listener);

    unsubscribe();
    respondToConsent("granted", storage);

    expect(listener).not.toHaveBeenCalled();
  });

  it("always reports no consent decision for the server snapshot", () => {
    expect(getServerConsentSnapshot()).toBeNull();
  });
});
