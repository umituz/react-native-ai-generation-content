/**
 * Activities Scenarios Group
 * Sports, hobbies, travel, and professional scenarios
 */

import { Scenario, ScenarioCategory } from "../../../domain/Scenario";
import { TIME_BASED_SCENARIOS } from "../time-based-scenarios";
import { TRAVEL_SCENARIOS } from "../travel-scenarios";
import { CULTURAL_SCENARIOS } from "../cultural-scenarios";
import { HISTORICAL_SCENARIOS } from "../historical-scenarios";
import { HOBBIES_SCENARIOS } from "../hobbies-scenarios";
import { SPORTS_SCENARIOS } from "../sports-scenarios";
import { EXTREME_SCENARIOS } from "../extreme-scenarios";
import { GAMING_SCENARIOS } from "../gaming-scenarios";
import { CAREER_SCENARIOS } from "../career-scenarios";
import { EDUCATION_SCENARIOS } from "../education-scenarios";
import { FASHION_SCENARIOS } from "../fashion-scenarios";
import { FESTIVAL_SCENARIOS } from "../festival-scenarios";
import { FUTURE_TECH_SCENARIOS } from "../future-tech-scenarios";
import { ACTION_STEALTH_SCENARIOS } from "../action-stealth-scenarios";
import { ECOLOGY_SCENARIOS } from "../ecology-scenarios";
import { NOSTALGIA_SCENARIOS } from "../nostalgia-scenarios";
import { ELITE_SCENARIOS } from "../elite-scenarios";
import { GOTHIC_SCENARIOS } from "../gothic-scenarios";
import { SPEED_DEMONS_SCENARIOS } from "../speed-demons-scenarios";
import { UNDERWATER_SCENARIOS } from "../underwater-scenarios";

const assignCategory = (scenarios: Omit<Scenario, 'category'>[], category: ScenarioCategory) =>
  scenarios.map((s) => ({ ...s, category }));

export const ACTIVITIES_SCENARIOS: Scenario[] = [
  ...assignCategory(TIME_BASED_SCENARIOS, ScenarioCategory.TIME_TRAVEL),
  ...assignCategory(TRAVEL_SCENARIOS, ScenarioCategory.TRAVEL),
  ...assignCategory(CULTURAL_SCENARIOS, ScenarioCategory.CULTURAL),
  ...assignCategory(HISTORICAL_SCENARIOS, ScenarioCategory.HISTORICAL),
  ...assignCategory(HOBBIES_SCENARIOS, ScenarioCategory.HOBBIES),
  ...assignCategory(SPORTS_SCENARIOS, ScenarioCategory.SPORTS),
  ...assignCategory(EXTREME_SCENARIOS, ScenarioCategory.EXTREME),
  ...assignCategory(GAMING_SCENARIOS, ScenarioCategory.GAMING),
  ...assignCategory(CAREER_SCENARIOS, ScenarioCategory.CAREER),
  ...assignCategory(EDUCATION_SCENARIOS, ScenarioCategory.EDUCATION),
  ...assignCategory(FASHION_SCENARIOS, ScenarioCategory.FASHION),
  ...assignCategory(FESTIVAL_SCENARIOS, ScenarioCategory.FESTIVAL),
  ...assignCategory(FUTURE_TECH_SCENARIOS, ScenarioCategory.FUTURE_TECH),
  ...assignCategory(ACTION_STEALTH_SCENARIOS, ScenarioCategory.ACTION_STEALTH),
  ...assignCategory(ECOLOGY_SCENARIOS, ScenarioCategory.ECOLOGY),
  ...assignCategory(NOSTALGIA_SCENARIOS, ScenarioCategory.NOSTALGIA),
  ...assignCategory(ELITE_SCENARIOS, ScenarioCategory.ELITE),
  ...assignCategory(GOTHIC_SCENARIOS, ScenarioCategory.GOTHIC),
  ...assignCategory(SPEED_DEMONS_SCENARIOS, ScenarioCategory.SPEED_DEMONS),
  ...assignCategory(UNDERWATER_SCENARIOS, ScenarioCategory.UNDERWATER),
];
