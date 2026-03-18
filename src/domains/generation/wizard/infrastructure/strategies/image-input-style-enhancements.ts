/**
 * Image Generation Strategy - Style Enhancements
 *
 * Applies style enhancements to the prompt
 */

import { DEFAULT_STYLE_VALUE } from "./wizard-strategy.constants";
import { extractSelection } from "../utils";

/**
 * Applies style enhancements to the prompt
 */
export function applyStyleEnhancements(
  prompt: string,
  wizardData: Record<string, unknown>
): string {
  const enhancements: string[] = [];

  const moodSelections = extractSelection(wizardData.selection_mood);
  if (Array.isArray(moodSelections) && moodSelections.length > 0) {
    enhancements.push(`Mood: ${moodSelections.join(", ")}`);
  }

  const artStyle = extractSelection(wizardData.selection_art_style);
  if (typeof artStyle === "string" && artStyle !== DEFAULT_STYLE_VALUE) {
    enhancements.push(`Art style: ${artStyle}`);
  }

  const artist = extractSelection(wizardData.selection_artist_style);
  if (typeof artist === "string" && artist !== DEFAULT_STYLE_VALUE) {
    enhancements.push(`Artist style: ${artist}`);
  }

  return enhancements.length > 0 ? `${prompt}. ${enhancements.join(", ")}` : prompt;
}
