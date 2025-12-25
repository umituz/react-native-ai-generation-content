/**
 * Future Prediction Domain Entities
 */

export interface FuturePredictionConfig {
    /**
     * Target age or years to add
     */
    targetAge?: number;

    /**
     * Years to add to current age
     */
    yearsToAdd?: number;

    /**
     * Gender (optional, if automatic detection fails)
     */
    gender?: 'male' | 'female';
}

export interface FuturePredictionRequest {
    /**
     * The image to process.
     * Can be a Base64 string or a remote URL.
     */
    image: string;

    /**
     * Optional configuration
     */
    options?: FuturePredictionConfig;
}

export interface FuturePredictionResult {
    /**
     * The processed image URL or Base64
     */
    imageUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
