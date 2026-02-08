/**
 * Status Checker Utility
 * Checks job status responses for errors
 */

import type { JobStatus, AILogEntry } from "../../domain/interfaces";

export interface StatusCheckResult {
  status: string;
  hasError: boolean;
  errorMessage?: string;
  shouldStop: boolean;
}

/**
 * Type guard to check if object has a property
 */
function hasProperty<K extends PropertyKey>(
  obj: unknown,
  prop: K
): obj is Record<K, unknown> {
  return typeof obj === "object" && obj !== null && prop in obj;
}

/**
 * Safely get a string property from an object
 */
function safeString(obj: unknown, key: PropertyKey): string {
  if (hasProperty(obj, key)) {
    const value = obj[key];
    return typeof value === "string" ? value : String(value ?? "");
  }
  return "";
}

/**
 * Check job status response for errors
 * Detects errors even if status is not explicitly FAILED
 */
export function checkStatusForErrors(
  status: JobStatus | Record<string, unknown>,
): StatusCheckResult {
  // Safely extract status string
  const statusString = safeString(status, "status").toUpperCase();

  // Check for error in status response fields
  const statusError =
    safeString(status, "error") ||
    safeString(status, "detail") ||
    safeString(status, "message");
  const hasStatusError = statusError.length > 0;

  // Check logs array for ERROR/FATAL level logs with bounds checking
  const rawLogs = (status as JobStatus)?.logs;
  const logs = Array.isArray(rawLogs) ? rawLogs : [];
  const errorLogs = logs.filter((log: AILogEntry) => {
    const level = String(log?.level || "").toUpperCase();
    return level === "ERROR" || level === "FATAL";
  });
  const hasErrorLog = errorLogs.length > 0;

  // Extract error message from logs with safer access
  let errorLogMessage: string | undefined;
  if (errorLogs.length > 0) {
    const firstErrorLog = errorLogs[0];
    if (firstErrorLog && typeof firstErrorLog === "object") {
      errorLogMessage =
        safeString(firstErrorLog, "message") ||
        safeString(firstErrorLog, "text") ||
        safeString(firstErrorLog, "content");
    }
  }

  // Combine error messages
  const errorMessage = statusError || errorLogMessage;

  // Determine if we should stop immediately
  const shouldStop =
    statusString === "FAILED" || hasStatusError || hasErrorLog;

  return {
    status: statusString,
    hasError: hasStatusError || hasErrorLog,
    errorMessage: errorMessage && errorMessage.length > 0 ? errorMessage : undefined,
    shouldStop,
  };
}

/**
 * Check if status indicates job is complete
 */
export function isJobComplete(status: JobStatus | string): boolean {
  const statusString =
    typeof status === "string"
      ? status.toUpperCase()
      : String(status?.status || "").toUpperCase();

  return statusString === "COMPLETED";
}

/**
 * Check if status indicates job is still processing
 */
export function isJobProcessing(status: JobStatus | string): boolean {
  const statusString =
    typeof status === "string"
      ? status.toUpperCase()
      : String(status?.status || "").toUpperCase();

  return statusString === "IN_QUEUE" || statusString === "IN_PROGRESS";
}

/**
 * Check if status indicates job has failed
 */
export function isJobFailed(status: JobStatus | string): boolean {
  const statusString =
    typeof status === "string"
      ? status.toUpperCase()
      : String(status?.status || "").toUpperCase();

  return statusString === "FAILED";
}
