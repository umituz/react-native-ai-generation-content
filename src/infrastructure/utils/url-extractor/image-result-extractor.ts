/**
 * Image Result Extractor
 * Extracts image URL from AI provider responses using declarative rules
 */

import { IMAGE_EXTRACTION_RULES } from "./extraction-rules";
import { executeRules } from "./rule-executor";

/**
 * Result extractor function type
 */
export type ImageResultExtractor = (result: unknown) => string | undefined;

/**
 * Extract image URL from AI generation result
 * Uses Chain of Responsibility pattern with declarative rules
 */
export const extractImageResult: ImageResultExtractor = (result) => {
  return executeRules(result, IMAGE_EXTRACTION_RULES, "ImageExtractor");
};
