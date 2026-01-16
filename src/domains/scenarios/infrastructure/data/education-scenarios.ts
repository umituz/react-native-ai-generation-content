/**
 * Education & Academic Scenarios
 * Educational and academic achievement scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const EDUCATION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.GRADUATION,
    title: "Graduation Day",
    description: "Academic achievement together",
    icon: "🎓",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple on graduation day, both looking at the camera with proud smiles, dressed in graduation gowns and caps, holding diplomas, university campus with historic buildings in background, accomplished and joyful",
    storyTemplate: createStoryTemplate(
      "celebrate their academic journey",
      "They studied together, struggled together, and now they graduate together, ready to conquer the world.",
    ),
  },
];
