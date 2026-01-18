/**
 * Animals & Pets Scenarios
 * Animal and pet-related scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ANIMALS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.HORSE_RIDING,
    title: "Horseback Adventure",
    description: "Equestrian romance",
    icon: "🐴",
    imageUrl:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple horseback riding together through open countryside, both facing camera with adventurous genuine smiles, man in fitted navy equestrian jacket with white polo shirt and brown leather riding boots on chestnut Arabian horse, woman in cream jodhpurs and burgundy velvet blazer with black helmet on white Andalusian horse, rolling green hills with snow-capped mountains and wildflower meadow in background",
      "warm golden hour sunlight with soft lens flare and gentle backlight through horse manes"
    ),
    storyTemplate: createStoryTemplate(
      "ride into the horizon",
      "Side by side on horseback, they gallop toward their dreams, wild and free as the wind.",
    ),
  },
];
