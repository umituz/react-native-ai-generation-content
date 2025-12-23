import type { IImageEnhancementService } from '../../domain/repositories/IAIPromptServices';
import type {
  ImageEnhancementConfig,
  EnhancementAdjustments,
} from '../../domain/entities/ImageEnhancementConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptResult } from '../../domain/entities/types';
import { createAIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import {
  validateImageEnhancementConfig,
  calculateAdjustments
} from '../../domain/entities/ImageEnhancementConfig';
import { PromptGenerationService } from '../services/PromptGenerationService';

const createImageEnhancementBaseTemplate = (config?: {
  enhancementType?: string;
  targetStyle?: string;
}): string => {
  const {
    enhancementType = 'comprehensive',
    targetStyle = 'natural'
  } = config || {};

  return `
You are an expert AI image enhancement specialist.
This is an IMAGE ENHANCEMENT task, not image generation.

ENHANCEMENT GOAL:
Apply ${enhancementType} improvements with ${targetStyle} appearance
while preserving the original content and composition.

ENHANCEMENT PRINCIPLES:
- Maintain natural appearance and authenticity
- Apply subtle, professional-grade adjustments
- Preserve important details and textures
- Avoid over-processing or artificial results

TECHNICAL REQUIREMENTS:
- Proper exposure and brightness correction
- Optimal contrast and dynamic range
- Natural color balance and saturation
- Appropriate sharpening and clarity
- Noise reduction without losing details

STYLE CONSIDERATIONS:
${targetStyle === 'vivid' ? '- Vibrant colors with high impact' :
      targetStyle === 'dramatic' ? '- Enhanced contrast and mood' :
        targetStyle === 'professional' ? '- Conservative, polished look' :
          '- Natural, balanced appearance'}

SAFETY CONSTRAINTS:
- Do not alter the subject or composition
- Preserve skin tones and natural colors
- Avoid artificial or over-enhanced results
- Maintain photo authenticity

OUTPUT:
A professionally enhanced version with ${enhancementType} improvements,
optimized for ${targetStyle} presentation.
  `.trim();
};

export class ImageEnhancementService implements IImageEnhancementService {
  private promptService: PromptGenerationService;

  constructor() {
    this.promptService = new PromptGenerationService();
  }

  async generateTemplate(config: ImageEnhancementConfig): Promise<AIPromptResult<AIPromptTemplate>> {
    try {
      if (!this.validateConfig(config)) {
        return {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Invalid image enhancement configuration'
        };
      }

      const template = this.createImageEnhancementTemplate(config);
      return { success: true, data: template };
    } catch (error) {
      return {
        success: false,
        error: 'GENERATION_FAILED',
        message: 'Failed to generate image enhancement template'
      };
    }
  }

  async generatePrompt(
    template: AIPromptTemplate,
    config: ImageEnhancementConfig
  ): Promise<AIPromptResult<string>> {
    const adjustments = this.calculateAdjustments(config);
    const variables = {
      enhancementType: config.enhancementType,
      intensity: config.intensity,
      preserveNatural: config.preserveNatural,
      autoAdjust: config.autoAdjust,
      targetStyle: config.targetStyle,
      adjustments,
    };

    return this.promptService.generateFromTemplate(template, variables);
  }

  validateConfig(config: ImageEnhancementConfig): boolean {
    return validateImageEnhancementConfig(config);
  }

  calculateAdjustments(config: ImageEnhancementConfig): EnhancementAdjustments {
    return calculateAdjustments(config);
  }

  private createImageEnhancementTemplate(config: ImageEnhancementConfig): AIPromptTemplate {
    const templateId = `image-enhancement-${config.enhancementType}`;

    const baseTemplate = createImageEnhancementBaseTemplate({
      enhancementType: config.enhancementType,
      targetStyle: config.targetStyle,
    });

    return createAIPromptTemplate({
      id: templateId,
      name: `Image Enhancement: ${config.enhancementType}`,
      description: `Enhance images with ${config.enhancementType} improvements`,
      category: 'image-enhancement',
      template: `${baseTemplate}

ENHANCEMENT TYPE:
${config.enhancementType}

STYLE TARGET:
${config.targetStyle}

ADJUSTMENT PARAMETERS:
- Intensity Level: ${Math.round(config.intensity * 100)}%
- Preserve Natural: ${config.preserveNatural}
- Auto Adjust: ${config.autoAdjust}
- Target Style: ${config.targetStyle}

SPECIFIC ENHANCEMENTS:
${this.getSpecificEnhancements(config)}

EXPECTED RESULT:
Professional ${config.enhancementType} enhancement
with ${config.targetStyle} presentation style,
maintaining authenticity while improving quality.
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

  private getSpecificEnhancements(config: ImageEnhancementConfig): string {
    const enhancements: string[] = [];

    if (config.enhancementType === 'brightness' || config.enhancementType === 'all') {
      enhancements.push('- Brightness optimization for perfect exposure');
    }
    if (config.enhancementType === 'contrast' || config.enhancementType === 'all') {
      enhancements.push('- Contrast enhancement for dynamic range');
    }
    if (config.enhancementType === 'saturation' || config.enhancementType === 'all') {
      enhancements.push('- Saturation adjustment for color vibrancy');
    }
    if (config.enhancementType === 'sharpness' || config.enhancementType === 'all') {
      enhancements.push('- Sharpness improvement for detail clarity');
    }

    return enhancements.join('\n') || '- General image quality improvement';
  }
}