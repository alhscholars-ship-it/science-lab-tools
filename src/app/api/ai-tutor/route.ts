import { NextResponse } from "next/server";

import { buildScienceAnswer } from "@/lib/ai/answer-builder";
import { classifyProviderFailure } from "@/lib/ai/provider-failure";
import { AIProviderError } from "@/lib/ai/providers/cloud";
import { detectScienceTopic } from "@/lib/ai/science-router";
import { guardAIRequest } from "@/lib/ai/security/api-guard";
import { getAIClientIdentifier } from "@/lib/ai/security/client-identity";

type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

function validateConversation(value: unknown): ConversationMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is { role: string; content: string } =>
        typeof item === "object" &&
        item !== null &&
        "role" in item &&
        "content" in item &&
        typeof item.role === "string" &&
        typeof item.content === "string" &&
        (item.role === "user" || item.role === "assistant"),
    )
    .slice(-8)
    .map((item) => ({
      role: item.role as "user" | "assistant",
      content: item.content.trim().slice(0, 1200),
    }))
    .filter((item) => item.content.length > 0);
}


function isContextualFollowUp(question: string): boolean {
  const text = question.trim().toLowerCase();

  return /^(why|how|what about|and|explain more|tell me more|give an example|can you explain|what does it mean|is it important|why is it important|how does it work|what happens next)\b/i.test(text)
    || /^(یہ کیوں|کیسے|اس کی اہمیت|مزید سمجھائیں|اس کے بارے میں)\b/.test(text);
}

function resolveScienceRoute(
  question: string,
  conversation: ConversationMessage[],
) {
  const currentRoute = detectScienceTopic(question);

  if (currentRoute.topic !== "general" || !isContextualFollowUp(question)) {
    return currentRoute;
  }

  for (const message of [...conversation].reverse()) {
    if (message.role !== "user") continue;

    const previousRoute = detectScienceTopic(message.content);

    if (previousRoute.topic !== "general") {
      return previousRoute;
    }
  }

  return currentRoute;
}

export async function POST(request: Request) {

  const guard = await guardAIRequest(
    getAIClientIdentifier(request),
  );

  if (!guard.allowed) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: guard.error,
      },
      {
        status: guard.status,
        headers:
          guard.retryAfter !== undefined
            ? {
                "Retry-After": String(guard.retryAfter),
              }
            : undefined,
      },
    );
  }

  try {

    const body =
      await request.json();


    const question =
      typeof body.question === "string"
        ? body.question.trim()
        : "";

    const conversation = validateConversation(body.conversation);


    if (!question) {

      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            "Please enter a science question.",
        },
        {
          status: 400,
        },
      );

    }


    if (question.length > 1000) {

      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            "Question is too long.",
        },
        {
          status: 400,
        },
      );

    }


    const route = resolveScienceRoute(question, conversation);


    const response =
      await buildScienceAnswer(
        question,
        route,
        conversation,
      );


    return NextResponse.json({
      success: true,
      data: response,
      error: null,
    });


  } catch (error) {
    if (error instanceof AIProviderError) {
      const failure = classifyProviderFailure(error);

      return NextResponse.json(
        {
          success: false,
          data: null,
          error: failure.message,
        },
        {
          status: failure.kind === "rate_limited" ? 429 : 503,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: "Unable to process request.",
      },
      {
        status: 500,
      },
    );
  }

}
