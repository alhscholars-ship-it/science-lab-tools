"use client";

import { useState, type FormEvent } from "react";

import {
  convertUnit,
  quantities,
  type ConversionResult,
} from "@/lib/calculators/unit-converter";

const initialQuantity = quantities[0];

export function ScientificUnitConverter() {
  const [quantityId, setQuantityId] = useState<string>(initialQuantity.id);
  const [fromUnitId, setFromUnitId] = useState<string>(initialQuantity.units[0].id);
  const [toUnitId, setToUnitId] = useState<string>(initialQuantity.units[1].id);
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState("");

  const quantity = quantities.find(({ id }) => id === quantityId) ?? initialQuantity;

  function selectQuantity(nextId: string) {
    const next = quantities.find(({ id }) => id === nextId) ?? initialQuantity;
    setQuantityId(next.id);
    setFromUnitId(next.units[0].id);
    setToUnitId(next.units[1].id);
    setResult(null);
    setError("");
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setResult(convertUnit(Number(inputValue), quantityId, fromUnitId, toUnitId));
      setError("");
    } catch (conversionError) {
      setResult(null);
      setError(conversionError instanceof Error ? conversionError.message : "The conversion could not be completed.");
    }
  }

  function swapUnits() {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form className="calculator-form" onSubmit={calculate} noValidate>
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">Convert scientific measurements</p>
            <h2>Scientific unit converter</h2>
          </div>
          <span className="calculator-form__status">Free tool</span>
        </div>

        <div className="form-field">
          <label htmlFor="converter-quantity">Measurement type</label>
          <select id="converter-quantity" value={quantityId} onChange={(event) => selectQuantity(event.target.value)}>
            {quantities.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field">
            <label htmlFor="converter-value">Value</label>
            <input id="converter-value" type="number" inputMode="decimal" step="any" value={inputValue}
              onChange={(event) => { setInputValue(event.target.value); setResult(null); setError(""); }} />
          </div>
          <div className="form-field">
            <label htmlFor="converter-from">From unit</label>
            <select id="converter-from" value={fromUnitId} onChange={(event) => { setFromUnitId(event.target.value); setResult(null); }}>
              {quantity.units.map((unit) => <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="converter-to">To unit</label>
            <select id="converter-to" value={toUnitId} onChange={(event) => { setToUnitId(event.target.value); setResult(null); }}>
              {quantity.units.map((unit) => <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>)}
            </select>
          </div>
        </div>

        {error ? <div className="calculator-error" role="alert">{error}</div> : null}

        <div className="calculator-actions">
          <button className="button button--primary" type="submit">Convert units</button>
          <button className="button button--secondary" type="button" onClick={swapUnits}>Swap units</button>
        </div>

        <div className="calculator-examples">
          <span>Try an example:</span>
          <button type="button" onClick={() => { selectQuantity("temperature"); setInputValue("25"); }}>25 °C</button>
          <button type="button" onClick={() => { selectQuantity("pressure"); setInputValue("1"); }}>1 Pa</button>
        </div>
      </form>

      <section className={`calculator-result ${result ? "calculator-result--complete" : ""}`} aria-live="polite" aria-atomic="true">
        {result ? (
          <>
            <p className="calculator-result__label">Converted {quantity.name.toLowerCase()}</p>
            <p className="calculator-result__value">{result.formattedValue} <span className="calculator-result__unit">{result.toUnit.symbol}</span></p>
            <div className="calculator-result__working">
              <h3>Conversion</h3>
              <p>{inputValue} {result.fromUnit.symbol} = {result.formattedValue} {result.toUnit.symbol}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">⇄</span>
            <h2>Your conversion will appear here</h2>
            <p>Select a measurement type and two units, then enter a value.</p>
          </div>
        )}
      </section>
    </div>
  );
}
