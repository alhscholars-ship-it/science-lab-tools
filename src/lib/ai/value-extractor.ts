export type ExtractedValue = {
  value: number;
  unit: string;
};


export function extractValues(
  question: string,
): ExtractedValue[] {

  const matches =
    question.match(
      /(\d+\.?\d*)\s*(kg|m\/s²|m\/s2|m\/s|m|s|l|L|mol)/gi,
    );


  if (!matches) {
    return [];
  }


  return matches.map((item) => {

    const parsed = item.trim().match(
      /^(\d+\.?\d*)\s*(kg|m\/s²|m\/s2|m\/s|m|s|l|mol)$/i,
    );

    if (!parsed) {
      throw new Error("Unexpected science value format.");
    }

    return {
      value: Number(parsed[1]),
      unit: parsed[2],
    };

  });

}
