/**
 * Base Prompt Structure Types
 */

export interface CreatePromptOptions {
  includeIdentityPreservation?: boolean;
  includePhotoRealism?: boolean;
  includePoseGuidelines?: boolean;
  isCouple?: boolean;
  isArtistic?: boolean;
  isWardrobe?: boolean;
  isRetouch?: boolean;
  customInstructions?: string;
}
