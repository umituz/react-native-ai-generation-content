/**
 * Generation Orchestrator - Execution Logging
 */

/**
 * Log state generating
 */
export function logStateGenerating(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] State: generating - calling strategy.execute()");
  }
}

/**
 * Log execute completed
 */
export function logExecuteCompleted(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] strategy.execute() completed");
  }
}

/**
 * Log state saving
 */
export function logStateSaving(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Saving result to Firestore");
  }
}

/**
 * Log save success
 */
export function logSaveSuccess(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Result saved successfully");
  }
}

/**
 * Log save failed
 */
export function logSaveFailed(error: unknown): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] ERROR: Save failed:", error);
  }
}

/**
 * Log generation success
 */
export function logGenerationSuccess(): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] ✅ Generation SUCCESS");
    console.log("[Orchestrator] ========================================");
  }
}

/**
 * Log error
 */
export function logError(error: unknown): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[Orchestrator] Error:", error);
  }
}
