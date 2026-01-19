import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const SAMURAI_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SAKURA_PATH_TRADITION,
    title: "Sakura Path",
    description: "Cherry blossom walk",
    icon: "🌸",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in traditional Japanese kimonos walking through path of blooming cherry blossom trees, both facing camera with expressions of deep respect and love, man in dark blue hakama with katana at hip, woman in elegant pink floral kimono with obi, pink sakura petals falling like snow, ancient stone lanterns in background",
      "soft ethereal morning light with pink blossom atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple sitting on wooden porch of traditional Japanese house overlooking meticulously raked zen rock garden, both facing camera with tranquil peaceful smiles sharing small ceramic tea cup, wearing elegant silk yukatas, perfectly arranged stones and raked sand patterns in background",
      "soft twilight lighting with calm meditative atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in wooden traditional Japanese dojo sitting back-to-back on straw tatami mats, both facing camera with fierce honorable expressions, katanas resting across their laps, wearing white gi and black hakama, wooden training dummies and scrolls on walls in background",
      "dramatic shaft lighting through high windows with floating dust motes"
    ),
    storyTemplate: createStoryTemplate(
      "hone your spirit and strength side-by-side",
      "A samurai's greatest weapon is their discipline, but their greatest strength is the person standing at their back. A bond forged in honor and steel.",
    ),
  },
];
