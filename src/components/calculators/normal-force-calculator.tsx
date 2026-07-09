"use client";

import { useState, type FormEvent } from "react";

import {
  calculateNormalForce,
  type NormalForceDetails,
  type NormalForceVariable,
} from "@/lib/calculators/normal-force";
import type { CalculationResult } from "@/types/calculator";

type NormalForceResult =
  CalculationResult<NormalForceDetails>;

type CoreField = {
  key: NormalForceVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

type OptionalFieldKey =
  | "angleDegrees"
  | "downwardForce"
  | "upwardForce";

const coreFields: readonly CoreField[] = [
  {
    key: "normalForce",
    label: "Normal force",
    symbol: "N",
    unit: "N",
    description:
      "Support force exerted by the surface.",
  },
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    unit: "kg",
    description:
      "Mass of the object resting on the surface.",
  },
  {
    key: "gravity",
    label: "Gravitational acceleration",
    symbol: "g",
    unit: "m/s²",
    description:
      "Local gravitational acceleration.",
  },
];

const variableLabels: Record<
  NormalForceVariable,
  string
> = {
  normalForce: "Normal force",
  mass: "Mass",
  gravity: "Gravitational acceleration",
};

const variableUnits: Record<
  NormalForceVariable,
  string
> = {
  normalForce: "N",
  mass: "kg",
  gravity: "m/s²",
};

const emptyCoreValues: Record<
  NormalForceVariable,
  string
> = {
  normalForce: "",
  mass: "",
  gravity: "",
};

const emptyOptionalValues: Record<
  OptionalFieldKey,
  string
> = {
  angleDegrees: "0",
  downwardForce: "0",
  upwardForce: "0",
};

const examples = [
  {
    label: "Horizontal surface",
    solveFor: "normalForce" as const,
    coreValues: {
      normalForce: "",
      mass: "10",
      gravity: "9.81",
    },
    optionalValues: {
      angleDegrees: "0",
      downwardForce: "0",
      upwardForce: "0",
    },
  },
  {
    label: "30° incline",
    solveFor: "normalForce" as const,
    coreValues: {
      normalForce: "",
      mass: "10",
      gravity: "9.81",
    },
    optionalValues: {
      angleDegrees: "30",
      downwardForce: "0",
      upwardForce: "0",
    },
  },
  {
    label: "Downward push",
    solveFor: "normalForce" as const,
    coreValues: {
      normalForce: "",
      mass: "10",
      gravity: "9.81",
    },
    optionalValues: {
      angleDegrees: "0",
      downwardForce: "20",
      upwardForce: "0",
    },
  },
  {
    label: "Find mass",
    solveFor: "mass" as const,
    coreValues: {
      normalForce: "98.1",
      mass: "",
      gravity: "9.81",
    },
    optionalValues: {
      angleDegrees: "0",
      downwardForce: "0",
      upwardForce: "0",
    },
  },
] as const;

export function NormalForceCalculator() {
  const [solveFor, setSolveFor] =
    useState<NormalForceVariable>(
      "normalForce",
    );

  const [coreValues, setCoreValues] =
    useState<
      Record<NormalForceVariable, string>
    >(emptyCoreValues);

  const [optionalValues, setOptionalValues] =
    useState<
      Record<OptionalFieldKey, string>
    >(emptyOptionalValues);

  const [result, setResult] =
    useState<NormalForceResult | null>(null);

  const [error, setError] = useState("");

  function updateCoreValue(
    field: NormalForceVariable,
    value: string,
  ) {
    setCoreValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function updateOptionalValue(
    field: OptionalFieldKey,
    value: string,
  ) {
    setOptionalValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function changeSolveFor(
    variable: NormalForceVariable,
  ) {
    setSolveFor(variable);

    setCoreValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    setResult(null);
    setError("");
  }

  function parseRequiredValue(
    rawValue: string,
    label: string,
  ): number | null {
    const numericValue = Number(rawValue);

    if (
      rawValue.trim() === "" ||
      !Number.isFinite(numericValue)
    ) {
      setError(
        `Enter a valid ${label.toLowerCase()}.`,
      );
      return null;
    }

    return numericValue;
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    const input: Parameters<
      typeof calculateNormalForce
    >[0] = {
      solveFor,
    };

    for (const field of coreFields) {
      if (field.key === solveFor) {
        continue;
      }

      const numericValue = parseRequiredValue(
        coreValues[field.key],
        field.label,
      );

      if (numericValue === null) {
        return;
      }

      input[field.key] = numericValue;
    }

    const angle = parseRequiredValue(
      optionalValues.angleDegrees,
      "incline angle",
    );

    const downwardForce = parseRequiredValue(
      optionalValues.downwardForce,
      "downward force",
    );

    const upwardForce = parseRequiredValue(
      optionalValues.upwardForce,
      "upward force",
    );

    if (
      angle === null ||
      downwardForce === null ||
      upwardForce === null
    ) {
      return;
    }

    input.angleDegrees = angle;
    input.downwardForce = downwardForce;
    input.upwardForce = upwardForce;

    try {
      const calculationResult =
        calculateNormalForce(input);

      setResult(calculationResult);

      setCoreValues((currentValues) => ({
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
    const input: Parameters<
      typeof calculateNormalForce
    >[0] = {
      solveFor: example.solveFor,
      angleDegrees: Number(
        example.optionalValues.angleDegrees,
      ),
      downwardForce: Number(
        example.optionalValues.downwardForce,
      ),
      upwardForce: Number(
        example.optionalValues.upwardForce,
      ),
    };

    for (const field of coreFields) {
      if (
        field.key === example.solveFor
      ) {
        continue;
      }

      input[field.key] = Number(
        example.coreValues[field.key],
      );
    }

    const calculationResult =
      calculateNormalForce(input);

    setSolveFor(example.solveFor);

    setCoreValues({
      ...example.coreValues,
      [example.solveFor]: String(
        calculationResult.value,
      ),
    });

    setOptionalValues({
      ...example.optionalValues,
    });

    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("normalForce");
    setCoreValues(emptyCoreValues);
    setOptionalValues(emptyOptionalValues);
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
              Surface support-force tool
            </p>

            <h2>Solve a normal-force problem</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="normal-force-solve-for">
              Calculate which value?
            </label>

            <select
              id="normal-force-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as NormalForceVariable,
                )
              }
            >
              {coreFields.map((field) => (
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
          {coreFields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <div
                className="form-field"
                key={field.key}
              >
                <label
                  htmlFor={`normal-force-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`normal-force-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : field.key === "gravity"
                          ? "Example: 9.80665"
                          : "Enter value"
                    }
                    value={
                      coreValues[field.key]
                    }
                    onChange={(event) =>
                      updateCoreValue(
                        field.key,
                        event.target.value,
                      )
                    }
                    disabled={isSolvedField}
                    aria-describedby={`normal-force-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`normal-force-${field.key}-help`}
                >
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="density-fields">
          <div className="form-field">
            <label htmlFor="normal-force-angle">
              Incline angle (θ)
            </label>

            <div className="input-with-suffix">
              <input
                id="normal-force-angle"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                max="89.999999"
                value={
                  optionalValues.angleDegrees
                }
                onChange={(event) =>
                  updateOptionalValue(
                    "angleDegrees",
                    event.target.value,
                  )
                }
                aria-describedby="normal-force-angle-help"
              />

              <span>degrees</span>
            </div>

            <p id="normal-force-angle-help">
              Use 0° for a horizontal surface and less
              than 90° for an incline.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="normal-force-downward">
              Downward external force
            </label>

            <div className="input-with-suffix">
              <input
                id="normal-force-downward"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={
                  optionalValues.downwardForce
                }
                onChange={(event) =>
                  updateOptionalValue(
                    "downwardForce",
                    event.target.value,
                  )
                }
                aria-describedby="normal-force-downward-help"
              />

              <span>N</span>
            </div>

            <p id="normal-force-downward-help">
              Optional force pressing the object into
              the surface.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="normal-force-upward">
              Upward external force
            </label>

            <div className="input-with-suffix">
              <input
                id="normal-force-upward"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={
                  optionalValues.upwardForce
                }
                onChange={(event) =>
                  updateOptionalValue(
                    "upwardForce",
                    event.target.value,
                  )
                }
                aria-describedby="normal-force-upward-help"
              />

              <span>N</span>
            </div>

            <p id="normal-force-upward-help">
              Optional force pulling the object away
              from the surface.
            </p>
          </div>
        </div>

        <p className="calculator-unit-note">
          Use kilograms, newtons, meters per second
          squared, and degrees. Standard Earth gravity
          is 9.80665 m/s².
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
              {
                variableLabels[
                  result.details.solvedVariable
                ]
              }
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              <span>
                {
                  variableUnits[
                    result.details
                      .solvedVariable
                  ]
                }
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Normal force</dt>
                <dd>
                  {result.details.normalForce} N
                </dd>
              </div>

              <div>
                <dt>Mass</dt>
                <dd>
                  {result.details.mass} kg
                </dd>
              </div>

              <div>
                <dt>Gravity</dt>
                <dd>
                  {result.details.gravity} m/s²
                </dd>
              </div>

              <div>
                <dt>Incline angle</dt>
                <dd>
                  {result.details.angleDegrees}°
                </dd>
              </div>

              <div>
                <dt>Downward force</dt>
                <dd>
                  {result.details.downwardForce} N
                </dd>
              </div>

              <div>
                <dt>Upward force</dt>
                <dd>
                  {result.details.upwardForce} N
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Formula</h3>
              <p>{result.details.formula}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">N</span>

            <h2>
              Your normal-force result will appear here
            </h2>

            <p>
              Choose the missing variable, enter the
              known values, and include any incline or
              external forces.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
