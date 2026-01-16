import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const WELLNESS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.YOGA_TOGETHER,
    title: "Yoga Flow",
    description: "Balance and harmony",
    icon: "🧘",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    aiPrompt:
      "A couple in a high-end yoga studio, both looking at the camera with serene smiles, in a graceful yoga pose side-by-side, dressed in matching stylish athletic wear, soft natural lighting and calm minimalist studio background",
    storyTemplate: createStoryTemplate(
      "find their inner peace together",
      "Breathing in sync, finding balance not just on the mat, but in every part of their shared life.",
    ),
  },
  {
    id: ScenarioId.RUNNING_PARTNERS,
    title: "Running Partners",
    description: "Stronger every mile",
    icon: "🏃",
    imageUrl:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
    aiPrompt:
      "A couple running together in a scenic park trail, both looking at the camera with energetic smiles, dressed in professional running gear, morning mist and sun rays through trees in background, dynamic and fit",
    storyTemplate: createStoryTemplate(
      "push their limits together",
      "Step by step, mile after mile. They are each other's strongest motivation and greatest support.",
    ),
  },
  {
    id: ScenarioId.SWIMMING_DUO,
    title: "Swimming Duo",
    description: "Dive into fitness",
    icon: "🏊",
    imageUrl:
      "https://images.unsplash.com/photo-1519046460591-94943f5509fd?w=800",
    aiPrompt:
      "A couple at an infinity pool, both looking at the camera with joyful smiles, halfway in crystal blue water, dressed in elegant swimwear and goggles, luxury resort and ocean sunset in background, fit and refreshed",
    storyTemplate: createStoryTemplate(
      "dive into health together",
      "In the water, they move as one. A refreshing way to stay strong and connected in their fitness journey.",
    ),
  },
  {
    id: ScenarioId.HEALTHY_COOKING,
    title: "Healthy Cooking",
    description: "Fueling love and health",
    icon: "🥗",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744abd?w=800",
    aiPrompt:
      "A couple in a bright modern kitchen, both looking at the camera with warm smiles, preparing a fresh colorful salad, dressed in casual stylish aprons, wooden cutting board with fresh organic vegetables, vibrant and healthy atmosphere",
    storyTemplate: createStoryTemplate(
      "nourish their bodies and souls",
      "They say you are what you eat. They choose to be healthy, vibrant, and deeply in love.",
    ),
  },
];
