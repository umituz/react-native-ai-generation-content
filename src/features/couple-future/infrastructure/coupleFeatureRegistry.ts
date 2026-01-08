/**
 * Couple Feature Registry
 * Configuration for couple generation feature selectors
 */

export interface CoupleFeatureOption {
  id: string;
  iconKey: string;
  labelKey: string;
}

export interface CoupleFeatureConfig {
  id: string;
  translationPrefix: string;
  hasIntensitySlider: boolean;
  selectionType: "single" | "multi";
  options: CoupleFeatureOption[];
}

export const ROMANTIC_MOOD_OPTIONS: CoupleFeatureOption[] = [
  { id: "romantic", iconKey: "heart", labelKey: "romantic" },
  { id: "mysterious", iconKey: "moon", labelKey: "mysterious" },
  { id: "magical", iconKey: "sparkles", labelKey: "magical" },
  { id: "energetic", iconKey: "flash-outline", labelKey: "energetic" },
  { id: "melancholic", iconKey: "cloud", labelKey: "melancholic" },
  { id: "passionate", iconKey: "flame", labelKey: "passionate" },
  { id: "nostalgic", iconKey: "camera", labelKey: "nostalgic" },
  { id: "futuristic", iconKey: "rocket", labelKey: "futuristic" },
];

export const ART_STYLE_OPTIONS: CoupleFeatureOption[] = [
  { id: "original", iconKey: "image", labelKey: "original" },
  { id: "cubism", iconKey: "shape", labelKey: "cubism" },
  { id: "popArt", iconKey: "color", labelKey: "popArt" },
  { id: "impressionism", iconKey: "brush", labelKey: "impressionism" },
  { id: "surrealism", iconKey: "eye", labelKey: "surrealism" },
  { id: "renaissance", iconKey: "palette", labelKey: "renaissance" },
];

export const ARTIST_STYLE_OPTIONS: CoupleFeatureOption[] = [
  { id: "vanGogh", iconKey: "brush", labelKey: "vanGogh" },
  { id: "picasso", iconKey: "shape", labelKey: "picasso" },
  { id: "fridaKahlo", iconKey: "flower", labelKey: "fridaKahlo" },
  { id: "daVinci", iconKey: "palette", labelKey: "daVinci" },
];

export const COUPLE_FEATURE_CONFIGS: Record<string, CoupleFeatureConfig> = {
  "romantic-mood": {
    id: "romantic-mood",
    translationPrefix: "romanticPhoto",
    hasIntensitySlider: true,
    selectionType: "multi",
    options: ROMANTIC_MOOD_OPTIONS,
  },
  "art-style": {
    id: "art-style",
    translationPrefix: "artStyles",
    hasIntensitySlider: true,
    selectionType: "single",
    options: ART_STYLE_OPTIONS,
  },
  "artist-style": {
    id: "artist-style",
    translationPrefix: "artistStyles",
    hasIntensitySlider: true,
    selectionType: "single",
    options: ARTIST_STYLE_OPTIONS,
  },
  wardrobe: {
    id: "wardrobe",
    translationPrefix: "wardrobe",
    hasIntensitySlider: false,
    selectionType: "single",
    options: [],
  },
};
