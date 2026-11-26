import { describe, expect, it, vi } from "vitest";

const { generateWithOllama } = vi.hoisted(() => ({
  generateWithOllama: vi.fn(),
}));

vi.mock("../providers/ollama", () => ({
  generateWithOllama,
}));

import { buildScienceAnswer } from "../answer-builder";
import { detectScienceTopic } from "../science-router";

describe("Multi-subject AI Assistant", () => {
  it.each([
    ["When did Pakistan gain independence?", "history"],
    ["What is the capital of Pakistan?", "geography"],
    ["Explain artificial intelligence.", "technology"],
    ["What is photosynthesis?", "science"],
  ])("supports %s", async (question, subject) => {
    generateWithOllama.mockReset();
    generateWithOllama.mockResolvedValue(
      "This is an educational explanation."
    );

    await buildScienceAnswer(
      question,
      detectScienceTopic(question),
      []
    );

    expect(generateWithOllama).toHaveBeenCalledOnce();

    const prompt = generateWithOllama.mock.calls[0][0] as string;

    expect(prompt).toContain(
      "multilingual educational AI assistant"
    );
    expect(prompt).toContain(question);
    expect(prompt).toContain(subject);
  });

  it("does not restrict answers to science", async () => {
    generateWithOllama.mockReset();
    generateWithOllama.mockResolvedValue(
      "Pakistan became independent in 1947."
    );

    const result = await buildScienceAnswer(
      "When did Pakistan gain independence?",
      detectScienceTopic("When did Pakistan gain independence?"),
      []
    );

    expect(result.explanation).toContain("1947");
  });
});
