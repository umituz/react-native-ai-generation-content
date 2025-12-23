import type { ITextGenerationService } from '../../domain/repositories/IAIPromptServices';
import type {
  TextGenerationConfig,
} from '../../domain/entities/TextGenerationConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptResult } from '../../domain/entities/types';
import { createAIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import {
  validateTextGenerationConfig,
  getTokenCount,
  getTemperature,
  getTopP
} from '../../domain/entities/TextGenerationConfig';
import { PromptGenerationService } from '../services/PromptGenerationService';

const createTextGenerationBaseTemplate = (config?: {
  promptType?: string;
  tone?: string;
  language?: string;
}): string => {
  const {
    promptType = 'general',
    tone = 'professional',
    language = 'English'
  } = config || {};

  return `
You are an expert text generation specialist.
This is a TEXT GENERATION task with specific requirements.

GENERATION OBJECTIVES:
- Generate ${promptType} content with ${tone} tone
- Write in ${language} language
- Follow provided context and constraints
- Deliver high-quality, appropriate content

CONTENT STANDARDS:
- Clear, coherent, and well-structured text
- Appropriate for the specified tone and purpose
- Natural language flow and readability
- Relevant and informative content

STYLE REQUIREMENTS:
- Maintain ${tone} tone throughout
- Use appropriate vocabulary and expressions
- Follow conventions for ${promptType} content
- Adapt complexity to intended audience

LANGUAGE REQUIREMENTS:
- Write fluently in ${language}
- Use proper grammar and syntax
- Consider cultural and regional variations
- Maintain consistency in language usage

SAFETY AND QUALITY:
- Generate appropriate, non-offensive content
- Avoid harmful or misleading information
- Ensure factual accuracy when applicable
- Respect copyright and intellectual property

OUTPUT:
Professional ${promptType} content in ${language},
written with ${tone} tone,
meeting all specified requirements.
  `.trim();
};

export class TextGenerationService implements ITextGenerationService {
  private promptService: PromptGenerationService;

  constructor() {
    this.promptService = new PromptGenerationService();
  }

  async generateTemplate(config: TextGenerationConfig): Promise<AIPromptResult<AIPromptTemplate>> {
    try {
      if (!this.validateConfig(config)) {
        return {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Invalid text generation configuration'
        };
      }

      const template = this.createTextGenerationTemplate(config);
      return { success: true, data: template };
    } catch (error) {
      return {
        success: false,
        error: 'GENERATION_FAILED',
        message: 'Failed to generate text template'
      };
    }
  }

  async generatePrompt(
    template: AIPromptTemplate,
    config: TextGenerationConfig
  ): Promise<AIPromptResult<string>> {
    const parameters = this.getGenerationParameters(config);
    const variables = {
      promptType: config.promptType,
      tone: config.tone,
      length: config.length,
      language: config.language,
      context: config.context || '',
      keywords: config.keywords?.join(', ') || '',
      ...parameters,
    };

    return this.promptService.generateFromTemplate(template, variables);
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

  private createTextGenerationTemplate(config: TextGenerationConfig): AIPromptTemplate {
    const templateId = `text-generation-${config.promptType}`;

    const baseTemplate = createTextGenerationBaseTemplate({
      promptType: config.promptType,
      tone: config.tone,
      language: config.language,
    });

    return createAIPromptTemplate({
      id: templateId,
      name: `Text Generation: ${config.promptType}`,
      description: `Generate ${config.promptType} content in ${config.language}`,
      category: 'text-generation',
      template: `${baseTemplate}

GENERATION PARAMETERS:
- Prompt Type: ${config.promptType}
- Tone: ${config.tone}
- Length: ${config.length}
- Language: ${config.language}
- Estimated Tokens: ${this.estimateTokens(config)}

${config.context ? `CONTEXT:
${config.context}

` : ''}${config.keywords && config.keywords.length > 0 ? `KEYWORDS:
${config.keywords.join(', ')}

` : ''}CONTENT REQUIREMENTS:
- Generate ${config.length} content appropriate for ${config.promptType}
- Use ${config.tone} tone throughout the text
- Follow conventions for ${config.promptType} writing
- Write fluently in ${config.language}

STYLE GUIDELINES:
${this.getStyleGuidelines(config)}

GENERATION PARAMETERS:
- Temperature: ${getTemperature(config.promptType, config.tone)} (creativity level)
- Max Tokens: ${this.estimateTokens(config)} (content length)
- Top-P: ${getTopP(config.promptType)} (nucleus sampling)
- Frequency Penalty: ${config.tone === 'formal' ? 0.3 : 0.1} (repetition reduction)
- Presence Penalty: ${config.promptType === 'creative' ? 0.2 : 0.1} (new topic encouragement)

EXPECTED OUTPUT:
Professional ${config.promptType} content in ${config.language},
approximately ${this.estimateTokens(config)} tokens long,
with ${config.tone} tone and appropriate style.
      `.trim(),
      variables: [],
      safety: {
        contentFilter: true,
        adultContentFilter: true,
        violenceFilter: true,
        hateSpeechFilter: true,
        copyrightFilter: true,
      },
      version: '1.0.0',
    });
  }

  private getStyleGuidelines(config: TextGenerationConfig): string {
    const guidelines: string[] = [];

    switch (config.promptType) {
      case 'creative':
        guidelines.push('- Use imaginative and engaging language');
        guidelines.push('- Incorporate vivid descriptions and storytelling');
        break;
      case 'technical':
        guidelines.push('- Use precise terminology and clear explanations');
        guidelines.push('- Maintain logical structure and accuracy');
        break;
      case 'marketing':
        guidelines.push('- Use persuasive and compelling language');
        guidelines.push('- Include clear calls to action');
        break;
      case 'educational':
        guidelines.push('- Present information clearly and progressively');
        guidelines.push('- Include examples and explanations');
        break;
      case 'conversational':
        guidelines.push('- Use natural, approachable language');
        guidelines.push('- Include questions and engagement elements');
        break;
    }

    switch (config.tone) {
      case 'formal':
        guidelines.push('- Maintain professional and respectful language');
        guidelines.push('- Use proper grammar and complete sentences');
        break;
      case 'casual':
        guidelines.push('- Use relaxed, natural language');
        guidelines.push('- Include some conversational elements');
        break;
      case 'friendly':
        guidelines.push('- Use warm and approachable tone');
        guidelines.push('- Include encouraging and positive elements');
        break;
      case 'humorous':
        guidelines.push('- Incorporate appropriate humor and wit');
        guidelines.push('- Maintain lighthearted and engaging style');
        break;
    }

    return guidelines.join('\n') || '- Follow standard writing conventions';
  }
}