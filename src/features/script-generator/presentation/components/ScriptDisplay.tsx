/**
 * ScriptDisplay Component
 * Generic display for AI-generated scripts with sections, durations and types.
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ScriptSection } from "../../domain/types/script.types";

export interface ScriptDisplayProps {
  readonly script: readonly ScriptSection[];
  readonly onUseScript: () => void;
  readonly title?: string;
  readonly useButtonText?: string;
}

export const ScriptDisplay: React.FC<ScriptDisplayProps> = ({
  script,
  onUseScript,
  title = "Generated Script",
  useButtonText = "Use This Script",
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AtomicText
          type="bodyLarge"
          style={[styles.headerTitle, { color: tokens.colors.textPrimary }]}
        >
          📝 {title}
        </AtomicText>
        <TouchableOpacity onPress={onUseScript}>
          <AtomicIcon name="checkmark-outline" size="md" color="primary" />
        </TouchableOpacity>
      </View>

      {script.map((section) => (
        <View
          key={section.id}
          style={[
            styles.section,
            { backgroundColor: tokens.colors.surface },
          ]}
        >
          <View style={styles.sectionHeader}>
            <AtomicText
              type="bodyMedium"
              style={{ color: tokens.colors.primary, fontWeight: "600" }}
            >
              {section.title} ({section.duration}s)
            </AtomicText>
            <View
              style={[
                styles.badge,
                { backgroundColor: tokens.colors.surfaceVariant },
              ]}
            >
              <AtomicText
                type="labelSmall"
                style={{ color: tokens.colors.primary }}
              >
                {section.type.toUpperCase()}
              </AtomicText>
            </View>
          </View>
          <AtomicText
            type="bodySmall"
            style={{
              color: tokens.colors.textPrimary,
              marginTop: 8,
              lineHeight: 22,
            }}
          >
            {section.content}
          </AtomicText>
          {section.notes && ( section.notes.length > 0) && (
            <AtomicText
              type="labelSmall"
              style={{
                color: tokens.colors.textSecondary,
                marginTop: 8,
                fontStyle: "italic",
              }}
            >
              💡 {section.notes}
            </AtomicText>
          )}
        </View>
      ))}

      <TouchableOpacity
        style={[
          styles.useButton,
          { backgroundColor: tokens.colors.primary },
        ]}
        onPress={onUseScript}
      >
        <AtomicIcon name="checkmark-outline" size="md" color="textInverse" />
        <AtomicText
          type="bodyLarge"
          style={[styles.useButtonText, { color: tokens.colors.textInverse }]}
        >
          {useButtonText}
        </AtomicText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontWeight: "700",
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  useButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 16,
    marginTop: 16,
  },
  useButtonText: {
    fontWeight: "700",
    marginLeft: 12,
  },
});
