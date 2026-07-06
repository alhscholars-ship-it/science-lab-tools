"use client";

import { useState, type FormEvent } from "react";

import {
  calculateCoefficientOfVariation,
  type CoefficientVariationResult,
  type VariationMethod,
} from "@/lib/calculators/coefficient-variation";
import { parseDataset } from "@/lib/calculators/dataset";

const examples = [
  {
    label: "Population data",
    values: "2, 4, 4, 4, 5, 5, 7, 9",
    method: "population" as const,
  },
  {
    label: "Sample trials",
    values: "10, 12, 14",
    method: "sample" as const,
  },
  {
    label: "Low variation",
    values: "24.8, 25.1, 25.0, 24.9, 25.2",
    method: "sample" as const,
  },
] as const;

export function CoefficientVariationCalculator() {
  const [dataset, setDataset] = useState("");
  const [method, setMethod] =
    useState<VariationMethod>("sample");
  const [result, setResult] =
    useState<CoefficientVariationResult | null>(null);
  const [error, setError] = useState("");

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const values = parseDataset(dataset);

      setResult(
        calculateCoefficientOfVariation(
          values,
          method,
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
    setDataset(example.values);
    setMethod(example.method);
    setError("");

    const values = parseDataset(example.values);

    setResult(
      calculateCoefficientOfVariation(
        values,
        example.method,
      ),
    );
  }

  function resetCalculator() {
    setDataset("");
    setMethod("sample");
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
            <h2>
              Calculate coefficient of variation
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="form-field">
          <label htmlFor="coefficient-variation-values">
            Numerical values
          </label>

          <textarea
            id="coefficient-variation-values"
            name="values"
            className="calculator-textarea"
            rows={8}
            placeholder="Example: 10, 12, 14"
            value={dataset}
            onChange={(event) => {
              setDataset(event.target.value);
              setResult(null);
              setError("");
            }}
            aria-describedby="coefficient-variation-help"
            spellCheck={false}
          />

          <p id="coefficient-variation-help">
            Separate values with commas, spaces,
            semicolons, or new lines.
          </p>
        </div>

        <fieldset className="calculator-options-grid">
          <legend>
            Standard deviation method
          </legend>

          <label>
            <input
              type="radio"
              name="variation-method"
              value="sample"
              checked={method === "sample"}
              onChange={() => {
                setMethod("sample");
                setResult(null);
                setError("");
              }}
            />
            <span>
              <strong>Sample</strong>
              <small>
                Uses n − 1 for a sample from a larger
                population.
              </small>
            </span>
          </label>

          <label>
            <input
              type="radio"
              name="variation-method"
              value="population"
              checked={method === "population"}
              onChange={() => {
                setMethod("population");
                setResult(null);
                setError("");
              }}
            />
            <span>
              <strong>Population</strong>
              <small>
                Uses n when the dataset is the complete
                population.
              </small>
            </span>
          </label>
        </fieldset>

        <p className="calculator-unit-note">
          Coefficient of variation is calculated as
          standard deviation ÷ absolute mean × 100%.
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
            Calculate variation
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
              Coefficient of variation
            </p>

            <p className="calculator-result__value">
              {
                result.formattedCoefficientOfVariation
              }
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Mean</dt>
                <dd>{result.formattedMean}</dd>
              </div>

              <div>
                <dt>Standard deviation</dt>
                <dd>
                  {
                    result.formattedStandardDeviation
                  }
                </dd>
              </div>

              <div>
                <dt>Method</dt>
                <dd>
                  {result.method === "sample"
                    ? "Sample (n − 1)"
                    : "Population (n)"}
                </dd>
              </div>

              <div>
                <dt>Number of values</dt>
                <dd>{result.count}</dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                CV ={" "}
                {
                  result.formattedStandardDeviation
                }{" "}
                ÷ |{result.formattedMean}| × 100%
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">CV</span>
            <h2>
              Your coefficient will appear here
            </h2>
            <p>
              Enter a dataset and select the correct
              standard deviation method.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
