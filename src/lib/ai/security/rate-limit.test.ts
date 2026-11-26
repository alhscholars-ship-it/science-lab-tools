import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { checkAIRateLimit } from "./rate-limit";

describe("AI distributed rate limiter", () => {
  beforeEach(() => {
    vi.stubEnv(
      "UPSTASH_REDIS_REST_URL",
      "https://example.upstash.io",
    );
    vi.stubEnv(
      "UPSTASH_REDIS_REST_TOKEN",
      "test-token",
    );
    vi.stubEnv(
      "AI_RATE_LIMIT_SECRET",
      "a".repeat(40),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("allows requests within the limit", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ result: [3, 45] }),
        { status: 200 },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    const result = await checkAIRateLimit("192.0.2.10");

    expect(result).toEqual({
      allowed: true,
      remaining: 7,
      retryAfter: 0,
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toContain("/eval");
  });

  it("blocks requests above the limit", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({ result: [11, 35] }),
          { status: 200 },
        ),
      ),
    );

    expect(
      await checkAIRateLimit("192.0.2.11"),
    ).toEqual({
      allowed: false,
      remaining: 0,
      retryAfter: 35,
    });
  });

  it("rejects missing Redis configuration", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      checkAIRateLimit("192.0.2.12"),
    ).rejects.toThrow("storage is not configured");

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects missing hashing secret", async () => {
    vi.stubEnv("AI_RATE_LIMIT_SECRET", "");

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      checkAIRateLimit("192.0.2.13"),
    ).rejects.toThrow("secret is not configured");

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects Redis HTTP failures", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("Unavailable", { status: 503 }),
      ),
    );

    await expect(
      checkAIRateLimit("192.0.2.14"),
    ).rejects.toThrow("storage unavailable");
  });

  it("rejects malformed Redis responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({ result: ["invalid", -1] }),
          { status: 200 },
        ),
      ),
    );

    await expect(
      checkAIRateLimit("192.0.2.15"),
    ).rejects.toThrow("Invalid rate-limit counter");
  });
});
