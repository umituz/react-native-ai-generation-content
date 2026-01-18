import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const MYSTICAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.WIZARD_ACADEMY,
    title: "Wizard Academy",
    description: "Master the arcane arts",
    icon: "🧙‍♂️",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt:
      "A couple as master wizards in a grand magical academy library, both looking at the camera with mysterious smiles, wearing ornate velvet robes with celestial patterns, holding glowing wooden staves, floating magical books and blue arcane energy in background, ancient stone architecture, magical and learned",
    storyTemplate: createStoryTemplate(
      "master the secrets of the arcane",
      "In a world where magic is real, they find that the most powerful spell of all is the one that bound their hearts together.",
    ),
  },
  {
    id: ScenarioId.ENCHANTED_FOREST,
    title: "Enchanted Forest",
    description: "Lost in a magical world",
    icon: "🧚",
    imageUrl:
      "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800",
    aiPrompt:
      "A couple in a bioluminescent enchanted forest, both looking at the camera with wonder, dressed in ethereal woodland attire with leaf patterns, surrounded by glowing butterflies and floating spores, giant ancient trees and misty waterfalls in background, dreamlike and serene",
    storyTemplate: createStoryTemplate(
      "wander through a world of wonder",
      "Among the whispers of ancient trees and the glow of forest spirits, they find a peace that belongs only to them.",
    ),
  },
  {
    id: ScenarioId.ALCHEMISTS,
    title: "The Alchemists",
    description: "Turning lead to gold",
    icon: "🧪",
    imageUrl:
      "https://images.unsplash.com/photo-1502224562085-639556652f33?w=800",
    aiPrompt:
      "A couple as alchemists in a smoky rustic laboratory, both looking at the camera with intense focus, wearing leather aprons and stained shirts, surrounded by glass beakers with colorful bubbling liquids and old scrolls, golden sunset light through a small window, mysterious and scientific",
    storyTemplate: createStoryTemplate(
      "discover the ultimate element",
      "They spent years searching for the philosopher's stone, only to realize the real gold was the life they built together.",
    ),
  },
  {
    id: ScenarioId.CELESTIAL_VOYAGE,
    title: "Celestial Voyage",
    description: "Journey through the stars",
    icon: "✨",
    imageUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
    aiPrompt:
      "A couple on a magical wooden ship sailing through the cosmos, both looking at the camera with adventurous smiles, wearing star-patterned robes, standing at the bow, vibrant nebulae and distant galaxies in background, glowing trail of stardust, cosmic and romantic",
    storyTemplate: createStoryTemplate(
      "sail across the sea of stars",
      "Beyond the limits of the world, they navigate the heavens, guided by the light of their shared dreams.",
    ),
  },
];
