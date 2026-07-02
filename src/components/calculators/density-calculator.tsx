"use client";

import { useState, type FormEvent } from "react";

import {
  calculateDensity,
  type DensityDetails,
  type DensityVariable,
} from "@/lib/calculators/density";
import type { CalculationResult } from "@/types/calculator";

type DensityResult = CalculationResult<DensityDetails>;

type DensityUnitSystem = {
  id: string;
  label: string;
  densityUnit: string;
  massUnit: string;
  volumeUnit: string;
};

type DensityField = {
  key: DensityVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly DensityField[] = [
  {
    key: "density",
    label: "Density",
    symbol: "ρ",
    description: "Mass contained in each unit of volume.",
  },
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    description: "Amount of matter in the sample.",
  },
  {
    key: "volume",
    label: "Volume",
    symbol: "V",
    description: "Space occupied by the sample.",
  },
];

const unitSystems: readonly DensityUnitSystem[] = [
  {
    id: "g-cm3",
    label: "g and cm³",
    densityUnit: "g/cm³",
    massUnit: "g",
    volumeUnit: "cm³",
  },
  {
    id: "g-ml",
    label: "g and mL",
    densityUnit: "g/mL",
    massUnit: "g",
    volumeUnit: "mL",
  },
  {
    id: "kg-m3",
    label: "kg and m³",
    densityUnit: "kg/m³",
    massUnit: "kg",
    volumeUnit: "m³",
  },
] as const;

const variableLabels: Record<DensityVariable, string> = {
  density: "Density",
  mass: "Mass",
  volume: "Volume",
};

const variableSymbols: Record<DensityVariable, string> = {
  density: "ρ",
  mass: "m",
  volume: "V",
};

const emptyValues: Record<DensityVariable, string> = {
  density: "",
  mass: "",
  volume: "",
};

const examples = [
  {
    label: "Find density",
    solveFor: "density" as const,
    unitSystemId: "g-cm3",
    values: {
      density: "",
      mass: "100",
      volume: "20",
    },
  },
  {
    label: "Find volume",
    solveFor: "volume" as const,
    unitSystemId: "g-ml",
    values: {
      density: "2.5",
      mass: "100",
      volume: "",
    },
  },
] as const;

export function DensityCalculator() {
  const [solveFor, setSolveFor] =
    useState<DensityVariable>("density");

  const [values, setValues] =
    useState<Record<DensityVariable, string>>(emptyValues);

  const [unitSystemId, setUnitSystemId] = useState("g-cm3");
  const [result, setResult] = useState<DensityResult | null>(null);
  const [error, setError] = useState("");

  const unitSystem =
    unitSystems.find((system) => system.id === unitSystemId) ??
    unitSystems[0];

  function getUnit(variable: DensityVariable): string {
    switch (variable) {
      case "density":
        return unitSystem.densityUnit;
      case "mass":
        return unitSystem.massUnit;
      case "volume":
        return unitSystem.volumeUnit;
    }
  }

  function updateValue(field: DensityVariable, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setResult(null);
    setError("");
  }

  function changeSolveFor(variable: DensityVariable) {
    setSolveFor(variable);
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));
    setResult(null);
    setError("");
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const input: Parameters<typeof calculateDensity>[0] = {
      solveFor,
    };

    for (const field of fields) {
      if (field.key === solveFor) {
        continue;
      }

      const rawValue = values[field.key];
      const numericValue = Number(rawValue);

      if (rawValue.trim() === "" || !Number.isFinite(numericValue)) {
        setError(`Enter a valid ${field.label.toLowerCase()}.`);
        return;
      }

      input[field.key] = numericValue;
    }

    try {
      const calculationResult = calculateDensity(input);

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
    const exampleValues: Record<DensityVariable, string> = {
      ...example.values,
    };

    const input: Parameters<typeof calculateDensity>[0] = {
      solveFor: example.solveFor,
    };

    for (const field of fields) {
      if (field.key === example.solveFor) {
        continue;
      }

      input[field.key] = Number(exampleValues[field.key]);
    }

    const calculationResult = calculateDensity(input);

    setSolveFor(example.solveFor);
    setUnitSystemId(example.unitSystemId);
    setValues({
      ...exampleValues,
      [example.solveFor]: String(calculationResult.value),
    });
    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("density");
    setValues(emptyValues);
    setUnitSystemId("g-cm3");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form className="calculator-form" onSubmit={calculate} noValidate>
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              Enter two known values
            </p>
            <h2>Solve a density problem</h2>
          </div>

          <span className="calculator-form__status">Free tool</span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="density-solve-for">
              Calculate which value?
            </label>

            <select
              id="density-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target.value as DensityVariable,
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

          <div className="form-field dilution-solve-field">
            <label htmlFor="density-unit-system">
              Measurement units
            </label>

            <select
              id="density-unit-system"
              value={unitSystemId}
              onChange={(event) => {
                setUnitSystemId(event.target.value);
                setResult(null);
                setError("");
              }}
            >
              {unitSystems.map((system) => (
                <option key={system.id} value={system.id}>
                  {system.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="density-fields">
          {fields.map((field) => {
            const isSolvedField = field.key === solveFor;

            return (
              <div className="form-field" key={field.key}>
                <label htmlFor={`density-${field.key}`}>
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`density-${field.key}`}
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
                      updateValue(field.key, event.target.value)
                    }
                    disabled={isSolvedField}
                    aria-describedby={`density-${field.key}-help`}
                  />

                  <span>{getUnit(field.key)}</span>
                </div>

                <p id={`density-${field.key}-help`}>
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Use one consistent unit system. This calculator displays
          units but does not convert between different unit systems.
        </p>

        {error ? (
          <div className="calculator-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button className="button button--primary" type="submit">
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
                {getUnit(result.details.solvedVariable)}
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Density (ρ)</dt>
                <dd>
                  {result.details.density} {unitSystem.densityUnit}
                </dd>
              </div>
              <div>
                <dt>Mass (m)</dt>
                <dd>
                  {result.details.mass} {unitSystem.massUnit}
                </dd>
              </div>
              <div>
                <dt>Volume (V)</dt>
                <dd>
                  {result.details.volume} {unitSystem.volumeUnit}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Solved variable</h3>
              <p>
                {variableSymbols[result.details.solvedVariable]} ={" "}
                {result.formattedValue}{" "}
                {getUnit(result.details.solvedVariable)}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">ρ</span>
            <h2>Your result will appear here</h2>
            <p>
              Select the missing variable and enter the other two
              measurements.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
