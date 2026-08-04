import { describe, expect, it } from "vitest";

import { createWebVitalAnalyticsEvent } from "../web-vitals";

describe("createWebVitalAnalyticsEvent", () => {
  it("preserves millisecond metrics as rounded integers", () => {
    expect(
      createWebVitalAnalyticsEvent({
        id: "v4-123",
        name: "INP",
        value: 187.6,
        delta: 45.2,
        rating: "good",
      }),
    ).toEqual({
      eventName: "INP",
      parameters: {
        value: 188,
        metric_id: "v4-123",
        metric_delta: 45,
        metric_rating: "good",
        non_interaction: true,
      },
    });
  });

  it("scales CLS so GA4 receives a meaningful integer", () => {
    const event = createWebVitalAnalyticsEvent({
      id: "v4-456",
      name: "CLS",
      value: 0.0874,
      delta: 0.0126,
      rating: "good",
    });

    expect(event.parameters.value).toBe(87);
    expect(event.parameters.metric_delta).toBe(13);
  });
});
