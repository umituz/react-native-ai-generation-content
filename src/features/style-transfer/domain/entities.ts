/**
 * Style Transfer Domain Entities
 */

export interface StyleTransferConfig {
    /**
     * Strength of the style application (0.0 to 1.0)
     * @default 1.0
     */
    strength?: number;

    /**
     * Preserve original colors
     * @default false
     */
    preserveColor?: boolean;
}

export interface StyleTransferRequest {
    /**
     * The content image to apply style TO.
     * Can be a Base64 string or a remote URL.
     */
    contentImage: string;

    /**
     * The style image references (Base64 or URL)
     */
    styleImage?: string;

    /**
     * Or a preset style ID (e.g. "van_gogh_starry_night")
     */
    stylePreset?: string;

    /**
     * Optional configuration
     */
    options?: StyleTransferConfig;
}

export interface StyleTransferResult {
    /**
     * The stylized image URL or Base64
     */
    imageUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
