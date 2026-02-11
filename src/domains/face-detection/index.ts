/**
 * React Native AI Face Detection & Preservation - Public API
 *
 * AI-powered face detection and preservation for image generation
 */

// Domain - Entities
export type {
  FaceDetectionResult,
  FaceValidationState,
  FaceDetectionConfig,
} from "./domain/entities/FaceDetection";

// Domain - Face Preservation Types
export type {
  FacePreservationMode,
  FaceMetadata,
  FacePreservationConfig,
  FacePreservationPrompt,
} from "./domain/types/face-preservation.types";

export {
  DEFAULT_PRESERVATION_CONFIG,
  PRESERVATION_MODE_WEIGHTS,
} from "./domain/types/face-preservation.types";

// Domain - Constants
export { FACE_DETECTION_CONFIG, FACE_DETECTION_PROMPTS } from "./domain/constants/faceDetectionConstants";

// Infrastructure - Validators
export {
  isValidFace,
  parseDetectionResponse,
  createFailedResult,
  createSuccessResult,
} from "./infrastructure/validators/faceValidator";

// Infrastructure - Analyzers
export { analyzeImageForFace } from "./infrastructure/analyzers/faceAnalyzer";
export type { AIAnalyzerFunction } from "./infrastructure/analyzers/faceAnalyzer";

// Infrastructure - Face Preservation Builders
export {
  buildFacePreservationPrompt,
  combineFacePreservationPrompt,
  getFacePreservationWeight,
} from "./infrastructure/builders/facePreservationPromptBuilder";
export type { BuildPreservationPromptOptions } from "./infrastructure/builders/facePreservationPromptBuilder";

// Infrastructure - Image Generation Integration
export {
  prepareImageGenerationWithFacePreservation,
  shouldEnableFacePreservation,
} from "./infrastructure/integration/imageGenerationIntegration";
export type {
  ImageGenerationWithFacePreservation,
  PrepareImageGenerationOptions,
} from "./infrastructure/integration/imageGenerationIntegration";

// Presentation - Hooks
export { useFaceDetection } from "./presentation/hooks/useFaceDetection";

// Presentation - Components
export { FaceValidationStatus } from "./presentation/components/FaceValidationStatus";
export { FaceDetectionToggle } from "./presentation/components/FaceDetectionToggle";
