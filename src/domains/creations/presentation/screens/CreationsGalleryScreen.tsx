import React, { useMemo, useCallback, useState } from "react";
import { View, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenLayout } from "@umituz/react-native-design-system/layouts";
import { FilterSheet, useAppFocusEffect } from "@umituz/react-native-design-system/molecules";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useCreations } from "../hooks/useCreations";
import { useDeleteCreation } from "../hooks/useDeleteCreation";
import { useProcessingJobsPoller } from "../hooks/useProcessingJobsPoller";
import { useGalleryFilters } from "../hooks/useGalleryFilters";
import { useGalleryCallbacks } from "../hooks/useGalleryCallbacks";
import { useGalleryState } from "../hooks/useGalleryState";
import { GalleryHeader, CreationCard, CreationCardCompact, GalleryEmptyStates } from "../components";
import { GalleryResultPreview } from "../components/GalleryResultPreview";
import { GalleryScreenHeader } from "../components/GalleryScreenHeader";
import { MEDIA_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "../../domain/types/creation-filter";
import { createFilterButtons, createItemTitle } from "../utils/filter-buttons.util";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationsGalleryScreenProps } from "./creations-gallery.types";
import { creationsGalleryStyles as styles } from "./creations-gallery.styles";


export function CreationsGalleryScreen({
  userId,
  repository,
  config,
  t,
  initialCreationId,
  onEmptyAction,
  emptyActionLabel,
  showFilter = config.showFilter ?? true,
  onBack,
  onTryAgain,
  getCreationTitle,
  onCreationPress,
  onEdit,
  onEditVideo,
  onShareToFeed,
}: CreationsGalleryScreenProps) {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const { data: creations, isLoading, refetch } = useCreations({ userId, repository });
  const deleteMutation = useDeleteCreation({ userId, repository });

  useProcessingJobsPoller({
    userId,
    creations: creations ?? [],
    repository,
    enabled: !!userId && (creations?.length ?? 0) > 0,
  });

  // Gallery state management
  const galleryState = useGalleryState({ initialCreationId, creations });

  const callbacks = useGalleryCallbacks({
    userId,
    repository,
    config,
    t,
    deleteMutation,
    refetch: async () => { await refetch(); },
    setSelectedCreation: galleryState.setSelectedCreation,
    setShowRatingPicker: galleryState.setShowRatingPicker,
    selectedCreation: galleryState.selectedCreation,
    onTryAgain,
  });

  const statusOptions = config.filterConfig?.statusOptions ?? STATUS_FILTER_OPTIONS;
  const mediaOptions = config.filterConfig?.mediaOptions ?? MEDIA_FILTER_OPTIONS;
  const showStatusFilter = config.filterConfig?.showStatusFilter ?? true;
  const showMediaFilter = config.filterConfig?.showMediaFilter ?? true;

  const filters = useGalleryFilters({ creations, statusOptions, mediaOptions, t });

  useAppFocusEffect(useCallback(() => { 
    void refetch();
    // Reset selection on focus if no initial ID is being enforced
    if (!initialCreationId) {
    const { setSelectedCreation } = galleryState;
    setSelectedCreation(null);
    }
  }, [refetch, initialCreationId, galleryState.setSelectedCreation]));

  const filterButtons = useMemo(() =>
    createFilterButtons({
      showStatusFilter,
      showMediaFilter,
      statusFilterActive: filters.statusFilter.hasActiveFilter,
      mediaFilterActive: filters.mediaFilter.hasActiveFilter,
      statusFilterLabel: t(config.translations.statusFilterTitle ?? "creations.filter.status"),
      mediaFilterLabel: t(config.translations.mediaFilterTitle ?? "creations.filter.media"),
      onStatusFilterPress: filters.openStatusFilter,
      onMediaFilterPress: filters.openMediaFilter,
    }),
    [showStatusFilter, showMediaFilter, filters, t, config.translations]
  );

  const getItemTitle = useCallback((item: Creation): string =>
    createItemTitle(item, { types: config.types, getCreationTitle }, t),
    [config.types, t, getCreationTitle]
  );

  const getItemCallbacks = useCallback((item: Creation) => ({
    onPress: () => {
      // Always call custom handler if provided
      if (onCreationPress) {
        onCreationPress(item);
      }
      // Always show preview when card is pressed
      galleryState.setSelectedCreation(item);
    },
    onShare: async () => callbacks.handleShareCard(item),
    onDelete: () => callbacks.handleDelete(item),
    onFavorite: () => callbacks.handleFavorite(item),
    onPostToFeed: onShareToFeed ? () => onShareToFeed(item) : undefined,
  }), [callbacks, onCreationPress, onShareToFeed, galleryState]);

  const [pageLimit, setPageLimit] = useState(6);

  const paginatedCreations = useMemo(() => {
    return filters.filtered.slice(0, pageLimit);
  }, [filters.filtered, pageLimit]);

  const handleLoadMore = useCallback(() => {
    if (pageLimit < filters.filtered.length) {
      if (__DEV__) console.log("[CreationsGallery] Loading more...", { current: pageLimit, total: filters.filtered.length });
      setPageLimit(prev => prev + 3);
    }
  }, [pageLimit, filters.filtered.length]);

  const renderItem = useCallback(({ item }: { item: Creation }) => {
    if (viewMode === "grid") {
      return (
        <View style={styles.gridItemWrapper}>
          <CreationCardCompact
            creation={item}
            callbacks={{ onPress: getItemCallbacks(item).onPress }}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.listItemWrapper}>
        <CreationCard
          creation={item}
          titleText={getItemTitle(item)}
          callbacks={getItemCallbacks(item)}
          canPostToFeed={!!onShareToFeed && item.status === "completed"}
        />
      </View>
    );
  }, [viewMode, getItemTitle, getItemCallbacks, onShareToFeed]);

  const hasScreenHeader = Boolean(onBack);

  const renderHeader = useMemo(() => {
    if (!creations?.length && !isLoading) return null;
    if (isLoading) return null;
    return (
      <View style={[
        styles.header, 
        { 
          backgroundColor: tokens.colors.surface, 
          borderBottomColor: tokens.colors.border,
          paddingTop: hasScreenHeader ? 0 : insets.top
        }
      ]}>
        <GalleryHeader
          title={hasScreenHeader ? "" : t(config.translations.title)}
          count={filters.filtered.length}
          countLabel={`${filters.filtered.length} ${t(config.translations.photoCount)}`}
          showFilter={showFilter}
          filterButtons={filterButtons}
          viewMode={viewMode}
          onViewModeChange={(mode) => {
            setPageLimit(6); // Reset pagination on mode change
            setViewMode(mode);
          }}
        />
      </View>
    );
  }, [creations, isLoading, filters.filtered.length, showFilter, filterButtons, t, config, tokens, hasScreenHeader, viewMode]);

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

  const screenHeader = useMemo(() => {
    if (!onBack) return undefined;
    return <GalleryScreenHeader title={t(config.translations.title)} onBack={onBack} />;
  }, [onBack, t, config.translations.title]);

  if (galleryState.showPreview && galleryState.selectedCreation) {
    return (
      <GalleryResultPreview
        selectedCreation={galleryState.selectedCreation}
        imageUrl={galleryState.selectedVideoUrl ? undefined : galleryState.selectedImageUrl}
        videoUrl={galleryState.selectedVideoUrl}
        showRatingPicker={galleryState.showRatingPicker}
        config={config}
        t={t}
        onBack={callbacks.handleBack}
        onTryAgain={callbacks.handleTryAgain}
        onRate={callbacks.handleOpenRatingPicker}
        onSubmitRating={callbacks.handleSubmitRating}
        onCloseRating={() => galleryState.setShowRatingPicker(false)}
        onEdit={onEdit}
        onEditVideo={onEditVideo}
        onShareToFeed={onShareToFeed}
      />
    );
  }

  return (
    <ScreenLayout header={screenHeader} scrollable={false} edges={["left", "right", "bottom"]}>
      {renderHeader}
      {filters.filtered.length === 0 ? (
        <View style={[styles.listContent, styles.emptyContent]}>
          {renderEmpty}
        </View>
      ) : (
        <FlatList
          key={viewMode}
          data={paginatedCreations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === "grid" ? 2 : 1}
          contentContainerStyle={viewMode === "grid" ? styles.gridContent : styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
        />
      )}
      <FilterSheet visible={filters.statusFilterVisible} onClose={filters.closeStatusFilter} options={filters.statusFilter.filterOptions} selectedIds={[filters.statusFilter.selectedId]} onFilterPress={filters.statusFilter.selectFilter} onClearFilters={filters.statusFilter.clearFilter} title={t(config.translations.statusFilterTitle ?? "creations.filter.status")} clearLabel={t(config.translations.clearFilter ?? "common.clear")} />
      <FilterSheet visible={filters.mediaFilterVisible} onClose={filters.closeMediaFilter} options={filters.mediaFilter.filterOptions} selectedIds={[filters.mediaFilter.selectedId]} onFilterPress={filters.mediaFilter.selectFilter} onClearFilters={filters.mediaFilter.clearFilter} title={t(config.translations.mediaFilterTitle ?? "creations.filter.media")} clearLabel={t(config.translations.clearFilter ?? "common.clear")} />
    </ScreenLayout>
  );
}
