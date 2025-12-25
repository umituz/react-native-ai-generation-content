/**
 * Text to Video Domain Entities
 */

export interface TextToVideoConfig {
    /**
     * Duration of the video in seconds
     * @default 4
     */
    duration?: number;

    /**
     * FPS of the generated video
     * @default 24
     */
    fps?: number;

    /**
     * Guidance scale
     * @default 7.5
     */
    guidanceScale?: number;
}

export interface TextToVideoRequest {
    /**
     * The text prompt to generate video from
     */
    prompt: string;

    /**
     * Negative prompt
     */
    negativePrompt?: string;

    /**
     * Optional configuration
     */
    options?: TextToVideoConfig;
}

export interface TextToVideoResult {
    /**
     * The generated video URL
     */
    videoUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
