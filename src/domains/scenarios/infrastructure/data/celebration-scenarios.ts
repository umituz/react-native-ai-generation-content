import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const CELEBRATION_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CHRISTMAS,
    title: "Christmas Together",
    description: "Magic of the holidays",
    icon: "🎄",
    imageUrl: "https://images.unsplash.com/photo-1543589077-47d81606c1af?w=800",
    aiPrompt:
      "A couple standing by a beautiful Christmas tree, both looking at the camera with warm happy smiles, dressed in cozy festive sweaters, soft glowing holiday lights and ornaments, snow visible through window in background, magical and warm",
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
      "https://images.unsplash.com/photo-1514525253344-073cda4b8966?w=800",
    aiPrompt:
      "A couple at a glamorous New Year's Eve party, both looking at the camera with ecstatic smiles, dressed in elegant evening attire, holding champagne glasses, fireworks and city lights in background, celebratory and bright",
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
    aiPrompt:
      "A couple at a romantic candlelit dinner, both looking at the camera with loving smiles, dressed in sophisticated evening wear, holding hands across a table with red roses, soft intimate lighting, romantic restaurant in background",
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
    aiPrompt:
      "A couple celebrating a birthday, both looking at the camera with joyful smiles, holding a lit birthday cake, colorful balloons and confetti in background, festive and happy atmosphere",
    storyTemplate: createStoryTemplate(
      "celebrate a special birthday",
      "Another year older, another year of building a beautiful life together. Every wish is for their shared future.",
    ),
  },
  {
    id: ScenarioId.HALLOWEEN,
    title: "Halloween Duo",
    description: "Spooky and sweet",
    icon: "🎃",
    imageUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800",
    aiPrompt:
      "A couple in elaborate matching Halloween costumes, both looking at the camera with playful expressions, dressed in creative costumes, misty graveyard or spooky mansion setting in background, cinematic and fun",
    storyTemplate: createStoryTemplate(
      "embrace the spooky season",
      "Even in the spookiest settings, their love shines through. The ultimate team for any adventure.",
    ),
  },
];
