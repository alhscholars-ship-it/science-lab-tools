const OLLAMA_URL =
  process.env.OLLAMA_URL ?? "http://127.0.0.1:11434";

const OLLAMA_MODEL =
  process.env.OLLAMA_MODEL ?? "qwen2.5:1.5b-instruct";

type OllamaGenerateResponse = {
  response?: string;
  error?: string;
};

export async function generateWithOllama(
  prompt: string,
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
        options: {
          temperature: 0.2,
          num_predict: 180,
          repeat_penalty: 1.2,
          repeat_last_n: 64,
        },
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    const data = (await response.json()) as OllamaGenerateResponse;

    if (!response.ok) {
      throw new Error(
        data.error || `Ollama request failed (${response.status})`,
      );
    }

    if (typeof data.response !== "string" || !data.response.trim()) {
      throw new Error("Ollama returned an empty response.");
    }

    return data.response.trim();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("The local AI model took too long to respond.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
