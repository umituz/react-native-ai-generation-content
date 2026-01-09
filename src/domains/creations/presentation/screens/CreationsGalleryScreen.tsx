import React, { useState, useMemo, useCallback } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  useAlert,
  AlertType,
  AlertMode,
  useSharing,
  FilterSheet,
  ScreenLayout,
  useAppFocusEffect,
} from "@umituz/react-native-design-system";
import { useCreations } from "../hooks/useCreations";
import { useDeleteCreation } from "../hooks/useDeleteCreation";
import { useGalleryFilters } from "../hooks/useGalleryFilters";
import { GalleryHeader, CreationCard, GalleryEmptyStates } from "../components";
import { ResultPreviewScreen } from "../../../result-preview/presentation/components/ResultPreviewScreen";
import { useResultActions } from "../../../result-preview/presentation/hooks/useResultActions";
import { MEDIA_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "../../domain/types/creation-filter";
import { getPreviewUrl } from "../../domain/utils";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationsConfig } from "../../domain/value-objects/CreationsConfig";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";

interface CreationsGalleryScreenProps {
  readonly userId: string | null;
  readonly repository: ICreationsRepository;
  readonly config: CreationsConfig;
  readonly t: (key: string) => string;
  readonly onEmptyAction?: () => void;
  readonly emptyActionLabel?: string;
  readonly showFilter?: boolean;
}

export function CreationsGalleryScreen({
  userId,
  repository,
  config,
  t,
  onEmptyAction,
  emptyActionLabel,
  showFilter = config.showFilter ?? true,
}: CreationsGalleryScreenProps) {
  const tokens = useAppDesignTokens();
  const { share } = useSharing();
  const alert = useAlert();
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);

  const { data: creations, isLoading, refetch } = useCreations({ userId, repository });
  const deleteMutation = useDeleteCreation({ userId, repository });

  const selectedImageUrl = selectedCreation ? (getPreviewUrl(selectedCreation.output) || selectedCreation.uri) : undefined;

  const { isSharing, isSaving, handleDownload, handleShare } = useResultActions({
    imageUrl: selectedImageUrl,
    onSaveSuccess: () => alert.show(AlertType.SUCCESS, AlertMode.TOAST, t("result.saveSuccess"), t("result.saveSuccessMessage")),
    onSaveError: () => alert.show(AlertType.ERROR, AlertMode.TOAST, t("common.error"), t("result.saveError")),
  });

  const statusOptions = config.filterConfig?.statusOptions ?? STATUS_FILTER_OPTIONS;
  const mediaOptions = config.filterConfig?.mediaOptions ?? MEDIA_FILTER_OPTIONS;
  const showStatusFilter = config.filterConfig?.showStatusFilter ?? true;
  const showMediaFilter = config.filterConfig?.showMediaFilter ?? true;

  const filters = useGalleryFilters({ creations, statusOptions, mediaOptions, t });

  useAppFocusEffect(useCallback(() => { void refetch(); }, [refetch]));

  const handleShareCard = useCallback((c: Creation) => {
    void share(c.uri, { dialogTitle: t("common.share") });
  }, [share, t]);

  const handleDelete = useCallback((c: Creation) => {
    alert.show(AlertType.WARNING, AlertMode.MODAL, t(config.translations.deleteTitle), t(config.translations.deleteMessage), {
      actions: [
        { id: "cancel", label: t("common.cancel"), onPress: () => {} },
        { id: "delete", label: t("common.delete"), style: "destructive", onPress: async () => {
          await deleteMutation.mutateAsync(c.id);
        }}
      ]
    });
  }, [alert, config, deleteMutation, t]);

  const handleFavorite = useCallback((c: Creation, isFavorite: boolean) => {
    void (async () => {
      if (!userId) return;
      const success = await repository.updateFavorite(userId, c.id, isFavorite);
      if (success) void refetch();
    })();
  }, [userId, repository, refetch]);

  const handleCardPress = useCallback((item: Creation) => {
    setSelectedCreation(item);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedCreation(null);
  }, []);

  const handleTryAgain = useCallback(() => {
    setSelectedCreation(null);
  }, []);

  const handleRate = useCallback(() => {
    if (!userId || !selectedCreation) return;
    void (async () => {
      const success = await repository.rate(userId, selectedCreation.id, 5);
      if (success) {
        setSelectedCreation({ ...selectedCreation, rating: 5, ratedAt: new Date() });
        alert.show(AlertType.SUCCESS, AlertMode.TOAST, t("rating.thankYouTitle"), t("rating.thankYouMessage"));
        void refetch();
      }
    })();
  }, [userId, selectedCreation, repository, alert, t, refetch]);

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

  const renderItem = useCallback(({ item }: { item: Creation }) => (
    <CreationCard
      creation={item}
      callbacks={{
        onPress: () => handleCardPress(item),
        onShare: async () => handleShareCard(item),
        onDelete: () => handleDelete(item),
        onFavorite: () => handleFavorite(item, !item.isFavorite),
      }}
    />
  ), [handleShareCard, handleDelete, handleFavorite, handleCardPress]);

  const renderHeader = useMemo(() => {
    if ((!creations || creations.length === 0) && !isLoading) return null;
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
  }, [creations, isLoading, filters.filtered.length, showFilter, filterButtons, t, config, tokens]);

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

  // Show result preview when a creation is selected
  if (selectedCreation && selectedImageUrl) {
    const hasRating = selectedCreation.rating !== undefined && selectedCreation.rating !== null;
    return (
      <ResultPreviewScreen
        imageUrl={selectedImageUrl}
        isSaving={isSaving}
        isSharing={isSharing}
        onDownload={handleDownload}
        onShare={handleShare}
        onTryAgain={handleTryAgain}
        onNavigateBack={handleBack}
        onRate={handleRate}
        hideLabel
        iconOnly
        showTryAgain={false}
        showRating={!hasRating}
        translations={{
          title: t(config.translations.title),
          yourResult: "",
          saveButton: t("result.saveButton"),
          saving: t("result.saving"),
          shareButton: t("result.shareButton"),
          sharing: t("result.sharing"),
          tryAnother: "",
        }}
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
        contentContainerStyle={[styles.listContent, (!filters.filtered || filters.filtered.length === 0) && styles.emptyContent]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => void refetch()} tintColor={tokens.colors.primary} />}
      />
      <FilterSheet visible={filters.statusFilterVisible} onClose={filters.closeStatusFilter} options={filters.statusFilter.filterOptions} selectedIds={[filters.statusFilter.selectedId]} onFilterPress={filters.statusFilter.selectFilter} onClearFilters={filters.statusFilter.clearFilter} title={t(config.translations.statusFilterTitle ?? "creations.filter.status")} clearLabel={t(config.translations.clearFilter ?? "common.clear")} />
      <FilterSheet visible={filters.mediaFilterVisible} onClose={filters.closeMediaFilter} options={filters.mediaFilter.filterOptions} selectedIds={[filters.mediaFilter.selectedId]} onFilterPress={filters.mediaFilter.selectFilter} onClearFilters={filters.mediaFilter.clearFilter} title={t(config.translations.mediaFilterTitle ?? "creations.filter.media")} clearLabel={t(config.translations.clearFilter ?? "common.clear")} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: { borderBottomWidth: 1 },
  listContent: { paddingHorizontal: 16, paddingTop: 16 },
  emptyContent: { flexGrow: 1 },
});
