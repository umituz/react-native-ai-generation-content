/**
 * Base Prompt Structure Types
 */

export interface CreatePromptOptions {
  includeIdentityPreservation?: boolean;
  includePhotoRealism?: boolean;
  includePoseGuidelines?: boolean;
  customInstructions?: string;
}
