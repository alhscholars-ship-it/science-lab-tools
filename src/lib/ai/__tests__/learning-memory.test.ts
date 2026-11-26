import {
  describe,
  expect,
  it,
} from "vitest";

import {
  LEARNING_MEMORY_KEY,
  clearLearningMemory,
  createDefaultLearningMemory,
  isLearningMemory,
  loadLearningMemory,
  recordLearningFeedback,
  saveLearningMemory,
} from "../learning-memory";

function createMockStorage() {
  const values = new Map<string, string>();

  return {
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      values.set(key, value);
    },
    removeItem(key: string) {
      values.delete(key);
    },
  };
}

describe("AI learning memory privacy", () => {
  it("starts with memory disabled", () => {
    const memory = createDefaultLearningMemory();

    expect(memory.enabled).toBe(false);
    expect(memory.language).toBe("English");
    expect(memory.level).toBe("beginner");
  });

  it("does not save memory without consent", () => {
    const storage = createMockStorage();
    const memory = createDefaultLearningMemory();

    expect(saveLearningMemory(storage, memory)).toBe(false);
    expect(storage.getItem(LEARNING_MEMORY_KEY)).toBeNull();
  });

  it("saves explicitly enabled preferences", () => {
    const storage = createMockStorage();

    const memory = {
      ...createDefaultLearningMemory(),
      enabled: true,
      language: "Roman Urdu" as const,
    };

    expect(saveLearningMemory(storage, memory)).toBe(true);
    expect(loadLearningMemory(storage)).toEqual(memory);
  });

  it("rejects invalid stored data", () => {
    const storage = createMockStorage();

    storage.setItem(
      LEARNING_MEMORY_KEY,
      JSON.stringify({
        enabled: true,
        language: "Invalid",
        level: "beginner",
        feedback: {
          helpful: 0,
          notHelpful: 0,
        },
      }),
    );

    expect(loadLearningMemory(storage)).toEqual(
      createDefaultLearningMemory(),
    );
  });

  it("rejects malformed JSON", () => {
    const storage = createMockStorage();

    storage.setItem(LEARNING_MEMORY_KEY, "{broken");

    expect(loadLearningMemory(storage)).toEqual(
      createDefaultLearningMemory(),
    );
  });

  it("records feedback only when enabled", () => {
    const disabled = createDefaultLearningMemory();

    expect(
      recordLearningFeedback(disabled, "helpful"),
    ).toEqual(disabled);

    const enabled = {
      ...disabled,
      enabled: true,
    };

    const updated = recordLearningFeedback(
      enabled,
      "not-helpful",
    );

    expect(updated.feedback.notHelpful).toBe(1);
    expect(updated.feedback.helpful).toBe(0);
  });

  it("clears saved memory", () => {
    const storage = createMockStorage();

    const memory = {
      ...createDefaultLearningMemory(),
      enabled: true,
    };

    saveLearningMemory(storage, memory);

    expect(clearLearningMemory(storage)).toBe(true);

    expect(storage.getItem(LEARNING_MEMORY_KEY)).toBeNull();
  });

  it("validates memory structure", () => {
    expect(
      isLearningMemory(createDefaultLearningMemory()),
    ).toBe(true);

    expect(
      isLearningMemory({
        ...createDefaultLearningMemory(),
        feedback: {
          helpful: -1,
          notHelpful: 0,
        },
      }),
    ).toBe(false);
  });
});
