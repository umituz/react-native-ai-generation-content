/**
 * Arts & Entertainment Scenarios Group
 * Artistic, cinematic, performance, and media scenarios
 */

import { Scenario, ScenarioCategory } from "../../../domain/Scenario";
import { ARTISTIC_SCENARIOS } from "../artistic-scenarios";
import { CINEMATIC_SCENARIOS } from "../cinematic-scenarios";
import { PERFORMANCE_SCENARIOS } from "../performance-scenarios";
import { CREATIVE_SCENARIOS } from "../creative-scenarios";
import { MOVIE_LEGENDS_SCENARIOS } from "../movie-legends";
import { ICONIC_MOMENTS_SCENARIOS } from "../iconic-moments-scenarios";
import { FOLKLORE_SCENARIOS } from "../folklore-scenarios";
import { MUSIC_SCENARIOS } from "../music-scenarios";
import { ART_STUDIO_SCENARIOS } from "../art-studio-scenarios";
import { DARK_ACADEMIA_SCENARIOS } from "../dark-academia-scenarios";
import { VINTAGE_CIRCUS_SCENARIOS } from "../vintage-circus-scenarios";

const assignCategory = (scenarios: Omit<Scenario, 'category'>[], category: ScenarioCategory) =>
  scenarios.map((s) => ({ ...s, category }));

export const ARTS_ENTERTAINMENT_SCENARIOS: Scenario[] = [
  ...assignCategory(ARTISTIC_SCENARIOS, ScenarioCategory.ARTISTIC),
  ...assignCategory(CINEMATIC_SCENARIOS, ScenarioCategory.CINEMATIC),
  ...assignCategory(PERFORMANCE_SCENARIOS, ScenarioCategory.PERFORMANCE),
  ...assignCategory(CREATIVE_SCENARIOS, ScenarioCategory.CREATIVE),
  ...assignCategory(MOVIE_LEGENDS_SCENARIOS, ScenarioCategory.MOVIE_LEGENDS),
  ...assignCategory(ICONIC_MOMENTS_SCENARIOS, ScenarioCategory.ICONIC_MOMENTS),
  ...assignCategory(FOLKLORE_SCENARIOS, ScenarioCategory.FOLKLORE),
  ...assignCategory(MUSIC_SCENARIOS, ScenarioCategory.MUSIC),
  ...assignCategory(ART_STUDIO_SCENARIOS, ScenarioCategory.ART_STUDIO),
  ...assignCategory(DARK_ACADEMIA_SCENARIOS, ScenarioCategory.DARK_ACADEMIA),
  ...assignCategory(VINTAGE_CIRCUS_SCENARIOS, ScenarioCategory.VINTAGE_CIRCUS),
];
