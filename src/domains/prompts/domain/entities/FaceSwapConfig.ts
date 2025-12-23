import type { AIPromptTemplate } from './AIPromptTemplate';
import type { GeneratedPrompt } from './GeneratedPrompt';

export interface FaceSwapConfig {
  preserveIdentity: boolean;
  allowHairStyle: boolean;
  allowAccessories: boolean;
  allowExpression: boolean;
  environment?: string;
  styleName: string;
}

export interface FaceSwapTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly basePrompt: string;
  readonly variables: FaceSwapTemplateVariable[];
  readonly safety: FaceSwapSafety;
}

export interface FaceSwapTemplateVariable {
  name: string;
  description: string;
  required: boolean;
  options?: string[];
}

export interface FaceSwapSafety {
  contentFilter: boolean;
  identityPreservation: boolean;
  adultContentFilter: boolean;
}

export interface FaceSwapGenerationResult {
  template: AIPromptTemplate;
  prompt: GeneratedPrompt;
}

export const validateFaceSwapConfig = (config: FaceSwapConfig): boolean => {
  return !!(config.styleName && config.styleName.trim().length > 0);
};

export const createFaceSwapVariable = (
  name: string,
  description: string,
  required: boolean = true,
  options?: string[]
): FaceSwapTemplateVariable => ({
  name,
  description,
  required,
  options,
});