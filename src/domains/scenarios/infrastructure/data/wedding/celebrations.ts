/**
 * Wedding Celebration Scenarios
 * Reception, dance, and honeymoon
 */

import { Scenario, ScenarioId } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const WEDDING_CELEBRATION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.RECEPTION_PARTY,
    title: "Wedding Reception",
    description: "Party celebration",
    icon: "🎆",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at their wedding reception celebration, both facing camera with ecstatic joyful smiles, bride in elegant white reception dress, groom in formal suit, surrounded by cheering guests in formal attire, elegant ballroom venue with string lights, white draping, and elaborate floral centerpieces",
      "warm festive reception lighting, soft string lights and candles, joyful celebration atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate with everyone they love",
      "The ceremony is over, the party begins. Tonight, love is the only thing that matters.",
    ),
  },
  {
    id: ScenarioId.FIRST_DANCE,
    title: "First Dance",
    description: "As husband and wife",
    icon: "💃",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a newlywed couple sharing their first dance as husband and wife, both facing camera while dancing elegantly, bride in flowing white wedding gown, groom in classic black tuxedo, romantic dance floor with soft spotlight, guests watching adoringly from surrounding tables with candles",
      "soft romantic spotlight, warm ambient dance floor lighting, intimate magical first dance atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "share their first dance",
      "In each other's arms, they dance as husband and wife for the first time. The world fades away.",
    ),
  },
  {
    id: ScenarioId.CAKE_CUTTING,
    title: "Cake Cutting",
    description: "Sweet tradition",
    icon: "🍰",
    imageUrl:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple cutting their elegant wedding cake together, both facing camera with playful loving smiles, hands together on silver cake knife, bride in white gown, groom in tuxedo, beautiful four-tier white wedding cake with sugar flowers and gold accents on decorated table",
      "soft warm reception lighting, romantic ambient glow, sweet celebratory moment"
    ),
    storyTemplate: createStoryTemplate(
      "cut their wedding cake",
      "A sweet moment, a playful tradition. The first of many things they'll share as one.",
    ),
  },
  {
    id: ScenarioId.HONEYMOON,
    title: "Honeymoon Bliss",
    description: "Just married paradise",
    icon: "🌅",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a blissful newlywed couple on their honeymoon vacation, both facing camera with relaxed happy smiles, man in white linen shirt and shorts, woman in elegant flowing tropical maxi dress, relaxing by infinity pool at luxury resort, stunning turquoise ocean view and palm trees in background",
      "warm tropical sunlight, golden hour glow, romantic paradise honeymoon atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "begin their honeymoon",
      "Just the two of them, in paradise. The wedding is over, but the adventure of marriage has just begun.",
    ),
  },
];
