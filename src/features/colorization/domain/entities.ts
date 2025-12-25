/**
 * Colorization Domain Entities
 */

export interface ColorizationConfig {
    /**
     * Guidance for color palette (e.g., "vintage", "modern", "warm")
     */
    palette?: string;

    /**
     * Saturation boost factor
     * @default 1.0
     */
    saturation?: number;
}

export interface ColorizationRequest {
    /**
     * The black and white image to colorize.
     * Can be a Base64 string or a remote URL.
     */
    image: string;

    /**
     * Optional prompt to guide colorization (e.g. "sunny day")
     */
    prompt?: string;

    /**
     * Optional configuration
     */
    options?: ColorizationConfig;
}

export interface ColorizationResult {
    /**
     * The colorized image URL or Base64
     */
    imageUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
