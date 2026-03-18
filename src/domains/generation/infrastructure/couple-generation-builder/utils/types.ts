/**
 * Couple Image Generation Builder - Type Definitions
 */

export interface BuilderStartParams {
  isCoupleMode?: boolean;
  basePromptLength?: number;
  scenarioPromptLength?: number;
  aspectRatio?: string;
  hasPartner2?: boolean;
  hasCustomInstructions?: boolean;
  hasStrength?: boolean;
  strength?: number;
  partner1Uri?: string;
  partner2Uri?: string;
  scenarioPromptPreview?: string;
}

export interface BuilderStepParams {
  photoUrisCount?: number;
  photo1?: string;
  photo2?: string;
  photoCount?: number;
  isCoupleMode?: boolean;
  basePromptLength?: number;
  contextLength?: number;
  contextPreview?: string;
  refinedPromptLength?: number;
  refinedPromptPreview?: string;
  finalPromptLength?: number;
  finalPromptPreview?: string;
  promptLength?: number;
  promptPreview?: string;
  hasCustomInstructions?: boolean;
  customInstructions?: string;
  partner1Uri?: string;
  partner2Uri?: string;
  singleTarget?: string;
  coupleTarget?: string;
  targetModel?: string;
  targetProvider?: string;
  imageUrlsCount?: number;
  image1?: string;
  image2?: string;
  prompt?: string;
  imageUrls?: string[];
  aspectRatio?: string;
  strength?: number;
}
