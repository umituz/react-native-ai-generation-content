import type { IPhotoRestorationService } from '../../domain/repositories/IAIPromptServices';
import type {
  PhotoRestorationConfig,
} from '../../domain/entities/PhotoRestorationConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptResult } from '../../domain/entities/types';
import { createAIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import { validatePhotoRestorationConfig, getQualityLevel } from '../../domain/entities/PhotoRestorationConfig';
import { PromptGenerationService } from '../services/PromptGenerationService';

const createPhotoRestorationBaseTemplate = (config?: {
  targetQuality?: string;
  preserveOriginal?: boolean;
}): string => {
  const {
    targetQuality = 'high-quality',
    preserveOriginal = true
  } = config || {};

  return `
You are an expert AI photo restoration specialist.
This is a PHOTO RESTORATION task, not image generation.

RESTORATION OBJECTIVES:
- Restore the original photo to ${targetQuality} condition
- ${preserveOriginal ? 'Preserve the original content and composition' : 'Enhance with creative improvements'}
- Remove imperfections while maintaining authenticity
- Recover lost details and enhance overall quality

RESTORATION TECHNIQUES:
- Noise reduction and grain removal
- Scratch and damage repair
- Color correction and enhancement
- Detail sharpening and clarity improvement
- Exposure and contrast adjustment

SAFETY CONSTRAINTS:
- Do not add content that wasn't originally present
- Maintain the original subject and composition
- Avoid over-processing that creates unnatural results
- Preserve important details and textures

QUALITY STANDARDS:
- Natural, authentic appearance
- Balanced color reproduction
- Appropriate level of detail enhancement
- Clean, professional-grade result

OUTPUT:
A beautifully restored version of the original photo,
maintaining its character while significantly improving quality.
  `.trim();
};

export class PhotoRestorationService implements IPhotoRestorationService {
  private promptService: PromptGenerationService;

  constructor() {
    this.promptService = new PromptGenerationService();
  }

  async generateTemplate(config: PhotoRestorationConfig): Promise<AIPromptResult<AIPromptTemplate>> {
    try {
      if (!this.validateConfig(config)) {
        return {
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Invalid photo restoration configuration'
        };
      }

      const template = this.createPhotoRestorationTemplate(config);
      return { success: true, data: template };
    } catch (error) {
      return {
        success: false,
        error: 'GENERATION_FAILED',
        message: 'Failed to generate photo restoration template'
      };
    }
  }

  async generatePrompt(
    template: AIPromptTemplate,
    config: PhotoRestorationConfig
  ): Promise<AIPromptResult<string>> {
    const variables = {
      severity: config.severity,
      preserveOriginal: config.preserveOriginal,
      enhanceColors: config.enhanceColors,
      removeNoise: config.removeNoise,
      fixBlur: config.fixBlur,
      restoreDetails: config.restoreDetails,
      qualityLevel: getQualityLevel(config.severity),
    };

    return this.promptService.generateFromTemplate(template, variables);
  }

  validateConfig(config: PhotoRestorationConfig): boolean {
    return validatePhotoRestorationConfig(config);
  }

  estimateQuality(config: PhotoRestorationConfig): number {
    let quality = 0.8;

    if (config.restoreDetails) quality += 0.1;
    if (config.enhanceColors) quality += 0.05;
    if (config.removeNoise) quality += 0.05;

    const severityMultiplier = getQualityLevel(config.severity);
    return Math.min(quality * severityMultiplier, 1.0);
  }

  private createPhotoRestorationTemplate(config: PhotoRestorationConfig): AIPromptTemplate {
    const templateId = `photo-restoration-${config.severity}`;
    const qualityDesc = config.severity === 'minor' ? 'subtle restoration' :
      config.severity === 'moderate' ? 'standard restoration' :
        'deep restoration';

    const baseTemplate = createPhotoRestorationBaseTemplate({
      targetQuality: qualityDesc,
      preserveOriginal: config.preserveOriginal,
    });

    return createAIPromptTemplate({
      id: templateId,
      name: `Photo Restoration: ${config.severity}`,
      description: `Restore photos with ${qualityDesc}`,
      category: 'photo-restoration',
      template: `${baseTemplate}

RESTORATION SEVERITY:
${config.severity}

SPECIFIC REQUIREMENTS:
- ${config.removeNoise ? 'Remove noise and grain' : 'Maintain texture character'}
- ${config.fixBlur ? 'Fix blur and sharpen details' : 'Preserve original sharpness'}
- ${config.enhanceColors ? 'Enhance color vibrancy' : 'Maintain original colors'}
- ${config.restoreDetails ? 'Recover lost details' : 'Preserve current detail level'}

QUALITY TARGET:
${getQualityLevel(config.severity) * 100}% quality improvement expected.

OUTPUT:
A professionally restored photo with ${qualityDesc},
ready for display or further processing.
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