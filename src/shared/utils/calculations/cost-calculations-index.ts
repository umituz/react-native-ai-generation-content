/**
 * General Cost & Value Calculations
 */

export {
  calculatePercentage,
  calculateProgress,
  calculateRemaining,
} from "./percentage-calculations";

export {
  calculateFilteredCount,
  calculatePaginationSlice,
  calculateHasMore,
} from "./pagination-calculations";

export {
  calculateBase64Size,
  calculateBase64SizeMB,
  isBase64SizeWithinLimit,
} from "./base64-calculations";

export {
  calculateConfidenceScore,
} from "./confidence-calculations";

export {
  calculateAspectRatio,
  calculateHeightFromAspectRatio,
  calculateWidthFromAspectRatio,
} from "./aspect-ratio-calculations";

export {
  calculateImageMemoryUsage,
  calculateMemoryMB,
  calculateSafeBatchSize,
} from "./memory-calculations";

export {
  clamp,
  lerp,
  mapRange,
} from "./math-utilities";
