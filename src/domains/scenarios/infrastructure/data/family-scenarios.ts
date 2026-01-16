/**
 * Family Scenarios
 * Scenarios focused on family and relationships
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const FAMILY_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.FUTURE_CHILD,
    title: "Your Future Baby",
    description: "See your little miracle come to life",
    icon: "👶",
    imageUrl:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=60",
    aiPrompt:
      "An adorable 2-3 year old child, genetic blend of both parents features, looking directly at the camera with natural innocent smile, cozy home environment in background, soft warm lighting",
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
    aiPrompt:
      "A loving couple holding a newborn baby in a cozy nursery, both parents looking at the camera with tender joyful expressions, soft warm lighting",
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
    aiPrompt:
      "A couple in their 70s sitting on a park bench, both looking at the camera with wise and joyful smiles, realistically aged with natural wrinkles and silver/grey hair, peaceful nature setting in background, soft serene lighting, emotional and heartwarming",
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
    aiPrompt:
      "A couple celebrating anniversary, both raising champagne glasses and looking at the camera with joyful loving expressions, dressed in elegant formal attire, romantic restaurant with candlelight atmosphere in background",
    storyTemplate: createStoryTemplate(
      "celebrate another year of love and commitment",
      "Each anniversary marks another chapter in their beautiful story. Their love grows stronger with every passing year.",
    ),
  },
];
