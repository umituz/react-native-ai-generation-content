import React, { useMemo, useCallback, useState } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useAppDesignTokens,
  useAlert,
  AlertType,
  AlertMode,
  useSharing,
  FilterSheet,
} from "@umituz/react-native-design-system";
import { useFocusEffect } from "@react-navigation/native";
import { useCreations } from "../hooks/useCreations";
import { useDeleteCreation } from "../hooks/useDeleteCreation";
import { useGalleryFilters } from "../hooks/useGalleryFilters";
import { GalleryHeader, CreationCard, CreationImageViewer, GalleryEmptyStates } from "../components";
import { MEDIA_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "../../domain/types/creation-filter";
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
  readonly showFilter?: boolean;
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
  showFilter = config.showFilter ?? true,
}: CreationsGalleryScreenProps) {
  const insets = useSafeAreaInsets();
  const tokens = useAppDesignTokens();
  const { share } = useSharing();
  const alert = useAlert();

  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);

  const { data: creations, isLoading, refetch } = useCreations({ userId, repository });
  const deleteMutation = useDeleteCreation({ userId, repository });

  const statusOptions = config.filterConfig?.statusOptions ?? STATUS_FILTER_OPTIONS;
  const mediaOptions = config.filterConfig?.mediaOptions ?? MEDIA_FILTER_OPTIONS;
  const showStatusFilter = config.filterConfig?.showStatusFilter ?? true;
  const showMediaFilter = config.filterConfig?.showMediaFilter ?? true;

  const filters = useGalleryFilters({ creations, statusOptions, mediaOptions, t });

  useFocusEffect(useCallback(() => { void refetch(); }, [refetch]));

  const handleShare = useCallback((c: Creation) => {
    void share(c.uri, { dialogTitle: t("common.share") });
  }, [share, t]);

  const handleDelete = useCallback((c: Creation) => {
    alert.show(AlertType.WARNING, AlertMode.MODAL, t(config.translations.deleteTitle), t(config.translations.deleteMessage), {
      actions: [
        { id: "cancel", label: t("common.cancel"), onPress: () => {} },
        { id: "delete", label: t("common.delete"), style: "destructive", onPress: async () => {
          const success = await deleteMutation.mutateAsync(c.id);
          if (success) setSelectedCreation(null);
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
        onPress: () => setSelectedCreation(item),
        onShare: async () => handleShare(item),
        onDelete: () => handleDelete(item),
        onFavorite: () => handleFavorite(item, !item.isFavorite),
      }}
    />
  ), [handleShare, handleDelete, handleFavorite]);

  const renderHeader = useMemo(() => {
    if ((!creations || creations.length === 0) && !isLoading) return null;
    return (
      <View style={[styles.header, { paddingTop: insets.top + tokens.spacing.md, backgroundColor: tokens.colors.surface, borderBottomColor: tokens.colors.border }]}>
        <GalleryHeader
          title={t(config.translations.title)}
          count={filters.filtered.length}
          countLabel={t(config.translations.photoCount)}
          showFilter={showFilter}
          filterButtons={filterButtons}
        />
      </View>
    );
  }, [creations, isLoading, filters.filtered.length, showFilter, filterButtons, t, config, insets.top, tokens]);

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

  if (selectedCreation) {
    return <CreationDetailScreen creation={selectedCreation} config={config} onClose={() => setSelectedCreation(null)} onShare={handleShare} onDelete={handleDelete} t={t} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.background }]}>
      <FlatList
        data={filters.filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }, (!filters.filtered || filters.filtered.length === 0) && styles.emptyContent]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => void refetch()} tintColor={tokens.colors.primary} />}
      />
      <CreationImageViewer creations={filters.filtered} visible={viewerVisible} index={viewerIndex} onDismiss={() => setViewerVisible(false)} onIndexChange={setViewerIndex} enableEditing={enableEditing} onImageEdit={onImageEdit} />
      <FilterSheet visible={filters.statusFilterVisible} onClose={filters.closeStatusFilter} options={filters.statusFilter.filterOptions} selectedIds={[filters.statusFilter.selectedId]} onFilterPress={filters.statusFilter.selectFilter} onClearFilters={filters.statusFilter.clearFilter} title={t(config.translations.statusFilterTitle ?? "creations.filter.status")} clearLabel={t(config.translations.clearFilter ?? "common.clear")} />
      <FilterSheet visible={filters.mediaFilterVisible} onClose={filters.closeMediaFilter} options={filters.mediaFilter.filterOptions} selectedIds={[filters.mediaFilter.selectedId]} onFilterPress={filters.mediaFilter.selectFilter} onClearFilters={filters.mediaFilter.clearFilter} title={t(config.translations.mediaFilterTitle ?? "creations.filter.media")} clearLabel={t(config.translations.clearFilter ?? "common.clear")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  listContent: { paddingHorizontal: 16, paddingTop: 16 },
  emptyContent: { flexGrow: 1 },
});
