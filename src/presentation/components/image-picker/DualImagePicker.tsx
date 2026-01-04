/**
 * DualImagePicker Component
 * Two-image picker for face swap, AI hug/kiss features
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { PhotoUploadCard } from "../PhotoUploadCard";

export interface DualImagePickerProps {
  readonly sourceImageUri: string | null;
  readonly targetImageUri: string | null;
  readonly isDisabled?: boolean;
  readonly onSelectSource: () => void;
  readonly onSelectTarget: () => void;
  readonly sourcePlaceholder: string;
  readonly targetPlaceholder: string;
  readonly layout?: "horizontal" | "vertical";
}

export const DualImagePicker: React.FC<DualImagePickerProps> = ({
  sourceImageUri,
  targetImageUri,
  isDisabled = false,
  onSelectSource,
  onSelectTarget,
  sourcePlaceholder,
  targetPlaceholder,
  layout = "horizontal",
}) => {
  const tokens = useAppDesignTokens();
  const isHorizontal = layout === "horizontal";

  return (
    <View
      style={[
        styles.container,
        isHorizontal ? styles.horizontal : styles.vertical,
        { gap: tokens.spacing.md },
      ]}
    >
      <View style={isHorizontal ? styles.pickerHalf : styles.pickerFull}>
        <PhotoUploadCard
          imageUri={sourceImageUri}
          disabled={isDisabled}
          onPress={onSelectSource}
          title={sourcePlaceholder}
          config={{ aspectRatio: 1, borderRadius: 20 }}
        />
      </View>

      <View style={isHorizontal ? styles.pickerHalf : styles.pickerFull}>
        <PhotoUploadCard
          imageUri={targetImageUri}
          disabled={isDisabled}
          onPress={onSelectTarget}
          title={targetPlaceholder}
          config={{ aspectRatio: 1, borderRadius: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
  },
  vertical: {
    flexDirection: "column",
    alignItems: "center",
  },
  pickerHalf: {
    flex: 1,
    alignItems: "center",
  },
  pickerFull: {
    width: "100%",
    alignItems: "center",
  },
});
