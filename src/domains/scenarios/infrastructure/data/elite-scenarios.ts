import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ELITE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.PRIVATE_ISLAND,
    title: "Private Island",
    description: "Your own piece of heaven",
    icon: "🏝️",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    aiPrompt:
      "A couple on an exclusive private island beach, both looking at the camera with blissful smiles, dressed in high-end designer resort wear, infinity pool and luxury villa in background, crystal blue ocean and sunset, opulent and secluded",
    storyTemplate: createStoryTemplate(
      "escape to their private sanctuary",
      "No crowds, no noise. Just the sound of the ocean and the feeling of absolute freedom in their own tropical empire.",
    ),
  },
  {
    id: ScenarioId.ROYAL_PALACE_LIVING,
    title: "Palace Living",
    description: "Modern royalty",
    icon: "🏰",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt:
      "A couple in a grand gold-leafed palace hall, both looking at the camera with regal expressions, dressed in modern royal formal attire, standing on a grand marble staircase, chandeliers and historic paintings in background, majestic and rich",
    storyTemplate: createStoryTemplate(
      "live like modern monarchs",
      "Tradition meets modern luxury. In a world of palaces and protocol, they find their own path together.",
    ),
  },
  {
    id: ScenarioId.MEGA_YACHT_PARTY,
    title: "Mega-Yacht Life",
    description: "The peak of luxury",
    icon: "🛥️",
    imageUrl:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
    aiPrompt:
      "A couple on the top deck of a 100-meter mega-yacht, both looking at the camera with successful smiles, dressed in elegant evening wear, pool and helipad visible on deck, Monaco harbor or Amalfi coast in background, golden hour lighting, ultimate luxury",
    storyTemplate: createStoryTemplate(
      "sail the world in absolute style",
      "The horizon is theirs to conquer. A life of luxury that spans the globe, one exclusive port at a time.",
    ),
  },
  {
    id: ScenarioId.PENTHOUSE_GALA,
    title: "Penthouse Gala",
    description: "Sky-high sophistication",
    icon: "🏙️",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    aiPrompt:
      "A couple at a high-end penthouse party, both looking at the camera with charismatic smiles, dressed in stunning evening attire, holding champagne flute, floor-to-ceiling windows with a panoramic view of New York or Dubai at night in background, glamorous and urban",
    storyTemplate: createStoryTemplate(
      "party above the city lights",
      "They aren't just high-fliers; they're the ones other people look up to. Sophistication at the very top of the world.",
    ),
  },
];
