/**
 * Calculation Utilities
 * Centralized calculation operations for better performance and maintainability
 */

// Credit & Cost Calculations
export {
  calculateCredits,
  calculateResolutionMultiplier,
  convertCostToCredits,
} from "./credit-calculations";

// Time & Duration Calculations
export {
  calculateAgeMs,
  calculateAgeSeconds,
  calculateAgeMinutes,
  isOlderThan,
  calculateDurationMs,
  formatDuration,
  calculatePollingInterval,
  calculateEstimatedPollingTime,
} from "./time-calculations";

// General Cost & Value Calculations
export {
  calculatePercentage,
  calculateProgress,
  calculateRemaining,
  calculateFilteredCount,
  calculatePaginationSlice,
  calculateHasMore,
  calculateBase64Size,
  calculateBase64SizeMB,
  isBase64SizeWithinLimit,
  calculateConfidenceScore,
  calculateAspectRatio,
  calculateHeightFromAspectRatio,
  calculateWidthFromAspectRatio,
  calculateImageMemoryUsage,
  calculateMemoryMB,
  calculateSafeBatchSize,
  clamp,
  lerp,
  mapRange,
} from "./cost-calculations";
