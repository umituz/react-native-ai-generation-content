/**
 * ProgressHint Component
 * Hint text and background hint button for progress modal
 */

import React from "react";
import { TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { generationProgressContentStyles } from "./GenerationProgressContent.styles";

interface ProgressHintProps {
  hint?: string;
  backgroundHint?: string;
  hintColor?: string;
  onBackgroundHintPress?: () => void;
}

export const ProgressHint: React.FC<ProgressHintProps> = ({
  hint,
  backgroundHint,
  hintColor,
  onBackgroundHintPress,
}) => {
  const tokens = useAppDesignTokens();
  const activeHintColor = hintColor || tokens.colors.textTertiary;

  return (
    <>
      {hint && (
        <AtomicText
          type="bodySmall"
          style={[
            generationProgressContentStyles.hint,
            { color: activeHintColor },
          ]}
        >
          {hint}
        </AtomicText>
      )}

      {onBackgroundHintPress && backgroundHint && (
        <TouchableOpacity
          style={generationProgressContentStyles.backgroundHintButton}
          onPress={onBackgroundHintPress}
        >
          <AtomicText
            type="bodySmall"
            style={[
              generationProgressContentStyles.backgroundHintText,
              { color: tokens.colors.primary },
            ]}
          >
            {backgroundHint}
          </AtomicText>
        </TouchableOpacity>
      )}
    </>
  );
};
