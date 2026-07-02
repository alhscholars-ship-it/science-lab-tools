"use client";

import { useState, type FormEvent } from "react";

import {
  calculateSpecificHeat,
  type SpecificHeatDetails,
  type SpecificHeatVariable,
} from "@/lib/calculators/specific-heat";
import type { CalculationResult } from "@/types/calculator";

type SpecificHeatResult = CalculationResult<SpecificHeatDetails>;

type SpecificHeatField = {
  key: SpecificHeatVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly SpecificHeatField[] = [
  {
    key: "heatEnergy",
    label: "Heat energy",
    symbol: "q",
    unit: "J",
    description:
      "Energy transferred to or from the material in joules.",
  },
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    unit: "g",
    description: "Mass of the material in grams.",
  },
  {
    key: "specificHeatCapacity",
    label: "Specific heat capacity",
    symbol: "c",
    unit: "J/(g·°C)",
    description:
      "Energy required to raise one gram by one degree Celsius.",
  },
  {
    key: "temperatureChange",
    label: "Temperature change",
    symbol: "ΔT",
    unit: "°C",
    description:
      "Final temperature minus initial temperature.",
  },
];

const variableLabels: Record<SpecificHeatVariable, string> = {
  heatEnergy: "Heat energy",
  mass: "Mass",
  specificHeatCapacity: "Specific heat capacity",
  temperatureChange: "Temperature change",
};

const variableSymbols: Record<SpecificHeatVariable, string> = {
  heatEnergy: "q",
  mass: "m",
  specificHeatCapacity: "c",
  temperatureChange: "ΔT",
};

const variableUnits: Record<SpecificHeatVariable, string> = {
  heatEnergy: "J",
  mass: "g",
  specificHeatCapacity: "J/(g·°C)",
  temperatureChange: "°C",
};

const emptyValues: Record<SpecificHeatVariable, string> = {
  heatEnergy: "",
  mass: "",
  specificHeatCapacity: "",
  temperatureChange: "",
};

const examples = [
  {
    label: "Heating water",
    solveFor: "heatEnergy" as const,
    values: {
      heatEnergy: "",
      mass: "100",
      specificHeatCapacity: "4.18",
      temperatureChange: "10",
    },
  },
  {
    label: "Cooling water",
    solveFor: "temperatureChange" as const,
    values: {
      heatEnergy: "-4180",
      mass: "100",
      specificHeatCapacity: "4.18",
      temperatureChange: "",
    },
  },
] as const;

export function SpecificHeatCalculator() {
  const [solveFor, setSolveFor] =
    useState<SpecificHeatVariable>("heatEnergy");

  const [values, setValues] =
    useState<Record<SpecificHeatVariable, string>>(emptyValues);

  const [result, setResult] =
    useState<SpecificHeatResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: SpecificHeatVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setResult(null);
    setError("");
  }

  function changeSolveFor(variable: SpecificHeatVariable) {
    setSolveFor(variable);
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));
    setResult(null);
    setError("");
  }

  function createInput(
    selectedVariable: SpecificHeatVariable,
    inputValues: Record<SpecificHeatVariable, string>,
  ): Parameters<typeof calculateSpecificHeat>[0] {
    const input: Parameters<typeof calculateSpecificHeat>[0] = {
      solveFor: selectedVariable,
    };

    for (const field of fields) {
      if (field.key === selectedVariable) {
        continue;
      }

      const rawValue = inputValues[field.key];
      const numericValue = Number(rawValue);

      if (
        rawValue.trim() === "" ||
        !Number.isFinite(numericValue)
      ) {
        throw new Error(
          `Enter a valid ${field.label.toLowerCase()}.`,
        );
      }

      input[field.key] = numericValue;
    }

    return input;
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const calculationResult = calculateSpecificHeat(
        createInput(solveFor, values),
      );

      setResult(calculationResult);
      setValues((currentValues) => ({
        ...currentValues,
        [solveFor]: String(calculationResult.value),
      }));
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function loadExample(example: (typeof examples)[number]) {
    const exampleValues: Record<
      SpecificHeatVariable,
      string
    > = {
      ...example.values,
    };

    const calculationResult = calculateSpecificHeat(
      createInput(example.solveFor, exampleValues),
    );

    setSolveFor(example.solveFor);
    setValues({
      ...exampleValues,
      [example.solveFor]: String(calculationResult.value),
    });
    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("heatEnergy");
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
              Enter three known values
            </p>
            <h2>Solve a specific heat problem</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="form-field dilution-solve-field">
          <label htmlFor="specific-heat-solve-for">
            Calculate which value?
          </label>

          <select
            id="specific-heat-solve-for"
            value={solveFor}
            onChange={(event) =>
              changeSolveFor(
                event.target.value as SpecificHeatVariable,
              )
            }
          >
            {fields.map((field) => (
              <option key={field.key} value={field.key}>
                {field.label} ({field.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="specific-heat-fields">
          {fields.map((field) => {
            const isSolvedField = field.key === solveFor;

            return (
              <div className="form-field" key={field.key}>
                <label htmlFor={`specific-heat-${field.key}`}>
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`specific-heat-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.key === "mass" ||
                      field.key === "specificHeatCapacity"
                        ? "0"
                        : undefined
                    }
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
                    aria-describedby={`specific-heat-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p id={`specific-heat-${field.key}-help`}>
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Use joules, grams, J/(g·°C), and degrees Celsius
          consistently. Negative heat energy and temperature change
          represent cooling.
        </p>

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
            Calculate {variableLabels[solveFor].toLowerCase()}
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
          result ? "calculator-result--complete" : ""
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              {variableLabels[result.details.solvedVariable]}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              <span className="calculator-result__unit">
                {variableUnits[result.details.solvedVariable]}
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Heat energy (q)</dt>
                <dd>{result.details.heatEnergy} J</dd>
              </div>
              <div>
                <dt>Mass (m)</dt>
                <dd>{result.details.mass} g</dd>
              </div>
              <div>
                <dt>Specific heat capacity (c)</dt>
                <dd>
                  {result.details.specificHeatCapacity} J/(g·°C)
                </dd>
              </div>
              <div>
                <dt>Temperature change (ΔT)</dt>
                <dd>
                  {result.details.temperatureChange} °C
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Solved variable</h3>
              <p>
                {
                  variableSymbols[
                    result.details.solvedVariable
                  ]
                }{" "}
                = {result.formattedValue}{" "}
                {variableUnits[result.details.solvedVariable]}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">q</span>
            <h2>Your result will appear here</h2>
            <p>
              Select the missing variable and enter the other three
              values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
