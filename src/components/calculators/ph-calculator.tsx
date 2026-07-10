"use client";

import { useState, type FormEvent } from "react";

import {
  calculatePh,
  type PhDetails,
  type PhInputType,
} from "@/lib/calculators/ph";
import type { CalculationResult } from "@/types/calculator";

type PhResult = CalculationResult<PhDetails>;

const inputOptions = [
  {
    value: "ph",
    label: "pH",
    help: "Enter the known pH value.",
    placeholder: "Example: 3.5",
  },
  {
    value: "poh",
    label: "pOH",
    help: "Enter the known pOH value.",
    placeholder: "Example: 10.5",
  },
  {
    value: "hydrogen-ion",
    label: "Hydrogen-ion concentration [H⁺]",
    help: "Enter concentration in moles per liter.",
    placeholder: "Example: 0.001",
  },
  {
    value: "hydroxide-ion",
    label: "Hydroxide-ion concentration [OH⁻]",
    help: "Enter concentration in moles per liter.",
    placeholder: "Example: 0.0001",
  },
] as const satisfies readonly {
  value: PhInputType;
  label: string;
  help: string;
  placeholder: string;
}[];

const examples = [
  {
    label: "pH 3",
    inputType: "ph" as const,
    value: "3",
  },
  {
    label: "[H⁺] = 1 × 10⁻⁵",
    inputType: "hydrogen-ion" as const,
    value: "0.00001",
  },
  {
    label: "pOH 4",
    inputType: "poh" as const,
    value: "4",
  },
] as const;

function formatConcentration(value: number): string {
  if (value === 0) {
    return "0";
  }

  if (Math.abs(value) < 0.001 || Math.abs(value) >= 10000) {
    return value.toExponential(6).replace(/\.?0+e/, "e");
  }

  return value.toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}

export function PhCalculator() {
  const [inputType, setInputType] =
    useState<PhInputType>("ph");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<PhResult | null>(null);
  const [error, setError] = useState("");

  const selectedOption =
    inputOptions.find((option) => option.value === inputType) ??
    inputOptions[0];

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const value = Number(inputValue);

    if (inputValue.trim() === "" || !Number.isFinite(value)) {
      setError("Enter a valid numeric value.");
      return;
    }

    try {
      setResult(
        calculatePh({
          inputType,
          value,
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
    exampleInputType: PhInputType,
    value: string,
  ) {
    setInputType(exampleInputType);
    setInputValue(value);
    setError("");

    setResult(
      calculatePh({
        inputType: exampleInputType,
        value: Number(value),
      }),
    );
  }

  function resetCalculator() {
    setInputType("ph");
    setInputValue("");
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
              Enter acid-base data
            </p>
            <h2>Calculate pH</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="ph-input-type">
              Known measurement
            </label>

            <select
              id="ph-input-type"
              name="inputType"
              value={inputType}
              onChange={(event) => {
                setInputType(
                  event.target.value as PhInputType,
                );
                setResult(null);
                setError("");
              }}
            >
              {inputOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <p>
              Select the acid-base value already known.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="ph-input-value">
              {selectedOption.label}
            </label>

            <input
              id="ph-input-value"
              name="inputValue"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder={selectedOption.placeholder}
              value={inputValue}
              onChange={(event) =>
                setInputValue(event.target.value)
              }
              aria-describedby="ph-value-help"
            />

            <p id="ph-value-help">
              {selectedOption.help}
            </p>
          </div>
        </div>

        {error ? (
          <div className="calculator-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button
            className="button button--primary"
            type="submit"
          >
            Calculate pH
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
                loadExample(
                  example.inputType,
                  example.value,
                )
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
              Calculated pH
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <p className="calculator-result__summary">
              Classification:{" "}
              <strong>
                {result.details.classification}
              </strong>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>pH</dt>
                <dd>
                  {result.details.ph.toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 10,
                    },
                  )}
                </dd>
              </div>

              <div>
                <dt>pOH</dt>
                <dd>
                  {result.details.poh.toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 10,
                    },
                  )}
                </dd>
              </div>

              <div>
                <dt>Hydrogen ions [H⁺]</dt>
                <dd>
                  {formatConcentration(
                    result.details
                      .hydrogenIonConcentration,
                  )}{" "}
                  mol/L
                </dd>
              </div>

              <div>
                <dt>Hydroxide ions [OH⁻]</dt>
                <dd>
                  {formatConcentration(
                    result.details
                      .hydroxideIonConcentration,
                  )}{" "}
                  mol/L
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Formula used</h3>
              <p>{result.details.formula}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">pH</span>
            <h2>Your result will appear here</h2>
            <p>
              Select a known value, enter the measurement,
              and calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
