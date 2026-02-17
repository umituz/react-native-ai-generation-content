/**
 * Text-to-Image Models Configuration
 */

import type { FalModelConfig } from "@umituz/react-native-ai-fal-provider";

export const TEXT_TO_IMAGE_MODELS: FalModelConfig[] = [
  {
    id: "xai/grok-imagine-image",
    name: "Grok Imagine",
    type: "text-to-image",
    isDefault: true,
    isActive: true,
    pricing: { freeUserCost: 0.5, premiumUserCost: 0.25 },
    description: "X.AI's cost-effective text-to-image generation ($0.02/image)",
    order: 1,
  },
];
