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
 */
export const IDENTITY_PRESERVATION_CORE = `CRITICAL IDENTITY PRESERVATION:
{
  "policy": "MAINTAIN EXACT FACIAL IDENTITY FROM INPUT",
  "rule_1": "Perfect facial identity preservation - the output MUST depict the EXACT SAME PERSON from the input photo.",
  "rule_2": "Preserve all unique facial features: bone structure, eye shape, nose, mouth, facial proportions.",
  "rule_3": "Maintain natural skin texture with pores and realistic details.",
  "rule_4": "Keep the person's recognizable identity while adapting to the scenario context.",
  "rule_5": "NEVER alter core facial characteristics that define the person's identity."
}`;

/**
 * Photorealistic rendering instruction
 * Ensures high-quality, professional photography output
 */
export const PHOTOREALISTIC_RENDERING = `PHOTOREALISTIC RENDERING REQUIREMENTS:
{
  "style": "HIGH-END PHOTOREALISTIC PHOTOGRAPH",
  "quality": "8k resolution, ultra-detailed textures, professional photography",
  "lighting": "Cinematic lighting with natural shadows and highlights",
  "camera": "Shot on professional DSLR camera (Canon EOS R5, Sony A7R V, or equivalent)",
  "lens": "Professional lens with appropriate focal length (35mm, 50mm, 85mm)",
  "prohibited": "STRICTLY NO anime, cartoons, illustrations, sketches, 3D renders, or non-photorealistic styles",
  "output": "Must look like a real photograph taken by a professional photographer"
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
 * Creates a complete AI prompt with identity preservation
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

export const createEnhancedPrompt = (
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
    "style_matching": "Render as a premium DSLR photograph",
    "face_preservation": "Maintain 100% identity of the person",
    "lighting": "Realistic professional studio or outdoor cinematic lighting",
    "pose": "Natural, contextually appropriate pose"
  }
}

FINAL COMMAND: Transform the input person into a strictly photorealistic ${styleName}. The result MUST be a real-life looking person in high-quality ${styleName} attire, maintaining perfect facial identity.`;

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

/**
 * Couple/duo specific prompt enhancement
 * Ensures both people maintain their identities
 */
export const COUPLE_IDENTITY_PRESERVATION = `COUPLE IDENTITY PRESERVATION:
{
  "requirement": "Both individuals must maintain their exact facial identities",
  "person_a": "Perfect preservation of first person's facial features and identity",
  "person_b": "Perfect preservation of second person's facial features and identity",
  "interaction": "Natural, loving interaction between the two people",
  "positioning": "Standing side-by-side, close together, or in contextually appropriate positions",
  "eye_contact": "Both looking at the camera with natural expressions"
}`;

/**
 * Creates a couple-specific prompt
 * 
 * @param scenarioPrompt - The scenario description for the couple
 * @returns Complete couple-optimized prompt
 */
export const createCouplePrompt = (scenarioPrompt: string): string => {
  return `${IDENTITY_PRESERVATION_CORE}

${COUPLE_IDENTITY_PRESERVATION}

${PHOTOREALISTIC_RENDERING}

${NATURAL_POSE_GUIDELINES}

SCENARIO DESCRIPTION:
${scenarioPrompt}`;
};
