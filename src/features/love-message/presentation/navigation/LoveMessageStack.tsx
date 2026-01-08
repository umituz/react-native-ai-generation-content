/**
 * Love Message Stack
 * Navigation for Love Message domain
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoveMessageExploreScreen } from "@domains/love-message/presentation/screens/LoveMessageExploreScreen";
import { MessageListScreen } from "@domains/love-message/presentation/screens/MessageListScreen";
import { LoveMessageGeneratorScreen } from "@domains/love-message/presentation/screens/LoveMessageGeneratorScreen";
import { PartnerProfileScreen } from "@domains/love-message/presentation/screens/PartnerProfileScreen";

export type LoveMessageStackParamList = {
  LoveMessageExplore: undefined;
  MessageList: { categoryId: string } | undefined;
  MessageGenerator: { initialType?: any } | undefined;
  PartnerProfile: undefined;
};

const Stack = createStackNavigator<LoveMessageStackParamList>();

export const LoveMessageStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoveMessageExplore"
    >
      <Stack.Screen
        name="LoveMessageExplore"
        component={LoveMessageExploreScreen}
      />
      <Stack.Screen name="MessageList" component={MessageListScreen} />
      <Stack.Screen
        name="MessageGenerator"
        component={LoveMessageGeneratorScreen}
      />
      <Stack.Screen name="PartnerProfile" component={PartnerProfileScreen} />
    </Stack.Navigator>
  );
};
