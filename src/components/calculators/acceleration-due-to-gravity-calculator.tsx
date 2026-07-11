"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAccelerationDueToGravity,
} from "@/lib/calculators/acceleration-due-to-gravity";

type GravityResult = {
  gravity: number;
  mode: "calculated" | "override";
  mass?: number;
  radius?: number;
};

const examples = [
  {
    label: "Earth",
    mass: "5.972e24",
    radius: "6371000",
    gravity: "",
  },
  {
    label: "Moon",
    mass: "7.342e22",
    radius: "1737400",
    gravity: "",
  },
  {
    label: "Mars",
    mass: "6.4171e23",
    radius: "3389500",
    gravity: "",
  },
] as const;

export function AccelerationDueToGravityCalculator() {
  const [mass, setMass] = useState("5.972e24");
  const [radius, setRadius] = useState("6371000");
  const [gravity, setGravity] = useState("");
  const [result, setResult] =
    useState<GravityResult | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const trimmedGravity = gravity.trim();

    try {
      if (trimmedGravity !== "") {
        const gravityValue = Number(trimmedGravity);

        if (!Number.isFinite(gravityValue)) {
          setError("Enter a valid gravity override.");
          return;
        }

        const output = calculateAccelerationDueToGravity({
          gravity: gravityValue,
        });

        setResult({
          gravity: output.gravity,
          mode: "override",
        });

        return;
      }

      const massValue = Number(mass);
      const radiusValue = Number(radius);

      if (mass.trim() === "" || !Number.isFinite(massValue)) {
        setError("Enter a valid planetary mass.");
        return;
      }

      if (
        radius.trim() === "" ||
        !Number.isFinite(radiusValue)
      ) {
        setError("Enter a valid planetary radius.");
        return;
      }

      const output = calculateAccelerationDueToGravity({
        mass: massValue,
        radius: radiusValue,
      });

      setResult({
        gravity: output.gravity,
        mode: "calculated",
        mass: massValue,
        radius: radiusValue,
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
    setMass(example.mass);
    setRadius(example.radius);
    setGravity(example.gravity);
    setError("");

    const massValue = Number(example.mass);
    const radiusValue = Number(example.radius);

    const output = calculateAccelerationDueToGravity({
      mass: massValue,
      radius: radiusValue,
    });

    setResult({
      gravity: output.gravity,
      mode: "calculated",
      mass: massValue,
      radius: radiusValue,
    });
  }

  function resetCalculator() {
    setMass("");
    setRadius("");
    setGravity("");
    setResult(null);
    setError("");
  }

  const formattedGravity = result
    ? result.gravity.toLocaleString("en-US", {
        maximumFractionDigits: 6,
      })
    : "";

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
              Enter planetary values
            </p>
            <h2>Calculate gravitational acceleration</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="planet-mass">
              Planetary mass (kg)
            </label>
            <input
              id="planet-mass"
              name="mass"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 5.972e24"
              value={mass}
              onChange={(event) => {
                setMass(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="planet-mass-help"
            />
            <p id="planet-mass-help">
              Enter the mass of the planet or celestial body.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="planet-radius">
              Radius from center (m)
            </label>
            <input
              id="planet-radius"
              name="radius"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Example: 6371000"
              value={radius}
              onChange={(event) => {
                setRadius(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="planet-radius-help"
            />
            <p id="planet-radius-help">
              Use the distance from the body&apos;s center.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="gravity-override">
              Gravity override (m/s²)
            </label>
            <input
              id="gravity-override"
              name="gravity"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Optional: 9.81"
              value={gravity}
              onChange={(event) => {
                setGravity(event.target.value);
                setResult(null);
                setError("");
              }}
              aria-describedby="gravity-override-help"
            />
            <p id="gravity-override-help">
              Optional. When entered, this value is returned
              directly instead of using mass and radius.
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
            Calculate gravity
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
              Acceleration due to gravity
            </p>

            <p className="calculator-result__value">
              {formattedGravity} <span>m/s²</span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Calculation mode</dt>
                <dd>
                  {result.mode === "override"
                    ? "Direct gravity value"
                    : "Mass and radius"}
                </dd>
              </div>

              {result.mass !== undefined ? (
                <div>
                  <dt>Mass</dt>
                  <dd>{result.mass.toExponential(6)} kg</dd>
                </div>
              ) : null}

              {result.radius !== undefined ? (
                <div>
                  <dt>Radius</dt>
                  <dd>
                    {result.radius.toLocaleString("en-US")} m
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                {result.mode === "override"
                  ? `g = ${formattedGravity} m/s²`
                  : "g = G × M ÷ r²"}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">g</span>
            <h2>Your result will appear here</h2>
            <p>
              Enter mass and radius, or provide a direct
              gravity override, then select calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
