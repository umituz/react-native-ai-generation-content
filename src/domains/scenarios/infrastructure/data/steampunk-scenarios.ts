import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const STEAMPUNK_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.AIRSHIP_CAPTAINS,
    title: "Airship Captains",
    description: "Commanders of the clouds",
    icon: "🎈",
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as captains on bridge of massive brass-plated airship, both facing camera with confident adventurous smiles, man in leather aviator coat with brass goggles on forehead, woman in Victorian pilot jacket with intricate gear accessories, brass steering wheels and glowing pressure gauges visible, clouds and golden sunset through windows in background",
      "warm golden sunset lighting with cinematic steampunk atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "navigate the vast sea of clouds",
      "As captains of their own destiny, they find that no matter how high they fly, their love is the anchor that keeps them grounded.",
    ),
  },
  {
    id: ScenarioId.CLOCKWORK_INVENTORS,
    title: "Clockwork Creators",
    description: "Masters of gears",
    icon: "⚙️",
    imageUrl:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in workshop filled with giant copper gears and clockwork mechanisms, both facing camera with brilliant focused smiles, hands covered in faint grease holding small glowing mechanical device together, wearing work aprons with leather tool belts, golden hour light streaming through high industrial windows in background",
      "warm golden hour workshop lighting with brass and amber glow"
    ),
    storyTemplate: createStoryTemplate(
      "build a world where time stands still for love",
      "Every gear they place, every spring they wind, is a part of the intricate machine that is the life they've built together.",
    ),
  },
  {
    id: ScenarioId.STEAM_GALA,
    title: "The Steam Gala",
    description: "Elegance with a kick",
    icon: "🎩",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at extravagant Victorian steampunk gala, both facing camera with regal charismatic smiles, man in ornate velvet tailcoat with brass clockwork arm, woman in elaborate bustle gown with gear corset holding metal champagne flute, grand ballroom with marble columns and brass chandeliers in background",
      "warm elegant ballroom lighting with brass reflections and majestic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "step out in style in a world of brass and velvet",
      "Tradition meets innovation in a dance of light and steam. They are the talk of the town, pioneers of a bold new era.",
    ),
  },
  {
    id: ScenarioId.MECHANICAL_FORGE,
    title: "Mechanical Forge",
    description: "Heated innovation",
    icon: "⚒️",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in steam-powered industrial forge, both facing camera with determined proud smiles, wearing heavy leather aprons with welding goggles pushed up on foreheads, surrounded by glowing red-hot metal and sparking copper pipes, forge flames and flying orange embers in background",
      "dramatic forge lighting with orange ember glow and steam atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "forge their future in fire and steam",
      "Steel may be forged in fire, but their bond was forged in something far more powerful. A love that's as strong as the machinery they build.",
    ),
  },
];
