"use client";

import { useState, type FormEvent } from "react";

import {
  calculateKirchhoffsLaw,
  type KirchhoffsLawDetails,
  type KirchhoffsLawMode,
} from "@/lib/calculators/kirchhoffs-law";
import type { CalculationResult } from "@/types/calculator";

type KirchhoffsLawResult =
  CalculationResult<KirchhoffsLawDetails>;

const MIN_TERM_COUNT = 2;
const MAX_TERM_COUNT = 6;
const DEFAULT_TERM_COUNT = 3;

const examples = [
  {
    label: "KCL branch currents",
    mode: "kcl" as const,
    values: ["5", "-2", ""],
    unknownIndex: 2,
  },
  {
    label: "KVL voltage loop",
    mode: "kvl" as const,
    values: ["12", "-4", "-3", ""],
    unknownIndex: 3,
  },
  {
    label: "Find first current",
    mode: "kcl" as const,
    values: ["", "-2", "-3"],
    unknownIndex: 0,
  },
] as const;

function createEmptyValues(
  count: number,
): string[] {
  return Array.from({ length: count }, () => "");
}

function getModeCopy(mode: KirchhoffsLawMode) {
  if (mode === "kcl") {
    return {
      lawName: "Kirchhoff's Current Law",
      shortName: "KCL",
      quantity: "current",
      pluralQuantity: "currents",
      symbol: "I",
      unit: "A",
      heading: "Solve a junction-current problem",
      instruction:
        "Enter signed branch currents and select the unknown current.",
      directionNote:
        "Use positive values for currents entering the junction and negative values for currents leaving it, or use the opposite convention consistently.",
    };
  }

  return {
    lawName: "Kirchhoff's Voltage Law",
    shortName: "KVL",
    quantity: "voltage",
    pluralQuantity: "voltages",
    symbol: "V",
    unit: "V",
    heading: "Solve a closed-loop voltage problem",
    instruction:
      "Enter signed voltage rises and drops and select the unknown voltage.",
    directionNote:
      "Use positive values for voltage rises and negative values for voltage drops, or use the opposite convention consistently.",
  };
}

export function KirchhoffsLawCalculator() {
  const [mode, setMode] =
    useState<KirchhoffsLawMode>("kcl");

  const [values, setValues] = useState<string[]>(
    createEmptyValues(DEFAULT_TERM_COUNT),
  );

  const [unknownIndex, setUnknownIndex] = useState(
    DEFAULT_TERM_COUNT - 1,
  );

  const [result, setResult] =
    useState<KirchhoffsLawResult | null>(null);

  const [error, setError] = useState("");

  const modeCopy = getModeCopy(mode);

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function changeMode(
    nextMode: KirchhoffsLawMode,
  ) {
    setMode(nextMode);
    setValues(
      createEmptyValues(DEFAULT_TERM_COUNT),
    );
    setUnknownIndex(DEFAULT_TERM_COUNT - 1);
    setResult(null);
    setError("");
  }

  function updateValue(
    index: number,
    value: string,
  ) {
    setValues((currentValues) =>
      currentValues.map((currentValue, valueIndex) =>
        valueIndex === index
          ? value
          : currentValue,
      ),
    );

    clearFeedback();
  }

  function changeUnknownIndex(index: number) {
    setUnknownIndex(index);

    setValues((currentValues) =>
      currentValues.map((value, valueIndex) =>
        valueIndex === index ? "" : value,
      ),
    );

    clearFeedback();
  }

  function addTerm() {
    if (values.length >= MAX_TERM_COUNT) {
      return;
    }

    setValues((currentValues) => [
      ...currentValues,
      "",
    ]);

    clearFeedback();
  }

  function removeTerm() {
    if (values.length <= MIN_TERM_COUNT) {
      return;
    }

    const nextLength = values.length - 1;

    setValues((currentValues) =>
      currentValues.slice(0, nextLength),
    );

    setUnknownIndex((currentIndex) =>
      currentIndex >= nextLength
        ? nextLength - 1
        : currentIndex,
    );

    clearFeedback();
  }

  function buildInput(
    selectedMode: KirchhoffsLawMode,
    inputValues: readonly string[],
    selectedUnknownIndex: number,
  ) {
    const numericValues = inputValues.map(
      (rawValue, index) => {
        if (index === selectedUnknownIndex) {
          return 0;
        }

        const trimmedValue = rawValue.trim();

        if (trimmedValue === "") {
          throw new Error(
            `Enter ${getModeCopy(selectedMode).quantity} ${index + 1}.`,
          );
        }

        const numericValue = Number(trimmedValue);

        if (!Number.isFinite(numericValue)) {
          throw new Error(
            `${getModeCopy(selectedMode).quantity[0].toUpperCase()}${getModeCopy(selectedMode).quantity.slice(1)} ${index + 1} must be a finite number.`,
          );
        }

        return numericValue;
      },
    );

    return {
      mode: selectedMode,
      values: numericValues,
      unknownIndex: selectedUnknownIndex,
    };
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setResult(null);
    setError("");

    try {
      const calculationResult =
        calculateKirchhoffsLaw(
          buildInput(
            mode,
            values,
            unknownIndex,
          ),
        );

      setResult(calculationResult);

      setValues((currentValues) =>
        currentValues.map((value, index) =>
          index === unknownIndex
            ? String(calculationResult.value)
            : value,
        ),
      );
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const exampleValues = [...example.values];

      const calculationResult =
        calculateKirchhoffsLaw(
          buildInput(
            example.mode,
            exampleValues,
            example.unknownIndex,
          ),
        );

      setMode(example.mode);
      setUnknownIndex(example.unknownIndex);

      setValues(
        exampleValues.map((value, index) =>
          index === example.unknownIndex
            ? String(calculationResult.value)
            : value,
        ),
      );

      setResult(calculationResult);
      setError("");
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The example could not be loaded.",
      );
    }
  }

  function resetCalculator() {
    setMode("kcl");
    setValues(
      createEmptyValues(DEFAULT_TERM_COUNT),
    );
    setUnknownIndex(DEFAULT_TERM_COUNT - 1);
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form
        className="calculator-form"
        onSubmit={calculate}
        noValidate
      >
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              {modeCopy.instruction}
            </p>

            <h2>{modeCopy.heading}</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="kirchhoff-law-mode">
              Select Kirchhoff law
            </label>

            <select
              id="kirchhoff-law-mode"
              value={mode}
              onChange={(event) =>
                changeMode(
                  event.target
                    .value as KirchhoffsLawMode,
                )
              }
            >
              <option value="kcl">
                Kirchhoff&apos;s Current Law (KCL)
              </option>

              <option value="kvl">
                Kirchhoff&apos;s Voltage Law (KVL)
              </option>
            </select>
          </div>

          <div className="form-field dilution-solve-field">
            <label htmlFor="kirchhoff-unknown-index">
              Calculate which {modeCopy.quantity}?
            </label>

            <select
              id="kirchhoff-unknown-index"
              value={unknownIndex}
              onChange={(event) =>
                changeUnknownIndex(
                  Number(event.target.value),
                )
              }
            >
              {values.map((_, index) => (
                <option
                  key={index}
                  value={index}
                >
                  {modeCopy.quantity[0].toUpperCase()}
                  {modeCopy.quantity.slice(1)}{" "}
                  {index + 1} ({modeCopy.symbol}
                  {index + 1})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="density-fields">
          {values.map((value, index) => {
            const isUnknown =
              index === unknownIndex;

            const inputId =
              `kirchhoff-${mode}-${index}`;

            return (
              <div
                className="form-field"
                key={`${mode}-${index}`}
              >
                <label htmlFor={inputId}>
                  {modeCopy.quantity[0].toUpperCase()}
                  {modeCopy.quantity.slice(1)}{" "}
                  {index + 1} ({modeCopy.symbol}
                  {index + 1})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={inputId}
                    name={`${modeCopy.symbol}${index + 1}`}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    placeholder={
                      isUnknown
                        ? "Calculated automatically"
                        : "Enter signed value"
                    }
                    value={value}
                    onChange={(event) =>
                      updateValue(
                        index,
                        event.target.value,
                      )
                    }
                    disabled={isUnknown}
                    aria-describedby={`${inputId}-help`}
                  />

                  <span>{modeCopy.unit}</span>
                </div>

                <p id={`${inputId}-help`}>
                  {isUnknown
                    ? `This ${modeCopy.quantity} will be calculated.`
                    : `Enter a positive or negative signed ${modeCopy.quantity}.`}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          {modeCopy.directionNote}
        </p>

        <div className="calculator-actions">
          <button
            className="button button--secondary"
            type="button"
            onClick={addTerm}
            disabled={
              values.length >= MAX_TERM_COUNT
            }
          >
            Add term
          </button>

          <button
            className="button button--secondary"
            type="button"
            onClick={removeTerm}
            disabled={
              values.length <= MIN_TERM_COUNT
            }
          >
            Remove term
          </button>
        </div>

        {error ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="calculator-actions">
          <button
            className="button button--primary"
            type="submit"
          >
            Calculate unknown{" "}
            {modeCopy.quantity}
          </button>

          <button
            className="button button--secondary"
            type="button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <div className="calculator-examples">
          <strong>Try an example:</strong>

          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              onClick={() =>
                loadExample(example)
              }
            >
              {example.label}
            </button>
          ))}
        </div>
      </form>

      <section
        className="calculator-result"
        aria-live="polite"
        aria-label="Kirchhoff's law calculation result"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              Calculated{" "}
              {getModeCopy(
                result.details.mode,
              ).quantity}
            </p>

            <p className="calculator-result__value">
              {getModeCopy(
                result.details.mode,
              ).symbol}
              {result.details.unknownIndex + 1} ={" "}
              {result.formattedValue}{" "}
              {getModeCopy(
                result.details.mode,
              ).unit}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Applied law</dt>
                <dd>
                  {
                    getModeCopy(
                      result.details.mode,
                    ).shortName
                  }
                </dd>
              </div>

              <div>
                <dt>Unknown position</dt>
                <dd>
                  Term{" "}
                  {result.details.unknownIndex + 1}
                </dd>
              </div>

              <div>
                <dt>Known-value sum</dt>
                <dd>
                  {result.details.knownSum}{" "}
                  {
                    getModeCopy(
                      result.details.mode,
                    ).unit
                  }
                </dd>
              </div>

              <div>
                <dt>Final signed sum</dt>
                <dd>
                  {result.details.totalSum}{" "}
                  {
                    getModeCopy(
                      result.details.mode,
                    ).unit
                  }
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <p>
                <strong>Law:</strong>{" "}
                {
                  getModeCopy(
                    result.details.mode,
                  ).lawName
                }
              </p>

              <p>
                <strong>Formula:</strong>{" "}
                {result.details.formula}
              </p>

              <p>
                <strong>Substitution:</strong>{" "}
                {result.details.substitution}
              </p>

              <p>
                <strong>Verification:</strong>{" "}
                {result.details.verification}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <p className="calculator-result__label">
              Result
            </p>

            <h2>
              Your Kirchhoff&apos;s law result will
              appear here
            </h2>

            <p>
              Select KCL or KVL, choose the unknown
              term, enter the remaining signed values,
              and press calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
