/**
 * Cinematic Scenarios
 * Scenarios focused on popular movie genres and aesthetics
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const CINEMATIC_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SECRET_AGENT,
    title: "Secret Agents",
    description: "Espionage and action",
    icon: "🕴️",
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple as secret agents in a casino, both standing near a table and looking at the camera with confident mysterious expressions, dressed in tuxedo and elegant evening dress, high-stakes casino royale setting with dramatic lighting in background, mysterious and elegant",
    storyTemplate: createStoryTemplate(
      "embark on a high-stakes mission",
      "In a world of secrets and danger, they are the only truth each other needs.",
    ),
  },
  {
    id: ScenarioId.FILM_NOIR,
    title: "Film Noir",
    description: "Classic detective mystery",
    icon: "🕵️",
    imageUrl:
      "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in Film Noir style, both looking at the camera with moody intense expressions, dressed in 1940s trench coats and fedoras, black and white high-contrast lighting with film grain, rainy city street at night with dramatic shadows in background, mysterious and moody",
    storyTemplate: createStoryTemplate(
      "solve the mystery of the night",
      "In the shadows of the city, their love is the only light that matters.",
    ),
  },

  {
    id: ScenarioId.WES_ANDERSON,
    title: "Indie Aesthetics",
    description: "Symmetrical pastel dream",
    icon: "🎥",
    imageUrl:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in Wes Anderson style, both standing symmetrically and looking directly at the camera with deadpan expressions, dressed in quirky vintage outfits, symmetrical composition with pastel color palette, whimsical hotel or stylized set in background, quirky and symmetric",
    storyTemplate: createStoryTemplate(
      "star in their own quirky tale",
      "In a perfectly symmetrical world, they found the perfect asymmetry of love.",
    ),
  },
];
