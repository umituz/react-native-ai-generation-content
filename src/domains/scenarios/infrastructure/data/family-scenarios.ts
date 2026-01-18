/**
 * Family Scenarios
 * Scenarios focused on family and relationships
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const FAMILY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FUTURE_CHILD,
    title: "Your Future Baby",
    description: "See your little miracle come to life",
    icon: "👶",
    imageUrl:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "an adorable 2-3 year old toddler who is a beautiful genetic blend of both parents features, facing camera with natural innocent smile showing tiny teeth and sparkling curious eyes, wearing soft pastel colored cotton outfit, sitting on plush carpet in cozy sunlit living room with toys and picture books scattered nearby",
      "soft warm window light creating gentle highlights on child's hair and face with cozy domestic atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "imagine their future child",
      "A beautiful blend of both their features, this little one would bring endless joy and love into their lives.",
    ),
  },
  {
    id: ScenarioId.PARENTHOOD,
    title: "Becoming Parents",
    description: "Embrace the joy of parenthood",
    icon: "🍼",
    imageUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a loving couple with newborn baby in cozy nursery, both parents facing camera with tender joyful expressions showing happy exhaustion, father in soft gray henley cradling swaddled infant in white muslin blanket, mother in comfortable robe leaning close with adoring gaze and gentle hand on baby, pastel painted nursery walls with white crib and mobile and soft plush toys in background",
      "soft warm diffused lighting creating intimate nurturing atmosphere with gentle shadows"
    ),
    storyTemplate: createStoryTemplate(
      "welcome their precious little one into the world",
      "Though sleep-deprived, their hearts overflow with a love they never knew possible.",
    ),
  },
  {
    id: ScenarioId.OLD_AGE,
    title: "Forever Together",
    description: "A beautiful lifetime of love",
    icon: "👵",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661315849315-0e79355a44fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3Jvd2luZyUyMG9sZCUyMHRvZ2V0aGVyfGVufDB8fDB8fHww",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in their 70s sitting together on weathered wooden park bench, both facing camera with wise knowing smiles showing lifetime of shared joy, realistically aged with natural wrinkles and laugh lines and silver gray hair, man in comfortable cardigan and flat cap, woman in soft wool coat with elegant scarf, their weathered hands intertwined, peaceful park setting with autumn trees and golden leaves and calm pond in background",
      "soft golden afternoon light filtering through trees creating warm serene atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "look back on a lifetime of beautiful memories",
      "Hand in hand, they've weathered every storm and celebrated every joy. Their love story continues to inspire all who know them.",
    ),
  },
  {
    id: ScenarioId.ANNIVERSARY,
    title: "Special Anniversary",
    description: "Celebrate your incredible journey",
    icon: "🎊",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a004c/XZdIUK_EL-wEvIhEHuONX.jpg",
    previewImageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple celebrating anniversary at elegant restaurant, both raising crystal champagne flutes and facing camera with joyful loving expressions full of gratitude, man in charcoal suit with burgundy tie, woman in elegant black cocktail dress with pearl earrings, intimate round table with white tablecloth and red roses in crystal vase and flickering candles, upscale restaurant with warm ambient lighting and other diners softly blurred in background",
      "warm romantic candlelight with soft golden ambient glow creating intimate celebratory atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "celebrate another year of love and commitment",
      "Each anniversary marks another chapter in their beautiful story. Their love grows stronger with every passing year.",
    ),
  },
];
