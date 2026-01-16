import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ACTION_STEALTH_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ELITE_HEIST,
    title: "Elite Heist Team",
    description: "The ultimate score",
    icon: "💎",
    imageUrl: "https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?w=800",
    aiPrompt:
      "A couple as a professional heist team, both looking at the camera with confident smirk, wearing tactical black stealth gear and headsets, holding high-tech equipment, laser security grid and grand vault in background, tense and cinematic",
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
      "https://images.unsplash.com/photo-1564613311141-94754409395f?w=800",
    aiPrompt:
      "A couple as fighter pilots, both looking at the camera with heroic smiles, wearing olive green flight suits and holding helmets, standing in front of a modern fighter jet on an aircraft carrier deck, sunrise sky in background, powerful and patriotic",
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
    aiPrompt:
      "A couple as survivors in a post-apocalyptic world, both looking at the camera with resilient expressions, wearing weathered rustic clothing and gear, overgrown abandoned city streets with nature reclaiming buildings in background, cinematic and gritty",
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
    aiPrompt:
      "A couple as secret agents, both looking at the camera with alluring confident expressions, dressed in sleek black tuxedo and elegant black evening gown, holding concealed gadgets, exotic luxury casino or grand gala in background, glamorous and mysterious",
    storyTemplate: createStoryTemplate(
      "save the world in style",
      "In a world of secrets and deception, their love is the only mission that truly matters.",
    ),
  },
];
