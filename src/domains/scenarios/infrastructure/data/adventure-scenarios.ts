import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ADVENTURE_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.TREASURE_HUNTERS,
    title: "Treasure Hunters",
    description: "Search for the legendary",
    icon: "🏺",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as treasure hunters in ancient Egyptian tomb, both facing camera with excited adventurous grins, man in khaki safari shirt with leather belt and worn explorer hat holding weathered parchment map, woman in tan cargo vest with compass around neck holding bright LED flashlight, dusty hieroglyphic-covered walls and golden sarcophagus with turquoise inlays in background",
      "warm amber torchlight mixed with cool flashlight beam creating dramatic shadows on ancient stone walls"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple exploring dense rainforest jungle, both facing camera with determined adventurous smiles, man in olive green moisture-wicking shirt with machete and canvas backpack, woman in khaki hiking pants and breathable tank top with binoculars, cutting through thick emerald vines with ancient moss-covered Mayan temple ruins visible through parting foliage in background",
      "dappled golden sunlight filtering through dense jungle canopy creating god rays through morning mist"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple on Arctic expedition, both facing camera with confident joyful smiles, man in bright orange insulated expedition parka with fur-lined hood and snow goggles on forehead, woman in red down jacket with thermal gloves holding trekking poles, standing on vast white ice shelf with bright blue glacial ice formations and vibrant green aurora borealis dancing across dark polar sky in background",
      "crisp high-contrast lighting with cool blue tones from ice reflections and green aurora glow"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple as legendary sea monster hunters on wooden sailing ship deck during fierce storm, man gripping iron harpoon with rope coiled at feet wearing weathered brown leather coat, woman facing camera with fierce determined smile looking through antique brass telescope wearing navy blue captain coat with gold buttons, massive dark tentacled shape visible beneath churning gray-green waves with lightning illuminating stormy clouds in background",
      "dramatic storm lighting with flashes of lightning and blue-gray atmospheric tones"
    ),
    storyTemplate: createStoryTemplate(
      "face the legends and myths of the deep",
      "The sea may be vast and full of monsters, but they've never been ones to stay in safe waters. Together, they are legends of the high seas.",
    ),
  },
];
