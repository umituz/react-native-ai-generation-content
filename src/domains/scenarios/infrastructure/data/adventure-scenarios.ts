import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ADVENTURE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.TREASURE_HUNTERS,
    title: "Treasure Hunters",
    description: "Search for the legendary",
    icon: "🏺",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    aiPrompt:
      "A couple in a dusty ancient Egyptian tomb, looking at the camera with excited adventurous smiles, holding a map and a flashlight, wearing khaki explorer outfits with brimmed hats, ancient hieroglyphics and a golden sarcophagus in background, cinematic and daring",
    storyTemplate: createStoryTemplate(
      "discover secrets hidden for millennia",
      "They spent years hunting for lost gold, only to find that the real treasure was the adventurer standing right beside them.",
    ),
  },
  {
    id: ScenarioId.JUNGLE_EXPLORATION,
    title: "Jungle Discovery",
    description: "Into the green wild",
    icon: "🌿",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt:
      "A couple hacking through thick jungle vines, both looking at the camera with determined smiles, wearing rugged field gear, sunlight filtering through the dense canopy, a hidden stone temple overgrown with plants in the background, misty and adventurous vibe",
    storyTemplate: createStoryTemplate(
      "navigate the wild heart of the world",
      "No path is too difficult, no mountain too high, as long as they're cutting through the brush hand in hand.",
    ),
  },
  {
    id: ScenarioId.ARCTIC_EXPEDITION,
    title: "Arctic Expedition",
    description: "Crossing the frozen void",
    icon: "❄️",
    imageUrl:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800",
    aiPrompt:
      "A couple in heavy insulated parkas with fur hoods, both looking at the camera with confident happy smiles, standing on a vast ice shelf, snow blowing in the wind, a bright blue glacier and aurora borealis in background, high-contrast crisp lighting, heroic and cold",
    storyTemplate: createStoryTemplate(
      "conquer the coldest reaches of the earth",
      "In a world of ice and snow, their love provides all the warmth they'll ever need. Pioneers of the great white void.",
    ),
  },
  {
    id: ScenarioId.SEA_MONSTERS,
    title: "Monster Hunters",
    description: "Defenders of the deep",
    icon: "🐉",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    aiPrompt:
      "A couple on the deck of an old wooden ship during a storm, man with a harpoon, woman looking through a brass telescope at the camera with a fierce smile, giant dark shape moving under the waves in background, crashing waves and stormy sky, epic and perilous",
    storyTemplate: createStoryTemplate(
      "face the legends and myths of the deep",
      "The sea may be vast and full of monsters, but they've never been ones to stay in safe waters. Together, they are legends of the high seas.",
    ),
  },
];
