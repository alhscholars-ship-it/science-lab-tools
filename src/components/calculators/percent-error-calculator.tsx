"use client";

import { useState, type FormEvent } from "react";

import {
  calculatePercentError,
  type PercentErrorDetails,
} from "@/lib/calculators/percent-error";
import type { CalculationResult } from "@/types/calculator";

type PercentErrorResult = CalculationResult<PercentErrorDetails>;

const examples = [
  {
    label: "Chemistry example",
    experimental: "9.8",
    accepted: "10",
  },
  {
    label: "Physics example",
    experimental: "4.72",
    accepted: "4.9",
  },
] as const;

export function PercentErrorCalculator() {
  const [experimentalValue, setExperimentalValue] = useState("");
  const [acceptedValue, setAcceptedValue] = useState("");
  const [result, setResult] = useState<PercentErrorResult | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const experimental = Number(experimentalValue);
    const accepted = Number(acceptedValue);

    if (experimentalValue.trim() === "" || !Number.isFinite(experimental)) {
      setError("Enter a valid experimental value.");
      return;
    }

    if (acceptedValue.trim() === "" || !Number.isFinite(accepted)) {
      setError("Enter a valid accepted or theoretical value.");
      return;
    }

    try {
      setResult(
        calculatePercentError({
          experimentalValue: experimental,
          acceptedValue: accepted,
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

  function loadExample(experimental: string, accepted: string) {
    setExperimentalValue(experimental);
    setAcceptedValue(accepted);
    setError("");
    setResult(
      calculatePercentError({
        experimentalValue: Number(experimental),
        acceptedValue: Number(accepted),
      }),
    );
  }

  function resetCalculator() {
    setExperimentalValue("");
    setAcceptedValue("");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form className="calculator-form" onSubmit={calculate} noValidate>
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">Enter your measurements</p>
            <h2>Calculate percent error</h2>
          </div>

          <span className="calculator-form__status">Free tool</span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="experimental-value">Experimental value</label>
            <input
              id="experimental-value"
              name="experimentalValue"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 9.8"
              value={experimentalValue}
              onChange={(event) => setExperimentalValue(event.target.value)}
              aria-describedby="experimental-help"
            />
            <p id="experimental-help">
              The value measured during your experiment.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="accepted-value">
              Accepted or theoretical value
            </label>
            <input
              id="accepted-value"
              name="acceptedValue"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 10"
              value={acceptedValue}
              onChange={(event) => setAcceptedValue(event.target.value)}
              aria-describedby="accepted-help"
            />
            <p id="accepted-help">
              The trusted reference value used for comparison.
            </p>
          </div>
        </div>

        {error ? (
          <div className="calculator-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button className="button button--primary" type="submit">
            Calculate percent error
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
                loadExample(example.experimental, example.accepted)
              }
            >
              {example.label}
            </button>
          ))}
        </div>
      </form>

      <section
        className={`calculator-result ${
          result ? "calculator-result--complete" : ""
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {result ? (
          <>
            <p className="calculator-result__label">Percent error</p>
            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Absolute difference</dt>
                <dd>{result.details.absoluteDifference}</dd>
              </div>
              <div>
                <dt>Experimental value</dt>
                <dd>{result.details.experimentalValue}</dd>
              </div>
              <div>
                <dt>Accepted value</dt>
                <dd>{result.details.acceptedValue}</dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                |{result.details.experimentalValue} −{" "}
                {result.details.acceptedValue}| ÷ |
                {result.details.acceptedValue}| × 100
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">%</span>
            <h2>Your result will appear here</h2>
            <p>
              Enter the experimental and accepted values, then select
              calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
