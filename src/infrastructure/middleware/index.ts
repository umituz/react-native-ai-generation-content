/**
 * Middleware Factories
 * Generic middleware with app-provided config
 */

export {
  createCreditCheckMiddleware,
  type CreditCheckConfig,
} from "./credit-check.middleware";

export {
  createHistoryTrackingMiddleware,
  type HistoryConfig,
  type HistoryEntry,
} from "./history-tracking.middleware";
