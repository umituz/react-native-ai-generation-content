import type { AIPromptTemplate } from './AIPromptTemplate';

export interface StyleTransferConfig {
  targetStyle: string;
  preserveContent: boolean;
  styleStrength: number;
  artisticMode: 'photorealistic' | 'artistic' | 'abstract' | 'cartoon';
  maintainColors: boolean;
  adaptToSubject: boolean;
}

export interface StyleTransferTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly basePrompt: string;
  readonly variables: StyleTransferVariable[];
  readonly style: StyleTransferSettings;
}

export interface StyleTransferVariable {
  name: string;
  description: string;
  required: boolean;
  options?: string[];
  type: 'string' | 'select';
}

export interface StyleTransferSettings {
  supportedStyles: string[];
  maxStyleStrength: number;
  preserveContentLevels: number[];
  qualityPresets: Record<string, number>;
}

export interface StyleTransferResult {
  template: AIPromptTemplate;
  config: StyleTransferConfig;
  appliedStyle: string;
  expectedQuality: number;
}

export const validateStyleTransferConfig = (config: StyleTransferConfig): boolean => {
  return !!(
    config.targetStyle && 
    config.targetStyle.trim().length > 0 &&
    config.styleStrength >= 0 && 
    config.styleStrength <= 1 &&
    config.artisticMode
  );
};

export const createStyleTransferVariable = (
  name: string,
  description: string,
  required: boolean = true,
  options?: string[]
): StyleTransferVariable => ({
  name,
  description,
  required,
  options,
  type: 'string',
});

export const getStyleStrengthValue = (strength: number): string => {
  if (strength <= 0.3) return 'subtle';
  if (strength <= 0.6) return 'moderate';
  return 'strong';
};

export const getArtisticModeDescription = (mode: StyleTransferConfig['artisticMode']): string => {
  switch (mode) {
    case 'photorealistic': return 'Maintain realistic appearance while applying style';
    case 'artistic': return 'Apply artistic interpretation with creative freedom';
    case 'abstract': return 'Transform into abstract artistic representation';
    case 'cartoon': return 'Convert to cartoon/animated style';
    default: return 'Apply selected artistic style';
  }
};