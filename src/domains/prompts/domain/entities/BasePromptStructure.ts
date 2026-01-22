/**
 * Base Prompt Structure for AI Image Generation
 * Optimized for character identity preservation and photorealistic output
 * 
 * This module provides core prompt building blocks that ensure:
 * - Strict facial identity preservation
 * - High-quality photorealistic rendering
 * - Consistent character appearance across generations
 * - Professional photography standards
 */

/**
 * Core identity preservation instruction
 * This is the foundation for maintaining facial consistency
 * Updated with stricter rules based on AI image generation best practices
 */
export const IDENTITY_PRESERVATION_CORE = `CRITICAL IDENTITY PRESERVATION (HIGHEST PRIORITY):
{
  "policy": "PRESERVE 100% IDENTICAL FACIAL APPEARANCE FROM INPUT",
  "mandatory_rules": [
    "The face must be EXACTLY as it appears in the reference photo - 100% identical",
    "Preserve every facial detail: bone structure, eye shape, eye color, nose shape, lip shape",
    "Keep the person instantly recognizable - any deviation is NOT acceptable"
  ],
  "forbidden_modifications": [
    "Do NOT change face shape or facial proportions",
    "Do NOT alter eye color, eye shape, or eye spacing",
    "Do NOT modify nose shape, size, or position",
    "Do NOT change lip shape, thickness, or natural expression",
    "Do NOT remove natural features like freckles, moles, or wrinkles"
  ],
  "verification": "Before output: confirm face matches reference photo with 100% accuracy"
}`;

/**
 * Photorealistic rendering instruction
 */
export const PHOTOREALISTIC_RENDERING = `PHOTOREALISTIC RENDERING REQUIREMENTS:
{
  "style": "PHOTOREALISTIC PHOTOGRAPH",
  "quality": "high quality, professional photography",
  "lighting": "Natural lighting with realistic shadows and highlights",
  "prohibited": "STRICTLY NO anime, cartoons, illustrations, sketches, 3D renders, or non-photorealistic styles",
  "output": "Must look like a real photograph"
}`;

/**
 * Character pose and framing guidelines
 * Prevents absurd poses and ensures natural positioning
 */
export const NATURAL_POSE_GUIDELINES = `NATURAL POSE AND FRAMING:
{
  "framing": "Medium-shot cinematic portrait (waist-up or full-body as appropriate)",
  "pose": "Natural, relaxed pose - standing, sitting, or contextually appropriate position",
  "eye_contact": "Looking directly at the camera with natural expression",
  "body_language": "Confident, natural body language without exaggerated or awkward positions",
  "interaction": "If multiple people: standing side-by-side, close together, or naturally interacting",
  "avoid": "NO absurd poses, unnatural contortions, or physically impossible positions"
}`;

/**
 * Complete base prompt combining all core elements
 */
export const MASTER_BASE_PROMPT = `${IDENTITY_PRESERVATION_CORE}

${PHOTOREALISTIC_RENDERING}

${NATURAL_POSE_GUIDELINES}`;

/**
 * Creates a complete photorealistic AI prompt with identity preservation
 *
 * @param scenarioPrompt - The specific scenario description
 * @param options - Optional customization
 * @returns Complete AI-ready prompt
 */
export interface CreatePromptOptions {
  /** Include identity preservation instructions (default: true) */
  includeIdentityPreservation?: boolean;
  /** Include photorealistic rendering instructions (default: true) */
  includePhotoRealism?: boolean;
  /** Include natural pose guidelines (default: true) */
  includePoseGuidelines?: boolean;
  /** Additional custom instructions */
  customInstructions?: string;
}

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

/**
 * Creates a transformation prompt for costume/style changes
 * Maintains identity while changing appearance
 * 
 * @param styleName - Name of the target style/theme
 * @param costume - Costume/clothing description
 * @param background - Background/environment description
 * @returns Complete transformation prompt
 */
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

/**
 * Simplified prompt for scenarios that already include detailed instructions
 * Adds only the essential identity preservation layer
 *
 * @param existingPrompt - The existing detailed prompt
 * @returns Enhanced prompt with identity preservation
 */
export const enhanceExistingPrompt = (existingPrompt: string): string => {
  return `${IDENTITY_PRESERVATION_CORE}

${existingPrompt}`;
};
