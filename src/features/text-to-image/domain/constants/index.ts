export { DEFAULT_IMAGE_STYLES } from "./styles.constants";
export {
  DEFAULT_NUM_IMAGES_OPTIONS, ASPECT_RATIO_VALUES, IMAGE_SIZE_VALUES,
  OUTPUT_FORMAT_VALUES, DEFAULT_FORM_VALUES,
} from "./options.constants";

/** Prompt suggestion for example prompts */
export interface PromptSuggestion {
  readonly id: string;
  readonly translationKey: string;
  readonly fallbackText: string;
}

/** Default text-to-image example prompts */
export const DEFAULT_TEXT_TO_IMAGE_PROMPTS: readonly PromptSuggestion[] = [
  { id: "1", translationKey: "prompts.text2image.fantasy", fallbackText: "A mystical forest with glowing mushrooms" },
  { id: "2", translationKey: "prompts.text2image.portrait", fallbackText: "Professional portrait with studio lighting" },
  { id: "3", translationKey: "prompts.text2image.landscape", fallbackText: "Sunset over mountains with lake reflection" },
];

/** Default text-to-voice example prompts */
export const DEFAULT_TEXT_TO_VOICE_PROMPTS: readonly PromptSuggestion[] = [
  { id: "1", translationKey: "prompts.text2voice.greeting", fallbackText: "Hello, welcome to our application" },
  { id: "2", translationKey: "prompts.text2voice.story", fallbackText: "Once upon a time in a land far away" },
];
