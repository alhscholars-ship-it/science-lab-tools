import type { ScienceTopicKnowledge } from "./knowledge/types";


export type LearningResponse = {
  difficulty: "beginner" | "intermediate" | "advanced";
  practiceQuestion: string;
  nextTopic: string | null;
};


export function createLearningResponse(
  knowledge: ScienceTopicKnowledge | null,
): LearningResponse {


  if (!knowledge) {

    return {
      difficulty: "beginner",
      practiceQuestion:
        "Ask a science question to start learning.",
      nextTopic: null,
    };

  }


  return {

    difficulty:
      "beginner",

    practiceQuestion:
      `Can you explain ${knowledge.title} in your own words?`,

    nextTopic:
      knowledge.title,

  };

}
