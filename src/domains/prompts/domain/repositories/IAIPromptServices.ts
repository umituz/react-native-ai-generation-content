import type { AIPromptTemplate } from '../entities/AIPromptTemplate';
import type { AIPromptResult } from '../entities/types';

/**
 * Prompt Generation Service Interface
 * Core service for generating prompts from templates
 */
export interface IPromptGenerationService {
  generateFromTemplate(
    template: AIPromptTemplate,
    variables: Record<string, unknown>
  ): Promise<AIPromptResult<string>>;
  validateVariables(
    template: AIPromptTemplate,
    variables: Record<string, unknown>
  ): AIPromptResult<void>;
  replaceTemplateVariables(
    template: string,
    variables: Record<string, unknown>
  ): string;
}
