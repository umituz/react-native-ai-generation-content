/**
 * Creative Arts Scenarios
 * Photography, art, and creative pursuits
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const CREATIVE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.PHOTOGRAPHY_DUO,
    title: "Photography Duo",
    description: "Capturing life together",
    icon: "📷",
    imageUrl:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple as professional photographers, both looking at the camera with creative smiles, dressed in stylish photographer vests and casual attire, holding professional cameras, scenic outdoor location with golden hour lighting in background, artistic and passionate",
    storyTemplate: createStoryTemplate(
      "capture the world through their lens",
      "Together they frame not just photos, but memories. Every click is a moment of their love story.",
    ),
  },
];
