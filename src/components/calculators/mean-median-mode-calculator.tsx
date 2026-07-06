"use client";

import { useState, type FormEvent } from "react";

import { parseDataset } from "@/lib/calculators/dataset";
import {
  calculateMeanMedianMode,
  type MeanMedianModeResult,
} from "@/lib/calculators/mean-median-mode";
import { formatCalculatedNumber } from "@/lib/calculators/number-format";

const examples = [
  {
    label: "Single mode",
    values: "2, 4, 4, 6, 8",
  },
  {
    label: "Two modes",
    values: "1, 1, 2, 2, 3",
  },
  {
    label: "Repeated trials",
    values: "12.1, 12.4, 12.2, 12.4, 12.3",
  },
] as const;

export function MeanMedianModeCalculator() {
  const [dataset, setDataset] = useState("");
  const [result, setResult] =
    useState<MeanMedianModeResult | null>(null);
  const [error, setError] = useState("");

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const values = parseDataset(dataset);
      setResult(calculateMeanMedianMode(values));
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
    setResult(calculateMeanMedianMode(values));
  }

  function resetCalculator() {
    setDataset("");
    setResult(null);
    setError("");
  }

  const formattedMode =
    result === null
      ? ""
      : result.formattedModes.length === 0
        ? "No mode"
        : result.formattedModes.join(", ");

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
            <h2>Calculate central tendency</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="form-field">
          <label htmlFor="mean-median-mode-values">
            Numerical values
          </label>

          <textarea
            id="mean-median-mode-values"
            name="values"
            className="calculator-textarea"
            rows={8}
            placeholder="Example: 2, 4, 4, 6, 8"
            value={dataset}
            onChange={(event) => {
              setDataset(event.target.value);
              setResult(null);
              setError("");
            }}
            aria-describedby="mean-median-mode-values-help"
            spellCheck={false}
          />

          <p id="mean-median-mode-values-help">
            Separate values with commas, spaces, semicolons,
            or new lines.
          </p>
        </div>

        <p className="calculator-unit-note">
          The calculator sorts the values automatically and
          reports multiple modes when frequencies are tied.
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
              Mean
            </p>

            <p className="calculator-result__value">
              {result.formattedMean}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Median</dt>
                <dd>{result.formattedMedian}</dd>
              </div>

              <div>
                <dt>Mode</dt>
                <dd>{formattedMode}</dd>
              </div>

              <div>
                <dt>Number of values</dt>
                <dd>{result.count}</dd>
              </div>

              <div>
                <dt>Sum</dt>
                <dd>
                  {formatCalculatedNumber(result.sum)}
                </dd>
              </div>

              <div>
                <dt>Minimum</dt>
                <dd>
                  {formatCalculatedNumber(
                    result.minimum,
                  )}
                </dd>
              </div>

              <div>
                <dt>Maximum</dt>
                <dd>
                  {formatCalculatedNumber(
                    result.maximum,
                  )}
                </dd>
              </div>

              <div>
                <dt>Range</dt>
                <dd>
                  {formatCalculatedNumber(result.range)}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Sorted dataset</h3>
              <p>
                {result.sortedValues
                  .map((value) =>
                    formatCalculatedNumber(value),
                  )
                  .join(", ")}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">x̄</span>
            <h2>Your statistics will appear here</h2>
            <p>
              Enter a numerical dataset to calculate its
              mean, median, mode, and range.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
