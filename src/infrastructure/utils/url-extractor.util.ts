/**
 * URL Extractor Utility
 * Extracts output URLs from AI generation results
 * Supports various provider response formats
 */

export {
  extractOutputUrl,
  extractVideoUrl,
  extractAudioUrl,
  extractImageUrls,
  extractOutputUrls,
  extractThumbnailUrl,
  extractImageResult,
  extractVideoResult,
  executeRules,
  IMAGE_EXTRACTION_RULES,
  VIDEO_EXTRACTION_RULES,
} from "./url-extractor";

export type {
  ExtractionRule,
  ImageResultExtractor,
  VideoResultExtractor,
} from "./url-extractor";
