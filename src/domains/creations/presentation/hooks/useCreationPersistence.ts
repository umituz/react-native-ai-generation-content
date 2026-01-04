/**
 * useCreationPersistence Hook
 * Encapsulates Firestore persistence logic for AI generation features
 * Eliminates boilerplate code in feature screens
 */

import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@umituz/react-native-auth";
import { createCreationsRepository } from "../../infrastructure/adapters";
import type { Creation } from "../../domain/entities/Creation";

declare const __DEV__: boolean;

/**
 * Configuration for creation persistence
 */
export interface UseCreationPersistenceConfig {
  /** Creation type identifier (e.g., "anime-selfie", "ai-kiss") */
  readonly type: string;
  /** Collection name in Firestore (defaults to "creations") */
  readonly collectionName?: string;
}

/**
 * Base processing start data - all features must have creationId
 */
export interface BaseProcessingStartData {
  readonly creationId: string;
}

/**
 * Base processing result - all features should have creationId
 */
export interface BaseProcessingResult {
  readonly creationId?: string;
  readonly imageUrl?: string;
  readonly videoUrl?: string;
}

/**
 * Return type for useCreationPersistence - uses generic callbacks
 */
export interface UseCreationPersistenceReturn {
  readonly onProcessingStart: <T extends BaseProcessingStartData>(data: T) => void;
  readonly onProcessingComplete: <T extends BaseProcessingResult>(result: T) => void;
  readonly onError: (error: string, creationId?: string) => void;
}

/**
 * Hook that provides Firestore persistence callbacks for AI features
 *
 * @example
 * // In AnimeSelfieScreen:
 * const persistence = useCreationPersistence({ type: "anime-selfie" });
 * const config = useMemo(() => ({
 *   prepareImage,
 *   ...persistence,
 * }), [persistence]);
 */
export function useCreationPersistence(
  config: UseCreationPersistenceConfig,
): UseCreationPersistenceReturn {
  const { type, collectionName = "creations" } = config;
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const repository = useMemo(
    () => createCreationsRepository(collectionName),
    [collectionName],
  );

  const onProcessingStart = useCallback(
    <T extends BaseProcessingStartData>(data: T) => {
      if (__DEV__) {
        console.log("[useCreationPersistence] onProcessingStart called", { type, userId, data });
      }

      if (!userId) {
        if (__DEV__) console.log("[useCreationPersistence] No userId, skipping");
        return;
      }

      const { creationId, ...rest } = data;
      const cleanMetadata = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => v !== undefined && v !== null),
      );

      if (__DEV__) {
        console.log("[useCreationPersistence] cleanMetadata", cleanMetadata);
      }

      const creation: Creation = {
        id: creationId,
        uri: "",
        type,
        status: "processing",
        createdAt: new Date(),
        isShared: false,
        isFavorite: false,
        metadata: cleanMetadata,
      };

      if (__DEV__) {
        console.log("[useCreationPersistence] Creating document", { creationId, type });
      }

      repository.create(userId, creation);
      queryClient.invalidateQueries({ queryKey: ["creations"] });
    },
    [userId, repository, queryClient, type],
  );

  const onProcessingComplete = useCallback(
    <T extends BaseProcessingResult>(result: T) => {
      if (__DEV__) {
        console.log("[useCreationPersistence] onProcessingComplete called", {
          creationId: result.creationId,
          hasImageUrl: !!result.imageUrl,
          hasVideoUrl: !!result.videoUrl,
        });
      }

      if (!userId || !result.creationId) {
        if (__DEV__) console.log("[useCreationPersistence] Missing userId or creationId, skipping");
        return;
      }

      const uri = result.imageUrl || result.videoUrl || "";
      const output = result.imageUrl
        ? { imageUrl: result.imageUrl }
        : result.videoUrl
          ? { videoUrl: result.videoUrl }
          : undefined;

      if (__DEV__) {
        console.log("[useCreationPersistence] Updating document to completed", {
          creationId: result.creationId,
          uri: uri.substring(0, 50) + "...",
        });
      }

      repository.update(userId, result.creationId, {
        uri,
        status: "completed",
        output,
      });
      queryClient.invalidateQueries({ queryKey: ["creations"] });
    },
    [userId, repository, queryClient],
  );

  const onError = useCallback(
    (error: string, creationId?: string) => {
      if (__DEV__) {
        console.log("[useCreationPersistence] onError called", { error, creationId });
      }

      if (!userId || !creationId) {
        if (__DEV__) console.log("[useCreationPersistence] Missing userId or creationId, skipping");
        return;
      }

      if (__DEV__) {
        console.log("[useCreationPersistence] Updating document to failed", { creationId });
      }

      repository.update(userId, creationId, {
        status: "failed",
        metadata: { error },
      });
      queryClient.invalidateQueries({ queryKey: ["creations"] });
    },
    [userId, repository, queryClient],
  );

  return useMemo(
    () => ({ onProcessingStart, onProcessingComplete, onError }),
    [onProcessingStart, onProcessingComplete, onError],
  );
}
