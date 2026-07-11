"use client";

import { useState, type FormEvent } from "react";

import {
  calculateFreeFall,
  type FreeFallResult,
} from "@/lib/calculators/free-fall";

type FreeFallDisplayResult = FreeFallResult & {
  mode: "height" | "time";
  inputValue: number;
};

const examples = [
  {
    label: "20 m drop",
    height: "20",
    time: "",
    gravity: "9.80665",
  },
  {
    label: "2 second fall",
    height: "",
    time: "2",
    gravity: "9.80665",
  },
  {
    label: "Moon gravity",
    height: "20",
    time: "",
    gravity: "1.62",
  },
] as const;

export function FreeFallCalculator() {
  const [height, setHeight] = useState("20");
  const [time, setTime] = useState("");
  const [gravity, setGravity] = useState("9.80665");
  const [result, setResult] =
    useState<FreeFallDisplayResult | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const heightValue =
      height.trim() === "" ? undefined : Number(height);

    const timeValue =
      time.trim() === "" ? undefined : Number(time);

    const gravityValue = Number(gravity);

    if (
      heightValue === undefined &&
      timeValue === undefined
    ) {
      setError("Enter either a height or a fall time.");
      return;
    }

    if (
      heightValue !== undefined &&
      timeValue !== undefined
    ) {
      setError(
        "Enter only one starting value: height or fall time.",
      );
      return;
    }

    if (
      heightValue !== undefined &&
      !Number.isFinite(heightValue)
    ) {
      setError("Enter a valid height.");
      return;
    }

    if (
      timeValue !== undefined &&
      !Number.isFinite(timeValue)
    ) {
      setError("Enter a valid fall time.");
      return;
    }

    if (
      gravity.trim() === "" ||
      !Number.isFinite(gravityValue)
    ) {
      setError("Enter a valid gravitational acceleration.");
      return;
    }

    try {
      const output = calculateFreeFall({
        height: heightValue,
        time: timeValue,
        gravity: gravityValue,
      });

      setResult({
        ...output,
        mode:
          heightValue !== undefined
            ? "height"
            : "time",
        inputValue:
          heightValue !== undefined
            ? heightValue
            : (timeValue as number),
      });
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
    setHeight(example.height);
    setTime(example.time);
    setGravity(example.gravity);
    setError("");

    const heightValue =
      example.height === ""
        ? undefined
        : Number(example.height);

    const timeValue =
      example.time === ""
        ? undefined
        : Number(example.time);

    const output = calculateFreeFall({
      height: heightValue,
      time: timeValue,
      gravity: Number(example.gravity),
    });

    setResult({
      ...output,
      mode:
        heightValue !== undefined
          ? "height"
          : "time",
      inputValue:
        heightValue !== undefined
          ? heightValue
          : (timeValue as number),
    });
  }

  function resetCalculator() {
    setHeight("");
    setTime("");
    setGravity("9.80665");
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
              Enter one starting value
            </p>
            <h2>Calculate free-fall motion</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="free-fall-height">
              Height (m)
            </label>
            <input
              id="free-fall-height"
              name="height"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 20"
              value={height}
              onChange={(event) => {
                setHeight(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="free-fall-height-help"
            />
            <p id="free-fall-height-help">
              Enter height to calculate fall time and final
              velocity.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="free-fall-time">
              Fall time (s)
            </label>
            <input
              id="free-fall-time"
              name="time"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 2"
              value={time}
              onChange={(event) => {
                setTime(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="free-fall-time-help"
            />
            <p id="free-fall-time-help">
              Enter time to calculate fallen distance and final
              velocity.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="free-fall-gravity">
              Gravity (m/s²)
            </label>
            <input
              id="free-fall-gravity"
              name="gravity"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 9.80665"
              value={gravity}
              onChange={(event) => {
                setGravity(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="free-fall-gravity-help"
            />
            <p id="free-fall-gravity-help">
              Standard Earth gravity is 9.80665 m/s².
            </p>
          </div>
        </div>

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
            Calculate free fall
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
              Free-fall result
            </p>

            <p className="calculator-result__value">
              {result.velocity?.toLocaleString("en-US", {
                maximumFractionDigits: 6,
              })}{" "}
              <span>m/s</span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Starting value</dt>
                <dd>
                  {result.inputValue.toLocaleString("en-US")}{" "}
                  {result.mode === "height" ? "m" : "s"}
                </dd>
              </div>

              {result.height !== undefined ? (
                <div>
                  <dt>Distance fallen</dt>
                  <dd>
                    {result.height.toLocaleString("en-US", {
                      maximumFractionDigits: 6,
                    })}{" "}
                    m
                  </dd>
                </div>
              ) : null}

              {result.time !== undefined ? (
                <div>
                  <dt>Fall time</dt>
                  <dd>
                    {result.time.toLocaleString("en-US", {
                      maximumFractionDigits: 6,
                    })}{" "}
                    s
                  </dd>
                </div>
              ) : null}

              <div>
                <dt>Gravity</dt>
                <dd>
                  {result.gravity.toLocaleString("en-US", {
                    maximumFractionDigits: 6,
                  })}{" "}
                  m/s²
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                {result.mode === "height"
                  ? "t = √(2h ÷ g), v = √(2gh)"
                  : "h = ½gt², v = gt"}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">↓</span>
            <h2>Your result will appear here</h2>
            <p>
              Enter either height or time, confirm gravity, then
              select calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
