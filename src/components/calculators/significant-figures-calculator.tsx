"use client";

import { useState, type FormEvent } from "react";

import {
  roundToSignificantFigures,
  type SignificantFiguresResult,
} from "@/lib/calculators/significant-figures";

const examples = [
  {
    label: "Trailing zeros",
    value: "6.200",
    precision: "3",
  },
  {
    label: "Small decimal",
    value: "0.004567",
    precision: "2",
  },
  {
    label: "Scientific notation",
    value: "1.2345e4",
    precision: "3",
  },
] as const;

export function SignificantFiguresCalculator() {
  const [value, setValue] = useState("");
  const [precision, setPrecision] = useState("3");
  const [result, setResult] =
    useState<SignificantFiguresResult | null>(null);
  const [error, setError] = useState("");

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    const requestedPrecision = Number(precision);

    if (value.trim() === "") {
      setError("Enter a numeric value.");
      return;
    }

    if (
      precision.trim() === "" ||
      !Number.isInteger(requestedPrecision)
    ) {
      setError(
        "Enter a whole-number significant-figure count.",
      );
      return;
    }

    try {
      setResult(
        roundToSignificantFigures(
          value,
          requestedPrecision,
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
    setValue(example.value);
    setPrecision(example.precision);
    setError("");
    setResult(
      roundToSignificantFigures(
        example.value,
        Number(example.precision),
      ),
    );
  }

  function resetCalculator() {
    setValue("");
    setPrecision("3");
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
              Enter a measured value
            </p>
            <h2>Count and round significant figures</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="significant-figures-value">
              Numeric value
            </label>

            <input
              id="significant-figures-value"
              name="value"
              type="text"
              inputMode="decimal"
              placeholder="Example: 0.00450"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="significant-figures-value-help"
              autoComplete="off"
              spellCheck={false}
            />

            <p id="significant-figures-value-help">
              Trailing decimal zeros are preserved, so enter
              the value exactly as measured.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="significant-figures-precision">
              Round to how many significant figures?
            </label>

            <input
              id="significant-figures-precision"
              name="precision"
              type="number"
              inputMode="numeric"
              min="1"
              max="15"
              step="1"
              value={precision}
              onChange={(event) => {
                setPrecision(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="significant-figures-precision-help"
            />

            <p id="significant-figures-precision-help">
              Enter a whole number from 1 to 15.
            </p>
          </div>
        </div>

        <p className="calculator-unit-note">
          Whole-number trailing zeros can be ambiguous.
          Use a decimal point or scientific notation when
          those zeros are intended to be significant.
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
            Calculate significant figures
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
              Rounded value
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Original entry</dt>
                <dd>{result.originalValue}</dd>
              </div>

              <div>
                <dt>Original significant figures</dt>
                <dd>{result.significantFigures}</dd>
              </div>

              <div>
                <dt>Requested precision</dt>
                <dd>{precision}</dd>
              </div>

              <div>
                <dt>Numeric rounded value</dt>
                <dd>{result.roundedValue}</dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Scientific notation</h3>
              <p>{result.scientificNotation}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">0.00</span>
            <h2>Your result will appear here</h2>
            <p>
              Enter a value exactly as measured and choose
              the required number of significant figures.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
