/**
 * Generation Orchestrator - State Utilities
 */

import type { GenerationState } from "./orchestrator-types";

/**
 * Get initial generation state
 */
export function getInitialState<T>(): GenerationState<T> {
  return {
    status: "idle",
    isGenerating: false,
    result: null,
    error: null,
  };
}
