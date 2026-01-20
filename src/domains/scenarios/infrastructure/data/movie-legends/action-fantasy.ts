/**
 * Action & Fantasy Movie Legends
 * Superhero and action film moments
 */

import { Scenario, ScenarioId } from "../../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../../utils/scenario-utils";

export const ACTION_FANTASY_MOVIE_SCENARIOS: Omit<Scenario, "outputType" | "category">[] = [
  {
    id: ScenarioId.SMITH_BACK_TO_BACK,
    title: "Action Power Couple",
    description: "Back to back, guns ready",
    icon: "🔫",
    imageUrl: "https://images.unsplash.com/photo-1540324155974-7523202daa3f?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as action movie spies standing back-to-back, both facing camera with fierce confident expressions, man in tailored black suit with tactical vest, woman in sleek black dress with thigh holster, modern glass architecture with orange sunset light streaming through in background",
      "dramatic cinematic lighting with warm orange tones and sharp shadows",
    ),
    storyTemplate: createStoryTemplate(
      "step into the shoes of the ultimate power duo",
      "They've got each other's backs, always. Together, they're an unstoppable force that even Hollywood couldn't script.",
    ),
  },
  {
    id: ScenarioId.SPIDERMAN_KISS,
    title: "Upside-Down Kiss",
    description: "Hero in the rain",
    icon: "🕷️",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple recreating iconic Spider-Man upside-down kiss in rainy alley, man hanging inverted from fire escape with mask pulled up to nose, woman reaching up to kiss him, both with loving expressions from unique angles, heavy rain pouring down in dark city alley with neon signs reflecting on wet pavement in background",
      "dramatic nighttime rain lighting with neon reflections and cinematic atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "reveal their secret hero love",
      "Even in the rain and the shadows, her love is the anchor that brings him home. A kiss that defined a generation of heroes.",
    ),
  },
  {
    id: ScenarioId.TWILIGHT_MEADOW,
    title: "The Meadow",
    description: "A thousand years",
    icon: "🌲",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    inputType: "dual",
    aiPrompt: createPhotorealisticPrompt(
      "a couple lying in lush meadow of purple and yellow wildflowers, heads together hair fanned out, both facing camera with intense devoted smiles, man in casual henley woman in simple cotton dress, golden sunlight filtering through ancient pine forest creating god rays in background",
      "soft dreamy golden hour light with ethereal forest atmosphere",
    ),
    storyTemplate: createStoryTemplate(
      "promise a lifetime of devotion",
      "In the quiet of the meadow, they promised to never leave each other. A love that feels like it's lasted a thousand years.",
    ),
  },
];
