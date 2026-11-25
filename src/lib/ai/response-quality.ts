export function hasInvalidRomanUrduOutput(
  response: string,
): boolean {
  const text = response.trim();

  if (!text) {
    return true;
  }

  // Roman Urdu must use Latin letters, not Urdu or Arabic script.
  if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u.test(text)) {
    return true;
  }

  const normalized = text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  // Reject clearly English-only prose when Roman Urdu is required.
  const romanUrduMarkers =
    /\b(?:hai|hain|ho|hota|hoti|hote|kya|kaise|kyun|kyunki|mein|ma|se|ko|ka|ki|ke|aur|ya|aik|ek|kisi|yeh|woh|jo|kar|karta|karti|karte|sakta|sakti|sakte|liye|taraf|andar|bahar|nahi|nahin|bhi|par|agar|toh|phir|samjhein|kehlata|kehlati)\b/i;

  if (!romanUrduMarkers.test(normalized)) {
    return true;
  }

  // Detect a sentence repeated several times.
  const sentences = normalized
    .split(/[.!?؟]+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 12);

  const counts = new Map<string, number>();

  for (const sentence of sentences) {
    const count = (counts.get(sentence) ?? 0) + 1;
    counts.set(sentence, count);

    if (count >= 3) {
      return true;
    }
  }

  // Detect a short phrase repeated excessively in generated output.
  const words = normalized.split(/\s+/);

  if (words.length >= 24) {
    const windowSize = 6;
    const windows = new Map<string, number>();

    for (let i = 0; i <= words.length - windowSize; i += 1) {
      const phrase = words.slice(i, i + windowSize).join(" ");
      const count = (windows.get(phrase) ?? 0) + 1;
      windows.set(phrase, count);

      if (count >= 4) {
        return true;
      }
    }
  }

  return false;
}
