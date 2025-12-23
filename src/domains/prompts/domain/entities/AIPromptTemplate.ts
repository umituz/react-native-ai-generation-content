import type { AIPromptCategory } from './types';
import type { AIPromptVariable, AIPromptSafety, AIPromptVersion } from './value-objects';
import { createPromptVersion, formatVersion } from './value-objects';

export interface AIPromptTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: AIPromptCategory;
  readonly template: string;
  readonly variables: readonly AIPromptVariable[];
  readonly safety: AIPromptSafety;
  readonly version: AIPromptVersion;
}

export interface CreateAIPromptTemplateParams {
  id: string;
  name: string;
  description: string;
  category: AIPromptCategory;
  template: string;
  variables?: AIPromptVariable[];
  safety: AIPromptSafety;
  version: string;
}

export const createAIPromptTemplate = (
  params: CreateAIPromptTemplateParams
): AIPromptTemplate => ({
  id: params.id,
  name: params.name,
  description: params.description,
  category: params.category,
  template: params.template,
  variables: params.variables || [],
  safety: params.safety,
  version: createPromptVersion(params.version),
});

export const updateTemplateVersion = (
  template: AIPromptTemplate,
  newVersion: string
): AIPromptTemplate => ({
  ...template,
  version: createPromptVersion(newVersion),
});

export const getTemplateString = (template: AIPromptTemplate): string => formatVersion(template.version);