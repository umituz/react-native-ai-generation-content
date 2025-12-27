/**
 * Status Helpers
 * Utility functions for creation status
 */

import type { CreationStatus } from "../types";

/**
 * Design system color keys for status
 */
export type StatusColorKey = "success" | "primary" | "warning" | "error" | "textSecondary";

/**
 * Get design system color key for status
 */
export function getStatusColorKey(status: CreationStatus): StatusColorKey {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
      return "primary";
    case "queued":
      return "warning";
    case "pending":
      return "warning";
    case "failed":
      return "error";
    default:
      return "textSecondary";
  }
}

/**
 * Get status color from colors object
 */
export function getStatusColor(
  status: CreationStatus,
  colors: Record<string, string>,
): string {
  const key = getStatusColorKey(status);
  return colors[key] || colors.textSecondary;
}

/**
 * Get i18n key for status text
 */
export function getStatusTextKey(status: CreationStatus): string {
  return `creations.status.${status}`;
}

/**
 * Get default status text (fallback)
 */
export function getStatusText(status: CreationStatus): string {
  switch (status) {
    case "completed":
      return "Completed";
    case "processing":
      return "In Progress";
    case "queued":
      return "Queued";
    case "pending":
      return "Pending";
    case "failed":
      return "Failed";
    default:
      return status;
  }
}

/**
 * Check if creation is in progress
 */
export function isInProgress(status: CreationStatus): boolean {
  return status === "processing" || status === "pending" || status === "queued";
}

/**
 * Check if creation is completed
 */
export function isCompleted(status: CreationStatus): boolean {
  return status === "completed";
}

/**
 * Check if creation has failed
 */
export function isFailed(status: CreationStatus): boolean {
  return status === "failed";
}
