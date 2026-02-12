/**
 * Processing Modes Filters
 * Domain Service: Filter modes by criteria
 */

import type { ModeCatalog } from "../entities/processing-modes.types";
import { DEFAULT_PROCESSING_MODES } from "./processing-modes-catalog.constants";

/**
 * Filter modes by premium status (free modes only)
 */
export function getFreeModes(modes: ModeCatalog = DEFAULT_PROCESSING_MODES): ModeCatalog {
  return Object.fromEntries(
    Object.entries(modes).filter(([, config]) => !config.premium)
  );
}

/**
 * Filter modes by premium status (premium modes only)
 */
export function getPremiumModes(modes: ModeCatalog = DEFAULT_PROCESSING_MODES): ModeCatalog {
  return Object.fromEntries(
    Object.entries(modes).filter(([, config]) => config.premium)
  );
}

/**
 * Get modes that require custom prompts
 */
export function getPromptRequiredModes(modes: ModeCatalog = DEFAULT_PROCESSING_MODES): ModeCatalog {
  return Object.fromEntries(
    Object.entries(modes).filter(([, config]) => config.requiresPrompt)
  );
}
