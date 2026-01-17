/**
 * Love Message Types
 */

export enum MessageType {
  ROMANTIC = "ROMANTIC",
  APOLOGY = "APOLOGY",
  LOVE_LETTER = "LOVE_LETTER",
  GOOD_MORNING = "GOOD_MORNING",
  GOOD_NIGHT = "GOOD_NIGHT",
  ANNIVERSARY = "ANNIVERSARY",
}

export enum MessageTone {
  ROMANTIC = "ROMANTIC",
  POETIC = "POETIC",
  WITTY = "WITTY",
  SINCERE = "SINCERE",
  CASUAL = "CASUAL",
  PASSIONATE = "PASSIONATE",
}

export enum LoveLanguage {
  WORDS_OF_AFFIRMATION = "WORDS_OF_AFFIRMATION",
  ACTS_OF_SERVICE = "ACTS_OF_SERVICE",
  RECEIVING_GIFTS = "RECEIVING_GIFTS",
  QUALITY_TIME = "QUALITY_TIME",
  PHYSICAL_TOUCH = "PHYSICAL_TOUCH",
}

export interface PartnerProfile {
  name: string;
  nickname?: string;
  gender?: string;
  birthday?: string;
  anniversary?: string;
  loveLanguage?: LoveLanguage;
  hobbies?: string;
  traits?: string;
  quirks?: string;
}

export interface MessageGenerationParams {
  partnerName: string;
  type: MessageType;
  tone: MessageTone;
  details?: string;
  usePartnerProfile?: boolean;
}

export interface GeneratedMessage {
  id: string;
  text: string;
  type: MessageType;
  tone: MessageTone;
  partnerName: string;
  createdAt: number;
}
