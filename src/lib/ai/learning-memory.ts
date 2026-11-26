export type LearningLanguage =
  | "English"
  | "Urdu"
  | "Roman Urdu";

export type LearningLevel =
  | "beginner"
  | "intermediate"
  | "advanced";

export type LearningFeedback =
  | "helpful"
  | "not-helpful";

export type LearningMemory = {
  enabled: boolean;
  language: LearningLanguage;
  level: LearningLevel;
  feedback: {
    helpful: number;
    notHelpful: number;
  };
};

export const LEARNING_MEMORY_KEY =
  "sciencecalchub-learning-memory-v1";

export function createDefaultLearningMemory(): LearningMemory {
  return {
    enabled: false,
    language: "English",
    level: "beginner",
    feedback: {
      helpful: 0,
      notHelpful: 0,
    },
  };
}

export function isLearningMemory(
  value: unknown,
): value is LearningMemory {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const memory = value as Record<string, unknown>;

  const feedback = memory.feedback;

  if (
    typeof feedback !== "object" ||
    feedback === null
  ) {
    return false;
  }

  const counts = feedback as Record<string, unknown>;

  return (
    typeof memory.enabled === "boolean" &&
    ["English", "Urdu", "Roman Urdu"].includes(
      String(memory.language),
    ) &&
    ["beginner", "intermediate", "advanced"].includes(
      String(memory.level),
    ) &&
    Number.isSafeInteger(counts.helpful) &&
    Number(counts.helpful) >= 0 &&
    Number.isSafeInteger(counts.notHelpful) &&
    Number(counts.notHelpful) >= 0
  );
}

export function loadLearningMemory(
  storage: Pick<Storage, "getItem">,
): LearningMemory {
  try {
    const raw = storage.getItem(LEARNING_MEMORY_KEY);

    if (!raw) {
      return createDefaultLearningMemory();
    }

    const parsed: unknown = JSON.parse(raw);

    if (!isLearningMemory(parsed)) {
      return createDefaultLearningMemory();
    }

    return parsed;
  } catch {
    return createDefaultLearningMemory();
  }
}

export function saveLearningMemory(
  storage: Pick<Storage, "setItem">,
  memory: LearningMemory,
): boolean {
  if (!memory.enabled || !isLearningMemory(memory)) {
    return false;
  }

  try {
    storage.setItem(
      LEARNING_MEMORY_KEY,
      JSON.stringify(memory),
    );

    return true;
  } catch {
    return false;
  }
}

export function clearLearningMemory(
  storage: Pick<Storage, "removeItem">,
): boolean {
  try {
    storage.removeItem(LEARNING_MEMORY_KEY);
    return true;
  } catch {
    return false;
  }
}

export function recordLearningFeedback(
  memory: LearningMemory,
  feedback: LearningFeedback,
): LearningMemory {
  if (!memory.enabled) {
    return memory;
  }

  return {
    ...memory,
    feedback: {
      helpful:
        memory.feedback.helpful +
        (feedback === "helpful" ? 1 : 0),
      notHelpful:
        memory.feedback.notHelpful +
        (feedback === "not-helpful" ? 1 : 0),
    },
  };
}
