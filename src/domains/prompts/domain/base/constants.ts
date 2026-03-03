/**
 * Base Prompt Structure Constants
 * Core prompt building blocks for AI image generation
 * Optimized for Gemini 3 Pro Image (nano-banana-2) — natural language format
 */

export const IDENTITY_PRESERVATION_CORE = `IDENTITY PRESERVATION (HIGHEST PRIORITY):
Preserve the EXACT facial appearance from reference photos with 100% accuracy.
Keep every detail identical: bone structure, eye shape, eye color, nose, lips, skin texture, freckles, moles.
The person must be instantly recognizable — do NOT alter, idealize, or beautify any facial feature.`;

export const PHOTOREALISTIC_RENDERING = `STYLE: Photorealistic photograph, high quality, professional photography, natural lighting with realistic shadows.
PROHIBITED: No anime, cartoons, illustrations, sketches, 3D renders, paintings, or non-photorealistic styles.`;

export const NATURAL_POSE_GUIDELINES = `POSE: Natural, relaxed body language appropriate to the scenario context.
AVOID: No absurd poses, unnatural contortions, or physically impossible positions.`;

export const MASTER_BASE_PROMPT = `${IDENTITY_PRESERVATION_CORE}

${PHOTOREALISTIC_RENDERING}

${NATURAL_POSE_GUIDELINES}`;
