import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const SPEED_DEMONS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.GRID_START_READY,
    title: "Grid Start",
    description: "Ready for the green light",
    icon: "🏁",
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    aiPrompt:
      "A couple standing in front of a sleek Formula 1 race car on a sunny track, both wearing matching professional racing suits and holding helmets under their arms, looking at the camera with confident champion smiles, heat haze on the asphalt, high-speed energy",
    storyTemplate: createStoryTemplate(
      "prepare for the most important race of your lives",
      "Engines are roaring and the lights are about to change. With each other as the ultimate co-pilot, victory isn't just a goal—it's a certainty.",
    ),
  },
  {
    id: ScenarioId.STREET_DRIFT_NEON,
    title: "Street Drift",
    description: "Neon Tokyo nights",
    icon: "🏎️",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    aiPrompt:
      "A couple leaning against a customized neon-lit tuner car on a wet Tokyo street at night, smoke from tires in background, both wearing edgy street fashion, looking at the camera with cool rebellious smiles, purple and cyan neon signs reflecting everywhere, Fast and Furious style",
    storyTemplate: createStoryTemplate(
      "master the urban underworld with style and speed",
      "They aren't just driving; they're performing a high-speed ballet through the neon veins of the city. A love that's always in the fast lane.",
    ),
  },
  {
    id: ScenarioId.CHAMPIONS_PODIUM_WIN,
    title: "Champions' Podium",
    description: "Victory is sweet",
    icon: "🏆",
    imageUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800",
    aiPrompt:
      "A couple on a winner's podium at a racing circuit, both holding a massive gold trophy together, man popping a bottle of champagne with spray in the air, both looking at the camera with pure ecstatic joy, wearing racing suits, blurred crowd and flags in background, triumphant and glorious",
    storyTemplate: createStoryTemplate(
      "celebrate a hard-won victory at the summit of the sport",
      "The finish line has been crossed, and they've stood the test of time and speed. Today, the world celebrates the most unstoppable duo on the track.",
    ),
  },
];
