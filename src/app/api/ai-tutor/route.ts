import { NextResponse } from "next/server";

import { buildScienceAnswer } from "@/lib/ai/answer-builder";
import { detectScienceTopic } from "@/lib/ai/science-router";


export async function POST(request: Request) {

  try {

    const body =
      await request.json();


    const question =
      typeof body.question === "string"
        ? body.question.trim()
        : "";


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


    const route =
      detectScienceTopic(question);


    const response =
      buildScienceAnswer(
        question,
        route,
      );


    return NextResponse.json({
      success: true,
      data: response,
      error: null,
    });


  } catch {

    return NextResponse.json(
      {
        success: false,
        data: null,
        error:
          "Unable to process request.",
      },
      {
        status: 500,
      },
    );

  }

}
