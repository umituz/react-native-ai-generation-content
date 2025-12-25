/**
 * Image Captioning Domain Entities
 */

export interface ImageCaptioningConfig {
    /**
     * Detail level of the caption
     * @default 'standard'
     */
    detailLevel?: 'brief' | 'standard' | 'detailed';

    /**
     * Language for the caption
     * @default 'en'
     */
    language?: string;
}

export interface ImageCaptioningRequest {
    /**
     * The image to be captioned.
     * Can be a Base64 string or a remote URL.
     */
    image: string;

    /**
     * Optional context or question to guide the captioning
     */
    prompt?: string;

    /**
     * Optional configuration
     */
    options?: ImageCaptioningConfig;
}

export interface ImageCaptioningResult {
    /**
     * The generated caption text
     */
    text: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
