/**
 * DualImagePicker Component
 * Two-image picker for face swap, AI hug/kiss features
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { ImagePickerBox, type ImagePickerBoxProps } from "./ImagePickerBox";

export interface DualImagePickerProps {
  readonly sourceImageUri: string | null;
  readonly targetImageUri: string | null;
  readonly isDisabled?: boolean;
  readonly onSelectSource: () => void;
  readonly onSelectTarget: () => void;
  readonly sourcePlaceholder: string;
  readonly targetPlaceholder: string;
  readonly variant?: ImagePickerBoxProps["variant"];
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
  variant = "portrait",
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
        <ImagePickerBox
          imageUri={sourceImageUri}
          isDisabled={isDisabled}
          onPress={onSelectSource}
          placeholderText={sourcePlaceholder}
          variant={variant}
        />
      </View>

      <View style={isHorizontal ? styles.pickerHalf : styles.pickerFull}>
        <ImagePickerBox
          imageUri={targetImageUri}
          isDisabled={isDisabled}
          onPress={onSelectTarget}
          placeholderText={targetPlaceholder}
          variant={variant}
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
