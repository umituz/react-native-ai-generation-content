/**
 * Sports & Active Scenarios
 * Athletic and sports-focused scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const SPORTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SKI_RESORT,
    title: "Ski Resort Romance",
    description: "Winter slopes adventure",
    icon: "⛷️",
    imageUrl:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at luxury ski resort on snowy mountain, both facing camera with joyful excited smiles, man in stylish blue ski jacket with goggles on forehead, woman in vibrant red ski gear with windswept hair, pristine snow-covered peaks and wooden ski lodge with smoke from chimney in background",
      "bright crisp winter sunlight with snow sparkle and mountain adventure atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "conquer the slopes together",
      "On the mountain peaks, they find that the greatest thrill is sharing every moment side by side.",
    ),
  },
];
