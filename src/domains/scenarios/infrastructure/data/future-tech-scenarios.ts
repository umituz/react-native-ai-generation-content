import { Scenario, ScenarioId } from "../../domain/Scenario";
import { createPhotorealisticPrompt, createStoryTemplate } from "../utils/scenario-utils";

export const FUTURE_TECH_SCENARIOS: Omit<Scenario, 'outputType' | 'category'>[] = [
  {
    id: ScenarioId.CYBERNETIC_DUO,
    title: "Cybernetic Duo",
    description: "Upgraded for the future",
    icon: "🦾",
    imageUrl:
      "https://v3b.fal.media/files/b/0a8a3e0e/s6SBpgKeHS3AL0ykrc4ac.jpg",
    aiPrompt: createPhotorealisticPrompt(
      "a couple with elegant futuristic cybernetic enhancements, both facing camera with confident knowing smiles, subtle glowing blue neural interface lines on temples and elegant chrome prosthetic forearm with soft LED glow, man in sleek white and silver form-fitting technical jacket with hidden closures, woman in minimalist pearl white bodysuit with geometric silver accents, pristine white laboratory with floating holographic displays and curved glass walls in background",
      "clean bright clinical lighting with subtle cyan accent from cybernetic implants"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple in futuristic Neo-Tokyo street at night, both facing camera with cool confident expressions, man in black technical techwear jacket with neon pink trim and illuminated collar and AR glasses, woman in form-fitting dark bodysuit with cyan LED accents and asymmetric jacket with holographic patches, rain-slicked black asphalt reflecting countless neon Japanese signs in pink and blue and orange with sleek flying vehicles and towering holographic advertisements in background",
      "vibrant neon cyberpunk lighting with pink cyan and purple reflections on wet surfaces"
    ),
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
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    aiPrompt: createPhotorealisticPrompt(
      "a couple in futuristic AI command center, both facing camera with intelligent proud smiles while hands interact with floating blue holographic data interfaces, man in pristine white commander uniform with subtle silver rank insignia, woman in matching white uniform with neural headset, circular room with wraparound holographic displays showing global data and panoramic window overlooking gleaming white smart city with flying vehicles in background",
      "clean high-tech blue and white lighting with holographic glow on faces"
    ),
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
    aiPrompt: createPhotorealisticPrompt(
      "a couple as sophisticated humanoid androids, both facing camera with calm serene smiles expressing subtle emotion, elegant seams visible on porcelain-like synthetic skin revealing intricate glowing circuitry beneath, wearing minimalist pure white form-fitting attire with clean lines, ethereal garden with bioluminescent digital flowers in soft blue and pink and floating data particles in background",
      "soft ethereal lighting with gentle blue and white glow from internal systems and bioluminescent plants"
    ),
    storyTemplate: createStoryTemplate(
      "find the ghost in the machine",
      "Proof that even in a world of circuits and data, love is the most powerful and inexplicable force of all.",
    ),
  },
];
