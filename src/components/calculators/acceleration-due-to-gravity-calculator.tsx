"use client";

import { useState } from "react";
import {
  calculateAccelerationDueToGravity,
} from "@/lib/calculators/acceleration-due-to-gravity";

export function AccelerationDueToGravityCalculator() {
  const [mass, setMass] = useState("5.972e24");
  const [radius, setRadius] = useState("6371000");
  const [gravity, setGravity] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    const output = calculateAccelerationDueToGravity({
      mass: mass ? Number(mass) : undefined,
      radius: radius ? Number(radius) : undefined,
      gravity: gravity ? Number(gravity) : undefined,
    });

    setResult(output.gravity);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        Planet Mass (kg)
        <input
          value={mass}
          onChange={(event) => setMass(event.target.value)}
          className="mt-2 w-full rounded-lg border p-3"
        />
      </label>

      <label className="block">
        Radius (m)
        <input
          value={radius}
          onChange={(event) => setRadius(event.target.value)}
          className="mt-2 w-full rounded-lg border p-3"
        />
      </label>

      <label className="block">
        Gravity Override (m/s²)
        <input
          value={gravity}
          onChange={(event) => setGravity(event.target.value)}
          className="mt-2 w-full rounded-lg border p-3"
        />
      </label>

      <button
        onClick={calculate}
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        Calculate
      </button>

      {result !== null && (
        <div className="rounded-lg border p-4">
          <p>
            Acceleration Due To Gravity:
            {" "}
            {result.toFixed(3)} m/s²
          </p>
        </div>
      )}
    </div>
  );
}
