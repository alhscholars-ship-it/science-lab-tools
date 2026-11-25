import { describe, expect, it } from "vitest";
import { detectConversationResponseLanguage, detectResponseLanguage, isRomanUrduSwitchRequest } from "../language-detector";

describe("detectConversationResponseLanguage", () => {
  it("retains a recent Roman Urdu preference for an English-looking follow-up", () => {
    expect(
      detectConversationResponseLanguage("Explain gravity", [
        { role: "user", content: "roman urdu ma bolo" },
        { role: "assistant", content: "Force aik push ya pull hai." },
      ]),
    ).toBe("Roman Urdu");
  });

  it("honors a newer explicit English request", () => {
    expect(
      detectConversationResponseLanguage("Please answer in English", [
        { role: "user", content: "roman urdu ma bolo" },
      ]),
    ).toBe("English");
  });

  it("uses the newest explicit language preference from conversation history", () => {
    expect(detectConversationResponseLanguage("Explain gravity", [
      { role: "user", content: "roman urdu ma bolo" },
      { role: "assistant", content: "Force aik push ya pull hai." },
      { role: "user", content: "Please answer in English" },
      { role: "assistant", content: "Force is a push or pull." },
    ])).toBe("English");

    expect(detectConversationResponseLanguage("Explain gravity", [
      { role: "user", content: "Please answer in English" },
      { role: "assistant", content: "Force is a push or pull." },
      { role: "user", content: "roman urdu ma bolo" },
      { role: "assistant", content: "Force aik push ya pull hai." },
    ])).toBe("Roman Urdu");
  });

  it("does not infer a language preference from ordinary science questions", () => {
    expect(
      detectConversationResponseLanguage("What is gravity?", [
        { role: "user", content: "What is force?" },
        { role: "assistant", content: "Force is a push or pull." },
      ]),
    ).toBe("English");
  });
});

describe("isRomanUrduSwitchRequest", () => {
  it("recognizes Roman Urdu language-switch commands", () => {
    expect(isRomanUrduSwitchRequest("roman urdu ma bolo")).toBe(true);
    expect(isRomanUrduSwitchRequest("roman ma bolo")).toBe(true);
    expect(isRomanUrduSwitchRequest("roman ma btao")).toBe(true);
    expect(isRomanUrduSwitchRequest("Roman Urdu mein jawab do")).toBe(true);
    expect(isRomanUrduSwitchRequest("Please reply in Roman Urdu")).toBe(true);
  });

  it("recognizes common Roman Urdu switch variants", () => {
    expect(isRomanUrduSwitchRequest("urdu mein bolo")).toBe(true);
    expect(isRomanUrduSwitchRequest("roman urdu mein samjhao please")).toBe(true);
    expect(isRomanUrduSwitchRequest("jawab roman urdu mein do")).toBe(true);
  });

  it("does not treat science questions as language-switch commands", () => {
    expect(isRomanUrduSwitchRequest("Force kya hoti hai?")).toBe(false);
    expect(isRomanUrduSwitchRequest("What is force?")).toBe(false);
  });
});

describe("detectResponseLanguage", () => {
  it("prioritizes an explicit Roman Urdu request", () => {
    expect(
      detectResponseLanguage("DNA replication kya hai? Roman Urdu mein jawab do."),
    ).toBe("Roman Urdu");
  });

  it("recognizes Urdu script", () => {
    expect(
      detectResponseLanguage("ڈی این اے کی نقل کیسے بنتی ہے؟"),
    ).toBe("Urdu");
  });

  it("recognizes Arabic script", () => {
    expect(
      detectResponseLanguage("اشرح كيف يتضاعف الحمض النووي"),
    ).toBe("Arabic");
  });

  it("recognizes Hindi in Devanagari", () => {
    expect(
      detectResponseLanguage("डीएनए की प्रतिकृति कैसे बनती है?"),
    ).toBe("Hindi");
  });

  it("prioritizes an explicit Spanish request", () => {
    expect(
      detectResponseLanguage("Explain DNA replication. Responde en español."),
    ).toBe("Spanish");
  });

  it("defaults to English for a clear English question", () => {
    expect(
      detectResponseLanguage("How does DNA replication work?"),
    ).toBe("English");
  });

  it("recognizes a natural Roman Urdu science question", () => {
    expect(detectResponseLanguage("Force kya hoti hai?")).toBe("Roman Urdu");
  });

  it("recognizes a Roman Urdu follow-up request", () => {
    expect(detectResponseLanguage("Isko easy words mein samjhao")).toBe("Roman Urdu");
  });

  it("recognizes a direct Roman Urdu language-switch request", () => {
    expect(detectResponseLanguage("roman urdu ma bolo")).toBe("Roman Urdu");
  });

  it("recognizes a Roman Urdu request mixed with a science question", () => {
    expect(
      detectResponseLanguage("roman urdu ma btao gravity kya ha"),
    ).toBe("Roman Urdu");
  });

  it("recognizes common informal Roman Urdu spellings", () => {
    expect(
      detectResponseLanguage("Gravity kesy kaam krti ha"),
    ).toBe("Roman Urdu");
  });

  it("recognizes an explicit English response request", () => {
    expect(
      detectResponseLanguage("Please answer in English"),
    ).toBe("English");
  });

  it("keeps a clear English science question as English", () => {
    expect(
      detectResponseLanguage("Explain Newton's second law in simple words"),
    ).toBe("English");
  });
});


describe("English language switch regression", () => {
  const previousConversation = [
    {
      role: "user" as const,
      content: "linear thermal expansion kya hai",
    },
    {
      role: "assistant" as const,
      content: "Garmi se solid ki lambai barh jati hai.",
    },
  ];

  it.each([
    "english ma bato",
    "englsh ma bato",
    "englis ma btao",
    "english ma btao",
    "english mein batao",
    "mujhe is def ko english ma btao",
    "Please answer in English",
  ])("prioritizes English for: %s", (question) => {
    expect(
      detectConversationResponseLanguage(
        question,
        previousConversation,
      ),
    ).toBe("English");
  });

  it("overrides an earlier Roman Urdu preference", () => {
    expect(
      detectConversationResponseLanguage(
        "english ma bato",
        [
          {
            role: "user",
            content: "roman urdu ma bolo",
          },
          {
            role: "assistant",
            content: "Force aik push ya pull hai.",
          },
        ],
      ),
    ).toBe("English");
  });
});
