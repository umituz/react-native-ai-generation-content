/**
 * Style Transfer Service
 * AI prompt generation for artistic style transfer
 */

import type { IStyleTransferService } from '../../domain/repositories/IAIPromptServices';
import type { StyleTransferConfig } from '../../domain/entities/StyleTransferConfig';
import type { AIPromptTemplate } from '../../domain/entities/AIPromptTemplate';
import { validateStyleTransferConfig, getStyleStrengthValue } from '../../domain/entities/StyleTransferConfig';
import { BasePromptService } from './base';

const BASE_TEMPLATE = `
You are an expert AI style transfer specialist.
This is a STYLE TRANSFER task, applying artistic styles while maintaining content.

PRINCIPLES:
- Apply target artistic style to the image
- Maintain key features and subject recognition
- Balance artistic expression with clarity

TECHNICAL:
- Smooth style transitions across the image
- Appropriate detail preservation based on style
- Professional quality output

SAFETY:
- Do not add inappropriate elements
- Preserve important visual information
`.trim();

const DEFAULT_STYLES = [
  'Impressionism', 'Cubism', 'Surrealism', 'Pop Art', 'Watercolor',
  'Oil Painting', 'Pencil Sketch', 'Anime/Manga', 'Vintage Film', 'Cyberpunk',
];

export class StyleTransferService
  extends BasePromptService<StyleTransferConfig>
  implements IStyleTransferService
{
  private availableStyles: string[] = [...DEFAULT_STYLES];

  protected getServiceName(): string {
    return 'style transfer';
  }

  validateConfig(config: StyleTransferConfig): boolean {
    return validateStyleTransferConfig(config);
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

  protected buildVariables(config: StyleTransferConfig): Record<string, unknown> {
    return {
      targetStyle: config.targetStyle,
      preserveContent: config.preserveContent,
      styleStrength: config.styleStrength,
      artisticMode: config.artisticMode,
      maintainColors: config.maintainColors,
      adaptToSubject: config.adaptToSubject,
      strengthLevel: getStyleStrengthValue(config.styleStrength),
    };
  }

  protected createTemplate(config: StyleTransferConfig): AIPromptTemplate {
    const styleId = config.targetStyle.toLowerCase().replace(/\s+/g, '-');
    const strength = getStyleStrengthValue(config.styleStrength);

    return this.createTemplateWithDefaults({
      id: `style-transfer-${styleId}`,
      name: `Style Transfer: ${config.targetStyle}`,
      description: `Apply ${config.targetStyle} style with ${config.artisticMode} mode`,
      category: 'style-transfer',
      template: `${BASE_TEMPLATE}

STYLE: ${config.targetStyle}
MODE: ${config.artisticMode}
STRENGTH: ${strength} (${Math.round(config.styleStrength * 100)}%)
PRESERVE CONTENT: ${config.preserveContent}
MAINTAIN COLORS: ${config.maintainColors}`,
    });
  }
}
