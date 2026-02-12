/**
 * ImagePromptBuilder - Fluent builder for AI image generation prompts
 */

import {
  IDENTITY_SEGMENTS,
  IDENTITY_NEGATIVE_SEGMENTS,
  ANIME_STYLE_SEGMENTS,
  QUALITY_SEGMENTS,
  QUALITY_NEGATIVE_SEGMENTS,
  ANTI_REALISM_SEGMENTS,
  ANATOMY_NEGATIVE_SEGMENTS,
} from "../../domain/entities/image-prompt-segments";
import type { ImagePromptResult, ImagePromptBuilderOptions } from "./image-prompt-builder.types";

export class ImagePromptBuilder {
  private positiveSegments: string[] = [];
  private negativeSegments: string[] = [];
  private readonly separator: string;

  private constructor(options?: ImagePromptBuilderOptions) {
    this.separator = options?.separator ?? ", ";
  }

  static create(options?: ImagePromptBuilderOptions): ImagePromptBuilder {
    return new ImagePromptBuilder(options);
  }

  withIdentityPreservation(): this {
    this.positiveSegments.push(...Object.values(IDENTITY_SEGMENTS));
    this.negativeSegments.push(...Object.values(IDENTITY_NEGATIVE_SEGMENTS));
    return this;
  }

  withAnimeStyle(): this {
    this.positiveSegments.push(...Object.values(ANIME_STYLE_SEGMENTS));
    this.negativeSegments.push(...Object.values(ANTI_REALISM_SEGMENTS));
    return this;
  }

  withQuality(): this {
    this.positiveSegments.push(...Object.values(QUALITY_SEGMENTS));
    this.negativeSegments.push(...Object.values(QUALITY_NEGATIVE_SEGMENTS));
    return this;
  }

  withAnatomySafety(): this {
    this.negativeSegments.push(...Object.values(ANATOMY_NEGATIVE_SEGMENTS));
    return this;
  }

  withAntiRealism(): this {
    this.negativeSegments.push(...Object.values(ANTI_REALISM_SEGMENTS));
    return this;
  }

  withSegments(segments: string[]): this {
    this.positiveSegments.push(...segments);
    return this;
  }

  withNegativeSegments(segments: string[]): this {
    this.negativeSegments.push(...segments);
    return this;
  }

  withSegment(segment: string): this {
    this.positiveSegments.push(segment);
    return this;
  }

  withNegativeSegment(segment: string): this {
    this.negativeSegments.push(segment);
    return this;
  }

  prependSegments(segments: string[]): this {
    this.positiveSegments.unshift(...segments);
    return this;
  }

  extend(): ImagePromptBuilder {
    const builder = ImagePromptBuilder.create({ separator: this.separator });
    builder.positiveSegments = [...this.positiveSegments];
    builder.negativeSegments = [...this.negativeSegments];
    return builder;
  }

  build(): ImagePromptResult {
    const uniquePositive = [...new Set(this.positiveSegments)].filter(Boolean);
    const uniqueNegative = [...new Set(this.negativeSegments)].filter(Boolean);

    return {
      prompt: uniquePositive.join(this.separator),
      negativePrompt: uniqueNegative.join(this.separator),
    };
  }
}
