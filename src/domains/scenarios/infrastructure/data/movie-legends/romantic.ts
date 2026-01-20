/**
 * Romantic Movie Legends
 * Iconic romantic film moments
 */

import { Scenario, ScenarioId } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const ROMANTIC_MOVIE_SCENARIOS: Omit<Scenario, "outputType" | "category">[] = [
  {
    id: ScenarioId.TITANIC_BOW,
    title: "Titanic Bow",
    description: "I'm flying, Jack!",
    icon: "🚢",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating iconic Titanic bow pose on grand ocean liner, man in period suspenders and white shirt holding woman from behind, woman with arms outstretched in flowing Edwardian dress with windswept hair, both facing camera with blissful romantic smiles, dramatic orange and pink sunset reflecting on endless ocean in background",
      "warm golden sunset backlighting with ocean spray and wind effect",
    ),
    storyTemplate: createStoryTemplate(
      "recreate the most romantic moment in cinema history",
      "With the wind in their hair and the sunset on their faces, they feel like they're flying. A love that's as vast and deep as the ocean.",
    ),
  },
  {
    id: ScenarioId.NOTEBOOK_RAIN,
    title: "The Rain Kiss",
    description: "It wasn't over!",
    icon: "🌧️",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in passionate embrace during heavy rainstorm recreating The Notebook, both facing camera with intense emotional smiles showing happy tears mixing with rain, completely soaked with clinging wet clothing, man in drenched white t-shirt woman in rain-soaked summer dress, rustic wooden dock and misty lake with moody gray sky in background",
      "dramatic stormy lighting with rain streaks and emotional atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "promise to never let go",
      "Let the rain fall; they have everything they need right here. A love that survives every storm and only grows stronger with time.",
    ),
  },
  {
    id: ScenarioId.GHOST_POTTERY,
    title: "Pottery Romance",
    description: "Unchained melody",
    icon: "🏺",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at pottery wheel recreating Ghost scene, man sitting behind woman with his hands gently over hers shaping wet terracotta clay, both facing camera with intimate tender smiles, clay-covered fingers intertwined on spinning vase, soft warm indoor lighting from nearby lamp, rustic pottery studio with shelves of finished ceramics in background",
      "warm intimate golden lamp light with soft romantic atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "share a moment of artistic connection",
      "In the soft clay and the gentle music, they find a connection that transcends time. A love that's truly unchained.",
    ),
  },
  {
    id: ScenarioId.PRETTY_WOMAN_BALCONY,
    title: "Modern Fairytale",
    description: "Rescue on the fire escape",
    icon: "🏢",
    imageUrl: "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating Pretty Woman fire escape scene, man climbing rusty iron ladder with red rose in mouth and charming grin, woman in silk robe leaning over balcony railing looking down with amazed ecstatic smile, both facing camera, urban LA sunset with palm trees and city buildings in background",
      "warm golden sunset backlighting with romantic urban glow",
    ),
    storyTemplate: createStoryTemplate(
      "write their own modern fairytale",
      "He climbed the tower to rescue her, and she rescued him right back. A love that changed everything they knew about the world.",
    ),
  },
  {
    id: ScenarioId.ROMEO_AQUARIUM,
    title: "Aquarium Glance",
    description: "Love at first sight",
    icon: "🐠",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple gazing at each other through large aquarium tank, both visible through glass with mesmerized love-struck expressions, man in 90s silk shirt and chain, woman in sparkly party dress with 90s makeup, colorful tropical fish and blue water creating dreamy barrier between them, soft ethereal aquarium lighting",
      "soft blue aquarium glow with dreamy underwater light ripples",
    ),
    storyTemplate: createStoryTemplate(
      "relive the moment of first sight",
      "Through the glass and the water, the world blurred away until there was only 'us'. A connection so instant it felt like destiny.",
    ),
  },
];
