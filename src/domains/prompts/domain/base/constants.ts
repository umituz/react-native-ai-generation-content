/**
 * Base Prompt Structure Constants
 * Core prompt building blocks for AI image generation
 * Optimized for Gemini 3 Pro Image (nano-banana-2) — natural language format
 */

export const IDENTITY_PRESERVATION_CORE = `IDENTITY PRESERVATION (CRITICAL):
Preserve the EXACT facial appearance, structure, and unique characteristics from the uploaded photo.
- Keep bone structure, eye shape/color, nose, and lip proportions 100% identical.
- Maintain natural skin texture, pores, markings (freckles/moles), and authentic undertones.
- DO NOT use beauty filters, skin smoothing, or alter facial geometry.
- Person must be instantly recognizable as the original individual.`;

export const IDENTITY_PRESERVATION_COUPLE = `IDENTITY PRESERVATION (CRITICAL):
Preserve the EXACT facial appearance of BOTH people from the uploaded photos with 100% accuracy.
- Maintain bone structure, facial proportions, and unique features for both individuals.
- Keep natural skin texture and authentic expressions for both.
- Both people must be instantly recognizable as themselves.
- Ensure natural relative heights and chemistry between the two people.
- DO NOT alter ethnicity, age, or apply artificial skin smoothing.`;

export const PHOTOREALISTIC_RENDERING = `STYLE - PHOTOREALISTIC QUALITY (CRITICAL):
Create an authentic photograph with professional camera characteristics.
- Professional DSLR quality, natural depth of field, and realistic bokeh.
- Natural lighting, realistic shadows, and authentic color grading.
- Visible skin pores, hair strands, and fabric textures.
- NO digital art, 3D render, CGI, or plastic/wax-like skin.
- Must be indistinguishable from a real photograph taken with a camera.`;

export const NATURAL_POSE_GUIDELINES = `POSE - NATURAL BODY LANGUAGE (CRITICAL):
Create authentic, relaxed, and candid poses.
- Realistic posture and spontaneous-looking body language.
- Natural head tilt, hand placement, and weight distribution.
- Authentic micro-expressions and relaxed facial muscles.
- NO stiff, rigid, or physically impossible positions.`;

export const NATURAL_POSE_GUIDELINES_COUPLE = `POSE - NATURAL COUPLE INTERACTION (CRITICAL):
Create authentic, relaxed couple poses with genuine chemistry.
- Natural physical proximity and authentic touch.
- Spontaneous interaction appropriate to the scenario.
- Realistic relative positioning and comfortable body language for both.
- NO staged, stiff, or theatrical posing.`;

export const ANTI_PLASTIC_DIRECTIVES = `ANTI-PLASTIC DIRECTIVES (CRITICAL):
Ensure a real photographic look, NOT digital art or AI-generated appearance.
- Preserve micro-textures, slight asymmetry, and natural skin variations.
- Natural highlights and soft shadow falloff across faces.
- Realistic fabric folds and individual hair movement.
- NO poreless skin, artificial glow, or over-processed effects.`;
