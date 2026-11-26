import { describe, expect, test } from "vitest";

import { retrieveScienceKnowledge } from "../knowledge-retriever";


describe(
  "Science knowledge retrieval",
  () => {

    test(
      "retrieves Newton's Second Law",
      () => {

        const result =
          retrieveScienceKnowledge(
            "What is Newton's Second Law?",
          );


        expect(
          result.knowledge?.title,
        )
        .toBe(
          "Newton's Second Law",
        );


      },
    );

    test(
      "does not retrieve the pH scale for a general physics question",
      () => {
        const result = retrieveScienceKnowledge("What is physics?");

        expect(result.knowledge?.title).not.toBe("pH Scale");
      },
    );

    test(
      "retrieves the pH scale for a pH question",
      () => {
        const result = retrieveScienceKnowledge("What is the pH scale?");

        expect(result.knowledge?.title).toBe("pH Scale");
      },
    );


  },
);
