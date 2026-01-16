/**
 * Sci-Fi Scenarios
 * Scenarios focused on futuristic, space, and cyberpunk themes
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const SCI_FI_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CYBERPUNK,
    title: "Cyberpunk City",
    description: "High-tech low-life future",
    icon: "🌃",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "A couple in Cyberpunk 2077 style, both looking at the camera with edgy intense expressions, dressed in fierce futuristic tech-wear with neon accents, neon-lit night city with holographic ads in background, gritty and vibrant",
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
    aiPrompt:
      "A couple as astronauts in a space station, both looking at the camera with wonder-filled smiles, dressed in sleek space suits, futuristic space station with Earth visible through window in background, sci-fi and awe-inspiring",
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
    aiPrompt:
      "A couple as galactic heroes, both looking at the camera with epic heroic expressions, dressed in futuristic robes and armor, desert planet sunset with twin suns and sci-fi elements in background, epic and adventurous",
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
    aiPrompt:
      "A couple walking on the surface of Mars, both looking at the camera through clear helmets, dressed in sleek white futuristic space suits, faces visible through helmet glass, vast red martian landscape in background, epic sci-fi realism",
    storyTemplate: createStoryTemplate(
      "build a new life on Mars",
      "On a new world, under a dusty red sky, they build a future as boundless as their ambition.",
    ),
  },
];
