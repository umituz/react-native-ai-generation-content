/**
 * Adventure & Fantasy Scenarios Group
 * Fantasy, sci-fi, mythology, and adventure scenarios
 */

import { Scenario, ScenarioCategory } from "../../../domain/Scenario";
import { FANTASY_SCENARIOS, CUSTOM_SCENARIO } from "../fantasy-scenarios";
import { SCI_FI_SCENARIOS } from "../sci-fi-scenarios";
import { MYTHOLOGY_SCENARIOS } from "../mythology-scenarios";
import { MYSTICAL_SCENARIOS } from "../mystical-scenarios";
import { SUPERHERO_SCENARIOS } from "../superhero-scenarios";
import { VILLAINOUS_SCENARIOS } from "../villainous-scenarios";
import { STEAMPUNK_SCENARIOS } from "../steampunk-scenarios";
import { ADVENTURE_SCENARIOS } from "../adventure-scenarios";
import { POST_APOCALYPTIC_SCENARIOS } from "../post-apocalyptic-scenarios";
import { PIRATE_ERA_SCENARIOS } from "../pirate-era-scenarios";
import { SAMURAI_SCENARIOS } from "../samurai-scenarios";
import { SURREAL_DREAMS_SCENARIOS } from "../surreal-dreams-scenarios";
import { MAGICAL_REALISM_SCENARIOS } from "../magical-realism-scenarios";
import { ELEMENTAL_SCENARIOS } from "../elemental-scenarios";
import { ARABIAN_NIGHTS_SCENARIOS } from "../arabian-nights-scenarios";
import { PREHISTORIC_WORLD_SCENARIOS } from "../prehistoric-world-scenarios";

const assignCategory = (scenarios: Omit<Scenario, 'category'>[], category: ScenarioCategory) =>
  scenarios.map((s) => ({ ...s, category }));

export const CUSTOM_FANTASY_SCENARIO: Scenario = { ...CUSTOM_SCENARIO, category: ScenarioCategory.FANTASY };

export const ADVENTURE_FANTASY_SCENARIOS: Scenario[] = [
  ...assignCategory(FANTASY_SCENARIOS, ScenarioCategory.FANTASY),
  ...assignCategory(SCI_FI_SCENARIOS, ScenarioCategory.SCI_FI),
  ...assignCategory(MYTHOLOGY_SCENARIOS, ScenarioCategory.MYTHOLOGY),
  ...assignCategory(MYSTICAL_SCENARIOS, ScenarioCategory.MYSTICAL),
  ...assignCategory(SUPERHERO_SCENARIOS, ScenarioCategory.SUPERHEROES),
  ...assignCategory(VILLAINOUS_SCENARIOS, ScenarioCategory.VILLAINOUS),
  ...assignCategory(STEAMPUNK_SCENARIOS, ScenarioCategory.STEAMPUNK),
  ...assignCategory(ADVENTURE_SCENARIOS, ScenarioCategory.ADVENTURE),
  ...assignCategory(POST_APOCALYPTIC_SCENARIOS, ScenarioCategory.POST_APOCALYPTIC),
  ...assignCategory(PIRATE_ERA_SCENARIOS, ScenarioCategory.PIRATE_ERA),
  ...assignCategory(SAMURAI_SCENARIOS, ScenarioCategory.SAMURAI),
  ...assignCategory(SURREAL_DREAMS_SCENARIOS, ScenarioCategory.SURREAL_DREAMS),
  ...assignCategory(MAGICAL_REALISM_SCENARIOS, ScenarioCategory.MAGICAL_REALISM),
  ...assignCategory(ELEMENTAL_SCENARIOS, ScenarioCategory.ELEMENTAL),
  ...assignCategory(ARABIAN_NIGHTS_SCENARIOS, ScenarioCategory.ARABIAN_NIGHTS),
  ...assignCategory(PREHISTORIC_WORLD_SCENARIOS, ScenarioCategory.PREHISTORIC),
];
