/**
 * Musical & Dance Movie Legends
 * Iconic dance and musical film moments
 */

import { Scenario, ScenarioId } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const MUSICAL_DANCE_MOVIE_SCENARIOS: Omit<Scenario, "outputType" | "category">[] = [
  {
    id: ScenarioId.PULP_FICTION_DANCE,
    title: "Twist Contest",
    description: "Classic 50s diner dance",
    icon: "💃",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating Pulp Fiction twist contest in retro 50s diner, both facing camera with cool deadpan expressions doing classic hand-over-eyes dance move, man in thin black suit and bolo tie, woman in crisp white shirt and slim black pants with sleek dark bob haircut, red vinyl booths and checkered floor and glowing neon signs in background",
      "warm retro diner lighting with neon glow and vintage atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "ignite the dance floor with iconic moves",
      "They don't follow the rhythm; they create it. A cool, effortless connection that defines an entire era of cool.",
    ),
  },
  {
    id: ScenarioId.LA_LA_LAND_DANCE,
    title: "City of Stars",
    description: "Dancing under the twilight",
    icon: "✨",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple dancing on hilltop overlooking Los Angeles at magic hour, recreating La La Land bench scene, woman in flowing bright yellow sundress with skirt twirling, man in white button-down and slim navy tie, purple and orange gradient sunset sky with twinkling city lights of LA sprawling below in background",
      "magical twilight lighting with warm golden and cool purple tones",
    ),
    storyTemplate: createStoryTemplate(
      "dance through a dreamscape of stars",
      "In a city of millions, they found the only person who knows the melody of their heart. A love story written in the stars.",
    ),
  },
  {
    id: ScenarioId.DIRTY_DANCING_LIFT,
    title: "The Time of My Life",
    description: "That legendary lift",
    icon: "🕺",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating iconic Dirty Dancing lift, man with strong arms holding woman high above his head, woman with gracefully arched back and arms spread wide in triumph, both facing camera with ecstatic joyful smiles, 1980s resort ballroom with cheering audience and string lights and stage in background",
      "warm spotlight with 80s golden glow and crowd excitement",
    ),
    storyTemplate: createStoryTemplate(
      "have the time of their lives",
      "Trust, balance, and pure joy. In this lift, they're soaring high, proving that with each other, they can reach any height.",
    ),
  },
];
