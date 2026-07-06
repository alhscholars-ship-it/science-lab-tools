"use client";

import { useState, type FormEvent } from "react";

import {
  calculateUncertaintyPropagation,
  getPropagationExpression,
  type PropagationOperation,
  type UncertaintyPropagationResult,
} from "@/lib/calculators/uncertainty-propagation";

const examples = [
  {
    label: "Addition",
    firstValue: "10",
    firstUncertainty: "0.2",
    secondValue: "5",
    secondUncertainty: "0.1",
    operation: "addition",
  },
  {
    label: "Multiplication",
    firstValue: "10",
    firstUncertainty: "0.2",
    secondValue: "5",
    secondUncertainty: "0.1",
    operation: "multiplication",
  },
  {
    label: "Division",
    firstValue: "20",
    firstUncertainty: "1",
    secondValue: "4",
    secondUncertainty: "0.2",
    operation: "division",
  },
] as const satisfies readonly {
  label: string;
  firstValue: string;
  firstUncertainty: string;
  secondValue: string;
  secondUncertainty: string;
  operation: PropagationOperation;
}[];

const operationLabels: Record<
  PropagationOperation,
  string
> = {
  addition: "Addition",
  subtraction: "Subtraction",
  multiplication: "Multiplication",
  division: "Division",
};

export function UncertaintyPropagationCalculator() {
  const [firstValue, setFirstValue] = useState("");
  const [firstUncertainty, setFirstUncertainty] =
    useState("");
  const [secondValue, setSecondValue] = useState("");
  const [secondUncertainty, setSecondUncertainty] =
    useState("");
  const [operation, setOperation] =
    useState<PropagationOperation>("addition");
  const [result, setResult] =
    useState<UncertaintyPropagationResult | null>(
      null,
    );
  const [error, setError] = useState("");

  function parseInput(
    value: string,
    label: string,
  ): number | null {
    const parsed = Number(value);

    if (value.trim() === "" || !Number.isFinite(parsed)) {
      setError(`Enter a valid ${label}.`);
      return null;
    }

    return parsed;
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    const parsedFirstValue = parseInput(
      firstValue,
      "first measured value",
    );

    if (parsedFirstValue === null) {
      return;
    }

    const parsedFirstUncertainty = parseInput(
      firstUncertainty,
      "first absolute uncertainty",
    );

    if (parsedFirstUncertainty === null) {
      return;
    }

    const parsedSecondValue = parseInput(
      secondValue,
      "second measured value",
    );

    if (parsedSecondValue === null) {
      return;
    }

    const parsedSecondUncertainty = parseInput(
      secondUncertainty,
      "second absolute uncertainty",
    );

    if (parsedSecondUncertainty === null) {
      return;
    }

    try {
      setResult(
        calculateUncertaintyPropagation({
          first: {
            value: parsedFirstValue,
            absoluteUncertainty:
              parsedFirstUncertainty,
          },
          second: {
            value: parsedSecondValue,
            absoluteUncertainty:
              parsedSecondUncertainty,
          },
          operation,
        }),
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
    example: (typeof examples)[number],
  ) {
    setFirstValue(example.firstValue);
    setFirstUncertainty(
      example.firstUncertainty,
    );
    setSecondValue(example.secondValue);
    setSecondUncertainty(
      example.secondUncertainty,
    );
    setOperation(example.operation);
    setError("");

    setResult(
      calculateUncertaintyPropagation({
        first: {
          value: Number(example.firstValue),
          absoluteUncertainty: Number(
            example.firstUncertainty,
          ),
        },
        second: {
          value: Number(example.secondValue),
          absoluteUncertainty: Number(
            example.secondUncertainty,
          ),
        },
        operation: example.operation,
      }),
    );
  }

  function resetCalculator() {
    setFirstValue("");
    setFirstUncertainty("");
    setSecondValue("");
    setSecondUncertainty("");
    setOperation("addition");
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
              Enter two uncertain measurements
            </p>
            <h2>Propagate uncertainty</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <fieldset className="calculator-options">
          <legend>Select the operation</legend>

          <div className="calculator-options-grid">
            {(
              Object.keys(
                operationLabels,
              ) as PropagationOperation[]
            ).map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="operation"
                  value={option}
                  checked={operation === option}
                  onChange={() => {
                    setOperation(option);
                    setResult(null);
                    setError("");
                  }}
                />
                <span>
                  {operationLabels[option]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="first-value">
              First measured value
            </label>

            <input
              id="first-value"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 10"
              value={firstValue}
              onChange={(event) => {
                setFirstValue(event.target.value);
                setResult(null);
                setError("");
              }}
            />
          </div>

          <div className="form-field">
            <label htmlFor="first-uncertainty">
              First absolute uncertainty
            </label>

            <input
              id="first-uncertainty"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 0.2"
              value={firstUncertainty}
              onChange={(event) => {
                setFirstUncertainty(
                  event.target.value,
                );
                setResult(null);
                setError("");
              }}
            />
          </div>

          <div className="form-field">
            <label htmlFor="second-value">
              Second measured value
            </label>

            <input
              id="second-value"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 5"
              value={secondValue}
              onChange={(event) => {
                setSecondValue(event.target.value);
                setResult(null);
                setError("");
              }}
            />
          </div>

          <div className="form-field">
            <label htmlFor="second-uncertainty">
              Second absolute uncertainty
            </label>

            <input
              id="second-uncertainty"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 0.1"
              value={secondUncertainty}
              onChange={(event) => {
                setSecondUncertainty(
                  event.target.value,
                );
                setResult(null);
                setError("");
              }}
            />
          </div>
        </div>

        <p className="calculator-unit-note">
          Addition and subtraction add absolute
          uncertainties. Multiplication and division add
          relative uncertainties.
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
            Propagate uncertainty
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
              Propagated result
            </p>

            <p className="calculator-result__value">
              {result.resultNotation}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Operation</dt>
                <dd>
                  {operationLabels[result.operation]}
                </dd>
              </div>

              <div>
                <dt>Calculated value</dt>
                <dd>
                  {result.formattedResultValue}
                </dd>
              </div>

              <div>
                <dt>Absolute uncertainty</dt>
                <dd>
                  {
                    result.formattedAbsoluteUncertainty
                  }
                </dd>
              </div>

              <div>
                <dt>Relative uncertainty</dt>
                <dd>
                  {
                    result.formattedRelativeUncertainty
                  }
                </dd>
              </div>

              <div>
                <dt>Percentage uncertainty</dt>
                <dd>
                  {
                    result.formattedPercentageUncertainty
                  }
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation rule</h3>
              <p>
                {getPropagationExpression(result)} ={" "}
                {result.formattedResultValue}
              </p>
              <p>{result.rule}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">±</span>
            <h2>
              Your propagated uncertainty will appear
              here
            </h2>
            <p>
              Enter two measured values, their absolute
              uncertainties, and select an operation.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
