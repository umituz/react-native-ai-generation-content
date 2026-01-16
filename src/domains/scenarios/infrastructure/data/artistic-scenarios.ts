/**
 * Artistic Scenarios
 * Scenarios focused on different art styles and mediums
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const ARTISTIC_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.OIL_PAINTING,
    title: "Oil Painting",
    description: "Classical museum masterpiece",
    icon: "🎨",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a5d07/Pg4WLBXxrG3UaCfn6Evix.jpg",
    previewImageUrl:
      "https://images.unsplash.com/photo-1741724822064-9f335c70486e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y291cGxlJTJDJTIwb2lsJTIwcGFpbnRpbmd8ZW58MHx8MHx8fDA%3D",
    aiPrompt:
      "A couple as an oil painting, both looking at the camera, dressed in surreal blue patterned clothing, visible brushstrokes with textured canvas look, surreal landscape with stylized blue hills and warm sky tones in background, classic surrealist painting style, artistic and dreamlike",
    storyTemplate: createStoryTemplate(
      "become a timeless masterpiece",
      "Immortalized in oil and canvas, their love is a work of art that will endure for centuries.",
    ),
  },
  {
    id: ScenarioId.POP_ART,
    title: "Pop Art",
    description: "Bold colorful retro style",
    icon: "💥",
    imageUrl:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in Pop Art style, both looking at the camera, dressed in retro modern outfits, bold graphic elements with half-tone dots and thick black outlines, vibrant neon colors and repeated patterns in Andy Warhol style in background, bold and colorful",
    storyTemplate: createStoryTemplate(
      "explode with color and life",
      "Bold, bright, and unforgettable - their love life is anything but black and white.",
    ),
  },
  {
    id: ScenarioId.MARBLE_STATUE,
    title: "Marble Statues",
    description: "Ancient greek sculpture",
    icon: "🏛️",
    imageUrl:
      "https://images.unsplash.com/photo-1524397057410-1e775ed476f3?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple as white marble statues, both looking forward with serene expressions, dressed in draped classical robes, smooth marble texture with intricate carving, museum setting with dramatic lighting in background, eternal and artistic",
    storyTemplate: createStoryTemplate(
      "stand eternal in stone",
      "Carved from the bedrock of eternity, their bond stands unbreakable through the ages.",
    ),
  },
  {
    id: ScenarioId.ANIME_DREAM,
    title: "Anime Dream",
    description: "Studio Ghibli aesthetic",
    icon: "☁️",
    imageUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in Studio Ghibli anime style, both looking at the camera with gentle smiles, dressed in casual comfortable clothing, hand-painted lush green meadow with large fluffy clouds in background, vibrant watercolors with soft lighting, anime art style, dreamy and peaceful",
    storyTemplate: createStoryTemplate(
      "wander through a painted dream",
      "In a world painted with dreams and watercolors, every moment is a gentle breeze of happiness.",
    ),
  },
  {
    id: ScenarioId.RETRO_VAPORWAVE,
    title: "Vaporwave Dream",
    description: "Retro 80s aesthetic magic",
    icon: "💾",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a3b38/93WWsOvFKAraRQorOL1Qy.jpg",
    previewImageUrl:
      "https://images.unsplash.com/photo-1761473780164-0c19b4b63472?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cGxlJTJDJTIwcmV0cm8lMjB2YXBvcndhdmV8ZW58MHx8MHx8fDA%3D",
    aiPrompt:
      "A couple standing in a digital vaporwave tunnel, both looking at the camera, silhouetted figures with colorful lighting, mesmerizing tunnel of distorted neon pixels with yellow green and blue digital glitches in background, surreal digital art style, retro-futuristic and psychedelic",
    storyTemplate: createStoryTemplate(
      "get lost in a retro digital dream",
      "Surfing on neon waves of nostalgia, their love transcends time and pixels.",
    ),
  },
];
