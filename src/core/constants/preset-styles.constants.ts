/**
 * Preset Styles Constants
 */

export interface PresetStyle {
  id: string;
  emoji: string;
  name: string;
  description: string;
  prompt: string;
  style: string;
  duration: number;
}

export const PRESET_STYLES: PresetStyle[] = [
  {
    id: "birthday",
    emoji: "🎉",
    name: "Birthday",
    description: "Celebration with balloons & confetti",
    prompt:
      "Create a joyful birthday celebration video with colorful balloons, confetti animations, happy birthday text effects, and party atmosphere",
    style: "playful",
    duration: 4,
  },
  {
    id: "social",
    emoji: "📱",
    name: "Social Media",
    description: "Modern intro with colors",
    prompt:
      "Create a modern social media intro with solid background, smooth transitions, trending aesthetics, and attention-grabbing text",
    style: "vibrant",
    duration: 4,
  },
  {
    id: "business",
    emoji: "💼",
    name: "Business",
    description: "Professional presentation",
    prompt:
      "Create a professional business presentation video with clean design, corporate colors, elegant transitions, and polished look",
    style: "professional",
    duration: 4,
  },
  {
    id: "education",
    emoji: "🎓",
    name: "Education",
    description: "Tutorial & learning content",
    prompt:
      "Create an educational tutorial video with clear step-by-step structure, informative text, learning-friendly design",
    style: "minimal",
    duration: 4,
  },
  {
    id: "music",
    emoji: "🎵",
    name: "Music Video",
    description: "Vibrant & energetic visuals",
    prompt:
      "Create a music video with vibrant colors, rhythm-synced animations, abstract shapes, and energetic motion",
    style: "vibrant",
    duration: 4,
  },
  {
    id: "promo",
    emoji: "🔥",
    name: "Promotion",
    description: "Product showcase & ads",
    prompt:
      "Create an engaging product promotion video with dynamic animations, call-to-action text, bold colors, and persuasive messaging",
    style: "modern",
    duration: 4,
  },
];
