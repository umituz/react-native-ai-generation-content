/**
 * Career Scenarios
 * Scenarios focused on professional success and career achievements
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const CAREER_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.ENTREPRENEURS,
    title: "Startup Empire",
    description: "Build your billion-dollar dream",
    icon: "💼",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=60",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89baf5/QP5vU44PHpM9AMrGKCpqu.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as successful tech startup founders, both facing camera with confident ambitious smiles and arms crossed, man in navy slim-fit blazer over crisp white oxford shirt with no tie, woman in tailored charcoal blazer over silk blouse with minimalist gold jewelry, standing in sleek modern glass-walled office with ergonomic furniture and large monitors displaying analytics, panoramic city skyline with skyscrapers visible through floor-to-ceiling windows",
      "bright natural daylight from windows with clean professional office lighting and subtle city reflections"
    ),
    storyTemplate: createStoryTemplate(
      "launch their revolutionary startup",
      "From a garage idea to a thriving company, they've built something extraordinary together. Their partnership in business mirrors their partnership in life.",
    ),
  },
  {
    id: ScenarioId.ARTISTS,
    title: "Creative Souls",
    description: "Art that touches hearts worldwide",
    icon: "🎨",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as successful creative artists in bohemian studio, both facing camera with expressive passionate smiles, man in loose linen shirt with colorful paint splatters and rolled sleeves, woman in oversized vintage band t-shirt and patterned wide-leg pants with messy bun and paint-stained fingers, cluttered creative studio filled with large vibrant canvases leaning against exposed brick walls and scattered brushes and paint tubes everywhere",
      "warm golden afternoon sunlight streaming through large industrial windows with dust particles in air"
    ),
    storyTemplate: createStoryTemplate(
      "create masterpieces that touch hearts",
      "Their art reflects their love - bold, beautiful, and timeless. Together, they inspire the world with their creative vision.",
    ),
  },
  {
    id: ScenarioId.SCIENTISTS,
    title: "Science Pioneers",
    description: "Discover world-changing breakthroughs",
    icon: "🔬",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=60",
    previewImageUrl:
      "https://v3b.fal.media/files/b/0a89ba56/3WpJyXdaKw5yZPcSQP0wF.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple as pioneering research scientists in cutting-edge laboratory, both facing camera with intelligent proud expressions standing side by side, man in crisp white lab coat with safety glasses on forehead and tablet in hand, woman in white lab coat with blue nitrile gloves holding Erlenmeyer flask with glowing blue liquid, state-of-the-art laboratory with electron microscopes centrifuges and digital displays showing molecular structures in background",
      "clean bright clinical laboratory lighting with subtle blue accent from equipment displays"
    ),
    storyTemplate: createStoryTemplate(
      "make groundbreaking discoveries",
      "In the pursuit of knowledge, they've found not just scientific breakthroughs, but a partnership that defies all logic and reason.",
    ),
  },
];
