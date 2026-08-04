export type WebVital = {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating: string;
};

export type AnalyticsEvent = {
  eventName: string;
  parameters: {
    value: number;
    metric_id: string;
    metric_delta: number;
    metric_rating: string;
    non_interaction: boolean;
  };
};

export function createWebVitalAnalyticsEvent(
  metric: WebVital,
): AnalyticsEvent {
  const scale = metric.name === "CLS" ? 1_000 : 1;

  return {
    eventName: metric.name,
    parameters: {
      value: Math.round(metric.value * scale),
      metric_id: metric.id,
      metric_delta: Math.round(metric.delta * scale),
      metric_rating: metric.rating,
      non_interaction: true,
    },
  };
}
