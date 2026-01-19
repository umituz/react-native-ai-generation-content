/**
 * Luxury & Wealth Scenarios
 * High-end luxury lifestyle scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const LUXURY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.YACHT_LIFE,
    title: "Luxury Yacht Life",
    description: "Sailing in paradise",
    icon: "🛥️",
    imageUrl:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple lounging on luxury yacht sundeck, both facing camera with relaxed content smiles, man in crisp white linen shirt unbuttoned and designer sunglasses with tanned skin, woman in elegant ivory silk cover-up over designer swimsuit with gold jewelry and oversized Chanel sunglasses holding crystal champagne flute, polished teak deck with white leather cushions and crystal clear turquoise Caribbean ocean and dramatic golden sunset in background",
      "warm golden hour sunset light reflecting off calm water creating luxurious Mediterranean atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "sail into the sunset",
      "On the open sea, with nothing but endless horizons, they've found their own private paradise.",
    ),
  },
];
