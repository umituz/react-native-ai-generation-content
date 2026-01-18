/**
 * Fantasy Scenarios
 * Scenarios with fantasy and fictional themes
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const FANTASY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ROYALTY,
    title: "Royal Majesty",
    description: "Rule your kingdom with grace",
    icon: "👑",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as European royalty in ornate palace throne room, both facing camera with noble dignified expressions, man in 19th-century navy military dress uniform with gold epaulettes and medals and red sash of honor, woman in magnificent ivory silk ballgown with full skirt and delicate diamond tiara and pearl choker, standing before gilded thrones under massive crystal chandelier with oil portraits of ancestors and red velvet drapes in background",
      "regal warm lighting from chandeliers with golden glow on faces and rich jewel-tone colors"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple as post-apocalyptic survivors, both facing camera with intense determined expressions, realistic dirt and grime on weathered faces, man in patched leather jacket with makeshift body armor and tactical goggles and crossbow, woman in layered practical clothing with utility vest and hunting knife at belt, standing in abandoned crumbling concrete structure overgrown with weeds with dramatic stormy sky and distant smoke plumes in background",
      "dramatic overcast lighting with muted desaturated colors and dust particles in air"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple as powerful superheroes standing on city rooftop ledge, both facing camera with heroic confident expressions and capes billowing in wind, man in sleek dark blue armored suit with glowing energy lines and silver chest emblem, woman in crimson and gold fitted costume with flowing cape and golden bracers, dramatic nighttime city skyline with millions of twinkling lights far below and searchlight beams cutting through sky in background",
      "dramatic cinematic lighting with cool blue moonlight and warm city glow from below"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple as medieval knight and lady in castle courtyard, both facing camera with noble romantic expressions, man in gleaming plate armor with house crest on tabard and sword at hip and helmet under arm, woman in elegant emerald velvet medieval gown with gold embroidery and flowing sleeves and delicate golden circlet, stone castle courtyard with climbing roses on walls and fountain and towers with flying banners in background",
      "warm golden afternoon light creating romantic atmosphere with soft shadows on stone"
    ),
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
  aiPrompt: createPhotorealisticPrompt(
    "a loving couple, {{customPrompt}}, both facing camera with genuine natural smiles",
    "warm natural lighting appropriate to the scene"
  ),
  storyTemplate: createStoryTemplate(
    "embark on their custom adventure together",
    "Their unique journey unfolds exactly as they imagined, creating memories that will last a lifetime.",
  ),
  requiresPhoto: true,
  outputType: "image",
};
