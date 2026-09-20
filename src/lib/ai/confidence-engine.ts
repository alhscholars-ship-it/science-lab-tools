import type { TopicMatch } from "./topic-matcher";


export type ConfidenceResult = {
  score: number;
  level: "high" | "medium" | "low";
  canAnswer: boolean;
};


export function evaluateConfidence(
  topic: TopicMatch | null,
): ConfidenceResult {


  if (!topic) {

    return {
      score: 0,
      level: "low",
      canAnswer: false,
    };

  }


  const score =
    topic.confidence;


  if (score >= 0.7) {

    return {
      score,
      level: "high",
      canAnswer: true,
    };

  }


  if (score >= 0.3) {

    return {
      score,
      level: "medium",
      canAnswer: true,
    };

  }


  return {
    score,
    level: "low",
    canAnswer: false,
  };

}
