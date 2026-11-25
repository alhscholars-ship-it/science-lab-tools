import { createHash } from "node:crypto";

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfter: number;
};

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 10;

type RedisResult = {
  result?: [number, number];
  error?: string;
};

const RATE_LIMIT_SCRIPT = `
local count = redis.call("INCR", KEYS[1])
local ttl = redis.call("TTL", KEYS[1])
if ttl < 0 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
  ttl = redis.call("TTL", KEYS[1])
end
return {count, ttl}
`;

function clientKey(identifier: string): string {
  const secret = process.env.AI_RATE_LIMIT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("AI rate-limit secret is not configured");
  }

  return createHash("sha256")
    .update(secret)
    .update(":")
    .update(identifier)
    .digest("hex");
}

export async function checkAIRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("AI rate-limit storage is not configured");
  }

  const key = `ai-tutor:rate:${clientKey(identifier)}`;

  const commandPath = [
    "eval",
    encodeURIComponent(RATE_LIMIT_SCRIPT),
    "1",
    encodeURIComponent(key),
    String(WINDOW_SECONDS),
  ].join("/");

  const response = await fetch(
    `${url.replace(/\/$/, "")}/${commandPath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    },
  );

  if (!response.ok) {
    throw new Error("AI rate-limit storage unavailable");
  }

  const data = (await response.json()) as RedisResult;

  if (
    data.error ||
    !Array.isArray(data.result) ||
    data.result.length !== 2
  ) {
    throw new Error("Invalid rate-limit storage response");
  }

  const [count, ttl] = data.result;

  if (
    !Number.isSafeInteger(count) ||
    count < 1 ||
    !Number.isSafeInteger(ttl) ||
    ttl < 0
  ) {
    throw new Error("Invalid rate-limit counter");
  }

  return {
    allowed: count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - count),
    retryAfter: count <= MAX_REQUESTS ? 0 : Math.max(1, ttl),
  };
}
