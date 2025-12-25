/**
 * Sketch to Image Domain Entities
 */

export interface SketchToImageConfig {
    /**
     * Strength of the prompt influence vs sketch influence (0.0 to 1.0)
     * @default 0.7
     */
    strength?: number;

    /**
     * Steps for generation
     * @default 20
     */
    steps?: number;
}

export interface SketchToImageRequest {
    /**
     * The sketch image.
     * Can be a Base64 string or a remote URL.
     */
    sketchImage: string;

    /**
     * Description of the desired output
     */
    prompt: string;

    /**
     * Optional configuration
     */
    options?: SketchToImageConfig;
}

export interface SketchToImageResult {
    /**
     * The generated realistic image URL
     */
    imageUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
