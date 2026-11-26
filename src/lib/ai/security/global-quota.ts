import { randomUUID } from "node:crypto";

const MINUTE_LIMIT = 12;
const DAILY_LIMIT = 450;

const QUOTA_SCRIPT = `
local clock = redis.call("TIME")
local now = tonumber(clock[1]) * 1000
  + math.floor(tonumber(clock[2]) / 1000)

redis.call(
  "ZREMRANGEBYSCORE",
  KEYS[1],
  "-inf",
  now - 86400000
)

local daily = redis.call("ZCARD", KEYS[1])

local minute = redis.call(
  "ZCOUNT",
  KEYS[1],
  "(" .. tostring(now - 60000),
  "+inf"
)

if daily >= tonumber(ARGV[1]) then
  return 0
end

if minute >= tonumber(ARGV[2]) then
  return 0
end

redis.call("ZADD", KEYS[1], now, ARGV[3])
redis.call("EXPIRE", KEYS[1], 86401)

return 1
`;

export async function reserveGeminiQuota(): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Global quota storage is not configured");
  }

  const commandPath = [
    "eval",
    encodeURIComponent(QUOTA_SCRIPT),
    "1",
    encodeURIComponent("ai-tutor:gemini:global:v1"),
    String(DAILY_LIMIT),
    String(MINUTE_LIMIT),
    randomUUID(),
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
    throw new Error("Global quota storage unavailable");
  }

  const data = (await response.json()) as {
    result?: unknown;
    error?: unknown;
  };

  if (
    data.error ||
    (data.result !== 0 && data.result !== 1)
  ) {
    throw new Error("Invalid global quota response");
  }

  return data.result === 1;
}
