/**
 * Movie Legends Scenarios
 * Iconic moments from cinema history
 */

import { ROMANTIC_MOVIE_SCENARIOS } from "./romantic";
import { PERIOD_DRAMA_MOVIE_SCENARIOS } from "./period-drama";
import { ACTION_FANTASY_MOVIE_SCENARIOS } from "./action-fantasy";
import { MUSICAL_DANCE_MOVIE_SCENARIOS } from "./musical-dance";

export const MOVIE_LEGENDS_SCENARIOS = [
  ...ROMANTIC_MOVIE_SCENARIOS,
  ...PERIOD_DRAMA_MOVIE_SCENARIOS,
  ...ACTION_FANTASY_MOVIE_SCENARIOS,
  ...MUSICAL_DANCE_MOVIE_SCENARIOS,
];
