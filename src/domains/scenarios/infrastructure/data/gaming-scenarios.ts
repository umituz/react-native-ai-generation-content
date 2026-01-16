/**
 * Gaming & Tech Scenarios
 * E-sports and gaming scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const GAMING_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ESPORTS,
    title: "E-Sports Champions",
    description: "Gaming legends",
    icon: "🎮",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple as e-sports champions on tournament stage, both looking at the camera with victorious smiles, dressed in team jerseys with headsets, holding trophy, massive screens and cheering crowd in background, competitive and triumphant",
    storyTemplate: createStoryTemplate(
      "dominate the gaming world",
      "Player 1 and Player 2, the ultimate duo. In the arena and in life, they're unbeatable together.",
    ),
  },
];
