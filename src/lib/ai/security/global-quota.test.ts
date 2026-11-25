import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { reserveGeminiQuota } from "./global-quota";
import { generateWithCloudAI } from "../providers/cloud";

describe("Gemini global quota protection", () => {
  beforeEach(() => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-token");
    vi.stubEnv("GEMINI_API_KEY", "test-gemini-key");
    vi.stubEnv("GEMINI_MODEL", "gemini-3.1-flash-lite");
    vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");
    vi.stubEnv("NODE_ENV", "production");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  function json(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), { status });
  }

  it("allows a successful quota reservation", async () => {
    const mock = vi.fn().mockResolvedValue(json({ result: 1 }));
    vi.stubGlobal("fetch", mock);

    expect(await reserveGeminiQuota()).toBe(true);
    expect(mock).toHaveBeenCalledOnce();

    const url = String(mock.mock.calls[0][0]);
    expect(url).toContain("/eval/");
    expect(url).toContain("/450/12/");
  });

  it("rejects exhausted quota", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      json({ result: 0 }),
    ));

    expect(await reserveGeminiQuota()).toBe(false);
  });

  it("rejects missing Redis configuration", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");

    const mock = vi.fn();
    vi.stubGlobal("fetch", mock);

    await expect(reserveGeminiQuota()).rejects.toThrow();
    expect(mock).not.toHaveBeenCalled();
  });

  it("rejects Redis HTTP failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      json({}, 503),
    ));

    await expect(reserveGeminiQuota()).rejects.toThrow();
  });

  it("rejects malformed Redis response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      json({ result: 99 }),
    ));

    await expect(reserveGeminiQuota()).rejects.toThrow();
  });

  it("blocks Gemini when global quota is exhausted", async () => {
    const mock = vi.fn().mockResolvedValue(
      json({ result: 0 }),
    );

    vi.stubGlobal("fetch", mock);

    await expect(generateWithCloudAI("Test"))
      .rejects.toMatchObject({ status: 429 });

    expect(mock).toHaveBeenCalledOnce();
  });

  it("blocks Gemini when Redis is unavailable", async () => {
    const mock = vi.fn().mockRejectedValue(
      new Error("Storage unavailable"),
    );

    vi.stubGlobal("fetch", mock);

    await expect(generateWithCloudAI("Test"))
      .rejects.toMatchObject({ status: 503 });

    expect(mock).toHaveBeenCalledOnce();
  });

  it("reserves quota before calling Gemini", async () => {
    const mock = vi.fn()
      .mockResolvedValueOnce(json({ result: 1 }))
      .mockResolvedValueOnce(json({
        candidates: [{
          content: { parts: [{ text: "Science answer" }] },
        }],
      }));

    vi.stubGlobal("fetch", mock);

    expect(await generateWithCloudAI("Test"))
      .toBe("Science answer");

    expect(mock).toHaveBeenCalledTimes(2);

    expect(String(mock.mock.calls[0][0]))
      .toContain("example.upstash.io");

    expect(String(mock.mock.calls[1][0]))
      .toContain("generativelanguage.googleapis.com");
  });

  it("reserves quota again before an automatic retry", async () => {
    const mock = vi.fn()
      .mockResolvedValueOnce(json({ result: 1 }))
      .mockRejectedValueOnce(new Error("Network failure"))
      .mockResolvedValueOnce(json({ result: 1 }))
      .mockResolvedValueOnce(json({
        candidates: [{
          content: { parts: [{ text: "Retry answer" }] },
        }],
      }));

    vi.stubGlobal("fetch", mock);

    expect(await generateWithCloudAI("Test"))
      .toBe("Retry answer");

    expect(mock).toHaveBeenCalledTimes(4);

    expect(String(mock.mock.calls[2][0]))
      .toContain("example.upstash.io");
  });

  it("preserves non-production Gemini behavior", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const mock = vi.fn().mockResolvedValue(json({
      candidates: [{
        content: { parts: [{ text: "Local answer" }] },
      }],
    }));

    vi.stubGlobal("fetch", mock);

    expect(await generateWithCloudAI("Test"))
      .toBe("Local answer");

    expect(mock).toHaveBeenCalledOnce();
  });
});
