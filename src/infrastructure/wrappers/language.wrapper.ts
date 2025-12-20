/**
 * Language Wrapper
 * Enhances prompts with language instructions for multi-language support
 */

const LANGUAGE_NAMES: Record<string, string> = {
  tr: "Turkish",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ar: "Arabic",
  hi: "Hindi",
  th: "Thai",
  vi: "Vietnamese",
  pl: "Polish",
  nl: "Dutch",
  sv: "Swedish",
  no: "Norwegian",
  da: "Danish",
  fi: "Finnish",
  ro: "Romanian",
  bg: "Bulgarian",
  uk: "Ukrainian",
  cs: "Czech",
  hu: "Hungarian",
  id: "Indonesian",
  ms: "Malay",
  tl: "Filipino",
};

export function enhancePromptWithLanguage(
  prompt: string,
  languageCode?: string,
): string {
  if (!languageCode || languageCode === "en") {
    return prompt;
  }

  const languageName = LANGUAGE_NAMES[languageCode] || "the user's language";
  return `${prompt}\n\nPlease respond in ${languageName} language.`;
}

export function getSupportedLanguages(): string[] {
  return Object.keys(LANGUAGE_NAMES);
}

export function getLanguageName(code: string): string | undefined {
  return LANGUAGE_NAMES[code];
}
