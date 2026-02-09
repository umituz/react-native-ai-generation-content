/**
 * Shared Layout Styles
 * Common StyleSheet definitions for feature layout components
 */

import { StyleSheet } from "react-native";

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
  },
  description: {
    textAlign: "center",
    marginHorizontal: 24,
    marginBottom: 24,
    lineHeight: 24,
  },
  processingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
