
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { AIGenerationHero } from "./AIGenerationHero";
import { AIGenerationForm } from "./AIGenerationForm";
import type { AIGenerationFormProps } from "./AIGenerationForm.types";
import { useAppDesignTokens } from "@umituz/react-native-design-system";

export interface AIGenerationConfigProps extends Omit<AIGenerationFormProps, "isGenerating" | "progress"> {
  readonly heroTitle: string;
  readonly heroSubtitle: string;
  readonly heroIcon?: string;
  readonly images?: { uri: string; previewUrl?: string }[];
  readonly isGenerating?: boolean;
  readonly progress?: number;
}

export const AIGenerationConfig: React.FC<AIGenerationConfigProps> = ({
  heroTitle,
  heroSubtitle,
  heroIcon = "sparkles-outline",
  images = [],
  isGenerating = false,
  progress = 0,
  ...formProps
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <AIGenerationHero
        title={heroTitle}
        subtitle={heroSubtitle}
        iconName={heroIcon}
      />

      {images.length > 0 && (
        <View style={styles.imagePreviewContainer}>
          {images.map((img, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image
                source={{ uri: img.previewUrl || img.uri }}
                style={styles.previewImage}
              />
            </View>
          ))}
        </View>
      )}

      <AIGenerationForm
        isGenerating={isGenerating}
        progress={progress}
        {...formProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    justifyContent: "center",
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});
