"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  calculateLimitingReactant,
  type LimitingReactantDetails,
  type LimitingReactantUnit,
} from "@/lib/calculators/limiting-reactant";
import type { CalculationResult } from "@/types/calculator";

type LimitingReactantResult =
  CalculationResult<LimitingReactantDetails>;

type FormValues = {
  reactantAName: string;
  reactantAAmount: string;
  reactantACoefficient: string;
  reactantAMolarMass: string;
  reactantBName: string;
  reactantBAmount: string;
  reactantBCoefficient: string;
  reactantBMolarMass: string;
  productCoefficient: string;
  productMolarMass: string;
};

type Example = {
  label: string;
  reactantAUnit: LimitingReactantUnit;
  reactantBUnit: LimitingReactantUnit;
  productUnit: LimitingReactantUnit;
  values: FormValues;
};

type UnitSelectProps = {
  id: string;
  label: string;
  value: LimitingReactantUnit;
  onChange: (
    unit: LimitingReactantUnit,
  ) => void;
};

type NumberFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  suffix?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const emptyValues: FormValues = {
  reactantAName: "",
  reactantAAmount: "",
  reactantACoefficient: "",
  reactantAMolarMass: "",
  reactantBName: "",
  reactantBAmount: "",
  reactantBCoefficient: "",
  reactantBMolarMass: "",
  productCoefficient: "",
  productMolarMass: "",
};

const examples: readonly Example[] = [
  {
    label: "Hydrogen is limiting",
    reactantAUnit: "mol",
    reactantBUnit: "mol",
    productUnit: "mol",
    values: {
      reactantAName: "Hydrogen",
      reactantAAmount: "2",
      reactantACoefficient: "2",
      reactantAMolarMass: "",
      reactantBName: "Oxygen",
      reactantBAmount: "2",
      reactantBCoefficient: "1",
      reactantBMolarMass: "",
      productCoefficient: "2",
      productMolarMass: "",
    },
  },
  {
    label: "Water yield in grams",
    reactantAUnit: "g",
    reactantBUnit: "g",
    productUnit: "g",
    values: {
      reactantAName: "Hydrogen",
      reactantAAmount: "4.032",
      reactantACoefficient: "2",
      reactantAMolarMass: "2.016",
      reactantBName: "Oxygen",
      reactantBAmount: "32",
      reactantBCoefficient: "1",
      reactantBMolarMass: "32",
      productCoefficient: "2",
      productMolarMass: "18.015",
    },
  },
  {
    label: "Co-limiting reactants",
    reactantAUnit: "mol",
    reactantBUnit: "mol",
    productUnit: "mol",
    values: {
      reactantAName: "Hydrogen",
      reactantAAmount: "4",
      reactantACoefficient: "2",
      reactantAMolarMass: "",
      reactantBName: "Oxygen",
      reactantBAmount: "2",
      reactantBCoefficient: "1",
      reactantBMolarMass: "",
      productCoefficient: "2",
      productMolarMass: "",
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
    Number.isFinite(value) === false
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
    maximumSignificantDigits: 10,
  });
}

function UnitSelect({
  id,
  label,
  value,
  onChange,
}: UnitSelectProps) {
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) =>
          onChange(
            event.target
              .value as LimitingReactantUnit,
          )
        }
      >
        <option value="mol">
          Moles (mol)
        </option>

        <option value="g">
          Grams (g)
        </option>
      </select>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  placeholder,
  suffix,
  disabled = false,
  onChange,
}: NumberFieldProps) {
  const input = (
    <input
      id={id}
      name={id}
      type="number"
      inputMode="decimal"
      step="any"
      min="0"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(event) =>
        onChange(event.target.value)
      }
    />
  );

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
      </label>

      {suffix ? (
        <div className="input-with-suffix">
          {input}
          <span>{suffix}</span>
        </div>
      ) : (
        input
      )}
    </div>
  );
}

function createExampleInput(
  example: Example,
): Parameters<
  typeof calculateLimitingReactant
>[0] {
  const input: Parameters<
    typeof calculateLimitingReactant
  >[0] = {
    reactantA: {
      name: example.values.reactantAName,
      amount: Number(
        example.values.reactantAAmount,
      ),
      unit: example.reactantAUnit,
      coefficient: Number(
        example.values.reactantACoefficient,
      ),
    },
    reactantB: {
      name: example.values.reactantBName,
      amount: Number(
        example.values.reactantBAmount,
      ),
      unit: example.reactantBUnit,
      coefficient: Number(
        example.values.reactantBCoefficient,
      ),
    },
    product: {
      coefficient: Number(
        example.values.productCoefficient,
      ),
      unit: example.productUnit,
    },
  };

  if (example.reactantAUnit === "g") {
    input.reactantA.molarMass = Number(
      example.values.reactantAMolarMass,
    );
  }

  if (example.reactantBUnit === "g") {
    input.reactantB.molarMass = Number(
      example.values.reactantBMolarMass,
    );
  }

  if (example.productUnit === "g") {
    input.product.molarMass = Number(
      example.values.productMolarMass,
    );
  }

  return input;
}

export function LimitingReactantCalculator() {
  const [reactantAUnit, setReactantAUnit] =
    useState<LimitingReactantUnit>("mol");

  const [reactantBUnit, setReactantBUnit] =
    useState<LimitingReactantUnit>("mol");

  const [productUnit, setProductUnit] =
    useState<LimitingReactantUnit>("mol");

  const [values, setValues] =
    useState<FormValues>(emptyValues);

  const [result, setResult] =
    useState<LimitingReactantResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function updateValue(
    field: keyof FormValues,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    clearFeedback();
  }

  function changeReactantAUnit(
    unit: LimitingReactantUnit,
  ) {
    setReactantAUnit(unit);

    if (unit === "mol") {
      setValues((currentValues) => ({
        ...currentValues,
        reactantAMolarMass: "",
      }));
    }

    clearFeedback();
  }

  function changeReactantBUnit(
    unit: LimitingReactantUnit,
  ) {
    setReactantBUnit(unit);

    if (unit === "mol") {
      setValues((currentValues) => ({
        ...currentValues,
        reactantBMolarMass: "",
      }));
    }

    clearFeedback();
  }

  function changeProductUnit(
    unit: LimitingReactantUnit,
  ) {
    setProductUnit(unit);

    if (unit === "mol") {
      setValues((currentValues) => ({
        ...currentValues,
        productMolarMass: "",
      }));
    }

    clearFeedback();
  }

  function buildInput(): Parameters<
    typeof calculateLimitingReactant
  >[0] {
    const input: Parameters<
      typeof calculateLimitingReactant
    >[0] = {
      reactantA: {
        name: values.reactantAName,
        amount: parsePositiveValue(
          values.reactantAAmount,
          "Reactant A amount",
        ),
        unit: reactantAUnit,
        coefficient: parsePositiveValue(
          values.reactantACoefficient,
          "Reactant A coefficient",
        ),
      },
      reactantB: {
        name: values.reactantBName,
        amount: parsePositiveValue(
          values.reactantBAmount,
          "Reactant B amount",
        ),
        unit: reactantBUnit,
        coefficient: parsePositiveValue(
          values.reactantBCoefficient,
          "Reactant B coefficient",
        ),
      },
      product: {
        coefficient: parsePositiveValue(
          values.productCoefficient,
          "Product coefficient",
        ),
        unit: productUnit,
      },
    };

    if (reactantAUnit === "g") {
      input.reactantA.molarMass =
        parsePositiveValue(
          values.reactantAMolarMass,
          "Reactant A molar mass",
        );
    }

    if (reactantBUnit === "g") {
      input.reactantB.molarMass =
        parsePositiveValue(
          values.reactantBMolarMass,
          "Reactant B molar mass",
        );
    }

    if (productUnit === "g") {
      input.product.molarMass =
        parsePositiveValue(
          values.productMolarMass,
          "Product molar mass",
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
        calculateLimitingReactant(
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
    example: Example,
  ) {
    setReactantAUnit(example.reactantAUnit);
    setReactantBUnit(example.reactantBUnit);
    setProductUnit(example.productUnit);
    setValues(example.values);
    setResult(
      calculateLimitingReactant(
        createExampleInput(example),
      ),
    );
    setError("");
  }

  function resetCalculator() {
    setReactantAUnit("mol");
    setReactantBUnit("mol");
    setProductUnit("mol");
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
              Balanced reaction inputs
            </p>

            <h2>
              Find the limiting reactant
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <UnitSelect
            id="limiting-reactant-a-unit"
            label="Reactant A unit"
            value={reactantAUnit}
            onChange={changeReactantAUnit}
          />

          <UnitSelect
            id="limiting-reactant-b-unit"
            label="Reactant B unit"
            value={reactantBUnit}
            onChange={changeReactantBUnit}
          />

          <UnitSelect
            id="limiting-product-unit"
            label="Product result unit"
            value={productUnit}
            onChange={changeProductUnit}
          />
        </div>

        <div className="density-fields">
          <div className="form-field">
            <label htmlFor="limiting-reactant-a-name">
              Reactant A name
            </label>

            <input
              id="limiting-reactant-a-name"
              name="reactantAName"
              type="text"
              value={values.reactantAName}
              placeholder="For example, Hydrogen"
              onChange={(event) =>
                updateValue(
                  "reactantAName",
                  event.target.value,
                )
              }
            />
          </div>

          <NumberField
            id="limiting-reactant-a-amount"
            label="Reactant A amount"
            value={values.reactantAAmount}
            placeholder="Enter amount"
            suffix={reactantAUnit}
            onChange={(value) =>
              updateValue(
                "reactantAAmount",
                value,
              )
            }
          />

          <NumberField
            id="limiting-reactant-a-coefficient"
            label="Reactant A coefficient"
            value={values.reactantACoefficient}
            placeholder="For example, 2"
            onChange={(value) =>
              updateValue(
                "reactantACoefficient",
                value,
              )
            }
          />

          <NumberField
            id="limiting-reactant-a-molar-mass"
            label="Reactant A molar mass"
            value={values.reactantAMolarMass}
            placeholder={
              reactantAUnit === "mol"
                ? "Not required"
                : "Enter molar mass"
            }
            suffix="g/mol"
            disabled={reactantAUnit === "mol"}
            onChange={(value) =>
              updateValue(
                "reactantAMolarMass",
                value,
              )
            }
          />

          <div className="form-field">
            <label htmlFor="limiting-reactant-b-name">
              Reactant B name
            </label>

            <input
              id="limiting-reactant-b-name"
              name="reactantBName"
              type="text"
              value={values.reactantBName}
              placeholder="For example, Oxygen"
              onChange={(event) =>
                updateValue(
                  "reactantBName",
                  event.target.value,
                )
              }
            />
          </div>

          <NumberField
            id="limiting-reactant-b-amount"
            label="Reactant B amount"
            value={values.reactantBAmount}
            placeholder="Enter amount"
            suffix={reactantBUnit}
            onChange={(value) =>
              updateValue(
                "reactantBAmount",
                value,
              )
            }
          />

          <NumberField
            id="limiting-reactant-b-coefficient"
            label="Reactant B coefficient"
            value={values.reactantBCoefficient}
            placeholder="For example, 1"
            onChange={(value) =>
              updateValue(
                "reactantBCoefficient",
                value,
              )
            }
          />

          <NumberField
            id="limiting-reactant-b-molar-mass"
            label="Reactant B molar mass"
            value={values.reactantBMolarMass}
            placeholder={
              reactantBUnit === "mol"
                ? "Not required"
                : "Enter molar mass"
            }
            suffix="g/mol"
            disabled={reactantBUnit === "mol"}
            onChange={(value) =>
              updateValue(
                "reactantBMolarMass",
                value,
              )
            }
          />

          <NumberField
            id="limiting-product-coefficient"
            label="Product coefficient"
            value={values.productCoefficient}
            placeholder="For example, 2"
            onChange={(value) =>
              updateValue(
                "productCoefficient",
                value,
              )
            }
          />

          <NumberField
            id="limiting-product-molar-mass"
            label="Product molar mass"
            value={values.productMolarMass}
            placeholder={
              productUnit === "mol"
                ? "Not required"
                : "Enter molar mass"
            }
            suffix="g/mol"
            disabled={productUnit === "mol"}
            onChange={(value) =>
              updateValue(
                "productMolarMass",
                value,
              )
            }
          />
        </div>

        <p className="calculator-unit-note">
          Use coefficients from a balanced equation.
          Enter molar mass whenever grams are selected.
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
            Find limiting reactant
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
              {result.details.isCoLimiting
                ? "Co-limiting reactants"
                : "Limiting reactant"}
            </p>

            <p className="calculator-result__value">
              {result.details.limitingReactant}
            </p>

            <p className="calculator-result__summary">
              Theoretical product:{" "}
              <strong>
                {result.formattedValue}{" "}
                {result.details.productUnit}
              </strong>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>
                  {result.details.reactantAName}
                  {" "}available
                </dt>
                <dd>
                  {formatDetailValue(
                    result.details.reactantAMoles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>
                  {result.details.reactantBName}
                  {" "}available
                </dt>
                <dd>
                  {formatDetailValue(
                    result.details.reactantBMoles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>
                  Reactant A reaction capacity
                </dt>
                <dd>
                  {formatDetailValue(result.details.reactantAReactionCapacity)}
                </dd>
              </div>

              <div>
                <dt>
                  Reactant B reaction capacity
                </dt>
                <dd>
                  {formatDetailValue(result.details.reactantBReactionCapacity)}
                </dd>
              </div>

              <div>
                <dt>Excess reactant</dt>
                <dd>
                  {result.details.excessReactant ??
                    "None"}
                </dd>
              </div>

              <div>
                <dt>Excess remaining</dt>
                <dd>
                  {formatDetailValue(
                    result.details.excessMoles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>Reaction extent</dt>
                <dd>
                  {formatDetailValue(
                    result.details.reactionExtent,
                  )}
                </dd>
              </div>

              <div>
                <dt>Product in moles</dt>
                <dd>
                  {formatDetailValue(
                    result.details.productMoles,
                  )}{" "}
                  mol
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation method</h3>
              <p>{result.details.formula}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">LR</span>

            <h2>
              Your result will appear here
            </h2>

            <p>
              Enter two reactants and balanced
              coefficients, then calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
