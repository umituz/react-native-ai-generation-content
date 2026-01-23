/**
 * Colorization Service
 * AI prompt generation for photo colorization
 */

import type { IColorizationService } from '@ai-generation/prompts';
import type { ColorizationConfig } from '@ai-generation/prompts';
import type { AIPromptTemplate } from '@ai-generation/prompts';
import {
  validateColorizationConfig,
  getColorizationQuality,
  getSuggestedColorPalette,
} from '@ai-generation/prompts';
import { BasePromptService } from './base';

const BASE_TEMPLATE = `
You are an expert AI colorization specialist.
This is a PHOTO COLORIZATION task, not image generation.

COLORIZATION PRINCIPLES:
- Research appropriate color schemes for image era/content
- Apply colors that match scene context and lighting
- Preserve details and textures while adding color
- Ensure color harmony and balance

TECHNICAL:
- Preserve edges and details during color application
- Apply colors smoothly and naturally
- Consider lighting and shadow relationships

SAFETY:
- Do not alter content or composition
- Preserve important details and features
- Avoid inappropriate or unrealistic colors
`.trim();

export class ColorizationService
  extends BasePromptService<ColorizationConfig>
  implements IColorizationService
{
  protected getServiceName(): string {
    return 'colorization';
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

  protected buildVariables(config: ColorizationConfig): Record<string, unknown> {
    return {
      targetType: config.targetType,
      colorMode: config.colorMode,
      preserveOriginal: config.preserveOriginal,
      adjustLighting: config.adjustLighting,
      skinTonePreservation: config.skinTonePreservation,
      era: config.era || '',
      qualityScore: getColorizationQuality(config),
      colorPalette: this.getColorPalette(config),
    };
  }

  protected createTemplate(config: ColorizationConfig): AIPromptTemplate {
    const quality = Math.round(getColorizationQuality(config) * 100);

    return this.createTemplateWithDefaults({
      id: `colorization-${config.targetType}-${config.colorMode}`,
      name: `Colorization: ${config.targetType} to ${config.colorMode}`,
      description: `Colorize ${config.targetType} images with ${config.colorMode} treatment`,
      category: 'colorization',
      template: `${BASE_TEMPLATE}

TARGET: ${config.targetType}
MODE: ${config.colorMode}
PRESERVE ORIGINAL: ${config.preserveOriginal}
ADJUST LIGHTING: ${config.adjustLighting}
SKIN TONE PRESERVATION: ${config.skinTonePreservation}
${config.era ? `ERA: ${config.era}` : ''}

QUALITY: ${quality}%`,
    });
  }
}
