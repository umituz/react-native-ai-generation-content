/**
 * Base Prompt Structure Constants
 * Core prompt building blocks for AI image generation
 * Optimized for Gemini 3 Pro Image (nano-banana-2) — natural language format
 */

export const IDENTITY_PRESERVATION_CORE = `IDENTITY PRESERVATION (CRITICAL - HIGHEST PRIORITY):
Preserve the EXACT facial appearance from the uploaded photo with 100% accuracy.

MANDATORY REQUIREMENTS - FACIAL STRUCTURE:
- Keep EVERY facial detail IDENTICAL: bone structure, facial proportions, eye shape, eye color, iris pattern, pupil size, nose shape/size, nostril shape, lip shape/fullness, cupid's bow, cheekbones, jawline, chin shape, ear shape and position
- Preserve EXACT facial proportions and face shape - do NOT elongate, widen, narrow, or alter face geometry in any way
- Maintain the SAME head shape and profile - forehead, temples, cheek areas, jawline must match perfectly
- Keep the SAME eye spacing, eye size, and eye angle - no changes to eye position or proportion
- Preserve the SAME nose length, width, bridge shape, and tip - no nose reshaping
- Keep lip proportions, mouth width, and smile line EXACT - no lip augmentation or reshaping

MANDATORY REQUIREMENTS - SKIN & TEXTURE:
- Preserve ALL natural skin characteristics: skin texture, pores (visible but not exaggerated), fine lines, smile lines, crow's feet, forehead lines, nasolabial folds
- Keep ALL unique markings: freckles, moles, birthmarks, scars, acne marks, hyperpigmentation, sun damage, dimples
- Maintain EXACT skin undertones: warm, cool, or neutral undertones must be preserved
- Preserve natural skin imperfections: visible pores, slight asymmetry, natural skin gloss/texture
- Keep the SAME skin quality: oily, dry, combination, normal - do not change skin type
- NO artificial skin smoothing - real skin has texture, pores, and slight imperfections

MANDATORY REQUIREMENTS - EXPRESSION & PERSONALITY:
- Preserve the person's natural expression - micro-expressions, smile intensity, eye engagement
- Keep natural head position and gaze direction
- Maintain personality traits visible in the face: confidence, warmth, intensity, etc.

STRICTLY PROHIBITED - PLASTIC LOOK PREVENTION:
- Do NOT create smooth, poreless, porcelain-like skin - this looks plastic and artificial
- Do NOT add artificial glow, shine, or airbrushed effect
- Do NOT symmetrically perfect features - real faces have natural asymmetry
- Do NOT enlarge or enhance eyes, lips, or any feature
- Do NOT change facial proportions to fit beauty ideals
- Do NOT add makeup if not present in original - or alter existing makeup
- Do NOT change skin tone, whiten teeth, or alter natural colors
- Do NOT create doll-like, wax figure, or 3D rendered appearance
- Do NOT use AI beauty filters or face-tuning effects
- Do NOT make the person look younger, older, or different in age
- Do NOT alter ethnicity or racial features

RECOGNIZABILITY TEST:
The person MUST be instantly recognizable as themselves at first glance. If a friend, family member, or colleague wouldn't immediately recognize them as the same person, the generation has FAILED.

RESULT REQUIREMENT:
The final image must look like a REAL, unedited photograph of the ACTUAL person - with all natural imperfections, textures, and unique characteristics intact. It should look like a candid photo taken with a real camera, not an AI-generated or digitally altered image.`;

export const IDENTITY_PRESERVATION_COUPLE = `IDENTITY PRESERVATION (CRITICAL - HIGHEST PRIORITY):
Preserve the EXACT facial appearance of BOTH people from the uploaded photos with 100% accuracy.

MANDATORY REQUIREMENTS - FACIAL STRUCTURE FOR BOTH PERSONS:
- Keep EVERY facial detail IDENTICAL for both individuals: bone structure, facial proportions, eye shape, eye color, iris pattern, pupil size, nose shape/size, nostril shape, lip shape/fullness, cupid's bow, cheekbones, jawline, chin shape, ear shape and position
- Preserve EXACT facial proportions and face shapes for both - do NOT elongate, widen, narrow, or alter face geometry
- Maintain the SAME head shapes and profiles for both people
- Keep the SAME eye spacing, size, and angle for both individuals
- Preserve the SAME nose length, width, bridge shape, and tip for both
- Keep lip proportions, mouth width, and smile line EXACT for both people

MANDATORY REQUIREMENTS - SKIN & TEXTURE FOR BOTH:
- Preserve ALL natural skin characteristics for both: skin texture, pores, fine lines, smile lines, crow's feet, forehead lines, nasolabial folds
- Keep ALL unique markings for both: freckles, moles, birthmarks, scars, acne marks, hyperpigmentation, sun damage, dimples
- Maintain EXACT skin undertones for both: warm, cool, or neutral undertones must be preserved
- Preserve natural skin imperfections for both: visible pores, slight asymmetry, natural skin gloss/texture
- Keep the SAME skin quality for both: oily, dry, combination, normal
- NO artificial skin smoothing for either person - real skin has texture and imperfections

MANDATORY REQUIREMENTS - EXPRESSION & PERSONALITY:
- Preserve natural expressions and personalities of both individuals
- Keep authentic micro-expressions, smile intensity, eye engagement for both
- Maintain natural head positions and gaze directions for both people

COUPLE REQUIREMENTS - POSITIONING & INTERACTION:
- The resulting image MUST show BOTH individuals together as a couple
- Both people must be positioned naturally together with authentic interaction
- Maintain accurate relative heights and proportions between the two people
- Preserve natural body language and chemistry between the couple
- Position them as they would naturally stand or sit together

STRICTLY PROHIBITED - PLASTIC LOOK PREVENTION FOR BOTH:
- Do NOT create smooth, poreless, porcelain-like skin for either person - this looks plastic
- Do NOT add artificial glow, shine, or airbrushed effect to either face
- Do NOT symmetrically perfect features - real faces have natural asymmetry
- Do NOT enlarge or enhance eyes, lips, or any feature of either person
- Do NOT change facial proportions to fit beauty ideals for either person
- Do NOT add makeup, change skin tones, or alter natural colors for either
- Do NOT create doll-like, wax figure, or 3D rendered appearances
- Do NOT use AI beauty filters or face-tuning effects on either person
- Do NOT make either person look younger, older, or different in age
- Do NOT alter ethnicity or racial features of either person

RECOGNIZABILITY TEST FOR BOTH:
BOTH people MUST be instantly recognizable as themselves at first glance. If friends, family members, or colleagues wouldn't immediately recognize them as the same two people, the generation has FAILED.

RESULT REQUIREMENT:
The final image must look like a REAL, unedited photograph of the ACTUAL two people - with all natural imperfections, textures, and unique characteristics intact for both individuals. It should look like a candid couple photo taken with a real camera, not an AI-generated or digitally altered image.`;

export const PHOTOREALISTIC_RENDERING = `STYLE - PHOTOREALISTIC QUALITY (CRITICAL):
Create an authentic photograph with real-world camera characteristics, NOT digital art.

CAMERA & PHOTOGRAPHIC QUALITY:
- Real photograph captured with professional camera (DSLR/mirrorless quality)
- Natural in-camera optical characteristics: natural depth of field, realistic bokeh, authentic lens effects
- Photographic lighting: natural light, ambient light, or studio lighting - all must look realistic
- Realistic shadows: soft natural shadows, no harsh or artificial-looking shadows
- Authentic color grading: natural colors, realistic skin tones, no over-saturation or over-processing
- Real camera grain/noise texture: subtle film grain or digital noise for authenticity
- Natural sharpness: realistic focus fall-off, not artificially sharpened

REALISTIC TEXTURES & MATERIALS:
- Real skin texture: visible pores, skin variation, natural imperfections, micro-textures
- Authentic hair texture: individual hair strands, natural shine, realistic hair movement
- Realistic fabric textures: cloth weave, natural folds, authentic material appearance
- Authentic material properties: metal reflections, glass refraction, natural subsurface scattering

NATURAL ENVIRONMENT & LIGHTING:
- Environmentally realistic lighting and shadows
- Natural color temperature and white balance
- Realistic environmental reflections and subsurface scattering
- Authentic atmospheric perspective and depth

STRICTLY PROHIBITED - AVOID ARTIFICIAL LOOK:
- NO digital art, 3D render, CGI, or computer-generated appearance
- NO plastic, wax, porcelain, or doll-like skin texture
- NO over-smoothed, airbrushed, or artificially perfect faces
- NO anime, cartoon, illustration, sketch, or painting style
- NO symmetry or perfection - real photographs have natural imperfections
- NO artificial glowing, overly shiny, or unrealistic skin
- NO exaggerated colors, saturation, or contrast
- NO fake depth of field or artificial bokeh effects
- NO 3D modeling, ray tracing, or rendered appearance

TECHNICAL QUALITY:
- High resolution, sharp details where in focus
- Natural focus fall-off and depth of field
- Realistic motion blur if applicable
- Authentic camera lens characteristics and distortion

RESULT REQUIREMENT:
The image must be indistinguishable from a real photograph taken with a professional camera. It should NOT look like AI generation, digital art, 3D render, or any form of computer graphics. Viewers should believe this is an actual photograph.`;

export const NATURAL_POSE_GUIDELINES = `POSE - NATURAL BODY LANGUAGE (CRITICAL FOR REALISM):
Create authentic, relaxed poses that look like real candid photography.

NATURAL POSTURE & BODY LANGUAGE:
- Relaxed, natural stance - no stiff or rigid posture
- Authentic body language appropriate to the scenario context
- Natural head tilt and neck position - not forced or exaggerated
- Realistic shoulder position and arm placement
- Natural hand positioning - not curled or contorted
- Authentic weight distribution and balance

FACIAL EXPRESSION & GAZE:
- Natural, relaxed facial expression - not forced or exaggerated
- Authentic eye contact or gaze direction appropriate to the scenario
- Natural smile intensity - not overly bright or artificial
- Realistic micro-expressions and subtle emotional nuances
- Natural blink and eye engagement

PHOTOGRAPHIC AUTHENTICITY:
- Pose should look like a candid moment captured by a photographer
- Body language should feel spontaneous, not posed or staged
- Natural slight imperfections in posture make it more realistic
- Authentic human movement and relaxation

STRICTLY PROHIBITED - UNNATIONAL POSES:
- NO absurd or contorted body positions
- NO physically impossible poses or extreme body twisting
- NO stiff, rigid, or mannequin-like posture
- NO exaggerated or theatrical expressions
- NO overly symmetrical or perfect posing
- NO unnatural arm, leg, or body angles
- NO forced or artificial-looking body language
- NO dance, ballet, or exaggerated performative poses
- NO anatomically incorrect positions

RESULT REQUIREMENT:
The person should look like a real human being naturally positioned in a candid photograph, not a posed model or digitally created figure.`;

export const NATURAL_POSE_GUIDELINES_COUPLE = `POSE - NATURAL COUPLE INTERACTION (CRITICAL FOR REALISM):
Create authentic, relaxed couple poses with genuine interaction and chemistry.

NATURAL POSTURE & BODY LANGUAGE FOR BOTH:
- Relaxed, natural stance for both people - no stiff or rigid posture
- Authentic body language and interaction appropriate to the scenario
- Natural head positions and angles for both individuals
- Realistic positioning relative to each other - authentic couple dynamics
- Natural arm and hand placement between the couple
- Authentic physical connection and proximity

FACIAL EXPRESSIONS & GAZE:
- Natural, relaxed facial expressions for both - not forced or exaggerated
- Authentic eye contact between the couple or toward camera as appropriate
- Natural smile intensity for both - not overly bright or artificial
- Realistic micro-expressions and emotional connection
- Natural engagement and chemistry between the two people

COUPLE INTERACTION & CHEMISTRY:
- Authentic couple dynamics - natural comfort and connection
- Realistic physical proximity and personal space
- Natural touch or contact if appropriate to the scenario
- Genuine interaction and engagement between the two
- Spontaneous-looking moment, not staged or posed

PHOTOGRAPHIC AUTHENTICITY:
- Pose should look like a candid couple moment captured by a photographer
- Body language should feel spontaneous and authentic, not posed
- Natural slight imperfections in positioning make it more realistic
- Authentic human interaction and relaxation

STRICTLY PROHIBITED - UNNATIONAL COUPLE POSES:
- NO absurd or contorted couple positions
- NO physically impossible poses or extreme body twisting
- NO stiff, rigid, or mannequin-like posture for either person
- NO exaggerated or theatrical expressions
- NO overly symmetrical or perfect couple posing
- NO unnatural arm, leg, or body angles
- NO forced or artificial-looking body language
- NO dance, ballet, or exaggerated performative poses
- NO anatomically incorrect positions for either person
- NO fake or staged-looking couple interactions

RESULT REQUIREMENT:
Both people should look like a real couple naturally interacting in a candid photograph, not posed models or digitally created figures. The chemistry and interaction should feel genuine and spontaneous.`;

export const ANTI_PLASTIC_DIRECTIVES = `ANTI-PLASTIC DIRECTIVES (CRITICAL - PREVENT ARTIFICIAL APPEARANCE):
These directives ensure the generated image looks like a real photograph, NOT digital art or AI generation.

SKIN TEXTURE & REALISM:
- REAL skin texture: visible pores must be present, not completely smooth
- Natural skin variation: slight imperfections, unevenness, texture variation
- Authentic skin quality: normal pores, slight gloss in T-zone, natural skin grain
- NO poreless, porcelain, or airbrushed-looking skin
- NO plastic-like smoothness or artificial perfection
- Real skin has micro-texture - preserve this authenticity

FACIAL NATURAL IMPERFECTIONS:
- Slight asymmetry is natural and required - faces are not perfectly symmetrical
- Natural skin lines: smile lines, forehead lines, crow's feet when appropriate
- Authentic skin variations: slight redness, different skin tones across face
- Natural eye shape variations - not perfectly identical or idealized
- Realistic lip texture and shape - not perfectly symmetrical or enhanced
- Natural hair texture and movement - not plastic or helmet-like

LIGHTING & COLOR NATURALNESS:
- Natural lighting variation across the face - not evenly lit
- Realistic shadows: soft, natural shadow falloff, not harsh or artificial
- Authentic skin tones: natural variation, not uniform color
- Real color temperature: warm or cool lighting, not artificial color balance
- Natural highlights and shadows on skin - not painted-on looking

MATERIAL & SURFACE REALISM:
- Realistic fabric textures and folds - not plastic-looking clothing
- Authentic hair texture: individual strands, natural movement, not helmet-hair
- Real material properties: metal reflections, glass refraction, natural subsurface scattering
- NO plastic, shiny, or artificial-looking materials

COMPOSITION & PHOTOGRAPHIC QUALITY:
- Real camera characteristics: natural depth of field, realistic focus falloff
- Authentic lens effects: subtle lens distortion, natural bokeh
- Realistic color grading: not over-processed or over-saturated
- Natural sharpness: realistic focus fall-off, not artificially sharpened everywhere
- Slight camera grain or noise for photographic authenticity

TECHNICAL ANTI-PLASTIC MEASURES:
- NO digital art, 3D render, or CGI appearance
- NO symmetry or perfection - real photographs have natural imperfections
- NO over-smoothed, over-processed, or over-enhanced look
- NO artificial glow, bloom, or atmospheric effects that look digital
- NO perfect geometry or proportions - real humans have natural variation
- NO plastic, wax, doll, or mannequin appearance
- NO AI-generated looking artifacts or patterns

RECOGNITION TEST:
If the image looks like digital art, 3D render, or AI generation - it has FAILED. It must look like a real photograph with all natural imperfections and authenticity intact.`;

