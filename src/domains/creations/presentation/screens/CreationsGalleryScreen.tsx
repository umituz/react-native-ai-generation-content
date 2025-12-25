import React, { useMemo, useCallback, useState } from "react";
import { View, StyleSheet, ActivityIndicator, type LayoutChangeEvent } from "react-native";
import { useAppDesignTokens, useAlert, AlertType, AlertMode, useSharing, type DesignTokens } from "@umituz/react-native-design-system";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useCreations } from "../hooks/useCreations";
import { useDeleteCreation } from "../hooks/useDeleteCreation";
import { useCreationsFilter } from "../hooks/useCreationsFilter";
import { GalleryHeader, EmptyState, CreationsGrid, FilterBottomSheet, CreationImageViewer } from "../components";
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
  const filterSheetRef = React.useRef<BottomSheetModal>(null);

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

  const styles = useStyles(tokens);

  // Define empty state content based on state
  const renderEmptyComponent = useMemo(() => {
    // 1. Loading State
    if (isLoading && (!creations || creations?.length === 0)) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={tokens.colors.primary} />
        </View>
      );
    }

    // 2. System Empty State (User has NO creations at all)
    if (!creations || creations?.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <EmptyState
            title={t(config.translations.empty)}
            description={t(config.translations.emptyDescription)}
            actionLabel={emptyActionLabel}
            onAction={onEmptyAction}
          />
        </View>
      );
    }

    // 3. Filter Empty State (User has creations, but filter returns none)
    return (
      <View style={styles.centerContainer}>
        <EmptyState
          title={t("common.no_results") || "No results"}
          description={t("common.no_results_description") || "Try changing your filters"}
          actionLabel={t("common.clear_all") || "Clear All"}
          onAction={clearFilters}
        />
      </View>
    );
  }, [isLoading, creations, config, t, emptyActionLabel, onEmptyAction, clearFilters, styles.centerContainer, tokens.colors.primary]);

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
          onFilterPress={() => filterSheetRef.current?.present()}
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
