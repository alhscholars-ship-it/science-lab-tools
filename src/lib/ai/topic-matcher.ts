import { allScienceKnowledge } from "./knowledge";


export type TopicMatch = {
  title: string;
  category: string;
  confidence: number;
};


export function matchScienceTopic(
  question: string,
): TopicMatch | null {

  const text =
    question.toLowerCase();


  let bestMatch:
    TopicMatch | null = null;


  let highestScore = 0;


  for (const item of allScienceKnowledge) {

    let score = 0;


    for (const keyword of item.keywords) {

      const normalizedKeyword = keyword.trim().toLowerCase();
      const escapedKeyword = normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const keywordPattern = new RegExp(
        `(^|[^\\p{L}\\p{N}])${escapedKeyword}(?=$|[^\\p{L}\\p{N}])`,
        "u",
      );

      if (keywordPattern.test(text)) {
        score += 1;
      }

    }


    if (score > highestScore) {

      highestScore = score;


      bestMatch = {
        title: item.title,
        category: "Science",
        confidence:
          Math.min(
            score / item.keywords.length,
            1,
          ),
      };

    }

  }


  return bestMatch;

}
