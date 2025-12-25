/**
 * Audio Generation Domain Entities
 */

export interface AudioGenerationConfig {
    /**
     * Duration of the audio in seconds
     */
    duration?: number;

    /**
     * Voice ID or style
     */
    voiceId?: string;
}

export interface AudioGenerationRequest {
    /**
     * The text prompt or description for audio generation
     */
    prompt: string;

    /**
     * Optional configuration
     */
    options?: AudioGenerationConfig;
}

export interface AudioGenerationResult {
    /**
     * The generated audio file URL
     */
    audioUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
