/**
 * Background Removal Service
 * AI prompt generation for background removal tasks
 */

import type { IBackgroundRemovalService } from '../../domain/repositories/IAIPromptServices';
import type { BackgroundRemovalConfig } from '../../domain/entities/BackgroundRemovalConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import { validateBackgroundRemovalConfig, getProcessingTime, getQualityScore } from '../../domain/entities/BackgroundRemovalConfig';
import { BasePromptService } from './base';

const BASE_TEMPLATE = `
You are an expert AI background removal specialist.
This is a BACKGROUND REMOVAL task, not image generation.

DETECTION PRINCIPLES:
- Accurately identify foreground subject
- Distinguish between subject and background
- Handle complex edges (hair, fur, transparent objects)
- Preserve fine details and textures

SAFETY CONSTRAINTS:
- Preserve subject completely
- Do not alter foreground content
- Maintain important details
- Avoid over-removal of subject elements
`.trim();

export class BackgroundRemovalService
  extends BasePromptService<BackgroundRemovalConfig>
  implements IBackgroundRemovalService
{
  protected getServiceName(): string {
    return 'background removal';
  }

  validateConfig(config: BackgroundRemovalConfig): boolean {
    return validateBackgroundRemovalConfig(config);
  }

  estimateProcessingTime(config: BackgroundRemovalConfig): number {
    return getProcessingTime(config.precision);
  }

  protected buildVariables(config: BackgroundRemovalConfig): Record<string, unknown> {
    return {
      precision: config.precision,
      edgeRefinement: config.edgeRefinement,
      preserveHair: config.preserveHair,
      outputFormat: config.outputFormat,
      addNewBackground: config.addNewBackground,
      processingTime: getProcessingTime(config.precision),
      qualityScore: getQualityScore(config),
    };
  }

  protected createTemplate(config: BackgroundRemovalConfig): AIPromptTemplate {
    return this.createTemplateWithDefaults({
      id: `background-removal-${config.precision}`,
      name: `Background Removal: ${config.precision}`,
      description: `Remove background with ${config.precision} precision`,
      category: 'background-removal',
      template: `${BASE_TEMPLATE}

PRECISION: ${config.precision}
EDGE REFINEMENT: ${config.edgeRefinement}
PRESERVE HAIR: ${config.preserveHair}
OUTPUT: ${config.outputFormat}
${config.addNewBackground ? `NEW BACKGROUND: ${config.addNewBackground}` : ''}

QUALITY: ${Math.round(getQualityScore(config) * 100)}%
EST. TIME: ${getProcessingTime(config.precision)}s`,
    });
  }
}
