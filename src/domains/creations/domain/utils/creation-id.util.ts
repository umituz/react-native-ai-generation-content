/**
 * Creation ID Utilities
 * Single Responsibility: ID generation
 */

import { generateUUID } from "@umituz/react-native-design-system/uuid";

/**
 * Generate a unique creation ID using UUID v4
 */
export function generateCreationId(): string {
  return generateUUID();
}
