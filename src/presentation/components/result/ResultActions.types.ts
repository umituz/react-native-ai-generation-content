/**
 * ResultActions Type Definitions
 */

import type { ResultActionsConfig } from "../../types/result-config.types";

export interface ResultActionsProps {
  onShare?: () => void;
  onSave?: () => void;
  onRetry?: () => void;
  isSharing?: boolean;
  isSaving?: boolean;
  translations: {
    share: string;
    sharing: string;
    save: string;
    retry: string;
  };
  config?: ResultActionsConfig;
}
