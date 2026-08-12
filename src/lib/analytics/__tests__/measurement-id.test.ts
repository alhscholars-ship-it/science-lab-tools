import { describe, expect, it } from "vitest";

import { validGa4MeasurementId } from "../measurement-id";

describe("validGa4MeasurementId", () => {
  it("normalizes a valid GA4 measurement ID", () => {
    expect(validGa4MeasurementId("  g-abc123xyz  ")).toBe(
      "G-ABC123XYZ",
    );
  });

  it("disables analytics for missing or malformed IDs", () => {
    expect(validGa4MeasurementId(undefined)).toBeNull();
    expect(validGa4MeasurementId("")).toBeNull();
    expect(validGa4MeasurementId("UA-12345-1")).toBeNull();
    expect(validGa4MeasurementId("G-ABC';alert(1)//")).toBeNull();
    expect(validGa4MeasurementId("G-ABC 123")).toBeNull();
  });
});
