export type ExtractedValue = {
  value: number;
  unit: string;
};


export function extractValues(
  question: string,
): ExtractedValue[] {

  const matches =
    question.match(
      /(\d+\.?\d*)\s*(kg|m\/s²|m\/s2|m|s|l|L|mol)/gi,
    );


  if (!matches) {
    return [];
  }


  return matches.map((item) => {

    const parts =
      item.trim().split(/\s+/);


    return {
      value: Number(parts[0]),
      unit: parts[1],
    };

  });

}
