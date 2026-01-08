/**
 * Love Message Prompt Builder
 */

import {
  MessageType,
  MessageTone,
  MessageGenerationParams,
  PartnerProfile,
  LoveLanguage,
} from "../../domain/types";

const getToneGuidance = (tone: MessageTone): string => {
  const guidance: Record<MessageTone, string> = {
    [MessageTone.ROMANTIC]:
      "Use romantic and emotional language that expresses deep feelings.",
    [MessageTone.POETIC]:
      "Use poetic and lyrical language with metaphors and imagery.",
    [MessageTone.WITTY]: "Be playful and witty with clever wordplay and humor.",
    [MessageTone.SINCERE]:
      "Be sincere and genuine with deep, heartfelt emotions.",
    [MessageTone.CASUAL]:
      "Keep it casual and sweet, like talking to a close friend.",
    [MessageTone.PASSIONATE]:
      "Use passionate and intense language that shows strong emotions.",
  };
  return guidance[tone];
};

const getMessageTypePrompt = (type: MessageType): string => {
  const types: Record<MessageType, string> = {
    [MessageType.ROMANTIC]: "a romantic message",
    [MessageType.APOLOGY]: "a sincere apology message",
    [MessageType.LOVE_LETTER]: "a beautiful love letter",
    [MessageType.GOOD_MORNING]: "a sweet good morning message",
    [MessageType.GOOD_NIGHT]: "a cozy good night message",
    [MessageType.ANNIVERSARY]: "a special anniversary message",
  };
  return types[type];
};

const getLoveLanguageDescription = (language: LoveLanguage): string => {
  const descriptions: Record<LoveLanguage, string> = {
    [LoveLanguage.WORDS_OF_AFFIRMATION]:
      "Values verbal expressions of love, compliments, and words of appreciation.",
    [LoveLanguage.ACTS_OF_SERVICE]:
      "Values helpful actions, doing things they would like you to do.",
    [LoveLanguage.RECEIVING_GIFTS]:
      "Values thoughtful presents and visual symbols of love.",
    [LoveLanguage.QUALITY_TIME]:
      "Values undivided attention and spending meaningful time together.",
    [LoveLanguage.PHYSICAL_TOUCH]: "Values physical affection and closeness.",
  };
  return descriptions[language];
};

const buildPartnerContext = (profile: PartnerProfile): string => {
  const parts: string[] = [];

  if (profile.nickname) {
    parts.push(`Nickname: ${profile.nickname}`);
  }

  if (profile.loveLanguage) {
    parts.push(
      `Primary Love Language: ${getLoveLanguageDescription(profile.loveLanguage)}`,
    );
  }

  if (profile.hobbies) {
    parts.push(`Hobbies and interests: ${profile.hobbies}`);
  }

  if (profile.traits) {
    parts.push(`Personality traits: ${profile.traits}`);
  }

  if (profile.quirks) {
    parts.push(`Special quirks or inside jokes: ${profile.quirks}`);
  }

  return parts.length > 0 ? `\nPartner Context:\n${parts.join("\n")}\n` : "";
};

export const buildLoveMessagePrompt = (
  params: MessageGenerationParams,
  profile?: PartnerProfile | null,
): string => {
  const typeText = getMessageTypePrompt(params.type);
  const toneGuidance = getToneGuidance(params.tone);

  let prompt = `Write ${typeText} for ${params.partnerName}.\n\n`;
  prompt += `Tone: ${toneGuidance}\n\n`;

  if (params.usePartnerProfile && profile) {
    prompt += buildPartnerContext(profile);
    prompt +=
      "\nMake sure the message resonates with their love language and personality.\n\n";
  }

  if (params.details) {
    prompt += `Context and Details: ${params.details}\n\n`;
  }

  prompt +=
    "Important: Write only the message itself, without any introduction, explanation, or meta-commentary. The message should be ready to send directly.";

  return prompt;
};
