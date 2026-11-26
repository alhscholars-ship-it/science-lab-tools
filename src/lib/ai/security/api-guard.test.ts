import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
  checkAIRateLimit: vi.fn(),
}));

vi.mock("./rate-limit", () => ({
  checkAIRateLimit: mocks.checkAIRateLimit,
}));

import { guardAIRequest } from "./api-guard";

describe("AI API security guard", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("AI_RATE_LIMIT_MODE", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("allows requests within the rate limit", async () => {
    mocks.checkAIRateLimit.mockResolvedValue({
      allowed: true,
      remaining: 8,
      retryAfter: 0,
    });

    expect(await guardAIRequest("192.0.2.10"))
      .toEqual({ allowed: true });

    expect(mocks.checkAIRateLimit)
      .toHaveBeenCalledWith("192.0.2.10");
  });

  it("returns 429 when the rate limit is exceeded", async () => {
    mocks.checkAIRateLimit.mockResolvedValue({
      allowed: false,
      remaining: 0,
      retryAfter: 25,
    });

    expect(await guardAIRequest("192.0.2.11"))
      .toEqual({
        allowed: false,
        status: 429,
        error: "Too many AI requests. Please try again later.",
        retryAfter: 25,
      });
  });

  it("rejects missing client identification", async () => {
    const result = await guardAIRequest(null);

    expect(result).toMatchObject({
      allowed: false,
      status: 503,
    });

    expect(mocks.checkAIRateLimit).not.toHaveBeenCalled();
  });

  it("fails closed when Redis is unavailable", async () => {
    mocks.checkAIRateLimit.mockRejectedValue(
      new Error("Redis unavailable"),
    );

    const result = await guardAIRequest("192.0.2.12");

    expect(result).toMatchObject({
      allowed: false,
      status: 503,
    });
  });

  it("does not allow production bypass", async () => {
    vi.stubEnv("AI_RATE_LIMIT_MODE", "off");

    mocks.checkAIRateLimit.mockResolvedValue({
      allowed: false,
      remaining: 0,
      retryAfter: 30,
    });

    const result = await guardAIRequest("192.0.2.13");

    expect(result).toMatchObject({
      allowed: false,
      status: 429,
    });
  });

  it("supports explicit local development bypass", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("AI_RATE_LIMIT_MODE", "off");

    expect(await guardAIRequest(null))
      .toEqual({ allowed: true });

    expect(mocks.checkAIRateLimit).not.toHaveBeenCalled();
  });
});
