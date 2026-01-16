/**
 * Luxury & Wealth Scenarios
 * High-end luxury lifestyle scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const LUXURY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.YACHT_LIFE,
    title: "Luxury Yacht Life",
    description: "Sailing in paradise",
    icon: "🛥️",
    imageUrl:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple on a luxury yacht deck, both looking at the camera with relaxed smiles, dressed in elegant white resort wear and sunglasses, champagne glasses in hand, crystal blue ocean and sunset in background, luxurious and exclusive",
    storyTemplate: createStoryTemplate(
      "sail into the sunset",
      "On the open sea, with nothing but endless horizons, they've found their own private paradise.",
    ),
  },
];
