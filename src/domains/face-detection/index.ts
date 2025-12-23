/**
 * React Native AI Face Detection - Public API
 *
 * AI-powered face detection for React Native apps using Gemini Vision
 */

export type {
  FaceDetectionResult,
  FaceValidationState,
  FaceDetectionConfig,
} from "./domain/entities/FaceDetection";

export { FACE_DETECTION_CONFIG, FACE_DETECTION_PROMPTS } from "./domain/constants/faceDetectionConstants";

export {
  isValidFace,
  parseDetectionResponse,
  createFailedResult,
  createSuccessResult,
} from "./infrastructure/validators/faceValidator";

export { analyzeImageForFace } from "./infrastructure/analyzers/faceAnalyzer";

export { useFaceDetection } from "./presentation/hooks/useFaceDetection";

export { FaceValidationStatus } from "./presentation/components/FaceValidationStatus";
