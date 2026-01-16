/**
 * Seasonal & Nature Scenarios
 * Beautiful seasonal and nature-focused scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const SEASONAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CHERRY_BLOSSOM,
    title: "Cherry Blossom Dreams",
    description: "Springtime in Japan",
    icon: "🌸",
    imageUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple under blooming cherry blossom trees in Japan, both looking at the camera with serene smiles, dressed in elegant modern attire, pink petals falling around them, traditional Japanese temple in background, dreamy and romantic",
    storyTemplate: createStoryTemplate(
      "witness nature's most beautiful moment",
      "Like cherry blossoms, their love blooms beautifully, a fleeting yet eternal moment of perfection.",
    ),
  },
];
