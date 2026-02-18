import React from "react";
import { View, TouchableOpacity, StyleSheet, type ViewStyle } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface GridSelectorOption<T> {
  readonly value: T;
  readonly label: string;
  readonly description?: string;
  readonly emoji?: string;
}

export interface GridSelectorProps<T> {
  readonly options: readonly GridSelectorOption<T>[];
  readonly selectedValue: T;
  readonly onSelect: (value: T) => void;
  readonly label?: string;
  readonly columns?: number;
  readonly disabled?: boolean;
  readonly style?: ViewStyle;
}

export function GridSelector<T>({
  options,
  selectedValue,
  onSelect,
  label,
  columns = 2,
  disabled = false,
  style,
}: GridSelectorProps<T>): React.ReactElement {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.section, style]}>
      {label && (
        <AtomicText
          type="bodyMedium"
          style={{
            color: tokens.colors.textPrimary,
            fontWeight: "600",
            marginBottom: 12,
          }}
        >
          {label}
        </AtomicText>
      )}
      <View style={styles.grid}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <TouchableOpacity
              key={String(option.value)}
              style={[
                styles.card,
                {
                  width: `${100 / columns - 4}%`,
                  backgroundColor: isSelected
                    ? tokens.colors.primary + "20"
                    : tokens.colors.surface,
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
                },
              ]}
              onPress={() => onSelect(option.value)}
              disabled={disabled}
            >
              <View style={styles.cardContent}>
                {option.emoji && (
                  <AtomicText style={styles.emoji}>{option.emoji}</AtomicText>
                )}
                <AtomicText
                  type="bodySmall"
                  style={{
                    color: tokens.colors.textPrimary,
                    fontWeight: isSelected ? "600" : "400",
                    textAlign: "center",
                  }}
                >
                  {option.label}
                </AtomicText>
                {option.description && (
                  <AtomicText
                    type="labelSmall"
                    style={{
                      color: tokens.colors.textSecondary,
                      marginTop: 4,
                      textAlign: "center",
                      fontSize: 10,
                    }}
                  >
                    {option.description}
                  </AtomicText>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    width: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
});
