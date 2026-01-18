/**
 * Extreme Adventure Scenarios
 * Adrenaline and extreme sports scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const EXTREME_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SKYDIVING,
    title: "Skydiving Adventure",
    description: "Ultimate adrenaline rush",
    icon: "🪂",
    imageUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple skydiving in tandem freefall, both facing camera with exhilarated ecstatic expressions and wind-stretched cheeks showing pure adrenaline joy, man in bright red and black aerodynamic skydiving jumpsuit with full-face helmet and altimeter on wrist, woman in electric blue and white jumpsuit with matching helmet giving double thumbs up, fluffy white cumulus clouds rushing past and patchwork farmland and winding river visible 10000 feet below",
      "bright high-altitude sunlight with vivid blue sky and dramatic sense of speed and motion"
    ),
    storyTemplate: createStoryTemplate(
      "take the leap of faith together",
      "Freefalling through the sky, they discover that with each other, they can conquer any fear.",
    ),
  },
];
