/**
 * Polling Interval Calculator
 * Calculates polling intervals with exponential backoff
 */

import {
  DEFAULT_POLLING_CONFIG,
  type PollingConfig,
} from "../../../../domain/entities/polling.types";

export interface IntervalOptions {
  attempt: number;
  config?: Partial<PollingConfig>;
}

export function calculatePollingInterval(options: IntervalOptions): number {
  const { attempt, config } = options;
  const {
    initialIntervalMs = DEFAULT_POLLING_CONFIG.initialIntervalMs,
    maxIntervalMs = DEFAULT_POLLING_CONFIG.maxIntervalMs,
    backoffMultiplier = DEFAULT_POLLING_CONFIG.backoffMultiplier,
  } = config ?? {};

  if (attempt === 0) {
    return 0;
  }

  const interval = initialIntervalMs * Math.pow(backoffMultiplier, attempt - 1);
  return Math.min(interval, maxIntervalMs);
}