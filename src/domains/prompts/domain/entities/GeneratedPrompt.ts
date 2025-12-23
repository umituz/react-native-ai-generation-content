import type { AIPromptTemplate } from './AIPromptTemplate';

export interface GeneratedPrompt {
  readonly id: string;
  readonly templateId: string;
  readonly generatedText: string;
  readonly variables: Record<string, unknown>;
  readonly timestamp: Date;
}

export interface CreateGeneratedPromptParams {
  templateId: string;
  generatedText: string;
  variables: Record<string, unknown>;
}

export const createGeneratedPrompt = (
  params: CreateGeneratedPromptParams
): GeneratedPrompt => ({
  id: `prompt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  templateId: params.templateId,
  generatedText: params.generatedText,
  variables: params.variables,
  timestamp: new Date(),
});

export const isPromptRecent = (prompt: GeneratedPrompt, hours: number = 24): boolean => {
  const now = new Date();
  const promptTime = new Date(prompt.timestamp);
  const diffInHours = (now.getTime() - promptTime.getTime()) / (1000 * 60 * 60);
  return diffInHours <= hours;
};