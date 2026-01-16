import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const MYTHOLOGY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.GREEK_GODS,
    title: "Olympian Royalty",
    description: "Rule from the divine heights",
    icon: "🔱",
    imageUrl: "https://images.unsplash.com/photo-1549416878-b9ca35c2d47a?w=800",
    aiPrompt:
      "A couple as Greek God and Goddess on Mount Olympus, both looking at the camera with divine authority, wearing flowing white silk chitons with gold laurel wreaths, holding a golden trident and scepter, marble architecture and clouds in background, epic and ethereal",
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
    aiPrompt:
      "A couple as Norse warrior and Valkyrie in the halls of Valhalla, both looking at the camera with fierce determined expressions, wearing leather and fur armor with iron accents, holding decorated axes, grand hall with long tables and fire pits in background, cinematic and heroic",
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
    aiPrompt:
      "A couple as King and Queen of Atlantis, both looking at the camera with regal smiles, wearing iridescent scales and coral jewelry, holding bioluminescent scepters, underwater palace with glowing sea life and blue depths in background, magical and serene",
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
    aiPrompt:
      "A couple as radiant Guardian Angels, both looking at the camera with gentle compassionate smiles, wearing flowing white robes and large white feathered wings, soft golden halo light, floating above a peaceful world with soft clouds and sunrise in background, ethereal and heavenly",
    storyTemplate: createStoryTemplate(
      "watch over the world together",
      "With wings outspread and hearts aligned, they find that heaven isn't a place, but the love they share.",
    ),
  },
];
