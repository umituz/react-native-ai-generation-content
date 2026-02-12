/**
 * Tab Component Types
 */

import type { ViewStyle } from "react-native";
import type { FrameData } from "./state.types";
import type { TabConfig } from "./config.types";

export interface GenerationTabsProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  getLabel: (key: string) => string;
  style?: ViewStyle;
}

export interface FrameSelectorProps {
  frames: FrameData[];
  onFrameChange: (index: number) => void;
  onFrameDelete: (index: number) => void;
  startLabel: string;
  endLabel: string;
  changeLabel: string;
  deleteLabel: string;
  style?: ViewStyle;
}
