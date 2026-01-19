/**
 * Gaming & Tech Scenarios
 * E-sports and gaming scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const GAMING_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ESPORTS,
    title: "E-Sports Champions",
    description: "Gaming legends",
    icon: "🎮",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as e-sports world champions on tournament stage, both facing camera with victorious triumphant smiles, man in black and red team jersey with sponsor logos and professional gaming headset around neck, woman in matching team jersey with colorful LED-lit gaming headset holding massive silver championship trophy, huge curved LED screens showing their victory moment and thousands of cheering fans with phone lights and confetti cannons going off in arena in background",
      "dramatic stadium lighting with blue and purple stage lights and spotlight on champions and confetti catching light"
    ),
    storyTemplate: createStoryTemplate(
      "dominate the gaming world",
      "Player 1 and Player 2, the ultimate duo. In the arena and in life, they're unbeatable together.",
    ),
  },
];
