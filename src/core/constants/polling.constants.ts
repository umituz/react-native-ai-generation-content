/**
 * Job Polling Constants
 * Single Responsibility: Define polling configuration constants
 */

export const POLLING_CONFIG = {
  MAX_ATTEMPTS: 60,
  INTERVAL_MS: 5000,
  INITIAL_PROGRESS: 20,
  FINAL_PROGRESS: 90,
  COMPLETION_PROGRESS: 100,
} as const;
