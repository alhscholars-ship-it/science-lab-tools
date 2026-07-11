"use client";

import { useState, type FormEvent } from "react";

import {
  calculateProjectileMotion,
  type ProjectileResult,
} from "@/lib/calculators/projectile-motion";

type ProjectileDisplayResult = ProjectileResult & {
  initialVelocity: number;
  angle: number;
  gravity: number;
};

const examples = [
  {
    label: "45° launch",
    velocity: "20",
    angle: "45",
    gravity: "9.81",
  },
  {
    label: "30° launch",
    velocity: "25",
    angle: "30",
    gravity: "9.81",
  },
  {
    label: "Moon gravity",
    velocity: "20",
    angle: "45",
    gravity: "1.62",
  },
] as const;

export function ProjectileMotionCalculator() {
  const [velocity, setVelocity] = useState("20");
  const [angle, setAngle] = useState("45");
  const [gravity, setGravity] = useState("9.81");
  const [result, setResult] =
    useState<ProjectileDisplayResult | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const velocityValue = Number(velocity);
    const angleValue = Number(angle);
    const gravityValue = Number(gravity);

    if (
      velocity.trim() === "" ||
      !Number.isFinite(velocityValue)
    ) {
      setError("Enter a valid initial velocity.");
      return;
    }

    if (
      angle.trim() === "" ||
      !Number.isFinite(angleValue)
    ) {
      setError("Enter a valid launch angle.");
      return;
    }

    if (angleValue <= 0 || angleValue >= 90) {
      setError(
        "Launch angle must be greater than 0° and less than 90°.",
      );
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
      const output = calculateProjectileMotion({
        initialVelocity: velocityValue,
        angle: angleValue,
        gravity: gravityValue,
      });

      setResult({
        ...output,
        initialVelocity: velocityValue,
        angle: angleValue,
        gravity: gravityValue,
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
    setVelocity(example.velocity);
    setAngle(example.angle);
    setGravity(example.gravity);
    setError("");

    const velocityValue = Number(example.velocity);
    const angleValue = Number(example.angle);
    const gravityValue = Number(example.gravity);

    const output = calculateProjectileMotion({
      initialVelocity: velocityValue,
      angle: angleValue,
      gravity: gravityValue,
    });

    setResult({
      ...output,
      initialVelocity: velocityValue,
      angle: angleValue,
      gravity: gravityValue,
    });
  }

  function resetCalculator() {
    setVelocity("");
    setAngle("");
    setGravity("9.81");
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
              Enter launch conditions
            </p>
            <h2>Calculate projectile motion</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="projectile-velocity">
              Initial velocity (m/s)
            </label>
            <input
              id="projectile-velocity"
              name="initialVelocity"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 20"
              value={velocity}
              onChange={(event) => {
                setVelocity(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="projectile-velocity-help"
            />
            <p id="projectile-velocity-help">
              Enter the launch speed of the projectile.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="projectile-angle">
              Launch angle (degrees)
            </label>
            <input
              id="projectile-angle"
              name="angle"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 45"
              value={angle}
              onChange={(event) => {
                setAngle(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="projectile-angle-help"
            />
            <p id="projectile-angle-help">
              Use an angle greater than 0° and less than 90°.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="projectile-gravity">
              Gravity (m/s²)
            </label>
            <input
              id="projectile-gravity"
              name="gravity"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 9.81"
              value={gravity}
              onChange={(event) => {
                setGravity(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="projectile-gravity-help"
            />
            <p id="projectile-gravity-help">
              Standard Earth gravity is 9.81 m/s².
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
            Calculate projectile motion
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
              Projectile range
            </p>

            <p className="calculator-result__value">
              {result.range.toLocaleString("en-US", {
                maximumFractionDigits: 6,
              })}{" "}
              <span>m</span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Maximum height</dt>
                <dd>
                  {result.maximumHeight.toLocaleString("en-US", {
                    maximumFractionDigits: 6,
                  })}{" "}
                  m
                </dd>
              </div>

              <div>
                <dt>Flight time</dt>
                <dd>
                  {result.flightTime.toLocaleString("en-US", {
                    maximumFractionDigits: 6,
                  })}{" "}
                  s
                </dd>
              </div>

              <div>
                <dt>Initial velocity</dt>
                <dd>{result.initialVelocity} m/s</dd>
              </div>

              <div>
                <dt>Launch angle</dt>
                <dd>{result.angle}°</dd>
              </div>

              <div>
                <dt>Gravity</dt>
                <dd>{result.gravity} m/s²</dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                R = v² sin(2θ) ÷ g, H = v² sin²(θ) ÷ 2g,
                T = 2v sin(θ) ÷ g
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">↗</span>
            <h2>Your result will appear here</h2>
            <p>
              Enter velocity, launch angle, and gravity, then
              select calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
