/**
 * Wedding Scenarios
 * Complete wedding journey from proposal to honeymoon
 */

import { WEDDING_PREPARATION_SCENARIOS } from "./preparation";
import { WEDDING_CEREMONY_SCENARIOS } from "./ceremonies";
import { WEDDING_CELEBRATION_SCENARIOS } from "./celebrations";

export const WEDDING_SCENARIOS = [
  ...WEDDING_PREPARATION_SCENARIOS,
  ...WEDDING_CEREMONY_SCENARIOS,
  ...WEDDING_CELEBRATION_SCENARIOS,
];
