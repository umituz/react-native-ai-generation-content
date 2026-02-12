/**
 * Status Checker Types
 * Domain: Value objects for status checking
 */

export interface StatusCheckResult {
  status: string;
  hasError: boolean;
  errorMessage?: string;
  shouldStop: boolean;
}
