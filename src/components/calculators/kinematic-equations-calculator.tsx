"use client";

import { useState, type FormEvent } from "react";

import {
  calculateKinematicEquation,
  type KinematicDetails,
  type KinematicEquation,
  type KinematicVariable,
} from "@/lib/calculators/kinematic-equations";
import type { CalculationResult } from "@/types/calculator";

type KinematicResult =
  CalculationResult<KinematicDetails>;

type KinematicField = {
  key: KinematicVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

type EquationOption = {
  key: KinematicEquation;
  label: string;
  formula: string;
  variables: readonly KinematicVariable[];
};

const fields: readonly KinematicField[] = [
  {
    key: "initialVelocity",
    label: "Initial velocity",
    symbol: "u",
    unit: "m/s",
    description:
      "Velocity at the beginning of the motion interval.",
  },
  {
    key: "finalVelocity",
    label: "Final velocity",
    symbol: "v",
    unit: "m/s",
    description:
      "Velocity at the end of the motion interval.",
  },
  {
    key: "acceleration",
    label: "Acceleration",
    symbol: "a",
    unit: "m/s²",
    description:
      "Rate of change of velocity.",
  },
  {
    key: "time",
    label: "Time",
    symbol: "t",
    unit: "s",
    description:
      "Elapsed duration of motion.",
  },
  {
    key: "displacement",
    label: "Displacement",
    symbol: "s",
    unit: "m",
    description:
      "Change in position during the motion interval.",
  },
];

const equations: readonly EquationOption[] = [
  {
    key: "velocity-time",
    label: "Velocity–time equation",
    formula: "v = u + at",
    variables: [
      "initialVelocity",
      "finalVelocity",
      "acceleration",
      "time",
    ],
  },
  {
    key: "displacement-time",
    label: "Displacement–time equation",
    formula: "s = ut + ½at²",
    variables: [
      "initialVelocity",
      "acceleration",
      "time",
      "displacement",
    ],
  },
  {
    key: "velocity-displacement",
    label: "Velocity–displacement equation",
    formula: "v² = u² + 2as",
    variables: [
      "initialVelocity",
      "finalVelocity",
      "acceleration",
      "displacement",
    ],
  },
  {
    key: "average-velocity",
    label: "Average-velocity equation",
    formula: "s = ½(u + v)t",
    variables: [
      "initialVelocity",
      "finalVelocity",
      "time",
      "displacement",
    ],
  },
];

const variableLabels: Record<
  KinematicVariable,
  string
> = {
  initialVelocity: "Initial velocity",
  finalVelocity: "Final velocity",
  acceleration: "Acceleration",
  time: "Time",
  displacement: "Displacement",
};

const variableUnits: Record<
  KinematicVariable,
  string
> = {
  initialVelocity: "m/s",
  finalVelocity: "m/s",
  acceleration: "m/s²",
  time: "s",
  displacement: "m",
};

const emptyValues: Record<
  KinematicVariable,
  string
> = {
  initialVelocity: "",
  finalVelocity: "",
  acceleration: "",
  time: "",
  displacement: "",
};

const examples = [
  {
    label: "Find final velocity",
    equation: "velocity-time" as const,
    solveFor: "finalVelocity" as const,
    values: {
      initialVelocity: "5",
      finalVelocity: "",
      acceleration: "2",
      time: "4",
      displacement: "",
    },
  },
  {
    label: "Find displacement",
    equation: "displacement-time" as const,
    solveFor: "displacement" as const,
    values: {
      initialVelocity: "5",
      finalVelocity: "",
      acceleration: "2",
      time: "4",
      displacement: "",
    },
  },
  {
    label: "Find acceleration",
    equation: "velocity-displacement" as const,
    solveFor: "acceleration" as const,
    values: {
      initialVelocity: "5",
      finalVelocity: "13",
      acceleration: "",
      time: "",
      displacement: "36",
    },
  },
  {
    label: "Find time",
    equation: "average-velocity" as const,
    solveFor: "time" as const,
    values: {
      initialVelocity: "5",
      finalVelocity: "13",
      acceleration: "",
      time: "",
      displacement: "36",
    },
  },
] as const;

function getEquation(
  equation: KinematicEquation,
): EquationOption {
  const option = equations.find(
    (item) => item.key === equation,
  );

  if (!option) {
    throw new Error(
      "The selected kinematic equation is not supported.",
    );
  }

  return option;
}

export function KinematicEquationsCalculator() {
  const [equation, setEquation] =
    useState<KinematicEquation>("velocity-time");

  const [solveFor, setSolveFor] =
    useState<KinematicVariable>("finalVelocity");

  const [values, setValues] = useState<
    Record<KinematicVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<KinematicResult | null>(null);
  const [error, setError] = useState("");

  const selectedEquation = getEquation(equation);

  function updateValue(
    field: KinematicVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setResult(null);
    setError("");
  }

  function changeEquation(
    nextEquation: KinematicEquation,
  ) {
    const nextOption = getEquation(nextEquation);
    const nextSolveFor =
      nextOption.variables[
        nextOption.variables.length - 1
      ];

    setEquation(nextEquation);
    setSolveFor(nextSolveFor);
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function changeSolveFor(
    variable: KinematicVariable,
  ) {
    setSolveFor(variable);
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));
    setResult(null);
    setError("");
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setResult(null);
    setError("");

    const input: Parameters<
      typeof calculateKinematicEquation
    >[0] = {
      equation,
      solveFor,
    };

    for (const variable of selectedEquation.variables) {
      if (variable === solveFor) {
        continue;
      }

      const rawValue = values[variable];
      const numericValue = Number(rawValue);

      if (
        rawValue.trim() === "" ||
        !Number.isFinite(numericValue)
      ) {
        setError(
          `Enter a valid ${variableLabels[
            variable
          ].toLowerCase()}.`,
        );
        return;
      }

      input[variable] = numericValue;
    }

    try {
      const calculationResult =
        calculateKinematicEquation(input);

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
    const option = getEquation(example.equation);

    const exampleValues: Record<
      KinematicVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateKinematicEquation
    >[0] = {
      equation: example.equation,
      solveFor: example.solveFor,
    };

    for (const variable of option.variables) {
      if (variable === example.solveFor) {
        continue;
      }

      input[variable] = Number(
        exampleValues[variable],
      );
    }

    const calculationResult =
      calculateKinematicEquation(input);

    setEquation(example.equation);
    setSolveFor(example.solveFor);
    setValues({
      ...exampleValues,
      [example.solveFor]: String(
        calculationResult.value,
      ),
    });
    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setEquation("velocity-time");
    setSolveFor("finalVelocity");
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
        <div className="calculator-form__header">
          <div>
            <p className="eyebrow">
              SUVAT motion solver
            </p>

            <h2>Kinematic equations calculator</h2>

            <p>
              Select an equation and unknown variable,
              then enter the remaining known values.
            </p>
          </div>

          <button
            type="button"
            className="calculator-reset-button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <fieldset className="calculator-variable-selector">
          <legend>Select a kinematic equation</legend>

          <div className="calculator-variable-grid">
            {equations.map((option) => (
              <label key={option.key}>
                <input
                  type="radio"
                  name="equation"
                  value={option.key}
                  checked={equation === option.key}
                  onChange={() =>
                    changeEquation(option.key)
                  }
                />

                <span>
                  <strong>{option.label}</strong>
                  <small>{option.formula}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="calculator-variable-selector">
          <legend>What do you want to calculate?</legend>

          <div className="calculator-variable-grid">
            {selectedEquation.variables.map(
              (variable) => {
                const field = fields.find(
                  (item) => item.key === variable,
                );

                if (!field) {
                  return null;
                }

                return (
                  <label key={field.key}>
                    <input
                      type="radio"
                      name="solveFor"
                      value={field.key}
                      checked={solveFor === field.key}
                      onChange={() =>
                        changeSolveFor(field.key)
                      }
                    />

                    <span>
                      <strong>{field.label}</strong>
                      <small>{field.symbol}</small>
                    </span>
                  </label>
                );
              },
            )}
          </div>
        </fieldset>

        <div className="calculator-input-grid">
          {selectedEquation.variables.map(
            (variable) => {
              const field = fields.find(
                (item) => item.key === variable,
              );

              if (!field) {
                return null;
              }

              const isSolvedField =
                field.key === solveFor;

              return (
                <label
                  key={field.key}
                  className="calculator-field"
                >
                  <span className="calculator-field__label">
                    {field.label}
                  </span>

                  <span className="calculator-field__control">
                    <input
                      type="number"
                      step="any"
                      value={values[field.key]}
                      readOnly={isSolvedField}
                      placeholder={
                        isSolvedField
                          ? "Calculated result"
                          : `Enter ${field.label.toLowerCase()}`
                      }
                      onChange={(event) =>
                        updateValue(
                          field.key,
                          event.target.value,
                        )
                      }
                    />

                    <span>{field.unit}</span>
                  </span>

                  <small>{field.description}</small>
                </label>
              );
            },
          )}
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
          className="calculator-submit-button"
        >
          Calculate {variableLabels[solveFor]}
        </button>
      </form>

      <aside className="calculator-result-panel">
        <div>
          <p className="eyebrow">Result</p>

          <h2>
            {result
              ? `${result.formattedValue} ${variableUnits[solveFor]}`
              : "Enter values to calculate"}
          </h2>

          <p>
            Formula:{" "}
            <strong>{selectedEquation.formula}</strong>
          </p>
        </div>

        {result ? (
          <dl className="calculator-result-list">
            {selectedEquation.variables.map(
              (variable) => {
                const value =
                  result.details[variable];

                if (value === undefined) {
                  return null;
                }

                return (
                  <div key={variable}>
                    <dt>
                      {variableLabels[variable]}
                    </dt>

                    <dd>
                      {value} {variableUnits[variable]}
                    </dd>
                  </div>
                );
              },
            )}
          </dl>
        ) : null}

        <div className="calculator-example-list">
          <p>Try an example</p>

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
      </aside>
    </div>
  );
}
