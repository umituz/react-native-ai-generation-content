/**
 * Couple Prompt Enhancer
 * Enhances base prompts with feature-specific selections
 */

import type { CoupleFeatureSelection } from "../domain/types";

const MOOD_DESCRIPTIONS: Record<string, string> = {
  romantic: "warm romantic tones, soft candlelight, intimate atmosphere",
  mysterious: "moody low-key lighting, deep shadows, enigmatic ambiance",
  magical: "sparkly magical effects, ethereal glow, fairy-tale atmosphere",
  energetic: "vibrant dynamic energy, bright lighting, lively atmosphere",
  melancholic: "soft melancholic tones, gentle shadows, contemplative mood",
  passionate: "intense passionate colors, dramatic lighting, emotional depth",
  nostalgic: "vintage nostalgic feel, warm sepia tones, timeless quality",
  futuristic: "modern futuristic aesthetic, neon accents, sci-fi atmosphere",
};

const ART_STYLE_DESCRIPTIONS: Record<string, string> = {
  cubism: "geometric cubist style with angular shapes and fragmented forms",
  popArt: "bold pop art style with bright vibrant colors and graphic elements",
  impressionism: "impressionist style with visible brushstrokes and light effects",
  surrealism: "surrealist style with dreamlike imagery and unexpected juxtapositions",
  renaissance: "classical renaissance style with rich details and balanced composition",
};

const ARTIST_STYLE_DESCRIPTIONS: Record<string, string> = {
  vanGogh: "Van Gogh's post-impressionist style with thick expressive brushstrokes and swirling patterns",
  picasso: "Picasso's cubist style with geometric fragmentation and multiple perspectives",
  fridaKahlo: "Frida Kahlo's vibrant symbolic style with rich colors and personal imagery",
  daVinci: "Leonardo da Vinci's renaissance mastery with subtle sfumato and perfect proportion",
};

const getIntensityLabel = (intensity: number): string => {
  if (intensity >= 75) return "strong";
  if (intensity >= 50) return "moderate";
  return "subtle";
};

const getArtistIntensityLabel = (intensity: number): string => {
  if (intensity >= 75) return "strong homage to";
  if (intensity >= 50) return "inspired by";
  return "subtle influence of";
};

export const enhanceCouplePrompt = (
  basePrompt: string,
  selections: CoupleFeatureSelection
): string => {
  let enhanced = basePrompt;

  if (selections.romanticMoods && selections.romanticMoods.length > 0) {
    const moodDescriptions = selections.romanticMoods
      .map((mood) => MOOD_DESCRIPTIONS[mood])
      .filter(Boolean)
      .join(", ");

    if (moodDescriptions) {
      const intensity = selections.romanticIntensity || 70;
      const label = getIntensityLabel(intensity);
      enhanced += `. Apply ${label} ${moodDescriptions}`;
    }
  }

  if (selections.artStyle && selections.artStyle !== "original") {
    const styleDescription = ART_STYLE_DESCRIPTIONS[selections.artStyle];
    if (styleDescription) {
      const intensity = selections.artStyleIntensity || 80;
      const label = getIntensityLabel(intensity);
      enhanced += `. Render in ${label} applied ${styleDescription}`;
    }
  }

  if (selections.artist) {
    const artistDescription = ARTIST_STYLE_DESCRIPTIONS[selections.artist];
    if (artistDescription) {
      const intensity = selections.artistIntensity || 70;
      const label = getArtistIntensityLabel(intensity);
      enhanced += `. Create in ${label} ${artistDescription}`;
    }
  }

  return enhanced;
};
