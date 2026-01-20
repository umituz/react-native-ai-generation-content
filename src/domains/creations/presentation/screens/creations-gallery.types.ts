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
  readonly showPendingJobs?: boolean;
}
