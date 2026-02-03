/**
 * Creations Gallery Screen Types
 */

import type { CreationsConfig } from "../../domain/value-objects/CreationsConfig";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";

export interface CreationsGalleryScreenProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
  readonly config: CreationsConfig;
  readonly t: (key: string) => string;
  readonly initialCreationId?: string;
  readonly onEmptyAction?: () => void;
  readonly emptyActionLabel?: string;
  readonly showFilter?: boolean;
  /** Callback for back navigation - if provided, shows back button in header */
  readonly onBack?: () => void;
  /** Callback for "Try Again" action - navigates to create new */
  readonly onTryAgain?: () => void;
  /** Function to get dynamic title from creation metadata */
  readonly getCreationTitle?: (creation: { type: string; metadata?: Record<string, unknown> }) => string;
}
