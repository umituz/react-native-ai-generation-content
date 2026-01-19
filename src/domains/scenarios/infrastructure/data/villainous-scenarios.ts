import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const VILLAINOUS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.MASTERMINDS,
    title: "The Masterminds",
    description: "Architects of chaos",
    icon: "🦹",
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as sophisticated villains in high-tech lair, both facing camera with confident villainous smirks, man in elegant dark designer suit petting white Persian cat, woman in sleek black dress holding wine glass, massive wall of monitors showing global data maps in background",
      "dramatic low-key lighting with blue monitor glow and mysterious atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in post-apocalyptic rebel base, both facing camera with rebellious defiant expressions, man in punk-style leather jacket with metal spikes, woman in distressed combat gear spray-painting anarchist symbol on concrete wall, sparks and flames flickering in background",
      "chaotic orange fire lighting with energetic rebellious atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple suspended on wires in high-security museum at night, both facing camera with focused confident smirks, wearing skin-tight black stealth suits with tactical gear, woman holding glowing blue diamond, red laser security beams and priceless art in background",
      "dramatic tense lighting with laser beam glow and cinematic heist atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple on dark obsidian throne, both facing camera with cold regal smiles and subtly glowing red eyes, man in heavy black spiked armor, woman in dark flowing cape and crown, gothic cathedral throne room with red banners and flickering torches in background",
      "dramatic dark lighting with red torch glow and intimidating majestic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "rule an empire of shadows",
      "In a kingdom built on power and fear, they are the only ones they can truly trust. Sovereigns of a world they conquered together.",
    ),
  },
];
