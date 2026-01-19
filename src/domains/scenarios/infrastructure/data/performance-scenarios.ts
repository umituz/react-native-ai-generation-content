/**
 * Performance & Stage Scenarios
 * Concert, stage, and performance scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const PERFORMANCE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CONCERT_STARS,
    title: "Concert Performers",
    description: "Rock the stage together",
    icon: "🎤",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple performing on massive concert stage, both facing camera with passionate electrifying expressions, man in black leather jacket and chains with microphone raised, woman in sparkly stage costume with wireless mic and windswept hair, sea of phone lights and cheering crowd silhouettes with dramatic stage lighting and pyrotechnics in background",
      "dramatic concert lighting with colorful spotlights and atmospheric smoke"
    ),
    storyTemplate: createStoryTemplate(
      "perform for thousands",
      "Under the spotlight, their voices blend into one, creating magic that resonates with every heart.",
    ),
  },
];
