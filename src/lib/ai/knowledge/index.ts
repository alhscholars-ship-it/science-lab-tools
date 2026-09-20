import type { ScienceTopicKnowledge } from "./physics";

import { physicsKnowledge } from "./physics";
import { chemistryKnowledge } from "./chemistry";
import { astronomyKnowledge } from "./astronomy";
import { biologyKnowledge } from "./biology";
import { earthScienceKnowledge } from "./earth-science";
import { mathematicsKnowledge } from "./mathematics";


export const allScienceKnowledge: ScienceTopicKnowledge[] = [
  ...physicsKnowledge,
  ...chemistryKnowledge,
  ...astronomyKnowledge,
  ...biologyKnowledge,
  ...earthScienceKnowledge,
  ...mathematicsKnowledge,
];
