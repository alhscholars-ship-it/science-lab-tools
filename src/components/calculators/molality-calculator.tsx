"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import {
  calculateMolality,
  getMolalityVariableLabel,
  type MolalityDetails,
  type MolalityInput,
  type MolalityVariable,
  type SolventMassUnit,
} from "@/lib/calculators/molality";

type MolalityResult =
  ReturnType<typeof calculateMolality>;

type Example = {
  title: string;
  description: string;
  solveFor: MolalityVariable;
  soluteMoles: string;
  solventMass: string;
  solventMassUnit: SolventMassUnit;
  molality: string;
};

const examples: readonly Example[] = [
  {
    title: "Find molality",
    description:
      "0.25 mol of solute in 500 g of solvent",
    solveFor: "molality",
    soluteMoles: "0.25",
    solventMass: "500",
    solventMassUnit: "g",
    molality: "",
  },
  {
    title: "Find solute moles",
    description:
      "2 mol/kg solution using 250 g of solvent",
    solveFor: "soluteMoles",
    soluteMoles: "",
    solventMass: "250",
    solventMassUnit: "g",
    molality: "2",
  },
  {
    title: "Find solvent mass",
    description:
      "0.75 mol of solute at 1.5 mol/kg",
    solveFor: "solventMass",
    soluteMoles: "0.75",
    solventMass: "",
    solventMassUnit: "g",
    molality: "1.5",
  },
] as const;

function parseRequiredNumber(
  value: string,
  label: string,
): number {
  if (!value.trim()) {
    throw new Error(`${label} is required.`);
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(
      `${label} must be a valid number.`,
    );
  }

  return parsedValue;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 10,
  }).format(value);
}

function getWorking(
  details: MolalityDetails,
): readonly string[] {
  const moles =
    formatNumber(details.soluteMoles);

  const kilograms =
    formatNumber(
      details.solventMassInKilograms,
    );

  const molality =
    formatNumber(details.molality);

  switch (details.solvedVariable) {
    case "molality":
      return [
        "m = n ÷ kg solvent",
        `m = ${moles} ÷ ${kilograms}`,
        `m = ${molality} mol/kg`,
      ];

    case "soluteMoles":
      return [
        "n = m × kg solvent",
        `n = ${molality} × ${kilograms}`,
        `n = ${moles} mol`,
      ];

    case "solventMass": {
      const convertedMass =
        formatNumber(details.solventMass);

      const lines = [
        "kg solvent = n ÷ m",
        `kg solvent = ${moles} ÷ ${molality}`,
        `kg solvent = ${kilograms} kg`,
      ];

      if (details.solventMassUnit === "g") {
        return [
          ...lines,
          `${kilograms} kg × 1000 = ${convertedMass} g`,
        ];
      }

      return lines;
    }

    default: {
      const exhaustiveCheck: never =
        details.solvedVariable;

      return [
        `Unsupported variable: ${exhaustiveCheck}`,
      ];
    }
  }
}

export function MolalityCalculator() {
  const [solveFor, setSolveFor] =
    useState<MolalityVariable>("molality");

  const [soluteMoles, setSoluteMoles] =
    useState("");

  const [solventMass, setSolventMass] =
    useState("");

  const [
    solventMassUnit,
    setSolventMassUnit,
  ] = useState<SolventMassUnit>("kg");

  const [molality, setMolality] =
    useState("");

  const [result, setResult] =
    useState<MolalityResult | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  function clearFeedback() {
    setResult(null);
    setError(null);
  }

  function buildInput(): MolalityInput {
    const input: MolalityInput = {
      solveFor,
      solventMassUnit,
    };

    if (solveFor !== "soluteMoles") {
      input.soluteMoles =
        parseRequiredNumber(
          soluteMoles,
          "Moles of solute",
        );
    }

    if (solveFor !== "solventMass") {
      input.solventMass =
        parseRequiredNumber(
          solventMass,
          "Mass of solvent",
        );
    }

    if (solveFor !== "molality") {
      input.molality =
        parseRequiredNumber(
          molality,
          "Molality",
        );
    }

    return input;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      const calculation =
        calculateMolality(buildInput());

      setResult(calculation);
      setError(null);
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function handleSolveForChange(
    variable: MolalityVariable,
  ) {
    setSolveFor(variable);
    clearFeedback();
  }

  function loadExample(example: Example) {
    setSolveFor(example.solveFor);
    setSoluteMoles(example.soluteMoles);
    setSolventMass(example.solventMass);
    setSolventMassUnit(
      example.solventMassUnit,
    );
    setMolality(example.molality);
    clearFeedback();
  }

  function resetCalculator() {
    setSolveFor("molality");
    setSoluteMoles("");
    setSolventMass("");
    setSolventMassUnit("kg");
    setMolality("");
    clearFeedback();
  }

  const resultWorking =
    result
      ? getWorking(result.details)
      : [];

  return (
    <div className="calculator-panel">
      <form
        className="calculator-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="calculator-field">
          <label htmlFor="molality-solve-for">
            Solve for
          </label>

          <select
            id="molality-solve-for"
            value={solveFor}
            onChange={(event) =>
              handleSolveForChange(
                event.target
                  .value as MolalityVariable,
              )
            }
          >
            <option value="molality">
              Molality
            </option>

            <option value="soluteMoles">
              Moles of solute
            </option>

            <option value="solventMass">
              Mass of solvent
            </option>
          </select>
        </div>

        <div className="calculator-grid">
          {solveFor !== "soluteMoles" ? (
            <div className="calculator-field">
              <label htmlFor="molality-solute-moles">
                Moles of solute
              </label>

              <input
                id="molality-solute-moles"
                name="soluteMoles"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={soluteMoles}
                onChange={(event) => {
                  setSoluteMoles(
                    event.target.value,
                  );
                  clearFeedback();
                }}
                placeholder="For example, 0.25"
              />

              <p>
                Enter the amount of dissolved
                solute in moles.
              </p>
            </div>
          ) : null}

          {solveFor !== "solventMass" ? (
            <div className="calculator-field">
              <label htmlFor="molality-solvent-mass">
                Mass of solvent
              </label>

              <input
                id="molality-solvent-mass"
                name="solventMass"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={solventMass}
                onChange={(event) => {
                  setSolventMass(
                    event.target.value,
                  );
                  clearFeedback();
                }}
                placeholder="For example, 500"
              />

              <p>
                Use solvent mass, not the total
                solution mass.
              </p>
            </div>
          ) : null}

          {solveFor !== "molality" ? (
            <div className="calculator-field">
              <label htmlFor="molality-value">
                Molality
              </label>

              <input
                id="molality-value"
                name="molality"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={molality}
                onChange={(event) => {
                  setMolality(
                    event.target.value,
                  );
                  clearFeedback();
                }}
                placeholder="For example, 1.5"
              />

              <p>
                Enter molality in moles per
                kilogram of solvent.
              </p>
            </div>
          ) : null}

          <div className="calculator-field">
            <label htmlFor="molality-mass-unit">
              Solvent mass unit
            </label>

            <select
              id="molality-mass-unit"
              value={solventMassUnit}
              onChange={(event) => {
                setSolventMassUnit(
                  event.target
                    .value as SolventMassUnit,
                );
                clearFeedback();
              }}
            >
              <option value="kg">
                Kilograms (kg)
              </option>

              <option value="g">
                Grams (g)
              </option>
            </select>

            <p>
              {solveFor === "solventMass"
                ? "The calculated solvent mass will use this unit."
                : "The calculator converts grams to kilograms automatically."}
            </p>
          </div>
        </div>

        {error ? (
          <div
            className="calculator-error"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button type="submit">
            Calculate
          </button>

          <button
            type="button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <section
          className="calculator-examples"
          aria-labelledby="molality-examples-heading"
        >
          <h2 id="molality-examples-heading">
            Try an example
          </h2>

          <div>
            {examples.map((example) => (
              <button
                key={example.title}
                type="button"
                onClick={() =>
                  loadExample(example)
                }
              >
                <strong>
                  {example.title}
                </strong>

                <span>
                  {example.description}
                </span>
              </button>
            ))}
          </div>
        </section>
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
              {getMolalityVariableLabel(
                result.details.solvedVariable,
              )}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Moles of solute</dt>
                <dd>
                  {formatNumber(
                    result.details.soluteMoles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>Solvent mass</dt>
                <dd>
                  {formatNumber(
                    result.details.solventMass,
                  )}{" "}
                  {
                    result.details
                      .solventMassUnit
                  }
                </dd>
              </div>

              <div>
                <dt>Solvent mass in kilograms</dt>
                <dd>
                  {formatNumber(
                    result.details
                      .solventMassInKilograms,
                  )}{" "}
                  kg
                </dd>
              </div>

              <div>
                <dt>Molality</dt>
                <dd>
                  {formatNumber(
                    result.details.molality,
                  )}{" "}
                  mol/kg
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation working</h3>

              {resultWorking.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <p>
              Select what you want to solve,
              enter the known values, and
              calculate the result.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
