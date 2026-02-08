import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicIcon, AtomicText, useAppDesignTokens } from "@umituz/react-native-design-system";

export interface CreationRatingProps {
  readonly rating: number;
  readonly max?: number;
  readonly size?: number;
  readonly onRate?: (rating: number) => void;
  readonly readonly?: boolean;
}

export const CreationRating: React.FC<CreationRatingProps> = ({
  rating,
  max = 5,
  size = 32,
  onRate,
  readonly = false,
}: CreationRatingProps) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {Array.from({ length: max }).map((_, i) => {
          const isFilled = i < rating;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => onRate?.(i + 1)}
              activeOpacity={0.7}
              disabled={readonly}
              style={styles.star}
            >
              <AtomicIcon
                name={isFilled ? "star" : "star-outline"}
                customSize={size}
                customColor={isFilled ? tokens.colors.primary : tokens.colors.textTertiary}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {!readonly && rating > 0 && (
        <AtomicText type="bodySmall" color="textSecondary" style={styles.valueText}>
          {rating} / {max}
        </AtomicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 12,
  },
  stars: {
    flexDirection: "row",
    gap: 8,
  },
  star: {
    padding: 2,
  },
  valueText: {
    marginTop: 8,
    fontWeight: "600",
  },
});
