/**
 * Style Options Constants
 * Generic UI style choices — reusable across all apps
 */

export interface StyleOption {
  id: string;
  label: string;
  icon: string;
}

export const STYLE_OPTIONS: StyleOption[] = [
  { id: "modern", label: "Modern", icon: "Zap" },
  { id: "minimal", label: "Minimal", icon: "Minus" },
  { id: "vibrant", label: "Vibrant", icon: "sparkles" },
  { id: "professional", label: "Professional", icon: "Briefcase" },
  { id: "playful", label: "Playful", icon: "Smile" },
  { id: "elegant", label: "Elegant", icon: "Award" },
];
