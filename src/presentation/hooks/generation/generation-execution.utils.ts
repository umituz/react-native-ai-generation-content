/**
 * Generation Execution Utilities
 * Shared utilities for image and audio generation executors to eliminate code duplication
 */

import { generateUUID } from "@umituz/react-native-design-system/uuid";

/**
 * Resolve type from config - handles both static string and function types
 */
export function resolveType<P>(
  typeConfig: string | ((params: P) => string),
  params: P
): string {
  return typeof typeConfig === "function" ? typeConfig(params) : typeConfig;
}

/**
 * Handle credit refund with error logging
 */
export async function handleCreditRefund(
  refundCredits: (amount: number) => Promise<void> | Promise<boolean>,
  cost: number,
  typeLabel: string
): Promise<void> {
  try {
    await refundCredits(cost);
  } catch {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error(`[${typeLabel}] Refund failed`);
    }
  }
}

/**
 * Log generation error in development
 */
export function logGenerationError(
  typeLabel: string,
  error: unknown
): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.error(`[${typeLabel}]`, error);
  }
}

/**
 * Generate unique creation ID using Design System UUID
 */
export function generateCreationId(): string {
  return generateUUID();
}
