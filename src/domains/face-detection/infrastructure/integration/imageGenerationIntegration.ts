/**
 * Image Generation Integration
 * Utilities for integrating face preservation with image generation flows
 */

import type { FaceDetectionResult } from "../../domain/entities/FaceDetection";
import type {
  FacePreservationMode,
  FaceMetadata,
  FacePreservationConfig,
} from "../../domain/types/face-preservation.types";
import {
  buildFacePreservationPrompt,
  combineFacePreservationPrompt,
} from "../builders/facePreservationPromptBuilder";

export interface ImageGenerationWithFacePreservation {
  readonly originalPrompt: string;
  readonly enhancedPrompt: string;
  readonly preservationMode: FacePreservationMode;
  readonly faceDetected: boolean;
  readonly shouldPreserveFace: boolean;
}

export interface PrepareImageGenerationOptions {
  readonly prompt: string;
  readonly faceDetectionResult?: FaceDetectionResult;
  readonly preservationMode?: FacePreservationMode;
  readonly config?: Partial<FacePreservationConfig>;
}

export function prepareImageGenerationWithFacePreservation(
  options: PrepareImageGenerationOptions,
): ImageGenerationWithFacePreservation {
  const {
    prompt,
    faceDetectionResult,
    preservationMode = "balanced",
    config,
  } = options;

  const faceDetected = faceDetectionResult?.hasFace ?? false;
  const minConfidence = config?.minConfidence ?? 0.5;
  const meetsConfidence = (faceDetectionResult?.confidence ?? 0) >= minConfidence;
  const shouldPreserveFace = faceDetected && meetsConfidence && preservationMode !== "none";

  if (!shouldPreserveFace) {
    return {
      originalPrompt: prompt,
      enhancedPrompt: prompt,
      preservationMode: "none",
      faceDetected,
      shouldPreserveFace: false,
    };
  }

  const faceMetadata: FaceMetadata = {
    hasFace: faceDetected,
    confidence: faceDetectionResult?.confidence ?? 0,
  };

  const preservationPrompt = buildFacePreservationPrompt({
    mode: preservationMode,
    basePrompt: prompt,
    faceMetadata,
  });

  const enhancedPrompt = combineFacePreservationPrompt(preservationPrompt);

  return {
    originalPrompt: prompt,
    enhancedPrompt,
    preservationMode,
    faceDetected,
    shouldPreserveFace: true,
  };
}

export function shouldEnableFacePreservation(
  faceDetectionResult?: FaceDetectionResult,
  minConfidence: number = 0.5,
): boolean {
  if (!faceDetectionResult) return false;
  return faceDetectionResult.hasFace && faceDetectionResult.confidence >= minConfidence;
}
