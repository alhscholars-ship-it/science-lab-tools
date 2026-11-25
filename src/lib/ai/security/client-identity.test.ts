import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { getAIClientIdentifier } from "./client-identity";

function request(headers: Record<string, string> = {}) {
  return new Request("https://example.com/api/ai-tutor", {
    headers,
  });
}

describe("AI client identification", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("accepts a valid Vercel forwarded IPv4", () => {
    vi.stubEnv("VERCEL", "1");

    expect(
      getAIClientIdentifier(
        request({ "x-forwarded-for": "192.0.2.10" }),
      ),
    ).toBe("192.0.2.10");
  });

  it("accepts IPv6 addresses", () => {
    vi.stubEnv("VERCEL", "1");

    expect(
      getAIClientIdentifier(
        request({ "x-forwarded-for": "2001:db8::1" }),
      ),
    ).toBe("2001:db8::1");
  });

  it("uses the first forwarded address", () => {
    vi.stubEnv("VERCEL", "1");

    expect(
      getAIClientIdentifier(
        request({
          "x-forwarded-for": "192.0.2.10, 198.51.100.20",
        }),
      ),
    ).toBe("192.0.2.10");
  });

  it("rejects invalid IP addresses", () => {
    vi.stubEnv("VERCEL", "1");

    expect(
      getAIClientIdentifier(
        request({ "x-forwarded-for": "not-an-ip" }),
      ),
    ).toBeNull();
  });

  it("rejects missing forwarded headers", () => {
    vi.stubEnv("VERCEL", "1");

    expect(getAIClientIdentifier(request())).toBeNull();
  });

  it("does not trust headers outside Vercel", () => {
    vi.stubEnv("VERCEL", "");

    expect(
      getAIClientIdentifier(
        request({ "x-forwarded-for": "192.0.2.10" }),
      ),
    ).toBeNull();
  });
});
