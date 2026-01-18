/**
 * Cinematic Scenarios
 * Scenarios focused on popular movie genres and aesthetics
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const CINEMATIC_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.SECRET_AGENT,
    title: "Secret Agents",
    description: "Espionage and action",
    icon: "🕴️",
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as elite secret agents in high-stakes casino, both facing camera with confident mysterious half-smiles, man in perfectly tailored midnight black tuxedo with satin shawl lapels and subtle earpiece, woman in sleek emerald green floor-length gown with thigh slit and diamond choker, standing near baccarat table with chips and cards, opulent casino royale interior with crystal chandeliers and velvet drapes in background",
      "dramatic warm golden lighting with mysterious shadows and highlights on faces"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in classic Film Noir style, both facing camera with moody intense expressions, man in tan double-breasted trench coat with upturned collar and gray fedora tilted low, woman in black fitted dress with seamed stockings and red lipstick holding cigarette holder, black and white cinematic image with high contrast and visible film grain, rain-slicked cobblestone street with neon signs reflecting in puddles and dramatic venetian blind shadows in background",
      "dramatic noir lighting with harsh side light creating deep shadows and silver highlights"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in Wes Anderson cinematic style, both standing in perfect symmetry facing camera with deadpan quirky expressions, man in mustard yellow corduroy suit with brown leather satchel, woman in powder pink A-line dress with peter pan collar and matching beret, perfectly symmetrical pastel mint green hotel lobby with geometric wallpaper and vintage brass elevator and potted plants placed symmetrically",
      "flat even lighting with soft pastel color grading and vintage 35mm film aesthetic"
    ),
    storyTemplate: createStoryTemplate(
      "star in their own quirky tale",
      "In a perfectly symmetrical world, they found the perfect asymmetry of love.",
    ),
  },
];
