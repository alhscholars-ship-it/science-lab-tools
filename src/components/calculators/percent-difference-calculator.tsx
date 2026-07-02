"use client";

import { useState, type FormEvent } from "react";

import {
  calculatePercentDifference,
  type PercentDifferenceDetails,
} from "@/lib/calculators/percent-difference";
import type { CalculationResult } from "@/types/calculator";

type PercentDifferenceResult =
  CalculationResult<PercentDifferenceDetails>;

const examples = [
  {
    label: "Measurement example",
    first: "10",
    second: "12",
  },
  {
    label: "Lab trial example",
    first: "24.5",
    second: "25.2",
  },
] as const;

export function PercentDifferenceCalculator() {
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [result, setResult] =
    useState<PercentDifferenceResult | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const first = Number(firstValue);
    const second = Number(secondValue);

    if (firstValue.trim() === "" || !Number.isFinite(first)) {
      setError("Enter a valid first value.");
      return;
    }

    if (secondValue.trim() === "" || !Number.isFinite(second)) {
      setError("Enter a valid second value.");
      return;
    }

    try {
      setResult(
        calculatePercentDifference({
          firstValue: first,
          secondValue: second,
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

  function loadExample(first: string, second: string) {
    setFirstValue(first);
    setSecondValue(second);
    setError("");
    setResult(
      calculatePercentDifference({
        firstValue: Number(first),
        secondValue: Number(second),
      }),
    );
  }

  function resetCalculator() {
    setFirstValue("");
    setSecondValue("");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form className="calculator-form" onSubmit={calculate} noValidate>
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              Enter two measurements
            </p>
            <h2>Calculate percent difference</h2>
          </div>

          <span className="calculator-form__status">Free tool</span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="first-value">First value</label>
            <input
              id="first-value"
              name="firstValue"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 10"
              value={firstValue}
              onChange={(event) => setFirstValue(event.target.value)}
              aria-describedby="first-value-help"
            />
            <p id="first-value-help">
              The first experimental measurement.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="second-value">Second value</label>
            <input
              id="second-value"
              name="secondValue"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 12"
              value={secondValue}
              onChange={(event) => setSecondValue(event.target.value)}
              aria-describedby="second-value-help"
            />
            <p id="second-value-help">
              The second experimental measurement.
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
            Calculate percent difference
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
                loadExample(example.first, example.second)
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
            <p className="calculator-result__label">
              Percent difference
            </p>
            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Absolute difference</dt>
                <dd>{result.details.absoluteDifference}</dd>
              </div>
              <div>
                <dt>Average magnitude</dt>
                <dd>{result.details.averageMagnitude}</dd>
              </div>
              <div>
                <dt>First value</dt>
                <dd>{result.details.firstValue}</dd>
              </div>
              <div>
                <dt>Second value</dt>
                <dd>{result.details.secondValue}</dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                |{result.details.firstValue} −{" "}
                {result.details.secondValue}| ÷ ((
                |{result.details.firstValue}| + |
                {result.details.secondValue}|) ÷ 2) × 100
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">%</span>
            <h2>Your result will appear here</h2>
            <p>
              Enter two measurements, then select calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
