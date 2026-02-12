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

export const createTransformationPrompt = (
  styleName: string,
  costume: string,
  background: string,
): string => `
${IDENTITY_PRESERVATION_CORE}

${PHOTOREALISTIC_RENDERING}

TRANSFORMATION REQUEST:
{
  "target_theme": "${styleName}",
  "modifications": {
    "clothing_update": "${costume.replace(/\n/g, ' ').trim()}",
    "environment_update": "${background.replace(/\n/g, ' ').trim()}"
  },
  "visual_constraints": {
    "style_matching": "Render as a premium photograph",
    "face_preservation": "Maintain 100% identity of the person",
    "lighting": "Realistic professional recording lighting",
    "pose": "Natural, contextually appropriate pose"
  }
}

FINAL COMMAND: Transform the input person into a photorealistic ${styleName}. The result MUST be a real-life looking person in high-quality ${styleName} attire, maintaining perfect facial identity.`;

export const enhanceExistingPrompt = (existingPrompt: string): string => {
  return `${IDENTITY_PRESERVATION_CORE}

${existingPrompt}`;
};
