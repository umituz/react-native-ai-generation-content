import type { IBackgroundRemovalService } from '../../domain/repositories/IAIPromptServices';
import type {
  BackgroundRemovalConfig,
} from '../../domain/entities/BackgroundRemovalConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import type { AIPromptResult } from '../../domain/entities/types';
import { createAIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import {
  validateBackgroundRemovalConfig,
  getProcessingTime,
  getQualityScore
} from '../../domain/entities/BackgroundRemovalConfig';
import { PromptGenerationService } from '../services/PromptGenerationService';

const createBackgroundRemovalBaseTemplate = (config?: {
  precision?: string;
  edgeRefinement?: boolean;
}): string => {
  const {
    precision = 'accurate',
    edgeRefinement = true
  } = config || {};

  return `
You are an expert AI background removal specialist.
This is a BACKGROUND REMOVAL task, not image generation.

BACKGROUND REMOVAL OBJECTIVES:
- Remove background with ${precision} precision
- ${edgeRefinement ? 'Refine edges for clean cutout' : 'Focus on speed over precision'}
- Preserve subject integrity and details
- Create professional-quality transparency

DETECTION PRINCIPLES:
- Accurately identify foreground subject
- Distinguish between subject and background
- Handle complex edges (hair, fur, transparent objects)
- Preserve fine details and textures

TECHNICAL REQUIREMENTS:
${precision === 'ultra-accurate' ?
      `- Maximum precision processing
- Advanced edge detection algorithms
- Multiple refinement passes
- Subpixel accuracy for edges` :
      precision === 'accurate' ?
        `- Standard precision processing
- Reliable edge detection
- Single refinement pass
- Good balance of speed/quality` :
        `- Fast processing optimization
- Basic edge detection
- Quick subject isolation
- Suitable for simple backgrounds`}

EDGE HANDLING:
${edgeRefinement ?
      `- Feather edges naturally
- Preserve hair and fine details
- Remove halos and artifacts
- Smooth transitions` :
      `- Focus on speed
- Basic edge processing
- Minimal refinement
- Quick turnaround time`}

SAFETY CONSTRAINTS:
- Preserve subject completely
- Do not alter foreground content
- Maintain important details
- Avoid over-removal of subject elements

OUTPUT:
Subject with transparent background,
ready for compositing or new background application.
  `.trim();
};

export class BackgroundRemovalService implements IBackgroundRemovalService {
  private promptService: PromptGenerationService;

  constructor() {
    this.promptService = new PromptGenerationService();
  }

  generateTemplate(config: BackgroundRemovalConfig): Promise<AIPromptResult<AIPromptTemplate>> {
    try {
      if (!this.validateConfig(config)) {
        return Promise.resolve({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Invalid background removal configuration'
        });
      }

      const template = this.createBackgroundRemovalTemplate(config);
      return Promise.resolve({ success: true, data: template });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'GENERATION_FAILED',
        message: 'Failed to generate background removal template'
      });
    }
  }

  async generatePrompt(
    template: AIPromptTemplate,
    config: BackgroundRemovalConfig
  ): Promise<AIPromptResult<string>> {
    const variables = {
      precision: config.precision,
      edgeRefinement: config.edgeRefinement,
      preserveHair: config.preserveHair,
      outputFormat: config.outputFormat,
      addNewBackground: config.addNewBackground,
      processingTime: getProcessingTime(config.precision),
      qualityScore: getQualityScore(config),
    };

    return this.promptService.generateFromTemplate(template, variables);
  }

  validateConfig(config: BackgroundRemovalConfig): boolean {
    return validateBackgroundRemovalConfig(config);
  }

  estimateProcessingTime(config: BackgroundRemovalConfig): number {
    return getProcessingTime(config.precision);
  }

  private createBackgroundRemovalTemplate(config: BackgroundRemovalConfig): AIPromptTemplate {
    const templateId = `background-removal-${config.precision}`;

    const baseTemplate = createBackgroundRemovalBaseTemplate({
      precision: config.precision,
      edgeRefinement: config.edgeRefinement,
    });

    return createAIPromptTemplate({
      id: templateId,
      name: `Background Removal: ${config.precision}`,
      description: `Remove background with ${config.precision} precision`,
      category: 'background-removal',
      template: `${baseTemplate}

REMOVAL CONFIGURATION:
- Precision Level: ${config.precision}
- Edge Refinement: ${config.edgeRefinement}
- Preserve Hair: ${config.preserveHair}
- Output Format: ${config.outputFormat}
${config.addNewBackground ? `- New Background: ${config.addNewBackground}` : ''}

SPECIFIC REQUIREMENTS:
${this.getSpecificRequirements(config)}

PROCESSING EXPECTATIONS:
- Estimated Time: ${getProcessingTime(config.precision)} seconds
- Quality Score: ${Math.round(getQualityScore(config) * 100)}%
- Edge Detail: ${config.edgeRefinement ? 'High precision' : 'Standard precision'}
- Hair Handling: ${config.preserveHair ? 'Preserved with detail' : 'Standard processing'}

OUTPUT FORMAT:
${config.outputFormat === 'transparent' ? 'Transparent PNG with alpha channel' :
          config.outputFormat === 'png' ? 'PNG format with transparency' :
            'WebP format with transparency support'}

${config.addNewBackground ? `NEW BACKGROUND:
Replace removed background with: ${config.addNewBackground}
Ensure proper blending and integration with subject.` : ''}

EXPECTED RESULT:
Clean subject with background removed,
${config.edgeRefinement ? 'with refined edges and preserved details' : 'with standard edge quality'},
ready for ${config.outputFormat} output.
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

  private getSpecificRequirements(config: BackgroundRemovalConfig): string {
    const requirements: string[] = [];

    if (config.preserveHair) {
      requirements.push('- Advanced hair detection and preservation');
      requirements.push('- Fine strand handling and transparency');
    }

    if (config.edgeRefinement) {
      requirements.push('- Subpixel edge accuracy');
      requirements.push('- Natural feathering and anti-aliasing');
    }

    if (config.precision === 'ultra-accurate') {
      requirements.push('- Multi-pass refinement processing');
      requirements.push('- Advanced artifact removal');
    }

    return requirements.join('\n') || '- Standard background removal processing';
  }
}