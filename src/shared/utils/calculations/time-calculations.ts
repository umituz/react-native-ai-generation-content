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
