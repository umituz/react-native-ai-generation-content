import type { AIPromptTemplate } from './AIPromptTemplate';

export interface BackgroundRemovalConfig {
  precision: 'fast' | 'accurate' | 'ultra-accurate';
  edgeRefinement: boolean;
  preserveHair: boolean;
  outputFormat: 'png' | 'webp' | 'transparent';
  addNewBackground?: string;
}

export interface BackgroundRemovalTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly basePrompt: string;
  readonly variables: BackgroundRemovalVariable[];
  readonly processing: BackgroundRemovalSettings;
}

export interface BackgroundRemovalVariable {
  name: string;
  description: string;
  required: boolean;
  options?: string[];
}

export interface BackgroundRemovalSettings {
  supportedFormats: string[];
  maxResolution: number;
  processingTimes: Record<string, number>;
}

export interface BackgroundRemovalResult {
  template: AIPromptTemplate;
  config: BackgroundRemovalConfig;
  estimatedProcessingTime: number;
  qualityScore: number;
}

export interface DetectedObject {
  type: string;
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const validateBackgroundRemovalConfig = (config: BackgroundRemovalConfig): boolean => {
  return !!(
    config.precision && 
    config.outputFormat &&
    ['png', 'webp', 'transparent'].includes(config.outputFormat)
  );
};

export const createBackgroundRemovalVariable = (
  name: string,
  description: string,
  required: boolean = true,
  options?: string[]
): BackgroundRemovalVariable => ({
  name,
  description,
  required,
  options,
});

export const getProcessingTime = (precision: BackgroundRemovalConfig['precision']): number => {
  switch (precision) {
    case 'fast': return 2;
    case 'accurate': return 5;
    case 'ultra-accurate': return 10;
    default: return 5;
  }
};

export const getQualityScore = (config: BackgroundRemovalConfig): number => {
  let score = config.edgeRefinement ? 0.9 : 0.7;
  if (config.preserveHair) score += 0.05;
  if (config.precision === 'ultra-accurate') score += 0.15;
  if (config.precision === 'accurate') score += 0.1;
  return Math.min(score, 1.0);
};