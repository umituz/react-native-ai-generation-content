/**
 * Relationship Scenarios Group
 * Family, intimate, wedding, and connection scenarios
 */

import { Scenario, ScenarioCategory } from "../../../domain/Scenario";
import { FAMILY_SCENARIOS } from "../family-scenarios";
import { INTIMATE_SCENARIOS } from "../intimate-scenarios";
import { WEDDING_SCENARIOS } from "../wedding";
import { CONNECTION_SCENARIOS } from "../connection-scenarios";
import { DAILY_ESSENCE_SCENARIOS } from "../daily-essence-scenarios";
import { AFFECTION_SCENARIOS } from "../affection-scenarios";
import { ROMANTIC_KISSES_SCENARIOS } from "../romantic-kisses-scenarios";
import { SULTRY_SCENARIOS } from "../sultry-scenarios";
import { STOLEN_MOMENTS_SCENARIOS } from "../stolen-moments-scenarios";

const assignCategory = (scenarios: Omit<Scenario, 'category'>[], category: ScenarioCategory) =>
  scenarios.map((s) => ({ ...s, category }));

export const RELATIONSHIP_SCENARIOS: Scenario[] = [
  ...assignCategory(FAMILY_SCENARIOS, ScenarioCategory.FAMILY),
  ...assignCategory(INTIMATE_SCENARIOS, ScenarioCategory.INTIMATE),
  ...assignCategory(WEDDING_SCENARIOS, ScenarioCategory.WEDDING),
  ...assignCategory(CONNECTION_SCENARIOS, ScenarioCategory.CONNECTION),
  ...assignCategory(DAILY_ESSENCE_SCENARIOS, ScenarioCategory.DAILY_ESSENCE),
  ...assignCategory(AFFECTION_SCENARIOS, ScenarioCategory.AFFECTION),
  ...assignCategory(ROMANTIC_KISSES_SCENARIOS, ScenarioCategory.ROMANTIC_KISSES),
  ...assignCategory(SULTRY_SCENARIOS, ScenarioCategory.SULTRY),
  ...assignCategory(STOLEN_MOMENTS_SCENARIOS, ScenarioCategory.STOLEN_MOMENTS),
];
