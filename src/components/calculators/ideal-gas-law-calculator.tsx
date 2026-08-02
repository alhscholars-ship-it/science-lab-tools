"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  calculateIdealGasLaw,
  type IdealGasLawDetails,
  type IdealGasPressureUnit,
  type IdealGasTemperatureUnit,
  type IdealGasVariable,
  type IdealGasVolumeUnit,
} from "@/lib/calculators/ideal-gas-law";
import type { CalculationResult } from "@/types/calculator";

type IdealGasLawResult =
  CalculationResult<IdealGasLawDetails>;

type IdealGasField = {
  key: IdealGasVariable;
  label: string;
  symbol: string;
  description: string;
};

type IdealGasExample = {
  label: string;
  solveFor: IdealGasVariable;
  values: Record<IdealGasVariable, string>;
  pressureUnit: IdealGasPressureUnit;
  volumeUnit: IdealGasVolumeUnit;
  temperatureUnit: IdealGasTemperatureUnit;
};

const fields: readonly IdealGasField[] = [
  {
    key: "pressure",
    label: "Pressure",
    symbol: "P",
    description:
      "Absolute pressure exerted by the gas.",
  },
  {
    key: "volume",
    label: "Volume",
    symbol: "V",
    description:
      "Volume occupied by the gas.",
  },
  {
    key: "moles",
    label: "Amount of gas",
    symbol: "n",
    description:
      "Amount of gas measured in moles.",
  },
  {
    key: "temperature",
    label: "Temperature",
    symbol: "T",
    description:
      "Absolute or converted gas temperature.",
  },
];

const variableLabels: Record<
  IdealGasVariable,
  string
> = {
  pressure: "Pressure",
  volume: "Volume",
  moles: "Amount of gas",
  temperature: "Temperature",
};

const emptyValues: Record<
  IdealGasVariable,
  string
> = {
  pressure: "",
  volume: "",
  moles: "",
  temperature: "",
};

const examples: readonly IdealGasExample[] = [
  {
    label: "Gas at STP",
    solveFor: "pressure",
    values: {
      pressure: "",
      volume: "22.414",
      moles: "1",
      temperature: "273.15",
    },
    pressureUnit: "kPa",
    volumeUnit: "L",
    temperatureUnit: "K",
  },
  {
    label: "Balloon volume",
    solveFor: "volume",
    values: {
      pressure: "1",
      volume: "",
      moles: "0.5",
      temperature: "25",
    },
    pressureUnit: "atm",
    volumeUnit: "L",
    temperatureUnit: "C",
  },
  {
    label: "Find gas moles",
    solveFor: "moles",
    values: {
      pressure: "760",
      volume: "5",
      moles: "",
      temperature: "25",
    },
    pressureUnit: "mmHg",
    volumeUnit: "L",
    temperatureUnit: "C",
  },
  {
    label: "Find temperature",
    solveFor: "temperature",
    values: {
      pressure: "1",
      volume: "24.465",
      moles: "1",
      temperature: "",
    },
    pressureUnit: "atm",
    volumeUnit: "L",
    temperatureUnit: "C",
  },
];

function formatDetailValue(
  value: number,
): string {
  return value.toLocaleString("en-US", {
    maximumSignificantDigits: 8,
  });
}

export function IdealGasLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<IdealGasVariable>("pressure");

  const [values, setValues] = useState<
    Record<IdealGasVariable, string>
  >(emptyValues);

  const [pressureUnit, setPressureUnit] =
    useState<IdealGasPressureUnit>("kPa");

  const [volumeUnit, setVolumeUnit] =
    useState<IdealGasVolumeUnit>("L");

  const [
    temperatureUnit,
    setTemperatureUnit,
  ] = useState<IdealGasTemperatureUnit>("K");

  const [result, setResult] =
    useState<IdealGasLawResult | null>(null);

  const [error, setError] = useState("");

  function clearResult() {
    setResult(null);
    setError("");
  }

  function updateValue(
    field: IdealGasVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    clearResult();
  }

  function changeSolveFor(
    variable: IdealGasVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    clearResult();
  }

  function getUnit(
    variable: IdealGasVariable,
  ): string {
    switch (variable) {
      case "pressure":
        return pressureUnit;

      case "volume":
        return volumeUnit === "m3"
          ? "m³"
          : volumeUnit;

      case "moles":
        return "mol";

      case "temperature":
        if (temperatureUnit === "C") {
          return "°C";
        }

        if (temperatureUnit === "F") {
          return "°F";
        }

        return "K";

      default: {
        const exhaustiveCheck: never =
          variable;

        return exhaustiveCheck;
      }
    }
  }

  function createInput(
    selectedVariable: IdealGasVariable,
    inputValues: Record<
      IdealGasVariable,
      string
    >,
  ): Parameters<typeof calculateIdealGasLaw>[0] {
    const input: Parameters<
      typeof calculateIdealGasLaw
    >[0] = {
      solveFor: selectedVariable,
      pressureUnit,
      volumeUnit,
      temperatureUnit,
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

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const calculationResult =
        calculateIdealGasLaw(
          createInput(solveFor, values),
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
          : "The calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: IdealGasExample,
  ) {
    const input: Parameters<
      typeof calculateIdealGasLaw
    >[0] = {
      solveFor: example.solveFor,
      pressureUnit: example.pressureUnit,
      volumeUnit: example.volumeUnit,
      temperatureUnit:
        example.temperatureUnit,
    };

    for (const field of fields) {
      if (field.key === example.solveFor) {
        continue;
      }

      input[field.key] = Number(
        example.values[field.key],
      );
    }

    const calculationResult =
      calculateIdealGasLaw(input);

    setSolveFor(example.solveFor);
    setPressureUnit(example.pressureUnit);
    setVolumeUnit(example.volumeUnit);
    setTemperatureUnit(
      example.temperatureUnit,
    );

    setValues({
      ...example.values,
      [example.solveFor]: String(
        calculationResult.value,
      ),
    });

    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("pressure");
    setValues(emptyValues);
    setPressureUnit("kPa");
    setVolumeUnit("L");
    setTemperatureUnit("K");
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
              Enter three known gas values
            </p>

            <h2>
              Solve an ideal gas law problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="ideal-gas-solve-for">
              Calculate which value?
            </label>

            <select
              id="ideal-gas-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as IdealGasVariable,
                )
              }
            >
              {fields.map((field) => (
                <option
                  key={field.key}
                  value={field.key}
                >
                  {field.label} ({field.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="form-field dilution-solve-field">
            <label htmlFor="ideal-gas-pressure-unit">
              Pressure unit
            </label>

            <select
              id="ideal-gas-pressure-unit"
              value={pressureUnit}
              onChange={(event) => {
                setPressureUnit(
                  event.target
                    .value as IdealGasPressureUnit,
                );
                clearResult();
              }}
            >
              <option value="Pa">Pa</option>
              <option value="kPa">kPa</option>
              <option value="bar">bar</option>
              <option value="atm">atm</option>
              <option value="mmHg">
                mmHg
              </option>
            </select>
          </div>

          <div className="form-field dilution-solve-field">
            <label htmlFor="ideal-gas-volume-unit">
              Volume unit
            </label>

            <select
              id="ideal-gas-volume-unit"
              value={volumeUnit}
              onChange={(event) => {
                setVolumeUnit(
                  event.target
                    .value as IdealGasVolumeUnit,
                );
                clearResult();
              }}
            >
              <option value="mL">mL</option>
              <option value="L">L</option>
              <option value="m3">m³</option>
            </select>
          </div>

          <div className="form-field dilution-solve-field">
            <label htmlFor="ideal-gas-temperature-unit">
              Temperature unit
            </label>

            <select
              id="ideal-gas-temperature-unit"
              value={temperatureUnit}
              onChange={(event) => {
                setTemperatureUnit(
                  event.target
                    .value as IdealGasTemperatureUnit,
                );
                clearResult();
              }}
            >
              <option value="K">Kelvin</option>
              <option value="C">
                Celsius
              </option>
              <option value="F">
                Fahrenheit
              </option>
            </select>
          </div>
        </div>

        <div className="density-fields">
          {fields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <div
                className="form-field"
                key={field.key}
              >
                <label
                  htmlFor={`ideal-gas-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`ideal-gas-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.key ===
                      "temperature"
                        ? undefined
                        : "0"
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
                    aria-describedby={`ideal-gas-${field.key}-help`}
                  />

                  <span>
                    {getUnit(field.key)}
                  </span>
                </div>

                <p
                  id={`ideal-gas-${field.key}-help`}
                >
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          The calculator converts all values
          internally to kPa, liters, moles, and
          kelvin. Gas temperature must remain
          above absolute zero.
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
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Pressure</dt>
                <dd>
                  {formatDetailValue(
                    result.details.pressureKpa,
                  )}{" "}
                  kPa
                </dd>
              </div>

              <div>
                <dt>Volume</dt>
                <dd>
                  {formatDetailValue(
                    result.details.volumeLiters,
                  )}{" "}
                  L
                </dd>
              </div>

              <div>
                <dt>Amount of gas</dt>
                <dd>
                  {formatDetailValue(
                    result.details.moles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>Temperature</dt>
                <dd>
                  {formatDetailValue(
                    result.details
                      .temperatureKelvin,
                  )}{" "}
                  K
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation basis</h3>

              <p>
                {
                  result.details.formula
                }
              </p>

              <p>
                R ={" "}
                {formatDetailValue(
                  result.details.gasConstant,
                )}{" "}
                kPa·L/(mol·K)
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">
              PV
            </span>

            <h2>
              Your result will appear here
            </h2>

            <p>
              Select the unknown variable,
              enter the other three values,
              and calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
