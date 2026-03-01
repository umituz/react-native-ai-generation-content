/**
 * ResultActions Styles
 */

import { StyleSheet } from "react-native";
import type { DesignTokens } from "@umituz/react-native-design-system/theme";
import type { ResultActionsConfig } from "../../types/result-config.types";

interface CreateResultActionsStylesParams {
  tokens: DesignTokens;
  config: ResultActionsConfig;
}

export function createResultActionsStyles({
  tokens,
  config,
}: CreateResultActionsStylesParams) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: config.spacing?.paddingHorizontal ?? 20,
      paddingBottom: config.spacing?.paddingBottom ?? 20,
    },
    retryButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 12,
      marginBottom: config.retry?.position === "top" ? 16 : 0,
      marginTop: config.retry?.position === "bottom" ? 16 : 0,
    },
    retryText: {
      fontSize: 14,
      fontWeight: "600",
      color: tokens.colors.primary,
    },
    buttons: {
      flexDirection:
        config.layout === "vertical" ? "column" : "row",
      gap: config.buttonSpacing ?? 10,
    },
    button: {
      flex: config.layout === "horizontal" ? 1 : undefined,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 14,
      borderRadius: 14,
    },
  });
}

export type ResultActionsStyles = ReturnType<typeof createResultActionsStyles>;
