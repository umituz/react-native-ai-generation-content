/**
 * Face Analyzer
 *
 * Provider-agnostic face detection analyzer.
 * Main app injects the AI provider function.
 */

import type { FaceDetectionResult } from "../../domain/entities/FaceDetection";
import { FACE_DETECTION_PROMPTS } from "../../domain/constants/faceDetectionConstants";
import {
  parseDetectionResponse,
  createFailedResult,
} from "../validators/faceValidator";

export type AIAnalyzerFunction = (
  model: string,
  params: { prompt: string; image_url: string }
) => Promise<{ text: string }>;

export const analyzeImageForFace = async (
  base64Image: string,
  aiAnalyzer: AIAnalyzerFunction,
  model: string
): Promise<FaceDetectionResult> => {
  try {
    const result = await aiAnalyzer(model, {
      prompt: FACE_DETECTION_PROMPTS.analyze,
      image_url: base64Image,
    });

    if (!result.text) {
      return createFailedResult("No response from AI");
    }

    return parseDetectionResponse(result.text);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed";
    return createFailedResult(message);
  }
};
