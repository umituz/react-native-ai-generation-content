import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const CELEBRATION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CHRISTMAS,
    title: "Christmas Together",
    description: "Magic of the holidays",
    icon: "🎄",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple standing beside beautifully decorated Christmas tree, both facing camera with warm genuine smiles, man in cozy burgundy cable-knit sweater with reindeer pattern, woman in cream turtleneck sweater with fair isle design holding hot cocoa mug, tall noble fir tree adorned with gold and red glass ornaments and warm white string lights, wrapped presents with velvet bows beneath tree, snow falling gently outside frosted window in background",
      "warm cozy indoor lighting from fireplace and tree lights with soft golden glow"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate the magic of Christmas",
      "Wrapped in the warmth of holiday lights, they share the greatest gift of all - each other.",
    ),
  },
  {
    id: ScenarioId.NEW_YEARS,
    title: "New Year's Eve",
    description: "Counting down to forever",
    icon: "🎆",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at glamorous rooftop New Year's Eve party, both facing camera with ecstatic celebratory smiles, man in tailored black suit with silver tie and party horn, woman in sparkling silver cocktail dress with crystal earrings raising champagne coupe, spectacular colorful fireworks exploding over city skyline with illuminated skyscrapers and midnight countdown clock showing 12:00 in background",
      "dramatic night lighting with bursts of colorful firework light and warm party ambiance"
    ),
    storyTemplate: createStoryTemplate(
      "ring in the new year together",
      "As the clock strikes midnight, they toast to a future filled with new adventures and eternal love.",
    ),
  },
  {
    id: ScenarioId.VALENTINES,
    title: "Valentine's Romance",
    description: "Day of love",
    icon: "❤️",
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at intimate Valentine's dinner, both facing camera with loving tender smiles and hands touching across table, man in charcoal dress shirt with sleeves rolled, woman in elegant wine red wrap dress with delicate gold necklace, small round table with white linen tablecloth and single red rose in crystal vase and flickering votive candles, upscale romantic restaurant with soft bokeh lights in background",
      "warm romantic candlelight with soft amber glow and intimate low-light atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate the day of love",
      "Every day is Valentine's Day when they're together, but today feels a little more magical.",
    ),
  },
  {
    id: ScenarioId.BIRTHDAY,
    title: "Birthday Surprise",
    description: "Wishing for the best",
    icon: "🎂",
    imageUrl:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple celebrating birthday together, both facing camera with joyful excited smiles, holding three-tier chocolate cake with lit golden sparkler candles, man in casual blue button-up shirt, woman in floral sundress with birthday tiara, colorful helium balloons in pink gold and teal and scattered confetti floating in air in background",
      "bright cheerful party lighting with warm golden tones from candles illuminating happy faces"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate a special birthday",
      "Another year older, another year of building a beautiful life together. Every wish is for their shared future.",
    ),
  },
  {
    id: ScenarioId.HALLOWEEN_DUO,
    title: "Halloween Duo",
    description: "Spooky and sweet",
    icon: "🎃",
    imageUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in elaborate matching Halloween costumes as Victorian vampires, both facing camera with playful mysterious expressions showing subtle fangs, man in black velvet cape with high collar and crimson vest, woman in elegant black lace gown with blood-red corset and pale makeup with dramatic eyes, misty Gothic graveyard with ancient stone tombstones and gnarled bare trees with full moon behind creepy Victorian mansion in background",
      "eerie atmospheric lighting with cool blue moonlight and orange accent from carved jack-o-lanterns"
    ),
    storyTemplate: createStoryTemplate(
      "embrace the spooky season",
      "Even in the spookiest settings, their love shines through. The ultimate team for any adventure.",
    ),
  },
];
