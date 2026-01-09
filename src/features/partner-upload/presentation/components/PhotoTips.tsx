/**
 * PhotoTips Component
 * Displays photo upload tips in a grid layout
 */

import React, { useMemo } from "react";
import { InfoGrid, type InfoGridItem } from "@umituz/react-native-design-system";

export interface PhotoTipConfig {
  readonly icon: string;
  readonly textKey: string;
}

export interface PhotoTipsProps {
  readonly t: (key: string) => string;
  readonly titleKey?: string;
  readonly headerIcon?: string;
  readonly tips?: readonly PhotoTipConfig[];
  readonly style?: object;
}

const DEFAULT_TIPS: readonly PhotoTipConfig[] = [
  { icon: "sunny-outline", textKey: "photoUpload.tips.lighting" },
  { icon: "person-outline", textKey: "photoUpload.tips.faceForward" },
  { icon: "eye-outline", textKey: "photoUpload.tips.clearFace" },
  { icon: "diamond-outline", textKey: "photoUpload.tips.goodQuality" },
] as const;

export const PhotoTips: React.FC<PhotoTipsProps> = ({
  t,
  titleKey = "photoUpload.tips.title",
  headerIcon = "bulb",
  tips = DEFAULT_TIPS,
  style,
}) => {
  const gridItems: InfoGridItem[] = useMemo(
    () =>
      tips.map((tip) => ({
        icon: tip.icon,
        text: t(tip.textKey),
      })),
    [tips, t],
  );

  return (
    <InfoGrid
      title={t(titleKey)}
      headerIcon={headerIcon}
      items={gridItems}
      style={style ?? { marginHorizontal: 24, marginBottom: 20 }}
    />
  );
};
