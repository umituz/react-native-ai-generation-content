import type { IFaceSwapService } from '../../domain/repositories/IAIPromptServices';
import type {
  AIPromptTemplate
} from '../../domain/entities/AIPromptTemplate';
import type {
  FaceSwapConfig,
  FaceSwapSafety
} from '../../domain/entities/FaceSwapConfig';
import type { AIPromptCategory } from '../../domain/entities/types';
import { createAIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import { validateFaceSwapConfig } from '../../domain/entities/FaceSwapConfig';
import type { AIPromptResult } from '../../domain/entities/types';
import { PromptGenerationService } from '../services/PromptGenerationService';

const DEFAULT_FACE_SWAP_SAFETY: FaceSwapSafety = {
  contentFilter: true,
  identityPreservation: true,
  adultContentFilter: true,
};

const createFaceSwapBaseTemplate = (config?: {
  targetPerson?: string;
  transformationType?: string;
  quality?: string;
}): string => {
  const {
    targetPerson = 'SAME PERSON',
    transformationType = 'transformation',
    quality = 'App Store–ready'
  } = config || {};

  return `
You are an expert AI photo editor.
This is a PHOTO EDITING task, not text-to-image generation.

IDENTITY PRESERVATION (CRITICAL):
The output must clearly depict the ${targetPerson} from the uploaded photo.
The person must remain recognizable after transformation.

FACE IDENTITY (DO NOT CHANGE):
- Facial bone structure and proportions
- Eye shape and eye color
- Nose shape and size
- Lip shape and proportions
- Skin tone and natural facial texture

ALLOWED NON-DESTRUCTIVE CHANGES:
- Hair style and hair color (wig-like or costume-based)
- Facial hair (beard, mustache) as costume elements
- Accessories (hats, glasses, headwear)
- Subtle expression adjustments that do NOT alter facial structure
- Costume makeup that does NOT reshape the face

STRICTLY FORBIDDEN:
- Face replacement or face swapping with another identity
- Changing the person into a different real individual
- Changing gender or ethnicity
- Extreme age transformation
- Distorted faces or unrealistic anatomy

SAFETY CONSTRAINTS:
Do NOT add nudity, sexual content, violence, weapons, drugs, political or religious symbols,
copyrighted characters, celebrities, text overlays, logos, or watermarks.

STYLE & QUALITY:
- Realistic photographic style
- High-quality, natural lighting
- Clean, premium, ${quality} result

FINAL RULE:
This is a fictional, cosmetic ${transformationType} for entertainment only.
  `.trim();
};

export class FaceSwapService implements IFaceSwapService {
  private promptService: PromptGenerationService;
  private availableStyles: string[] = [];

  constructor() {
    this.promptService = new PromptGenerationService();
    this.initializeDefaultStyles();
  }

  generateTemplate(config: FaceSwapConfig): Promise<AIPromptResult<AIPromptTemplate>> {
    try {
      if (!this.validateConfig(config)) {
        return Promise.resolve({
          success: false,
          error: 'INVALID_VARIABLES',
          message: 'Invalid face swap configuration'
        });
      }

      const template = this.createFaceSwapTemplate(config);
      return Promise.resolve({ success: true, data: template });
    } catch {
      return Promise.resolve({
        success: false,
        error: 'GENERATION_FAILED',
        message: 'Failed to generate face swap template'
      });
    }
  }

  async generatePrompt(
    template: AIPromptTemplate,
    config: FaceSwapConfig
  ): Promise<AIPromptResult<string>> {
    const variables = {
      styleName: config.styleName,
      environment: config.environment || 'Neutral studio background',
      preserveIdentity: config.preserveIdentity,
      allowHairStyle: config.allowHairStyle,
      allowAccessories: config.allowAccessories,
      allowExpression: config.allowExpression,
    };

    return this.promptService.generateFromTemplate(template, variables);
  }

  validateConfig(config: FaceSwapConfig): boolean {
    return validateFaceSwapConfig(config);
  }

  getAvailableStyles(): Promise<string[]> {
    return Promise.resolve([...this.availableStyles]);
  }

  private initializeDefaultStyles(): void {
    this.availableStyles = [];
  }

  public registerStyle(style: string): void {
    if (!this.availableStyles.includes(style)) {
      this.availableStyles.push(style);
    }
  }

  public registerStyles(styles: string[]): void {
    styles.forEach(style => this.registerStyle(style));
  }

  public clearStyles(): void {
    this.availableStyles = [];
  }

  private createFaceSwapTemplate(config: FaceSwapConfig): AIPromptTemplate {
    const templateId = `face-swap-${config.styleName.toLowerCase().replace(/\s+/g, '-')}`;

    return createAIPromptTemplate({
      id: templateId,
      name: `Face Swap: ${config.styleName}`,
      description: `Transform face into ${config.styleName} style`,
      category: 'face-swap' as AIPromptCategory,
      template: this.buildFaceSwapTemplate(config),
      variables: [],
      safety: {
        contentFilter: DEFAULT_FACE_SWAP_SAFETY.contentFilter,
        adultContentFilter: DEFAULT_FACE_SWAP_SAFETY.adultContentFilter,
        violenceFilter: true,
        hateSpeechFilter: true,
        copyrightFilter: true,
      },
      version: '1.0.0',
    });
  }

  private buildFaceSwapTemplate(config: FaceSwapConfig): string {
    const baseTemplate = createFaceSwapBaseTemplate({
      targetPerson: 'SAME PERSON',
      transformationType: 'transformation',
      quality: 'App Store–ready',
    });

    return `${baseTemplate}

STYLE NAME:
${config.styleName}

TRANSFORMATION GOAL:
Transform the same person into this ${config.styleName} style
${config.preserveIdentity ? 'while preserving their facial identity.' : ''}

ENVIRONMENT:
${config.environment || 'Neutral studio background'}

EXPRESSION:
- Natural expression
- Subtle and natural, without changing facial structure

OUTPUT:
The same person from the uploaded photo,
clearly recognizable,
realistically transformed into a ${config.styleName} style.
    `.trim();
  }
}