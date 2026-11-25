import { describe, expect, it } from "vitest";
import { detectScienceTopic } from "../science-router";

describe("detectScienceTopic", () => {
  it("detects physics questions", () => {
    expect(detectScienceTopic("How does force affect acceleration?").topic).toBe("physics");
  });

  it("detects chemistry questions", () => {
    expect(detectScienceTopic("Explain molarity of a solution").topic).toBe("chemistry");
  });

  it("detects biology questions in English", () => {
    expect(detectScienceTopic("How does DNA replication work?").topic).toBe("biology");
  });

  it("detects common biology terms in Roman Urdu", () => {
    expect(detectScienceTopic("DNA ki naqal kaise banti hai?").topic).toBe("biology");
  });

  it("keeps unrelated questions in the general route", () => {
    expect(detectScienceTopic("Hello, how are you?").topic).toBe("general");
  });
});
