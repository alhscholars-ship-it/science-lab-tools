import { describe, expect, it, vi } from "vitest";

import {
  createWebVitalAnalyticsEvent,
  reportAnalyticsEvent,
  type AnalyticsTarget,
  type GtagCommand,
} from "../web-vitals";

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

describe("reportAnalyticsEvent", () => {
  const command: GtagCommand = [
    "event",
    "LCP",
    {
      value: 1_234,
      metric_id: "v4-789",
      metric_delta: 100,
      metric_rating: "good",
      non_interaction: true,
    },
  ];

  it("sends immediately when gtag is ready", () => {
    const gtag = vi.fn();
    const target: AnalyticsTarget = {
      dataLayer: [],
      gtag,
    };

    reportAnalyticsEvent(target, command);

    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledWith(...command);
    expect(target.dataLayer).toEqual([]);
  });

  it("queues the event until gtag is ready", () => {
    const target: AnalyticsTarget = {};

    reportAnalyticsEvent(target, command);

    expect(target.dataLayer).toEqual([command]);
  });

  it("preserves events already waiting in the data layer", () => {
    const existingCommand: GtagCommand = [
      "event",
      "CLS",
      { value: 50 },
    ];
    const target: AnalyticsTarget = {
      dataLayer: [existingCommand],
    };

    reportAnalyticsEvent(target, command);

    expect(target.dataLayer).toEqual([
      existingCommand,
      command,
    ]);
  });
});
