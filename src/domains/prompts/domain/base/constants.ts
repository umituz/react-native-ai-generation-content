/**
 * Base Prompt Structure Constants
 * Core prompt building blocks for AI image generation
 * Optimized for Gemini 3 Pro Image (nano-banana-2) — natural language format
 */

export const IDENTITY_PRESERVATION_CORE = `IDENTITY PRESERVATION (CRITICAL):
Preserve EXACT facial features: bone structure, skin tone, eye/hair color. NO smoothing. Must be instantly recognizable.`;

export const IDENTITY_PRESERVATION_COUPLE = `IDENTITY PRESERVATION (CRITICAL):
Preserve EXACT facial features for BOTH people. Same requirements as single. NO smoothing. Both must be instantly recognizable.`;

export const PHOTOREALISTIC_RENDERING = `STYLE - PHOTOREALISTIC QUALITY (CRITICAL):
Real photograph quality - NOT digital art or CGI.

REQUIREMENTS:
- Professional camera: natural depth of field, realistic bokeh
- Photographic lighting with soft shadows
- Authentic skin tones, no over-saturation
- Real textures: visible skin pores, hair strands
- Subtle camera grain

STRICTLY PROHIBITED:
- NO digital art, 3D render, CGI
- NO plastic, wax, doll-like skin
- NO anime, cartoon, illustration
- NO artificial glow or perfection

RESULT: Must look like real photograph.`;

export const NATURAL_POSE_GUIDELINES = `POSE - NATURAL BODY LANGUAGE (CRITICAL):
Authentic, relaxed candid poses.

REQUIREMENTS:
- Relaxed stance - no stiff posture
- Natural body language for scenario
- Natural hand positioning
- Authentic weight distribution

FACIAL EXPRESSION:
- Relaxed expression - not forced
- Natural eye contact
- Realistic smile intensity

STRICTLY PROHIBITED:
- NO contorted or impossible poses
- NO stiff or mannequin-like posture
- NO exaggerated expressions
- NO unnatural body angles

RESULT: Real human in candid photo.`;

export const NATURAL_POSE_GUIDELINES_COUPLE = `POSE - NATURAL COUPLE INTERACTION (CRITICAL):
Authentic, relaxed couple poses with genuine chemistry.

REQUIREMENTS:
- Relaxed stance for both
- Natural body language and interaction
- Realistic positioning relative to each other
- Natural arm/hand placement
- Authentic physical proximity

FACIAL EXPRESSIONS:
- Natural expressions for both
- Authentic eye contact
- Realistic chemistry

STRICTLY PROHIBITED:
- NO contorted poses
- NO stiff posture
- NO exaggerated expressions
- NO fake interactions

RESULT: Real couple naturally interacting.`;

export const ANTI_PLASTIC_DIRECTIVES = `ANTI-PLASTIC DIRECTIVES (CRITICAL):
Real photograph look - NOT digital art.

SKIN TEXTURE:
- Visible pores required
- Natural skin variation
- NO poreless or porcelain skin
- NO plastic smoothness

FACIAL NATURALNESS:
- Slight asymmetry required
- Natural skin lines and variations
- Realistic features

LIGHTING & COLOR:
- Natural lighting variation
- Realistic shadows
- Authentic skin tones

MATERIAL REALISM:
- Realistic fabric textures
- Authentic hair texture
- Real material properties

TECHNICAL QUALITY:
- Natural depth of field
- Subtle camera grain

STRICTLY PROHIBITED:
- NO digital art or CGI
- NO symmetry or perfection
- NO over-smoothed look
- NO plastic or doll appearance

RESULT: Real photograph with natural imperfections.`;

