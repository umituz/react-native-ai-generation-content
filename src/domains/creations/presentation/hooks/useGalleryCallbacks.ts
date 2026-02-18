/**
 * Gallery Callbacks Hook
 * Extracts callback handlers from CreationsGalleryScreen
 */


import { useCallback } from "react";
import { useAlert, AlertType, AlertMode, useSharing } from "@umituz/react-native-design-system";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationsConfig } from "../../domain/value-objects/CreationsConfig";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";

interface UseGalleryCallbacksProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
  readonly config: CreationsConfig;
  readonly t: (key: string) => string;
  readonly deleteMutation: { mutateAsync: (id: string) => Promise<boolean> };
  readonly refetch: () => Promise<void>;
  readonly setSelectedCreation: (creation: Creation | null) => void;
  readonly setShowRatingPicker: (show: boolean) => void;
  readonly selectedCreation: Creation | null;
  readonly onTryAgain?: () => void;
}

export function useGalleryCallbacks(props: UseGalleryCallbacksProps) {
  const {
    userId,
    repository,
    config,
    t,
    deleteMutation,
    refetch,
    setSelectedCreation,
    setShowRatingPicker,
    selectedCreation,
    onTryAgain,
  } = props;

  const { share } = useSharing();
  const alert = useAlert();

  const handleShareCard = useCallback(
    (c: Creation) => {
      void share(c.uri, { dialogTitle: t("common.share") });
    },
    [share, t],
  );

  const handleDelete = useCallback(
    (c: Creation) => {
      alert.show(
        AlertType.WARNING,
        AlertMode.MODAL,
        t(config.translations.deleteTitle),
        t(config.translations.deleteMessage),
        {
          actions: [
            { id: "cancel", label: t("common.cancel"), onPress: () => {} },
            {
              id: "delete",
              label: t("common.delete"),
              style: "destructive",
              onPress: async () => {
                await deleteMutation.mutateAsync(c.id);
              },
            },
          ],
        },
      );
    },
    [alert, config, deleteMutation, t],
  );

  const handleFavorite = useCallback(
    (c: Creation) => {
      void (async () => {
        if (__DEV__) {
          console.log("[handleFavorite] Called", { id: c.id, currentFavorite: c.isFavorite, userId });
        }
        if (!userId) return;
        // Toggle the favorite status
        const newFavoriteStatus = !c.isFavorite;
        if (__DEV__) {
          console.log("[handleFavorite] Toggling", { newFavoriteStatus });
        }
        const success = await repository.updateFavorite(userId, c.id, newFavoriteStatus);
        if (__DEV__) {
          console.log("[handleFavorite] Update result", { success });
        }
        if (success) void refetch();
      })();
    },
    [userId, repository, refetch],
  );

  const handleCardPress = useCallback(
    (item: Creation) => {
      setSelectedCreation(item);
    },
    [setSelectedCreation],
  );

  const handleBack = useCallback(() => {
    setSelectedCreation(null);
  }, [setSelectedCreation]);

  const handleTryAgain = useCallback(() => {
    setSelectedCreation(null);
    onTryAgain?.();
  }, [setSelectedCreation, onTryAgain]);

  const handleOpenRatingPicker = useCallback(() => {
    setShowRatingPicker(true);
  }, [setShowRatingPicker]);

  const handleSubmitRating = useCallback(
    (rating: number, description: string) => {
      if (!userId || !selectedCreation) return;
      void (async () => {
        const success = await repository.rate(userId, selectedCreation.id, rating, description);
        if (success) {
          setSelectedCreation({ ...selectedCreation, rating, ratedAt: new Date() });
          alert.show(AlertType.SUCCESS, AlertMode.TOAST, t("result.rateSuccessTitle"), t("result.rateSuccessMessage"));
          void refetch();
        }
      })();
    },
    [userId, selectedCreation, repository, alert, t, refetch, setSelectedCreation],
  );

  return {
    handleShareCard,
    handleDelete,
    handleFavorite,
    handleCardPress,
    handleBack,
    handleTryAgain,
    handleOpenRatingPicker,
    handleSubmitRating,
  };
}
