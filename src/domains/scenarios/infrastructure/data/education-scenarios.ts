/**
 * Education & Academic Scenarios
 * Educational and academic achievement scenarios
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const EDUCATION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.GRADUATION,
    title: "Graduation Day",
    description: "Academic achievement together",
    icon: "🎓",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple celebrating graduation day, both facing camera with proud accomplished smiles, man in black academic regalia gown with gold honor cord and mortarboard cap with tassel holding rolled diploma with red ribbon, woman in matching graduation attire with magna cum laude stole and cap throwing motion blur holding diploma triumphantly, ivy-covered historic university building with Gothic architecture and bell tower and fellow graduates celebrating in background",
      "bright celebratory spring sunlight with confetti particles in air and joyful atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate their academic journey",
      "They studied together, struggled together, and now they graduate together, ready to conquer the world.",
    ),
  },
];
