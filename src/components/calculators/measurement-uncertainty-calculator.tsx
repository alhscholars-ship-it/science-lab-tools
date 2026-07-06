"use client";

import { useState, type FormEvent } from "react";

import {
  calculateMeasurementUncertainty,
  type MeasurementUncertaintyResult,
} from "@/lib/calculators/measurement-uncertainty";

const examples = [
  {
    label: "Length measurement",
    measuredValue: "50",
    absoluteUncertainty: "2",
  },
  {
    label: "Mass measurement",
    measuredValue: "12.5",
    absoluteUncertainty: "0.2",
  },
  {
    label: "Temperature measurement",
    measuredValue: "24.8",
    absoluteUncertainty: "0.5",
  },
] as const;

export function MeasurementUncertaintyCalculator() {
  const [measuredValue, setMeasuredValue] =
    useState("");
  const [
    absoluteUncertainty,
    setAbsoluteUncertainty,
  ] = useState("");
  const [result, setResult] =
    useState<MeasurementUncertaintyResult | null>(
      null,
    );
  const [error, setError] = useState("");

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    const measurement = Number(measuredValue);
    const uncertainty = Number(
      absoluteUncertainty,
    );

    if (
      measuredValue.trim() === "" ||
      !Number.isFinite(measurement)
    ) {
      setError("Enter a valid measured value.");
      return;
    }

    if (
      absoluteUncertainty.trim() === "" ||
      !Number.isFinite(uncertainty)
    ) {
      setError(
        "Enter a valid absolute uncertainty.",
      );
      return;
    }

    try {
      setResult(
        calculateMeasurementUncertainty({
          measuredValue: measurement,
          absoluteUncertainty: uncertainty,
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
    setMeasuredValue(example.measuredValue);
    setAbsoluteUncertainty(
      example.absoluteUncertainty,
    );
    setError("");

    setResult(
      calculateMeasurementUncertainty({
        measuredValue: Number(
          example.measuredValue,
        ),
        absoluteUncertainty: Number(
          example.absoluteUncertainty,
        ),
      }),
    );
  }

  function resetCalculator() {
    setMeasuredValue("");
    setAbsoluteUncertainty("");
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
              Enter measurement details
            </p>
            <h2>
              Calculate measurement uncertainty
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="measured-value">
              Measured value
            </label>

            <input
              id="measured-value"
              name="measuredValue"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 50"
              value={measuredValue}
              onChange={(event) => {
                setMeasuredValue(
                  event.target.value,
                );
                setResult(null);
                setError("");
              }}
              aria-describedby="measured-value-help"
            />

            <p id="measured-value-help">
              Enter the central measured value.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="absolute-uncertainty">
              Absolute uncertainty
            </label>

            <input
              id="absolute-uncertainty"
              name="absoluteUncertainty"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 2"
              value={absoluteUncertainty}
              onChange={(event) => {
                setAbsoluteUncertainty(
                  event.target.value,
                );
                setResult(null);
                setError("");
              }}
              aria-describedby="absolute-uncertainty-help"
            />

            <p id="absolute-uncertainty-help">
              Enter the plus-or-minus uncertainty
              in the same unit.
            </p>
          </div>
        </div>

        <p className="calculator-unit-note">
          Relative uncertainty = absolute uncertainty
          ÷ |measured value|.
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
            Calculate uncertainty
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
              Measurement notation
            </p>

            <p className="calculator-result__value">
              {result.measurementNotation}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Relative uncertainty</dt>
                <dd>
                  {
                    result.formattedRelativeUncertainty
                  }
                </dd>
              </div>

              <div>
                <dt>Percentage uncertainty</dt>
                <dd>
                  {
                    result.formattedPercentageUncertainty
                  }
                </dd>
              </div>

              <div>
                <dt>Minimum possible value</dt>
                <dd>
                  {result.formattedMinimumValue}
                </dd>
              </div>

              <div>
                <dt>Maximum possible value</dt>
                <dd>
                  {result.formattedMaximumValue}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                {result.formattedAbsoluteUncertainty}
                {" ÷ |"}
                {result.formattedMeasuredValue}
                {"| × 100 = "}
                {
                  result.formattedPercentageUncertainty
                }
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">±</span>
            <h2>
              Your uncertainty results will appear
              here
            </h2>
            <p>
              Enter a measured value and its absolute
              uncertainty.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
