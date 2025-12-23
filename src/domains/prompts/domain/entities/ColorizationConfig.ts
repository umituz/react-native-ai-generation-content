import type { AIPromptTemplate } from './AIPromptTemplate';

export interface ColorizationConfig {
  targetType: 'black-and-white' | 'sepia' | 'faded' | 'damaged';
  colorMode: 'realistic' | 'vibrant' | 'artistic' | 'vintage';
  preserveOriginal: boolean;
  adjustLighting: boolean;
  skinTonePreservation: boolean;
  era?: '1920s' | '1940s' | '1960s' | '1980s' | 'victorian';
}

export interface ColorizationTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly basePrompt: string;
  readonly variables: ColorizationVariable[];
  readonly colorization: ColorizationSettings;
}

export interface ColorizationVariable {
  name: string;
  description: string;
  required: boolean;
  options?: string[];
}

export interface ColorizationSettings {
  supportedModes: string[];
  eraPresets: Record<string, string>;
  skinToneAdjustments: number;
}

export interface ColorizationResult {
  template: AIPromptTemplate;
  config: ColorizationConfig;
  qualityScore: number;
  colorPalette?: string[];
}

export const validateColorizationConfig = (config: ColorizationConfig): boolean => {
  return !!(
    config.targetType &&
    config.colorMode &&
    ['realistic', 'vibrant', 'artistic', 'vintage'].includes(config.colorMode)
  );
};

export const createColorizationVariable = (
  name: string,
  description: string,
  required: boolean = true,
  options?: string[]
): ColorizationVariable => ({
  name,
  description,
  required,
  options,
});

export const getColorizationQuality = (config: ColorizationConfig): number => {
  let quality = 0.8;

  if (config.preserveOriginal) quality += 0.1;
  if (config.skinTonePreservation) quality += 0.05;
  if (config.colorMode === 'realistic') quality += 0.1;
  if (config.targetType === 'black-and-white') quality += 0.05;

  return Math.min(quality, 1.0);
};

export const getEraDescription = (era?: string): string => {
  switch (era) {
    case '1920s': return '1920s vintage aesthetic with soft colors';
    case '1940s': return '1940s wartime color palette';
    case '1960s': return '1960s vibrant, saturated colors';
    case '1980s': return '1980s neon and pastel tones';
    case 'victorian': return 'Victorian era muted, elegant colors';
    default: return 'Historically appropriate color palette';
  }
};

export const getSuggestedColorPalette = (
  targetType: ColorizationConfig['targetType'],
  colorMode: ColorizationConfig['colorMode']
): string[] => {
  switch (targetType) {
    case 'black-and-white':
      return colorMode === 'vibrant'
        ? ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
        : ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', '#BDC3C7'];
    case 'sepia':
      return ['#8B7355', '#A0826D', '#BC9A6A', '#D2B48C', '#DEB887'];
    case 'faded':
      return ['#E27D60', '#41B3A3', '#85DCBA', '#C1E1DC', '#E8DDCB'];
    case 'damaged':
      return ['#C9302C', '#F0AD4E', '#5BC0DE', '#5CB85C'];
    default:
      return [];
  }
};