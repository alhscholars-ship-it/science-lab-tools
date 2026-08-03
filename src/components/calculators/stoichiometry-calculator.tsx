"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  calculateStoichiometry,
  type StoichiometryDetails,
  type StoichiometryUnit,
} from "@/lib/calculators/stoichiometry";
import type { CalculationResult } from "@/types/calculator";

type StoichiometryResult =
  CalculationResult<StoichiometryDetails>;

type StoichiometryFormValues = {
  knownAmount: string;
  knownCoefficient: string;
  knownMolarMass: string;
  targetCoefficient: string;
  targetMolarMass: string;
};

type StoichiometryExample = {
  label: string;
  knownUnit: StoichiometryUnit;
  targetUnit: StoichiometryUnit;
  values: StoichiometryFormValues;
};

const emptyValues: StoichiometryFormValues = {
  knownAmount: "",
  knownCoefficient: "",
  knownMolarMass: "",
  targetCoefficient: "",
  targetMolarMass: "",
};

const examples: readonly StoichiometryExample[] = [
  {
    label: "Hydrogen to water",
    knownUnit: "g",
    targetUnit: "g",
    values: {
      knownAmount: "4.032",
      knownCoefficient: "2",
      knownMolarMass: "2.016",
      targetCoefficient: "2",
      targetMolarMass: "18.015",
    },
  },
  {
    label: "Nitrogen to ammonia",
    knownUnit: "mol",
    targetUnit: "mol",
    values: {
      knownAmount: "1",
      knownCoefficient: "1",
      knownMolarMass: "",
      targetCoefficient: "2",
      targetMolarMass: "",
    },
  },
  {
    label: "Calcium carbonate to carbon dioxide",
    knownUnit: "g",
    targetUnit: "g",
    values: {
      knownAmount: "10",
      knownCoefficient: "1",
      knownMolarMass: "100.0869",
      targetCoefficient: "1",
      targetMolarMass: "44.0095",
    },
  },
];

function parsePositiveValue(
  rawValue: string,
  label: string,
): number {
  const value = Number(rawValue);

  if (
    rawValue.trim() === "" ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `Enter a valid ${label.toLowerCase()}.`,
    );
  }

  if (value <= 0) {
    throw new Error(
      `${label} must be greater than zero.`,
    );
  }

  return value;
}

function formatDetailValue(
  value: number,
): string {
  return value.toLocaleString("en-US", {
    maximumSignificantDigits: 8,
  });
}

export function StoichiometryCalculator() {
  const [knownUnit, setKnownUnit] =
    useState<StoichiometryUnit>("g");

  const [targetUnit, setTargetUnit] =
    useState<StoichiometryUnit>("g");

  const [values, setValues] =
    useState<StoichiometryFormValues>(
      emptyValues,
    );

  const [result, setResult] =
    useState<StoichiometryResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function updateValue(
    field: keyof StoichiometryFormValues,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    clearFeedback();
  }

  function changeKnownUnit(
    unit: StoichiometryUnit,
  ) {
    setKnownUnit(unit);

    if (unit === "mol") {
      setValues((currentValues) => ({
        ...currentValues,
        knownMolarMass: "",
      }));
    }

    clearFeedback();
  }

  function changeTargetUnit(
    unit: StoichiometryUnit,
  ) {
    setTargetUnit(unit);

    if (unit === "mol") {
      setValues((currentValues) => ({
        ...currentValues,
        targetMolarMass: "",
      }));
    }

    clearFeedback();
  }

  function buildInput(): Parameters<
    typeof calculateStoichiometry
  >[0] {
    const input: Parameters<
      typeof calculateStoichiometry
    >[0] = {
      knownAmount: parsePositiveValue(
        values.knownAmount,
        "Known amount",
      ),
      knownUnit,
      knownCoefficient:
        parsePositiveValue(
          values.knownCoefficient,
          "Known coefficient",
        ),
      targetCoefficient:
        parsePositiveValue(
          values.targetCoefficient,
          "Target coefficient",
        ),
      targetUnit,
    };

    if (knownUnit === "g") {
      input.knownMolarMass =
        parsePositiveValue(
          values.knownMolarMass,
          "Known molar mass",
        );
    }

    if (targetUnit === "g") {
      input.targetMolarMass =
        parsePositiveValue(
          values.targetMolarMass,
          "Target molar mass",
        );
    }

    return input;
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    clearFeedback();

    try {
      setResult(
        calculateStoichiometry(
          buildInput(),
        ),
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
    example: StoichiometryExample,
  ) {
    const input: Parameters<
      typeof calculateStoichiometry
    >[0] = {
      knownAmount: Number(
        example.values.knownAmount,
      ),
      knownUnit: example.knownUnit,
      knownCoefficient: Number(
        example.values.knownCoefficient,
      ),
      targetCoefficient: Number(
        example.values.targetCoefficient,
      ),
      targetUnit: example.targetUnit,
    };

    if (example.knownUnit === "g") {
      input.knownMolarMass = Number(
        example.values.knownMolarMass,
      );
    }

    if (example.targetUnit === "g") {
      input.targetMolarMass = Number(
        example.values.targetMolarMass,
      );
    }

    setKnownUnit(example.knownUnit);
    setTargetUnit(example.targetUnit);
    setValues(example.values);
    setResult(
      calculateStoichiometry(input),
    );
    setError("");
  }

  function resetCalculator() {
    setKnownUnit("g");
    setTargetUnit("g");
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
              Enter balanced-equation values
            </p>

            <h2>
              Solve a stoichiometry problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field">
            <label htmlFor="stoichiometry-known-unit">
              Known amount unit
            </label>

            <select
              id="stoichiometry-known-unit"
              value={knownUnit}
              onChange={(event) =>
                changeKnownUnit(
                  event.target
                    .value as StoichiometryUnit,
                )
              }
            >
              <option value="g">
                Grams (g)
              </option>

              <option value="mol">
                Moles (mol)
              </option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="stoichiometry-target-unit">
              Target result unit
            </label>

            <select
              id="stoichiometry-target-unit"
              value={targetUnit}
              onChange={(event) =>
                changeTargetUnit(
                  event.target
                    .value as StoichiometryUnit,
                )
              }
            >
              <option value="g">
                Grams (g)
              </option>

              <option value="mol">
                Moles (mol)
              </option>
            </select>
          </div>
        </div>

        <div className="density-fields">
          <div className="form-field">
            <label htmlFor="stoichiometry-known-amount">
              Known amount
            </label>

            <div className="input-with-suffix">
              <input
                id="stoichiometry-known-amount"
                name="knownAmount"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={values.knownAmount}
                onChange={(event) =>
                  updateValue(
                    "knownAmount",
                    event.target.value,
                  )
                }
                placeholder="Enter amount"
                aria-describedby="stoichiometry-known-amount-help"
              />

              <span>{knownUnit}</span>
            </div>

            <p id="stoichiometry-known-amount-help">
              Given quantity of the known substance.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="stoichiometry-known-coefficient">
              Known coefficient
            </label>

            <input
              id="stoichiometry-known-coefficient"
              name="knownCoefficient"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={values.knownCoefficient}
              onChange={(event) =>
                updateValue(
                  "knownCoefficient",
                  event.target.value,
                )
              }
              placeholder="For example, 2"
              aria-describedby="stoichiometry-known-coefficient-help"
            />

            <p id="stoichiometry-known-coefficient-help">
              Coefficient before the known substance.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="stoichiometry-known-molar-mass">
              Known molar mass
            </label>

            <div className="input-with-suffix">
              <input
                id="stoichiometry-known-molar-mass"
                name="knownMolarMass"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={values.knownMolarMass}
                onChange={(event) =>
                  updateValue(
                    "knownMolarMass",
                    event.target.value,
                  )
                }
                disabled={knownUnit === "mol"}
                placeholder={
                  knownUnit === "mol"
                    ? "Not required"
                    : "Enter molar mass"
                }
                aria-describedby="stoichiometry-known-molar-mass-help"
              />

              <span>g/mol</span>
            </div>

            <p id="stoichiometry-known-molar-mass-help">
              Required when the known quantity uses grams.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="stoichiometry-target-coefficient">
              Target coefficient
            </label>

            <input
              id="stoichiometry-target-coefficient"
              name="targetCoefficient"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={values.targetCoefficient}
              onChange={(event) =>
                updateValue(
                  "targetCoefficient",
                  event.target.value,
                )
              }
              placeholder="For example, 2"
              aria-describedby="stoichiometry-target-coefficient-help"
            />

            <p id="stoichiometry-target-coefficient-help">
              Coefficient before the target substance.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="stoichiometry-target-molar-mass">
              Target molar mass
            </label>

            <div className="input-with-suffix">
              <input
                id="stoichiometry-target-molar-mass"
                name="targetMolarMass"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={values.targetMolarMass}
                onChange={(event) =>
                  updateValue(
                    "targetMolarMass",
                    event.target.value,
                  )
                }
                disabled={targetUnit === "mol"}
                placeholder={
                  targetUnit === "mol"
                    ? "Not required"
                    : "Enter molar mass"
                }
                aria-describedby="stoichiometry-target-molar-mass-help"
              />

              <span>g/mol</span>
            </div>

            <p id="stoichiometry-target-molar-mass-help">
              Required when the target result uses grams.
            </p>
          </div>
        </div>

        <p className="calculator-unit-note">
          Use coefficients from a correctly balanced
          chemical equation. Molar mass is required
          for gram conversions.
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
            Calculate target amount
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
              Target amount
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              <span className="calculator-result__unit">
                {result.details.targetUnit}
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Known quantity in moles</dt>
                <dd>
                  {formatDetailValue(
                    result.details.knownMoles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>Target-to-known ratio</dt>
                <dd>
                  {formatDetailValue(
                    result.details.targetCoefficient,
                  )}
                  :
                  {formatDetailValue(
                    result.details.knownCoefficient,
                  )}
                </dd>
              </div>

              <div>
                <dt>Target quantity in moles</dt>
                <dd>
                  {formatDetailValue(
                    result.details.targetMoles,
                  )}{" "}
                  mol
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation method</h3>

              <p>
                {formatDetailValue(
                  result.details.knownMoles,
                )}{" "}
                mol × (
                {formatDetailValue(
                  result.details.targetCoefficient,
                )}{" "}
                ÷{" "}
                {formatDetailValue(
                  result.details.knownCoefficient,
                )}
                ) ={" "}
                {formatDetailValue(
                  result.details.targetMoles,
                )}{" "}
                mol
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">n</span>

            <h2>
              Your result will appear here
            </h2>

            <p>
              Enter the known quantity and the two
              balanced-equation coefficients.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
