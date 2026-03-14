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
- MAPPING: Map the first person in the first photo to the first person in the scene, and the second person in the second photo to the second person in the scene.
- Maintain unique bone structure, facial proportions, and specific features for both individuals independently.
- Both people must be clearly distinct and instantly recognizable as their original selves.
- Keep authentic skin textures, expressions, and gender-specific traits for both.
- Ensure natural relative heights and genuine chemistry between the two.
- DO NOT mix facial features between the two people or apply artificial smoothing.`;

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

export const TECHNICAL_STANDARDS = `TECHNICAL QUALITY STANDARDS:
- Professional DSLR photograph quality (Canon/Nikon/Sony).
- Authentic 35mm film photography aesthetic, unfiltered raw capture.
- Fujifilm or Kodak Portra film color science - natural, organic, slightly muted.
- Natural uneven lighting with realistic deep shadows and highlights.
- Sharp focus on clothing but preserve raw skin texture with visible tiny pores.
- Result MUST NOT look AI-generated (Negative: plastic, render, CGI, 3d, airbrushed, doll, cartoon).`;

export const ARTISTIC_STANDARDS = `ARTISTIC QUALITY STANDARDS:
- High-fidelity digital art masterpiece.
- Deep texture details and masterful light/shadow interplay.
- Vibrant and harmonious color palette original to the selected theme.
- Sharp focus on subject identity while background blends into the artistic theme.
- NO blurred faces, NO distorted features.`;

export const WARDROBE_TRANSFORMATION_RULES = `WARDROBE TRANSFORMATION RULES:
- Change ONLY the clothing/outfits and apply accessories if requested.
- Keep ALL identity features IDENTICAL to reference photos.
- Core facial structure, hair color, and basic style must remain unchanged.`;

export const ART_STYLE_TRANSFORMATION_RULES = `ART STYLE TRANSFORMATION RULES:
- Apply the artistic style ONLY to the texture, lighting, and background.
- DO NOT change faces into generic art faces. They MUST be recognizable as the original individuals.`;

export const RETOUCH_TRANSFORMATION_RULES = `RETOUCH TRANSFORMATION RULES:
- Subtle, natural improvement while keeping original bone structure.
- NO extreme changes to identity. Keep facial markers (moles, freckles) if choice allows.`;
