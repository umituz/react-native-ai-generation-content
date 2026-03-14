/**
 * Base Prompt Structure Constants
 * Core prompt building blocks for AI image generation
 * Optimized for Gemini 3 Pro Image (nano-banana-2) — natural language format
 */

export const IDENTITY_PRESERVATION_CORE = `IDENTITY PRESERVATION (CRITICAL):
Preserve EXACT facial features from uploaded photos with 100% accuracy - bone structure, proportions, skin tone, eye/hair color, unique markings. NO smoothing, NO idealization. Must be instantly recognizable.`;

export const IDENTITY_PRESERVATION_COUPLE = `IDENTITY PRESERVATION (CRITICAL):
Preserve EXACT facial features for BOTH people with 100% accuracy. Same requirements as single person, applied to both individuals. Keep natural skin texture, unique markings, authentic expressions. NO smoothing, idealization, or artificial enhancement. Both must be instantly recognizable.`;

export const PHOTOREALISTIC_RENDERING = `STYLE - PHOTOREALISTIC QUALITY (CRITICAL):
Create authentic photograph with real camera characteristics - NOT digital art, 3D render, or CGI.

REQUIREMENTS:
- Professional camera quality: natural depth of field, realistic bokeh, authentic lens effects
- Photographic lighting: natural/studio lighting with soft realistic shadows
- Authentic color grading: natural skin tones, no over-saturation
- Real textures: visible skin pores, individual hair strands, authentic fabric materials
- Real camera grain: subtle noise texture for authenticity
- Natural sharpness: realistic focus fall-off

STRICTLY PROHIBITED:
- NO digital art, 3D render, CGI, AI generation appearance
- NO plastic, wax, porcelain, doll-like, or over-smoothed skin
- NO anime, cartoon, illustration, or painting styles
- NO artificial glow, symmetry, or perfection
- NO fake bokeh or exaggerated colors

RESULT: Must be indistinguishable from real photograph - viewers should believe it's actual photo.`;

export const NATURAL_POSE_GUIDELINES = `POSE - NATURAL BODY LANGUAGE (CRITICAL):
Create authentic, relaxed poses that look like real candid photography.

REQUIREMENTS:
- Relaxed natural stance - no stiff or rigid posture
- Authentic body language appropriate to scenario
- Natural head tilt, shoulder position, arm placement
- Natural hand positioning - not curled or contorted
- Authentic weight distribution

FACIAL EXPRESSION:
- Natural relaxed expression - not forced or exaggerated
- Authentic eye contact or gaze direction
- Natural smile intensity - not overly bright
- Realistic micro-expressions

STRICTLY PROHIBITED:
- NO absurd or contorted positions
- NO physically impossible poses or extreme twisting
- NO stiff, rigid, or mannequin-like posture
- NO exaggerated theatrical expressions
- NO unnatural arm, leg, or body angles
- NO dance, ballet, or performative poses

RESULT: Must look like real human in candid photograph, not posed model or digital figure.`;

export const NATURAL_POSE_GUIDELINES_COUPLE = `POSE - NATURAL COUPLE INTERACTION (CRITICAL):
Create authentic, relaxed couple poses with genuine interaction and chemistry.

REQUIREMENTS:
- Relaxed natural stance for both people - no stiff posture
- Authentic body language and interaction
- Natural head positions and angles for both
- Realistic positioning relative to each other
- Natural arm and hand placement
- Authentic physical connection and proximity

FACIAL EXPRESSIONS:
- Natural relaxed expressions for both - not forced
- Authentic eye contact or gaze direction
- Natural smile intensity - not overly bright
- Realistic micro-expressions and chemistry

COUPLE INTERACTION:
- Authentic couple dynamics and comfort
- Realistic physical proximity
- Natural touch or contact if appropriate
- Genuine spontaneous engagement

STRICTLY PROHIBITED:
- NO absurd or contorted positions
- NO physically impossible poses
- NO stiff or mannequin-like posture
- NO exaggerated theatrical expressions
- NO unnatural body angles
- NO fake or staged-looking interactions

RESULT: Must look like real couple naturally interacting in candid photo, not posed models.`;

export const ANTI_PLASTIC_DIRECTIVES = `ANTI-PLASTIC DIRECTIVES (CRITICAL):
Ensure the image looks like a real photograph, NOT digital art or AI generation.

SKIN TEXTURE:
- REAL skin texture: visible pores must be present
- Natural skin variation: slight imperfections, texture variation
- NO poreless, porcelain, or airbrushed-looking skin
- NO plastic-like smoothness or artificial perfection

FACIAL NATURALNESS:
- Slight asymmetry is required - faces are not perfectly symmetrical
- Natural skin lines when appropriate
- Authentic skin variations: slight redness, different tones
- Natural eye shape variations
- Realistic lip texture - not perfectly symmetrical

LIGHTING & COLOR:
- Natural lighting variation across face - not evenly lit
- Realistic shadows: soft, natural falloff
- Authentic skin tones: natural variation
- Real color temperature: warm or cool

MATERIAL REALISM:
- Realistic fabric textures and folds
- Authentic hair texture: individual strands, natural movement
- Real material properties: metal reflections, glass refraction
- NO plastic, shiny, or artificial-looking materials

TECHNICAL QUALITY:
- Real camera characteristics: natural depth of field, realistic focus falloff
- Authentic lens effects: subtle distortion, natural bokeh
- Realistic color grading: not over-processed
- Slight camera grain for authenticity

STRICTLY PROHIBITED:
- NO digital art, 3D render, CGI appearance
- NO symmetry or perfection
- NO over-smoothed, over-processed look
- NO artificial glow, bloom, or atmospheric effects
- NO plastic, wax, doll, or mannequin appearance

RESULT: Must look like real photograph with all natural imperfections - NOT digital art or AI generation.`;

