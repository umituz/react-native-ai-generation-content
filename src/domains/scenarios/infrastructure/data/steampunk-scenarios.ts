import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const STEAMPUNK_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.AIRSHIP_CAPTAINS,
    title: "Airship Captains",
    description: "Commanders of the clouds",
    icon: "🎈",
    imageUrl:
      "https://images.unsplash.com/photo-1449156003946-3197ae0107cb?w=800",
    aiPrompt:
      "A couple as captains on the bridge of a massive brass-plated airship, looking at the camera with confident adventurous smiles, wearing leather aviator coats and intricate brass goggles, steering wheels and glowing pressure gauges in background, clouds and sunset outside the windows, cinematic steampunk aesthetic",
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
    aiPrompt:
      "A couple in a workshop filled with giant copper gears and clockwork mechanisms, both looking at the camera with brilliant focused smiles, hands covered in faint grease, holding a small mechanical device that glows with amber light, golden hour lighting through high windows, intricate and ornate steampunk style",
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
    aiPrompt:
      "A couple at an extravagant Victorian-style gala, both looking at the camera with regal charismatic smiles, wearing ornate velvet attire with brass prosthetic clockwork details, holding metal champagne flutes, grand ballroom with marble columns and brass chandeliers in background, majestic and unique",
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
    aiPrompt:
      "A couple in a high-tech steam-powered forge, both looking at the camera with determined proud smiles, wearing leather aprons and welding goggles pushed up, surrounded by glowing red metal and sparking pipes, dramatic lighting with orange embers, powerful and creative",
    storyTemplate: createStoryTemplate(
      "forge their future in fire and steam",
      "Steel may be forged in fire, but their bond was forged in something far more powerful. A love that's as strong as the machinery they build.",
    ),
  },
];
