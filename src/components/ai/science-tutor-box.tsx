"use client";

import { useState } from "react";

import { AIResponseCard } from "./ai-response-card";

type TutorResponse = {
  introduction: string;
  explanation: string;
  formula: string | null;
  example: string | null;
  calculation: {
    name: string;
    result: string;
  } | null;
  formulas: string[];
  calculators: string[];
  guides: string[];

  topicMatch?: {
    title: string;
    category: string;
    confidence: number;
  };

  confidence?: {
    score: number;
    level: "high" | "medium" | "low";
    canAnswer: boolean;
  };

  learning?: {
    difficulty: "beginner" | "intermediate" | "advanced";
    practiceQuestion: string;
    nextTopic: string | null;
  };
};


export function ScienceTutorBox() {

  const [question, setQuestion] = useState("");

  const [response, setResponse] =
    useState<TutorResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [loadingMessage, setLoadingMessage] =
    useState("");


  async function askTutor() {

    if (!question.trim()) return;


    setLoading(true);
    setResponse(null);

    setLoadingMessage(
      "Analyzing science question...",
    );


    try {

      setLoadingMessage(
        "Finding the best explanation...",
      );

      const result = await fetch(
        "/api/ai-tutor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
          }),
        },
      );


      const apiResponse =
        await result.json();


      if (!apiResponse.success) {
        throw new Error(
          apiResponse.error || "Request failed",
        );
      }


      const data: TutorResponse =
        apiResponse.data;


      setResponse(data);


    } catch {

      setResponse({
        introduction:
          "Unable to process request.",

        explanation:
          "Please try again.",

        formula: null,
        example: null,
        calculation: null,
        formulas: [],
        calculators: [],
        guides: [],
      });


    } finally {

      setLoading(false);
      setLoadingMessage("");

    }

  }


  return (
    <section className="article-section">

      <div className="article-content">

        <h2>
          Ask AI Science Tutor
        </h2>


        <textarea
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          placeholder="Ask a science question..."
          rows={5}
        />


        <button
          type="button"
          onClick={askTutor}
          disabled={loading}
          className="button button--primary"
        >
          {loading
            ? "Thinking..."
            : "Ask Tutor"}
        </button>



        {response && (

          <div>

            <h3>
              Introduction
            </h3>

            <p>
              {response.introduction}
            </p>



            {response.topicMatch && (
              <AIResponseCard
                title="Topic Understanding"
              >
                <p>
                  {response.topicMatch.title}
                </p>

                <p>
                  Confidence:
                  {" "}
                  {Math.round(
                    response.topicMatch.confidence * 100,
                  )}%
                </p>
              </AIResponseCard>
            )}


            {response.confidence && (
              <AIResponseCard
                title="AI Confidence"
              >
                <p>
                  Level:
                  {" "}
                  {response.confidence.level}
                </p>
              </AIResponseCard>
            )}


            <AIResponseCard
              title="Explanation"
            >
              <p>
                {response.explanation}
              </p>
            </AIResponseCard>


            {response.learning && (
              <AIResponseCard
                title="Learning Assistant"
              >
                <p>
                  Level:
                  {" "}
                  {response.learning.difficulty}
                </p>

                <p>
                  Practice Question:
                  {" "}
                  {response.learning.practiceQuestion}
                </p>

                {response.learning.nextTopic && (
                  <p>
                    Next Topic:
                    {" "}
                    {response.learning.nextTopic}
                  </p>
                )}
              </AIResponseCard>
            )}


            {response.formula && (
              <AIResponseCard
                title="Formula"
              >
                <p>
                  {response.formula}
                </p>
              </AIResponseCard>
            )}


            {response.example && (
              <AIResponseCard
                title="Example"
              >
                <p>
                  {response.example}
                </p>
              </AIResponseCard>
            )}


            {response.calculation && (
              <AIResponseCard
                title="Calculation Result"
              >
                <p>
                  {response.calculation.name}
                </p>

                <p>
                  {response.calculation.result}
                </p>
              </AIResponseCard>
            )}


            {response.formulas.length > 0 && (
              <AIResponseCard
                title="Related Formulas"
              >
                <ul>
                  {response.formulas.map(
                    (formula) => (
                      <li key={formula}>
                        {formula}
                      </li>
                    ),
                  )}
                </ul>
              </AIResponseCard>
            )}



            {response.calculators.length > 0 && (
              <AIResponseCard
                title="Related Calculators"
              >
                <ul>
                  {response.calculators.map(
                    (calculator) => (
                      <li key={calculator}>
                        <a href={calculator}>
                          {calculator}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </AIResponseCard>
            )}



            {response.guides.length > 0 && (
              <AIResponseCard
                title="Related Guides"
              >
                <ul>
                  {response.guides.map(
                    (guide) => (
                      <li key={guide}>
                        <a href={guide}>
                          {guide}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </AIResponseCard>
            )}

          </div>

        )}

      </div>

    </section>
  );
}
