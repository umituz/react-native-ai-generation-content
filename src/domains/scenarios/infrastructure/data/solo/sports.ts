/**
 * Solo Sports Scenarios
 * Single-person sports portraits
 */

import { Scenario, ScenarioId, ScenarioCategory } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const SOLO_SPORTS_SCENARIOS: Scenario[] = [
  {
    id: ScenarioId.SOLO_SOCCER_STAR,
    category: ScenarioCategory.SOLO_SPORTS,
    title: "Soccer Star",
    description: "Football legend",
    icon: "⚽",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a triumphant soccer player celebrating goal in packed stadium, person wearing professional team jersey with ball at feet, joyful victorious expression looking at camera arms raised, cheering crowd and stadium lights in background",
      "dramatic stadium spotlight lighting with confetti and celebration atmosphere"
    ),
    storyTemplate: createStoryTemplate("score the winning goal", "The greatest player on the pitch."),
  },
  {
    id: ScenarioId.SOLO_BASKETBALL_LEGEND,
    category: ScenarioCategory.SOLO_SPORTS,
    title: "Basketball Legend",
    description: "Court champion",
    icon: "🏀",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "an athletic basketball player mid-dunk at championship game, person wearing professional jersey flying through air, intense focused expression looking at camera, basketball hoop and arena crowd in background",
      "dynamic arena lighting with motion blur and intense sports atmosphere"
    ),
    storyTemplate: createStoryTemplate("dominate the court", "Born to fly."),
  },
  {
    id: ScenarioId.SOLO_TENNIS_CHAMPION,
    category: ScenarioCategory.SOLO_SPORTS,
    title: "Tennis Champion",
    description: "Grand Slam winner",
    icon: "🎾",
    imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a focused tennis player serving at championship match, person wearing professional tennis outfit racket raised, powerful concentrated expression looking at camera, grass court and Wimbledon-style stadium in background",
      "bright sunlit court lighting with dramatic action atmosphere"
    ),
    storyTemplate: createStoryTemplate("serve for the title", "Champion of the court."),
  },
  {
    id: ScenarioId.SOLO_SURFING_PRO,
    category: ScenarioCategory.SOLO_SPORTS,
    title: "Surfing Pro",
    description: "Wave rider",
    icon: "🏄",
    imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a skilled surfer riding massive wave, person wearing wetsuit on surfboard in perfect stance, exhilarated free expression looking at camera, towering blue wave curl and ocean spray around them",
      "bright ocean sunlight with water droplets and dynamic surf atmosphere"
    ),
    storyTemplate: createStoryTemplate("ride the perfect wave", "One with the ocean."),
  },
  {
    id: ScenarioId.SOLO_SKI_CHAMPION,
    category: ScenarioCategory.SOLO_SPORTS,
    title: "Ski Champion",
    description: "Alpine racer",
    icon: "⛷️",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a professional skier racing down championship slope, person wearing sleek racing suit and goggles in dynamic skiing pose, focused determined expression looking at camera, pristine snow-covered mountains and race gates in background",
      "bright crisp mountain sunlight with snow spray and speed atmosphere"
    ),
    storyTemplate: createStoryTemplate("conquer the mountain", "Born for the slopes."),
  },
];
