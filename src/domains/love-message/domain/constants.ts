/**
 * Love Message Configuration
 */

import { MessageType, MessageTone, LoveLanguage } from "./types";

export interface MessageTypeConfig {
  type: MessageType;
  labelKey: string;
  icon: string;
}

export interface MessageToneConfig {
  tone: MessageTone;
  labelKey: string;
  icon: string;
}

export const MESSAGE_TYPES: MessageTypeConfig[] = [
  {
    type: MessageType.ROMANTIC,
    labelKey: "loveMessage.types.romantic",
    icon: "heart-outline",
  },
  {
    type: MessageType.APOLOGY,
    labelKey: "loveMessage.types.apology",
    icon: "hand-left-outline",
  },
  {
    type: MessageType.LOVE_LETTER,
    labelKey: "loveMessage.types.loveLetter",
    icon: "mail-outline",
  },
  {
    type: MessageType.GOOD_MORNING,
    labelKey: "loveMessage.types.goodMorning",
    icon: "sunny-outline",
  },
  {
    type: MessageType.GOOD_NIGHT,
    labelKey: "loveMessage.types.goodNight",
    icon: "moon-outline",
  },
  {
    type: MessageType.ANNIVERSARY,
    labelKey: "loveMessage.types.anniversary",
    icon: "gift-outline",
  },
];

export const MESSAGE_TONES: MessageToneConfig[] = [
  {
    tone: MessageTone.ROMANTIC,
    labelKey: "loveMessage.tones.romantic",
    icon: "rose-outline",
  },
  {
    tone: MessageTone.POETIC,
    labelKey: "loveMessage.tones.poetic",
    icon: "feather-outline",
  },
  {
    tone: MessageTone.WITTY,
    labelKey: "loveMessage.tones.witty",
    icon: "happy-outline",
  },
  {
    tone: MessageTone.SINCERE,
    labelKey: "loveMessage.tones.sincere",
    icon: "shield-checkmark-outline",
  },
  {
    tone: MessageTone.CASUAL,
    labelKey: "loveMessage.tones.casual",
    icon: "cafe-outline",
  },
  {
    tone: MessageTone.PASSIONATE,
    labelKey: "loveMessage.tones.passionate",
    icon: "flame-outline",
  },
];

export interface LoveLanguageConfig {
  language: LoveLanguage;
  labelKey: string;
}

export const LOVE_LANGUAGES: LoveLanguageConfig[] = [
  {
    language: LoveLanguage.WORDS_OF_AFFIRMATION,
    labelKey: "loveMessage.loveLanguages.wordsOfAffirmation",
  },
  {
    language: LoveLanguage.ACTS_OF_SERVICE,
    labelKey: "loveMessage.loveLanguages.actsOfService",
  },
  {
    language: LoveLanguage.RECEIVING_GIFTS,
    labelKey: "loveMessage.loveLanguages.receivingGifts",
  },
  {
    language: LoveLanguage.QUALITY_TIME,
    labelKey: "loveMessage.loveLanguages.qualityTime",
  },
  {
    language: LoveLanguage.PHYSICAL_TOUCH,
    labelKey: "loveMessage.loveLanguages.physicalTouch",
  },
];

export interface TemplateMessage {
  id: string;
  text: string;
  type: MessageType;
  imageUrl?: string;
}

export const CATEGORY_TEMPLATES: Record<string, TemplateMessage[]> = {
  [MessageType.ROMANTIC]: [
    {
      id: "r1",
      type: MessageType.ROMANTIC,
      text: "Every moment with you is like a beautiful dream come true. I love you more than words can say.",
      imageUrl:
        "https://images.unsplash.com/photo-1516589174184-c68526614488?q=80&w=400",
    },
    {
      id: "r2",
      type: MessageType.ROMANTIC,
      text: "You are my heart's home, the peace in my soul, and the love of my life.",
      imageUrl:
        "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=400",
    },
  ],
  [MessageType.GOOD_MORNING]: [
    {
      id: "gm1",
      type: MessageType.GOOD_MORNING,
      text: "Waking up and knowing you're mine is the only motivation I need. Have a beautiful day, my love.",
      imageUrl:
        "https://images.unsplash.com/photo-1504194081531-90af4970460c?q=80&w=400",
    },
  ],
  trending: [
    {
      id: "t1",
      type: MessageType.ROMANTIC,
      text: "In the quiet of this romantic night, my heart beats only for you. You are the stars in my sky and the peace in my soul.",
      imageUrl:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=400",
    },
    {
      id: "t2",
      type: MessageType.ROMANTIC,
      text: "Every night with you feels like a dream I never want to wake up from. Here's to us and the magic we share.",
      imageUrl:
        "https://images.unsplash.com/photo-1516589174184-c68526614488?q=80&w=400",
    },
  ],
};
