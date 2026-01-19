/**
 * Sci-Fi Scenarios
 * Scenarios focused on futuristic, space, and cyberpunk themes
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const SCI_FI_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CYBERPUNK,
    title: "Cyberpunk City",
    description: "High-tech low-life future",
    icon: "🌃",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in cyberpunk style on rainy neon-lit street, both facing camera with edgy intense expressions, man in black tactical jacket with glowing circuit patterns, woman in sleek leather coat with holographic accessories, towering skyscrapers with holographic advertisements and flying vehicles in background",
      "vibrant neon pink and cyan lighting with rain reflections and gritty atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "navigate the neon-soaked future",
      "In a world of chrome and code, their connection remains the most human thing of all.",
    ),
  },
  {
    id: ScenarioId.SPACE,
    title: "Cosmic Journey",
    description: "Explore infinite galaxies",
    icon: "🚀",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as astronauts in futuristic space station, both facing camera with wonder-filled smiles through clear helmet visors, wearing sleek white and silver space suits with mission patches, massive observation window showing Earth and stars in background",
      "soft station interior lighting with blue Earth glow and cosmic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "explore the final frontier together",
      "Among the stars, they've found that love truly knows no bounds. Their journey spans galaxies.",
    ),
  },
  {
    id: ScenarioId.SPACE_OPERA,
    title: "Space Opera",
    description: "Epic galactic heroes",
    icon: "⚔️",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as galactic heroes on desert planet, both facing camera with epic heroic expressions, man in dark robes with futuristic armor and energy sword, woman in elegant white robes with flowing cape, twin suns setting over sand dunes with distant spacecraft in background",
      "dramatic golden twin sunset lighting with epic cinematic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "lead the rebellion across the galaxy",
      "Across the stars and sands of time, their destiny is written in the cosmos.",
    ),
  },
  {
    id: ScenarioId.MARS_2050,
    title: "Life on Mars",
    description: "Colonizing the red planet",
    icon: "🪐",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1677038264064-2dedc3e9a9f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y291cGxlJTJDJTIwbWFyc3xlbnwwfHwwfHx8MA%3D%3D",
    aiPrompt: createPhotorealisticPrompt(
      "a couple walking on surface of Mars, both facing camera with pioneering smiles visible through clear helmet glass, wearing sleek white futuristic space suits with red accents, vast rusty red martian landscape with distant dome colony and rocky terrain in background",
      "harsh martian sunlight with dusty red atmosphere and sci-fi realism"
    ),
    storyTemplate: createStoryTemplate(
      "build a new life on Mars",
      "On a new world, under a dusty red sky, they build a future as boundless as their ambition.",
    ),
  },
];
