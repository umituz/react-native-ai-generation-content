/**
 * Status Error Detector
 * Infrastructure: Detects errors in job status responses
 */

import type { JobStatus, AILogEntry } from "../../../../domain/interfaces/ai-provider.interface";
import type { StatusCheckResult } from "./status-checker.types";
import { safeString } from "./status-extraction-helpers";

/**
 * Check job status response for errors
 * Detects errors even if status is not explicitly FAILED
 */
export function checkStatusForErrors(
  status: JobStatus | Record<string, unknown>
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
