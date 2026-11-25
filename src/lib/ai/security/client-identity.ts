import { isIP } from "node:net";

export function getAIClientIdentifier(
  request: Request,
): string | null {
  if (process.env.VERCEL !== "1") {
    return null;
  }

  const forwarded = request.headers.get("x-forwarded-for");

  if (!forwarded) {
    return null;
  }

  const first = forwarded.split(",")[0]?.trim();

  if (!first || isIP(first) === 0) {
    return null;
  }

  return first;
}
