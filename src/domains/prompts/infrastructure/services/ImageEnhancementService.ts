/**
 * Image Enhancement Service
 * AI prompt generation for image enhancement tasks
 */

import type { IImageEnhancementService } from '@ai-generation/prompts';
import type { ImageEnhancementConfig, EnhancementAdjustments } from '@ai-generation/prompts';
import type { AIPromptTemplate } from '@ai-generation/prompts';
import { validateImageEnhancementConfig, calculateAdjustments } from '@ai-generation/prompts';
import { BasePromptService } from './base';

const BASE_TEMPLATE = `
You are an expert AI image enhancement specialist.
This is an IMAGE ENHANCEMENT task, not image generation.

ENHANCEMENT PRINCIPLES:
- Maintain natural appearance and authenticity
- Apply subtle, professional-grade adjustments
- Preserve important details and textures

TECHNICAL REQUIREMENTS:
- Proper exposure and brightness correction
- Optimal contrast and dynamic range
- Natural color balance and saturation
- Appropriate sharpening and clarity

SAFETY CONSTRAINTS:
- Do not alter the subject or composition
- Preserve skin tones and natural colors
- Maintain photo authenticity
`.trim();

export class ImageEnhancementService
  extends BasePromptService<ImageEnhancementConfig>
  implements IImageEnhancementService
{
  protected getServiceName(): string {
    return 'image enhancement';
  }

  validateConfig(config: ImageEnhancementConfig): boolean {
    return validateImageEnhancementConfig(config);
  }

  calculateAdjustments(config: ImageEnhancementConfig): EnhancementAdjustments {
    return calculateAdjustments(config);
  }

  protected buildVariables(config: ImageEnhancementConfig): Record<string, unknown> {
    return {
      enhancementType: config.enhancementType,
      intensity: config.intensity,
      preserveNatural: config.preserveNatural,
      autoAdjust: config.autoAdjust,
      targetStyle: config.targetStyle,
      adjustments: this.calculateAdjustments(config),
    };
  }

  protected createTemplate(config: ImageEnhancementConfig): AIPromptTemplate {
    return this.createTemplateWithDefaults({
      id: `image-enhancement-${config.enhancementType}`,
      name: `Image Enhancement: ${config.enhancementType}`,
      description: `Enhance images with ${config.enhancementType} improvements`,
      category: 'image-enhancement',
      template: `${BASE_TEMPLATE}

TYPE: ${config.enhancementType}
STYLE: ${config.targetStyle}
INTENSITY: ${Math.round(config.intensity * 100)}%
PRESERVE NATURAL: ${config.preserveNatural}
AUTO ADJUST: ${config.autoAdjust}`,
    });
  }
}
