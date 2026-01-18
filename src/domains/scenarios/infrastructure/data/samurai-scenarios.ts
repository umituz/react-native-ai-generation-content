import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const SAMURAI_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SAKURA_PATH_TRADITION,
    title: "Sakura Path",
    description: "Cherry blossom walk",
    icon: "🌸",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    aiPrompt:
      "A couple in traditional Japanese Kimonos and Hakamas walking through a path of blooming cherry blossom (Sakura) trees, pink petals falling like snow, ancient stone lanterns in background, soft morning light, looking at each other with deep respect and love, ethereal and peaceful",
    storyTemplate: createStoryTemplate(
      "walk the path of tradition beneath the falling blossoms",
      "Like the Sakura, some moments are fleeting but beautiful beyond words. They've found a love that's as timeless as the ancient stones beneath their feet.",
    ),
  },
  {
    id: ScenarioId.ZEN_GARDEN_TEA,
    title: "Zen Garden Tea",
    description: "Peaceful reflection",
    icon: "🍵",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    aiPrompt:
      "A couple sitting on a wooden porch of a traditional Japanese house overlooking a meticulously raked Zen rock garden, man and woman sharing a small cup of tea, looking at the camera with tranquil smiles, soft twilight lighting, wearing silk yukatas, calm and profound connection",
    storyTemplate: createStoryTemplate(
      "find stillness in the heart of a chaotic world",
      "True harmony doesn't need many words. In the silence of the Zen garden, their souls speak a language of deep, unshakeable peace.",
    ),
  },
  {
    id: ScenarioId.DOJO_TRAINING_BOND,
    title: "Dojo Training",
    description: "Focus and strength",
    icon: "⚔️",
    imageUrl: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800",
    aiPrompt:
      "A couple in a wooden traditional Japanese dojo, sitting back-to-back on straw mats with Katanas resting across their laps, looking at the camera with fierce and honorable expressions, dust motes in shafts of light from high windows, atmosphere of strength and mutual protection",
    storyTemplate: createStoryTemplate(
      "hone your spirit and strength side-by-side",
      "A samurai's greatest weapon is their discipline, but their greatest strength is the person standing at their back. A bond forged in honor and steel.",
    ),
  },
];
