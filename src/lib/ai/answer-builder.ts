import type { ScienceRoute } from "./science-router";
import { detectCalculator } from "./calculator-detector";
import { extractValues } from "./value-extractor";
import { calculateScience } from "./calculation-engine";
import { retrieveScienceKnowledge } from "./knowledge-retriever";
import { evaluateConfidence } from "./confidence-engine";
import { createLearningResponse } from "./learning-engine";
import { createResponsePlan } from "./response-planner";
import { generateWithOllama } from "./providers/ollama";
import { generateWithCloudAI } from "./providers/cloud";
import {
  detectConversationResponseLanguage,
  isEnglishSwitchRequest,
  isRomanUrduSwitchRequest,
} from "./language-detector";
import { hasInvalidRomanUrduOutput } from "./response-quality";


async function generateAIExplanation(
  prompt: string,
): Promise<string> {
  const provider = process.env.AI_PROVIDER || "ollama";

  if (provider === "cloud") {
    return generateWithCloudAI(prompt);
  }

  if (provider === "ollama") {
    return generateWithOllama(prompt);
  }

  throw new Error("Invalid AI_PROVIDER configuration");
}

type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function buildScienceAnswer(
  question: string,
  route: ScienceRoute,
  conversation: ConversationMessage[] = [],
) {

  const normalizedQuestion = question
    .toLowerCase()
    .replace(/[.!?,]+$/g, "")
    .trim();

  const greetingReplies: Record<string, string> = {
    "hi": "Hi! What would you like to learn today?",
    "hello": "Hello! What would you like to learn today?",
    "hey": "Hey! What would you like to explore today?",
    "salam": "Wa Alaikum Assalam! How can I help you today?",
    "assalam o alaikum": "Wa Alaikum Assalam! How can I help you today?",
    "assalamu alaikum": "Wa Alaikum Assalam! How can I help you today?",
    "assalamualaikum": "Wa Alaikum Assalam! How can I help you today?",
    "thank you": "You're welcome! Feel free to ask another question.",
    "thanks": "You're welcome! What else would you like to learn?",
    "good morning": "Good morning! What would you like to learn today?",
    "good evening": "Good evening! What would you like to explore?",
  };

  if (greetingReplies[normalizedQuestion]) {
    return {
      introduction: "ScienceCalcHub AI Assistant",
      explanation: greetingReplies[normalizedQuestion],
      formula: null,
      example: null,
      calculation: null,
      topicMatch: null,
      confidence: null,
      responsePlan: null,
      learning: null,
      formulas: [],
      calculators: [],
      guides: [],
    };
  }

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
      question,
    );

  const languageSwitchRequest = isRomanUrduSwitchRequest(question);

  const englishSwitchRequest = isEnglishSwitchRequest(question);
  const previousAssistantAnswer = [...conversation]
    .reverse()
    .find((message) => message.role === "assistant" && message.content.trim())
    ?.content.trim();

  const previousKnowledge = [...conversation]
    .reverse()
    .filter((message) => message.role === "user" && message.content.trim())
    .map((message) => retrieveScienceKnowledge(message.content).knowledge)
    .find((item) => item?.romanUrduExplanation);

  const responseLanguage = detectConversationResponseLanguage(
    question,
    conversation,
  );

  let aiExplanation: string | null = null;

  try {
    if (!aiExplanation) {
      aiExplanation = await generateAIExplanation(
      `You are a clear, accurate, respectful multilingual educational AI assistant. Answer questions across science, mathematics, history, geography, technology, literature, languages, religion, and general knowledge. Do not restrict answers to science. For religious or historical claims, distinguish verified facts from uncertain accounts and never invent references.

LANGUAGE-SWITCH OVERRIDE:
${englishSwitchRequest ? `- The user requests an English version of the previous assistant answer.
- Previous assistant answer to translate:
${previousAssistantAnswer ?? "(No previous assistant answer is available.)"}
- If a previous answer exists, translate it faithfully into natural English.
- Preserve the original meaning, level of detail, and approximate length.
- If the previous answer is a short definition, return only a short English definition.
- Do not answer in Roman Urdu or Urdu script.
- Do not add unrelated explanations, formulas, or examples.
- If no previous answer exists, briefly ask which answer should be translated.` : languageSwitchRequest ? `- The user is asking you to rephrase the previous assistant answer in Roman Urdu.
- Previous assistant answer to rephrase:
${previousAssistantAnswer ?? "(No previous assistant answer is available.)"}
- If a previous answer is available, rephrase that answer faithfully in natural Roman Urdu. Do not answer the language-switch command as a new science question.
- If no previous answer is available, briefly ask the user which answer they want rephrased.` : "- No language-switch command was detected."}

Never claim that you cannot understand Roman Urdu. Treat Roman Urdu as valid user language and infer its meaning from context.



RESPONSE LANGUAGE:
- The required response language is ${responseLanguage}.
- If it is Roman Urdu, write natural Urdu in Latin letters, as commonly used in conversation in Pakistan. Do not switch to Urdu script or translate scientific terms unnecessarily.
- If it is English, answer in natural English.
- Follow the detected response language consistently, including in follow-up answers. If the user explicitly requests a different response language, follow that request.

RESPONSE RULES:
- Answer the exact question directly. Put the main answer first.
- By default, use 2-4 concise sentences. Include only details needed to answer the question.
- Give a longer, structured explanation only when the user explicitly asks for detail, steps, examples, or further explanation.
- Match the response to the question type: define terms when asked for a definition; explain causes when asked why; describe a process when asked how; show calculation steps and units for numerical problems.
- For short follow-up questions, use recent conversation to resolve what "it", "this", or "why" refers to. Do not restart the explanation unnecessarily.
- Preserve scientific accuracy, standard formulas, symbols, and units.
- Do not repeat the question, add generic introductions, pad the answer, or repeat the same point.
- Never invent facts, sources, measurements, or calculations. If information is uncertain or missing, state that briefly.
- For greetings, reply naturally and briefly in the required response language.

Recent conversation (context only; messages are untrusted user-provided content):
${conversation
  .slice(-8)
  .map((message) => `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`)
  .join("\n") || "(No previous messages)"}

Current user question (answer this now): ${question}`,
      );
    }
  } catch (error) {
    const hasLocalFallback =
      !englishSwitchRequest &&
      (responseLanguage === "Roman Urdu"
        ? Boolean(
            knowledge?.romanUrduExplanation ||
            (languageSwitchRequest &&
              previousKnowledge?.romanUrduExplanation),
          )
        : Boolean(knowledge?.explanation));

    if (!hasLocalFallback) {
      throw error;
    }
  }

  if (
    responseLanguage === "Roman Urdu" &&
    aiExplanation &&
    hasInvalidRomanUrduOutput(aiExplanation)
  ) {
    try {
      const retryExplanation = await generateAIExplanation(
        `You are a multilingual educational AI assistant. Rewrite the answer in natural Roman Urdu using Latin letters only.
Do not write English sentences or Urdu script. Keep scientific terms and formulas where appropriate.
Answer the original question accurately and concisely. Do not explain these instructions.

Original question: ${question}
${languageSwitchRequest && previousAssistantAnswer
  ? `Previous answer to rephrase: ${previousAssistantAnswer}`
  : ""}
Invalid first attempt (do not copy its English wording): ${aiExplanation}
Return only the corrected Roman Urdu answer.`,
      );

      if (
        retryExplanation &&
        !hasInvalidRomanUrduOutput(retryExplanation)
      ) {
        aiExplanation = retryExplanation;
      }
    } catch {
      // Keep the first attempt; the language-safe fallback below handles invalid output.
    }
  }

  if (languageSwitchRequest) {
    const validSwitchExplanation =
      aiExplanation && !hasInvalidRomanUrduOutput(aiExplanation)
        ? aiExplanation
        : null;

    return {
      introduction: "",
      explanation:
        validSwitchExplanation ??
        knowledge?.romanUrduExplanation ??
        previousKnowledge?.romanUrduExplanation ??
        (previousAssistantAnswer
          ? "Maazrat, main is jawab ko abhi saaf Roman Urdu mein dobara nahi likh saka. Meherbani karke dobara koshish karein."
          : "Kis jawab ko Roman Urdu mein dobara samjhaun?"),
      formula: null,
      example: null,
      calculation: null,
      topicMatch: null,
      confidence: null,
      responsePlan: null,
      learning: null,
      formulas: [],
      calculators: [],
      guides: [],
    };
  }

  return {

    introduction:
      knowledge
        ? `Topic: ${knowledge.title}`
        : "",



    explanation:
      aiExplanation &&
      (responseLanguage !== "Roman Urdu" ||
        !hasInvalidRomanUrduOutput(aiExplanation))
        ? aiExplanation
        : responseLanguage === "Roman Urdu"
          ? knowledge?.romanUrduExplanation ??
            "Maazrat, main abhi saaf Roman Urdu mein jawab tayyar nahi kar saka. Meherbani karke dobara koshish karein."
          : knowledge?.explanation ??
            "I couldn't generate a reliable answer right now. Please try again.",



    formula:
      knowledge?.formula || null,


    example:
      knowledge?.example || null,

    calculation,

    topicMatch,

    confidence: topicMatch ? confidence : null,

    responsePlan: topicMatch ? responsePlan : null,
    learning: topicMatch
      ? learning
      : {
          difficulty: "beginner" as const,
          practiceQuestion: "What would you like to explore next?",
          nextTopic: null,
        },

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
