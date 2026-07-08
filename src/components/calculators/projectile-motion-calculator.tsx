"use client";

import {
  calculateProjectileMotion,
} from "@/lib/calculators/projectile-motion";

import { useState } from "react";

export function ProjectileMotionCalculator() {
  const [velocity, setVelocity] = useState("20");
  const [angle, setAngle] = useState("45");
  const [gravity, setGravity] = useState("9.81");
  const [result, setResult] = useState<{
    range: number;
    maximumHeight: number;
    flightTime: number;
  } | null>(null);

  function calculate() {
    const output = calculateProjectileMotion({
      initialVelocity: Number(velocity),
      angle: Number(angle),
      gravity: Number(gravity),
    });

    setResult(output);
  }

  return (
    <div className="calculator-card">
      <h2>Projectile Motion Calculator</h2>

      <label>
        Initial Velocity (m/s)
        <input
          value={velocity}
          onChange={(e) => setVelocity(e.target.value)}
        />
      </label>

      <label>
        Launch Angle (degrees)
        <input
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
        />
      </label>

      <label>
        Gravity (m/s²)
        <input
          value={gravity}
          onChange={(e) => setGravity(e.target.value)}
        />
      </label>

      <button onClick={calculate}>
        Calculate
      </button>

      {result && (
        <div>
          <p>Range: {result.range} m</p>
          <p>
            Maximum Height: {result.maximumHeight} m
          </p>
          <p>
            Flight Time: {result.flightTime} s
          </p>
        </div>
      )}
    </div>
  );
}
