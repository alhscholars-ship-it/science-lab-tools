export type CalculationResult<TDetails = Record<string, unknown>> = {
  value: number;
  formattedValue: string;
  details: TDetails;
};

export type CalculationError = {
  field: string;
  message: string;
};
