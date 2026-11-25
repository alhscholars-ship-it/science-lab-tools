import { checkAIRateLimit } from "./rate-limit";

export type AIGuardResult =
  | { allowed: true }
  | {
      allowed: false;
      status: 429 | 503;
      error: string;
      retryAfter?: number;
    };

export async function guardAIRequest(
  clientIdentifier: string | null,
): Promise<AIGuardResult> {
  const isProduction =
    process.env.NODE_ENV === "production";

  if (
    !isProduction &&
    process.env.AI_RATE_LIMIT_MODE === "off"
  ) {
    return { allowed: true };
  }

  if (!clientIdentifier) {
    return {
      allowed: false,
      status: 503,
      error: "Unable to verify request origin.",
    };
  }

  try {
    const result = await checkAIRateLimit(
      clientIdentifier,
    );

    if (!result.allowed) {
      return {
        allowed: false,
        status: 429,
        error: "Too many AI requests. Please try again later.",
        retryAfter: result.retryAfter,
      };
    }

    return { allowed: true };
  } catch {
    return {
      allowed: false,
      status: 503,
      error: "AI service temporarily unavailable.",
    };
  }
}
