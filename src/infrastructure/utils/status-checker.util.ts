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
 * Check job status response for errors
 * Detects errors even if status is not explicitly FAILED
 */
export function checkStatusForErrors(
  status: JobStatus | Record<string, unknown>,
): StatusCheckResult {
  const statusString = String(
    (status as Record<string, unknown>)?.status || "",
  ).toUpperCase();

  // Check for error in status response fields
  const statusError =
    (status as Record<string, unknown>)?.error ||
    (status as Record<string, unknown>)?.detail ||
    (status as Record<string, unknown>)?.message;
  const hasStatusError = !!statusError;

  // Check logs array for ERROR/FATAL level logs
  const rawLogs = (status as JobStatus)?.logs;
  const logs = Array.isArray(rawLogs) ? rawLogs : [];
  const errorLogs = logs.filter((log: AILogEntry) => {
    const level = String(log?.level || "").toUpperCase();
    return level === "ERROR" || level === "FATAL";
  });
  const hasErrorLog = errorLogs.length > 0;

  // Extract error message from logs
  const errorLogMessage =
    errorLogs.length > 0
      ? (errorLogs[0] as AILogEntry & { text?: string; content?: string })
        ?.message ||
      (errorLogs[0] as AILogEntry & { text?: string })?.text ||
      (errorLogs[0] as AILogEntry & { content?: string })?.content
      : undefined;

  // Combine error messages
  const errorMessage = statusError || errorLogMessage;

  // Determine if we should stop immediately
  const shouldStop =
    statusString === "FAILED" || hasStatusError || hasErrorLog;

  return {
    status: statusString,
    hasError: hasStatusError || hasErrorLog,
    errorMessage: errorMessage ? String(errorMessage) : undefined,
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
