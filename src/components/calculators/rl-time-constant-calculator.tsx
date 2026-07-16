"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRlTimeConstant,
  type RlTimeConstantDetails,
  type RlTimeConstantMode,
  type RlTimeConstantVariable,
} from "@/lib/calculators/rl-time-constant";
import type { CalculationResult } from "@/types/calculator";

type RlTimeConstantResult =
  CalculationResult<RlTimeConstantDetails>;

type FieldDefinition = {
  key: RlTimeConstantVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const timeConstantFields: readonly FieldDefinition[] = [
  {
    key: "timeConstant",
    label: "Time constant",
    symbol: "τ",
    unit: "s",
    description:
      "RL time constant measured in seconds.",
  },
  {
    key: "inductance",
    label: "Inductance",
    symbol: "L",
    unit: "H",
    description:
      "Circuit inductance measured in henries.",
  },
  {
    key: "resistance",
    label: "Resistance",
    symbol: "R",
    unit: "Ω",
    description:
      "Total series resistance measured in ohms.",
  },
];

const currentRiseFields: readonly FieldDefinition[] = [
  {
    key: "timeConstant",
    label: "Time constant",
    symbol: "τ",
    unit: "s",
    description:
      "RL time constant measured in seconds.",
  },
  {
    key: "current",
    label: "Inductor current",
    symbol: "I(t)",
    unit: "A",
    description:
      "Current flowing after the selected rise time.",
  },
  {
    key: "maximumCurrent",
    label: "Maximum current",
    symbol: "Imax",
    unit: "A",
    description:
      "Final steady-state current in the RL circuit.",
  },
  {
    key: "time",
    label: "Elapsed time",
    symbol: "t",
    unit: "s",
    description:
      "Current-rise time measured in seconds.",
  },
];

const currentDecayFields: readonly FieldDefinition[] = [
  {
    key: "timeConstant",
    label: "Time constant",
    symbol: "τ",
    unit: "s",
    description:
      "RL time constant measured in seconds.",
  },
  {
    key: "current",
    label: "Inductor current",
    symbol: "I(t)",
    unit: "A",
    description:
      "Remaining current after the selected decay time.",
  },
  {
    key: "initialCurrent",
    label: "Initial current",
    symbol: "I₀",
    unit: "A",
    description:
      "Current present at the beginning of decay.",
  },
  {
    key: "time",
    label: "Elapsed time",
    symbol: "t",
    unit: "s",
    description:
      "Current-decay time measured in seconds.",
  },
];

const variableLabels: Record<
  RlTimeConstantVariable,
  string
> = {
  timeConstant: "Time constant",
  inductance: "Inductance",
  resistance: "Resistance",
  current: "Inductor current",
  maximumCurrent: "Maximum current",
  initialCurrent: "Initial current",
  time: "Elapsed time",
};

const variableSymbols: Record<
  RlTimeConstantVariable,
  string
> = {
  timeConstant: "τ",
  inductance: "L",
  resistance: "R",
  current: "I(t)",
  maximumCurrent: "Imax",
  initialCurrent: "I₀",
  time: "t",
};

const variableUnits: Record<
  RlTimeConstantVariable,
  string
> = {
  timeConstant: "s",
  inductance: "H",
  resistance: "Ω",
  current: "A",
  maximumCurrent: "A",
  initialCurrent: "A",
  time: "s",
};

const emptyValues: Record<
  RlTimeConstantVariable,
  string
> = {
  timeConstant: "",
  inductance: "",
  resistance: "",
  current: "",
  maximumCurrent: "",
  initialCurrent: "",
  time: "",
};

const examples = [
  {
    label: "Find time constant",
    mode: "timeConstant" as const,
    solveFor: "timeConstant" as const,
    values: {
      ...emptyValues,
      inductance: "2",
      resistance: "10",
    },
  },
  {
    label: "Current rise after 1τ",
    mode: "currentRise" as const,
    solveFor: "current" as const,
    values: {
      ...emptyValues,
      timeConstant: "1",
      maximumCurrent: "10",
      time: "1",
    },
  },
  {
    label: "Find rise time",
    mode: "currentRise" as const,
    solveFor: "time" as const,
    values: {
      ...emptyValues,
      timeConstant: "1",
      current: "6.321205588",
      maximumCurrent: "10",
    },
  },
  {
    label: "Current decay after 1τ",
    mode: "currentDecay" as const,
    solveFor: "current" as const,
    values: {
      ...emptyValues,
      timeConstant: "1",
      initialCurrent: "10",
      time: "1",
    },
  },
] as const;

function getModeFields(
  mode: RlTimeConstantMode,
) {
  if (mode === "timeConstant") {
    return timeConstantFields;
  }

  if (mode === "currentRise") {
    return currentRiseFields;
  }

  return currentDecayFields;
}

function getDefaultSolveFor(
  mode: RlTimeConstantMode,
): RlTimeConstantVariable {
  return mode === "timeConstant"
    ? "timeConstant"
    : "current";
}

export function RlTimeConstantCalculator() {
  const [mode, setMode] =
    useState<RlTimeConstantMode>("timeConstant");

  const [solveFor, setSolveFor] =
    useState<RlTimeConstantVariable>(
      "timeConstant",
    );

  const [values, setValues] = useState<
    Record<RlTimeConstantVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RlTimeConstantResult | null>(null);

  const [error, setError] = useState("");

  const activeFields = getModeFields(mode);

  function changeMode(
    selectedMode: RlTimeConstantMode,
  ) {
    setMode(selectedMode);
    setSolveFor(
      getDefaultSolveFor(selectedMode),
    );
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function changeSolveFor(
    variable: RlTimeConstantVariable,
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
    field: RlTimeConstantVariable,
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
    selectedMode: RlTimeConstantMode,
    selectedVariable: RlTimeConstantVariable,
    inputValues: Record<
      RlTimeConstantVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateRlTimeConstant
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
        calculateRlTimeConstant(
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
          : "The RL circuit calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateRlTimeConstant(
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
    setMode("timeConstant");
    setSolveFor("timeConstant");
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
              Resistor-inductor circuits
            </p>

            <h2>
              Time constant and current response
            </h2>
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
              mode === "timeConstant"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("timeConstant")
            }
          >
            <strong>Time constant</strong>
            <span>τ = L ÷ R</span>
          </button>

          <button
            type="button"
            className={
              mode === "currentRise"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("currentRise")
            }
          >
            <strong>Current rise</strong>
            <span>
              I(t) = Imax(1 − e⁻ᵗ/τ)
            </span>
          </button>

          <button
            type="button"
            className={
              mode === "currentDecay"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("currentDecay")
            }
          >
            <strong>Current decay</strong>
            <span>I(t) = I₀e⁻ᵗ/τ</span>
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
                  .value as RlTimeConstantVariable,
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
              Choose an RL circuit mode, select the
              unknown, and enter the required positive
              values.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
