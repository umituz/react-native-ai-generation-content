import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const BUCKET_LIST_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.HOT_AIR_BALLOON,
    title: "Hot Air Balloon",
    description: "Soaring above the world",
    icon: "🎈",
    imageUrl: "https://images.unsplash.com/photo-1544015759-42b7899c7178?w=800",
    aiPrompt:
      "A couple in a hot air balloon basket, both looking at the camera with thrilled smiles, holding champagne glasses, stunning panoramic views of Cappadocia or green valleys far below in background, golden sunrise lighting, epic and magical",
    storyTemplate: createStoryTemplate(
      "tick off a dream together",
      "High above the world, they see their future - vast, beautiful, and limitless.",
    ),
  },
  {
    id: ScenarioId.SCUBA_DIVING,
    title: "Scuba Diving",
    description: "Underwater exploration",
    icon: "🌊",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    aiPrompt:
      "A couple underwater, both looking at the camera through masks with happy expressions, wearing full scuba diving gear and oxygen tanks, colorful coral reefs and tropical fish in background, crystal blue ocean water, adventurous and unique",
    storyTemplate: createStoryTemplate(
      "explore a whole new world",
      "Beneath the surface, they've found a hidden paradise. A silent, beautiful world shared only by them.",
    ),
  },
  {
    id: ScenarioId.THEME_PARK,
    title: "Theme Park Magic",
    description: "Thrills and laughs",
    icon: "🎢",
    imageUrl:
      "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=800",
    aiPrompt:
      "A couple at a world-class theme park, both looking at the camera with ecstatic smiles, wearing fun mouse ears or theme park hats, holding giant lollipops or cotton candy, colorful roller coasters and magical castle in background, lively and joyful",
    storyTemplate: createStoryTemplate(
      "unleash their inner children",
      "Adrenaline rushes and sweet treats. In the land of magic, they find that their love is the most magical part of all.",
    ),
  },
  {
    id: ScenarioId.CIRCUS_PERFORMANCE,
    title: "Circus Stars",
    description: "Amazing stage adventure",
    icon: "🎪",
    imageUrl:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    aiPrompt:
      "A couple as grand circus performers, both looking at the camera with confident showmanship smiles, dressed in elaborate sequined circus attire with top hats, grand circus tent and spotlights in background, majestic and spectacular",
    storyTemplate: createStoryTemplate(
      "star in their own spectacular show",
      "Under the big top, with thousands watching, they perform the ultimate act of partnership and trust.",
    ),
  },
];
