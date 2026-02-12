/**
 * useCreationPersistence Hook
 */

import { useCallback, useMemo } from "react";
import { useAuth } from "@umituz/react-native-auth";
import { createCreationsRepository } from "../../infrastructure/adapters";
import type { Creation } from "../../domain/entities/Creation";
import { CREATION_STATUS, CREATION_FIELDS } from "../../domain/constants";
import { runAllValidations, markCreationAsFailed } from "./creation-validators";
import type {
  UseCreationPersistenceConfig,
  UseCreationPersistenceReturn,
  BaseProcessingStartData,
  BaseProcessingResult,
} from "./creation-persistence.types";

export type * from "./creation-persistence.types";

export function useCreationPersistence(
  config: UseCreationPersistenceConfig
): UseCreationPersistenceReturn {
  const { type, collectionName = "creations", creditCost, onCreditDeduct } = config;
  const { userId } = useAuth();
  const repository = useMemo(() => createCreationsRepository(collectionName), [collectionName]);

  const onProcessingStart = useCallback(
    async <T extends BaseProcessingStartData>(data: T): Promise<void> => {
      if (!userId) return;
      const { creationId, ...rest } = data;
      const cleanMetadata = Object.fromEntries(
        Object.entries(rest).filter(([, v]) => v !== undefined && v !== null)
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
      await repository.create(userId, creation);
    },
    [userId, repository, type]
  );

  const onProcessingComplete = useCallback(
    async <T extends BaseProcessingResult>(result: T): Promise<void> => {
      if (!userId || !result.creationId) return;

      const validation = runAllValidations(result.imageUrl, result.videoUrl);
      if (!validation.isValid) {
        await markCreationAsFailed(repository, userId, result.creationId, validation.error!);
        return;
      }

      const uri = result.imageUrl || result.videoUrl || "";
      await repository.update(userId, result.creationId, {
        [CREATION_FIELDS.URI]: uri,
        [CREATION_FIELDS.STATUS]: CREATION_STATUS.COMPLETED,
        [CREATION_FIELDS.OUTPUT]: result.imageUrl
          ? { imageUrl: result.imageUrl }
          : { videoUrl: result.videoUrl },
        ...(result.imageUrl && { [CREATION_FIELDS.IMAGE_URL]: result.imageUrl }),
        ...(result.videoUrl && { [CREATION_FIELDS.VIDEO_URL]: result.videoUrl }),
      });

      if (creditCost && onCreditDeduct) {
        onCreditDeduct(creditCost).catch(() => {});
      }
    },
    [userId, repository, creditCost, onCreditDeduct]
  );

  const onError = useCallback(
    async (error: string, creationId?: string): Promise<void> => {
      if (!userId || !creationId) return;
      await markCreationAsFailed(repository, userId, creationId, error);
    },
    [userId, repository]
  );

  return useMemo(
    () => ({ onProcessingStart, onProcessingComplete, onError }),
    [onProcessingStart, onProcessingComplete, onError]
  );
}
