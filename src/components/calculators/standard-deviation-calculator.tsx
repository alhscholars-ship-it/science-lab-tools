"use client";

import { useState, type FormEvent } from "react";

import {
  calculateStandardDeviation,
  parseDataset,
  type StandardDeviationResult,
} from "@/lib/calculators/standard-deviation";
import { formatCalculatedNumber } from "@/lib/calculators/number-format";

const examples = [
  {
    label: "Classic dataset",
    values: "2, 4, 4, 4, 5, 5, 7, 9",
  },
  {
    label: "Repeated trials",
    values: "12.1, 12.4, 12.2, 12.5, 12.3",
  },
  {
    label: "Temperature data",
    values: "21.4\n21.8\n21.5\n22.0\n21.7",
  },
] as const;

export function StandardDeviationCalculator() {
  const [dataset, setDataset] = useState("");
  const [result, setResult] =
    useState<StandardDeviationResult | null>(null);
  const [error, setError] = useState("");

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const values = parseDataset(dataset);
      setResult(calculateStandardDeviation(values));
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
    setDataset(example.values);
    setError("");

    const values = parseDataset(example.values);
    setResult(calculateStandardDeviation(values));
  }

  function resetCalculator() {
    setDataset("");
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
              Enter your dataset
            </p>
            <h2>Calculate standard deviation</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="form-field">
          <label htmlFor="standard-deviation-values">
            Numerical values
          </label>

          <textarea
            id="standard-deviation-values"
            name="values"
            className="calculator-textarea"
            rows={8}
            placeholder="Example: 2, 4, 4, 4, 5, 5, 7, 9"
            value={dataset}
            onChange={(event) => {
              setDataset(event.target.value);
              setResult(null);
              setError("");
            }}
            aria-describedby="standard-deviation-values-help"
            spellCheck={false}
          />

          <p id="standard-deviation-values-help">
            Separate values with commas, spaces, semicolons,
            or new lines.
          </p>
        </div>

        <p className="calculator-unit-note">
          Sample standard deviation uses n − 1 and requires
          at least two values. Population standard deviation
          uses n.
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
            Calculate statistics
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
              onClick={() => loadExample(example)}
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
              Sample standard deviation
            </p>

            <p className="calculator-result__value">
              {result.formattedSampleStandardDeviation ??
                "N/A"}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Population standard deviation</dt>
                <dd>
                  {
                    result.formattedPopulationStandardDeviation
                  }
                </dd>
              </div>

              <div>
                <dt>Mean</dt>
                <dd>{result.formattedMean}</dd>
              </div>

              <div>
                <dt>Number of values</dt>
                <dd>{result.details.count}</dd>
              </div>

              <div>
                <dt>Minimum</dt>
                <dd>
                  {formatCalculatedNumber(
                    result.details.minimum,
                  )}
                </dd>
              </div>

              <div>
                <dt>Maximum</dt>
                <dd>
                  {formatCalculatedNumber(
                    result.details.maximum,
                  )}
                </dd>
              </div>

              <div>
                <dt>Range</dt>
                <dd>
                  {formatCalculatedNumber(
                    result.details.range,
                  )}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Dataset summary</h3>
              <p>
                n = {result.details.count}; Σx ={" "}
                {formatCalculatedNumber(
                  result.details.sum,
                )}
                ; x̄ = {result.formattedMean}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">σ</span>
            <h2>Your statistics will appear here</h2>
            <p>
              Enter repeated measurements or another
              numerical dataset, then calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
