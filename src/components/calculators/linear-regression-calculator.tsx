"use client";

import { useState, type FormEvent } from "react";

import {
  calculateLinearRegression,
  parsePairedDataset,
  type LinearRegressionResult,
} from "@/lib/calculators/linear-regression";
import { formatCalculatedNumber } from "@/lib/calculators/number-format";

const examples = [
  {
    label: "Perfect positive",
    values: "1,2\n2,4\n3,6\n4,8",
  },
  {
    label: "Negative trend",
    values: "1,5\n2,3\n3,1",
  },
  {
    label: "Experimental data",
    values: "1,2\n2,3\n3,5\n4,4",
  },
] as const;

export function LinearRegressionCalculator() {
  const [dataset, setDataset] = useState("");
  const [result, setResult] =
    useState<LinearRegressionResult | null>(null);
  const [error, setError] = useState("");

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const points = parsePairedDataset(dataset);
      setResult(calculateLinearRegression(points));
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

    const points = parsePairedDataset(
      example.values,
    );

    setResult(
      calculateLinearRegression(points),
    );
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
              Enter paired data
            </p>
            <h2>Calculate linear regression</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="form-field">
          <label htmlFor="linear-regression-values">
            X and Y values
          </label>

          <textarea
            id="linear-regression-values"
            name="values"
            className="calculator-textarea"
            rows={9}
            placeholder={"Example:\n1,2\n2,4\n3,6"}
            value={dataset}
            onChange={(event) => {
              setDataset(event.target.value);
              setResult(null);
              setError("");
            }}
            aria-describedby="linear-regression-help"
            spellCheck={false}
          />

          <p id="linear-regression-help">
            Enter one x,y pair per line. Spaces or commas
            can separate each pair.
          </p>
        </div>

        <p className="calculator-unit-note">
          The calculator uses ordinary least squares for
          the model y = mx + b.
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
            Calculate regression
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
              Regression equation
            </p>

            <p className="calculator-result__value">
              {result.equation}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Slope</dt>
                <dd>{result.formattedSlope}</dd>
              </div>

              <div>
                <dt>Intercept</dt>
                <dd>{result.formattedIntercept}</dd>
              </div>

              <div>
                <dt>Correlation coefficient (r)</dt>
                <dd>
                  {
                    result.formattedCorrelationCoefficient
                  }
                </dd>
              </div>

              <div>
                <dt>Coefficient of determination (R²)</dt>
                <dd>
                  {
                    result.formattedCoefficientOfDetermination
                  }
                </dd>
              </div>

              <div>
                <dt>Number of points</dt>
                <dd>{result.count}</dd>
              </div>

              <div>
                <dt>Mean of x</dt>
                <dd>
                  {formatCalculatedNumber(
                    result.meanX,
                  )}
                </dd>
              </div>

              <div>
                <dt>Mean of y</dt>
                <dd>
                  {formatCalculatedNumber(
                    result.meanY,
                  )}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Model summary</h3>
              <p>
                y = mx + b, where m ={" "}
                {result.formattedSlope} and b ={" "}
                {result.formattedIntercept}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">y=mx+b</span>
            <h2>
              Your regression results will appear here
            </h2>
            <p>
              Enter at least two paired x and y values to
              calculate the best-fit line.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
