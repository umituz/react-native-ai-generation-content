/**
 * Solo Artistic Scenarios
 * Single-person art style portraits
 */

import { Scenario, ScenarioId, ScenarioCategory } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const SOLO_ARTISTIC_SCENARIOS: Scenario[] = [
  {
    id: ScenarioId.SOLO_RENAISSANCE_PORTRAIT,
    category: ScenarioCategory.SOLO_ARTISTIC,
    title: "Renaissance Portrait",
    description: "Classical masterpiece style",
    icon: "🎨",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "an elegant noble in Renaissance portrait style, person wearing luxurious velvet robes with gold embroidery, dignified regal expression looking at camera, dark classical background with subtle drapery like Leonardo da Vinci painting",
      "soft chiaroscuro lighting like Old Master paintings"
    ),
    storyTemplate: createStoryTemplate("be immortalized in art", "A masterpiece for the ages."),
  },
  {
    id: ScenarioId.SOLO_POP_ART_ICON,
    category: ScenarioCategory.SOLO_ARTISTIC,
    title: "Pop Art Icon",
    description: "Andy Warhol style",
    icon: "🌈",
    imageUrl: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a striking portrait in bold Pop Art style, person with vibrant colored hair and makeup, confident iconic expression looking at camera, flat bold colors and Ben-Day dots pattern background like Andy Warhol artwork",
      "flat bright pop art lighting with saturated neon colors"
    ),
    storyTemplate: createStoryTemplate("become a pop culture icon", "Art in the age of celebrity."),
  },
  {
    id: ScenarioId.SOLO_IMPRESSIONIST_MUSE,
    category: ScenarioCategory.SOLO_ARTISTIC,
    title: "Impressionist Muse",
    description: "Monet garden style",
    icon: "🌸",
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a dreamy figure in impressionist garden setting, person wearing flowing white dress with parasol, peaceful serene expression looking at camera, soft brushstroke effect with water lilies and flower garden like Monet painting",
      "soft diffused natural lighting with dreamy pastel atmosphere"
    ),
    storyTemplate: createStoryTemplate("inspire great art", "A moment captured in brushstrokes."),
  },
  {
    id: ScenarioId.SOLO_BAROQUE_NOBLE,
    category: ScenarioCategory.SOLO_ARTISTIC,
    title: "Baroque Noble",
    description: "Dramatic classical style",
    icon: "👑",
    imageUrl: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a powerful noble in dramatic Baroque portrait style, person wearing elaborate period costume with lace collar and jewels, commanding authoritative expression looking at camera, rich velvet curtains and dramatic sky in background like Rembrandt",
      "dramatic Baroque lighting with strong contrasts and golden tones"
    ),
    storyTemplate: createStoryTemplate("rule with elegance", "Portrait of power and prestige."),
  },
  {
    id: ScenarioId.SOLO_SURREALIST_DREAM,
    category: ScenarioCategory.SOLO_ARTISTIC,
    title: "Surrealist Dream",
    description: "Salvador Dali style",
    icon: "🎭",
    imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a mysterious figure in surrealist dreamscape, person with enigmatic expression looking at camera, melting clocks floating objects and impossible architecture surrounding them like Salvador Dali painting",
      "otherworldly lighting with long shadows and dream-like atmosphere"
    ),
    storyTemplate: createStoryTemplate("explore the subconscious", "Where dreams become reality."),
  },
];
