import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const MYSTICAL_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.WIZARD_ACADEMY,
    title: "Wizard Academy",
    description: "Master the arcane arts",
    icon: "🧙‍♂️",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as master wizards in grand magical academy library, both facing camera with mysterious knowing smiles, man in deep blue velvet robe with silver star embroidery holding carved wooden staff with glowing crystal, woman in burgundy robe with gold celestial patterns and ancient tome, floating leather-bound books and swirling blue arcane energy, towering stone bookcases and arched windows in background",
      "mystical blue and gold lighting with magical particle effects"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in bioluminescent enchanted forest at twilight, both facing camera with expressions of wonder, man in earth-toned tunic with leaf embroidery woman in flowing sage green dress with flower crown, surrounded by glowing blue butterflies and floating golden spores, massive ancient trees with glowing moss and distant misty waterfall in background",
      "ethereal bioluminescent glow with soft twilight blue and green tones"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple as alchemists in smoky medieval laboratory, both facing camera with intense focused expressions, man in worn leather apron over stained linen shirt examining vial, woman in period dress with protective goggles on forehead holding mortar and pestle, surrounded by bubbling glass beakers with emerald and amber liquids and ancient scrolls, golden sunset light through small arched window in background",
      "warm golden sunset light mixed with colorful glow from bubbling potions"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple on magical wooden sailing ship flying through cosmos, both facing camera with adventurous excited smiles standing at ornate bow, man in navy coat with silver star embroidery woman in flowing midnight blue gown with constellation patterns, vibrant purple and pink nebulae and spiral galaxies surrounding ship, glowing trail of golden stardust behind vessel",
      "cosmic lighting with vibrant nebula colors and stardust sparkle"
    ),
    storyTemplate: createStoryTemplate(
      "sail across the sea of stars",
      "Beyond the limits of the world, they navigate the heavens, guided by the light of their shared dreams.",
    ),
  },
];
