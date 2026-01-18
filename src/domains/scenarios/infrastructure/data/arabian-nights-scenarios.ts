import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ARABIAN_NIGHTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FLYING_CARPET_RIDE,
    title: "Flying Carpet Ride",
    description: "A whole new world",
    icon: "🧞",
    imageUrl: "https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=800",
    aiPrompt:
      "A couple sitting on a richly embroidered flying carpet, soaring high above a city of white domes and gold minarets at night, giant full moon in background, both looking at each other with romantic smiles, wearing elaborate 1001 nights style silk clothing, magical stardust in the air, nostalgic and grand",
    storyTemplate: createStoryTemplate(
      "soar through the starlit sky on a journey of pure magic",
      "The world is small and the sky is endless. From their vantage point on the carpet, every wish they've ever made is finally coming true.",
    ),
  },
  {
    id: ScenarioId.PALACE_OASIS_RELAX,
    title: "Palace Oasis",
    description: "Luxury in the desert",
    icon: "🕌",
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    aiPrompt:
      "A couple in a lush palace courtyard with a turquoise pool, reclining on silk floor cushions under a grand archway, serving each other exotic fruits, both looking at the camera with blissful royal smiles, wearing sheer silk and gold jewelry, warm evening light, atmosphere of luxury and peace",
    storyTemplate: createStoryTemplate(
      "escape the heat of the desert in your own private palace sanctuary",
      "Beyond the walls, the sand is shifting, but here, time has stopped. They've found the ultimate oasis in each other's presence.",
    ),
  },
  {
    id: ScenarioId.DESERT_CARAVAN_SUNSET,
    title: "Desert Caravan",
    description: "Dunes and stars",
    icon: "🐪",
    imageUrl:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800",
    aiPrompt:
      "A couple standing on the peak of a massive golden sand dune at sunset, a caravan of camels in the distance, both looking at the horizon with hopeful smiles, wearing travel-worn but elegant desert robes, incredibly vibrant orange and purple sky, epic and adventurous",
    storyTemplate: createStoryTemplate(
      "journey across the golden sands towards a future of adventure",
      "Every dune they climb brings a new horizon, and every sunset they share is a promise of a new dawn. A love that's as vast and timeless as the desert itself.",
    ),
  },
];
