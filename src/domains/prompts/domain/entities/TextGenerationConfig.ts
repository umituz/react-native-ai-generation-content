import type { AIPromptTemplate } from './AIPromptTemplate';

export interface TextGenerationConfig {
  promptType: 'creative' | 'technical' | 'marketing' | 'educational' | 'conversational';
  tone: 'formal' | 'casual' | 'professional' | 'friendly' | 'humorous';
  length: 'short' | 'medium' | 'long';
  language: string;
  context?: string;
  keywords?: string[];
}

export interface TextGenerationTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly basePrompt: string;
  readonly variables: TextGenerationVariable[];
  readonly generation: TextGenerationSettings;
}

export interface TextGenerationVariable {
  name: string;
  description: string;
  required: boolean;
  type: 'string' | 'select' | 'array';
  options?: string[];
}

export interface TextGenerationSettings {
  supportedLanguages: string[];
  maxTokens: Record<string, number>;
  temperaturePresets: Record<string, number>;
}

export interface TextGenerationResult {
  template: AIPromptTemplate;
  config: TextGenerationConfig;
  estimatedTokens: number;
  suggestedParameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
  };
}

export const validateTextGenerationConfig = (config: TextGenerationConfig): boolean => {
  return !!(
    config.promptType &&
    config.tone &&
    config.length &&
    config.language &&
    config.language.trim().length > 0
  );
};

export const createTextGenerationVariable = (
  name: string,
  description: string,
  type: TextGenerationVariable['type'] = 'string',
  required: boolean = true,
  options?: string[]
): TextGenerationVariable => ({
  name,
  description,
  type,
  required,
  options,
});

export const getTokenCount = (length: TextGenerationConfig['length']): number => {
  switch (length) {
    case 'short': return 50;
    case 'medium': return 200;
    case 'long': return 500;
    default: return 200;
  }
};

export const getTemperature = (
  promptType: TextGenerationConfig['promptType'],
  tone: TextGenerationConfig['tone']
): number => {
  let temp = 0.7;
  
  if (promptType === 'creative') temp += 0.2;
  if (promptType === 'technical') temp -= 0.3;
  if (tone === 'humorous') temp += 0.1;
  if (tone === 'formal') temp -= 0.2;
  
  return Math.max(0.1, Math.min(1.0, temp));
};

export const getTopP = (promptType: TextGenerationConfig['promptType']): number => {
  switch (promptType) {
    case 'creative': return 0.95;
    case 'technical': return 0.8;
    case 'educational': return 0.85;
    default: return 0.9;
  }
};