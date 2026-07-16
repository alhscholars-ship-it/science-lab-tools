"use client";

import { useState, type FormEvent } from "react";

import {
  calculateInductance,
  type InductanceDetails,
  type InductanceMode,
  type InductanceVariable,
} from "@/lib/calculators/inductance";
import type { CalculationResult } from "@/types/calculator";

type InductanceResult =
  CalculationResult<InductanceDetails>;

type FieldDefinition = {
  key: InductanceVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fluxFields: readonly FieldDefinition[] = [
  {
    key: "inductance",
    label: "Inductance",
    symbol: "L",
    unit: "H",
    description:
      "Inductance measured in henries.",
  },
  {
    key: "turns",
    label: "Number of turns",
    symbol: "N",
    unit: "turns",
    description:
      "Total number of coil turns.",
  },
  {
    key: "magneticFlux",
    label: "Magnetic flux",
    symbol: "Φ",
    unit: "Wb",
    description:
      "Magnetic flux through one turn in webers.",
  },
  {
    key: "current",
    label: "Electric current",
    symbol: "I",
    unit: "A",
    description:
      "Current flowing through the coil.",
  },
];

const solenoidFields: readonly FieldDefinition[] = [
  {
    key: "inductance",
    label: "Inductance",
    symbol: "L",
    unit: "H",
    description:
      "Air-core solenoid inductance in henries.",
  },
  {
    key: "turns",
    label: "Number of turns",
    symbol: "N",
    unit: "turns",
    description:
      "Total number of solenoid turns.",
  },
  {
    key: "area",
    label: "Cross-sectional area",
    symbol: "A",
    unit: "m²",
    description:
      "Cross-sectional coil area in square metres.",
  },
  {
    key: "length",
    label: "Coil length",
    symbol: "ℓ",
    unit: "m",
    description:
      "Physical solenoid length in metres.",
  },
];

const variableLabels: Record<
  InductanceVariable,
  string
> = {
  inductance: "Inductance",
  turns: "Number of turns",
  magneticFlux: "Magnetic flux",
  current: "Electric current",
  area: "Cross-sectional area",
  length: "Coil length",
};

const variableSymbols: Record<
  InductanceVariable,
  string
> = {
  inductance: "L",
  turns: "N",
  magneticFlux: "Φ",
  current: "I",
  area: "A",
  length: "ℓ",
};

const variableUnits: Record<
  InductanceVariable,
  string
> = {
  inductance: "H",
  turns: "turns",
  magneticFlux: "Wb",
  current: "A",
  area: "m²",
  length: "m",
};

const emptyValues: Record<
  InductanceVariable,
  string
> = {
  inductance: "",
  turns: "",
  magneticFlux: "",
  current: "",
  area: "",
  length: "",
};

const examples = [
  {
    label: "Flux-linkage inductance",
    mode: "fluxLinkage" as const,
    solveFor: "inductance" as const,
    values: {
      ...emptyValues,
      turns: "200",
      magneticFlux: "0.0005",
      current: "2",
    },
  },
  {
    label: "Find magnetic flux",
    mode: "fluxLinkage" as const,
    solveFor: "magneticFlux" as const,
    values: {
      ...emptyValues,
      inductance: "0.05",
      turns: "200",
      current: "2",
    },
  },
  {
    label: "Air-core solenoid",
    mode: "airCoreSolenoid" as const,
    solveFor: "inductance" as const,
    values: {
      ...emptyValues,
      turns: "500",
      area: "0.0004",
      length: "0.1",
    },
  },
  {
    label: "Find coil length",
    mode: "airCoreSolenoid" as const,
    solveFor: "length" as const,
    values: {
      ...emptyValues,
      inductance: "0.001256637061",
      turns: "500",
      area: "0.0004",
    },
  },
] as const;

function getModeFields(
  mode: InductanceMode,
) {
  return mode === "fluxLinkage"
    ? fluxFields
    : solenoidFields;
}

export function InductanceCalculator() {
  const [mode, setMode] =
    useState<InductanceMode>("fluxLinkage");

  const [solveFor, setSolveFor] =
    useState<InductanceVariable>("inductance");

  const [values, setValues] = useState<
    Record<InductanceVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<InductanceResult | null>(null);

  const [error, setError] = useState("");

  const activeFields = getModeFields(mode);

  function changeMode(
    selectedMode: InductanceMode,
  ) {
    setMode(selectedMode);
    setSolveFor("inductance");
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function changeSolveFor(
    variable: InductanceVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    setResult(null);
    setError("");
  }

  function updateValue(
    field: InductanceVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function buildInput(
    selectedMode: InductanceMode,
    selectedVariable: InductanceVariable,
    inputValues: Record<
      InductanceVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateInductance
    >[0] = {
      mode: selectedMode,
      solveFor: selectedVariable,
    };

    for (const field of getModeFields(
      selectedMode,
    )) {
      if (field.key === selectedVariable) {
        continue;
      }

      const rawValue =
        inputValues[field.key].trim();

      if (rawValue === "") {
        continue;
      }

      const numericValue = Number(rawValue);

      if (
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
      const calculationResult =
        calculateInductance(
          buildInput(
            mode,
            solveFor,
            values,
          ),
        );

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
          : "The inductance calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateInductance(
          buildInput(
            example.mode,
            example.solveFor,
            example.values,
          ),
        );

      setMode(example.mode);
      setSolveFor(example.solveFor);

      setValues({
        ...example.values,
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
    setMode("fluxLinkage");
    setSolveFor("inductance");
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
              Coil and solenoid calculations
            </p>

            <h2>Inductance calculation</h2>
          </div>

          <button
            type="button"
            className="button button-secondary"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <div className="calculator-mode-grid">
          <button
            type="button"
            className={
              mode === "fluxLinkage"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("fluxLinkage")
            }
          >
            <strong>Flux linkage</strong>
            <span>L = NΦ ÷ I</span>
          </button>

          <button
            type="button"
            className={
              mode === "airCoreSolenoid"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("airCoreSolenoid")
            }
          >
            <strong>Air-core solenoid</strong>
            <span>L = μ₀N²A ÷ ℓ</span>
          </button>
        </div>

        <label className="calculator-field">
          <span className="calculator-field__label">
            Solve for
          </span>

          <select
            value={solveFor}
            onChange={(event) =>
              changeSolveFor(
                event.target
                  .value as InductanceVariable,
              )
            }
          >
            {activeFields.map((field) => (
              <option
                key={field.key}
                value={field.key}
              >
                {field.label} ({field.symbol})
              </option>
            ))}
          </select>
        </label>

        <div className="calculator-input-grid">
          {activeFields
            .filter(
              (field) =>
                field.key !== solveFor,
            )
            .map((field) => (
              <label
                key={field.key}
                className="calculator-field"
              >
                <span className="calculator-field__label">
                  {field.label}
                </span>

                <span className="calculator-field__input">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    value={values[field.key]}
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                    aria-describedby={`${field.key}-description`}
                  />

                  <span>{field.unit}</span>
                </span>

                <small
                  id={`${field.key}-description`}
                >
                  {field.description}
                </small>
              </label>
            ))}
        </div>

        {error ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="button button-primary"
        >
          Calculate{" "}
          {variableLabels[solveFor]}
        </button>
      </form>

      <div className="calculator-examples">
        <p>
          <strong>Try an example:</strong>
        </p>

        <div className="calculator-example-buttons">
          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              className="button button-secondary"
              onClick={() =>
                loadExample(example)
              }
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <section
        className="calculator-result"
        aria-live="polite"
      >
        <p className="eyebrow">
          Calculation result
        </p>

        {result ? (
          <>
            <h2>
              {
                variableLabels[
                  result.details.solvedVariable
                ]
              }
            </h2>

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
                <dt>Formula</dt>
                <dd>{result.details.formula}</dd>
              </div>

              <div>
                <dt>Substitution</dt>
                <dd>
                  {result.details.substitution}
                </dd>
              </div>

              <div>
                <dt>Solved variable</dt>
                <dd>
                  {
                    variableSymbols[
                      result.details
                        .solvedVariable
                    ]
                  }
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <h2>Ready to calculate</h2>

            <p>
              Select a model, choose the unknown,
              and enter every required positive value.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
