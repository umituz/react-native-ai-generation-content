/**
 * Fantasy Scenarios
 * Scenarios with fantasy and fictional themes
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const FANTASY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ROYALTY,
    title: "Royal Majesty",
    description: "Rule your kingdom with grace",
    icon: "👑",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple as royalty in an ornate palace, both standing regally and looking at the camera with noble expressions, dressed in 19th-century formal suit with medals and elegant ballgown with tiara, ornate palace interior with grand chandeliers in background, majestic and noble",
    storyTemplate: createStoryTemplate(
      "reign over their magnificent kingdom",
      "In their own fairy tale, they rule with wisdom and grace, their love story legendary throughout the land.",
    ),
  },

  {
    id: ScenarioId.SURVIVORS,
    title: "Apocalypse Survivors",
    description: "United through the chaos",
    icon: "🔥",
    imageUrl:
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple as apocalypse survivors, both looking at the camera with intense determined expressions, dressed in practical survival gear rugged and weathered, dirt and grit on skin, abandoned post-apocalyptic structure under dramatic sky in background, intense and dramatic",
    storyTemplate: createStoryTemplate(
      "survive against all odds",
      "When the world fell apart, they found strength in each other. Together, they'll rebuild what was lost.",
    ),
  },
  {
    id: ScenarioId.SUPERHERO,
    title: "Power Heroes",
    description: "Legendary heroes, unstoppable duo",
    icon: "🦸",
    imageUrl:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop&q=60",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89b07e/lyZ-QUwPRX2LMw3nrYrrj.jpg",
    aiPrompt:
      "A couple as superheroes standing on a rooftop, both looking at the camera with heroic powerful expressions, dressed in sleek modern costumes with capes, dramatic city rooftop at night with city lights below in background, epic and powerful",
    storyTemplate: createStoryTemplate(
      "protect the world as legendary heroes",
      "By day, ordinary lovers. By night, the city's greatest protectors. Their love is their superpower.",
    ),
  },

  {
    id: ScenarioId.MEDIEVAL,
    title: "Medieval Legends",
    description: "Knights of honor and romance",
    icon: "⚔️",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a3b6e/JahAKdSmr4YsvKvjjl7Wm.jpg",
    previewImageUrl:
      "https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple as medieval legends, both looking at the camera with noble expressions, dressed in knight armor and elegant medieval gown, castle courtyard with romantic atmosphere in background, legendary and historic",
    storyTemplate: createStoryTemplate(
      "live a tale of honor and romance",
      "In an age of knights and castles, their love story becomes the stuff of legends, sung by bards for generations.",
    ),
  },
];

export const CUSTOM_SCENARIO: Omit<Scenario, 'category'> = {
  id: ScenarioId.CUSTOM,
  title: "Custom Dream",
  description: "Design your perfect scene",
  icon: "🎨",
  imageUrl:
    "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=800&auto=format&fit=crop&q=60",
  aiPrompt:
    "A loving couple, {{customPrompt}}, both looking at the camera, warm lighting",
  storyTemplate: createStoryTemplate(
    "embark on their custom adventure together",
    "Their unique journey unfolds exactly as they imagined, creating memories that will last a lifetime.",
  ),
  requiresPhoto: true,
  outputType: "image",
};
