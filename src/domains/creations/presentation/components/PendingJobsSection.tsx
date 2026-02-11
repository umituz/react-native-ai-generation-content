/**
 * PendingJobsSection Component
 * Displays pending/processing AI generation jobs in CreationsGallery
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, useAppDesignTokens } from "@umituz/react-native-design-system";
import type { BackgroundJob } from "../../../background/domain/entities/job.types";
import { PendingJobCard } from "../../../../presentation/components/PendingJobCard";

export interface PendingJobsSectionProps {
  readonly jobs: BackgroundJob[];
  readonly onCancel?: (id: string) => void;
  readonly onRetry?: (id: string) => void;
  readonly title?: string;
  readonly statusLabels?: {
    readonly queued?: string;
    readonly processing?: string;
    readonly uploading?: string;
    readonly completed?: string;
    readonly failed?: string;
  };
  readonly getTypeLabel?: (type: string) => string;
}

export function PendingJobsSection({
  jobs,
  onCancel,
  onRetry,
  title,
  statusLabels,
  getTypeLabel,
}: PendingJobsSectionProps): React.ReactElement | null {
  const tokens = useAppDesignTokens();

  // Only show processing/queued jobs
  const activeJobs = jobs.filter(
    (job) => job.status === "processing" || job.status === "queued" || job.status === "failed",
  );

  if (activeJobs.length === 0) {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    title: {
      fontSize: 14,
      fontWeight: "600",
      color: tokens.colors.textSecondary,
      marginBottom: 12,
    },
    jobsContainer: {
      gap: 12,
    },
  });

  return (
    <View style={styles.container}>
      {title && <AtomicText style={styles.title}>{title}</AtomicText>}
      <View style={styles.jobsContainer}>
        {activeJobs.map((job) => (
          <PendingJobCard
            key={job.id}
            job={job}
            onCancel={onCancel}
            onRetry={onRetry}
            typeLabel={getTypeLabel ? getTypeLabel(job.type) : job.type}
            statusLabels={statusLabels}
          />
        ))}
      </View>
    </View>
  );
}
