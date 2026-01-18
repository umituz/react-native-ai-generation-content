/**
 * Artistic Scenarios
 * Scenarios focused on different art styles and mediums
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

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
    aiPrompt: createPhotorealisticPrompt(
      "a couple rendered as classical oil painting, both facing camera with serene Renaissance expressions, man in deep cobalt blue velvet doublet with intricate silver embroidery, woman in flowing cerulean silk gown with pearl details, visible impasto brushstrokes and cracked canvas texture, surrealist landscape with rolling ultramarine hills and warm amber sky with golden clouds in background, museum-quality classical painting style",
      "soft diffused Rembrandt lighting with warm golden tones and subtle chiaroscuro shadows"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in bold Pop Art style, both facing camera with confident stylized expressions, man in bright yellow polo shirt with thick black comic outlines, woman in hot pink mod dress with white polka dots, Ben-Day halftone dot pattern overlay with thick black contour lines, vibrant neon magenta cyan and yellow repeated quadrant panels in Andy Warhol screen-print style in background",
      "flat even lighting with saturated primary colors and high contrast graphic quality"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple as ancient Greek marble statues, both facing forward with serene classical expressions, man in draped white Carrara marble toga with laurel wreath, woman in flowing pleated chiton with detailed carved hair ringlets, smooth polished marble texture with subtle gray veining and intricate anatomical carving, grand museum hall with dark walls and dramatic spotlight in background",
      "dramatic museum spotlighting creating stark contrast between illuminated marble and dark shadows"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in Studio Ghibli anime art style, both facing camera with gentle warm smiles and large expressive eyes, man in comfortable navy blue cardigan over white shirt with windswept hair, woman in soft sage green sundress with flowing auburn hair, hand-painted lush emerald meadow with wildflowers and massive fluffy cumulus clouds in azure sky in background, delicate watercolor textures with cel-shaded style",
      "soft diffused afternoon sunlight with warm golden highlights and pastel color palette"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in surreal vaporwave digital dimension, both facing camera as silhouettes with neon edge lighting, standing in infinite tunnel of distorted retro pixels with cyan magenta and chrome yellow digital glitch artifacts, wireframe grid floor stretching to horizon with floating Greek statue busts and palm trees, 80s VHS tracking lines and chromatic aberration effects",
      "intense neon pink and cyan backlighting with purple haze and digital scan line artifacts"
    ),
    storyTemplate: createStoryTemplate(
      "get lost in a retro digital dream",
      "Surfing on neon waves of nostalgia, their love transcends time and pixels.",
    ),
  },
];
