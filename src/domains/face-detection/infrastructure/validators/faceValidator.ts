/**
 * Face Validator
 *
 * Pure functions for validating face detection results.
 */

import type { FaceDetectionResult } from "../../domain/entities/FaceDetection";
import { FACE_DETECTION_CONFIG } from "../../domain/constants/faceDetectionConstants";

export const isValidFace = (result: FaceDetectionResult): boolean => {
  return (
    result.hasFace && result.confidence >= FACE_DETECTION_CONFIG.minConfidence
  );
};

export const parseDetectionResponse = (
  response: string,
): FaceDetectionResult => {
  try {
    let cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    cleaned = cleaned.trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return createFailedResult("Invalid response format");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      hasFace: Boolean(parsed.hasFace),
      confidence: Number(parsed.confidence) || 0,
      message: String(parsed.reason || ""),
    };
  } catch (error) {
    return createFailedResult("Failed to parse response");
  }
};

export const createFailedResult = (message: string): FaceDetectionResult => ({
  hasFace: false,
  confidence: 0,
  message,
});

export const createSuccessResult = (
  confidence: number,
): FaceDetectionResult => ({
  hasFace: true,
  confidence,
  message: "Face detected successfully",
});
