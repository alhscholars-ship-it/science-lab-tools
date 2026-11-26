import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { generateWithCloudAI } from "./cloud";

describe("Gemini production prompt protection", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");
    vi.stubEnv("GEMINI_API_KEY", "test-key");
    vi.stubEnv("GEMINI_MODEL", "gemini-3.1-flash-lite");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-token");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  function response(data: unknown) {
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  }

  function geminiResponse() {
    return response({
      candidates: [{
        content: {
          parts: [{ text: "Science answer" }],
        },
      }],
    });
  }

  function allowRequests() {
    const mock = vi.fn()
      .mockResolvedValueOnce(response({ result: 1 }))
      .mockResolvedValueOnce(geminiResponse());

    vi.stubGlobal("fetch", mock);

    return mock;
  }

  it("allows a normal prompt", async () => {
    const mock = allowRequests();

    expect(await generateWithCloudAI("Explain gravity"))
      .toBe("Science answer");

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it("allows exactly 16000 ASCII bytes", async () => {
    const mock = allowRequests();

    expect(await generateWithCloudAI("a".repeat(16000)))
      .toBe("Science answer");

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it("rejects 16001 ASCII bytes before network access", async () => {
    const mock = vi.fn();
    vi.stubGlobal("fetch", mock);

    await expect(generateWithCloudAI("a".repeat(16001)))
      .rejects.toMatchObject({ status: 413 });

    expect(mock).not.toHaveBeenCalled();
  });

  it("allows ordinary Urdu input", async () => {
    const mock = allowRequests();

    expect(await generateWithCloudAI("کشش ثقل کیا ہے؟"))
      .toBe("Science answer");

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it("rejects oversized Urdu input by UTF-8 bytes", async () => {
    const mock = vi.fn();
    vi.stubGlobal("fetch", mock);

    const prompt = "ا".repeat(8001);

    expect(Buffer.byteLength(prompt, "utf8")).toBe(16002);

    await expect(generateWithCloudAI(prompt))
      .rejects.toMatchObject({ status: 413 });

    expect(mock).not.toHaveBeenCalled();
  });

  it("allows exactly 16000 emoji bytes", async () => {
    const mock = allowRequests();

    const prompt = "😀".repeat(4000);

    expect(Buffer.byteLength(prompt, "utf8")).toBe(16000);

    expect(await generateWithCloudAI(prompt))
      .toBe("Science answer");

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it("rejects oversized emoji input", async () => {
    const mock = vi.fn();
    vi.stubGlobal("fetch", mock);

    await expect(generateWithCloudAI("😀".repeat(4001)))
      .rejects.toMatchObject({ status: 413 });

    expect(mock).not.toHaveBeenCalled();
  });

  it("preserves local development behavior", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const mock = vi.fn()
      .mockResolvedValue(geminiResponse());

    vi.stubGlobal("fetch", mock);

    expect(await generateWithCloudAI("a".repeat(16001)))
      .toBe("Science answer");

    expect(mock).toHaveBeenCalledOnce();
  });
});
