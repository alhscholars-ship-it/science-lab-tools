"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  calculatePercentYield,
  type PercentYieldDetails,
} from "@/lib/calculators/percent-yield";
import type { CalculationResult } from "@/types/calculator";

type PercentYieldResult =
  CalculationResult<PercentYieldDetails>;

type Example = {
  label: string;
  actualYield: string;
  theoreticalYield: string;
};

const examples: readonly Example[] = [
  {
    label: "Standard yield",
    actualYield: "80",
    theoreticalYield: "100",
  },
  {
    label: "Chemistry example",
    actualYield: "36.03",
    theoreticalYield: "40",
  },
  {
    label: "Over 100% yield",
    actualYield: "120",
    theoreticalYield: "100",
  },
];

function parseActualYield(
  rawValue: string,
): number {
  const value = Number(rawValue);

  if (
    rawValue.trim() === "" ||
    Number.isFinite(value) === false
  ) {
    throw new Error(
      "Enter a valid actual yield.",
    );
  }

  if (value < 0) {
    throw new Error(
      "Actual yield cannot be negative.",
    );
  }

  return value;
}

function parseTheoreticalYield(
  rawValue: string,
): number {
  const value = Number(rawValue);

  if (
    rawValue.trim() === "" ||
    Number.isFinite(value) === false
  ) {
    throw new Error(
      "Enter a valid theoretical yield.",
    );
  }

  if (value <= 0) {
    throw new Error(
      "Theoretical yield must be greater than zero.",
    );
  }

  return value;
}

function formatDetailValue(
  value: number,
): string {
  return value.toLocaleString("en-US", {
    maximumSignificantDigits: 10,
  });
}

export function PercentYieldCalculator() {
  const [
    actualYield,
    setActualYield,
  ] = useState("");

  const [
    theoreticalYield,
    setTheoreticalYield,
  ] = useState("");

  const [result, setResult] =
    useState<PercentYieldResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function changeActualYield(
    value: string,
  ) {
    setActualYield(value);
    clearFeedback();
  }

  function changeTheoreticalYield(
    value: string,
  ) {
    setTheoreticalYield(value);
    clearFeedback();
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    clearFeedback();

    try {
      setResult(
        calculatePercentYield({
          actualYield:
            parseActualYield(actualYield),
          theoreticalYield:
            parseTheoreticalYield(
              theoreticalYield,
            ),
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
    example: Example,
  ) {
    setActualYield(example.actualYield);
    setTheoreticalYield(
      example.theoreticalYield,
    );

    setResult(
      calculatePercentYield({
        actualYield: Number(
          example.actualYield,
        ),
        theoreticalYield: Number(
          example.theoreticalYield,
        ),
      }),
    );

    setError("");
  }

  function resetCalculator() {
    setActualYield("");
    setTheoreticalYield("");
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
              Reaction-yield inputs
            </p>

            <h2>
              Calculate percent yield
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="actual-yield">
              Actual yield
            </label>

            <input
              id="actual-yield"
              name="actualYield"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 36.03"
              value={actualYield}
              onChange={(event) =>
                changeActualYield(
                  event.target.value,
                )
              }
              aria-describedby="actual-yield-help"
            />

            <p id="actual-yield-help">
              The product amount obtained from the
              experiment.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="theoretical-yield">
              Theoretical yield
            </label>

            <input
              id="theoretical-yield"
              name="theoreticalYield"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 40"
              value={theoreticalYield}
              onChange={(event) =>
                changeTheoreticalYield(
                  event.target.value,
                )
              }
              aria-describedby="theoretical-yield-help"
            />

            <p id="theoretical-yield-help">
              The maximum product amount predicted by
              stoichiometry.
            </p>
          </div>
        </div>

        <p className="calculator-unit-note">
          Enter both yields in the same unit. The unit
          cancels in the percentage calculation.
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
            Calculate percent yield
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
              Percent yield
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <p className="calculator-result__summary">
              The experiment produced{" "}
              <strong>
                {result.formattedValue}
              </strong>
              {" "}of the theoretical amount.
            </p>

            {result.details.isOverTheoretical ? (
              <div
                className="calculator-error"
                role="status"
              >
                A result above 100% can indicate
                impurities, retained solvent,
                measurement error, or an incorrect
                theoretical yield.
              </div>
            ) : null}

            <dl className="calculator-result__details">
              <div>
                <dt>Actual yield</dt>
                <dd>
                  {formatDetailValue(
                    result.details.actualYield,
                  )}
                </dd>
              </div>

              <div>
                <dt>Theoretical yield</dt>
                <dd>
                  {formatDetailValue(
                    result.details
                      .theoreticalYield,
                  )}
                </dd>
              </div>

              <div>
                <dt>Yield ratio</dt>
                <dd>
                  {formatDetailValue(
                    result.details.yieldRatio,
                  )}
                </dd>
              </div>

              <div>
                <dt>Above theoretical yield</dt>
                <dd>
                  {result.details
                    .isOverTheoretical
                    ? "Yes"
                    : "No"}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>

              <p>
                {formatDetailValue(
                  result.details.actualYield,
                )}
                {" "}÷{" "}
                {formatDetailValue(
                  result.details
                    .theoreticalYield,
                )}
                {" "}× 100 ={" "}
                {result.formattedValue}
              </p>

              <p>
                Formula:{" "}
                {result.details.formula}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">%</span>

            <h2>
              Your result will appear here
            </h2>

            <p>
              Enter the actual and theoretical yields,
              then calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
