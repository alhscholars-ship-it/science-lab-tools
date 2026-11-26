import { AIProviderError } from "./providers/cloud";

export type ProviderFailureKind =
  | "rate_limited"
  | "temporarily_unavailable"
  | "configuration_error";

export type ProviderFailure = {
  kind: ProviderFailureKind;
  message: string;
};

export function classifyProviderFailure(
  error: unknown,
): ProviderFailure {
  if (error instanceof AIProviderError) {
    if (error.status === 429) {
      return {
        kind: "rate_limited",
        message: "The AI service is temporarily busy. Please try again later.",
      };
    }

    if (
      error.status === 401 ||
      error.status === 403 ||
      error.message.includes("not configured")
    ) {
      return {
        kind: "configuration_error",
        message: "The AI service is not configured correctly.",
      };
    }

    return {
      kind: "temporarily_unavailable",
      message: "The AI service is temporarily unavailable. Please try again.",
    };
  }

  return {
    kind: "temporarily_unavailable",
    message: "The AI service is temporarily unavailable. Please try again.",
  };
}
