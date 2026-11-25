import { reserveGeminiQuota } from "../security/global-quota";

type Provider = "openai" | "gemini";

export class AIProviderError extends Error {
  constructor(
    public readonly provider: Provider,
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "AIProviderError";
  }
}

function shouldFallback(error: unknown): boolean {
  if (!(error instanceof AIProviderError)) return false;

  if (error.status === 503 &&
      error.message === "OpenAI API key not configured") {
    return false;
  }

  return (
    error.status === 408 ||
    error.status === 429 ||
    error.status >= 500
  );
}

async function requestJson(
  provider: Provider,
  url: string,
  init: RequestInit,
): Promise<unknown> {
  let response: Response;
  const startedAt = performance.now();

  const logFailure = (
    category: string,
    status: number,
  ) => {
    if (provider !== "gemini") return;

    console.warn("[AI_PROVIDER_DIAGNOSTIC]", {
      provider: "gemini",
      category,
      status,
      durationMs: Math.round(performance.now() - startedAt),
    });
  };

  if (
    provider === "gemini" &&
    process.env.NODE_ENV === "production"
  ) {
    let allowed: boolean;

    try {
      allowed = await reserveGeminiQuota();
    } catch {
      throw new AIProviderError(
        "gemini",
        503,
        "Gemini quota protection unavailable",
      );
    }

    if (!allowed) {
      throw new AIProviderError(
        "gemini",
        429,
        "Gemini global quota exhausted",
      );
    }
  }

  try {
    response = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(20000),
      cache: "no-store",
    });
  } catch (error) {
    const category =
      error instanceof Error && error.name === "TimeoutError"
        ? "timeout"
        : "network_error";

    logFailure(category, 503);

    throw new AIProviderError(
      provider,
      503,
      `${provider} connection failed`,
    );
  }

  if (!response.ok) {
    logFailure("upstream_http", response.status);

    throw new AIProviderError(
      provider,
      response.status,
      `${provider} returned HTTP ${response.status}`,
    );
  }

  try {
    return await response.json();
  } catch {
    logFailure("invalid_json", 502);

    throw new AIProviderError(
      provider,
      502,
      `${provider} returned invalid JSON`,
    );
  }
}

async function generateOpenAI(
  prompt: string,
): Promise<string> {
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    throw new AIProviderError(
      "openai",
      503,
      "OpenAI API key not configured",
    );
  }

  const data = await requestJson(
    "openai",
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      }),
    },
  ) as {
    choices?: Array<{
      message?: { content?: string };
    }>;
  };

  const answer = data.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    throw new AIProviderError(
      "openai",
      502,
      "OpenAI returned an empty answer",
    );
  }

  return answer;
}

async function generateGemini(
  prompt: string,
): Promise<string> {
  const MAX_GEMINI_PROMPT_BYTES = 16_000;

  if (
    process.env.NODE_ENV === "production" &&
    Buffer.byteLength(prompt, "utf8") >
      MAX_GEMINI_PROMPT_BYTES
  ) {
    throw new AIProviderError(
      "gemini",
      413,
      "Gemini prompt exceeds the configured size limit",
    );
  }

  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    throw new AIProviderError(
      "gemini",
      503,
      "Gemini API key not configured",
    );
  }

  const model =
    process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const request = () => requestJson(
    "gemini",
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: prompt }] },
        ],
        generationConfig: {
          temperature: 0.2,
        },
      }),
    },
  );

  type GeminiResponse = {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  let data: GeminiResponse;

  try {
    data = await request() as GeminiResponse;
  } catch (error) {
    const retryable =
      error instanceof AIProviderError &&
      error.provider === "gemini" &&
      error.status === 503 &&
      error.message === "gemini connection failed";

    if (!retryable) {
      throw error;
    }

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 300);
    });

    data = await request() as GeminiResponse;
  }

  const result = data;

  const answer = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!answer) {
    console.warn("[AI_PROVIDER_DIAGNOSTIC]", {
      provider: "gemini",
      category: "empty_answer",
      status: 502,
    });

    throw new AIProviderError(
      "gemini",
      502,
      "Gemini returned an empty answer",
    );
  }

  return answer;
}

export async function generateWithCloudAI(
  prompt: string,
): Promise<string> {
  const selection = process.env.AI_CLOUD_PROVIDER || "openai";

  if (!["openai", "gemini", "auto"].includes(selection)) {
    throw new Error("Invalid AI_CLOUD_PROVIDER configuration");
  }

  if (selection === "gemini") {
    return generateGemini(prompt);
  }

  if (
    selection === "auto" &&
    !process.env.OPENAI_API_KEY &&
    process.env.GEMINI_API_KEY
  ) {
    return generateGemini(prompt);
  }

  try {
    return await generateOpenAI(prompt);
  } catch (error) {
    if (
      !process.env.GEMINI_API_KEY ||
      !shouldFallback(error)
    ) {
      throw error;
    }

    return generateGemini(prompt);
  }
}
