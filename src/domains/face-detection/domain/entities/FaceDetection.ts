/**
 * Face Detection Types
 */

export interface FaceDetectionResult {
  hasFace: boolean;
  confidence: number;
  message: string;
}

export interface FaceValidationState {
  isValidating: boolean;
  result: FaceDetectionResult | null;
  error: string | null;
}

export interface FaceDetectionConfig {
  minConfidence: number;
}
