/**
 * Base Prompt Structure Constants
 * Core prompt building blocks for AI image generation
 * Optimized for Gemini 3 Pro Image (nano-banana-2) — natural language format
 */

export const IDENTITY_PRESERVATION_CORE = `IDENTITY PRESERVATION (CRITICAL - HIGHEST PRIORITY):
Preserve the EXACT facial appearance from the uploaded photo with 100% accuracy.

MANDATORY REQUIREMENTS:
- Keep EVERY facial detail IDENTICAL: bone structure, facial proportions, eye shape, eye color, iris pattern, nose shape/size, lip shape/fullness, cheekbones, jawline, chin shape
- Preserve ALL unique characteristics: skin texture, pores, fine lines, smile lines, freckles, moles, birthmarks, scars, dimples, skin undertones
- Maintain EXACT facial proportions and face shape - do NOT elongate, widen, or alter face geometry
- Keep hair texture, color, and styling consistent with the uploaded photo
- Preserve the person's natural expression and personality - do NOT add artificial or exaggerated expressions

STRICTLY PROHIBITED:
- Do NOT alter, idealize, beautify, or enhance any facial feature
- Do NOT make the face look younger, older, more attractive, or different in any way
- Do NOT add makeup, change skin tone, or smooth skin texture artificially
- Do NOT create a plastic, doll-like, or AI-generated appearance
- Do NOT change facial proportions to fit beauty standards
- The person MUST be instantly recognizable as themselves - if a friend wouldn't recognize them, the generation has failed

RESULT REQUIREMENT:
The final image must look like a REAL photograph of the ACTUAL person from the uploaded photo - not an idealized or beautified version.`;

export const IDENTITY_PRESERVATION_COUPLE = `IDENTITY PRESERVATION (CRITICAL - HIGHEST PRIORITY):
Preserve the EXACT facial appearance of BOTH people from the uploaded photos with 100% accuracy.

MANDATORY REQUIREMENTS FOR BOTH PERSONS:
- Keep EVERY facial detail IDENTICAL for both individuals: bone structure, facial proportions, eye shape, eye color, iris pattern, nose shape/size, lip shape/fullness, cheekbones, jawline, chin shape
- Preserve ALL unique characteristics for both: skin texture, pores, fine lines, smile lines, freckles, moles, birthmarks, scars, dimples, skin undertones
- Maintain EXACT facial proportions and face shapes for both people - do NOT alter face geometry
- Keep hair texture, color, and styling consistent with uploaded photos for both
- Preserve natural expressions and personalities of both individuals

COUPLE REQUIREMENTS:
- The resulting image MUST show BOTH individuals together as a couple
- Both people must be positioned naturally together with authentic interaction
- Maintain accurate relative heights and proportions between the two people

STRICTLY PROHIBITED:
- Do NOT alter, idealize, beautify, or enhance any facial feature of either person
- Do NOT make either person look younger, older, or more attractive
- Do NOT add makeup, change skin tones, or smooth skin artificially
- Do NOT create plastic, doll-like, or AI-generated appearances
- Both people MUST be instantly recognizable as themselves - if friends wouldn't recognize them, the generation has failed

RESULT REQUIREMENT:
The final image must look like a REAL photograph of the ACTUAL two people from the uploaded photos - not idealized or beautified versions.`;

export const PHOTOREALISTIC_RENDERING = `STYLE: Photorealistic photograph, high quality, professional photography, natural lighting with realistic shadows.
PROHIBITED: No anime, cartoons, illustrations, sketches, 3D renders, paintings, or non-photorealistic styles.`;

export const NATURAL_POSE_GUIDELINES = `POSE: Natural, relaxed body language appropriate to the scenario context.
AVOID: No absurd poses, unnatural contortions, or physically impossible positions.`;

export const NATURAL_POSE_GUIDELINES_COUPLE = `POSE: Natural, relaxed body language and authentic interaction between the two people, appropriate to the scenario context.
AVOID: No absurd poses, unnatural contortions, or physically impossible positions.`;

