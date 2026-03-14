/**
 * Base Prompt Creators
 */

import {
  IDENTITY_PRESERVATION_CORE,
  IDENTITY_PRESERVATION_COUPLE,
  PHOTOREALISTIC_RENDERING,
  NATURAL_POSE_GUIDELINES,
  NATURAL_POSE_GUIDELINES_COUPLE,
  TECHNICAL_STANDARDS,
  ARTISTIC_STANDARDS,
  WARDROBE_TRANSFORMATION_RULES,
  ART_STYLE_TRANSFORMATION_RULES,
  RETOUCH_TRANSFORMATION_RULES,
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
    isArtistic = false,
    isWardrobe = false,
    isRetouch = false,
    customInstructions,
  } = options;

  const parts: string[] = [];

  // 1. Identity Segment (Highest Priority)
  if (includeIdentityPreservation) {
    parts.push(isCouple ? IDENTITY_PRESERVATION_COUPLE : IDENTITY_PRESERVATION_CORE);
  }

  // 2. Transformation Rules (Domain Specific)
  if (isWardrobe) parts.push(WARDROBE_TRANSFORMATION_RULES);
  if (isArtistic) parts.push(ART_STYLE_TRANSFORMATION_RULES);
  if (isRetouch) parts.push(RETOUCH_TRANSFORMATION_RULES);

  // 3. Technical Standards (Realism vs Artistic)
  if (includePhotoRealism) {
    parts.push(isArtistic ? ARTISTIC_STANDARDS : TECHNICAL_STANDARDS);
    if (!isArtistic) parts.push(PHOTOREALISTIC_RENDERING);
  }

  // 4. Pose Guidelines
  if (includePoseGuidelines) {
    parts.push(isCouple ? NATURAL_POSE_GUIDELINES_COUPLE : NATURAL_POSE_GUIDELINES);
  }

  // 5. Custom Instructions (Appended here to allow overrides)
  if (customInstructions) {
    parts.push(customInstructions);
  }

  // 6. Final Scenario Context
  if (isCouple && !scenarioPrompt.toLowerCase().includes("couple")) {
    parts.push(`SCENARIO DESCRIPTION:\nA photo of a couple, ${scenarioPrompt}`);
  } else {
    parts.push(`SCENARIO DESCRIPTION:\n${scenarioPrompt}`);
  }

  return parts.join('\n\n');
};
