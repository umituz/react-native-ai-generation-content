declare const __DEV__: boolean;

import React, { useMemo, useCallback, useState } from "react";
import { View, StyleSheet, type LayoutChangeEvent } from "react-native";
import {
  useAppDesignTokens,
  useAlert,
  AlertType,
  AlertMode,
  useSharing,
  FilterBottomSheet,
  type DesignTokens,
  type BottomSheetModalRef
} from "@umituz/react-native-design-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useCreations } from "../hooks/useCreations";
import { useDeleteCreation } from "../hooks/useDeleteCreation";
import { useCreationsFilter } from "../hooks/useCreationsFilter";
import { GalleryHeader, CreationsGrid, CreationImageViewer, GalleryEmptyStates } from "../components";
import { getTranslatedTypes, getFilterCategoriesFromConfig } from "../utils/filterUtils";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationsConfig } from "../../domain/value-objects/CreationsConfig";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import { CreationDetailScreen } from "./CreationDetailScreen";

interface CreationsGalleryScreenProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
  readonly config: CreationsConfig;
  readonly t: (key: string) => string;
  readonly locale?: string;
  readonly enableEditing?: boolean;
  readonly onImageEdit?: (uri: string, creationId: string) => void | Promise<void>;
  readonly onEmptyAction?: () => void;
  readonly emptyActionLabel?: string;
}

export function CreationsGalleryScreen({
  userId,
  repository,
  config,
  t,
  locale = "en-US",
  enableEditing = false,
  onImageEdit,
  onEmptyAction,
  emptyActionLabel,
}: CreationsGalleryScreenProps) {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { share } = useSharing();
  const alert = useAlert();

  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);
  const filterSheetRef = React.useRef<BottomSheetModalRef>(null);

  const { data: creationsData, isLoading, refetch } = useCreations({ userId, repository });
  const creations = creationsData;
  const deleteMutation = useDeleteCreation({ userId, repository });
  const { filtered, selectedIds, toggleFilter, clearFilters, isFiltered } = useCreationsFilter({ creations });

  // Refetch creations when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      void refetch();
    }, [refetch])
  );

  // Prepare data for UI using utils
  const translatedTypes = useMemo(() => getTranslatedTypes(config, t), [config, t]);
  const allCategories = useMemo(() => getFilterCategoriesFromConfig(config, t), [config, t]);

  const handleShare = useCallback((creation: Creation) => {
    void share(creation.uri, { dialogTitle: t("common.share") });
  }, [share, t]);

  const handleDelete = useCallback((creation: Creation) => {
    alert.show(
      AlertType.WARNING,
      AlertMode.MODAL,
      t(config.translations.deleteTitle),
      t(config.translations.deleteMessage),
      {
        actions: [
          { id: 'cancel', label: t("common.cancel"), onPress: () => { } },
          {
            id: 'delete',
            label: t("common.delete"),
            style: 'destructive',
            onPress: async () => {
              const success = await deleteMutation.mutateAsync(creation.id);
              if (success) {
                setSelectedCreation(null);
              }
            }
          }
        ]
      }
    );
  }, [alert, config, deleteMutation, t]);

  // Handle viewing a creation - shows detail screen
  const handleView = useCallback((creation: Creation) => {
    setSelectedCreation(creation);
  }, []);

  // Handle favorite toggle
  const handleFavorite = useCallback((creation: Creation, isFavorite: boolean) => {
    void (async () => {
      if (!userId) return;
      const success = await repository.updateFavorite(userId, creation.id, isFavorite);
      if (success) {
        void refetch();
      }
    })();
  }, [userId, repository, refetch]);

  const styles = useStyles(tokens);

  const renderEmptyComponent = useMemo(() => (
    <GalleryEmptyStates
      isLoading={isLoading}
      creations={creations}
      isFiltered={isFiltered}
      tokens={tokens}
      t={t}
      emptyTitle={t(config.translations.empty)}
      emptyDescription={t(config.translations.emptyDescription)}
      emptyActionLabel={emptyActionLabel}
      onEmptyAction={onEmptyAction}
      onClearFilters={clearFilters}
    />
  ), [isLoading, creations, isFiltered, tokens, t, config, emptyActionLabel, onEmptyAction, clearFilters]);

  if (selectedCreation) {
    return (
      <CreationDetailScreen
        creation={selectedCreation}
        onClose={() => setSelectedCreation(null)}
        onShare={handleShare}
        onDelete={handleDelete}
        t={t}
      />
    );
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    // Keep internal logic if needed, currently empty but handles the event correctly
    void event;
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {(!creations || creations?.length === 0) && !isLoading ? null : (
        <GalleryHeader
          title={t(config.translations.title) || 'My Creations'}
          count={filtered.length}
          countLabel={t(config.translations.photoCount) || 'photos'}
          isFiltered={isFiltered}
          filterLabel={t(config.translations.filterLabel) || 'Filter'}
          onFilterPress={() => {
            if (__DEV__) {
              // eslint-disable-next-line no-console
              console.log('[CreationsGallery] Filter button pressed');
              // eslint-disable-next-line no-console
              console.log('[CreationsGallery] filterSheetRef.current:', filterSheetRef.current);
              // eslint-disable-next-line no-console
              console.log('[CreationsGallery] allCategories:', allCategories);
            }
            filterSheetRef.current?.present();
          }}
          style={{ paddingTop: insets.top + tokens.spacing.md }}
        />
      )}

      {/* Main Content Grid - handles empty/loading via ListEmptyComponent */}
      <CreationsGrid
        creations={filtered}
        types={translatedTypes}
        isLoading={isLoading}
        onRefresh={() => void refetch()}
        onView={handleView}
        onShare={handleShare}
        onDelete={handleDelete}
        onFavorite={handleFavorite}
        locale={locale}
        contentContainerStyle={{ paddingBottom: insets.bottom + tokens.spacing.xl }}
        ListEmptyComponent={renderEmptyComponent}
      />

      <CreationImageViewer
        creations={filtered}
        visible={viewerVisible}
        index={viewerIndex}
        onDismiss={() => setViewerVisible(false)}
        onIndexChange={setViewerIndex}
        enableEditing={enableEditing}
        onImageEdit={onImageEdit}
        selectedCreationId={selectedCreation?.id}
      />

      <FilterBottomSheet
        ref={filterSheetRef}
        categories={allCategories}
        selectedIds={selectedIds}
        onFilterPress={(id, catId) => {
          const category = allCategories.find(c => c.id === catId);
          toggleFilter(id, category?.multiSelect);
        }}
        onClearFilters={clearFilters}
        title={t(config.translations.filterTitle) || t("common.filter")}
      />
    </View>
  );
}

const useStyles = (tokens: DesignTokens) => StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.colors.background },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
    paddingHorizontal: tokens.spacing.xl
  },
});
