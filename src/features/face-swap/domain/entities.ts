/**
 * Face Swap Domain Entities
 */

export interface FaceSwapConfig {
    /**
     * Enhance the face details after swapping
     * @default true
     */
    enhanceFace?: boolean;

    /**
     * Preserve the skin tone of the target image
     * @default true
     */
    preserveSkinTone?: boolean;
}

export interface FaceSwapRequest {
    /**
     * The target image where the face will be swapped TO.
     * Can be a Base64 string or a remote URL.
     */
    targetImage: string;

    /**
     * The source image containing the face to swap FROM.
     * Can be a Base64 string or a remote URL.
     */
    sourceImage: string;

    /**
     * Optional configuration for the swap process
     */
    options?: FaceSwapConfig;
}

export interface FaceSwapResult {
    /**
     * URL or Base64 of the resulting image
     */
    imageUrl: string;

    /**
     * Metadata about the generation
     */
    metadata?: Record<string, unknown>;
}
