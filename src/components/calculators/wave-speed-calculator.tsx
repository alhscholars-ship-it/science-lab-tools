"use client";

import { useState, type FormEvent } from "react";

import {
  calculateWaveSpeed,
  type WaveSpeedDetails,
  type WaveSpeedVariable,
} from "@/lib/calculators/wave-speed";
import type { CalculationResult } from "@/types/calculator";

type WaveSpeedResult =
  CalculationResult<WaveSpeedDetails>;

type WaveSpeedField = {
  key: WaveSpeedVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly WaveSpeedField[] = [
  {
    key: "waveSpeed",
    label: "Wave speed",
    symbol: "v",
    unit: "m/s",
    description:
      "The distance travelled by the wave per unit time.",
  },
  {
    key: "frequency",
    label: "Frequency",
    symbol: "f",
    unit: "Hz",
    description:
      "The number of complete wave cycles per second.",
  },
  {
    key: "wavelength",
    label: "Wavelength",
    symbol: "λ",
    unit: "m",
    description:
      "The distance between corresponding points on adjacent waves.",
  },
];

const variableLabels: Record<
  WaveSpeedVariable,
  string
> = {
  waveSpeed: "Wave speed",
  frequency: "Frequency",
  wavelength: "Wavelength",
};

const variableSymbols: Record<
  WaveSpeedVariable,
  string
> = {
  waveSpeed: "v",
  frequency: "f",
  wavelength: "λ",
};

const variableUnits: Record<
  WaveSpeedVariable,
  string
> = {
  waveSpeed: "m/s",
  frequency: "Hz",
  wavelength: "m",
};

const emptyValues: Record<
  WaveSpeedVariable,
  string
> = {
  waveSpeed: "",
  frequency: "",
  wavelength: "",
};

const examples = [
  {
    label: "Find wave speed",
    solveFor: "waveSpeed" as const,
    values: {
      waveSpeed: "",
      frequency: "170",
      wavelength: "2",
    },
  },
  {
    label: "Find frequency",
    solveFor: "frequency" as const,
    values: {
      waveSpeed: "340",
      frequency: "",
      wavelength: "2",
    },
  },
  {
    label: "Find wavelength",
    solveFor: "wavelength" as const,
    values: {
      waveSpeed: "340",
      frequency: "170",
      wavelength: "",
    },
  },
] as const;

export function WaveSpeedCalculator() {
  const [solveFor, setSolveFor] =
    useState<WaveSpeedVariable>("waveSpeed");

  const [values, setValues] = useState<
    Record<WaveSpeedVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<WaveSpeedResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: WaveSpeedVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function changeSolveFor(
    variable: WaveSpeedVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    setResult(null);
    setError("");
  }

  function buildInput(
    selectedVariable: WaveSpeedVariable,
    inputValues: Record<
      WaveSpeedVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateWaveSpeed
    >[0] = {
      solveFor: selectedVariable,
    };

    for (const field of fields) {
      if (field.key === selectedVariable) {
        continue;
      }

      const rawValue =
        inputValues[field.key].trim();

      const numericValue = Number(rawValue);

      if (
        rawValue === "" ||
        !Number.isFinite(numericValue) ||
        numericValue <= 0
      ) {
        throw new Error(
          `${field.label} must be a number greater than zero.`,
        );
      }

      input[field.key] = numericValue;
    }

    return input;
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setResult(null);

    try {
      const input = buildInput(
        solveFor,
        values,
      );

      const calculationResult =
        calculateWaveSpeed(input);

      setResult(calculationResult);

      setValues((currentValues) => ({
        ...currentValues,
        [solveFor]: String(
          calculationResult.value,
        ),
      }));
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
    try {
      const exampleValues: Record<
        WaveSpeedVariable,
        string
      > = {
        ...example.values,
      };

      const input = buildInput(
        example.solveFor,
        exampleValues,
      );

      const calculationResult =
        calculateWaveSpeed(input);

      setSolveFor(example.solveFor);

      setValues({
        ...exampleValues,
        [example.solveFor]: String(
          calculationResult.value,
        ),
      });

      setResult(calculationResult);
      setError("");
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The example could not be loaded.",
      );
    }
  }

  function resetCalculator() {
    setSolveFor("waveSpeed");
    setValues(emptyValues);
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
              Enter two known wave values
            </p>

            <h2>Solve a wave equation</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="wave-speed-solve-for">
              Calculate which value?
            </label>

            <select
              id="wave-speed-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as WaveSpeedVariable,
                )
              }
            >
              {fields.map((field) => (
                <option
                  key={field.key}
                  value={field.key}
                >
                  {field.label} ({field.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="density-fields">
          {fields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <div
                className="form-field"
                key={field.key}
              >
                <label
                  htmlFor={`wave-speed-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`wave-speed-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : "Enter value"
                    }
                    value={values[field.key]}
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                    disabled={isSolvedField}
                    aria-describedby={`wave-speed-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`wave-speed-${field.key}-help`}
                >
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Enter positive values in metres per
          second, hertz, and metres.
        </p>

        {error ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="calculator-actions">
          <button
            className="button button--primary"
            type="submit"
          >
            Calculate{" "}
            {variableLabels[
              solveFor
            ].toLowerCase()}
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
          <strong>Try an example:</strong>

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
        className="calculator-result"
        aria-live="polite"
        aria-label="Wave speed calculation result"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              Calculated{" "}
              {variableLabels[
                result.details.solvedVariable
              ].toLowerCase()}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              {
                variableUnits[
                  result.details.solvedVariable
                ]
              }
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Wave speed</dt>
                <dd>
                  {result.details.waveSpeed} m/s
                </dd>
              </div>

              <div>
                <dt>Frequency</dt>
                <dd>
                  {result.details.frequency} Hz
                </dd>
              </div>

              <div>
                <dt>Wavelength</dt>
                <dd>
                  {result.details.wavelength} m
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <p>
                <strong>Formula:</strong>{" "}
                {result.details.formula}
              </p>

              <p>
                <strong>Substitution:</strong>{" "}
                {result.details.substitution}
              </p>

              <p>
                <strong>Result:</strong>{" "}
                {
                  variableSymbols[
                    result.details.solvedVariable
                  ]
                }{" "}
                = {result.formattedValue}{" "}
                {
                  variableUnits[
                    result.details.solvedVariable
                  ]
                }
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <p className="calculator-result__label">
              Result
            </p>

            <h2>Your wave result will appear here</h2>

            <p>
              Select the unknown variable, enter the
              two known values, and press calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
