/**
 * Creations Gallery Screen Styles
 */

import { StyleSheet } from "react-native";

export const creationsGalleryStyles = StyleSheet.create({
  header: { borderBottomWidth: 1 },
  listContent: { paddingHorizontal: 16, paddingTop: 16 },
  gridContent: { paddingHorizontal: 12, paddingTop: 12 },
  emptyContent: { flexGrow: 1 },
  gridRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  gridPlaceholder: {
    flex: 1,
  },
  gridItemWrapper: {
    flex: 1 / 2,
    padding: 4,
  },
  listItemWrapper: {
    width: "100%",
    marginBottom: 16,
  },
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    width: 40,
  },
});
