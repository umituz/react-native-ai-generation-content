/**
 * Culinary & Food Scenarios
 * Wine, food, and culinary experiences
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const CULINARY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.VINEYARD,
    title: "Vineyard Romance",
    description: "Wine country escape",
    icon: "🍇",
    imageUrl:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple walking through a vineyard, both looking at the camera with content smiles, dressed in elegant casual attire, holding wine glasses, endless rows of grapevines and rolling hills in background, romantic and pastoral",
    storyTemplate: createStoryTemplate(
      "stroll through wine country",
      "Among the vines, they toast to a love that only gets better with time, like the finest vintage.",
    ),
  },
];
