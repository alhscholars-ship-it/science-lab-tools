import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const mocks = vi.hoisted(() => ({
  ollama: vi.fn(),
  cloud: vi.fn(),
}));

vi.mock("../providers/ollama", () => ({
  generateWithOllama: mocks.ollama,
}));

vi.mock("../providers/cloud", () => ({
  generateWithCloudAI: mocks.cloud,
}));

import { buildScienceAnswer } from "../answer-builder";
import { detectScienceTopic } from "../science-router";

async function ask(question: string) {
  return buildScienceAnswer(
    question,
    detectScienceTopic(question),
    [],
  );
}

describe("AI provider routing", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();

    mocks.ollama.mockResolvedValue(
      "Force is a push or pull.",
    );

    mocks.cloud.mockResolvedValue(
      "Force is an interaction that changes motion.",
    );
  });

  it("uses Ollama by default", async () => {
    vi.stubEnv("AI_PROVIDER", "");

    await ask("Explain force in physics");

    expect(mocks.ollama).toHaveBeenCalled();
    expect(mocks.cloud).not.toHaveBeenCalled();
  });

  it("routes to cloud when configured", async () => {
    vi.stubEnv("AI_PROVIDER", "cloud");

    await ask("Explain force in physics");

    expect(mocks.cloud).toHaveBeenCalled();
    expect(mocks.ollama).not.toHaveBeenCalled();
  });

  it("routes explicitly to Ollama", async () => {
    vi.stubEnv("AI_PROVIDER", "ollama");

    await ask("Explain force in physics");

    expect(mocks.ollama).toHaveBeenCalled();
    expect(mocks.cloud).not.toHaveBeenCalled();
  });

  it("does not silently select another provider on invalid config", async () => {
    vi.stubEnv("AI_PROVIDER", "invalid");

    await ask("Explain force in physics");

    expect(mocks.cloud).not.toHaveBeenCalled();
    expect(mocks.ollama).not.toHaveBeenCalled();
  });
});
