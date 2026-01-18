import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ARABIAN_NIGHTS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FLYING_CARPET_RIDE,
    title: "Flying Carpet Ride",
    description: "A whole new world",
    icon: "🧞",
    imageUrl: "https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple sitting together on ornate Persian flying carpet with intricate ruby red and gold thread embroidery, soaring high above ancient Arabian city with white marble domes and golden minarets, massive luminous full moon in starry night sky, man in royal blue silk tunic with gold embroidered vest and turban with emerald brooch, woman in flowing magenta silk dress with delicate gold jewelry and henna patterns on hands, magical golden stardust particles swirling around carpet",
      "ethereal moonlight with soft blue tones and warm golden accent lights from city below"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in luxurious palace courtyard oasis, both facing camera with blissful serene smiles, reclining on plush silk cushions in deep purple and gold under grand carved marble archway, man in cream linen robe with gold trim feeding woman dates from silver platter, woman in sheer turquoise silk kaftan with gold coin belt and pearl earrings, turquoise mosaic-tiled pool with rose petals and palm trees in background",
      "warm amber evening light filtering through carved lattice screens creating intricate shadow patterns"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing on crest of massive golden sand dune at sunset, both facing camera with hopeful adventurous smiles, man in travel-worn indigo cotton desert robe with leather satchel and traditional headwrap, woman in flowing saffron and burgundy layered robes with silver Berber jewelry, caravan of decorated camels with colorful blankets silhouetted in distance, dramatic sky with vibrant orange coral and deep purple gradient",
      "spectacular golden hour desert light with warm orange and magenta tones casting long shadows"
    ),
    storyTemplate: createStoryTemplate(
      "journey across the golden sands towards a future of adventure",
      "Every dune they climb brings a new horizon, and every sunset they share is a promise of a new dawn. A love that's as vast and timeless as the desert itself.",
    ),
  },
];
