/**
 * Solo Cinematic Scenarios
 * Single-person movie-style portraits
 */

import { Scenario, ScenarioId, ScenarioCategory } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const SOLO_CINEMATIC_SCENARIOS: Scenario[] = [
  {
    id: ScenarioId.SOLO_FILM_NOIR_DETECTIVE,
    category: ScenarioCategory.SOLO_CINEMATIC,
    title: "Film Noir Detective",
    description: "Classic mystery investigator",
    icon: "🕵️",
    imageUrl: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a mysterious detective in a rain-soaked 1940s city street, person wearing classic trench coat and fedora hat, intense thoughtful expression looking at camera, neon signs reflecting on wet pavement vintage cars in background",
      "dramatic film noir lighting with high contrast shadows and rain"
    ),
    storyTemplate: createStoryTemplate("solve the unsolvable", "The city's greatest detective."),
  },
  {
    id: ScenarioId.SOLO_ACTION_HERO,
    category: ScenarioCategory.SOLO_CINEMATIC,
    title: "Action Hero",
    description: "Blockbuster movie star",
    icon: "💥",
    imageUrl: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a powerful action hero walking away from explosion, person wearing tactical gear and leather jacket, confident fearless expression looking at camera, massive fiery explosion and debris flying in background",
      "dramatic orange explosion lighting with smoke and cinematic atmosphere"
    ),
    storyTemplate: createStoryTemplate("save the world", "One hero against impossible odds."),
  },
  {
    id: ScenarioId.SOLO_WESTERN_OUTLAW,
    category: ScenarioCategory.SOLO_CINEMATIC,
    title: "Western Outlaw",
    description: "Wild West gunslinger",
    icon: "🤠",
    imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a rugged gunslinger in dusty Wild West town, person wearing cowboy hat leather duster and gun holster, steely determined expression looking at camera, wooden saloon buildings and desert mountains in background",
      "harsh high noon sunlight with dust particles and western atmosphere"
    ),
    storyTemplate: createStoryTemplate("ride into the sunset", "The most feared outlaw in the West."),
  },
  {
    id: ScenarioId.SOLO_SPY_AGENT,
    category: ScenarioCategory.SOLO_CINEMATIC,
    title: "Secret Agent",
    description: "International spy",
    icon: "🕴️",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a suave secret agent at luxurious casino, person wearing perfectly tailored tuxedo, cool confident expression looking at camera, elegant casino interior with chandeliers and wealthy patrons in background",
      "sophisticated warm lighting with glamorous casino atmosphere"
    ),
    storyTemplate: createStoryTemplate("complete the mission", "Licensed to thrill."),
  },
  {
    id: ScenarioId.SOLO_SAMURAI_WARRIOR,
    category: ScenarioCategory.SOLO_CINEMATIC,
    title: "Samurai Warrior",
    description: "Legendary Japanese warrior",
    icon: "⚔️",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a noble samurai warrior in cherry blossom garden, person wearing traditional armor and katana, honorable stoic expression looking at camera, pink cherry blossom petals falling and traditional Japanese temple in background",
      "soft pink and golden lighting with falling petals and serene atmosphere"
    ),
    storyTemplate: createStoryTemplate("follow the way of the warrior", "A samurai's unwavering honor."),
  },
];
