"use client";

import { useState, type FormEvent } from "react";

import {
  calculateMolarity,
  type MolarityDetails,
  type VolumeUnit,
} from "@/lib/calculators/molarity";
import type { CalculationResult } from "@/types/calculator";

type MolarityResult = CalculationResult<MolarityDetails>;

const examples = [
  {
    label: "500 mL solution",
    moles: "0.25",
    volume: "500",
    unit: "mL" as const,
  },
  {
    label: "2 L solution",
    moles: "1.5",
    volume: "2",
    unit: "L" as const,
  },
] as const;

export function MolarityCalculator() {
  const [molesOfSolute, setMolesOfSolute] = useState("");
  const [solutionVolume, setSolutionVolume] = useState("");
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>("mL");
  const [result, setResult] = useState<MolarityResult | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const moles = Number(molesOfSolute);
    const volume = Number(solutionVolume);

    if (molesOfSolute.trim() === "" || !Number.isFinite(moles)) {
      setError("Enter a valid number of moles.");
      return;
    }

    if (solutionVolume.trim() === "" || !Number.isFinite(volume)) {
      setError("Enter a valid solution volume.");
      return;
    }

    try {
      setResult(
        calculateMolarity({
          molesOfSolute: moles,
          solutionVolume: volume,
          volumeUnit,
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
    moles: string,
    volume: string,
    unit: VolumeUnit,
  ) {
    setMolesOfSolute(moles);
    setSolutionVolume(volume);
    setVolumeUnit(unit);
    setError("");

    setResult(
      calculateMolarity({
        molesOfSolute: Number(moles),
        solutionVolume: Number(volume),
        volumeUnit: unit,
      }),
    );
  }

  function resetCalculator() {
    setMolesOfSolute("");
    setSolutionVolume("");
    setVolumeUnit("mL");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form className="calculator-form" onSubmit={calculate} noValidate>
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              Enter solution values
            </p>
            <h2>Calculate molarity</h2>
          </div>

          <span className="calculator-form__status">Free tool</span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="moles-of-solute">
              Moles of solute
            </label>
            <input
              id="moles-of-solute"
              name="molesOfSolute"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 0.25"
              value={molesOfSolute}
              onChange={(event) =>
                setMolesOfSolute(event.target.value)
              }
              aria-describedby="moles-help"
            />
            <p id="moles-help">
              Amount of dissolved solute measured in moles.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="solution-volume">
              Solution volume
            </label>

            <div className="input-with-unit">
              <input
                id="solution-volume"
                name="solutionVolume"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="Example: 500"
                value={solutionVolume}
                onChange={(event) =>
                  setSolutionVolume(event.target.value)
                }
                aria-describedby="volume-help"
              />

              <select
                aria-label="Solution volume unit"
                value={volumeUnit}
                onChange={(event) =>
                  setVolumeUnit(event.target.value as VolumeUnit)
                }
              >
                <option value="mL">mL</option>
                <option value="L">L</option>
              </select>
            </div>

            <p id="volume-help">
              Total final volume of the solution.
            </p>
          </div>
        </div>

        {error ? (
          <div className="calculator-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button className="button button--primary" type="submit">
            Calculate molarity
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
                loadExample(
                  example.moles,
                  example.volume,
                  example.unit,
                )
              }
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
            <p className="calculator-result__label">Molarity</p>
            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Moles of solute</dt>
                <dd>{result.details.molesOfSolute} mol</dd>
              </div>
              <div>
                <dt>Entered volume</dt>
                <dd>
                  {result.details.originalVolume}{" "}
                  {result.details.volumeUnit}
                </dd>
              </div>
              <div>
                <dt>Volume in liters</dt>
                <dd>{result.details.volumeInLiters} L</dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>
                {result.details.molesOfSolute} mol ÷{" "}
                {result.details.volumeInLiters} L
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">M</span>
            <h2>Your result will appear here</h2>
            <p>
              Enter moles and solution volume, then select
              calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
