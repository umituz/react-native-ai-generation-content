import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const GOTHIC_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.VAMPIRE_ROYALTY,
    title: "Vampire Royalty",
    description: "Eternal elegance",
    icon: "🧛",
    imageUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800",
    aiPrompt:
      "A couple as high-born vampire royalty in a moonlit gothic manor, both looking at the camera with alluring intense expressions, wearing black and red Victorian velvet attire with lace and silver details, pale skin, red wine glasses, grand fireplace and stone walls in background, eerie and romantic",
    storyTemplate: createStoryTemplate(
      "live eternally in the shadows",
      "Time means nothing when you have forever. An eternal bond that transcends mortal life.",
    ),
  },
  {
    id: ScenarioId.WEREWOLF_PACK,
    title: "Werewolf Alphas",
    description: "Strength of the pack",
    icon: "🐺",
    imageUrl:
      "https://v3b.fal.media/files/b/0a89bbdb/Q_t0NaB59_MYmsvn86VsC.jpg",
    aiPrompt:
      "A couple as werewolf alpha leaders in a dark wild forest, both looking at the camera with fierce glowing eyes, wearing rugged leather and fur clothing, mist and large full moon in background, cinematic and powerful",
    storyTemplate: createStoryTemplate(
      "lead the wild pack",
      "Wild and untamed, they find their true strength in the primal connection they share under the moon.",
    ),
  },
  {
    id: ScenarioId.VICTORIAN_GHOSTS,
    title: "Victorian Echoes",
    description: "Hauntingly beautiful",
    icon: "👻",
    imageUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
    aiPrompt:
      "A couple as elegant ethereal ghosts in a Victorian library, both looking at the camera with gentle melancholic smiles, translucent shimmering appearance, wearing ornate 19th-century attire, dust motes dancing in sunbeams through large windows, haunting and poetic",
    storyTemplate: createStoryTemplate(
      "linger in the halls of history",
      "Even death couldn't separate them. A love that still echoes through the corridors of time.",
    ),
  },
  {
    id: ScenarioId.GOTHIC_CATHEDRAL,
    title: "Gothic Sanctuary",
    description: "Dark architectural beauty",
    icon: "⛪",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    aiPrompt:
      "A couple in a vast gothic cathedral, both looking at the camera with serene expressions, wearing long black coats and silver jewelry, standing before high stained glass windows, cinematic lighting with long shadows, majestic and moody",
    storyTemplate: createStoryTemplate(
      "find peace in the high vaults",
      "Surrounded by the grandeur of stone and glass, they find a sanctuary for their dark and beautiful love.",
    ),
  },
];
