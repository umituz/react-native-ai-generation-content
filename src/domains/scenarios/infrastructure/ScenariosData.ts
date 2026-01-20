/**
 * Scenario Data Registry
 * Central registry for all scenarios
 * Generic for all AI generation apps (image/video)
 */

import { Scenario } from "../domain/Scenario";
import {
  RELATIONSHIP_SCENARIOS,
  ARTS_ENTERTAINMENT_SCENARIOS,
  ADVENTURE_FANTASY_SCENARIOS,
  CUSTOM_FANTASY_SCENARIO,
  LIFESTYLE_GROUP_SCENARIOS,
  ACTIVITIES_SCENARIOS,
} from "./data/scenario-groups";

export const SCENARIOS: Scenario[] = [
  CUSTOM_FANTASY_SCENARIO,
  ...RELATIONSHIP_SCENARIOS,
  ...ARTS_ENTERTAINMENT_SCENARIOS,
  ...ADVENTURE_FANTASY_SCENARIOS,
  ...LIFESTYLE_GROUP_SCENARIOS,
  ...ACTIVITIES_SCENARIOS,
];
