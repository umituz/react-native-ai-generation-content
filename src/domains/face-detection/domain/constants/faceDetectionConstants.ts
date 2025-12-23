/**
 * Face Detection Constants
 */

export const FACE_DETECTION_CONFIG = {
  minConfidence: 0.5,
} as const;

export const FACE_DETECTION_PROMPTS = {
  analyze: `Look at this image and check if there is a human face visible.
Reply with ONLY this JSON (no markdown, no explanation):
{"hasFace": true, "confidence": 0.9, "reason": "face visible"}

If no face is visible:
{"hasFace": false, "confidence": 0.1, "reason": "no face found"}`,
} as const;
