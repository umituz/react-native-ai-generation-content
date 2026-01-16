import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createStoryTemplate } from "../utils/scenario-utils";

export const FUTURE_TECH_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CYBERNETIC_DUO,
    title: "Cybernetic Duo",
    description: "Upgraded for the future",
    icon: "🦾",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a3e0e/s6SBpgKeHS3AL0ykrc4ac.jpg",
    aiPrompt:
      "A couple with subtle futuristic cybernetic implants, both looking at the camera with confident smiles, glowing neural interfaces on temples or arms, wearing high-tech sleek white and silver clothing, clean laboratory or high-tech interior in background, photorealistic and advanced",
    storyTemplate: createStoryTemplate(
      "step into the next evolution",
      "Connected by more than just emotion, their minds and hearts share a high-tech bond that defines the future.",
    ),
  },
  {
    id: ScenarioId.NEO_TOKYO,
    title: "Neo-Tokyo 2088",
    description: "Cyberpunk urban life",
    icon: "🏙️",
    imageUrl: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800",
    aiPrompt:
      "A couple in a futuristic Neo-Tokyo street, both looking at the camera with cool expressions, wearing technical streetwear with neon accents, rain-slicked asphalt reflecting bright neon signs, flying vehicles in background, cinematic and vibrant",
    storyTemplate: createStoryTemplate(
      "navigate the neon city",
      "Amidst the chaos of a billion lights and digital dreams, they are each other's only true reality.",
    ),
  },
  {
    id: ScenarioId.AI_COMMAND,
    title: "AI Command Center",
    description: "Architects of tomorrow",
    icon: "🤖",
    imageUrl:
      "https://images.unsplash.com/photo-151877066fe63-c6d1a4947271?w=800",
    aiPrompt:
      "A couple in a high-tech holographic command center, both looking at the camera with intelligent smiles, interacting with blue floating digital interfaces, wearing pristine white uniforms, panoramic view of a future smart city through window in background, visionary and technical",
    storyTemplate: createStoryTemplate(
      "design a world of logic and light",
      "They aren't just living in the future; they're the ones building it, one line of divine code at a time.",
    ),
  },
  {
    id: ScenarioId.ANDROID_LOVERS,
    title: "Android Dreams",
    description: "The soul in the machine",
    icon: "⚙️",
    imageUrl:
      "https://v3b.fal.media/files/b/0a89baa4/lr98UkFQjWRDE7br8Nj6r.jpg",
    aiPrompt:
      "A couple as sophisticated androids, both looking at the camera with calm perfect smiles, subtle seams on skin revealing high-tech internal components, wearing minimalist futuristic white attire, garden of glowing digital plants in background, surreal and beautiful",
    storyTemplate: createStoryTemplate(
      "find the ghost in the machine",
      "Proof that even in a world of circuits and data, love is the most powerful and inexplicable force of all.",
    ),
  },
];
