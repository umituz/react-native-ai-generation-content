/**
 * Category Groups
 * Pre-defined category groups for easy filtering
 */

import { ScenarioCategory } from "./scenario-category.enum";

/**
 * TRUE single person categories - scenarios with prompts for ONE person only
 * These are guaranteed to work with single-photo input
 */
export const TRUE_SOLO_CATEGORIES: readonly ScenarioCategory[] = [
  ScenarioCategory.SOLO_FANTASY,
  ScenarioCategory.SOLO_ADVENTURE,
  ScenarioCategory.SOLO_CINEMATIC,
  ScenarioCategory.SOLO_ARTISTIC,
  ScenarioCategory.SOLO_ACTION,
  ScenarioCategory.SOLO_MYTHOLOGY,
  ScenarioCategory.SOLO_SPORTS,
];

/**
 * General categories - scenarios that work with various content types
 */
export const GENERAL_CATEGORIES: readonly ScenarioCategory[] = [
  ScenarioCategory.FANTASY,
  ScenarioCategory.ADVENTURE,
  ScenarioCategory.SPORTS,
  ScenarioCategory.ARTISTIC,
  ScenarioCategory.CINEMATIC,
  ScenarioCategory.CREATIVE,
  ScenarioCategory.FASHION,
  ScenarioCategory.HOBBIES,
  ScenarioCategory.EXTREME,
  ScenarioCategory.GAMING,
  ScenarioCategory.CAREER,
  ScenarioCategory.EDUCATION,
  ScenarioCategory.LIFESTYLE,
  ScenarioCategory.LUXURY,
  ScenarioCategory.CULINARY,
  ScenarioCategory.SEASONAL,
  ScenarioCategory.ANIMALS,
  ScenarioCategory.CELEBRATIONS,
  ScenarioCategory.WELLNESS,
  ScenarioCategory.BUCKET_LIST,
  ScenarioCategory.SOCIAL_MEDIA,
  ScenarioCategory.MYTHOLOGY,
  ScenarioCategory.FUTURE_TECH,
  ScenarioCategory.ACTION_STEALTH,
  ScenarioCategory.ECOLOGY,
  ScenarioCategory.NOSTALGIA,
  ScenarioCategory.MYSTICAL,
  ScenarioCategory.SUPERHEROES,
  ScenarioCategory.VILLAINOUS,
  ScenarioCategory.ELITE,
  ScenarioCategory.GOTHIC,
  ScenarioCategory.DAILY_ESSENCE,
  ScenarioCategory.FOLKLORE,
  ScenarioCategory.MUSIC,
  ScenarioCategory.STEAMPUNK,
  ScenarioCategory.PERFORMANCE,
  ScenarioCategory.FESTIVAL,
  ScenarioCategory.HISTORICAL,
  ScenarioCategory.CULTURAL,
  ScenarioCategory.SCI_FI,
  ScenarioCategory.TRAVEL,
  ScenarioCategory.VINTAGE_SUMMER,
  ScenarioCategory.DARK_ACADEMIA,
  ScenarioCategory.RETRO_ARCADE,
  ScenarioCategory.COZY_PLUSH,
  ScenarioCategory.PIRATE_ERA,
  ScenarioCategory.SAMURAI,
  ScenarioCategory.SURREAL_DREAMS,
  ScenarioCategory.MAGICAL_REALISM,
  ScenarioCategory.VINTAGE_CIRCUS,
  ScenarioCategory.ELEMENTAL,
  ScenarioCategory.SPEED_DEMONS,
  ScenarioCategory.UNDERWATER,
  ScenarioCategory.ARABIAN_NIGHTS,
  ScenarioCategory.PREHISTORIC,
  ScenarioCategory.POST_APOCALYPTIC,
];

/**
 * Multi-person categories - scenarios that may involve multiple people
 * Note: Does NOT include intimate/romantic content (App Store Guidelines 1.1)
 */
export const MULTI_PERSON_CATEGORIES: readonly ScenarioCategory[] = [
  ScenarioCategory.WEDDING,
  ScenarioCategory.FAMILY,
  ScenarioCategory.TIME_TRAVEL,
  ScenarioCategory.HOME_LIFE,
  ScenarioCategory.ART_STUDIO,
  ScenarioCategory.URBAN_NIGHTS,
  ScenarioCategory.CASINO,
];

/**
 * All categories
 */
export const ALL_CATEGORIES: readonly ScenarioCategory[] = [
  ...GENERAL_CATEGORIES,
  ...MULTI_PERSON_CATEGORIES,
];
