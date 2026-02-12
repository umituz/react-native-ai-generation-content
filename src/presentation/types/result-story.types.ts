/**
 * Result Story Configuration Types
 */

export interface ResultStoryConfig {
  showQuotes?: boolean;
  textAlignment?: "left" | "center" | "right";
  fontSize?: number;
  fontStyle?: "normal" | "italic";
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  borderStyle?: "outline" | "filled";
  spacing?: {
    marginBottom?: number;
    paddingHorizontal?: number;
    padding?: number;
  };
}

export const DEFAULT_STORY_CONFIG: ResultStoryConfig = {
  showQuotes: true,
  textAlignment: "center",
  fontSize: 14,
  fontStyle: "italic",
  fontWeight: "500",
  borderStyle: "filled",
  spacing: {
    marginBottom: 20,
    paddingHorizontal: 20,
    padding: 20,
  },
};
