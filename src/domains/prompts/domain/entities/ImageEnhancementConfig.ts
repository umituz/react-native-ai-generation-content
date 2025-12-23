import type { AIPromptTemplate } from './AIPromptTemplate';

export interface ImageEnhancementConfig {
  enhancementType: 'brightness' | 'contrast' | 'saturation' | 'sharpness' | 'all';
  intensity: number;
  preserveNatural: boolean;
  autoAdjust: boolean;
  targetStyle: 'natural' | 'vivid' | 'dramatic' | 'professional';
}

export interface ImageEnhancementTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly basePrompt: string;
  readonly variables: ImageEnhancementVariable[];
  readonly enhancement: EnhancementSettings;
}

export interface ImageEnhancementVariable {
  name: string;
  description: string;
  required: boolean;
  type: 'number' | 'select';
  min?: number;
  max?: number;
  options?: string[];
}

export interface EnhancementSettings {
  brightnessRange: [number, number];
  contrastRange: [number, number];
  saturationRange: [number, number];
  sharpnessRange: [number, number];
}

export interface ImageEnhancementResult {
  template: AIPromptTemplate;
  config: ImageEnhancementConfig;
  adjustments: EnhancementAdjustments;
}

export interface EnhancementAdjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  sharpness: number;
  overall: number;
}

export const validateImageEnhancementConfig = (config: ImageEnhancementConfig): boolean => {
  return !!(
    config.enhancementType && 
    config.intensity >= 0 && 
    config.intensity <= 1 &&
    config.targetStyle
  );
};

export const createImageEnhancementVariable = (
  name: string,
  description: string,
  type: ImageEnhancementVariable['type'] = 'select',
  required: boolean = true,
  options?: string[]
): ImageEnhancementVariable => ({
  name,
  description,
  type,
  required,
  options,
});

export const calculateAdjustments = (
  config: ImageEnhancementConfig
): EnhancementAdjustments => {
  const baseIntensity = config.intensity;
  const multiplier = config.targetStyle === 'dramatic' ? 1.5 : 
                    config.targetStyle === 'vivid' ? 1.2 : 
                    config.targetStyle === 'professional' ? 0.8 : 1;

  return {
    brightness: config.enhancementType === 'brightness' || config.enhancementType === 'all' 
      ? baseIntensity * multiplier : 0,
    contrast: config.enhancementType === 'contrast' || config.enhancementType === 'all' 
      ? baseIntensity * multiplier : 0,
    saturation: config.enhancementType === 'saturation' || config.enhancementType === 'all' 
      ? baseIntensity * multiplier : 0,
    sharpness: config.enhancementType === 'sharpness' || config.enhancementType === 'all' 
      ? baseIntensity * multiplier : 0,
    overall: baseIntensity * multiplier,
  };
};