/**
 * Culinary & Food Scenarios
 * Wine, food, and culinary experiences
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const CULINARY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.VINEYARD,
    title: "Vineyard Romance",
    description: "Wine country escape",
    icon: "🍇",
    imageUrl:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple walking hand in hand through a beautiful vineyard, both facing camera with content genuine smiles, man wearing linen blazer and casual pants, woman in flowing sundress and sun hat, each holding crystal wine glasses with white wine, endless rows of lush green grapevines stretching into distance, rolling Tuscan hills and blue sky with soft clouds in background",
      "warm golden afternoon sunlight, natural outdoor lighting, pastoral romantic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "stroll through wine country",
      "Among the vines, they toast to a love that only gets better with time, like the finest vintage.",
    ),
  },
];
