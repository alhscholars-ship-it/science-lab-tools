export function formatCalculatedNumber(
  value: number,
  maximumFractionDigits = 6,
): string {
  if (!Number.isFinite(value)) {
    throw new Error("The result must be a finite number.");
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    useGrouping: true,
  }).format(value);
}
