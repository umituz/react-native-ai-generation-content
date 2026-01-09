/**
 * Love Message Stack
 * Navigation for Love Message domain
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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

const Stack = createStackNavigator<LoveMessageStackParamList>();

export const LoveMessageStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoveMessageExplore">
      <Stack.Screen name="LoveMessageExplore" component={LoveMessageExploreScreen} />
      <Stack.Screen name="MessageList" component={MessageListScreen} />
      <Stack.Screen name="MessageGenerator" component={LoveMessageGeneratorScreen} />
      <Stack.Screen name="PartnerProfile" component={PartnerProfileScreen} />
    </Stack.Navigator>
  );
};
