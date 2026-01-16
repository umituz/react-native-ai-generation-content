/**
 * Sports & Active Scenarios
 * Athletic and sports-focused scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const SPORTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SKI_RESORT,
    title: "Ski Resort Romance",
    description: "Winter slopes adventure",
    icon: "⛷️",
    imageUrl:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple at a luxury ski resort, both looking at the camera with joyful smiles, dressed in stylish colorful ski gear and goggles, snowy mountain peaks and ski lodge in background, adventurous and romantic",
    storyTemplate: createStoryTemplate(
      "conquer the slopes together",
      "On the mountain peaks, they find that the greatest thrill is sharing every moment side by side.",
    ),
  },
];
