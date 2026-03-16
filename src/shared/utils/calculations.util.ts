/**
 * Calculation Utilities
 * Centralized calculation operations for better performance and maintainability
 */

/**
 * Time & Duration Calculations
 */

/**
 * Calculate age in milliseconds from a timestamp
 */
export function calculateAgeMs(timestamp: Date | number): number {
  const time = typeof timestamp === "number" ? timestamp : timestamp.getTime();
  return Date.now() - time;
}

/**
 * Calculate age in seconds from a timestamp
 */
export function calculateAgeSeconds(timestamp: Date | number): number {
  return Math.floor(calculateAgeMs(timestamp) / 1000);
}

/**
 * Calculate age in minutes from a timestamp
 */
export function calculateAgeMinutes(timestamp: Date | number): number {
  return Math.floor(calculateAgeSeconds(timestamp) / 60);
}

/**
 * Check if timestamp is older than specified milliseconds
 */
export function isOlderThan(timestamp: Date | number, maxAgeMs: number): boolean {
  return calculateAgeMs(timestamp) > maxAgeMs;
}

/**
 * Calculate duration between two timestamps in milliseconds
 */
export function calculateDurationMs(
  startTime: Date | number,
  endTime: Date | number = Date.now()
): number {
  const start = typeof startTime === "number" ? startTime : startTime.getTime();
  const end = typeof endTime === "number" ? endTime : endTime.getTime();
  return end - start;
}

/**
 * Format duration in milliseconds to human-readable string
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

/**
 * Polling Calculations
 */

/**
 * Calculate polling interval with exponential backoff
 */
export function calculatePollingInterval(options: {
  attempt: number;
  initialIntervalMs: number;
  maxIntervalMs: number;
  backoffMultiplier: number;
}): number {
  const { attempt, initialIntervalMs, maxIntervalMs, backoffMultiplier } = options;

  if (attempt === 0) {
    return 0;
  }

  const interval = initialIntervalMs * Math.pow(backoffMultiplier, attempt - 1);
  return Math.min(interval, maxIntervalMs);
}

/**
 * Calculate estimated total polling time
 */
export function calculateEstimatedPollingTime(options: {
  maxAttempts: number;
  initialIntervalMs: number;
  maxIntervalMs: number;
  backoffMultiplier: number;
}): number {
  let total = 0;
  for (let attempt = 1; attempt < options.maxAttempts; attempt++) {
    total += calculatePollingInterval({ ...options, attempt });
    if (total >= options.maxIntervalMs * options.maxAttempts) {
      break;
    }
  }
  return total;
}

/**
 * Progress & Percentage Calculations
 */

/**
 * Calculate percentage with bounds checking (0-100)
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  const percentage = (value / total) * 100;
  return Math.max(0, Math.min(100, percentage));
}

/**
 * Calculate progress with min/max bounds
 */
export function calculateProgress(
  current: number,
  total: number,
  min: number = 0,
  max: number = 100
): number {
  if (total === 0) return min;
  const percentage = (current / total) * (max - min) + min;
  return Math.max(min, Math.min(max, percentage));
}

/**
 * Calculate remaining percentage
 */
export function calculateRemaining(current: number, total: number): number {
  return Math.max(0, total - current);
}

/**
 * Array & Collection Calculations
 */

/**
 * Calculate filtered count with predicate
 */
export function calculateFilteredCount<T>(
  items: readonly T[],
  predicate: (item: T) => boolean
): number {
  return items.reduce((count, item) => (predicate(item) ? count + 1 : count), 0);
}

/**
 * Calculate pagination slice
 */
export function calculatePaginationSlice(
  totalItems: number,
  page: number,
  pageSize: number
): { start: number; end: number; count: number } {
  const start = page * pageSize;
  const end = Math.min(start + pageSize, totalItems);
  const count = end - start;
  return { start, end, count };
}

/**
 * Calculate if more items exist for pagination
 */
export function calculateHasMore(
  currentCount: number,
  currentPage: number,
  pageSize: number
): boolean {
  return currentCount >= currentPage * pageSize;
}

/**
 * Base64 & Size Calculations
 */

/**
 * Calculate base64 size in bytes
 */
export function calculateBase64Size(base64: string): number {
  // Remove data URI prefix if present
  const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, "");
  return (cleanBase64.length * 3) / 4;
}

/**
 * Calculate base64 size in megabytes
 */
export function calculateBase64SizeMB(base64: string): number {
  return calculateBase64Size(base64) / (1024 * 1024);
}

/**
 * Calculate if base64 size is within limit
 */
export function isBase64SizeWithinLimit(base64: string, maxSizeMB: number): boolean {
  return calculateBase64SizeMB(base64) <= maxSizeMB;
}

/**
 * Confidence Score Calculations
 */

/**
 * Calculate confidence score from violations with weights
 */
export function calculateConfidenceScore(
  violations: readonly { severity: "critical" | "high" | "medium" | "low" }[]
): number {
  if (violations.length === 0) return 1.0;

  const weights = { critical: 1.0, high: 0.75, medium: 0.5, low: 0.25 };
  const score = violations.reduce(
    (sum, v) => sum + (weights[v.severity] || 0.25),
    0
  );

  // Normalize by number of violations, capped at 1.0
  return Math.min(1.0, score / Math.max(1, violations.length));
}

/**
 * Credit & Cost Calculations
 */

/**
 * Calculate cost in credits based on duration and resolution
 */
export function calculateCredits(
  durationSeconds: number,
  resolutionMultiplier: number = 1,
  baseCost: number = 1
): number {
  return Math.ceil((durationSeconds / 60) * resolutionMultiplier * baseCost);
}

/**
 * Calculate resolution multiplier for credits
 */
export function calculateResolutionMultiplier(width: number, height: number): number {
  const totalPixels = width * height;
  const basePixels = 720 * 1280; // HD baseline

  if (totalPixels <= basePixels) return 1;
  if (totalPixels <= basePixels * 2) return 1.5;
  if (totalPixels <= basePixels * 4) return 2;
  return 3;
}

/**
 * Calculate cost to credits conversion
 */
export function convertCostToCredits(
  cost: number,
  creditsPerDollar: number = 100
): number {
  return Math.ceil(cost * creditsPerDollar);
}

/**
 * Aspect Ratio Calculations
 */

/**
 * Calculate aspect ratio from dimensions
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Calculate height from width and aspect ratio
 */
export function calculateHeightFromAspectRatio(
  width: number,
  aspectRatio: number
): number {
  return Math.round(width / aspectRatio);
}

/**
 * Calculate width from height and aspect ratio
 */
export function calculateWidthFromAspectRatio(
  height: number,
  aspectRatio: number
): number {
  return Math.round(height * aspectRatio);
}

/**
 * Memory & Performance Calculations
 */

/**
 * Calculate estimated memory usage for image
 */
export function calculateImageMemoryUsage(
  width: number,
  height: number,
  bytesPerPixel: number = 4 // RGBA
): number {
  return width * height * bytesPerPixel;
}

/**
 * Calculate estimated memory usage in MB
 */
export function calculateMemoryMB(bytes: number): number {
  return bytes / (1024 * 1024);
}

/**
 * Calculate safe batch size for processing
 */
export function calculateSafeBatchSize(
  availableMemoryMB: number,
  itemSizeMB: number,
  safetyFactor: number = 0.7
): number {
  const safeMemory = availableMemoryMB * safetyFactor;
  return Math.max(1, Math.floor(safeMemory / itemSizeMB));
}

/**
 * Utility Functions
 */

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * clamp(progress, 0, 1);
}

/**
 * Map value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const inRange = inMax - inMin;
  const outRange = outMax - outMin;
  return outMin + ((value - inMin) / inRange) * outRange;
}
