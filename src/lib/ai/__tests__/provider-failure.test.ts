import { describe, expect, it } from "vitest";

import { classifyProviderFailure } from "../provider-failure";
import { AIProviderError } from "../providers/cloud";

describe("provider failure classification", () => {
  it("classifies rate limiting", () => {
    const result = classifyProviderFailure(
      new AIProviderError("gemini", 429, "Quota exceeded"),
    );

    expect(result.kind).toBe("rate_limited");
  });

  it.each([401, 403])(
    "classifies HTTP %i as configuration error",
    (status) => {
      const result = classifyProviderFailure(
        new AIProviderError("gemini", status, "Access denied"),
      );

      expect(result.kind).toBe("configuration_error");
    },
  );

  it("classifies missing credentials", () => {
    const result = classifyProviderFailure(
      new AIProviderError(
        "gemini",
        503,
        "Gemini API key not configured",
      ),
    );

    expect(result.kind).toBe("configuration_error");
  });

  it.each([408, 500, 502, 503])(
    "classifies HTTP %i as temporary unavailability",
    (status) => {
      const result = classifyProviderFailure(
        new AIProviderError("gemini", status, "Provider unavailable"),
      );

      expect(result.kind).toBe("temporarily_unavailable");
    },
  );

  it("handles unexpected errors safely", () => {
    const result = classifyProviderFailure(
      new Error("Internal diagnostic secret"),
    );

    expect(result.kind).toBe("temporarily_unavailable");
    expect(result.message).not.toContain("secret");
  });

  it("does not expose raw provider error messages", () => {
    const result = classifyProviderFailure(
      new AIProviderError(
        "gemini",
        503,
        "Sensitive provider diagnostic",
      ),
    );

    expect(result.message).not.toContain("Sensitive");
    expect(result.message).toContain("temporarily unavailable");
  });
});
