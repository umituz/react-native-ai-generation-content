/**
 * Polling Interval Calculator
 */

import type { PollingConfig } from "../../../../domain/entities/polling.types";

export interface IntervalOptions {
  attempt: number;
  config: PollingConfig;
}

export function calculatePollingInterval(options: IntervalOptions): number {
  const { attempt, config } = options;
  const { initialIntervalMs, maxIntervalMs, backoffMultiplier } = config;

  if (attempt === 0) {
    return 0;
  }

  const interval = initialIntervalMs * Math.pow(backoffMultiplier, attempt - 1);
  return Math.min(interval, maxIntervalMs);
}
