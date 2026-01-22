/**
 * Access Control Domain
 * Centralized AI feature access control
 */

export { useAIFeatureGate } from "./hooks/useAIFeatureGate";

export type {
  AIFeatureGateOptions,
  AIFeatureGateReturn,
  AIFeatureGateHook,
} from "./types/access-control.types";
