"use client";

import { useState, type FormEvent } from "react";

import {
  calculateMagneticField,
  type MagneticFieldDetails,
  type MagneticFieldMode,
  type MagneticFieldVariable,
} from "@/lib/calculators/magnetic-field";
import type { CalculationResult } from "@/types/calculator";

type MagneticFieldResult =
  CalculationResult<MagneticFieldDetails>;

type FieldDefinition = {
  key: MagneticFieldVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const movingChargeFields: readonly FieldDefinition[] = [
  {
    key: "magneticField",
    label: "Magnetic field strength",
    symbol: "B",
    unit: "T",
    description:
      "Magnetic flux density measured in teslas.",
  },
  {
    key: "force",
    label: "Magnetic force",
    symbol: "F",
    unit: "N",
    description:
      "Force acting on the moving charged particle.",
  },
  {
    key: "charge",
    label: "Electric charge",
    symbol: "q",
    unit: "C",
    description:
      "Magnitude of the particle charge in coulombs.",
  },
  {
    key: "velocity",
    label: "Particle velocity",
    symbol: "v",
    unit: "m/s",
    description:
      "Particle speed relative to the magnetic field.",
  },
  {
    key: "angle",
    label: "Angle",
    symbol: "θ",
    unit: "°",
    description:
      "Angle between velocity and magnetic-field direction.",
  },
];

const conductorFields: readonly FieldDefinition[] = [
  {
    key: "magneticField",
    label: "Magnetic field strength",
    symbol: "B",
    unit: "T",
    description:
      "Magnetic flux density around the conductor.",
  },
  {
    key: "current",
    label: "Electric current",
    symbol: "I",
    unit: "A",
    description:
      "Current flowing through the straight conductor.",
  },
  {
    key: "distance",
    label: "Distance from conductor",
    symbol: "r",
    unit: "m",
    description:
      "Perpendicular distance from the wire.",
  },
];

const variableLabels: Record<
  MagneticFieldVariable,
  string
> = {
  magneticField: "Magnetic field strength",
  force: "Magnetic force",
  charge: "Electric charge",
  velocity: "Particle velocity",
  angle: "Angle",
  current: "Electric current",
  distance: "Distance from conductor",
};

const variableSymbols: Record<
  MagneticFieldVariable,
  string
> = {
  magneticField: "B",
  force: "F",
  charge: "q",
  velocity: "v",
  angle: "θ",
  current: "I",
  distance: "r",
};

const variableUnits: Record<
  MagneticFieldVariable,
  string
> = {
  magneticField: "T",
  force: "N",
  charge: "C",
  velocity: "m/s",
  angle: "°",
  current: "A",
  distance: "m",
};

const emptyValues: Record<
  MagneticFieldVariable,
  string
> = {
  magneticField: "",
  force: "",
  charge: "",
  velocity: "",
  angle: "",
  current: "",
  distance: "",
};

const examples = [
  {
    label: "Field from moving charge",
    mode: "movingCharge" as const,
    solveFor: "magneticField" as const,
    values: {
      ...emptyValues,
      force: "0.003",
      charge: "0.000002",
      velocity: "3000",
      angle: "90",
    },
  },
  {
    label: "Find magnetic force",
    mode: "movingCharge" as const,
    solveFor: "force" as const,
    values: {
      ...emptyValues,
      magneticField: "0.5",
      charge: "0.000002",
      velocity: "3000",
      angle: "90",
    },
  },
  {
    label: "Field around wire",
    mode: "straightConductor" as const,
    solveFor: "magneticField" as const,
    values: {
      ...emptyValues,
      current: "10",
      distance: "0.05",
    },
  },
  {
    label: "Find wire distance",
    mode: "straightConductor" as const,
    solveFor: "distance" as const,
    values: {
      ...emptyValues,
      magneticField: "0.00004",
      current: "10",
    },
  },
] as const;

function getModeFields(
  mode: MagneticFieldMode,
) {
  return mode === "movingCharge"
    ? movingChargeFields
    : conductorFields;
}

function getDefaultSolveFor():
  MagneticFieldVariable {
  return "magneticField";
}

export function MagneticFieldCalculator() {
  const [mode, setMode] =
    useState<MagneticFieldMode>("movingCharge");

  const [solveFor, setSolveFor] =
    useState<MagneticFieldVariable>(
      "magneticField",
    );

  const [values, setValues] = useState<
    Record<MagneticFieldVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<MagneticFieldResult | null>(null);

  const [error, setError] = useState("");

  const activeFields = getModeFields(mode);

  function updateValue(
    field: MagneticFieldVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function changeMode(
    selectedMode: MagneticFieldMode,
  ) {
    setMode(selectedMode);
    setSolveFor(getDefaultSolveFor());
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function changeSolveFor(
    variable: MagneticFieldVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    setResult(null);
    setError("");
  }

  function buildInput() {
    const input: Parameters<
      typeof calculateMagneticField
    >[0] = {
      mode,
      solveFor,
    };

    for (const field of activeFields) {
      if (field.key === solveFor) {
        continue;
      }

      const rawValue = values[field.key].trim();

      if (rawValue === "") {
        continue;
      }

      input[field.key] = Number(rawValue);
    }

    return input;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      const calculation =
        calculateMagneticField(buildInput());

      setResult(calculation);
      setError("");
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to complete the magnetic field calculation.",
      );
    }
  }

  function resetCalculator() {
    setSolveFor(getDefaultSolveFor());
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    setMode(example.mode);
    setSolveFor(example.solveFor);
    setValues(example.values);
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-shell">
      <div className="calculator-panel">
        <div className="calculator-header">
          <div>
            <p className="eyebrow">
              Magnetic field equations
            </p>

            <h2>Enter known values</h2>
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
              mode === "movingCharge"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("movingCharge")
            }
          >
            <strong>Moving charge</strong>
            <span>F = qvB sinθ</span>
          </button>

          <button
            type="button"
            className={
              mode === "straightConductor"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("straightConductor")
            }
          >
            <strong>Straight conductor</strong>
            <span>B = μ₀I / 2πr</span>
          </button>
        </div>

        <form
          className="calculator-form"
          onSubmit={handleSubmit}
        >
          <label className="calculator-field">
            <span className="calculator-field__label">
              Solve for
            </span>

            <select
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as MagneticFieldVariable,
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
                      min={
                        field.key === "angle"
                          ? "0"
                          : undefined
                      }
                      max={
                        field.key === "angle"
                          ? "180"
                          : undefined
                      }
                      value={values[field.key]}
                      onChange={(event) =>
                        updateValue(
                          field.key,
                          event.target.value,
                        )
                      }
                      aria-describedby={`${field.key}-description`}
                      required
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
      </div>

      <aside
        className="calculator-result"
        aria-live="polite"
      >
        <p className="eyebrow">
          Calculation result
        </p>

        {result ? (
          <>
            <h2>
              {variableLabels[
                result.details.solvedVariable
              ]}
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
              Select a method, choose the unknown
              variable, and enter every known value.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}
