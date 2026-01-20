/**
 * Lifestyle Scenarios Group
 * Daily life, wellness, home, and leisure scenarios
 */

import { Scenario, ScenarioCategory } from "../../../domain/Scenario";
import { LIFESTYLE_SCENARIOS } from "../lifestyle-scenarios";
import { LUXURY_SCENARIOS } from "../luxury-scenarios";
import { CULINARY_SCENARIOS } from "../culinary-scenarios";
import { SEASONAL_SCENARIOS } from "../seasonal-scenarios";
import { ANIMALS_SCENARIOS } from "../animals-scenarios";
import { HOME_LIFE_SCENARIOS } from "../home-life-scenarios";
import { WELLNESS_SCENARIOS } from "../wellness-scenarios";
import { BUCKET_LIST_SCENARIOS } from "../bucket-list-scenarios";
import { SOCIAL_MEDIA_SCENARIOS } from "../social-media-scenarios";
import { CELEBRATION_SCENARIOS } from "../celebration-scenarios";
import { URBAN_NIGHTS_SCENARIOS } from "../urban-nights-scenarios";
import { VINTAGE_SUMMER_SCENARIOS } from "../vintage-summer-scenarios";
import { CASINO_SCENARIOS } from "../casino-scenarios";
import { RETRO_ARCADE_SCENARIOS } from "../retro-arcade-scenarios";
import { COZY_PLUSH_SCENARIOS } from "../cozy-plush-scenarios";

const assignCategory = (scenarios: Omit<Scenario, 'category'>[], category: ScenarioCategory) =>
  scenarios.map((s) => ({ ...s, category }));

export const LIFESTYLE_GROUP_SCENARIOS: Scenario[] = [
  ...assignCategory(LIFESTYLE_SCENARIOS, ScenarioCategory.LIFESTYLE),
  ...assignCategory(LUXURY_SCENARIOS, ScenarioCategory.LUXURY),
  ...assignCategory(CULINARY_SCENARIOS, ScenarioCategory.CULINARY),
  ...assignCategory(SEASONAL_SCENARIOS, ScenarioCategory.SEASONAL),
  ...assignCategory(ANIMALS_SCENARIOS, ScenarioCategory.ANIMALS),
  ...assignCategory(HOME_LIFE_SCENARIOS, ScenarioCategory.HOME_LIFE),
  ...assignCategory(WELLNESS_SCENARIOS, ScenarioCategory.WELLNESS),
  ...assignCategory(BUCKET_LIST_SCENARIOS, ScenarioCategory.BUCKET_LIST),
  ...assignCategory(SOCIAL_MEDIA_SCENARIOS, ScenarioCategory.SOCIAL_MEDIA),
  ...assignCategory(CELEBRATION_SCENARIOS, ScenarioCategory.CELEBRATIONS),
  ...assignCategory(URBAN_NIGHTS_SCENARIOS, ScenarioCategory.URBAN_NIGHTS),
  ...assignCategory(VINTAGE_SUMMER_SCENARIOS, ScenarioCategory.VINTAGE_SUMMER),
  ...assignCategory(CASINO_SCENARIOS, ScenarioCategory.CASINO),
  ...assignCategory(RETRO_ARCADE_SCENARIOS, ScenarioCategory.RETRO_ARCADE),
  ...assignCategory(COZY_PLUSH_SCENARIOS, ScenarioCategory.COZY_PLUSH),
];
