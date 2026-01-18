import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const SULTRY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.MAGNETIC_GAZE,
    title: "Magnetic Tension",
    description: "The spark of attraction",
    icon: "🧲",
    imageUrl:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800",
    aiPrompt:
      "Extreme close-up of a couple's faces, almost touching, looking into each other's eyes with intense magnetic attraction, shallow depth of field, warm cinematic lighting, soft focus on the background, feeling of high romantic tension and undeniable chemistry",
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
    aiPrompt:
      "Close-up of a man whispering into a woman's ear, his lips almost touching her skin, woman closing her eyes with a faint blissful smile, low-key dramatic lighting with high contrast, elegant semi-formal attire, intimate and sultry atmosphere",
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
    aiPrompt:
      "Silhouettes of a couple visible through a foggy bathroom mirror with condensation droplets, man wrapping his arms around woman from behind, only their dark outlines visible against a warm glowing background, tasteful and artistic, focusing on the mood and shape rather than detail",
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
    aiPrompt:
      "A couple in a dimly lit luxury bedroom with silk sheets, both looking at each other while lying close on the bed, man in a partially unbuttoned white shirt, woman in an elegant silk slip-dress, dramatic shadows from candlelight, sophisticated and sultry mood, no nudity",
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
    aiPrompt:
      "A couple sitting closely in front of a roaring fireplace late at night, man's hand gently caressing woman's neck, both looking at each other with intense loving expressions, warm amber light reflecting on their skin, cozy but highly romantic and sultry atmosphere",
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
    aiPrompt:
      "Close-up of a couple's hands intertwined on white linen sheets, woman's legs tangled with man's legs under a soft duvet, soft morning sunlight, focusing on the touch and proximity, no nudity, purely suggestive and tasteful morning intimacy",
    storyTemplate: createStoryTemplate(
      "linger in the comfort of a shared morning",
      "They aren't just sharing a bed; they're sharing a life. In the simple touch of hands and the tangle of limbs, they find a perfect, peaceful harmony.",
    ),
  },
];
