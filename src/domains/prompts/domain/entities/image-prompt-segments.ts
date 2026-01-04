/**
 * Image Prompt Segments - Reusable building blocks for AI image prompts
 */

export const IDENTITY_SEGMENTS = {
  samePerson: "same person",
  preserveIdentity: "preserve identity",
  preserveGender: "STRICTLY preserve original gender",
  keepGender: "keep exact same gender as input",
  maintainGender: "maintain original sex",
  sameFeatures: "same facial features",
  preserveFace: "preserve original face structure",
  sameHairColor: "same hair color as original",
  sameEyeColor: "same eye color as original",
} as const;

export const IDENTITY_NEGATIVE_SEGMENTS = {
  genderSwap: "gender swap",
  genderChange: "gender change",
  sexChange: "sex change",
  maleToFemale: "male to female",
  femaleToMale: "female to male",
  differentPerson: "different person",
  wrongGender: "wrong gender",
  changedIdentity: "changed identity",
  differentFace: "different face",
  changedGender: "changed gender",
} as const;

export const ANIME_STYLE_SEGMENTS = {
  animePortrait: "anime style portrait",
  base: "2D anime illustration",
  japaneseStyle: "japanese anime art style",
  celShaded: "cel-shaded anime character",
  animeEyes: "large sparkling anime eyes with detailed iris",
  animeSkin: "smooth cel-shaded skin with subtle anime blush",
  animeHair: "stylized anime hair with highlights",
  ghibli: "Studio Ghibli inspired",
  vibrantColors: "vibrant anime colors",
  cleanLineart: "clean anime lineart",
  professionalPortrait: "professional anime portrait",
  handDrawn: "hand drawn anime",
  mangaStyle: "manga style",
} as const;

export const QUALITY_SEGMENTS = {
  highQuality: "high quality",
  detailed: "highly detailed",
  sharp: "sharp focus",
  professional: "professional",
  masterpiece: "masterpiece",
  bestQuality: "best quality",
} as const;

export const QUALITY_NEGATIVE_SEGMENTS = {
  lowQuality: "low quality",
  blurry: "blurry",
  pixelated: "pixelated",
  artifacts: "jpeg artifacts",
  watermark: "watermark",
  signature: "signature",
} as const;

export const ANTI_REALISM_SEGMENTS = {
  photorealistic: "photorealistic",
  realisticPhoto: "realistic photo",
  render3D: "3D render",
  hyperrealistic: "hyperrealistic",
  realPerson: "real person",
  naturalSkin: "natural skin texture",
  pores: "pores",
  wrinkles: "wrinkles",
} as const;

export const ANATOMY_NEGATIVE_SEGMENTS = {
  deformedFace: "deformed face",
  badAnatomy: "bad anatomy",
  extraLimbs: "extra limbs",
  mutatedHands: "mutated hands",
  extraFingers: "extra fingers",
  missingFingers: "missing fingers",
} as const;

export const PRESET_COLLECTIONS = {
  identityPreservation: Object.values(IDENTITY_SEGMENTS),
  animeStyle: Object.values(ANIME_STYLE_SEGMENTS),
  highQuality: Object.values(QUALITY_SEGMENTS),
  antiRealism: Object.values(ANTI_REALISM_SEGMENTS),
  anatomyNegative: Object.values(ANATOMY_NEGATIVE_SEGMENTS),
  identityNegative: Object.values(IDENTITY_NEGATIVE_SEGMENTS),
} as const;

export type IdentitySegment = keyof typeof IDENTITY_SEGMENTS;
export type AnimeStyleSegment = keyof typeof ANIME_STYLE_SEGMENTS;
export type QualitySegment = keyof typeof QUALITY_SEGMENTS;
