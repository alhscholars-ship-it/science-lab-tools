"use client";

import { useState, type FormEvent } from "react";

import {
  calculateWheatstoneBridge,
  type WheatstoneBridgeDetails,
  type WheatstoneBridgeMode,
} from "@/lib/calculators/wheatstone-bridge";
import type { CalculationResult } from "@/types/calculator";

type WheatstoneBridgeResult =
  CalculationResult<WheatstoneBridgeDetails>;

type WheatstoneBridgeValues = {
  supplyVoltage: string;
  resistanceOne: string;
  resistanceTwo: string;
  resistanceThree: string;
  unknownResistance: string;
};

type WheatstoneBridgeExample = {
  label: string;
  mode: WheatstoneBridgeMode;
  values: WheatstoneBridgeValues;
};

const emptyValues: WheatstoneBridgeValues = {
  supplyVoltage: "",
  resistanceOne: "",
  resistanceTwo: "",
  resistanceThree: "",
  unknownResistance: "",
};

const modeContent: Record<
  WheatstoneBridgeMode,
  {
    heading: string;
    instruction: string;
    buttonLabel: string;
    resultLabel: string;
  }
> = {
  unknownResistance: {
    heading: "Calculate an unknown bridge resistance",
    instruction:
      "Enter three known resistor values for a balanced Wheatstone bridge",
    buttonLabel: "Calculate unknown resistance",
    resultLabel: "Unknown resistance",
  },
  outputVoltage: {
    heading: "Calculate Wheatstone bridge output voltage",
    instruction:
      "Enter the supply voltage and all four bridge resistances",
    buttonLabel: "Calculate output voltage",
    resultLabel: "Bridge output voltage",
  },
  balanceCheck: {
    heading: "Check Wheatstone bridge balance",
    instruction:
      "Enter all four resistance values to compare the bridge ratios",
    buttonLabel: "Check bridge balance",
    resultLabel: "Bridge condition",
  },
};

const examples: readonly WheatstoneBridgeExample[] = [
  {
    label: "Find unknown resistance",
    mode: "unknownResistance",
    values: {
      supplyVoltage: "",
      resistanceOne: "100",
      resistanceTwo: "200",
      resistanceThree: "300",
      unknownResistance: "",
    },
  },
  {
    label: "Balanced output",
    mode: "outputVoltage",
    values: {
      supplyVoltage: "10",
      resistanceOne: "100",
      resistanceTwo: "200",
      resistanceThree: "300",
      unknownResistance: "600",
    },
  },
  {
    label: "Unbalanced output",
    mode: "outputVoltage",
    values: {
      supplyVoltage: "12",
      resistanceOne: "100",
      resistanceTwo: "300",
      resistanceThree: "200",
      unknownResistance: "300",
    },
  },
  {
    label: "Check balance",
    mode: "balanceCheck",
    values: {
      supplyVoltage: "",
      resistanceOne: "100",
      resistanceTwo: "200",
      resistanceThree: "300",
      unknownResistance: "600",
    },
  },
];

function parsePositiveValue(
  value: string,
  label: string,
): number {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    throw new Error(`Enter ${label.toLowerCase()}.`);
  }

  const numericValue = Number(trimmedValue);

  if (
    !Number.isFinite(numericValue) ||
    numericValue <= 0
  ) {
    throw new Error(
      `${label} must be a number greater than zero.`,
    );
  }

  return numericValue;
}

function buildInput(
  mode: WheatstoneBridgeMode,
  values: WheatstoneBridgeValues,
): Parameters<typeof calculateWheatstoneBridge>[0] {
  const input: Parameters<
    typeof calculateWheatstoneBridge
  >[0] = {
    mode,
    resistanceOne: parsePositiveValue(
      values.resistanceOne,
      "Resistance R1",
    ),
    resistanceTwo: parsePositiveValue(
      values.resistanceTwo,
      "Resistance R2",
    ),
    resistanceThree: parsePositiveValue(
      values.resistanceThree,
      "Resistance R3",
    ),
  };

  if (mode === "outputVoltage") {
    input.supplyVoltage = parsePositiveValue(
      values.supplyVoltage,
      "Supply voltage",
    );
  }

  if (
    mode === "outputVoltage" ||
    mode === "balanceCheck"
  ) {
    input.unknownResistance = parsePositiveValue(
      values.unknownResistance,
      "Unknown resistance Rx",
    );
  }

  return input;
}

export function WheatstoneBridgeCalculator() {
  const [mode, setMode] =
    useState<WheatstoneBridgeMode>(
      "unknownResistance",
    );

  const [values, setValues] =
    useState<WheatstoneBridgeValues>(emptyValues);

  const [result, setResult] =
    useState<WheatstoneBridgeResult | null>(null);

  const [error, setError] = useState("");

  const currentModeContent = modeContent[mode];

  function updateValue(
    field: keyof WheatstoneBridgeValues,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function changeMode(nextMode: WheatstoneBridgeMode) {
    setMode(nextMode);
    setResult(null);
    setError("");

    setValues((currentValues) => ({
      ...currentValues,
      supplyVoltage:
        nextMode === "outputVoltage"
          ? currentValues.supplyVoltage
          : "",
      unknownResistance:
        nextMode === "unknownResistance"
          ? ""
          : currentValues.unknownResistance,
    }));
  }

  function runCalculation(
    selectedMode: WheatstoneBridgeMode,
    inputValues: WheatstoneBridgeValues,
  ) {
    const calculationResult =
      calculateWheatstoneBridge(
        buildInput(selectedMode, inputValues),
      );

    setResult(calculationResult);

    if (selectedMode === "unknownResistance") {
      setValues((currentValues) => ({
        ...currentValues,
        unknownResistance: String(
          calculationResult.details
            .unknownResistance,
        ),
      }));
    }

    return calculationResult;
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      runCalculation(mode, values);
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: WheatstoneBridgeExample,
  ) {
    try {
      const exampleValues = {
        ...example.values,
      };

      const calculationResult =
        calculateWheatstoneBridge(
          buildInput(example.mode, exampleValues),
        );

      setMode(example.mode);
      setValues({
        ...exampleValues,
        unknownResistance:
          example.mode === "unknownResistance"
            ? String(
                calculationResult.details
                  .unknownResistance,
              )
            : exampleValues.unknownResistance,
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
    setMode("unknownResistance");
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  const showSupplyVoltage =
    mode === "outputVoltage";

  const showUnknownResistance =
    mode !== "unknownResistance";

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
              {currentModeContent.instruction}
            </p>

            <h2>{currentModeContent.heading}</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="wheatstone-bridge-mode">
              Select calculation
            </label>

            <select
              id="wheatstone-bridge-mode"
              value={mode}
              onChange={(event) =>
                changeMode(
                  event.target
                    .value as WheatstoneBridgeMode,
                )
              }
            >
              <option value="unknownResistance">
                Calculate unknown resistance
              </option>

              <option value="outputVoltage">
                Calculate output voltage
              </option>

              <option value="balanceCheck">
                Check bridge balance
              </option>
            </select>
          </div>
        </div>

        <div className="density-fields">
          {showSupplyVoltage ? (
            <div className="form-field">
              <label htmlFor="wheatstone-supply-voltage">
                Supply voltage (Vs)
              </label>

              <div className="input-with-suffix">
                <input
                  id="wheatstone-supply-voltage"
                  name="supplyVoltage"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder="Enter voltage"
                  value={values.supplyVoltage}
                  onChange={(event) =>
                    updateValue(
                      "supplyVoltage",
                      event.target.value,
                    )
                  }
                  aria-describedby="wheatstone-supply-voltage-help"
                />

                <span>V</span>
              </div>

              <p id="wheatstone-supply-voltage-help">
                Voltage applied across the bridge.
              </p>
            </div>
          ) : null}

          <div className="form-field">
            <label htmlFor="wheatstone-resistance-one">
              Resistance one (R1)
            </label>

            <div className="input-with-suffix">
              <input
                id="wheatstone-resistance-one"
                name="resistanceOne"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="Enter resistance"
                value={values.resistanceOne}
                onChange={(event) =>
                  updateValue(
                    "resistanceOne",
                    event.target.value,
                  )
                }
                aria-describedby="wheatstone-resistance-one-help"
              />

              <span>Ω</span>
            </div>

            <p id="wheatstone-resistance-one-help">
              Upper resistance in the left bridge arm.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="wheatstone-resistance-two">
              Resistance two (R2)
            </label>

            <div className="input-with-suffix">
              <input
                id="wheatstone-resistance-two"
                name="resistanceTwo"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="Enter resistance"
                value={values.resistanceTwo}
                onChange={(event) =>
                  updateValue(
                    "resistanceTwo",
                    event.target.value,
                  )
                }
                aria-describedby="wheatstone-resistance-two-help"
              />

              <span>Ω</span>
            </div>

            <p id="wheatstone-resistance-two-help">
              Lower resistance in the left bridge arm.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="wheatstone-resistance-three">
              Resistance three (R3)
            </label>

            <div className="input-with-suffix">
              <input
                id="wheatstone-resistance-three"
                name="resistanceThree"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="Enter resistance"
                value={values.resistanceThree}
                onChange={(event) =>
                  updateValue(
                    "resistanceThree",
                    event.target.value,
                  )
                }
                aria-describedby="wheatstone-resistance-three-help"
              />

              <span>Ω</span>
            </div>

            <p id="wheatstone-resistance-three-help">
              Upper resistance in the right bridge arm.
            </p>
          </div>

          {showUnknownResistance ? (
            <div className="form-field">
              <label htmlFor="wheatstone-unknown-resistance">
                Unknown resistance (Rx)
              </label>

              <div className="input-with-suffix">
                <input
                  id="wheatstone-unknown-resistance"
                  name="unknownResistance"
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder="Enter resistance"
                  value={values.unknownResistance}
                  onChange={(event) =>
                    updateValue(
                      "unknownResistance",
                      event.target.value,
                    )
                  }
                  aria-describedby="wheatstone-unknown-resistance-help"
                />

                <span>Ω</span>
              </div>

              <p id="wheatstone-unknown-resistance-help">
                Lower resistance in the right bridge arm.
              </p>
            </div>
          ) : null}
        </div>

        <p className="calculator-unit-note">
          Enter positive resistance values in the same
          unit. The calculated resistance will use that
          same unit.
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
            {currentModeContent.buttonLabel}
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
              onClick={() => loadExample(example)}
            >
              {example.label}
            </button>
          ))}
        </div>
      </form>

      <section
        className="calculator-result"
        aria-live="polite"
        aria-label="Wheatstone bridge calculation result"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              {
                modeContent[result.details.mode]
                  .resultLabel
              }
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}
              {result.details.mode ===
              "unknownResistance"
                ? " Ω"
                : result.details.mode ===
                    "outputVoltage"
                  ? " V"
                  : ""}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Resistance R1</dt>
                <dd>
                  {result.details.resistanceOne} Ω
                </dd>
              </div>

              <div>
                <dt>Resistance R2</dt>
                <dd>
                  {result.details.resistanceTwo} Ω
                </dd>
              </div>

              <div>
                <dt>Resistance R3</dt>
                <dd>
                  {result.details.resistanceThree} Ω
                </dd>
              </div>

              <div>
                <dt>Resistance Rx</dt>
                <dd>
                  {result.details.unknownResistance} Ω
                </dd>
              </div>

              <div>
                <dt>Left ratio</dt>
                <dd>{result.details.leftRatio}</dd>
              </div>

              <div>
                <dt>Right ratio</dt>
                <dd>{result.details.rightRatio}</dd>
              </div>

              <div>
                <dt>Balance difference</dt>
                <dd>
                  {result.details.balanceDifference}
                </dd>
              </div>

              <div>
                <dt>Bridge status</dt>
                <dd>
                  {result.details.isBalanced
                    ? "Balanced"
                    : "Unbalanced"}
                </dd>
              </div>

              {result.details.supplyVoltage !==
              undefined ? (
                <div>
                  <dt>Supply voltage</dt>
                  <dd>
                    {result.details.supplyVoltage} V
                  </dd>
                </div>
              ) : null}

              {result.details.leftDividerVoltage !==
              undefined ? (
                <div>
                  <dt>Left midpoint voltage</dt>
                  <dd>
                    {
                      result.details
                        .leftDividerVoltage
                    }{" "}
                    V
                  </dd>
                </div>
              ) : null}

              {result.details.rightDividerVoltage !==
              undefined ? (
                <div>
                  <dt>Right midpoint voltage</dt>
                  <dd>
                    {
                      result.details
                        .rightDividerVoltage
                    }{" "}
                    V
                  </dd>
                </div>
              ) : null}
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
                <strong>Balance check:</strong>{" "}
                {result.details.isBalanced
                  ? "The bridge ratios are equal."
                  : "The bridge ratios are not equal."}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <p className="calculator-result__label">
              Result
            </p>

            <h2>
              Your Wheatstone bridge result will
              appear here
            </h2>

            <p>
              Select a calculation mode, enter the
              required circuit values, and press
              calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
