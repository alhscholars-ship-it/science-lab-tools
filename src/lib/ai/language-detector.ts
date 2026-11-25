export type ResponseLanguage =
  | "English"
  | "Urdu"
  | "Roman Urdu"
  | "Arabic"
  | "Hindi"
  | "Spanish"
  | "French"
  | "Chinese"
  | "Bengali"
  | "Japanese"
  | "Russian"
  | "Portuguese"
  | "Unknown";

const explicitLanguageRules: Array<{
  language: ResponseLanguage;
  pattern: RegExp;
}> = [
  { language: "Roman Urdu", pattern: /\b(roman urdu|urdu in english letters|latin urdu)\b/i },
  { language: "Urdu", pattern: /\b(urdu|اردو)\b/i },
  { language: "Arabic", pattern: /\b(arabic|العربية)\b/i },
  { language: "Hindi", pattern: /\b(hindi|हिन्दी|हिंदी)\b/i },
  { language: "Spanish", pattern: /\b(spanish|español|espanol)\b/i },
  { language: "French", pattern: /\b(french|français|francais)\b/i },
  { language: "Chinese", pattern: /\b(chinese|中文|普通话)\b/i },
  { language: "Bengali", pattern: /\b(bengali|bangla|বাংলা)\b/i },
  { language: "Japanese", pattern: /\b(japanese|日本語)\b/i },
  { language: "Russian", pattern: /\b(russian|русский)\b/i },
  { language: "Portuguese", pattern: /\b(portuguese|português|portugues)\b/i },
  { language: "English", pattern: /\b(english|in english)\b/i },
];

export function detectResponseLanguage(
  question: string,
): ResponseLanguage {
  const text = question.trim();

  if (!text) return "Unknown";

  const explicitRequest =
    text.match(
      /\b(?:reply|respond|answer|write|explain|speak|jawab|likho|batao|btao|bolo|samjhao)\b.{0,50}\b(?:in|mein|me|ma|language|zaban|zabaan)\b/i,
    ) ||
    text.match(
      /\b(?:in|mein|me|ma)\s+(?:roman\s+)?(?:urdu|english|spanish|french|arabic|hindi|chinese|bengali|japanese|russian|portuguese)\b/i,
    ) ||
    text.match(
      /\broman\s+urdu\s+(?:ma|mein|me|mein hi)\s+(?:bolo|batao|btao|jawab do|samjhao|likho)\b/i,
    );

  if (explicitRequest) {
    for (const rule of explicitLanguageRules) {
      if (rule.pattern.test(text)) return rule.language;
    }
  }

  if (/[\u0600-\u06FF]/u.test(text)) {
    return /[ٹڈڑںھہےچپگککیے]/u.test(text) ? "Urdu" : "Arabic";
  }

  if (/[\u0900-\u097F]/u.test(text)) return "Hindi";
  if (/[\u0980-\u09FF]/u.test(text)) return "Bengali";
  if (/[\u3040-\u30FF]/u.test(text)) return "Japanese";
  if (/[\u4E00-\u9FFF]/u.test(text)) return "Chinese";
  if (/[\u0400-\u04FF]/u.test(text)) return "Russian";

  const lower = text.toLowerCase();

  if (/\b(kya|kia|kiya|kaise|kesy|kesay|kaisay|hai|ha|hain|hein|hn|mein|main|ma|me|mujhe|mughe|muje|mjy|mujhy|samjhao|samjha|samagh|samajh|samjh|batao|btao|bta|btao|btaein|btaen|kyun|kiun|kyu|hota|hoti|hote|krti|karti|karta|kar|kr|kro|karo|kehna|bolo|bolna|chahiye|chahta|chahti|nahi|nai|nhi|acha|achi|theek|thik)\b/.test(lower)) {
    return "Roman Urdu";
  }

  if (/\b(hola|cómo|como|qué|que|español|gracias|explica)\b/.test(lower)) {
    return "Spanish";
  }

  if (/\b(bonjour|pourquoi|comment|français|merci|explique)\b/.test(lower)) {
    return "French";
  }

  if (/\b(olá|como|português|obrigado|explique)\b/.test(lower)) {
    return "Portuguese";
  }

  if (/[a-z]/i.test(text)) return "English";

  return "Unknown";
}


export function isEnglishSwitchRequest(question: string): boolean {
  const text = question.trim();

  return (
    /\b(?:english|englsh|englis)\s+(?:ma|me|mein)\s+(?:batao|btao|bato|bolo|samjhao|likho|jawab\s+do)\b/i.test(text) ||
    /\b(?:in|ma|me|mein)\s+(?:english|englsh|englis)\b/i.test(text) ||
    /\b(?:english|englsh|englis)\s+(?:translation|definition|def)\b/i.test(text) ||
    /\b(?:reply|answer|respond|write|speak)\s+in\s+(?:english|englsh|englis)\b/i.test(text)
  );
}

export function detectConversationResponseLanguage(
  question: string,
  conversation: Array<{ role: "user" | "assistant"; content: string }>,
): ResponseLanguage {
  const currentLanguage = detectResponseLanguage(question);

  // Explicit English requests override previous language preferences.
  if (isEnglishSwitchRequest(question)) {
    return "English";
  }

  // An explicit language request in the current message always wins.
  if (
    /\b(?:in|mein|me|ma)\s+(?:roman\s+)?(?:urdu|english|spanish|french|arabic|hindi|chinese|bengali|japanese|russian|portuguese)\b/i.test(question)
    || isRomanUrduSwitchRequest(question)
  ) {
    return currentLanguage;
  }

  // Reuse the most recent explicit language preference from the user.
  for (const message of [...conversation].reverse()) {
    if (message.role !== "user") continue;

    const text = message.content.trim();
    if (
      /\b(?:roman\s+urdu|urdu)\s+(?:ma|mein|me)\s+(?:bolo|batao|btao|jawab\s+do|samjhao|likho)\b/i.test(text)
      || /\b(?:reply|answer|respond)\s+in\s+roman\s+urdu\b/i.test(text)
    ) {
      return "Roman Urdu";
    }

    if (/\b(?:reply|answer|respond|speak|write)\s+in\s+english\b/i.test(text)) {
      return "English";
    }
  }

  return currentLanguage;
}

export function isRomanUrduSwitchRequest(question: string): boolean {
  const text = question.trim().toLowerCase();

  return /\b(?:roman(?:\s+urdu)?|urdu)\s+(?:ma|mein|me)\s+(?:bolo|batao|btao|jawab\s+do|samjhao|likho)\b/.test(text)
    || /\b(?:roman\s+urdu\s+mein|roman\s+urdu\s+ma|roman\s+urdu)\s+(?:please\s+)?(?:bolo|batao|btao|jawab\s+do|samjhao|likho)\b/.test(text)
    || /\b(?:reply|answer|respond)\s+in\s+roman\s+urdu\b/.test(text)
    || /\b(?:jawab\s+)?(?:roman\s+urdu|urdu)\s+(?:mein|ma|me)\s+(?:jawab\s+)?(?:do|den|dein|bolo|batao|btao|samjhao|likho)\b/.test(text)
    || /\bjawab\s+(?:roman\s+urdu|urdu)\s+(?:mein|ma|me)\s+(?:do|den|dein)\b/.test(text);
}
