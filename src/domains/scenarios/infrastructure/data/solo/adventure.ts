/**
 * Solo Adventure Scenarios
 * Single-person adventure portraits
 */

import { Scenario, ScenarioId, ScenarioCategory } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const SOLO_ADVENTURE_SCENARIOS: Scenario[] = [
  {
    id: ScenarioId.SOLO_MOUNTAIN_CLIMBER,
    category: ScenarioCategory.SOLO_ADVENTURE,
    title: "Mountain Climber",
    description: "Epic summit conquest",
    icon: "🏔️",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a determined mountain climber at a snowy peak summit, person wearing professional climbing gear with ice axes and harness, triumphant victorious expression looking at camera, breathtaking panoramic view of mountain range and clouds below",
      "bright crisp mountain sunlight with dramatic sky and snow sparkle"
    ),
    storyTemplate: createStoryTemplate("conquer the highest peaks", "Standing on top of the world."),
  },
  {
    id: ScenarioId.SOLO_DESERT_EXPLORER,
    category: ScenarioCategory.SOLO_ADVENTURE,
    title: "Desert Explorer",
    description: "Sahara expedition",
    icon: "🏜️",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "an adventurous explorer in vast golden sand dunes, person wearing desert expedition gear with scarf and goggles, confident adventurous expression looking at camera, endless rolling dunes and ancient ruins visible in distance",
      "warm golden hour desert lighting with long shadows and heat shimmer"
    ),
    storyTemplate: createStoryTemplate("cross the endless sands", "Discovering secrets of the ancient desert."),
  },
  {
    id: ScenarioId.SOLO_JUNGLE_ADVENTURER,
    category: ScenarioCategory.SOLO_ADVENTURE,
    title: "Jungle Adventurer",
    description: "Amazon expedition",
    icon: "🌴",
    imageUrl: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a brave explorer in dense tropical rainforest, person wearing khaki expedition clothes with machete and backpack, determined focused expression looking at camera, lush green vegetation exotic birds and ancient temple ruins in background",
      "dappled jungle sunlight filtering through dense canopy with misty atmosphere"
    ),
    storyTemplate: createStoryTemplate("venture into the unknown", "Exploring the heart of the jungle."),
  },
  {
    id: ScenarioId.SOLO_ARCTIC_SURVIVOR,
    category: ScenarioCategory.SOLO_ADVENTURE,
    title: "Arctic Survivor",
    description: "Polar expedition",
    icon: "❄️",
    imageUrl: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a resilient arctic explorer in frozen tundra landscape, person wearing heavy fur-lined parka and snow goggles, strong determined expression looking at camera, vast ice fields aurora borealis dancing in night sky",
      "ethereal northern lights glow with cold blue arctic lighting"
    ),
    storyTemplate: createStoryTemplate("brave the frozen wilderness", "Conquering the coldest frontier."),
  },
  {
    id: ScenarioId.SOLO_TREASURE_HUNTER,
    category: ScenarioCategory.SOLO_ADVENTURE,
    title: "Treasure Hunter",
    description: "Ancient temple explorer",
    icon: "💎",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "an adventurous treasure hunter in ancient temple ruins, person wearing rugged explorer outfit with leather jacket and satchel, excited discovery expression looking at camera holding ancient artifact, golden treasure and hieroglyphics visible in torchlit chamber",
      "warm torchlight with dust particles and mysterious ancient atmosphere"
    ),
    storyTemplate: createStoryTemplate("uncover lost treasures", "The greatest archaeological discovery."),
  },
];
