/**
 * Wedding Ceremony Scenarios
 * Different wedding ceremony styles
 */

import { Scenario, ScenarioId } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const WEDDING_CEREMONY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CHURCH_WEDDING,
    title: "Church Ceremony",
    description: "Traditional sacred vows",
    icon: "⛪",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their traditional church wedding ceremony, both facing camera with emotional joyful smiles, bride in stunning white wedding gown with delicate lace veil, groom in classic black tuxedo with white boutonniere, beautiful historic church interior with ornate stained glass windows casting colorful light, white floral arrangements along the aisle",
      "soft natural light through stained glass, warm ambient church lighting, sacred elegant atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "exchange sacred vows",
      "In this holy place, before God and witnesses, they promise forever. Two souls become one.",
    ),
  },
  {
    id: ScenarioId.GARDEN_WEDDING,
    title: "Garden Wedding",
    description: "Nature's blessing",
    icon: "🌸",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their beautiful garden wedding ceremony, both facing camera with radiant joyful smiles, bride in flowing white chiffon gown with flower crown, groom in light beige linen suit, standing under a lush floral arch covered in pink and white roses, manicured garden with blooming peonies and hedges",
      "natural golden afternoon sunlight, dappled light through trees, romantic outdoor garden atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "marry in nature's cathedral",
      "Surrounded by blooming flowers and gentle breezes, nature itself celebrates their union.",
    ),
  },
  {
    id: ScenarioId.BEACH_WEDDING,
    title: "Beach Wedding",
    description: "Sunset vows",
    icon: "🏖️",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their romantic beach wedding ceremony, both facing camera with joyful genuine smiles, bride in flowing white bohemian beach wedding dress with windswept hair, groom in cream linen suit, both barefoot on pristine white sand, turquoise ocean waves and stunning sunset sky, bamboo wedding arch with white fabric and tropical flowers",
      "warm golden sunset backlighting, ocean breeze atmosphere, tropical romantic beach wedding ambiance"
    ),
    storyTemplate: createStoryTemplate(
      "say I do by the ocean",
      "With the waves as their witness and the sunset painting the sky, they begin their forever.",
    ),
  },
  {
    id: ScenarioId.CASTLE_WEDDING,
    title: "Castle Wedding",
    description: "Fairytale come true",
    icon: "🏰",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their fairytale castle wedding, both facing camera with regal elegant smiles, bride in princess-style ball gown with sweetheart neckline and long train, groom in formal black and white tuxedo with tails, grand castle great hall with massive crystal chandeliers, stone walls with tapestries, ornate gold decorations",
      "warm golden chandelier lighting, dramatic castle interior ambiance, majestic fairytale atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "live their fairytale",
      "In a castle fit for royalty, their love story becomes the stuff of legends.",
    ),
  },
];
