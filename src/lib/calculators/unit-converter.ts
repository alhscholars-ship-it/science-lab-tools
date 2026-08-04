export type UnitDefinition = {
  id: string;
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

export type QuantityDefinition = {
  id: string;
  name: string;
  baseUnit: string;
  units: readonly UnitDefinition[];
};

function linearUnit(
  id: string,
  name: string,
  symbol: string,
  unitsPerBaseUnit: number,
): UnitDefinition {
  return {
    id,
    name,
    symbol,
    toBase: (value) => value / unitsPerBaseUnit,
    fromBase: (value) => value * unitsPerBaseUnit,
  };
}

export const quantities = [
  {
    id: "length",
    name: "Length",
    baseUnit: "meter",
    units: [
      linearUnit("meter", "Meter", "m", 1),
      linearUnit("kilometer", "Kilometer", "km", 0.001),
      linearUnit("centimeter", "Centimeter", "cm", 100),
      linearUnit("millimeter", "Millimeter", "mm", 1000),
      linearUnit("micrometer", "Micrometer", "μm", 1_000_000),
      linearUnit("nanometer", "Nanometer", "nm", 1_000_000_000),
      linearUnit("inch", "Inch", "in", 39.37007874015748),
      linearUnit("foot", "Foot", "ft", 3.280839895013123),
      linearUnit("yard", "Yard", "yd", 1.093613298337708),
      linearUnit("mile", "Mile", "mi", 0.000621371192237334),
    ],
  },
  {
    id: "mass",
    name: "Mass",
    baseUnit: "kilogram",
    units: [
      linearUnit("kilogram", "Kilogram", "kg", 1),
      linearUnit("gram", "Gram", "g", 1000),
      linearUnit("milligram", "Milligram", "mg", 1_000_000),
      linearUnit("microgram", "Microgram", "μg", 1_000_000_000),
      linearUnit("metric-tonne", "Metric tonne", "t", 0.001),
      linearUnit("ounce", "Ounce", "oz", 35.27396194958041),
      linearUnit("pound", "Pound", "lb", 2.204622621848776),
    ],
  },
  {
    id: "temperature",
    name: "Temperature",
    baseUnit: "kelvin",
    units: [
      {
        id: "kelvin", name: "Kelvin", symbol: "K",
        toBase: (value) => value, fromBase: (value) => value,
      },
      {
        id: "celsius", name: "Celsius", symbol: "°C",
        toBase: (value) => value + 273.15,
        fromBase: (value) => value - 273.15,
      },
      {
        id: "fahrenheit", name: "Fahrenheit", symbol: "°F",
        toBase: (value) => (value - 32) * (5 / 9) + 273.15,
        fromBase: (value) => (value - 273.15) * (9 / 5) + 32,
      },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    baseUnit: "cubic meter",
    units: [
      linearUnit("cubic-meter", "Cubic meter", "m³", 1),
      linearUnit("liter", "Liter", "L", 1000),
      linearUnit("milliliter", "Milliliter", "mL", 1_000_000),
      linearUnit("cubic-centimeter", "Cubic centimeter", "cm³", 1_000_000),
      linearUnit("microliter", "Microliter", "μL", 1_000_000_000),
      linearUnit("us-gallon", "US gallon", "US gal", 264.1720523581484),
      linearUnit("us-fluid-ounce", "US fluid ounce", "US fl oz", 33814.022701842),
    ],
  },
  {
    id: "pressure",
    name: "Pressure",
    baseUnit: "pascal",
    units: [
      linearUnit("pascal", "Pascal", "Pa", 1),
      linearUnit("kilopascal", "Kilopascal", "kPa", 0.001),
      linearUnit("megapascal", "Megapascal", "MPa", 0.000001),
      linearUnit("bar", "Bar", "bar", 0.00001),
      linearUnit("atmosphere", "Standard atmosphere", "atm", 1 / 101325),
      linearUnit("torr", "Torr", "Torr", 760 / 101325),
      linearUnit("psi", "Pounds per square inch", "psi", 1 / 6894.757293168),
    ],
  },
  {
    id: "energy",
    name: "Energy",
    baseUnit: "joule",
    units: [
      linearUnit("joule", "Joule", "J", 1),
      linearUnit("kilojoule", "Kilojoule", "kJ", 0.001),
      linearUnit("calorie", "Calorie", "cal", 1 / 4.184),
      linearUnit("kilocalorie", "Kilocalorie", "kcal", 1 / 4184),
      linearUnit("watt-hour", "Watt-hour", "Wh", 1 / 3600),
      linearUnit("kilowatt-hour", "Kilowatt-hour", "kWh", 1 / 3_600_000),
      linearUnit("electronvolt", "Electronvolt", "eV", 1 / 1.602176634e-19),
    ],
  },
] as const satisfies readonly QuantityDefinition[];

export type QuantityId = (typeof quantities)[number]["id"];

export type ConversionResult = {
  value: number;
  formattedValue: string;
  fromUnit: UnitDefinition;
  toUnit: UnitDefinition;
  baseValue: number;
};

function getQuantity(quantityId: string): QuantityDefinition {
  const quantity = quantities.find(({ id }) => id === quantityId);
  if (!quantity) throw new Error("Select a supported measurement type.");
  return quantity;
}

export function convertUnit(
  value: number,
  quantityId: string,
  fromUnitId: string,
  toUnitId: string,
): ConversionResult {
  if (!Number.isFinite(value)) throw new Error("Enter a finite value to convert.");

  const quantity = getQuantity(quantityId);
  const fromUnit = quantity.units.find(({ id }) => id === fromUnitId);
  const toUnit = quantity.units.find(({ id }) => id === toUnitId);
  if (!fromUnit || !toUnit) throw new Error("Select units from the same measurement type.");

  const baseValue = fromUnit.toBase(value);
  const convertedValue = toUnit.fromBase(baseValue);
  if (!Number.isFinite(convertedValue)) throw new Error("The conversion could not be completed.");

  return {
    value: convertedValue,
    formattedValue: new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 12,
    }).format(convertedValue),
    fromUnit,
    toUnit,
    baseValue,
  };
}
