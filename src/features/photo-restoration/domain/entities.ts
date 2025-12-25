/**
 * Photo Restoration Domain Entities
 */

export interface PhotoRestorationConfig {
    /**
     * Whether to fix scratches and creases
     * @default true
     */
    fixScratches?: boolean;

    /**
     * Whether to enhance faces in the photo
     * @default true
     */
    enhanceFaces?: boolean;

    /**
     * Upscale factor for the result
     * @default 2
     */
    upscaleFactor?: 1 | 2 | 4;
}

export interface PhotoRestorationRequest {
    /**
     * The image to restore.
     * Can be a Base64 string or a remote URL.
     */
    image: string;

    /**
     * Optional configuration
     */
    options?: PhotoRestorationConfig;
}

export interface PhotoRestorationResult {
    /**
     * The restored image URL or Base64
     */
    imageUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
