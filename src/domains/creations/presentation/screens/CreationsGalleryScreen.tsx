import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import {
  useAppDesignTokens,
  FilterSheet,
  ScreenLayout,
  useAppFocusEffect,
} from "@umituz/react-native-design-system";
import { useCreations } from "../hooks/useCreations";
import { useDeleteCreation } from "../hooks/useDeleteCreation";
import { useProcessingJobsPoller } from "../hooks/useProcessingJobsPoller";
import { useGalleryFilters } from "../hooks/useGalleryFilters";
import { useGalleryCallbacks } from "../hooks/useGalleryCallbacks";
import { GalleryHeader, CreationCard, GalleryEmptyStates } from "../components";
import { GalleryResultPreview } from "../components/GalleryResultPreview";
import { MEDIA_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "../../domain/types/creation-filter";
import { getPreviewUrl } from "../../domain/utils";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationsGalleryScreenProps } from "./creations-gallery.types";
import { creationsGalleryStyles as styles } from "./creations-gallery.styles";

export type { CreationsGalleryScreenProps } from "./creations-gallery.types";

export function CreationsGalleryScreen({
  userId,
  repository,
  config,
  t,
  initialCreationId,
  onEmptyAction,
  emptyActionLabel,
  showFilter = config.showFilter ?? true,
}: CreationsGalleryScreenProps) {
  const tokens = useAppDesignTokens();
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);
  const [showRatingPicker, setShowRatingPicker] = useState(false);
  const hasAutoSelectedRef = useRef(false);

  const { data: creations, isLoading, refetch } = useCreations({ userId, repository });
  const deleteMutation = useDeleteCreation({ userId, repository });

  // Poll FAL queue for "processing" creations (enables true background generation)
  useProcessingJobsPoller({
    userId,
    creations: creations ?? [],
    repository,
    enabled: !!userId && (creations?.length ?? 0) > 0,
  });

  useEffect(() => {
    if (initialCreationId && creations && creations.length > 0 && !hasAutoSelectedRef.current) {
      const creation = creations.find((c) => c.id === initialCreationId);
      if (creation) {
        hasAutoSelectedRef.current = true;
        setSelectedCreation(creation);
      }
    }
  }, [initialCreationId, creations]);

  const callbacks = useGalleryCallbacks({
    userId,
    repository,
    config,
    t,
    deleteMutation,
    refetch: async () => { await refetch(); },
    setSelectedCreation,
    setShowRatingPicker,
    selectedCreation,
  });

  const statusOptions = config.filterConfig?.statusOptions ?? STATUS_FILTER_OPTIONS;
  const mediaOptions = config.filterConfig?.mediaOptions ?? MEDIA_FILTER_OPTIONS;
  const showStatusFilter = config.filterConfig?.showStatusFilter ?? true;
  const showMediaFilter = config.filterConfig?.showMediaFilter ?? true;

  const filters = useGalleryFilters({ creations, statusOptions, mediaOptions, t });

  useAppFocusEffect(useCallback(() => { void refetch(); }, [refetch]));

  const filterButtons = useMemo(() => {
    const buttons = [];
    if (showStatusFilter) {
      buttons.push({
        id: "status",
        label: t(config.translations.statusFilterTitle ?? "creations.filter.status"),
        icon: "list-outline",
        isActive: filters.statusFilter.hasActiveFilter,
        onPress: filters.openStatusFilter,
      });
    }
    if (showMediaFilter) {
      buttons.push({
        id: "media",
        label: t(config.translations.mediaFilterTitle ?? "creations.filter.media"),
        icon: "grid-outline",
        isActive: filters.mediaFilter.hasActiveFilter,
        onPress: filters.openMediaFilter,
      });
    }
    return buttons;
  }, [showStatusFilter, showMediaFilter, filters, t, config.translations]);

  const getScenarioTitle = useCallback((type: string): string => {
    const typeConfig = config.types?.find((tc) => tc.id === type);
    return typeConfig?.labelKey ? t(typeConfig.labelKey) : type.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }, [config.types, t]);

  const renderItem = useCallback(({ item }: { item: Creation }) => (
    <CreationCard
      creation={item}
      titleText={getScenarioTitle(item.type)}
      callbacks={{
        onPress: () => callbacks.handleCardPress(item),
        onShare: async () => callbacks.handleShareCard(item),
        onDelete: () => callbacks.handleDelete(item),
        onFavorite: () => callbacks.handleFavorite(item, !item.isFavorite),
      }}
    />
  ), [callbacks, getScenarioTitle]);

  const renderHeader = useMemo(() => {
    if (!creations?.length && !isLoading) return null;
    return (
      <View style={[styles.header, { backgroundColor: tokens.colors.surface, borderBottomColor: tokens.colors.border }]}>
        <GalleryHeader
          title={t(config.translations.title)}
          count={filters.filtered.length}
          countLabel={t(config.translations.photoCount)}
          showFilter={showFilter}
          filterButtons={filterButtons}
        />
      </View>
    );
  }, [creations, isLoading, filters.filtered.length, filters.processingCount, showFilter, filterButtons, t, config, tokens]);

  const renderEmpty = useMemo(() => (
    <GalleryEmptyStates
      isLoading={isLoading}
      creations={creations}
      isFiltered={filters.isFiltered}
      tokens={tokens}
      t={t}
      emptyTitle={t(config.translations.empty)}
      emptyDescription={t(config.translations.emptyDescription)}
      emptyActionLabel={emptyActionLabel}
      onEmptyAction={onEmptyAction}
      onClearFilters={filters.clearAllFilters}
    />
  ), [isLoading, creations, filters.isFiltered, tokens, t, config, emptyActionLabel, onEmptyAction, filters.clearAllFilters]);

  const selectedImageUrl = selectedCreation ? (getPreviewUrl(selectedCreation.output) || selectedCreation.uri) : undefined;
  const selectedVideoUrl = selectedCreation?.output?.videoUrl;
  const hasMediaToShow = selectedImageUrl || selectedVideoUrl;

  if (selectedCreation && hasMediaToShow) {
    return (
      <GalleryResultPreview
        selectedCreation={selectedCreation}
        imageUrl={selectedVideoUrl ? undefined : selectedImageUrl}
        videoUrl={selectedVideoUrl}
        showRatingPicker={showRatingPicker}
        config={config}
        t={t}
        onBack={callbacks.handleBack}
        onTryAgain={callbacks.handleTryAgain}
        onRate={callbacks.handleOpenRatingPicker}
        onSubmitRating={callbacks.handleSubmitRating}
        onCloseRating={() => setShowRatingPicker(false)}
      />
    );
  }

  return (
    <ScreenLayout scrollable={false}>
      <FlatList
        data={filters.filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[styles.listContent, (!filters.filtered?.length) && styles.emptyContent]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => void refetch()} tintColor={tokens.colors.primary} />}
      />
      <FilterSheet visible={filters.statusFilterVisible} onClose={filters.closeStatusFilter} options={filters.statusFilter.filterOptions} selectedIds={[filters.statusFilter.selectedId]} onFilterPress={filters.statusFilter.selectFilter} onClearFilters={filters.statusFilter.clearFilter} title={t(config.translations.statusFilterTitle ?? "creations.filter.status")} clearLabel={t(config.translations.clearFilter ?? "common.clear")} />
      <FilterSheet visible={filters.mediaFilterVisible} onClose={filters.closeMediaFilter} options={filters.mediaFilter.filterOptions} selectedIds={[filters.mediaFilter.selectedId]} onFilterPress={filters.mediaFilter.selectFilter} onClearFilters={filters.mediaFilter.clearFilter} title={t(config.translations.mediaFilterTitle ?? "creations.filter.media")} clearLabel={t(config.translations.clearFilter ?? "common.clear")} />
    </ScreenLayout>
  );
}
