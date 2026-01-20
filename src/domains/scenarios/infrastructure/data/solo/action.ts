/**
 * Solo Action Scenarios
 * Single-person action portraits
 */

import { Scenario, ScenarioId, ScenarioCategory } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const SOLO_ACTION_SCENARIOS: Scenario[] = [
  {
    id: ScenarioId.SOLO_MARTIAL_ARTIST,
    category: ScenarioCategory.SOLO_ACTION,
    title: "Martial Artist",
    description: "Kung Fu master",
    icon: "🥋",
    imageUrl: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a skilled martial artist in ancient temple training ground, person wearing traditional martial arts gi in powerful stance, focused intense expression looking at camera, wooden training dummies and mountain temple in background",
      "dramatic golden hour lighting with dust particles in air"
    ),
    storyTemplate: createStoryTemplate("master the ancient arts", "Discipline forged in tradition."),
  },
  {
    id: ScenarioId.SOLO_STREET_FIGHTER,
    category: ScenarioCategory.SOLO_ACTION,
    title: "Street Fighter",
    description: "Urban combat warrior",
    icon: "👊",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a fierce street fighter in neon-lit urban alley, person wearing fighting gear with wrapped hands, intense determined expression looking at camera, graffiti walls and neon signs in rainy city night",
      "neon lighting with rain reflections and gritty urban atmosphere"
    ),
    storyTemplate: createStoryTemplate("fight for glory", "The undisputed champion of the streets."),
  },
  {
    id: ScenarioId.SOLO_NINJA_ASSASSIN,
    category: ScenarioCategory.SOLO_ACTION,
    title: "Ninja Assassin",
    description: "Shadow warrior",
    icon: "🥷",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a deadly ninja on moonlit rooftop, person wearing black shinobi outfit with mask and katana, alert stealthy expression with eyes visible looking at camera, Japanese castle and full moon in background",
      "dramatic moonlight with shadows and mysterious ninja atmosphere"
    ),
    storyTemplate: createStoryTemplate("strike from shadows", "Silent and deadly."),
  },
  {
    id: ScenarioId.SOLO_BOXING_CHAMPION,
    category: ScenarioCategory.SOLO_ACTION,
    title: "Boxing Champion",
    description: "Ring legend",
    icon: "🥊",
    imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a victorious boxer in championship ring, person wearing boxing gloves and shorts arms raised in victory, triumphant fierce expression looking at camera, spotlights and cheering crowd in stadium background",
      "dramatic spotlight lighting with sweat glistening and arena atmosphere"
    ),
    storyTemplate: createStoryTemplate("become the champion", "The greatest to ever step in the ring."),
  },
  {
    id: ScenarioId.SOLO_PARKOUR_RUNNER,
    category: ScenarioCategory.SOLO_ACTION,
    title: "Parkour Runner",
    description: "Urban acrobat",
    icon: "🏃",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "an athletic parkour runner mid-leap between buildings, person wearing athletic urban clothing, focused determined expression looking at camera while jumping, city skyline and rooftops in background",
      "dynamic golden hour lighting with motion blur and urban energy"
    ),
    storyTemplate: createStoryTemplate("defy gravity", "The city is a playground."),
  },
];
