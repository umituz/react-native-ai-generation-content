/**
 * Extreme Adventure Scenarios
 * Adrenaline and extreme sports scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const EXTREME_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SKYDIVING,
    title: "Skydiving Adventure",
    description: "Ultimate adrenaline rush",
    icon: "🪂",
    imageUrl:
      "https://images.unsplash.com/photo-1512331484446-258312d27a1e?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple skydiving together, both looking at the camera with exhilarated expressions, dressed in matching skydiving suits and helmets, clouds and earth far below in background, thrilling and epic",
    storyTemplate: createStoryTemplate(
      "take the leap of faith together",
      "Freefalling through the sky, they discover that with each other, they can conquer any fear.",
    ),
  },
];
