import type { ScienceRoute } from "./science-router";
import { detectCalculator } from "./calculator-detector";
import { extractValues } from "./value-extractor";
import { calculateScience } from "./calculation-engine";
import { retrieveScienceKnowledge } from "./knowledge-retriever";
import { evaluateConfidence } from "./confidence-engine";
import { createLearningResponse } from "./learning-engine";
import { createResponsePlan } from "./response-planner";


export function buildScienceAnswer(
  question: string,
  route: ScienceRoute,
) {

  const {
    knowledge,
    topic: topicMatch,
  } =
    retrieveScienceKnowledge(question);

  const confidence =
    evaluateConfidence(topicMatch);

  const responsePlan =
    createResponsePlan(
      knowledge,
      confidence,
    );

  const learning =
    createLearningResponse(
      knowledge,
    );

  const calculator =
    detectCalculator(question);

  const values =
    extractValues(question);

  const calculation =
    calculateScience(
      route.topic,
      values,
    );



  return {

    introduction:
      knowledge
        ? `Topic: ${knowledge.title}`
        : `You asked: ${question}. This is a ${route.topic} related question.`,



    explanation:
      knowledge
        ? knowledge.explanation
        : "The AI Science Tutor will explain this scientific concept step by step with scientific reasoning.",



    formula:
      knowledge?.formula || null,


    example:
      knowledge?.example || null,

    calculation,

    topicMatch,

    confidence,

    responsePlan,

    learning,

    formulas:
      route.formulas,


    calculators:
      calculator
        ? [
            calculator.href,
          ]
        : route.calculators,


    guides:
      route.guides,

  };

}
