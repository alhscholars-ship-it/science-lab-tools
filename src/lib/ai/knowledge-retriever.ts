import { allScienceKnowledge } from "./knowledge";
import { matchScienceTopic } from "./topic-matcher";


export function retrieveScienceKnowledge(
  question: string,
) {

  const topic =
    matchScienceTopic(question);


  if (!topic) {
    return {
      knowledge: null,
      topic: null,
    };
  }


  const knowledge =
    allScienceKnowledge.find(
      (item) =>
        item.title === topic.title,
    );


  return {
    knowledge: knowledge ?? null,
    topic,
  };

}
