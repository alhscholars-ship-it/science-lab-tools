"use client";

import { useState, type FormEvent } from "react";

import {
  calculateScientificNotation,
  formatDecimal,
  normalizeScientificNotation,
  scientificToDecimal,
  type ScientificNotationResult,
  type ScientificOperation,
} from "@/lib/calculators/scientific-notation";

type Mode = "decimal-to-scientific" | "scientific-to-decimal" | "arithmetic";

export function ScientificNotationCalculator() {
  const [mode, setMode] = useState<Mode>("decimal-to-scientific");
  const [decimal, setDecimal] = useState("123000");
  const [firstCoefficient, setFirstCoefficient] = useState("3");
  const [firstExponent, setFirstExponent] = useState("4");
  const [secondCoefficient, setSecondCoefficient] = useState("5");
  const [secondExponent, setSecondExponent] = useState("3");
  const [operation, setOperation] = useState<ScientificOperation>("multiply");
  const [precision, setPrecision] = useState("6");
  const [result, setResult] = useState<ScientificNotationResult | null>(null);
  const [decimalResult, setDecimalResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function clearResult() {
    setResult(null);
    setDecimalResult(null);
    setError("");
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const significantFigures = Number(precision);
      if (mode === "decimal-to-scientific") {
        setResult(normalizeScientificNotation(Number(decimal), significantFigures));
        setDecimalResult(Number(decimal));
      } else if (mode === "scientific-to-decimal") {
        const value = scientificToDecimal({ coefficient: Number(firstCoefficient), exponent: Number(firstExponent) });
        setResult(normalizeScientificNotation(value, significantFigures));
        setDecimalResult(value);
      } else {
        const nextResult = calculateScientificNotation(
          { coefficient: Number(firstCoefficient), exponent: Number(firstExponent) },
          operation,
          { coefficient: Number(secondCoefficient), exponent: Number(secondExponent) },
          significantFigures,
        );
        setResult(nextResult);
        setDecimalResult(nextResult.value);
      }
      setError("");
    } catch (calculationError) {
      setResult(null);
      setDecimalResult(null);
      setError(calculationError instanceof Error ? calculationError.message : "The calculation could not be completed.");
    }
  }

  return (
    <div className="calculator-panel">
      <form className="calculator-form" onSubmit={calculate} noValidate>
        <div className="calculator-form__heading">
          <div><p className="calculator-form__label">Convert and calculate</p><h2>Scientific notation calculator</h2></div>
          <span className="calculator-form__status">Free tool</span>
        </div>

        <div className="form-field">
          <label htmlFor="notation-mode">Calculation mode</label>
          <select id="notation-mode" value={mode} onChange={(event) => { setMode(event.target.value as Mode); clearResult(); }}>
            <option value="decimal-to-scientific">Decimal to scientific notation</option>
            <option value="scientific-to-decimal">Scientific notation to decimal</option>
            <option value="arithmetic">Scientific notation arithmetic</option>
          </select>
        </div>

        {mode === "decimal-to-scientific" ? (
          <div className="form-field">
            <label htmlFor="notation-decimal">Decimal number</label>
            <input id="notation-decimal" type="number" step="any" inputMode="decimal" value={decimal} onChange={(event) => { setDecimal(event.target.value); clearResult(); }} />
          </div>
        ) : (
          <>
            <div className="calculator-options-grid">
              <div className="form-field"><label htmlFor="first-coefficient">First coefficient</label><input id="first-coefficient" type="number" step="any" value={firstCoefficient} onChange={(event) => { setFirstCoefficient(event.target.value); clearResult(); }} /></div>
              <div className="form-field"><label htmlFor="first-exponent">First power of 10</label><input id="first-exponent" type="number" step="1" value={firstExponent} onChange={(event) => { setFirstExponent(event.target.value); clearResult(); }} /></div>
            </div>
            {mode === "arithmetic" ? (
              <>
                <div className="form-field"><label htmlFor="notation-operation">Operation</label><select id="notation-operation" value={operation} onChange={(event) => { setOperation(event.target.value as ScientificOperation); clearResult(); }}><option value="add">Add</option><option value="subtract">Subtract</option><option value="multiply">Multiply</option><option value="divide">Divide</option></select></div>
                <div className="calculator-options-grid">
                  <div className="form-field"><label htmlFor="second-coefficient">Second coefficient</label><input id="second-coefficient" type="number" step="any" value={secondCoefficient} onChange={(event) => { setSecondCoefficient(event.target.value); clearResult(); }} /></div>
                  <div className="form-field"><label htmlFor="second-exponent">Second power of 10</label><input id="second-exponent" type="number" step="1" value={secondExponent} onChange={(event) => { setSecondExponent(event.target.value); clearResult(); }} /></div>
                </div>
              </>
            ) : null}
          </>
        )}

        <div className="form-field">
          <label htmlFor="notation-precision">Significant figures in result</label>
          <input id="notation-precision" type="number" min="1" max="12" step="1" value={precision} onChange={(event) => { setPrecision(event.target.value); clearResult(); }} />
        </div>

        {error ? <div className="calculator-error" role="alert">{error}</div> : null}
        <div className="calculator-actions">
          <button className="button button--primary" type="submit">Calculate</button>
          <button className="button button--secondary" type="button" onClick={() => { setDecimal("123000"); setFirstCoefficient("3"); setFirstExponent("4"); setSecondCoefficient("5"); setSecondExponent("3"); setPrecision("6"); clearResult(); }}>Reset</button>
        </div>
      </form>

      <section className={`calculator-result ${result ? "calculator-result--complete" : ""}`} aria-live="polite" aria-atomic="true">
        {result && decimalResult !== null ? (
          <>
            <p className="calculator-result__label">Normalized scientific notation</p>
            <p className="calculator-result__value">{result.formattedCoefficient} <span className="calculator-result__unit">× 10<sup>{result.exponent}</sup></span></p>
            <dl className="calculator-result__details"><div><dt>Decimal form</dt><dd>{formatDecimal(decimalResult)}</dd></div><div><dt>Coefficient</dt><dd>{result.formattedCoefficient}</dd></div><div><dt>Exponent</dt><dd>{result.exponent}</dd></div></dl>
          </>
        ) : (
          <div className="calculator-result__empty"><span aria-hidden="true">10ⁿ</span><h2>Your result will appear here</h2><p>Choose a mode and enter the values to normalize or calculate.</p></div>
        )}
      </section>
    </div>
  );
}
