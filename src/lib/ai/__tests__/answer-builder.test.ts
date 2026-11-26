import { beforeEach, describe, expect, it, vi } from "vitest";

const { generateWithOllama } = vi.hoisted(() => ({
  generateWithOllama: vi.fn(),
}));

vi.mock("../providers/ollama", () => ({
  generateWithOllama,
}));

import { buildScienceAnswer } from "../answer-builder";
import { detectScienceTopic } from "../science-router";

describe("buildScienceAnswer Roman Urdu switching", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    generateWithOllama.mockResolvedValue(
      "Force kisi object ki motion ya direction ko change kar sakti hai.",
    );
  });

  it("asks Ollama to rephrase the previous answer for a Roman Urdu switch", async () => {
    const previousAnswer =
      "Force is a push or pull that can change an object's motion.";

    await buildScienceAnswer(
      "roman urdu ma bolo",
      detectScienceTopic("Force kya hoti hai?"),
      [
        { role: "user", content: "Force kya hoti hai?" },
        { role: "assistant", content: previousAnswer },
      ],
    );

    expect(generateWithOllama).toHaveBeenCalledOnce();
    const prompt = generateWithOllama.mock.calls[0][0] as string;

    expect(prompt).toContain("required response language is Roman Urdu");
    expect(prompt).toContain(previousAnswer);
    expect(prompt).toContain("Do not answer the language-switch command as a new science question.");
  });

  it("returns only the rephrased answer during a language switch", async () => {
    const result = await buildScienceAnswer(
      "jawab roman urdu mein do",
      detectScienceTopic("Force kya hoti hai?"),
      [
        { role: "user", content: "Force kya hoti hai?" },
        {
          role: "assistant",
          content: "Force is a push or pull that can change an object\u0027s motion.",
        },
      ],
    );

    expect(result.explanation).toBe(
      "Force kisi object ki motion ya direction ko change kar sakti hai.",
    );
    expect(result.introduction).toBe("");
    expect(result.formula).toBeNull();
    expect(result.example).toBeNull();
    expect(result.calculation).toBeNull();
    expect(result.topicMatch).toBeNull();
    expect(result.responsePlan).toBeNull();
    expect(result.learning).toBeNull();
    expect(result.formulas).toEqual([]);
    expect(result.calculators).toEqual([]);
    expect(result.guides).toEqual([]);
  });

  it("rejects Urdu-script output when Roman Urdu was requested", async () => {
    generateWithOllama.mockResolvedValue("Force کیا ہے؟ یہ ایک push ya pull hai.");

    const result = await buildScienceAnswer(
      "Force kya hoti hai?",
      detectScienceTopic("Force kya hoti hai?"),
      [],
    );

    expect(result.explanation).not.toContain("کیا");
    expect(result.explanation).not.toContain("یہ ایک");
  });

  it("retries once when the first Roman Urdu response is invalid", async () => {
    generateWithOllama
      .mockResolvedValueOnce("Force is a push or pull.")
      .mockResolvedValueOnce("Force ek push ya pull hoti hai.");

    const result = await buildScienceAnswer(
      "Force kya hoti hai?",
      detectScienceTopic("Force kya hoti hai?"),
      [],
    );

    expect(generateWithOllama).toHaveBeenCalledTimes(2);
    expect(generateWithOllama.mock.calls[1][0]).toContain(
      "Return only the corrected Roman Urdu answer.",
    );
    expect(result.explanation).toBe("Force ek push ya pull hoti hai.");
  });

  it("does not fall back to English knowledge when Roman Urdu is required", async () => {
    generateWithOllama.mockResolvedValue(
      "Force is a vector quantity that measures a push or pull.",
    );

    const result = await buildScienceAnswer(
      "Force kya hoti hai?",
      detectScienceTopic("Force kya hoti hai?"),
      [],
    );

    expect(result.explanation).toBe(
      "Force aik dhakka ya khainchao hoti hai jo kisi cheez ki harkat, raftaar, ya simt badal sakti hai. Newton ke Second Law ke mutabiq, net force mass aur acceleration ko multiply karne se milti hai.",
    );
    expect(result.explanation).not.toContain("Force is a vector quantity");
    expect(result.explanation).not.toMatch(/[\u0600-\u06FF]/u);
  });

  it("uses the previous science topic's curated Roman Urdu fallback on a failed switch", async () => {
    generateWithOllama.mockResolvedValue(
      "Force is a vector quantity that measures a push or pull.",
    );

    const result = await buildScienceAnswer(
      "roman ma bolo",
      detectScienceTopic("roman ma bolo"),
      [
        { role: "user", content: "Force kya hoti hai?" },
        {
          role: "assistant",
          content: "Force is a push or pull that can change an object's motion.",
        },
      ],
    );

    expect(result.explanation).toBe(
      "Force aik dhakka ya khainchao hoti hai jo kisi cheez ki harkat, raftaar, ya simt badal sakti hai. Newton ke Second Law ke mutabiq, net force mass aur acceleration ko multiply karne se milti hai.",
    );
    expect(result.explanation).not.toMatch(/[\u0600-\u06FF]/u);
  });

  it("uses an English fallback when Ollama is unavailable", async () => {
    generateWithOllama.mockRejectedValueOnce(
      new Error("Ollama unavailable"),
    );

    await expect(
      buildScienceAnswer(
        "Explain an unknown scientific phenomenon",
        detectScienceTopic("Explain an unknown scientific phenomenon"),
        [],
      ),
    ).rejects.toThrow("Ollama unavailable");
  });

  it("preserves curated science fallback when AI provider fails", async () => {
    generateWithOllama.mockRejectedValueOnce(
      new Error("Provider temporarily unavailable"),
    );

    const result = await buildScienceAnswer(
      "What is force?",
      detectScienceTopic("What is force?"),
      [],
    );

    expect(result.explanation).toBeTruthy();
    expect(result.explanation).not.toContain(
      "I couldn't generate a reliable answer",
    );
    expect(result.topicMatch).not.toBeNull();
  });

  it("preserves a normal English response", async () => {
    const englishAnswer = "Force is a push or pull that can change motion.";
    generateWithOllama.mockResolvedValue(englishAnswer);

    const result = await buildScienceAnswer(
      "What is force?",
      detectScienceTopic("What is force?"),
      [],
    );

    expect(result.explanation).toBe(englishAnswer);
  });

  it("does not activate the switch override for a normal science question", async () => {
    await buildScienceAnswer(
      "What is force?",
      detectScienceTopic("What is force?"),
      [],
    );

    const prompt = generateWithOllama.mock.calls[0][0] as string;

    expect(prompt).toContain("No language-switch command was detected.");
    expect(prompt).toContain("Current user question (answer this now): What is force?");
  });
});


describe("English translation switching", () => {
  const previousAnswer =
    "Linear thermal expansion ka matlab hai ke temperature barhne se solid ki lambai mein izafa hota hai.";

  const conversation = [
    {
      role: "user" as const,
      content: "linear thermal expansion kya hai",
    },
    {
      role: "assistant" as const,
      content: previousAnswer,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    generateWithOllama.mockResolvedValue(
      "Linear thermal expansion is the increase in the length of a solid due to a rise in temperature."
    );
  });

  it.each([
    "english ma bato",
    "englsh ma bato",
    "englis ma btao",
    "english ma btao",
    "english mein batao",
    "mujhe is def ko english ma btao",
  ])("requests faithful English translation: %s", async (question) => {
    await buildScienceAnswer(
      question,
      detectScienceTopic(question),
      conversation,
    );

    expect(generateWithOllama).toHaveBeenCalledOnce();

    const prompt = generateWithOllama.mock.calls[0][0] as string;

    expect(prompt).toContain(
      "required response language is English"
    );

    expect(prompt).toContain(
      "translate it faithfully into natural English"
    );

    expect(prompt).toContain(previousAnswer);
  });

  it("returns the English explanation", async () => {
    const result = await buildScienceAnswer(
      "english ma bato",
      detectScienceTopic("english ma bato"),
      conversation,
    );

    expect(result.explanation).toBe(
      "Linear thermal expansion is the increase in the length of a solid due to a rise in temperature."
    );
  });
});


describe("Multi-subject response metadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not report science confidence for a history answer", async () => {
    generateWithOllama.mockResolvedValue(
      "Pakistan gained independence on August 14, 1947."
    );

    const question = "When did Pakistan gain independence?";

    const result = await buildScienceAnswer(
      question,
      detectScienceTopic(question),
      [],
    );

    expect(result.explanation).toContain("1947");
    expect(result.topicMatch).toBeNull();
    expect(result.confidence).toBeNull();
    expect(result.responsePlan).toBeNull();
    expect(result.learning).toEqual({
      difficulty: "beginner",
      practiceQuestion: "What would you like to explore next?",
      nextTopic: null,
    });
  });

  it("preserves metadata for a matched science topic", async () => {
    generateWithOllama.mockResolvedValue(
      "Force is a push or pull."
    );

    const question = "What is force?";

    const result = await buildScienceAnswer(
      question,
      detectScienceTopic(question),
      [],
    );

    expect(result.topicMatch).not.toBeNull();
    expect(result.confidence).not.toBeNull();
    expect(result.learning).not.toBeNull();
    expect(result.learning?.nextTopic).not.toBeNull();
  });
});
