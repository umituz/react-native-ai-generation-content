/**
 * Inpainting Domain Entities
 */

export interface InpaintingConfig {
    /**
     * Strength of the inpainting effect (0.0 to 1.0)
     * @default 0.75
     */
    strength?: number;

    /**
     * Guidance scale for prompt adherence
     * @default 7.5
     */
    guidanceScale?: number;
}

export interface InpaintingRequest {
    /**
     * The original image.
     * Can be a Base64 string or a remote URL.
     */
    image: string;

    /**
     * The mask image indicating areas to inpaint (white) vs keep (black).
     * Can be a Base64 string or a remote URL.
     */
    mask: string;

    /**
     * Description of what to fill in the masked area
     */
    prompt: string;

    /**
     * Negative prompt for what to avoid
     */
    negativePrompt?: string;

    /**
     * Optional configuration
     */
    options?: InpaintingConfig;
}

export interface InpaintingResult {
    /**
     * The resulting image with inpainting applied
     */
    imageUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
