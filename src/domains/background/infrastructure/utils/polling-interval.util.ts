/**
 * Polling Interval Calculator
 * Re-exports centralized calculation utility
 */

import type { PollingConfig } from "../../../../domain/entities/polling.types";
import { calculatePollingInterval as calculateInterval } from "../../../../shared/utils/calculations.util";

export interface IntervalOptions {
  attempt: number;
  config: PollingConfig;
}

/**
 * Calculate polling interval using centralized utility
 */
export function calculatePollingInterval(options: IntervalOptions): number {
  const { attempt, config } = options;
  return calculateInterval({
    attempt,
    initialIntervalMs: config.initialIntervalMs,
    maxIntervalMs: config.maxIntervalMs,
    backoffMultiplier: config.backoffMultiplier,
  });
}
