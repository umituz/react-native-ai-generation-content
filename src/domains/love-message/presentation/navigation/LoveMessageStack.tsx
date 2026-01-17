/**
 * Love Message Stack
 * Navigation for Love Message domain
 */

import React from "react";
import {
  StackNavigator,
  type StackNavigatorConfig,
} from "@umituz/react-native-design-system";
import { LoveMessageExploreScreen } from "../screens/LoveMessageExploreScreen";
import { MessageListScreen } from "../screens/MessageListScreen";
import { LoveMessageGeneratorScreen } from "../screens/LoveMessageGeneratorScreen";
import { PartnerProfileScreen } from "../screens/PartnerProfileScreen";
import type { MessageType } from "../../domain/types";

export type LoveMessageStackParamList = {
  LoveMessageExplore: undefined;
  MessageList: { categoryId: string };
  MessageGenerator: { initialType?: MessageType };
  PartnerProfile: undefined;
};

const stackConfig: StackNavigatorConfig<LoveMessageStackParamList> = {
  initialRouteName: "LoveMessageExplore",
  screenOptions: {
    headerShown: false,
  },
  screens: [
    { name: "LoveMessageExplore", component: LoveMessageExploreScreen },
    { name: "MessageList", component: MessageListScreen },
    { name: "MessageGenerator", component: LoveMessageGeneratorScreen },
    { name: "PartnerProfile", component: PartnerProfileScreen },
  ],
};

export const LoveMessageStack: React.FC = () => {
  return <StackNavigator config={stackConfig} />;
};
