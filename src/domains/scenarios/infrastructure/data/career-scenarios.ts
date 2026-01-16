/**
 * Career Scenarios
 * Scenarios focused on professional success and career achievements
 */

import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

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
    aiPrompt:
      "A couple as successful entrepreneurs in a modern tech startup office, both standing confidently and looking directly at the camera with ambitious smiles, dressed in modern high-end business casual attire, sleek glass-walled office with city skyline view in background, inspirational and dynamic",
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
    aiPrompt:
      "A couple as creative artists in a sunlit studio, both looking at the camera with expressive artistic smiles, dressed in stylish paint-splattered bohemian clothing, cluttered creative studio filled with canvases and art supplies in background, vibrant and expressive",
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
    aiPrompt:
      "A couple as pioneering scientists in a modern laboratory, both standing side-by-side and looking at the camera with intelligent proud expressions, dressed in crisp white lab coats, cutting-edge research laboratory with high-tech equipment in background, clean and professional",
    storyTemplate: createStoryTemplate(
      "make groundbreaking discoveries",
      "In the pursuit of knowledge, they've found not just scientific breakthroughs, but a partnership that defies all logic and reason.",
    ),
  },
];
