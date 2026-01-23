/**
 * Text Generation Service
 * AI prompt generation for text content creation
 */

import type {ITextGenerationService} from '../../domain/repositories/IAIPromptServices';
import type {TextGenerationConfig} from '../../domain/entities/TextGenerationConfig';
import type {AIPromptTemplate} from '../../domain/entities/AIPromptTemplate';
import {
  validateTextGenerationConfig,
  getTokenCount,
  getTemperature,
  getTopP,
} from '../../domain/entities/TextGenerationConfig';
import { BasePromptService } from './base';

const BASE_TEMPLATE = `
You are an expert text generation specialist.
This is a TEXT GENERATION task with specific requirements.

CONTENT STANDARDS:
- Clear, coherent, and well-structured text
- Appropriate for the specified tone and purpose
- Natural language flow and readability

SAFETY:
- Generate appropriate, non-offensive content
- Avoid harmful or misleading information
- Ensure factual accuracy when applicable
- Respect copyright and intellectual property
`.trim();

export class TextGenerationService
  extends BasePromptService<TextGenerationConfig>
  implements ITextGenerationService
{
  protected getServiceName(): string {
    return 'text generation';
  }

  validateConfig(config: TextGenerationConfig): boolean {
    return validateTextGenerationConfig(config);
  }

  estimateTokens(config: TextGenerationConfig): number {
    return getTokenCount(config.length);
  }

  getGenerationParameters(config: TextGenerationConfig): Record<string, number> {
    return {
      temperature: getTemperature(config.promptType, config.tone),
      maxTokens: this.estimateTokens(config),
      topP: getTopP(config.promptType),
      frequencyPenalty: config.tone === 'formal' ? 0.3 : 0.1,
      presencePenalty: config.promptType === 'creative' ? 0.2 : 0.1,
    };
  }

  protected buildVariables(config: TextGenerationConfig): Record<string, unknown> {
    return {
      promptType: config.promptType,
      tone: config.tone,
      length: config.length,
      language: config.language,
      context: config.context || '',
      keywords: config.keywords?.join(', ') || '',
      ...this.getGenerationParameters(config),
    };
  }

  protected createTemplate(config: TextGenerationConfig): AIPromptTemplate {
    const tokens = this.estimateTokens(config);

    return this.createTemplateWithDefaults({
      id: `text-generation-${config.promptType}`,
      name: `Text Generation: ${config.promptType}`,
      description: `Generate ${config.promptType} content in ${config.language}`,
      category: 'text-generation',
      template: `${BASE_TEMPLATE}

TYPE: ${config.promptType}
TONE: ${config.tone}
LENGTH: ${config.length}
LANGUAGE: ${config.language}
TOKENS: ~${tokens}
${config.context ? `CONTEXT: ${config.context}` : ''}
${config.keywords?.length ? `KEYWORDS: ${config.keywords.join(', ')}` : ''}`,
    });
  }
}
