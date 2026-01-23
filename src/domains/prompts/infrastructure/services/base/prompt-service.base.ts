/**
 * Base Prompt Service
 * Abstract class for AI prompt generation services
 * Eliminates code duplication across service implementations
 */

import type { AIPromptTemplate } from '@ai-generation/prompts';
import type { AIPromptResult, AIPromptCategory } from '@ai-generation/prompts';
import type { AIPromptSafety } from '@ai-generation/prompts';
import { createAIPromptTemplate } from '@ai-generation/prompts';
import { PromptGenerationService } from '@ai-generation/prompts';

/**
 * Default safety configuration for all AI prompt templates
 */
export const DEFAULT_PROMPT_SAFETY: AIPromptSafety = {
  contentFilter: true,
  adultContentFilter: true,
  violenceFilter: true,
  hateSpeechFilter: true,
  copyrightFilter: true,
};

/**
 * Template creation parameters
 */
export interface TemplateParams {
  id: string;
  name: string;
  description: string;
  category: AIPromptCategory;
  template: string;
}

/**
 * Base class for AI prompt generation services
 * Provides common functionality for template generation
 */
export abstract class BasePromptService<TConfig> {
  protected readonly promptService: PromptGenerationService;

  constructor() {
    this.promptService = new PromptGenerationService();
  }

  /**
   * Generate template with standard error handling
   */
  generateTemplate(config: TConfig): Promise<AIPromptResult<AIPromptTemplate>> {
    try {
      if (!this.validateConfig(config)) {
        return Promise.resolve({
          success: false,
          error: 'VALIDATION_ERROR',
          message: `Invalid ${this.getServiceName()} configuration`,
        });
      }

      const template = this.createTemplate(config);
      return Promise.resolve({ success: true, data: template });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'GENERATION_FAILED',
        message: `Failed to generate ${this.getServiceName()} template`,
      });
    }
  }

  /**
   * Generate prompt from template
   */
  async generatePrompt(
    template: AIPromptTemplate,
    config: TConfig,
  ): Promise<AIPromptResult<string>> {
    const variables = this.buildVariables(config);
    return this.promptService.generateFromTemplate(template, variables);
  }

  /**
   * Create template with default safety config
   */
  protected createTemplateWithDefaults(params: TemplateParams): AIPromptTemplate {
    return createAIPromptTemplate({
      ...params,
      variables: [],
      safety: DEFAULT_PROMPT_SAFETY,
      version: '1.0.0',
    });
  }

  /**
   * Service name for error messages
   */
  protected abstract getServiceName(): string;

  /**
   * Validate configuration
   */
  abstract validateConfig(config: TConfig): boolean;

  /**
   * Create the template (service-specific)
   */
  protected abstract createTemplate(config: TConfig): AIPromptTemplate;

  /**
   * Build variables for prompt generation
   */
  protected abstract buildVariables(config: TConfig): Record<string, unknown>;
}
