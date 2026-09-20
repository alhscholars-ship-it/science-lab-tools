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


  },
);
