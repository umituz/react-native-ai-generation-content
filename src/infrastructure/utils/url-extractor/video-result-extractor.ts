/**
 * Video Result Extractor
 * Extracts video URL from AI provider responses using declarative rules
 */

import { VIDEO_EXTRACTION_RULES } from "./extraction-rules";
import { executeRules } from "./rule-executor";

/**
 * Result extractor function type
 */
export type VideoResultExtractor = (result: unknown) => string | undefined;

/**
 * Extract video URL from AI generation result
 * Uses Chain of Responsibility pattern with declarative rules
 */
export const extractVideoResult: VideoResultExtractor = (result) => {
  return executeRules(result, VIDEO_EXTRACTION_RULES, "VideoExtractor");
};
