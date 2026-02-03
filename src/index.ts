/**
 * @umituz/react-native-ai-generation-content
 * Provider-agnostic AI generation orchestration
 */

if (typeof __DEV__ !== "undefined" && __DEV__) {
  console.log("📍 [LIFECYCLE] @umituz/react-native-ai-generation-content/index.ts - Module loading");
}

// Domain Layer
export * from "./exports/domain";

// Infrastructure Layer
export * from "./exports/infrastructure";

// Presentation Layer
export * from "./exports/presentation";

// Domain Modules
export * from "./exports/domains";

// Features
export * from "./exports/features";

// Utils
export { distinctBy } from "./utils/arrayUtils";
