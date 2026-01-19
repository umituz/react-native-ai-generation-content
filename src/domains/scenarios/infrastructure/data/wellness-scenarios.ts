import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const WELLNESS_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.YOGA_TOGETHER,
    title: "Yoga Flow",
    description: "Balance and harmony",
    icon: "🧘",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in high-end yoga studio, both facing camera with serene peaceful smiles while holding graceful tree pose side-by-side, wearing matching stylish athletic wear in earth tones, minimalist studio with large windows and natural wood floors in background",
      "soft natural window lighting with calm zen atmosphere"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple running together on scenic park trail, both facing camera with energetic healthy smiles, wearing professional running gear with fitness watches, morning mist and golden sun rays streaming through tree canopy in background",
      "golden morning light with misty energetic outdoor atmosphere"
    ),
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
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple at infinity pool edge, both facing camera with joyful refreshed smiles, halfway submerged in crystal blue water, man in sleek swim trunks, woman in elegant one-piece swimsuit with goggles on head, luxury resort with ocean sunset visible over infinity edge in background",
      "warm golden sunset lighting with refreshing resort atmosphere"
    ),
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
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in bright modern white kitchen, both facing camera with warm happy smiles while preparing colorful fresh salad together, wearing casual stylish aprons, wooden cutting board with vibrant organic vegetables like tomatoes peppers and greens visible on marble counter",
      "bright natural kitchen lighting with vibrant healthy atmosphere"
    ),
    storyTemplate: createStoryTemplate(
      "nourish their bodies and souls",
      "They say you are what you eat. They choose to be healthy, vibrant, and deeply in love.",
    ),
  },
];
