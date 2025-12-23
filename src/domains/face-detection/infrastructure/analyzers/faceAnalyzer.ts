/**
 * Face Analyzer
 *
 * Analyzes images for face presence using Gemini AI.
 */

import { geminiProviderService } from "@umituz/react-native-ai-gemini-provider";
import type { FaceDetectionResult } from "../../domain/entities/FaceDetection";
import { FACE_DETECTION_PROMPTS } from "../../domain/constants/faceDetectionConstants";
import {
  parseDetectionResponse,
  createFailedResult,
} from "../validators/faceValidator";

export const analyzeImageForFace = async (
  base64Image: string,
): Promise<FaceDetectionResult> => {
  try {
    const result = await geminiProviderService.run<{ text: string }>(
      "gemini-2.0-flash-exp",
      {
        prompt: FACE_DETECTION_PROMPTS.analyze,
        image_url: base64Image,
      },
    );

    if (!result.text) {
      return createFailedResult("No response from AI");
    }

    return parseDetectionResponse(result.text);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed";
    return createFailedResult(message);
  }
};
