/**
 * Creation Entity
 * Represents an AI-generated creation
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
  readonly isShared: boolean;
  readonly isFavorite?: boolean;
  readonly createdAt: FirebaseTimestamp | Date; // Allow Date for writing
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

  return {
    id,
    uri: data.transformedImageUrl || data.transformedImage || data.uri || "",
    type: data.transformationType || data.type || "unknown",
    prompt: data.prompt,
    metadata: data.metadata,
    originalUri: data.originalImageUrl || data.originalImage,
    createdAt: creationDate,
    isShared: data.isShared ?? false,
    isFavorite: data.isFavorite ?? false,
  };
}
