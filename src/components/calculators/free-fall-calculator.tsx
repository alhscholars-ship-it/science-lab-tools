"use client";

import { useState } from "react";
import {
  calculateFreeFall,
} from "@/lib/calculators/free-fall";

export function FreeFallCalculator() {
  const [height, setHeight] = useState("20");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<{
    height?: number;
    time?: number;
    velocity?: number;
  } | null>(null);

  function calculate() {
    const input = {
      height: height ? Number(height) : undefined,
      time: time ? Number(time) : undefined,
    };

    setResult(calculateFreeFall(input));
  }

  return (
    <div className="space-y-4">
      <label>
        Height (m)
        <input
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
      </label>

      <label>
        Time (s)
        <input
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
      </label>

      <button onClick={calculate}>
        Calculate
      </button>

      {result && (
        <div>
          {result.height !== undefined && (
            <p>
              Height: {result.height.toFixed(3)} m
            </p>
          )}

          {result.velocity !== undefined && (
            <p>
              Final Velocity: {result.velocity.toFixed(3)} m/s
            </p>
          )}

          {result.time !== undefined && (
            <p>
              Fall Time: {result.time.toFixed(3)} s
            </p>
          )}
        </div>
      )}
    </div>
  );
}
