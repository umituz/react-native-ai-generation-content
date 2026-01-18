import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const CASINO_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.HIGH_ROLLER_ROULETTE,
    title: "The High Roller",
    description: "All on red",
    icon: "🎰",
    imageUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800",
    aiPrompt:
      "A couple at a high-end roulette table in a glamorous casino, man in a sharp black tuxedo, woman in a shimmering evening gown and diamonds, everyone watching as the wheel spins, both looking at each other with intense daring smiles, luxury lighting, cinematic and high-stakes",
    storyTemplate: createStoryTemplate(
      "play the ultimate game of chance and charm",
      "They aren't just gambling on the wheel; they're betting on each other. And with a bond like theirs, they always come out on top.",
    ),
  },
  {
    id: ScenarioId.MARTINI_POWER_COUPLE,
    title: "Martini Secrets",
    description: "Shaken, not stirred",
    icon: "🍸",
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800",
    aiPrompt:
      "A couple sitting at a sleek marble bar in a luxury casino, holding martini glasses, both looking at the camera with mysterious and alluring smiles, wearing high-end formal attire, sophisticated gold and glass decor in background, James Bond style elegance",
    storyTemplate: createStoryTemplate(
      "share a secret in the heart of high society",
      "In a world of glamour and intrigue, they are the most interesting pair in the room. Cool, collected, and completely devoted.",
    ),
  },
  {
    id: ScenarioId.CASINO_HEIST_ESCAPE,
    title: "The Great Escape",
    description: "Winners take all",
    icon: "🏎️",
    imageUrl:
      "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    aiPrompt:
      "A couple walking briskly away from a grand casino entrance at night, man carrying a silver briefcase, woman looking over her shoulder with a triumphant smile, both in evening attire, valet parking with luxury cars in background, cinematic action lighting, thrilling and stylish",
    storyTemplate: createStoryTemplate(
      "pull off the most stylish heist of the century",
      "They came, they saw, and they won. Not just the chips, but a life of thrill that only a duo like them could handle.",
    ),
  },
];
