/**
 * Scenario IDs
 * Combined from all category files
 */

import { TIME_FAMILY_IDS } from "./time-family.ids";
import { WEDDING_IDS } from "./wedding.ids";
import { LIFESTYLE_IDS } from "./lifestyle.ids";
import { HISTORICAL_FASHION_IDS } from "./historical-fashion.ids";
import { CINEMATIC_ARTISTIC_IDS } from "./cinematic-artistic.ids";
import { HOBBIES_CAREER_IDS } from "./hobbies-career.ids";
import { FANTASY_SCIFI_IDS } from "./fantasy-scifi.ids";
import { INTIMATE_ROMANTIC_IDS } from "./intimate-romantic.ids";
import { MOVIE_LEGENDS_IDS } from "./movie-legends.ids";
import { ACTIVITIES_SPORTS_IDS } from "./activities-sports.ids";
import { DAILY_HOME_IDS } from "./daily-home.ids";
import { CELEBRATIONS_SOCIAL_IDS } from "./celebrations-social.ids";
import { CULTURE_NATURE_IDS } from "./culture-nature.ids";
import { THEMATIC_WORLDS_IDS } from "./thematic-worlds.ids";
import { EXOTIC_WORLDS_IDS } from "./exotic-worlds.ids";
import { AI_FEATURES_IDS } from "./ai-features.ids";

export const ScenarioId = {
  ...TIME_FAMILY_IDS,
  ...WEDDING_IDS,
  ...LIFESTYLE_IDS,
  ...HISTORICAL_FASHION_IDS,
  ...CINEMATIC_ARTISTIC_IDS,
  ...HOBBIES_CAREER_IDS,
  ...FANTASY_SCIFI_IDS,
  ...INTIMATE_ROMANTIC_IDS,
  ...MOVIE_LEGENDS_IDS,
  ...ACTIVITIES_SPORTS_IDS,
  ...DAILY_HOME_IDS,
  ...CELEBRATIONS_SOCIAL_IDS,
  ...CULTURE_NATURE_IDS,
  ...THEMATIC_WORLDS_IDS,
  ...EXOTIC_WORLDS_IDS,
  ...AI_FEATURES_IDS,
} as const;

export type ScenarioId = (typeof ScenarioId)[keyof typeof ScenarioId];
