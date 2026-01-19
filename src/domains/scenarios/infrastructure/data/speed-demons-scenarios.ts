import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const SPEED_DEMONS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.GRID_START_READY,
    title: "Grid Start",
    description: "Ready for the green light",
    icon: "🏁",
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing in front of sleek Formula 1 race car on sunny track, both facing camera with confident champion smiles, wearing matching professional red and white racing suits holding helmets under arms, heat haze rising from asphalt with pit crew and grandstands in background",
      "bright sunny track day lighting with heat shimmer and high-speed energy"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple leaning against customized neon-lit tuner car on wet Tokyo street at night, both facing camera with cool rebellious smiles, man in black leather jacket, woman in crop top and racing jacket, tire smoke drifting in background, wet pavement reflecting neon signs",
      "vibrant purple and cyan neon lighting with rain reflections and street racing atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple on winner's podium at racing circuit, both facing camera with pure ecstatic joy holding massive gold trophy together, man popping champagne bottle with spray arcing through air, both wearing racing suits with sponsor logos, blurred cheering crowd waving flags in background",
      "bright celebratory lighting with champagne spray and triumphant atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate a hard-won victory at the summit of the sport",
      "The finish line has been crossed, and they've stood the test of time and speed. Today, the world celebrates the most unstoppable duo on the track.",
    ),
  },
];
