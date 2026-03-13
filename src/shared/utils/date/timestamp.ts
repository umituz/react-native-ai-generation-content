/**
 * Timestamp Utilities
 * Provides consistent timestamp operations across the application
 */

/**
 * Gets the current timestamp in milliseconds
 * @returns Current timestamp in milliseconds
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Calculates elapsed time in milliseconds
 * @param startTime - Start timestamp in milliseconds
 * @param endTime - End timestamp in milliseconds (defaults to current time)
 * @returns Elapsed time in milliseconds
 */
export function getElapsedMs(startTime: number, endTime?: number): number {
  const end = endTime ?? Date.now();
  return end - startTime;
}

/**
 * Formats elapsed time in milliseconds to a human-readable string
 * @param elapsedMs - Elapsed time in milliseconds
 * @returns Formatted string (e.g., "1.5s", "500ms", "2m 30s")
 */
export function formatElapsedMs(elapsedMs: number): string {
  if (elapsedMs < 1000) {
    return `${elapsedMs}ms`;
  }
  if (elapsedMs < 60000) {
    return `${(elapsedMs / 1000).toFixed(1)}s`;
  }
  const minutes = Math.floor(elapsedMs / 60000);
  const seconds = Math.floor((elapsedMs % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

/**
 * Creates a unique timestamp-based ID
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID with timestamp
 */
export function createTimestampId(prefix: string = ""): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 9);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

/**
 * Converts a timestamp to ISO string
 * @param timestamp - Timestamp in milliseconds
 * @returns ISO 8601 formatted string
 */
export function timestampToISOString(timestamp: number): string {
  return new Date(timestamp).toISOString();
}

/**
 * Checks if a timestamp is recent (within the specified milliseconds)
 * @param timestamp - Timestamp to check
 * @param recentMs - Threshold for "recent" in milliseconds (default: 5000ms)
 * @returns True if timestamp is within the threshold
 */
export function isTimestampRecent(timestamp: number, recentMs: number = 5000): boolean {
  const elapsed = Date.now() - timestamp;
  return elapsed >= 0 && elapsed <= recentMs;
}
