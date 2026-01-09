/**
 * ScenarioSelectorScreen
 * Config-driven scenario selection screen
 */

import React from "react";
import { StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  ScreenLayout,
  type DesignTokens,
} from "@umituz/react-native-design-system";
import { ScenarioHeader } from "../components/ScenarioHeader";
import { ScenarioGrid } from "../components/ScenarioGrid";
import type { ScenarioData, ScenarioCategory, ScenarioSelectorConfig } from "../../domain/types";

export interface ScenarioSelectorScreenProps {
  readonly config: ScenarioSelectorConfig;
  readonly scenarios: readonly ScenarioData[];
  readonly categories: readonly ScenarioCategory[];
  readonly selectedScenarioId: string | null;
  readonly onSelect: (id: string) => void;
  readonly t: (key: string) => string;
}

export const ScenarioSelectorScreen: React.FC<ScenarioSelectorScreenProps> = ({
  config,
  scenarios,
  categories,
  selectedScenarioId,
  onSelect,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const styles = React.useMemo(() => createStyles(tokens), [tokens]);

  return (
    <ScreenLayout
      scrollable={false}
      edges={["top", "left", "right"]}
      contentContainerStyle={styles.container}
      backgroundColor={tokens.colors.backgroundPrimary}
    >
      <ScenarioHeader
        title={t(config.titleKey)}
        subtitle={t(config.subtitleKey)}
      />
      <ScenarioGrid
        scenarios={scenarios}
        categories={categories}
        selectedScenarioId={selectedScenarioId}
        onSelect={onSelect}
        t={t}
        categoryAllLabel={t("category.all")}
      />
    </ScreenLayout>
  );
};

const createStyles = (_tokens: DesignTokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
