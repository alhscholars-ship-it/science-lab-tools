import { formatCalculatedNumber } from "./number-format";

export type DataPoint = {
  x: number;
  y: number;
};

export type LinearRegressionResult = {
  points: readonly DataPoint[];
  count: number;
  slope: number;
  intercept: number;
  correlationCoefficient: number;
  coefficientOfDetermination: number;
  meanX: number;
  meanY: number;
  equation: string;
  formattedSlope: string;
  formattedIntercept: string;
  formattedCorrelationCoefficient: string;
  formattedCoefficientOfDetermination: string;
};

export function parsePairedDataset(
  input: string,
): DataPoint[] {
  const normalized = input.trim();

  if (normalized === "") {
    throw new Error(
      "Enter at least two x,y data pairs.",
    );
  }

  const rows = normalized
    .split(/\r?\n|;/)
    .map((row) => row.trim())
    .filter(Boolean);

  const points = rows.map((row, index) => {
    const values = row
      .split(/[,\s]+/)
      .filter(Boolean);

    if (values.length !== 2) {
      throw new Error(
        `Row ${index + 1} must contain exactly one x value and one y value.`,
      );
    }

    const x = Number(values[0]);
    const y = Number(values[1]);

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new Error(
        `Row ${index + 1} contains an invalid finite number.`,
      );
    }

    return { x, y };
  });

  if (points.length < 2) {
    throw new Error(
      "Enter at least two x,y data pairs.",
    );
  }

  return points;
}

export function calculateLinearRegression(
  points: readonly DataPoint[],
): LinearRegressionResult {
  if (points.length < 2) {
    throw new Error(
      "Linear regression requires at least two data points.",
    );
  }

  for (const point of points) {
    if (
      !Number.isFinite(point.x) ||
      !Number.isFinite(point.y)
    ) {
      throw new Error(
        "Every data point must contain finite x and y values.",
      );
    }
  }

  const count = points.length;

  const sumX = points.reduce(
    (total, point) => total + point.x,
    0,
  );

  const sumY = points.reduce(
    (total, point) => total + point.y,
    0,
  );

  const meanX = sumX / count;
  const meanY = sumY / count;

  let sumSquaredX = 0;
  let sumSquaredY = 0;
  let sumCrossProducts = 0;

  for (const point of points) {
    const differenceX = point.x - meanX;
    const differenceY = point.y - meanY;

    sumSquaredX += differenceX ** 2;
    sumSquaredY += differenceY ** 2;
    sumCrossProducts +=
      differenceX * differenceY;
  }

  if (sumSquaredX === 0) {
    throw new Error(
      "Linear regression is undefined when all x values are identical.",
    );
  }

  if (sumSquaredY === 0) {
    throw new Error(
      "Correlation is undefined when all y values are identical.",
    );
  }

  const slope =
    sumCrossProducts / sumSquaredX;

  const intercept = meanY - slope * meanX;

  const correlationCoefficient =
    sumCrossProducts /
    Math.sqrt(sumSquaredX * sumSquaredY);

  const coefficientOfDetermination =
    correlationCoefficient ** 2;

  const formattedSlope =
    formatCalculatedNumber(slope);

  const formattedIntercept =
    formatCalculatedNumber(intercept);

  const interceptOperator =
    intercept < 0 ? "−" : "+";

  const equation =
    `y = ${formattedSlope}x ${interceptOperator} ` +
    formatCalculatedNumber(Math.abs(intercept));

  return {
    points: points.map((point) => ({ ...point })),
    count,
    slope,
    intercept,
    correlationCoefficient,
    coefficientOfDetermination,
    meanX,
    meanY,
    equation,
    formattedSlope,
    formattedIntercept,
    formattedCorrelationCoefficient:
      formatCalculatedNumber(
        correlationCoefficient,
      ),
    formattedCoefficientOfDetermination:
      formatCalculatedNumber(
        coefficientOfDetermination,
      ),
  };
}
