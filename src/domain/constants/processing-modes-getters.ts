/**
 * Processing Modes Getters
 * Domain Service: Retrieve mode configurations
 */

import type { ImageProcessingMode, ModeCatalog, ModeConfig } from "../entities/processing-modes.types";
import { DEFAULT_PROCESSING_MODES } from "./processing-modes-catalog.constants";

/**
 * Get mode configuration by ID
 * Returns default transparent mode if not found
 */
export function getModeConfig(
  mode: string,
  customModes?: ModeCatalog
): ModeConfig {
  const modes = customModes || DEFAULT_PROCESSING_MODES;
  const key = mode.replace("-", "_") as ImageProcessingMode;
  return modes[key] || DEFAULT_PROCESSING_MODES.transparent;
}
