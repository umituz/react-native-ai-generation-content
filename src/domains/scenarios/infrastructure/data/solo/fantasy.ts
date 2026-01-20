/**
 * Solo Fantasy Scenarios
 * Single-person fantasy portraits
 */

import { Scenario, ScenarioId, ScenarioCategory } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const SOLO_FANTASY_SCENARIOS: Scenario[] = [
  {
    id: ScenarioId.SOLO_DRAGON_RIDER,
    category: ScenarioCategory.SOLO_FANTASY,
    title: "Dragon Rider",
    description: "Epic dragon rider portrait",
    icon: "🐉",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a powerful warrior riding a majestic dragon in flight, person wearing ornate battle armor with dragon scale patterns, confident determined expression looking at camera, massive dragon with spread wings beneath them, volcanic mountains and stormy clouds in background",
      "dramatic golden hour lighting with fire glow and epic atmosphere"
    ),
    storyTemplate: createStoryTemplate("soar through the skies", "A legendary bond between rider and dragon."),
  },
  {
    id: ScenarioId.SOLO_WIZARD_MASTER,
    category: ScenarioCategory.SOLO_FANTASY,
    title: "Wizard Master",
    description: "Powerful sorcerer portrait",
    icon: "🧙",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a wise powerful wizard in an ancient mystical tower, person wearing elaborate robes with glowing magical runes, holding a crystal staff emanating blue magical energy, intense focused expression looking at camera, ancient spell books and floating candles in background",
      "mystical blue and purple lighting with magical particles floating in air"
    ),
    storyTemplate: createStoryTemplate("master the arcane arts", "The greatest sorcerer of the realm."),
  },
  {
    id: ScenarioId.SOLO_ELVEN_ARCHER,
    category: ScenarioCategory.SOLO_FANTASY,
    title: "Elven Archer",
    description: "Mystical elf warrior",
    icon: "🏹",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "an elegant elven archer in an enchanted forest, person with pointed ears wearing flowing green and silver armor, holding an ornate bow with arrow drawn, serene yet alert expression looking at camera, ancient trees with glowing magical flowers in background",
      "soft ethereal forest lighting with golden sun rays filtering through leaves"
    ),
    storyTemplate: createStoryTemplate("protect the ancient woods", "Guardian of the eternal forest."),
  },
  {
    id: ScenarioId.SOLO_DARK_KNIGHT,
    category: ScenarioCategory.SOLO_FANTASY,
    title: "Dark Knight",
    description: "Mysterious armored warrior",
    icon: "⚔️",
    imageUrl: "https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a mysterious dark knight in gothic castle ruins, person wearing black ornate plate armor with silver engravings, holding a massive two-handed sword, intense brooding expression looking at camera, crumbling stone walls and moonlit sky in background",
      "dramatic moonlight with mist and shadows creating mysterious atmosphere"
    ),
    storyTemplate: createStoryTemplate("walk the path of shadows", "A knight sworn to darkness."),
  },
  {
    id: ScenarioId.SOLO_FOREST_FAIRY,
    category: ScenarioCategory.SOLO_FANTASY,
    title: "Forest Fairy",
    description: "Magical woodland spirit",
    icon: "🧚",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a beautiful magical fairy in a moonlit forest glade, person with delicate iridescent wings wearing a dress made of flower petals and leaves, gentle enchanting smile looking at camera, glowing mushrooms and fireflies surrounding them",
      "soft magical moonlight with sparkles and bioluminescent glow"
    ),
    storyTemplate: createStoryTemplate("dance with the moonlight", "Spirit of the enchanted woods."),
  },
];

