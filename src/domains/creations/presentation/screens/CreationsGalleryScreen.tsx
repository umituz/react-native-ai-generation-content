import React, { useMemo, useCallback, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  useAppDesignTokens,
  useSharing,
  ScreenLayout,
  ScreenHeader,
  useAlert,
  AlertMode,
  AtomicIcon,
  type BottomSheetModalRef
} from "@umituz/react-native-design-system";
import { useCreations } from "../hooks/useCreations";
import { useDeleteCreation } from "../hooks/useDeleteCreation";
import { useCreationsFilter } from "../hooks/useCreationsFilter";
import { useToggleFavorite } from "../hooks/useToggleFavorite";
import { useDeleteMultipleCreations } from "../hooks/useDeleteMultipleCreations";
import {
  GalleryHeader,
  CreationsGrid,
  FilterBottomSheet,
  CreationImageViewer,
  CreationsGalleryEmptyState
} from "../components";
import { SearchBar } from "@umituz/react-native-design-system";
import { getTranslatedTypes, getFilterCategoriesFromConfig } from "../utils/filterUtils";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationsConfig } from "../../domain/value-objects/CreationsConfig";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";

interface CreationsGalleryScreenProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
  readonly config: CreationsConfig;
  readonly t: (key: string, options?: any) => string;
  readonly enableEditing?: boolean;
  readonly onImageEdit?: (uri: string, creationId: string) => void | Promise<void>;
  readonly onEmptyAction?: () => void;
  readonly emptyActionLabel?: string;
  readonly onBackPress?: () => void;
  readonly headerTitle?: string;
  readonly showCount?: boolean;
  readonly enableSearch?: boolean;
  readonly enableFilter?: boolean;
  readonly showGalleryHeader?: boolean;
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
  onBackPress,
  headerTitle,
  showCount = true,
  enableSearch = true,
  enableFilter = false,
  showGalleryHeader = true,
}: CreationsGalleryScreenProps) {
  const tokens = useAppDesignTokens();
  const { share } = useSharing();
  const alert = useAlert();

  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);
  const filterSheetRef = React.useRef<BottomSheetModalRef>(null);

  const { data: creationsData, isLoading, refetch } = useCreations({ userId, repository });
  const creations = creationsData as Creation[] | undefined;

  const deleteMutation = useDeleteCreation({ userId, repository });
  const toggleFavoriteMutation = useToggleFavorite({ userId, repository });
  const deleteMultipleMutation = useDeleteMultipleCreations({ userId, repository });

  const {
    filtered,
    selectedIds: selectedCategoryIds,
    searchQuery,
    setSearchQuery,
    showOnlyFavorites,
    setShowOnlyFavorites,
    toggleFilter,
    clearFilters,
    isFiltered
  } = useCreationsFilter({ creations });

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Prepare data for UI using utils
  const translatedTypes = useMemo(() => getTranslatedTypes(config, t), [config, t]);
  const allCategories = useMemo(() => getFilterCategoriesFromConfig(config, t), [config, t]);

  const handleShare = useCallback(async (creation: Creation) => {
    share(creation.uri, { dialogTitle: t("common.share") });
  }, [share, t]);

  const handleDelete = useCallback(async (creation: Creation) => {
    alert.showWarning(
      t(config.translations.deleteTitle),
      t(config.translations.deleteMessage),
      {
        mode: AlertMode.MODAL,
        actions: [
          { id: 'cancel', label: t("common.cancel"), onPress: () => { } },
          {
            id: 'delete', label: t("common.delete"), style: 'destructive', onPress: async () => {
              const success = await deleteMutation.mutateAsync(creation.id);
              if (success) setSelectedCreation(null);
            }
          }
        ]
      }
    );
  }, [alert, config, deleteMutation, t]);

  const handleToggleFavorite = useCallback((creation: Creation) => {
    toggleFavoriteMutation.mutate(creation.id);
  }, [toggleFavoriteMutation]);

  const toggleSelection = useCallback((creation: Creation) => {
    setSelectedItemIds(prev => {
      const isSelected = prev.includes(creation.id);
      const next = isSelected ? prev.filter(id => id !== creation.id) : [...prev, creation.id];
      if (next.length === 0) setIsSelectionMode(false);
      else setIsSelectionMode(true);
      return next;
    });
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (selectedItemIds.length === 0) return;

    alert.showWarning(
      t(config.translations.deleteTitle),
      t("common.delete_selected_confirm") || `Are you sure you want to delete ${selectedItemIds.length} items?`,
      {
        mode: AlertMode.MODAL,
        actions: [
          { id: 'cancel', label: t("common.cancel"), onPress: () => { } },
          {
            id: 'delete', label: t("common.delete"), style: 'destructive', onPress: async () => {
              const success = await deleteMultipleMutation.mutateAsync(selectedItemIds);
              if (success) {
                setSelectedItemIds([]);
                setIsSelectionMode(false);
              }
            }
          }
        ]
      }
    );
  }, [alert, config, deleteMultipleMutation, selectedItemIds, t]);

  // Handle viewing a creation - shows detail screen
  const handleView = useCallback((creation: Creation) => {
    setSelectedCreation(creation);
    setViewerIndex(filtered.findIndex(c => c.id === creation.id));
    setViewerVisible(true);
  }, [filtered]);

  const screenTitle = headerTitle || t(config.translations.title) || 'My Creations';
  const showScreenHeader = !!onBackPress;

  return (
    <ScreenLayout
      edges={['top']}
      scrollable={false}
      header={
        <View>
          {showScreenHeader && (
            <ScreenHeader
              title={isSelectionMode ? `${selectedItemIds.length} Selected` : screenTitle}
              onBackPress={isSelectionMode ? () => { setIsSelectionMode(false); setSelectedItemIds([]); } : onBackPress}
              rightAction={isSelectionMode ? (
                <TouchableOpacity onPress={handleDeleteSelected}>
                  <AtomicIcon name="trash" color="error" size="md" />
                </TouchableOpacity>
              ) : undefined}
            />
          )}
          {!isSelectionMode && enableSearch && (
            <View style={{ paddingHorizontal: tokens.spacing.md, paddingBottom: tokens.spacing.xs }}>
              <SearchBar
                placeholder={t("common.search") || "Search Prompt..."}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          )}
        </View>
      }
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      {creations && creations.length > 0 && showGalleryHeader && (
        <GalleryHeader
          title={showScreenHeader || isSelectionMode ? '' : screenTitle}
          count={filtered.length}
          countLabel=''
          subtitle={showCount ? t(config.translations.photoCount, { count: filtered.length }) : undefined}
          isFiltered={isFiltered}
          filterLabel={t(config.translations.filterLabel) || 'Filter'}
          onFilterPress={() => filterSheetRef.current?.present()}
          onFavoritesPress={() => setShowOnlyFavorites(!showOnlyFavorites)}
          showOnlyFavorites={showOnlyFavorites}
          isFilterEnabled={enableFilter}
          showCount={showCount}
        />
      )}

      {/* Main Content Grid - handles empty/loading via ListEmptyComponent */}
      <CreationsGrid
        creations={filtered}
        types={translatedTypes}
        isLoading={isLoading}
        onRefresh={refetch}
        onView={handleView}
        onShare={handleShare}
        onDelete={handleDelete}
        onToggleFavorite={handleToggleFavorite}
        isSelectionMode={isSelectionMode}
        selectedIds={selectedItemIds}
        onSelect={toggleSelection}
        contentContainerStyle={{ paddingBottom: tokens.spacing.xl }}
        ListEmptyComponent={
          <CreationsGalleryEmptyState
            isLoading={isLoading}
            hasCreations={!!creations && creations.length > 0}
            config={config}
            t={t}
            emptyActionLabel={emptyActionLabel}
            onEmptyAction={onEmptyAction}
            clearFilters={clearFilters}
          />
        }
      />

      <CreationImageViewer
        creations={filtered}
        visible={viewerVisible}
        index={viewerIndex}
        onDismiss={() => setViewerVisible(false)}
        onIndexChange={setViewerIndex}
        enableEditing={enableEditing}
        onImageEdit={onImageEdit}
        selectedCreationId={(selectedCreation as Creation | null)?.id}
      />

      <FilterBottomSheet
        ref={filterSheetRef}
        categories={allCategories}
        selectedIds={selectedCategoryIds}
        onFilterPress={(id, catId) => toggleFilter(id, allCategories.find(c => c.id === catId)?.multiSelect)}
        onClearFilters={clearFilters}
        title={t(config.translations.filterTitle) || t("common.filter")}
      />
    </ScreenLayout>
  );
}
