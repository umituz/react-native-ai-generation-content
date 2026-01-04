/**
 * ImagePromptBuilder - Fluent builder for composing AI image generation prompts
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

export interface ImagePromptResult {
  prompt: string;
  negativePrompt: string;
}

export interface AnimeSelfiePromptResult {
  prompt: string;
  guidance_scale: number;
}

export interface ImagePromptBuilderOptions {
  separator?: string;
}

export class ImagePromptBuilder {
  private positiveSegments: string[] = [];
  private negativeSegments: string[] = [];
  private readonly separator: string;

  private constructor(options?: ImagePromptBuilderOptions) {
    this.separator = options?.separator ?? ", ";
  }

  /**
   * Create a new ImagePromptBuilder instance
   */
  static create(options?: ImagePromptBuilderOptions): ImagePromptBuilder {
    return new ImagePromptBuilder(options);
  }

  /**
   * Add identity preservation prompts - ensures AI preserves original person's features
   */
  withIdentityPreservation(): this {
    this.positiveSegments.push(...Object.values(IDENTITY_SEGMENTS));
    this.negativeSegments.push(...Object.values(IDENTITY_NEGATIVE_SEGMENTS));
    return this;
  }

  /**
   * Add anime style prompts
   */
  withAnimeStyle(): this {
    this.positiveSegments.push(...Object.values(ANIME_STYLE_SEGMENTS));
    this.negativeSegments.push(...Object.values(ANTI_REALISM_SEGMENTS));
    return this;
  }

  /**
   * Add quality enhancement prompts
   */
  withQuality(): this {
    this.positiveSegments.push(...Object.values(QUALITY_SEGMENTS));
    this.negativeSegments.push(...Object.values(QUALITY_NEGATIVE_SEGMENTS));
    return this;
  }

  /**
   * Add anatomy safety negative prompts
   */
  withAnatomySafety(): this {
    this.negativeSegments.push(...Object.values(ANATOMY_NEGATIVE_SEGMENTS));
    return this;
  }

  /**
   * Add anti-realism prompts (for stylized outputs)
   */
  withAntiRealism(): this {
    this.negativeSegments.push(...Object.values(ANTI_REALISM_SEGMENTS));
    return this;
  }

  /**
   * Add custom positive segments
   */
  withSegments(segments: string[]): this {
    this.positiveSegments.push(...segments);
    return this;
  }

  /**
   * Add custom negative segments
   */
  withNegativeSegments(segments: string[]): this {
    this.negativeSegments.push(...segments);
    return this;
  }

  /**
   * Add a single custom segment
   */
  withSegment(segment: string): this {
    this.positiveSegments.push(segment);
    return this;
  }

  /**
   * Add a single negative segment
   */
  withNegativeSegment(segment: string): this {
    this.negativeSegments.push(segment);
    return this;
  }

  /**
   * Prepend segments (add to beginning)
   */
  prependSegments(segments: string[]): this {
    this.positiveSegments.unshift(...segments);
    return this;
  }

  /**
   * Create a new builder extending this one
   */
  extend(): ImagePromptBuilder {
    const builder = ImagePromptBuilder.create({ separator: this.separator });
    builder.positiveSegments = [...this.positiveSegments];
    builder.negativeSegments = [...this.negativeSegments];
    return builder;
  }

  /**
   * Build the final prompt strings
   */
  build(): ImagePromptResult {
    // Remove duplicates and filter empty values
    const uniquePositive = [...new Set(this.positiveSegments)].filter(Boolean);
    const uniqueNegative = [...new Set(this.negativeSegments)].filter(Boolean);

    return {
      prompt: uniquePositive.join(this.separator),
      negativePrompt: uniqueNegative.join(this.separator),
    };
  }

  /**
   * Get current positive segments (for debugging)
   */
  getPositiveSegments(): string[] {
    return [...this.positiveSegments];
  }

  /**
   * Get current negative segments (for debugging)
   */
  getNegativeSegments(): string[] {
    return [...this.negativeSegments];
  }
}

/**
 * Create anime selfie prompt for Kontext model
 * Kontext uses instruction-based editing that preserves character identity automatically
 */
export function createAnimeSelfiePrompt(customStyle?: string): AnimeSelfiePromptResult {
  const stylePrefix = customStyle ? `${customStyle} anime style` : "anime style";

  const prompt = [
    `Transform this person into a ${stylePrefix} illustration.`,
    "IMPORTANT: Preserve the exact same gender - if male keep male, if female keep female.",
    "Keep the same face structure, hair color, eye color, skin tone, and facial expression.",
    "Make it look like a high-quality Japanese anime character portrait.",
    "Use vibrant anime colors, clean lineart, and cel-shaded rendering.",
    "Large expressive anime eyes with detailed iris, smooth anime skin with subtle blush.",
  ].join(" ");

  return {
    prompt,
    guidance_scale: 4.0,
  };
}

/**
 * Create a style transfer prompt with identity preservation
 */
export function createStyleTransferPrompt(style: string): ImagePromptResult {
  return ImagePromptBuilder.create()
    .withSegment(`${style} style`)  // Style first
    .withIdentityPreservation()
    .withQuality()
    .withAnatomySafety()
    .build();
}
