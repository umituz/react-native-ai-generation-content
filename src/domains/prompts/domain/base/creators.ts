/**
 * Base Prompt Creators
 */

import {
  IDENTITY_PRESERVATION_CORE,
  PHOTOREALISTIC_RENDERING,
  NATURAL_POSE_GUIDELINES,
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
    customInstructions,
  } = options;

  const parts: string[] = [];

  if (includeIdentityPreservation) {
    parts.push(IDENTITY_PRESERVATION_CORE);
  }

  if (includePhotoRealism) {
    parts.push(PHOTOREALISTIC_RENDERING);
  }

  if (includePoseGuidelines) {
    parts.push(NATURAL_POSE_GUIDELINES);
  }

  if (customInstructions) {
    parts.push(customInstructions);
  }

  parts.push(`\nSCENARIO DESCRIPTION:\n${scenarioPrompt}`);

  return parts.join('\n\n');
};
