import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ACTION_STEALTH_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ELITE_HEIST,
    title: "Elite Heist Team",
    description: "The ultimate score",
    icon: "💎",
    imageUrl: "https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as professional heist operatives, both facing camera with confident knowing smirks, man in matte black tactical vest with carbon fiber gear and wireless earpiece, woman in sleek black catsuit with utility belt and night vision goggles pushed up, holding silver briefcase and lockpick tools, green laser security grid and massive steel vault door with digital keypad in background",
      "dramatic blue-green accent lighting with sharp shadows from security beams"
    ),
    storyTemplate: createStoryTemplate(
      "pull off the greatest heist in history",
      "They share a bond of trust that no vault can contain. The ultimate partners in crime and in life.",
    ),
  },
  {
    id: ScenarioId.TOP_GUN,
    title: "Sky Aces",
    description: "Need for speed",
    icon: "✈️",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as elite fighter pilots, both facing camera with heroic confident smiles, man in olive green flight suit with squadron patches and American flag on shoulder holding white helmet with gold visor, woman in matching flight suit with aviator sunglasses pushed up on head, standing on aircraft carrier deck with F-18 Super Hornet jet and ocean horizon in background",
      "golden sunrise light with warm orange and pink sky tones"
    ),
    storyTemplate: createStoryTemplate(
      "rule the boundless skies",
      "Flying at Mach speeds, they find that the only thing faster than their jets is the way they fell for each other.",
    ),
  },
  {
    id: ScenarioId.SURVIVALISTS,
    title: "Last Survivors",
    description: "Stronger together",
    icon: "⛺",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a3e0e/s6SBpgKeHS3AL0ykrc4ac.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as post-apocalyptic survivors, both facing camera with resilient determined expressions, man in worn brown leather jacket with makeshift armor patches and crossbow on back, woman in weathered olive cargo pants and dusty denim jacket with machete at hip, abandoned overgrown city street with vines covering rusted cars and crumbling buildings in background",
      "overcast diffused daylight with muted desaturated tones and atmospheric haze"
    ),
    storyTemplate: createStoryTemplate(
      "rebuild a world from the ruins",
      "When everything else fell apart, they were the only pieces that still fit perfectly together.",
    ),
  },
  {
    id: ScenarioId.SECRET_AGENTS_DUO,
    title: "Double Agents",
    description: "License to love",
    icon: "🔫",
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as sophisticated secret agents, both facing camera with alluring mysterious expressions, man in perfectly tailored black wool tuxedo with silk lapels and subtle earpiece, woman in elegant floor-length black sequined evening gown with thigh-high slit and diamond bracelet, holding martini glasses, luxurious Monte Carlo casino with crystal chandeliers and velvet roulette tables in background",
      "warm golden ambient lighting with dramatic shadows and bokeh from chandelier lights"
    ),
    storyTemplate: createStoryTemplate(
      "save the world in style",
      "In a world of secrets and deception, their love is the only mission that truly matters.",
    ),
  },
];
