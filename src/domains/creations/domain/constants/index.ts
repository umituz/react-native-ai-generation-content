/**
 * Creation Domain Constants
 * Centralized constants for creation field names, status, and validation
 */

export {
  CREATION_FIELDS,
  UPDATABLE_FIELDS,
} from './creation-fields.constants';

// Re-export CreationFieldName as a type alias
import type { CreationFieldName } from './creation-fields.constants';
export type { CreationFieldName };

export {
  CREATION_STATUS,
} from './creation-status.constants';

export {
  CREATION_VALIDATION,
} from './creation-validation.constants';
