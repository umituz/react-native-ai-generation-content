/**
 * Base Prompt Structure Constants
 * Core prompt building blocks for AI image generation
 * Optimized for Gemini 3 Pro Image (nano-banana-2) — natural language format
 */

export const IDENTITY_PRESERVATION_CORE = `IDENTITY PRESERVATION (HIGHEST PRIORITY):
Preserve the EXACT facial appearance from reference photos with 100% accuracy.
Keep every detail identical: bone structure, eye shape, eye color, nose, lips, skin texture, freckles, moles.
The person must be instantly recognizable — do NOT alter, idealize, or beautify any facial feature.`;

export const IDENTITY_PRESERVATION_COUPLE = `IDENTITY PRESERVATION (HIGHEST PRIORITY):
Preserve the EXACT facial appearance of BOTH people from reference photos with 100% accuracy.
The resulting image MUST show BOTH individuals together as a couple.
Keep every detail identical for both individuals: bone structure, eye shape, eye color, nose, lips, skin texture, freckles, moles.
Both people must be instantly recognizable — do NOT alter, idealize, or beautify any facial features.`;

export const PHOTOREALISTIC_RENDERING = `STYLE: Photorealistic photograph, high quality, professional photography, natural lighting with realistic shadows.
PROHIBITED: No anime, cartoons, illustrations, sketches, 3D renders, paintings, or non-photorealistic styles.`;

export const NATURAL_POSE_GUIDELINES = `POSE: Natural, relaxed body language appropriate to the scenario context.
AVOID: No absurd poses, unnatural contortions, or physically impossible positions.`;

export const NATURAL_POSE_GUIDELINES_COUPLE = `POSE: Natural, relaxed body language and authentic interaction between the two people, appropriate to the scenario context.
AVOID: No absurd poses, unnatural contortions, or physically impossible positions.`;

