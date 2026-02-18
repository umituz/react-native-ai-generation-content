/**
 * Status Checker Utility - Barrel Export
 * Checks job status responses for errors
 *
 * Architecture:
 * - Domain: Status check result types
 * - Infrastructure: Error detection, status predicates, extraction helpers
 */

export type { StatusCheckResult } from "./status-checker.types";
export { checkStatusForErrors } from "./status-error-detector";
export { isJobComplete, isJobProcessing, isJobFailed } from "./status-predicates";
