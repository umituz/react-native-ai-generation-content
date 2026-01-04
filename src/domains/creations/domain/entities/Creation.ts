/**
 * Creation Entity
 * Represents an AI-generated creation
 */

import type { CreationStatus } from "../types/creation-types";

/**
 * Creation output containing media URLs
 */
export interface CreationOutput {
  readonly imageUrl?: string;
  readonly imageUrls?: string[];
  readonly videoUrl?: string;
  readonly audioUrl?: string;
  readonly thumbnailUrl?: string;
}

/**
 * Main Creation entity
 * Supports both simple (uri-based) and complex (output-based) creations
 */
export interface Creation {
  readonly id: string;
  readonly uri: string;
  readonly type: string;
  readonly prompt?: string;
  readonly metadata?: Record<string, unknown>;
  readonly originalUri?: string;
  readonly createdAt: Date;
  readonly isShared: boolean;
  readonly isFavorite: boolean;
  // Extended fields for job-based creations
  readonly status?: CreationStatus;
  readonly output?: CreationOutput;
}

export interface CreationDocument {
  readonly uri?: string;
  readonly prompt?: string;
  readonly metadata?: Record<string, unknown>;
  readonly originalImage?: string;
  readonly originalImageUrl?: string;
  readonly transformedImage?: string;
  readonly transformedImageUrl?: string;
  readonly transformationType?: string;
  readonly type?: string;
  readonly status?: string;
  readonly output?: CreationOutput | null;
  readonly isShared: boolean;
  readonly isFavorite?: boolean;
  readonly createdAt: FirebaseTimestamp | Date;
  readonly completedAt?: FirebaseTimestamp | Date;
}

interface FirebaseTimestamp {
  toDate: () => Date;
}

export function mapDocumentToCreation(
  id: string,
  data: CreationDocument,
): Creation {
  let creationDate: Date;
  if (data.createdAt instanceof Date) {
    creationDate = data.createdAt;
  } else if (data.createdAt && typeof data.createdAt === "object" && "toDate" in data.createdAt && typeof data.createdAt.toDate === "function") {
    creationDate = data.createdAt.toDate();
  } else {
    creationDate = new Date();
  }

  // Get URI from output or direct fields
  const uri = data.output?.imageUrl ||
              data.output?.videoUrl ||
              data.transformedImageUrl ||
              data.transformedImage ||
              data.uri ||
              "";

  return {
    id,
    uri,
    type: data.transformationType || data.type || "unknown",
    prompt: data.prompt,
    metadata: data.metadata,
    originalUri: data.originalImageUrl || data.originalImage,
    createdAt: creationDate,
    isShared: data.isShared ?? false,
    isFavorite: data.isFavorite ?? false,
    status: data.status as CreationStatus | undefined,
    output: data.output ?? undefined,
  };
}
