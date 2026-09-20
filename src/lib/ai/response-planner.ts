import type { ConfidenceResult } from "./confidence-engine";
import type { ScienceKnowledge } from "./science-knowledge";


export type ResponsePlan = {
  showFormula: boolean;
  showExample: boolean;
  showCalculator: boolean;
  showQuiz: boolean;
};


export function createResponsePlan(
  knowledge: ScienceKnowledge | null,
  confidence: ConfidenceResult,
): ResponsePlan {


  if (!confidence.canAnswer) {

    return {
      showFormula: false,
      showExample: false,
      showCalculator: false,
      showQuiz: false,
    };

  }


  return {

    showFormula:
      Boolean(
        knowledge?.formula,
      ),


    showExample:
      Boolean(
        knowledge?.example,
      ),


    showCalculator:
      confidence.level === "high",


    showQuiz:
      true,

  };

}
