import { describe, expect, it } from "vitest";
import { hasInvalidRomanUrduOutput } from "../response-quality";

describe("hasInvalidRomanUrduOutput", () => {
  it("accepts natural Roman Urdu written in Latin letters", () => {
    expect(
      hasInvalidRomanUrduOutput(
        "Force aik push ya pull hai jo kisi object ki motion change kar sakti hai.",
      ),
    ).toBe(false);
  });

  it("rejects Urdu or Arabic script in a Roman Urdu response", () => {
    expect(
      hasInvalidRomanUrduOutput(
        "Force کیا ہے؟ Force aik push ya pull hai.",
      ),
    ).toBe(true);
  });

  it("rejects obviously repeated output", () => {
    expect(
      hasInvalidRomanUrduOutput(
        "Gravity ki wajah se object neeche girta hai. ".repeat(8),
      ),
    ).toBe(true);
  });

  it("accepts a normal short scientific explanation", () => {
    expect(
      hasInvalidRomanUrduOutput(
        "Gravity aik force hai jo objects ko aik doosre ki taraf attract karti hai. Earth par g taqreeban 9.8 m/s² hai.",
      ),
    ).toBe(false);
  });

  it("rejects an English-only answer when Roman Urdu is required", () => {
    expect(
      hasInvalidRomanUrduOutput(
        "Force is a vector quantity that measures the push or pull exerted on an object. It is defined as the product of mass and acceleration.",
      ),
    ).toBe(true);
  });

  it("rejects empty output", () => {
    expect(hasInvalidRomanUrduOutput("   ")).toBe(true);
  });
});
