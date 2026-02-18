/**
 * GenerationProgressContent Styles
 */

import { StyleSheet } from "react-native";

export const generationProgressContentStyles = StyleSheet.create({
  modal: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    marginBottom: 28,
    textAlign: "center",
    lineHeight: 20,
  },
  hint: {
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  backgroundHintButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backgroundHintText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
  dismissButton: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 140,
    alignItems: "center",
  },
  dismissText: {
    fontWeight: "600",
  },
});
