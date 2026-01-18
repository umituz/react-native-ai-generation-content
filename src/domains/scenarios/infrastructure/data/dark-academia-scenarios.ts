import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const DARK_ACADEMIA_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SECRET_LIBRARY_STUDY,
    title: "The Secret Library",
    description: "Midnight research",
    icon: "🕯️",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt:
      "A couple in a grand ancient library at midnight, both looking at a massive leather-bound book together by candlelight, wearing tweed blazers and wool sweaters, dark wood bookshelves stretching into the shadows, atmospheric and intellectual, dark academia aesthetic",
    storyTemplate: createStoryTemplate(
      "uncover ancient secrets in the hush of the midnight library",
      "Among the scent of old paper and the soft glow of candles, they find that the greatest story ever written is the one they're living together.",
    ),
  },
  {
    id: ScenarioId.OXFORD_ACADEMIC_WALK,
    title: "Oxford Walk",
    description: "Classic scholarly stroll",
    icon: "🎓",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt:
      "A couple walking through the courtyard of a historic university (Oxford style), ancient stone buildings and gothic arches, both dressed in classic scholarly fashion, holding leather satchels, autumn leaves on the ground, overcast soft lighting, sophisticated and timeless",
    storyTemplate: createStoryTemplate(
      "walk the halls of wisdom together",
      "Every step through these hallowed grounds is a reminder that their journey is one of constant discovery and shared growth.",
    ),
  },
  {
    id: ScenarioId.POETRY_CANDLELIGHT,
    title: "Candlelit Poetry",
    description: "Soulful verses",
    icon: "🖋️",
    imageUrl:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
    aiPrompt:
      "A couple sitting on a plush velvet sofa in a study filled with books, man reading a small poetry book to the woman, woman leaning her head on his shoulder with a blissful expression, dozens of candles lighting the room, high-contrast warm lighting, romantic and intellectual",
    storyTemplate: createStoryTemplate(
      "lose yourselves in the rhythm of eternal verses",
      "Words have power, but the silence they share between the lines is even more profound. A love that's as deep as the most classic sonnet.",
    ),
  },
];
