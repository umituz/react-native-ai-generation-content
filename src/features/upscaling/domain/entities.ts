/**
 * Upscaling Domain Entities
 */

export interface UpscaleConfig {
    /**
     * The factor to upscale the image by
     * @default 2
     */
    scaleFactor?: 2 | 4;

    /**
     * Whether to enhance faces during upscaling
     * @default false
     */
    enhanceFaces?: boolean;
}

export interface UpscaleRequest {
    /**
     * The image to upscale.
     * Can be a Base64 string or a remote URL.
     */
    image: string;

    /**
     * Optional configuration
     */
    options?: UpscaleConfig;
}

export interface UpscaleResult {
    /**
     * The upscaled image URL or Base64
     */
    imageUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
