/**
 * Text-to-Image Domain Entities
 */

export interface TextToImageConfig {
    /**
     * Width of the generated image
     * @default 1024
     */
    width?: number;

    /**
     * Height of the generated image
     * @default 1024
     */
    height?: number;

    /**
     * Number of inference steps
     * @default 30
     */
    steps?: number;

    /**
     * Guidance scale
     * @default 7.5
     */
    guidanceScale?: number;
}

export interface TextToImageRequest {
    /**
     * The description of the image to generate
     */
    prompt: string;

    /**
     * Negative prompt for what to avoid
     */
    negativePrompt?: string;

    /**
     * Optional configuration
     */
    options?: TextToImageConfig;
}

export interface TextToImageResult {
    /**
     * The generated image URL or Base64
     */
    imageUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
