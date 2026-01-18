import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const ROMANTIC_KISSES_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FIRST_KISS_MOMENT,
    title: "The First Kiss",
    description: "That nervous magic",
    icon: "🎇",
    imageUrl:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a young couple standing close under a blooming pink cherry blossom tree in a serene park at twilight, lips about to touch for their first kiss, eyes gently closed with nervous happy expressions, man in casual button-down shirt, woman in light floral dress, delicate pink petals falling around them, fireflies creating magical bokeh points of light",
      "soft magical twilight lighting, golden hour warmth mixed with cool blue dusk, dreamy romantic atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a loving couple in a golden sunflower field at sunset, man tenderly kissing woman on her forehead with closed eyes, woman with eyes closed showing serene peaceful expression, both wearing soft cream linen summer clothing, tall sunflowers surrounding them, endless field stretching to horizon",
      "warm golden sunset backlighting, soft lens flare, natural warm summer atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "an elegant couple at an upscale outdoor garden gala, man in tailored black tuxedo gently holding and kissing the back of woman's hand while gazing at her with devotion, woman in stunning emerald evening gown looking at camera with surprised blissful smile, manicured garden with warm string lights and hedges in background",
      "warm golden fairy light illumination, soft evening ambiance, sophisticated romantic atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple in dramatic silhouette kissing passionately on a beach, waves gently lapping at their bare feet, massive vibrant sunset with brilliant orange red and purple colors filling the sky, sun low on horizon creating natural lens flare, their dark figures contrasting against the colorful sky",
      "dramatic sunset backlighting, vibrant orange and magenta sky tones, cinematic silhouette lighting"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a playful couple sitting on a cozy knit rug in front of a crackling fireplace, rubbing their noses together in a cute eskimo kiss, both facing camera with wide genuine laughing smiles showing teeth, wearing oversized chunky cable-knit sweaters in cream and gray, thick wool blanket around them",
      "warm amber fireplace glow, soft flickering light creating gentle shadows, cozy intimate winter atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a newlywed couple sharing their first kiss at a beautiful garden wedding altar, groom in classic black tuxedo dipping bride slightly, bride in elegant white lace wedding gown with flowing veil, guests visible applauding in soft background blur, white rose petal confetti floating in air, floral arch with white and blush roses framing them",
      "bright natural daylight with soft diffusion, warm celebratory atmosphere, romantic outdoor wedding lighting"
    ),
    storyTemplate: createStoryTemplate(
      "seal a lifetime promise with a kiss",
      "The 'I do' was the promise; the kiss is the seal. A moment of pure victory as they step into their future together.",
    ),
  },
  {
    id: ScenarioId.RAINY_KISS_PASSION,
    title: "Passionate Rain",
    description: "Cinematic downpour",
    icon: "🌧️",
    imageUrl:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a passionate couple kissing intensely in a heavy rainstorm on a wet city street at night, man's hands tenderly cupping woman's face, both completely soaked with hair wet and clinging to faces, rain droplets visible mid-fall, colorful neon signs reflecting in puddles on wet asphalt, raindrops creating ripples",
      "dramatic cinematic night lighting, colorful neon reflections in rain puddles, moody urban atmosphere with rain streaks"
    ),
    storyTemplate: createStoryTemplate(
      "lose yourselves in the rhythm of the rain",
      "The storm may be wild, but their passion is wilder. A kiss that proves that true love doesn't wait for the storm to pass; it dances in the rain.",
    ),
  },
];
