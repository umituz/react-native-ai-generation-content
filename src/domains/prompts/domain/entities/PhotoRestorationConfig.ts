import type { AIPromptTemplate } from './AIPromptTemplate';

export interface PhotoRestorationConfig {
  severity: 'minor' | 'moderate' | 'severe';
  preserveOriginal: boolean;
  enhanceColors: boolean;
  removeNoise: boolean;
  fixBlur: boolean;
  restoreDetails: boolean;
}

export interface PhotoRestorationTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly basePrompt: string;
  readonly variables: PhotoRestorationVariable[];
  readonly quality: PhotoRestorationQuality;
}

export interface PhotoRestorationVariable {
  name: string;
  description: string;
  required: boolean;
  options?: string[];
}

export interface PhotoRestorationQuality {
  detailLevel: number;
  noiseReduction: number;
  colorAccuracy: number;
  sharpness: number;
}

export interface PhotoRestorationResult {
  template: AIPromptTemplate;
  config: PhotoRestorationConfig;
  estimatedQuality: number;
}

export const validatePhotoRestorationConfig = (config: PhotoRestorationConfig): boolean => {
  return !!(config.severity && config.severity.trim().length > 0);
};

export const createPhotoRestorationVariable = (
  name: string,
  description: string,
  required: boolean = true,
  options?: string[]
): PhotoRestorationVariable => ({
  name,
  description,
  required,
  options,
});

export const getQualityLevel = (severity: PhotoRestorationConfig['severity']): number => {
  switch (severity) {
    case 'minor': return 0.7;
    case 'moderate': return 0.5;
    case 'severe': return 0.3;
    default: return 0.5;
  }
};