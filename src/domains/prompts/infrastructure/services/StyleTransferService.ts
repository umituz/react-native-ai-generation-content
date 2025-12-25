import type { IStyleTransferService } from '../../domain/repositories/IAIPromptServices';
import type {
  StyleTransferConfig,
} from '../../domain/entities/StyleTransferConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptResult } from '../../domain/entities/types';
import { createAIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import {
  validateStyleTransferConfig,
  getStyleStrengthValue,
  getArtisticModeDescription
} from '../../domain/entities/StyleTransferConfig';
import { PromptGenerationService } from '../services/PromptGenerationService';

const createStyleTransferBaseTemplate = (config?: {
  artisticMode?: string;
  preserveContent?: boolean;
}): string => {
  const {
    artisticMode = 'artistic',
    preserveContent = true
  } = config || {};

  return `
You are an expert AI style transfer specialist.
This is a STYLE TRANSFER task, applying artistic styles while maintaining content.

STYLE TRANSFER PRINCIPLES:
- Apply target artistic style to the image
- ${preserveContent ? 'Preserve original content and composition' : 'Allow creative reinterpretation'}
- Maintain key features and subject recognition
- Balance artistic expression with clarity

ARTISTIC MODE: ${artisticMode}
${getArtisticModeDescription(artisticMode as StyleTransferConfig['artisticMode'])}

STYLE APPLICATION GUIDELINES:
- Recognize and preserve important elements
- Apply consistent style throughout the image
- Maintain appropriate color relationships
- Preserve facial features and expressions when present

TECHNICAL REQUIREMENTS:
- Smooth style transitions across the image
- Appropriate detail preservation based on style
- Consistent artistic treatment
- Professional quality output

CONTENT PRESERVATION:
${preserveContent ?
      '- Maintain key shapes and forms\n- Preserve facial features and expressions\n- Keep text readable if present\n- Maintain spatial relationships' :
      '- Allow creative transformation\n- Artistic interpretation encouraged\n- Style over content fidelity'}

SAFETY CONSTRAINTS:
- Do not add inappropriate elements
- Maintain appropriate content standards
- Preserve important visual information
- Avoid destructive transformations

OUTPUT:
A beautifully stylized image with the target artistic style,
${preserveContent ? 'maintaining content integrity' : 'with artistic freedom'}.
  `.trim();
};

export class StyleTransferService implements IStyleTransferService {
  private promptService: PromptGenerationService;
  private availableStyles: string[] = [];

  constructor() {
    this.promptService = new PromptGenerationService();
    this.initializeDefaultStyles();
  }

  generateTemplate(config: StyleTransferConfig): Promise<AIPromptResult<AIPromptTemplate>> {
    try {
      if (!this.validateConfig(config)) {
        return Promise.resolve({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Invalid style transfer configuration'
        });
      }

      const template = this.createStyleTransferTemplate(config);
      return Promise.resolve({ success: true, data: template });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'GENERATION_FAILED',
        message: 'Failed to generate style transfer template'
      });
    }
  }

  async generatePrompt(
    template: AIPromptTemplate,
    config: StyleTransferConfig
  ): Promise<AIPromptResult<string>> {
    const variables = {
      targetStyle: config.targetStyle,
      preserveContent: config.preserveContent,
      styleStrength: config.styleStrength,
      artisticMode: config.artisticMode,
      maintainColors: config.maintainColors,
      adaptToSubject: config.adaptToSubject,
      strengthLevel: getStyleStrengthValue(config.styleStrength),
    };

    return this.promptService.generateFromTemplate(template, variables);
  }

  validateConfig(config: StyleTransferConfig): boolean {
    return validateStyleTransferConfig(config);
  }

  getAvailableStyles(): Promise<string[]> {
    return Promise.resolve([...this.availableStyles]);
  }

  registerStyle(style: string): void {
    if (!this.availableStyles.includes(style)) {
      this.availableStyles.push(style);
    }
  }

  registerStyles(styles: string[]): void {
    styles.forEach(style => this.registerStyle(style));
  }

  private initializeDefaultStyles(): void {
    this.availableStyles = [
      'Impressionism',
      'Cubism',
      'Surrealism',
      'Pop Art',
      'Watercolor',
      'Oil Painting',
      'Pencil Sketch',
      'Anime/Manga',
      'Vintage Film',
      'Cyberpunk',
      'Steampunk',
    ];
  }

  private createStyleTransferTemplate(config: StyleTransferConfig): AIPromptTemplate {
    const templateId = `style-transfer-${config.targetStyle.toLowerCase().replace(/\s+/g, '-')}`;

    const baseTemplate = createStyleTransferBaseTemplate({
      artisticMode: config.artisticMode,
      preserveContent: config.preserveContent,
    });

    return createAIPromptTemplate({
      id: templateId,
      name: `Style Transfer: ${config.targetStyle}`,
      description: `Apply ${config.targetStyle} artistic style with ${config.artisticMode} mode`,
      category: 'style-transfer',
      template: `${baseTemplate}

TARGET STYLE:
${config.targetStyle}

STYLE TRANSFER PARAMETERS:
- Style Strength: ${getStyleStrengthValue(config.styleStrength)} (${Math.round(config.styleStrength * 100)}%)
- Artistic Mode: ${config.artisticMode}
- Preserve Content: ${config.preserveContent}
- Maintain Colors: ${config.maintainColors}
- Adapt to Subject: ${config.adaptToSubject}

STYLE APPLICATION INSTRUCTIONS:
Apply ${config.targetStyle} style with ${config.artisticMode} interpretation,
using ${getStyleStrengthValue(config.styleStrength)} strength level.
${config.preserveContent ? 'Focus on preserving content integrity while applying style.' : 'Allow artistic interpretation and transformation.'}
${config.maintainColors ? 'Maintain original color palette where appropriate.' : 'Allow color changes to enhance style.'}

EXPECTED RESULT:
A beautifully stylized image in ${config.targetStyle} style,
with ${config.artisticMode} artistic interpretation,
using ${getStyleStrengthValue(config.styleStrength)} strength application.
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
}