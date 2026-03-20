/**
 * Face Detection Types
 * Uses shared kernel base types
 */

import type { BaseFeatureState } from '../../../../shared-kernel/base-types';

export interface FaceDetectionResult {
  hasFace: boolean;
  confidence: number;
  message: string;
}

export interface FaceValidationState extends BaseFeatureState<FaceDetectionResult> {
  isValidating: boolean;
  result?: FaceDetectionResult;
}

export interface FaceDetectionConfig {
  minConfidence: number;
}
