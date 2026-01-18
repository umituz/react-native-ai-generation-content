import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ROMANTIC_KISSES_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FIRST_KISS_MOMENT,
    title: "The First Kiss",
    description: "That nervous magic",
    icon: "🎇",
    imageUrl:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800",
    aiPrompt:
      "A couple in a park at twilight, standing close under a blossoming cherry tree, just as their lips are about to touch for their first kiss, both looking at each other with closed eyes and nervous happy smiles, soft magical lighting, fireflies in background, pure and sweet",
    storyTemplate: createStoryTemplate(
      "relive the electric spark of a first kiss",
      "The world stands still, the stars align, and in that fleeting moment, they realize that everything has changed forever. The start of a thousand chapters.",
    ),
  },
  {
    id: ScenarioId.FOREHEAD_KISS_GENTLE,
    title: "Forehead Kiss",
    description: "Pure protection",
    icon: "😌",
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    aiPrompt:
      "A couple in a field of sunflowers, man gently kissing the woman on her forehead, woman closing her eyes with a serene and safe expression, both dressed in soft linen summer clothes, warm golden sunset light, feel of peace and deep respect",
    storyTemplate: createStoryTemplate(
      "cherish a moment of gentle protection",
      "More than passion, it's a promise. A forehead kiss that says 'I'll always protect you' without speaking a single word.",
    ),
  },
  {
    id: ScenarioId.HAND_KISS_ELEGANCE,
    title: "Stolen Hand Kiss",
    description: "Chivalrous and sweet",
    icon: "🤝",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    aiPrompt:
      "A couple at an elegant outdoor gala, man holding woman's hand and kissing the back of it while looking at her with devotion, woman looking at the camera with a surprised and blissful smile, wearing high-end formal attire, grand garden with fairy lights in background, sophisticated and romantic",
    storyTemplate: createStoryTemplate(
      "experience a moment of classic chivalry",
      "In a world of fast-paced lives, they find time for the old-school gestures. A hand kiss that feels like a pledge of eternal devotion.",
    ),
  },
  {
    id: ScenarioId.SUNSET_KISS_SILHOUETTE,
    title: "Sunset Silhouette",
    description: "Classic beach romance",
    icon: "🌅",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    aiPrompt:
      "A couple in silhouette against a massive vibrant orange and purple sunset on a beach, kissing passionately as the waves lap at their feet, sun low on the horizon creating a blindingly beautiful lens flare, romantic and timeless",
    storyTemplate: createStoryTemplate(
      "dissolve into the colors of a perfect sunset",
      "No words, no people, just two souls becoming one against the canvas of the sky. A kiss that echoes the beauty of the universe.",
    ),
  },
  {
    id: ScenarioId.ESKIMO_KISS_PLAYFUL,
    title: "Eskimo Kiss",
    description: "Playful connection",
    icon: "👃",
    imageUrl:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800",
    aiPrompt:
      "A couple sitting on a cozy rug in front of a fireplace, rubbing their noses together in a playful 'Eskimo kiss', both looking at the camera with wide laughing eyes, wearing oversized fuzzy sweaters, warm amber light and soft shadows, cute and intimate",
    storyTemplate: createStoryTemplate(
      "share a playful moment of pure joy",
      "Love isn't always serious; it's the giggles and the nose-rubs that build the strongest bridges. A connection as sweet as a winter morning.",
    ),
  },
  {
    id: ScenarioId.WEDDING_KISS_ALTAR,
    title: "The Altar Kiss",
    description: "Just married!",
    icon: "👰",
    imageUrl:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
    aiPrompt:
      "A couple's first kiss at the altar after being pronounced husband and wife, man dipping woman slightly, church or garden wedding setting, guests clapping in the blurred background, confetti in the air, both looking at each other with triumphant love, celebratory and glorious",
    storyTemplate: createStoryTemplate(
      "seal a lifetime promise with a kiss",
      "The 'I do' was the promise; the kiss is the seal. A moment of pure victory as they step into their future together.",
    ),
  },
  {
    id: ScenarioId.RAINY_KISS_PASSION,
    title: "Passtionate Rain",
    description: "Cinematic downpour",
    icon: "🌧️",
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    aiPrompt:
      "A couple kissing passionately in the middle of a heavy rainstorm on a city street, man's hands cupping the woman's face, rain soaked clothes, neon lights reflecting in puddles, dramatic cinematic lighting, raw emotional intensity",
    storyTemplate: createStoryTemplate(
      "lose yourselves in the rhythm of the rain",
      "The storm may be wild, but their passion is wilder. A kiss that proves that true love doesn't wait for the storm to pass; it dances in the rain.",
    ),
  },
];
