import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import {
  AtomicButton,
  useAppDesignTokens,
  AtomicIcon,
  AtomicInput,
  AtomicSpinner,
  ScreenLayout,
  ScreenHeader,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

export interface MemeGeneratorScreenProps {
  onGenerate: (prompt: string) => Promise<string>;
  onSave: (imageUrl: string) => Promise<void>;
  onBackPress: () => void;
  title?: string;
}

export const MemeGeneratorScreen: React.FC<MemeGeneratorScreenProps> = ({
  onGenerate,
  onSave,
  onBackPress,
  title,
}) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const url = await onGenerate(prompt);
      setGeneratedImage(url);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate";
      Alert.alert(t("common.error"), errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedImage) return;
    setIsSaving(true);
    try {
      await onSave(generatedImage);
      setGeneratedImage(null);
      setPrompt("");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save";
      Alert.alert(t("common.error"), errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      padding: tokens.spacing.lg,
    },
    previewContainer: {
      aspectRatio: 1,
      width: "100%",
      backgroundColor: tokens.colors.backgroundSecondary,
      borderRadius: tokens.borderRadius.lg,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: tokens.spacing.xl,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    previewImage: {
      width: "100%",
      height: "100%",
    },
    inputSection: {
      gap: tokens.spacing.lg,
      paddingBottom: tokens.spacing.xxl,
    },
  });

  return (
    <ScreenLayout
      header={
        <ScreenHeader
          title={title || t("home.create_title")}
          onBackPress={onBackPress}
        />
      }
      scrollable={true}
      responsiveEnabled={false}
      contentContainerStyle={{ paddingHorizontal: 0 }}
      keyboardAvoiding={true}
    >
      <View style={styles.content}>
        <View style={styles.previewContainer}>
          {isGenerating ? (
            <AtomicSpinner size="lg" color="primary" />
          ) : generatedImage ? (
            <Image
              source={{ uri: generatedImage }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          ) : (
            <AtomicIcon
              name="color-wand-outline"
              size={80}
              color="secondary"
              style={{ opacity: 0.3 }}
            />
          )}
        </View>

        <View style={styles.inputSection}>
          <AtomicInput
            label={t("wizard.prompt_label")}
            placeholder={t("wizard.prompt_placeholder")}
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={3}
          />

          {!generatedImage ? (
            <AtomicButton
              onPress={handleGenerate}
              disabled={isGenerating}
              fullWidth
            >
              {isGenerating ? t("common.loading") : t("wizard.generate_button")}
            </AtomicButton>
          ) : (
            <View style={{ flexDirection: "row", gap: tokens.spacing.md }}>
              <AtomicButton
                variant="secondary"
                onPress={() => setGeneratedImage(null)}
                style={{ flex: 1 }}
              >
                {t("common.reset")}
              </AtomicButton>
              <AtomicButton
                onPress={handleSave}
                disabled={isSaving}
                style={{ flex: 2 }}
              >
                {t("common.save")}
              </AtomicButton>
            </View>
          )}
        </View>
      </View>
    </ScreenLayout>
  );
};
