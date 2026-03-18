/**
 * Generation Orchestrator - Abort Logging
 */

/**
 * Log abort before start
 */
export function logAbortBeforeStart(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Aborted before generation started");
  }
}

/**
 * Log abort after completion
 */
export function logAbortAfterCompletion(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Aborted after generation completed");
  }
}

/**
 * Log abort before save
 */
export function logAbortBeforeSave(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Aborted before save");
  }
}

/**
 * Log abort before success
 */
export function logAbortBeforeSuccess(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Aborted before success callback");
  }
}

/**
 * Log aborted
 */
export function logAborted(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Generation aborted");
  }
}
