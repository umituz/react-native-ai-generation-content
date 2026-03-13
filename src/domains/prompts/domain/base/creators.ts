/**
 * Base Prompt Creators
 */

import {
  IDENTITY_PRESERVATION_CORE,
  IDENTITY_PRESERVATION_COUPLE,
  PHOTOREALISTIC_RENDERING,
  NATURAL_POSE_GUIDELINES,
  NATURAL_POSE_GUIDELINES_COUPLE,
} from "./constants";
import type { CreatePromptOptions } from "./types";

export const createPhotorealisticPrompt = (
  scenarioPrompt: string,
  options: CreatePromptOptions = {}
): string => {
  const {
    includeIdentityPreservation = true,
    includePhotoRealism = true,
    includePoseGuidelines = true,
    isCouple = false,
    customInstructions,
  } = options;

  const parts: string[] = [];

  if (includeIdentityPreservation) {
    parts.push(isCouple ? IDENTITY_PRESERVATION_COUPLE : IDENTITY_PRESERVATION_CORE);
  }

  if (includePhotoRealism) {
    parts.push(PHOTOREALISTIC_RENDERING);
  }

  if (includePoseGuidelines) {
    parts.push(isCouple ? NATURAL_POSE_GUIDELINES_COUPLE : NATURAL_POSE_GUIDELINES);
  }

  if (customInstructions) {
    parts.push(customInstructions);
  }

  parts.push(`\nSCENARIO DESCRIPTION:\n${scenarioPrompt}`);

  return parts.join('\n\n');
};
