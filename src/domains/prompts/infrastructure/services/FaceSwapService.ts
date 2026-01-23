/**
 * Face Swap Service
 * AI prompt generation for face transformation tasks
 */

import type {IFaceSwapService} from '../../domain/repositories/IAIPromptServices';
import type {FaceSwapConfig} from '../../domain/entities/FaceSwapConfig';
import type {AIPromptTemplate} from '../../domain/entities/AIPromptTemplate';
import {validateFaceSwapConfig} from '../../domain/entities/FaceSwapConfig';
import { BasePromptService } from './base';

const BASE_TEMPLATE = `
You are an expert AI photo editor.
This is a PHOTO EDITING task, not text-to-image generation.

IDENTITY PRESERVATION (CRITICAL):
The output must clearly depict the SAME PERSON from the uploaded photo.
The person must remain recognizable after transformation.

FACE IDENTITY (DO NOT CHANGE):
- Facial bone structure and proportions
- Eye shape and eye color
- Nose shape and size
- Lip shape and proportions
- Skin tone and natural facial texture

ALLOWED CHANGES:
- Hair style and hair color (wig-like or costume-based)
- Accessories (hats, glasses, headwear)
- Costume makeup that does NOT reshape the face

FORBIDDEN:
- Face replacement with another identity
- Changing gender or ethnicity
- Extreme age transformation
- Nudity, violence, weapons, copyrighted characters

QUALITY:
- Realistic photographic style
- High-quality, natural lighting
- Clean, premium result
`.trim();

export class FaceSwapService
  extends BasePromptService<FaceSwapConfig>
  implements IFaceSwapService
{
  private availableStyles: string[] = [];

  protected getServiceName(): string {
    return 'face swap';
  }

  validateConfig(config: FaceSwapConfig): boolean {
    return validateFaceSwapConfig(config);
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
    styles.forEach((s) => this.registerStyle(s));
  }

  clearStyles(): void {
    this.availableStyles = [];
  }

  protected buildVariables(config: FaceSwapConfig): Record<string, unknown> {
    return {
      styleName: config.styleName,
      environment: config.environment || 'Neutral studio background',
      preserveIdentity: config.preserveIdentity,
      allowHairStyle: config.allowHairStyle,
      allowAccessories: config.allowAccessories,
      allowExpression: config.allowExpression,
    };
  }

  protected createTemplate(config: FaceSwapConfig): AIPromptTemplate {
    const styleId = config.styleName.toLowerCase().replace(/\s+/g, '-');

    return this.createTemplateWithDefaults({
      id: `face-swap-${styleId}`,
      name: `Face Swap: ${config.styleName}`,
      description: `Transform face into ${config.styleName} style`,
      category: 'face-swap',
      template: `${BASE_TEMPLATE}

STYLE: ${config.styleName}
ENVIRONMENT: ${config.environment || 'Neutral studio background'}
PRESERVE IDENTITY: ${config.preserveIdentity}

OUTPUT:
The same person, clearly recognizable,
transformed into ${config.styleName} style.`,
    });
  }
}
