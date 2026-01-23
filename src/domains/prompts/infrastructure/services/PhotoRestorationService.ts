/**
 * Photo Restoration Service
 * AI prompt generation for photo restoration tasks
 */

import type {IPhotoRestorationService} from '../../domain/repositories/IAIPromptServices';
import type {PhotoRestorationConfig} from '../../domain/entities/PhotoRestorationConfig';
import type {AIPromptTemplate} from '../../domain/entities/AIPromptTemplate';
import {validatePhotoRestorationConfig, getQualityLevel} from '../../domain/entities/PhotoRestorationConfig';
import { BasePromptService } from './base';

const BASE_TEMPLATE = `
You are an expert AI photo restoration specialist.
This is a PHOTO RESTORATION task, not image generation.

RESTORATION TECHNIQUES:
- Noise reduction and grain removal
- Scratch and damage repair
- Color correction and enhancement
- Detail sharpening and clarity improvement

SAFETY CONSTRAINTS:
- Do not add content that wasn't originally present
- Maintain the original subject and composition
- Preserve important details and textures
`.trim();

export class PhotoRestorationService
  extends BasePromptService<PhotoRestorationConfig>
  implements IPhotoRestorationService
{
  protected getServiceName(): string {
    return 'photo restoration';
  }

  validateConfig(config: PhotoRestorationConfig): boolean {
    return validatePhotoRestorationConfig(config);
  }

  estimateQuality(config: PhotoRestorationConfig): number {
    let quality = 0.8;
    if (config.restoreDetails) quality += 0.1;
    if (config.enhanceColors) quality += 0.05;
    if (config.removeNoise) quality += 0.05;
    return Math.min(quality * getQualityLevel(config.severity), 1.0);
  }

  protected buildVariables(config: PhotoRestorationConfig): Record<string, unknown> {
    return {
      severity: config.severity,
      preserveOriginal: config.preserveOriginal,
      enhanceColors: config.enhanceColors,
      removeNoise: config.removeNoise,
      fixBlur: config.fixBlur,
      restoreDetails: config.restoreDetails,
      qualityLevel: getQualityLevel(config.severity),
    };
  }

  protected createTemplate(config: PhotoRestorationConfig): AIPromptTemplate {
    const qualityDesc =
      config.severity === 'minor' ? 'subtle' :
      config.severity === 'moderate' ? 'standard' : 'deep';

    return this.createTemplateWithDefaults({
      id: `photo-restoration-${config.severity}`,
      name: `Photo Restoration: ${config.severity}`,
      description: `Restore photos with ${qualityDesc} restoration`,
      category: 'photo-restoration',
      template: `${BASE_TEMPLATE}

SEVERITY: ${config.severity}
REQUIREMENTS:
- ${config.removeNoise ? 'Remove noise' : 'Maintain texture'}
- ${config.fixBlur ? 'Fix blur' : 'Preserve sharpness'}
- ${config.enhanceColors ? 'Enhance colors' : 'Maintain colors'}
- ${config.restoreDetails ? 'Recover details' : 'Preserve detail level'}

QUALITY TARGET: ${Math.round(getQualityLevel(config.severity) * 100)}%`,
    });
  }
}
