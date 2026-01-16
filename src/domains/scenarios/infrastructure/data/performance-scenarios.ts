/**
 * Performance & Stage Scenarios
 * Concert, stage, and performance scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const PERFORMANCE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CONCERT_STARS,
    title: "Concert Performers",
    description: "Rock the stage together",
    icon: "🎤",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple performing on a concert stage, both looking at the camera with passionate expressions, dressed in stylish stage outfits, holding microphones, massive crowd and stage lights in background, electric and powerful",
    storyTemplate: createStoryTemplate(
      "perform for thousands",
      "Under the spotlight, their voices blend into one, creating magic that resonates with every heart.",
    ),
  },
];
