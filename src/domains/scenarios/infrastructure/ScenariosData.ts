/**
 * Scenario Data Registry
 * Central registry for all scenarios
 * Generic for all AI generation apps (image/video)
 */

import { Scenario, ScenarioCategory } from "../domain/Scenario";
import { TIME_BASED_SCENARIOS } from "./data/time-based-scenarios";
import { FAMILY_SCENARIOS } from "./data/family-scenarios";
import { LIFESTYLE_SCENARIOS } from "./data/lifestyle-scenarios";
import { FANTASY_SCENARIOS, CUSTOM_SCENARIO } from "./data/fantasy-scenarios";
import { CAREER_SCENARIOS } from "./data/career-scenarios";
import { TRAVEL_SCENARIOS } from "./data/travel-scenarios";
import { CULTURAL_SCENARIOS } from "./data/cultural-scenarios";

import { HISTORICAL_SCENARIOS } from "./data/historical-scenarios";
import { FESTIVAL_SCENARIOS } from "./data/festival-scenarios";
import { CINEMATIC_SCENARIOS } from "./data/cinematic-scenarios";
import { ARTISTIC_SCENARIOS } from "./data/artistic-scenarios";
import { HOBBIES_SCENARIOS } from "./data/hobbies-scenarios";
import { FASHION_SCENARIOS } from "./data/fashion-scenarios";
import { SCI_FI_SCENARIOS } from "./data/sci-fi-scenarios";
import { INTIMATE_SCENARIOS } from "./data/intimate-scenarios";
import { SPORTS_SCENARIOS } from "./data/sports-scenarios";
import { EXTREME_SCENARIOS } from "./data/extreme-scenarios";
import { PERFORMANCE_SCENARIOS } from "./data/performance-scenarios";
import { LUXURY_SCENARIOS } from "./data/luxury-scenarios";
import { SEASONAL_SCENARIOS } from "./data/seasonal-scenarios";
import { EDUCATION_SCENARIOS } from "./data/education-scenarios";
import { GAMING_SCENARIOS } from "./data/gaming-scenarios";
import { CULINARY_SCENARIOS } from "./data/culinary-scenarios";
import { ANIMALS_SCENARIOS } from "./data/animals-scenarios";
import { CREATIVE_SCENARIOS } from "./data/creative-scenarios";
import { WEDDING_SCENARIOS } from "./data/wedding-scenarios";
import { CELEBRATION_SCENARIOS } from "./data/celebration-scenarios";
import { HOME_LIFE_SCENARIOS } from "./data/home-life-scenarios";
import { WELLNESS_SCENARIOS } from "./data/wellness-scenarios";
import { BUCKET_LIST_SCENARIOS } from "./data/bucket-list-scenarios";
import { SOCIAL_MEDIA_SCENARIOS } from "./data/social-media-scenarios";
import { MYTHOLOGY_SCENARIOS } from "./data/mythology-scenarios";
import { FUTURE_TECH_SCENARIOS } from "./data/future-tech-scenarios";
import { ACTION_STEALTH_SCENARIOS } from "./data/action-stealth-scenarios";
import { ECOLOGY_SCENARIOS } from "./data/ecology-scenarios";
import { NOSTALGIA_SCENARIOS } from "./data/nostalgia-scenarios";
import { MYSTICAL_SCENARIOS } from "./data/mystical-scenarios";
import { SUPERHERO_SCENARIOS } from "./data/superhero-scenarios";
import { VILLAINOUS_SCENARIOS } from "./data/villainous-scenarios";
import { ELITE_SCENARIOS } from "./data/elite-scenarios";
import { GOTHIC_SCENARIOS } from "./data/gothic-scenarios";
import { CONNECTION_SCENARIOS } from "./data/connection-scenarios";
import { DAILY_ESSENCE_SCENARIOS } from "./data/daily-essence-scenarios";
import { MOVIE_LEGENDS_SCENARIOS } from "./data/movie-legends-scenarios";
import { ICONIC_MOMENTS_SCENARIOS } from "./data/iconic-moments-scenarios";
import { FOLKLORE_SCENARIOS } from "./data/folklore-scenarios";
import { MUSIC_SCENARIOS } from "./data/music-scenarios";
import { STEAMPUNK_SCENARIOS } from "./data/steampunk-scenarios";
import { ADVENTURE_SCENARIOS } from "./data/adventure-scenarios";
import { AFFECTION_SCENARIOS } from "./data/affection-scenarios";
import { ROMANTIC_KISSES_SCENARIOS } from "./data/romantic-kisses-scenarios";
import { SULTRY_SCENARIOS } from "./data/sultry-scenarios";
import { STOLEN_MOMENTS_SCENARIOS } from "./data/stolen-moments-scenarios";
import { URBAN_NIGHTS_SCENARIOS } from "./data/urban-nights-scenarios";
import { VINTAGE_SUMMER_SCENARIOS } from "./data/vintage-summer-scenarios";
import { ART_STUDIO_SCENARIOS } from "./data/art-studio-scenarios";
import { DARK_ACADEMIA_SCENARIOS } from "./data/dark-academia-scenarios";
import { CASINO_SCENARIOS } from "./data/casino-scenarios";
import { POST_APOCALYPTIC_SCENARIOS } from "./data/post-apocalyptic-scenarios";
import { RETRO_ARCADE_SCENARIOS } from "./data/retro-arcade-scenarios";
import { COZY_PLUSH_SCENARIOS } from "./data/cozy-plush-scenarios";
import { PIRATE_ERA_SCENARIOS } from "./data/pirate-era-scenarios";
import { SAMURAI_SCENARIOS } from "./data/samurai-scenarios";
import { SURREAL_DREAMS_SCENARIOS } from "./data/surreal-dreams-scenarios";
import { MAGICAL_REALISM_SCENARIOS } from "./data/magical-realism-scenarios";
import { VINTAGE_CIRCUS_SCENARIOS } from "./data/vintage-circus-scenarios";
import { ELEMENTAL_SCENARIOS } from "./data/elemental-scenarios";
import { SPEED_DEMONS_SCENARIOS } from "./data/speed-demons-scenarios";
import { UNDERWATER_SCENARIOS } from "./data/underwater-scenarios";
import { ARABIAN_NIGHTS_SCENARIOS } from "./data/arabian-nights-scenarios";
import { PREHISTORIC_WORLD_SCENARIOS } from "./data/prehistoric-world-scenarios";

/**
 * Assigns category to scenarios
 * Note: outputType is NOT assigned here - apps configure via createScenariosForApp()
 */
const assignCategory = (scenarios: Omit<Scenario, 'category'>[], category: ScenarioCategory) =>
  scenarios.map((s) => ({ ...s, category }));

export const SCENARIOS: Scenario[] = [
  { ...CUSTOM_SCENARIO, category: ScenarioCategory.FANTASY },

  // Time & Future
  ...assignCategory(TIME_BASED_SCENARIOS, ScenarioCategory.TIME_TRAVEL),

  // Relationships
  ...assignCategory(FAMILY_SCENARIOS, ScenarioCategory.FAMILY),
  ...assignCategory(INTIMATE_SCENARIOS, ScenarioCategory.INTIMATE),
  ...assignCategory(WEDDING_SCENARIOS, ScenarioCategory.WEDDING),
  ...assignCategory(CONNECTION_SCENARIOS, ScenarioCategory.CONNECTION),
  ...assignCategory(DAILY_ESSENCE_SCENARIOS, ScenarioCategory.DAILY_ESSENCE),

  // Travel & Places
  ...assignCategory(TRAVEL_SCENARIOS, ScenarioCategory.TRAVEL),
  ...assignCategory(CULTURAL_SCENARIOS, ScenarioCategory.CULTURAL),

  // History & Eras
  ...assignCategory(HISTORICAL_SCENARIOS, ScenarioCategory.HISTORICAL),

  // Fantasy & Fiction
  ...assignCategory(FANTASY_SCENARIOS, ScenarioCategory.FANTASY),
  ...assignCategory(SCI_FI_SCENARIOS, ScenarioCategory.SCI_FI),

  // Arts & Entertainment
  ...assignCategory(ARTISTIC_SCENARIOS, ScenarioCategory.ARTISTIC),
  ...assignCategory(CINEMATIC_SCENARIOS, ScenarioCategory.CINEMATIC),
  ...assignCategory(PERFORMANCE_SCENARIOS, ScenarioCategory.PERFORMANCE),
  ...assignCategory(CREATIVE_SCENARIOS, ScenarioCategory.CREATIVE),

  // Fashion & Style
  ...assignCategory(FASHION_SCENARIOS, ScenarioCategory.FASHION),
  ...assignCategory(FESTIVAL_SCENARIOS, ScenarioCategory.FESTIVAL),

  // Activities & Hobbies
  ...assignCategory(HOBBIES_SCENARIOS, ScenarioCategory.HOBBIES),
  ...assignCategory(SPORTS_SCENARIOS, ScenarioCategory.SPORTS),
  ...assignCategory(EXTREME_SCENARIOS, ScenarioCategory.EXTREME),
  ...assignCategory(GAMING_SCENARIOS, ScenarioCategory.GAMING),

  // Professional
  ...assignCategory(CAREER_SCENARIOS, ScenarioCategory.CAREER),
  ...assignCategory(EDUCATION_SCENARIOS, ScenarioCategory.EDUCATION),

  // Lifestyle
  ...assignCategory(LIFESTYLE_SCENARIOS, ScenarioCategory.LIFESTYLE),
  ...assignCategory(LUXURY_SCENARIOS, ScenarioCategory.LUXURY),
  ...assignCategory(CULINARY_SCENARIOS, ScenarioCategory.CULINARY),
  ...assignCategory(SEASONAL_SCENARIOS, ScenarioCategory.SEASONAL),
  ...assignCategory(ANIMALS_SCENARIOS, ScenarioCategory.ANIMALS),

  // Global Categories
  ...assignCategory(CELEBRATION_SCENARIOS, ScenarioCategory.CELEBRATIONS),
  ...assignCategory(HOME_LIFE_SCENARIOS, ScenarioCategory.HOME_LIFE),
  ...assignCategory(WELLNESS_SCENARIOS, ScenarioCategory.WELLNESS),
  ...assignCategory(BUCKET_LIST_SCENARIOS, ScenarioCategory.BUCKET_LIST),
  ...assignCategory(SOCIAL_MEDIA_SCENARIOS, ScenarioCategory.SOCIAL_MEDIA),

  // Galactic Expansion
  ...assignCategory(MYTHOLOGY_SCENARIOS, ScenarioCategory.MYTHOLOGY),
  ...assignCategory(FUTURE_TECH_SCENARIOS, ScenarioCategory.FUTURE_TECH),
  ...assignCategory(ACTION_STEALTH_SCENARIOS, ScenarioCategory.ACTION_STEALTH),
  ...assignCategory(ECOLOGY_SCENARIOS, ScenarioCategory.ECOLOGY),
  ...assignCategory(NOSTALGIA_SCENARIOS, ScenarioCategory.NOSTALGIA),

  // The Grand Expansion
  ...assignCategory(MYSTICAL_SCENARIOS, ScenarioCategory.MYSTICAL),
  ...assignCategory(SUPERHERO_SCENARIOS, ScenarioCategory.SUPERHEROES),
  ...assignCategory(VILLAINOUS_SCENARIOS, ScenarioCategory.VILLAINOUS),
  ...assignCategory(ELITE_SCENARIOS, ScenarioCategory.ELITE),
  ...assignCategory(GOTHIC_SCENARIOS, ScenarioCategory.GOTHIC),

  // Iconic Media
  ...assignCategory(MOVIE_LEGENDS_SCENARIOS, ScenarioCategory.MOVIE_LEGENDS),
  ...assignCategory(ICONIC_MOMENTS_SCENARIOS, ScenarioCategory.ICONIC_MOMENTS),

  // Arts & Performance
  ...assignCategory(FOLKLORE_SCENARIOS, ScenarioCategory.FOLKLORE),
  ...assignCategory(MUSIC_SCENARIOS, ScenarioCategory.MUSIC),

  // Speculative & Adventure
  ...assignCategory(STEAMPUNK_SCENARIOS, ScenarioCategory.STEAMPUNK),
  ...assignCategory(ADVENTURE_SCENARIOS, ScenarioCategory.ADVENTURE),

  // Pure Emotion
  ...assignCategory(AFFECTION_SCENARIOS, ScenarioCategory.AFFECTION),
  ...assignCategory(
    ROMANTIC_KISSES_SCENARIOS,
    ScenarioCategory.ROMANTIC_KISSES,
  ),

  // High-Tension Romance
  ...assignCategory(SULTRY_SCENARIOS, ScenarioCategory.SULTRY),
  ...assignCategory(STOLEN_MOMENTS_SCENARIOS, ScenarioCategory.STOLEN_MOMENTS),
  ...assignCategory(URBAN_NIGHTS_SCENARIOS, ScenarioCategory.URBAN_NIGHTS),

  // New Vibes
  ...assignCategory(VINTAGE_SUMMER_SCENARIOS, ScenarioCategory.VINTAGE_SUMMER),
  ...assignCategory(ART_STUDIO_SCENARIOS, ScenarioCategory.ART_STUDIO),

  // Final Flourish
  ...assignCategory(DARK_ACADEMIA_SCENARIOS, ScenarioCategory.DARK_ACADEMIA),
  ...assignCategory(CASINO_SCENARIOS, ScenarioCategory.CASINO),
  ...assignCategory(
    POST_APOCALYPTIC_SCENARIOS,
    ScenarioCategory.POST_APOCALYPTIC,
  ),
  ...assignCategory(RETRO_ARCADE_SCENARIOS, ScenarioCategory.RETRO_ARCADE),
  ...assignCategory(COZY_PLUSH_SCENARIOS, ScenarioCategory.COZY_PLUSH),

  // Final, Final Flourish
  ...assignCategory(PIRATE_ERA_SCENARIOS, ScenarioCategory.PIRATE_ERA),
  ...assignCategory(SAMURAI_SCENARIOS, ScenarioCategory.SAMURAI),
  ...assignCategory(SURREAL_DREAMS_SCENARIOS, ScenarioCategory.SURREAL_DREAMS),
  ...assignCategory(
    MAGICAL_REALISM_SCENARIOS,
    ScenarioCategory.MAGICAL_REALISM,
  ),
  ...assignCategory(VINTAGE_CIRCUS_SCENARIOS, ScenarioCategory.VINTAGE_CIRCUS),

  // The Infinite Expansion
  ...assignCategory(ELEMENTAL_SCENARIOS, ScenarioCategory.ELEMENTAL),
  ...assignCategory(SPEED_DEMONS_SCENARIOS, ScenarioCategory.SPEED_DEMONS),
  ...assignCategory(UNDERWATER_SCENARIOS, ScenarioCategory.UNDERWATER),
  ...assignCategory(ARABIAN_NIGHTS_SCENARIOS, ScenarioCategory.ARABIAN_NIGHTS),
  ...assignCategory(PREHISTORIC_WORLD_SCENARIOS, ScenarioCategory.PREHISTORIC),
];
