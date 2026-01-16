import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const VILLAINOUS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.MASTERMINDS,
    title: "The Masterminds",
    description: "Architects of chaos",
    icon: "🦹",
    imageUrl:
      "https://images.unsplash.com/photo-151877066fe63-c6d1a4947271?w=800",
    aiPrompt:
      "A couple as sophisticated villains in a high-tech lair, both looking at the camera with confident villainous smirks, wearing elegant dark designer suits, petting a white cat or holding a glass of wine, massive wall of monitors showing global data in background, powerful and mysterious",
    storyTemplate: createStoryTemplate(
      "plan their next big move",
      "They don't just break the rules; they rewrite them. In a world of black and white, they are the most stylish shade of gray.",
    ),
  },
  {
    id: ScenarioId.CHAOS_BRINGERS,
    title: "Chaos Bringers",
    description: "Rebels with a cause",
    icon: "🔥",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a3e0e/s6SBpgKeHS3AL0ykrc4ac.jpg",
    aiPrompt:
      "A couple in a post-apocalyptic base, both looking at the camera with rebellious expressions, wearing punk-style leather and metal armor, spray-painting a symbol on a wall, sparks and fire in background, chaotic and energetic",
    storyTemplate: createStoryTemplate(
      "shake the foundations of the world",
      "They aren't looking for approval, just excitement. A love that's as volatile and beautiful as a supernova.",
    ),
  },
  {
    id: ScenarioId.HIGH_STAKES_THIEVES,
    title: "Ghost Thieves",
    description: "Master of the night",
    icon: "🎭",
    imageUrl: "https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?w=800",
    aiPrompt:
      "A couple suspended on wires in a high-security museum, both looking at the camera with focused smirks, wearing skin-tight black stealth suits, holding a glowing blue diamond, laser beams and expensive art in background, tense and cinematic",
    storyTemplate: createStoryTemplate(
      "steal the impossible",
      "Even with the world's best security, they always slip through the cracks. The only thing they couldn't steal was each other's hearts - those were given freely.",
    ),
  },
  {
    id: ScenarioId.DARK_EMPIRE_RULERS,
    title: "Dark Sovereigns",
    description: "Majesty of the shadows",
    icon: "🏰",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt:
      "A couple on a dark obsidian throne, both looking at the camera with cold regal smiles, wearing heavy black armor and dark capes, glowing red eyes, gothic cathedral-style throne room with red banners and torches in background, majestic and intimidating",
    storyTemplate: createStoryTemplate(
      "rule an empire of shadows",
      "In a kingdom built on power and fear, they are the only ones they can truly trust. Sovereigns of a world they conquered together.",
    ),
  },
];
