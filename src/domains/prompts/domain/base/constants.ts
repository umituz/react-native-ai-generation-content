/**
 * Base Prompt Structure Constants
 * Core prompt building blocks for AI image generation
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

export const PHOTOREALISTIC_RENDERING = `PHOTOREALISTIC RENDERING REQUIREMENTS:
{
  "style": "PHOTOREALISTIC PHOTOGRAPH",
  "quality": "high quality, professional photography",
  "lighting": "Natural lighting with realistic shadows and highlights",
  "prohibited": "STRICTLY NO anime, cartoons, illustrations, sketches, 3D renders, or non-photorealistic styles",
  "output": "Must look like a real photograph"
}`;

export const NATURAL_POSE_GUIDELINES = `NATURAL POSE AND FRAMING:
{
  "framing": "Medium-shot cinematic portrait (waist-up or full-body as appropriate)",
  "pose": "Natural, relaxed pose - standing, sitting, or contextually appropriate position",
  "eye_contact": "Looking directly at the camera with natural expression",
  "body_language": "Confident, natural body language without exaggerated or awkward positions",
  "interaction": "If multiple people: standing side-by-side, close together, or naturally interacting",
  "avoid": "NO absurd poses, unnatural contortions, or physically impossible positions"
}`;

export const MASTER_BASE_PROMPT = `${IDENTITY_PRESERVATION_CORE}

${PHOTOREALISTIC_RENDERING}

${NATURAL_POSE_GUIDELINES}`;
