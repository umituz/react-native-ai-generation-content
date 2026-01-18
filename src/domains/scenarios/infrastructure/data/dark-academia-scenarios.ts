import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const DARK_ACADEMIA_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SECRET_LIBRARY_STUDY,
    title: "The Secret Library",
    description: "Midnight research",
    icon: "🕯️",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in grand ancient library at midnight poring over massive leather-bound book together, both faces illuminated by warm candlelight with intellectual fascination, man in brown herringbone tweed blazer over cream wool turtleneck sweater, woman in burgundy cardigan over white oxford shirt with reading glasses pushed up on head, towering dark mahogany bookshelves reaching into shadows with antique brass library ladder and scattered open tomes and inkwells on oak reading table",
      "dramatic candlelight with warm golden glow on faces and deep shadows between bookshelves"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple walking through historic Oxford university courtyard, both facing camera with sophisticated scholarly smiles, man in charcoal wool overcoat over camel sweater vest and white shirt with burgundy tie carrying worn leather satchel, woman in long navy peacoat over plaid skirt and knee-high boots holding stack of vintage books, ancient honey-colored limestone buildings with Gothic pointed arches and mullioned windows, amber and russet autumn leaves scattered on cobblestone path",
      "soft diffused overcast lighting with muted golden autumn tones and slight mist"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple on plush emerald velvet Chesterfield sofa in study filled with books, man in cream cable-knit sweater reading small leather-bound poetry book aloud, woman with head resting blissfully on his shoulder eyes closed with peaceful smile wearing burgundy turtleneck dress, walls lined floor to ceiling with books and dozens of ivory pillar candles on mantelpiece and side tables creating warm atmospheric glow",
      "rich warm candlelight with high contrast between illuminated faces and shadowy book-lined walls"
    ),
    storyTemplate: createStoryTemplate(
      "lose yourselves in the rhythm of eternal verses",
      "Words have power, but the silence they share between the lines is even more profound. A love that's as deep as the most classic sonnet.",
    ),
  },
];
