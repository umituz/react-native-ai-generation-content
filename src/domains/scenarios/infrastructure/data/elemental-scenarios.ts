import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ELEMENTAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FIRE_ICE_DYNAMIC,
    title: "Fire & Ice",
    description: "Elemental opposites",
    icon: "🔥",
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    aiPrompt:
      "A couple standing back-to-back, man controlling a swirl of intense orange fire, woman controlling a swirl of shimmering cyan ice crystals, glowing runes on their skin, both looking at the camera with powerful gazes, dark volcanic background with snow falling, epic elemental contrast",
    storyTemplate: createStoryTemplate(
      "balance the extreme forces of nature with your shared power",
      "They are the perfect harmony of opposites. Like fire and ice, their love creates a world where anything is possible.",
    ),
  },
  {
    id: ScenarioId.EARTH_SHAPER_STRENGTH,
    title: "Earth Shapers",
    description: "Solid as a rock",
    icon: "⛰️",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt:
      "A couple standing on a cliffside, hands glowing with golden light as they lift massive floating rocks from the ground, wearing rugged earth-toned robes with leather armor, both looking at the horizon with determination, vast canyon background, strength and stability",
    storyTemplate: createStoryTemplate(
      "found your life on the unshakeable strength of the earth",
      "Their connection is as deep as the roots of the world. Together, they can move mountains and build a future that stands for eternity.",
    ),
  },
  {
    id: ScenarioId.STORM_BRINGER_POWER,
    title: "Storm Bringers",
    description: "Lightning in your veins",
    icon: "⚡",
    imageUrl:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800",
    aiPrompt:
      "A couple standing on a high mountain peak at night, man raising a hand as lightning strikes behind him, woman's eyes glowing with electric blue light, wind blowing their clothes and hair, both looking at camera with fierce smiles, dark stormy sky with purple clouds, raw energy and power",
    storyTemplate: createStoryTemplate(
      "ride the storm and command the lightning together",
      "They don't fear the storm; they are the storm. A love that's as electric and unstoppable as a bolt from the heavens.",
    ),
  },
];
