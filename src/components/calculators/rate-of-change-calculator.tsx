"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRateOfChange,
  type RateOfChangeResult,
} from "@/lib/calculators/rate-of-change";

const examples = [
  {
    label: "Temperature rise",
    initialValue: "20",
    finalValue: "35",
    initialIndependentValue: "0",
    finalIndependentValue: "5",
  },
  {
    label: "Mass decrease",
    initialValue: "50",
    finalValue: "38",
    initialIndependentValue: "0",
    finalIndependentValue: "4",
  },
  {
    label: "No change",
    initialValue: "12",
    finalValue: "12",
    initialIndependentValue: "1",
    finalIndependentValue: "5",
  },
] as const;

const directionLabels = {
  increase: "Increase",
  decrease: "Decrease",
  "no change": "No change",
} as const;

export function RateOfChangeCalculator() {
  const [initialValue, setInitialValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [
    initialIndependentValue,
    setInitialIndependentValue,
  ] = useState("");
  const [
    finalIndependentValue,
    setFinalIndependentValue,
  ] = useState("");
  const [result, setResult] =
    useState<RateOfChangeResult | null>(null);
  const [error, setError] = useState("");

  function parseInput(
    input: string,
    label: string,
  ): number | null {
    const parsed = Number(input);

    if (
      input.trim() === "" ||
      !Number.isFinite(parsed)
    ) {
      setError(`Enter a valid ${label}.`);
      return null;
    }

    return parsed;
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    const parsedInitialValue = parseInput(
      initialValue,
      "initial value",
    );

    if (parsedInitialValue === null) {
      return;
    }

    const parsedFinalValue = parseInput(
      finalValue,
      "final value",
    );

    if (parsedFinalValue === null) {
      return;
    }

    const parsedInitialIndependentValue =
      parseInput(
        initialIndependentValue,
        "initial independent value",
      );

    if (
      parsedInitialIndependentValue === null
    ) {
      return;
    }

    const parsedFinalIndependentValue =
      parseInput(
        finalIndependentValue,
        "final independent value",
      );

    if (
      parsedFinalIndependentValue === null
    ) {
      return;
    }

    try {
      setResult(
        calculateRateOfChange({
          initialValue: parsedInitialValue,
          finalValue: parsedFinalValue,
          initialIndependentValue:
            parsedInitialIndependentValue,
          finalIndependentValue:
            parsedFinalIndependentValue,
        }),
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
    setInitialValue(example.initialValue);
    setFinalValue(example.finalValue);
    setInitialIndependentValue(
      example.initialIndependentValue,
    );
    setFinalIndependentValue(
      example.finalIndependentValue,
    );
    setError("");

    setResult(
      calculateRateOfChange({
        initialValue: Number(
          example.initialValue,
        ),
        finalValue: Number(example.finalValue),
        initialIndependentValue: Number(
          example.initialIndependentValue,
        ),
        finalIndependentValue: Number(
          example.finalIndependentValue,
        ),
      }),
    );
  }

  function resetCalculator() {
    setInitialValue("");
    setFinalValue("");
    setInitialIndependentValue("");
    setFinalIndependentValue("");
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
              Enter two observations
            </p>
            <h2>Calculate rate of change</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="rate-initial-value">
              Initial measured value
            </label>

            <input
              id="rate-initial-value"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 20"
              value={initialValue}
              onChange={(event) => {
                setInitialValue(
                  event.target.value,
                );
                setResult(null);
                setError("");
              }}
            />
          </div>

          <div className="form-field">
            <label htmlFor="rate-final-value">
              Final measured value
            </label>

            <input
              id="rate-final-value"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 35"
              value={finalValue}
              onChange={(event) => {
                setFinalValue(event.target.value);
                setResult(null);
                setError("");
              }}
            />
          </div>

          <div className="form-field">
            <label htmlFor="rate-initial-independent">
              Initial independent value
            </label>

            <input
              id="rate-initial-independent"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 0"
              value={initialIndependentValue}
              onChange={(event) => {
                setInitialIndependentValue(
                  event.target.value,
                );
                setResult(null);
                setError("");
              }}
            />

            <p>
              Usually the starting time, distance,
              temperature, or concentration.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="rate-final-independent">
              Final independent value
            </label>

            <input
              id="rate-final-independent"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 5"
              value={finalIndependentValue}
              onChange={(event) => {
                setFinalIndependentValue(
                  event.target.value,
                );
                setResult(null);
                setError("");
              }}
            />
          </div>
        </div>

        <p className="calculator-unit-note">
          Average rate of change = change in measured
          value ÷ change in independent value.
        </p>

        {error ? (
          <div
            className="calculator-error"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button
            className="button button--primary"
            type="submit"
          >
            Calculate rate of change
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
          <span>Try an example:</span>

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
              Average rate of change
            </p>

            <p className="calculator-result__value">
              {
                result.formattedAverageRateOfChange
              }
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Direction</dt>
                <dd>
                  {
                    directionLabels[
                      result.direction
                    ]
                  }
                </dd>
              </div>

              <div>
                <dt>Absolute change</dt>
                <dd>
                  {result.formattedAbsoluteChange}
                </dd>
              </div>

              <div>
                <dt>Independent interval</dt>
                <dd>
                  {result.formattedIntervalChange}
                </dd>
              </div>

              <div>
                <dt>Percentage change</dt>
                <dd>
                  {result.formattedPercentageChange}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                ({result.finalValue} −{" "}
                {result.initialValue}) ÷ (
                {result.finalIndependentValue} −{" "}
                {result.initialIndependentValue}) ={" "}
                {
                  result.formattedAverageRateOfChange
                }
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">Δ</span>
            <h2>
              Your rate-of-change result will appear
              here
            </h2>
            <p>
              Enter initial and final measured values
              with their corresponding independent
              values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
