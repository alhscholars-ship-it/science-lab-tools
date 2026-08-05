"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import {
  calculateNormality,
  getNormalityVariableLabel,
  type NormalityDetails,
  type NormalityInput,
  type NormalityVariable,
  type NormalityVolumeUnit,
} from "@/lib/calculators/normality";

type NormalityResult =
  ReturnType<typeof calculateNormality>;

type Example = {
  title: string;
  description: string;
  solveFor: NormalityVariable;
  equivalents: string;
  solutionVolume: string;
  volumeUnit: NormalityVolumeUnit;
  normality: string;
};

const examples: readonly Example[] = [
  {
    title: "Find normality",
    description:
      "0.5 equivalents in 250 mL of solution",
    solveFor: "normality",
    equivalents: "0.5",
    solutionVolume: "250",
    volumeUnit: "mL",
    normality: "",
  },
  {
    title: "Find equivalents",
    description:
      "1.5 N solution with a volume of 400 mL",
    solveFor: "equivalents",
    equivalents: "",
    solutionVolume: "400",
    volumeUnit: "mL",
    normality: "1.5",
  },
  {
    title: "Find solution volume",
    description:
      "0.75 equivalents at 1.5 N",
    solveFor: "solutionVolume",
    equivalents: "0.75",
    solutionVolume: "",
    volumeUnit: "mL",
    normality: "1.5",
  },
] as const;

function parseRequiredNumber(
  value: string,
  label: string,
): number {
  if (!value.trim()) {
    throw new Error(`${label} is required.`);
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(
      `${label} must be a valid number.`,
    );
  }

  return parsedValue;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 10,
  }).format(value);
}

function getWorking(
  details: NormalityDetails,
): readonly string[] {
  const equivalents =
    formatNumber(details.equivalents);

  const liters =
    formatNumber(details.volumeInLiters);

  const normality =
    formatNumber(details.normality);

  switch (details.solvedVariable) {
    case "normality":
      return [
        "N = equivalents ÷ L solution",
        `N = ${equivalents} ÷ ${liters}`,
        `N = ${normality} N`,
      ];

    case "equivalents":
      return [
        "equivalents = N × L solution",
        `equivalents = ${normality} × ${liters}`,
        `equivalents = ${equivalents} eq`,
      ];

    case "solutionVolume": {
      const displayedVolume =
        formatNumber(details.solutionVolume);

      const lines = [
        "L solution = equivalents ÷ N",
        `L solution = ${equivalents} ÷ ${normality}`,
        `L solution = ${liters} L`,
      ];

      if (details.volumeUnit === "mL") {
        return [
          ...lines,
          `${liters} L × 1000 = ${displayedVolume} mL`,
        ];
      }

      return lines;
    }

    default: {
      const exhaustiveCheck: never =
        details.solvedVariable;

      return [
        `Unsupported variable: ${exhaustiveCheck}`,
      ];
    }
  }
}

export function NormalityCalculator() {
  const [solveFor, setSolveFor] =
    useState<NormalityVariable>("normality");

  const [equivalents, setEquivalents] =
    useState("");

  const [
    solutionVolume,
    setSolutionVolume,
  ] = useState("");

  const [volumeUnit, setVolumeUnit] =
    useState<NormalityVolumeUnit>("mL");

  const [normality, setNormality] =
    useState("");

  const [result, setResult] =
    useState<NormalityResult | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  function clearFeedback() {
    setResult(null);
    setError(null);
  }

  function buildInput(): NormalityInput {
    const input: NormalityInput = {
      solveFor,
      volumeUnit,
    };

    if (solveFor !== "equivalents") {
      input.equivalents =
        parseRequiredNumber(
          equivalents,
          "Solute equivalents",
        );
    }

    if (solveFor !== "solutionVolume") {
      input.solutionVolume =
        parseRequiredNumber(
          solutionVolume,
          "Solution volume",
        );
    }

    if (solveFor !== "normality") {
      input.normality =
        parseRequiredNumber(
          normality,
          "Normality",
        );
    }

    return input;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      const calculation =
        calculateNormality(buildInput());

      setResult(calculation);
      setError(null);
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function handleSolveForChange(
    variable: NormalityVariable,
  ) {
    setSolveFor(variable);
    clearFeedback();
  }

  function loadExample(example: Example) {
    setSolveFor(example.solveFor);
    setEquivalents(example.equivalents);
    setSolutionVolume(
      example.solutionVolume,
    );
    setVolumeUnit(example.volumeUnit);
    setNormality(example.normality);
    clearFeedback();
  }

  function resetCalculator() {
    setSolveFor("normality");
    setEquivalents("");
    setSolutionVolume("");
    setVolumeUnit("mL");
    setNormality("");
    clearFeedback();
  }

  const resultWorking =
    result
      ? getWorking(result.details)
      : [];

  return (
    <div className="calculator-panel">
      <form
        className="calculator-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="calculator-field">
          <label htmlFor="normality-solve-for">
            Solve for
          </label>

          <select
            id="normality-solve-for"
            value={solveFor}
            onChange={(event) =>
              handleSolveForChange(
                event.target
                  .value as NormalityVariable,
              )
            }
          >
            <option value="normality">
              Normality
            </option>

            <option value="equivalents">
              Solute equivalents
            </option>

            <option value="solutionVolume">
              Solution volume
            </option>
          </select>
        </div>

        <div className="calculator-grid">
          {solveFor !== "equivalents" ? (
            <div className="calculator-field">
              <label htmlFor="normality-equivalents">
                Solute equivalents
              </label>

              <input
                id="normality-equivalents"
                name="equivalents"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={equivalents}
                onChange={(event) => {
                  setEquivalents(
                    event.target.value,
                  );
                  clearFeedback();
                }}
                placeholder="For example, 0.5"
              />

              <p>
                Enter chemical equivalents for the
                reaction being analyzed.
              </p>
            </div>
          ) : null}

          {solveFor !== "solutionVolume" ? (
            <div className="calculator-field">
              <label htmlFor="normality-solution-volume">
                Solution volume
              </label>

              <input
                id="normality-solution-volume"
                name="solutionVolume"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={solutionVolume}
                onChange={(event) => {
                  setSolutionVolume(
                    event.target.value,
                  );
                  clearFeedback();
                }}
                placeholder="For example, 250"
              />

              <p>
                Enter the final total volume of the
                solution.
              </p>
            </div>
          ) : null}

          {solveFor !== "normality" ? (
            <div className="calculator-field">
              <label htmlFor="normality-value">
                Normality
              </label>

              <input
                id="normality-value"
                name="normality"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={normality}
                onChange={(event) => {
                  setNormality(
                    event.target.value,
                  );
                  clearFeedback();
                }}
                placeholder="For example, 1.5"
              />

              <p>
                Enter normality in equivalents per
                liter.
              </p>
            </div>
          ) : null}

          <div className="calculator-field">
            <label htmlFor="normality-volume-unit">
              Solution volume unit
            </label>

            <select
              id="normality-volume-unit"
              value={volumeUnit}
              onChange={(event) => {
                setVolumeUnit(
                  event.target
                    .value as NormalityVolumeUnit,
                );
                clearFeedback();
              }}
            >
              <option value="L">
                Liters (L)
              </option>

              <option value="mL">
                Milliliters (mL)
              </option>
            </select>

            <p>
              {solveFor === "solutionVolume"
                ? "The calculated solution volume will use this unit."
                : "Milliliters are converted to liters automatically."}
            </p>
          </div>
        </div>

        <div className="calculator-note">
          <strong>
            Reaction-specific equivalents:
          </strong>{" "}
          Normality depends on the chemical reaction.
          Convert moles to equivalents using the
          correct reaction-specific n-factor before
          entering the value.
        </div>

        {error ? (
          <div
            className="calculator-error"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button type="submit">
            Calculate
          </button>

          <button
            type="button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <section
          className="calculator-examples"
          aria-labelledby="normality-examples-heading"
        >
          <h2 id="normality-examples-heading">
            Try an example
          </h2>

          <div>
            {examples.map((example) => (
              <button
                key={example.title}
                type="button"
                onClick={() =>
                  loadExample(example)
                }
              >
                <strong>
                  {example.title}
                </strong>

                <span>
                  {example.description}
                </span>
              </button>
            ))}
          </div>
        </section>
      </form>

      <section
        className={`calculator-result ${
          result
            ? "calculator-result--complete"
            : ""
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              {getNormalityVariableLabel(
                result.details.solvedVariable,
              )}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Solute equivalents</dt>
                <dd>
                  {formatNumber(
                    result.details.equivalents,
                  )}{" "}
                  eq
                </dd>
              </div>

              <div>
                <dt>Solution volume</dt>
                <dd>
                  {formatNumber(
                    result.details
                      .solutionVolume,
                  )}{" "}
                  {result.details.volumeUnit}
                </dd>
              </div>

              <div>
                <dt>Volume in liters</dt>
                <dd>
                  {formatNumber(
                    result.details
                      .volumeInLiters,
                  )}{" "}
                  L
                </dd>
              </div>

              <div>
                <dt>Normality</dt>
                <dd>
                  {formatNumber(
                    result.details.normality,
                  )}{" "}
                  N
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation working</h3>

              {resultWorking.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <p>
              Select what you want to solve,
              enter the known values, and
              calculate the result.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
