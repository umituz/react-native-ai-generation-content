/**
 * useCreationPersistence Hook
 * Encapsulates Firestore persistence logic for AI generation features
 * Realtime listener handles UI updates automatically
 */

import { useCallback, useMemo } from "react";
import { useAuth } from "@umituz/react-native-auth";
import { createCreationsRepository } from "../../infrastructure/adapters";
import type { Creation } from "../../domain/entities/Creation";

declare const __DEV__: boolean;

export interface UseCreationPersistenceConfig {
  readonly type: string;
  readonly collectionName?: string;
  readonly creditCost?: number;
  readonly onCreditDeduct?: (cost: number) => Promise<void | boolean>;
}

export interface BaseProcessingStartData {
  readonly creationId: string;
}

export interface BaseProcessingResult {
  readonly creationId?: string;
  readonly imageUrl?: string;
  readonly videoUrl?: string;
}

export interface UseCreationPersistenceReturn {
  readonly onProcessingStart: <T extends BaseProcessingStartData>(data: T) => void;
  readonly onProcessingComplete: <T extends BaseProcessingResult>(result: T) => void;
  readonly onError: (error: string, creationId?: string) => void;
}

export function useCreationPersistence(
  config: UseCreationPersistenceConfig,
): UseCreationPersistenceReturn {
  const { type, collectionName = "creations", creditCost, onCreditDeduct } = config;
  const { userId } = useAuth();

  const repository = useMemo(
    () => createCreationsRepository(collectionName),
    [collectionName],
  );

  const onProcessingStart = useCallback(
    <T extends BaseProcessingStartData>(data: T) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useCreationPersistence] onProcessingStart", { type, userId });
      }

      if (!userId) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useCreationPersistence] No userId, skipping");
        }
        return;
      }

      const { creationId, ...rest } = data;
      const cleanMetadata = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => v !== undefined && v !== null),
      );

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

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useCreationPersistence] Creating document", { creationId, type });
      }

      repository.create(userId, creation);
    },
    [userId, repository, type],
  );

  const onProcessingComplete = useCallback(
    <T extends BaseProcessingResult>(result: T) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useCreationPersistence] onProcessingComplete", {
          creationId: result.creationId,
          hasImageUrl: !!result.imageUrl,
          hasVideoUrl: !!result.videoUrl,
        });
      }

      if (!userId || !result.creationId) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useCreationPersistence] Missing userId or creationId");
        }
        return;
      }

      const uri = result.imageUrl || result.videoUrl || "";
      const output = result.imageUrl
        ? { imageUrl: result.imageUrl }
        : result.videoUrl
          ? { videoUrl: result.videoUrl }
          : undefined;

      repository.update(userId, result.creationId, {
        uri,
        status: "completed",
        output,
      });

      if (creditCost && creditCost > 0 && onCreditDeduct) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useCreationPersistence] Deducting credits", { cost: creditCost });
        }
        onCreditDeduct(creditCost).catch((err) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[useCreationPersistence] Credit deduction failed", err);
          }
        });
      }
    },
    [userId, repository, creditCost, onCreditDeduct],
  );

  const onError = useCallback(
    (error: string, creationId?: string) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useCreationPersistence] onError", { error, creationId });
      }

      if (!userId || !creationId) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[useCreationPersistence] Missing userId or creationId");
        }
        return;
      }

      repository.update(userId, creationId, {
        status: "failed",
        metadata: { error },
      });
    },
    [userId, repository],
  );

  return useMemo(
    () => ({ onProcessingStart, onProcessingComplete, onError }),
    [onProcessingStart, onProcessingComplete, onError],
  );
}
