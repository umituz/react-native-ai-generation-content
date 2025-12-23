import type { IColorizationService } from '../../domain/repositories/IAIPromptServices';
import type {
  ColorizationConfig,
} from '../../domain/entities/ColorizationConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptResult } from '../../domain/entities/types';
import { createAIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import {
  validateColorizationConfig,
  getColorizationQuality,
  getEraDescription,
  getSuggestedColorPalette
} from '../../domain/entities/ColorizationConfig';
import { PromptGenerationService } from '../services/PromptGenerationService';

const createColorizationBaseTemplate = (config?: {
  targetType?: string;
  colorMode?: string;
}): string => {
  const {
    targetType = 'black-and-white',
    colorMode = 'realistic'
  } = config || {};

  return `
You are an expert AI colorization specialist.
This is a PHOTO COLORIZATION task, not image generation.

COLORIZATION OBJECTIVES:
- Add appropriate colors to ${targetType} images
- Apply ${colorMode} color treatment while preserving authenticity
- Maintain original composition and details
- Create natural, pleasing color relationships

COLORIZATION PRINCIPLES:
- Research appropriate color schemes for image era/content
- Apply colors that match scene context and lighting
- Preserve details and textures while adding color
- Ensure color harmony and balance throughout image

${colorMode === 'realistic' ?
      `REALISTIC COLORIZATION:
- Use historically accurate colors when appropriate
- Consider natural lighting conditions
- Apply realistic skin tones and environmental colors
- Maintain photographic authenticity` :
      colorMode === 'vibrant' ?
        `VIBRANT COLORIZATION:
- Use rich, saturated colors for visual impact
- Create bold color contrasts and relationships
- Apply artistic color interpretations
- Enhance visual interest and appeal` :
        colorMode === 'artistic' ?
          `ARTISTIC COLORIZATION:
- Apply creative color interpretations
- Use expressive color choices and combinations
- Create mood and atmosphere through color
- Allow artistic freedom in color selection` :
          `VINTAGE COLORIZATION:
- Use period-appropriate color palettes
- Apply aged, authentic color treatments
- Maintain historical color sensibilities
- Create nostalgic, time-appropriate appearance`}

TECHNICAL REQUIREMENTS:
- Preserve edges and details during color application
- Apply colors smoothly and naturally
- Consider lighting and shadow relationships
- Maintain image quality and resolution

SAFETY CONSTRAINTS:
- Do not alter content or composition
- Preserve important details and features
- Avoid inappropriate or unrealistic colors
- Maintain appropriate content standards

OUTPUT:
Beautifully colorized version of the original ${targetType} image,
with ${colorMode} color treatment that enhances rather than dominates.
  `.trim();
};

export class ColorizationService implements IColorizationService {
  private promptService: PromptGenerationService;

  constructor() {
    this.promptService = new PromptGenerationService();
  }

  async generateTemplate(config: ColorizationConfig): Promise<AIPromptResult<AIPromptTemplate>> {
    try {
      if (!this.validateConfig(config)) {
        return {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Invalid colorization configuration'
        };
      }

      const template = this.createColorizationTemplate(config);
      return { success: true, data: template };
    } catch (error) {
      return {
        success: false,
        error: 'GENERATION_FAILED',
        message: 'Failed to generate colorization template'
      };
    }
  }

  async generatePrompt(
    template: AIPromptTemplate,
    config: ColorizationConfig
  ): Promise<AIPromptResult<string>> {
    const variables = {
      targetType: config.targetType,
      colorMode: config.colorMode,
      preserveOriginal: config.preserveOriginal,
      adjustLighting: config.adjustLighting,
      skinTonePreservation: config.skinTonePreservation,
      era: config.era || '',
      qualityScore: getColorizationQuality(config),
      colorPalette: this.getColorPalette(config),
    };

    return this.promptService.generateFromTemplate(template, variables);
  }

  validateConfig(config: ColorizationConfig): boolean {
    return validateColorizationConfig(config);
  }

  getColorPalette(config: ColorizationConfig): string[] {
    return getSuggestedColorPalette(config.targetType, config.colorMode);
  }

  getQualityScore(config: ColorizationConfig): number {
    return getColorizationQuality(config);
  }

  private createColorizationTemplate(config: ColorizationConfig): AIPromptTemplate {
    const templateId = `colorization-${config.targetType}-${config.colorMode}`;

    const baseTemplate = createColorizationBaseTemplate({
      targetType: config.targetType,
      colorMode: config.colorMode,
    });

    return createAIPromptTemplate({
      id: templateId,
      name: `Colorization: ${config.targetType} to ${config.colorMode}`,
      description: `Colorize ${config.targetType} images with ${config.colorMode} treatment`,
      category: 'colorization',
      template: `${baseTemplate}

COLORIZATION CONFIGURATION:
- Target Type: ${config.targetType}
- Color Mode: ${config.colorMode}
- Preserve Original: ${config.preserveOriginal}
- Adjust Lighting: ${config.adjustLighting}
- Skin Tone Preservation: ${config.skinTonePreservation}
${config.era ? `- Era: ${config.era}` : ''}

COLOR REQUIREMENTS:
${this.getColorRequirements(config)}

${config.era ? `ERA-SPECIFIC GUIDELINES:
${getEraDescription(config.era)}

` : ''}QUALITY EXPECTATIONS:
- Quality Score: ${Math.round(getColorizationQuality(config) * 100)}%
- Color Mode: ${config.colorMode} treatment applied
- Preserved Elements: ${config.preserveOriginal ? 'Original content preserved' : 'Enhanced interpretation'}
- Skin Handling: ${config.skinTonePreservation ? 'Natural tones preserved' : 'Artistic interpretation allowed'}

${this.getColorPalette(config).length > 0 ? `
SUGGESTED COLOR PALETTE:
${this.getColorPalette(config).join(', ')}

` : ''}EXPECTED RESULT:
Professionally colorized ${config.targetType} image,
with ${config.colorMode} color treatment,
${config.skinTonePreservation ? 'maintaining natural appearance' : 'allowing artistic interpretation'}.
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

  private getColorRequirements(config: ColorizationConfig): string {
    const requirements: string[] = [];

    if (config.targetType === 'black-and-white') {
      requirements.push('- Add natural colors to monochrome image');
      requirements.push('- Consider original grayscale values for color mapping');
    }

    if (config.targetType === 'sepia') {
      requirements.push('- Refresh and enhance sepia-toned image');
      requirements.push('- Maintain vintage character while adding color');
    }

    if (config.colorMode === 'realistic') {
      requirements.push('- Use historically and naturally accurate colors');
      requirements.push('- Apply appropriate skin tones and environmental colors');
    }

    if (config.colorMode === 'vibrant') {
      requirements.push('- Use rich, saturated colors for visual impact');
      requirements.push('- Create bold color contrasts and relationships');
    }

    if (config.adjustLighting) {
      requirements.push('- Adjust colors for optimal lighting conditions');
      requirements.push('- Ensure appropriate contrast and brightness');
    }

    if (config.skinTonePreservation) {
      requirements.push('- Maintain natural, appropriate skin tones');
      requirements.push('- Avoid unrealistic or inappropriate skin colors');
    }

    return requirements.join('\n') || '- Apply appropriate color treatment based on configuration';
  }
}