const ga4MeasurementIdPattern = /^G-[A-Z0-9]+$/;

export function validGa4MeasurementId(
  value: string | undefined,
): string | null {
  if (!value) {
    return null;
  }

  const measurementId = value.trim().toUpperCase();

  return ga4MeasurementIdPattern.test(measurementId)
    ? measurementId
    : null;
}
