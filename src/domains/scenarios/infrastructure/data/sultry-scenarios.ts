import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const SULTRY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.MAGNETIC_GAZE,
    title: "Magnetic Tension",
    description: "The spark of attraction",
    icon: "🧲",
    imageUrl:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "extreme close-up portrait of a couple's faces almost touching, gazing intensely into each other's eyes with magnetic attraction, noses nearly brushing, man with subtle stubble, woman with natural makeup, foreheads close together, soft out-of-focus warm background",
      "warm cinematic lighting with soft golden tones, dramatic shallow depth of field, intimate romantic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "feel the undeniable magnetics between two souls",
      "In the silence between them, the air crackles with a tension that speaks louder than any words ever could. A spark that's ready to ignite a lifetime.",
    ),
  },
  {
    id: ScenarioId.PASSIONATE_WHISPER,
    title: "The Secret Whisper",
    description: "Close and personal",
    icon: "👂",
    imageUrl: "https://images.unsplash.com/photo-1485872299829-c673f5194813?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "close-up of a man whispering intimately into woman's ear, his lips almost touching her ear, woman with eyes gently closed showing a faint blissful smile, man in dark blazer, woman in elegant black dress with delicate jewelry, subtle makeup",
      "low-key dramatic lighting with high contrast, moody shadows, intimate sultry atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "share a secret that only their hearts know",
      "A whisper, a breath, a promise shared in the dark. In these close moments, the rest of the world is just background noise to their shared secret.",
    ),
  },
  {
    id: ScenarioId.STEAMY_MIRROR_SILHOUETTE,
    title: "Mirror Reflection",
    description: "After the rain",
    icon: "🌫️",
    imageUrl:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "artistic silhouettes of a couple visible through a foggy bathroom mirror covered in condensation water droplets, man embracing woman from behind, only their dark shadowy outlines visible against warm glowing background light, tasteful and artistic composition focusing on mood and shape, luxurious bathroom setting",
      "soft diffused backlight through steam, warm ambient glow, artistic moody atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "find beauty in the hazy reflections of love",
      "Behind the fog and the steam, there's only the truth of their connection. A moment of pure, unadorned intimacy that belongs only to them.",
    ),
  },
  {
    id: ScenarioId.SILK_AND_SHADOWS,
    title: "Silk & Shadows",
    description: "Elegant evening",
    icon: "🕯️",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a sophisticated couple in a dimly lit luxury bedroom with champagne silk sheets, lying close together on the bed looking at each other, man in partially unbuttoned crisp white dress shirt, woman in elegant champagne silk slip-dress, multiple candles on nightstand casting dancing shadows on walls, no nudity, tasteful and sophisticated",
      "warm candlelight creating dramatic shadows, soft golden ambient glow, elegant sultry mood"
    ),
    storyTemplate: createStoryTemplate(
      "embrace the elegance of a moonlit evening",
      "Under the play of light and shadow, they find a world that's uniquely theirs. A love as smooth as silk and as deep as the night.",
    ),
  },
  {
    id: ScenarioId.LOVERS_FIREPLACE_INTIMACY,
    title: "Midnight Embers",
    description: "Warmth and desire",
    icon: "🔥",
    imageUrl: "https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a romantic couple sitting closely on a plush rug in front of a roaring stone fireplace late at night, man's hand gently resting on woman's neck, both gazing at each other with intense loving expressions, wearing comfortable casual clothing, warm amber firelight reflecting on their faces, cozy living room setting",
      "warm amber fireplace glow reflecting on skin, flickering light creating soft shadows, cozy intimate romantic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "ignite a flame that never goes out",
      "The fire in the hearth provides the warmth, but the fire in their eyes provides the light. A midnight moment where every ember tells a story of passion.",
    ),
  },
  {
    id: ScenarioId.TANGLED_SHEETS_MOMENT,
    title: "Tangled Sheets",
    description: "Late morning bliss",
    icon: "🛌",
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "artistic close-up of a couple's hands lovingly intertwined on crisp white cotton linen sheets, legs gently tangled under a soft white duvet, tasteful and suggestive morning intimacy with no nudity, focus on the tender touch and closeness, elegant minimalist bedroom setting",
      "soft diffused morning sunlight through sheer curtains, warm intimate atmosphere, peaceful morning ambiance"
    ),
    storyTemplate: createStoryTemplate(
      "linger in the comfort of a shared morning",
      "They aren't just sharing a bed; they're sharing a life. In the simple touch of hands and the tangle of limbs, they find a perfect, peaceful harmony.",
    ),
  },
];
