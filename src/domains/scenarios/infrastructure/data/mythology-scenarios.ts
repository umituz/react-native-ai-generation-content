import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const MYTHOLOGY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.GREEK_GODS,
    title: "Olympian Royalty",
    description: "Rule from the divine heights",
    icon: "🔱",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as Greek Gods on Mount Olympus, both facing camera with divine commanding expressions, man in flowing white silk chiton with gold trim holding golden trident, woman in elegant draped ivory gown with golden laurel wreath crown holding scepter, white marble temple columns and fluffy clouds and distant peaks of Olympus in background",
      "ethereal golden divine lighting with heavenly glow and soft clouds"
    ),
    storyTemplate: createStoryTemplate(
      "rule from the heights of Olympus",
      "Their love is written in the stars, a divine union that even the gods admire from their marble thrones.",
    ),
  },
  {
    id: ScenarioId.NORSE_VALHALLA,
    title: "Valhalla Warriors",
    description: "Epic halls of the brave",
    icon: "⚔️",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a3e0e/s6SBpgKeHS3AL0ykrc4ac.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as Norse warrior and Valkyrie in Valhalla's great hall, both facing camera with fierce determined expressions, man in leather armor with wolf fur cloak and braided beard holding decorated battle axe, woman in silver Valkyrie armor with winged helmet and feathered cloak, massive wooden hall with roaring fire pits and long feasting tables and mounted shields in background",
      "dramatic warm firelight with golden mead hall glow"
    ),
    storyTemplate: createStoryTemplate(
      "feast in the halls of Valhalla",
      "In the land of eternal bravery, their bond is as unbreakable as Scandinavian steel and as legendary as the sagas.",
    ),
  },
  {
    id: ScenarioId.ATLANTIS_ROYALTY,
    title: "Atlantis Sovereigns",
    description: "Majesty of the deep",
    icon: "🧜‍♂️",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a60be/XzjGs0XSFw9NTraL5FuXP.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as King and Queen of Atlantis underwater, both facing camera with regal serene smiles, man in iridescent blue-green scale armor with trident, woman in flowing gown of silver fish scales with coral crown and pearl jewelry, magnificent underwater palace with glowing bioluminescent sea creatures and ancient coral architecture in background",
      "ethereal underwater blue lighting with bioluminescent glow"
    ),
    storyTemplate: createStoryTemplate(
      "rule the sapphire depths",
      "Beneath the waves, in a kingdom of light and mystery, their love flows as deep and eternal as the ocean itself.",
    ),
  },
  {
    id: ScenarioId.GUARDIAN_ANGELS,
    title: "Guardian Angels",
    description: "Celestial protection",
    icon: "👼",
    imageUrl:
      "https://images.unsplash.com/photo-1502657877623-f66bf489d236?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as radiant Guardian Angels, both facing camera with gentle compassionate smiles, wearing flowing white robes with golden trim, magnificent large white feathered wings spread gracefully, soft golden halo light around their heads, floating above peaceful earth with fluffy clouds and golden sunrise in background",
      "heavenly golden light with soft ethereal glow and divine radiance"
    ),
    storyTemplate: createStoryTemplate(
      "watch over the world together",
      "With wings outspread and hearts aligned, they find that heaven isn't a place, but the love they share.",
    ),
  },
];
