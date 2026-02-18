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
  readonly rating?: number;
  readonly ratedAt?: Date;
  // Extended fields for job-based creations
  readonly status?: CreationStatus;
  readonly output?: CreationOutput;
  // Background job tracking
  readonly requestId?: string;
  readonly model?: string;
  // Timestamps
  readonly startedAt?: Date;    // When generation was submitted to the queue
  readonly completedAt?: Date;  // When generation finished (success or failure)
  readonly durationMs?: number; // Elapsed ms from startedAt to completedAt
  // Soft delete - if set, the creation is considered deleted
  readonly deletedAt?: Date;
}

interface FirebaseTimestamp {
  toDate: () => Date;
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
  readonly rating?: number;
  readonly ratedAt?: FirebaseTimestamp | Date | null;
  readonly createdAt: FirebaseTimestamp | Date;
  readonly startedAt?: FirebaseTimestamp | Date | null;
  readonly completedAt?: FirebaseTimestamp | Date | null;
  readonly deletedAt?: FirebaseTimestamp | Date | null;
  readonly updatedAt?: FirebaseTimestamp | Date | null;
  readonly durationMs?: number;
  // Background job tracking
  readonly requestId?: string;
  readonly model?: string;
}

function toDate(value: FirebaseTimestamp | Date | null | undefined): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (typeof value === "object" && "toDate" in value && typeof (value as FirebaseTimestamp).toDate === "function") {
    return (value as FirebaseTimestamp).toDate();
  }
  return undefined;
}

export function mapDocumentToCreation(
  id: string,
  data: CreationDocument,
): Creation {
  const creationDate = toDate(data.createdAt) ?? new Date();

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
    rating: data.rating,
    ratedAt: toDate(data.ratedAt),
    status: data.status as CreationStatus | undefined,
    output: data.output ?? undefined,
    requestId: data.requestId,
    model: data.model,
    startedAt: toDate(data.startedAt),
    completedAt: toDate(data.completedAt),
    durationMs: data.durationMs,
    deletedAt: toDate(data.deletedAt),
  };
}
