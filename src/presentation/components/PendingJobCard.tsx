/**
 * PendingJobCard Component
 * Displays a pending background job with progress
 */

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AtomicText, useAppDesignTokens } from "@umituz/react-native-design-system";
import type { BackgroundJob } from "../../domain/entities/job.types";
import { PendingJobProgressBar } from "./PendingJobProgressBar";
import { PendingJobCardActions } from "./PendingJobCardActions";

export interface StatusLabels {
  readonly queued?: string;
  readonly processing?: string;
  readonly uploading?: string;
  readonly completed?: string;
  readonly failed?: string;
}

export interface PendingJobCardProps<TInput = unknown, TResult = unknown> {
  readonly job: BackgroundJob<TInput, TResult>;
  readonly onCancel?: (id: string) => void;
  readonly onRetry?: (id: string) => void;
  readonly typeLabel?: string;
  readonly statusLabels?: StatusLabels;
  readonly renderThumbnail?: (
    job: BackgroundJob<TInput, TResult>,
  ) => React.ReactNode;
  readonly renderActions?: (
    job: BackgroundJob<TInput, TResult>,
  ) => React.ReactNode;
}

const DEFAULT_STATUS_LABELS: StatusLabels = {
  queued: "Waiting in queue...",
  processing: "Processing...",
  uploading: "Uploading...",
  completed: "Completed",
  failed: "Failed",
};

export function PendingJobCard<TInput = unknown, TResult = unknown>({
  job,
  onCancel,
  onRetry,
  typeLabel,
  statusLabels = DEFAULT_STATUS_LABELS,
  renderThumbnail,
  renderActions,
}: PendingJobCardProps<TInput, TResult>): React.ReactElement {
  const tokens = useAppDesignTokens();
  const isFailed = job.status === "failed";

  const statusText =
    job.status === "failed"
      ? job.error || statusLabels.failed
      : statusLabels[job.status] || statusLabels.processing;

  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      backgroundColor: tokens.colors.surface,
      borderRadius: 16,
      overflow: "hidden",
      opacity: isFailed ? 0.7 : 1,
    },
    thumbnailWrapper: {
      width: 80,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: tokens.colors.backgroundSecondary,
    },
    content: {
      flex: 1,
      padding: 12,
      justifyContent: "space-between",
    },
    typeText: {
      fontSize: 14,
      fontWeight: "600",
      color: tokens.colors.textPrimary,
    },
    statusText: {
      fontSize: 12,
      color: isFailed ? tokens.colors.error : tokens.colors.textSecondary,
      marginTop: 4,
    },
    loader: { position: "absolute" },
  });

  return (
    <View style={styles.card}>
      {renderThumbnail && (
        <View style={styles.thumbnailWrapper}>
          {renderThumbnail(job)}
          {!isFailed && (
            <ActivityIndicator
              color={tokens.colors.primary}
              size="small"
              style={styles.loader}
            />
          )}
        </View>
      )}
      <View style={styles.content}>
        <View>
          {typeLabel && <AtomicText style={styles.typeText}>{typeLabel}</AtomicText>}
          <AtomicText style={styles.statusText}>
            {statusText}
          </AtomicText>
          {!isFailed && <PendingJobProgressBar progress={job.progress} />}
        </View>
        {renderActions ? (
          renderActions(job)
        ) : (
          <PendingJobCardActions
            id={job.id}
            isFailed={isFailed}
            onCancel={onCancel}
            onRetry={onRetry}
          />
        )}
      </View>
    </View>
  );
}
