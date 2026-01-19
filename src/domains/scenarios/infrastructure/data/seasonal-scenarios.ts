/**
 * Seasonal & Nature Scenarios
 * Beautiful seasonal and nature-focused scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const SEASONAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CHERRY_BLOSSOM,
    title: "Cherry Blossom Dreams",
    description: "Springtime in Japan",
    icon: "🌸",
    imageUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing under blooming cherry blossom trees in Japan, both facing camera with serene peaceful smiles, man in tailored navy coat, woman in elegant cream dress, pink sakura petals falling gently around them, traditional Japanese temple with curved roof in background",
      "soft dreamy spring light with pink blossom atmosphere and romantic haze"
    ),
    storyTemplate: createStoryTemplate(
      "witness nature's most beautiful moment",
      "Like cherry blossoms, their love blooms beautifully, a fleeting yet eternal moment of perfection.",
    ),
  },
];
