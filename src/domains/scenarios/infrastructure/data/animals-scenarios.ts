/**
 * Animals & Pets Scenarios
 * Animal and pet-related scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ANIMALS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.HORSE_RIDING,
    title: "Horseback Adventure",
    description: "Equestrian romance",
    icon: "🐴",
    imageUrl:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple horseback riding together, both looking at the camera with adventurous smiles, dressed in elegant equestrian attire, riding beautiful horses, open countryside with mountains in background, majestic and free",
    storyTemplate: createStoryTemplate(
      "ride into the horizon",
      "Side by side on horseback, they gallop toward their dreams, wild and free as the wind.",
    ),
  },
];
