/**
 * Extraction Rules
 * Declarative configuration for AI provider response formats
 * OCP compliant - add new formats without modifying extraction logic
 */

/**
 * Rule definition for extracting URL from response
 */
export interface ExtractionRule {
  /** Field path to check: ['data', 'image', 'url'] */
  path: readonly string[];
  /** Human-readable description for debugging */
  description?: string;
}

/**
 * Image extraction rules - checked in order, first success wins
 * Supports: FAL.ai wrapper, birefnet, rembg, flux, and direct formats
 */
export const IMAGE_EXTRACTION_RULES: readonly ExtractionRule[] = [
  // FAL.ai data wrapper formats
  { path: ["data", "image"], description: "data.image (string)" },
  { path: ["data", "imageUrl"], description: "data.imageUrl" },
  { path: ["data", "output"], description: "data.output" },
  { path: ["data", "image", "url"], description: "data.image.url (birefnet/rembg)" },
  { path: ["data", "images", "0", "url"], description: "data.images[0].url (flux)" },
  // Direct formats (no wrapper)
  { path: ["image"], description: "image (string)" },
  { path: ["imageUrl"], description: "imageUrl" },
  { path: ["output"], description: "output" },
  { path: ["image", "url"], description: "image.url" },
  { path: ["images", "0", "url"], description: "images[0].url" },
] as const;

/**
 * Video extraction rules - checked in order, first success wins
 * Supports: FAL.ai wrapper, direct formats, nested objects, arrays
 */
export const VIDEO_EXTRACTION_RULES: readonly ExtractionRule[] = [
  // FAL.ai data wrapper formats
  { path: ["data", "video"], description: "data.video (string)" },
  { path: ["data", "videoUrl"], description: "data.videoUrl" },
  { path: ["data", "video_url"], description: "data.video_url" },
  { path: ["data", "output"], description: "data.output" },
  { path: ["data", "url"], description: "data.url" },
  { path: ["data", "video", "url"], description: "data.video.url" },
  { path: ["data", "videos", "0", "url"], description: "data.videos[0].url" },
  // Direct formats (no wrapper)
  { path: ["video"], description: "video (string)" },
  { path: ["videoUrl"], description: "videoUrl" },
  { path: ["video_url"], description: "video_url" },
  { path: ["output"], description: "output" },
  { path: ["url"], description: "url" },
  { path: ["video", "url"], description: "video.url" },
  { path: ["videos", "0", "url"], description: "videos[0].url" },
] as const;
