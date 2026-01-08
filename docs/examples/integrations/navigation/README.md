# Navigation Integration Example

Complete example of integrating AI features with React Navigation.

## Overview

This example shows how to integrate AI generation features into a React Navigation app.

## Full Code

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Types
type RootStackParamList = {
  Home: undefined;
  AIFeature: {
    featureId: string;
    userId: string;
    featureName: string;
  };
};

type AIFeatureTabsParamList = {
  TextToImage: undefined;
  FaceSwap: undefined;
  PhotoRestoration: undefined;
};

// Screens
function HomeScreen({ navigation }) {
  const features = [
    {
      id: 'text-to-image',
      name: 'Text to Image',
      description: 'Generate images from text',
      icon: 'image',
      color: '#6366F1',
    },
    {
      id: 'face-swap',
      name: 'Face Swap',
      description: 'Swap faces in photos',
      icon: 'people',
      color: '#EC4899',
    },
    {
      id: 'photo-restoration',
      name: 'Photo Restoration',
      description: 'Restore old photos',
      icon: 'refresh',
      color: '#10B981',
    },
    {
      id: 'upscaling',
      name: 'Upscaling',
      description: 'Enhance image quality',
      icon: 'resize',
      color: '#F59E0B',
    },
  ];

  return (
    <View style={styles.container}>
      {features.map((feature) => (
        <TouchableOpacity
          key={feature.id}
          style={styles.featureCard}
          onPress={() =>
            navigation.navigate('AIFeature', {
              featureId: feature.id,
              userId: 'user-123',
              featureName: feature.name,
            })
          }
        >
          <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
            <Ionicons name={feature.icon} size={40} color="#fff" />
          </View>
          <View style={styles.featureInfo}>
            <Text style={styles.featureName}>{feature.name}</Text>
            <Text style={styles.featureDescription}>
              {feature.description}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function AIFeatureScreenWrapper({ route }) {
  return (
    <AIFeatureScreen
      featureId={route.params.featureId}
      userId={route.params.userId}
    />
  );
}

// Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366F1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'AI Features' }}
        />
        <Stack.Screen
          name="AIFeature"
          component={AIFeatureScreenWrapper}
          options={({ route }) => ({
            title: route.params.featureName,
            headerLeft: () => (
              <BackButton />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Custom Back Button
function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}
    >
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 15,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureInfo: {
    flex: 1,
  },
  featureName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  backButton: {
    marginLeft: 15,
  },
});

export default RootNavigator;
```

## Tab Navigation

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function AIFeatureTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Tab.Screen
        name="TextToImage"
        component={() => (
          <AIFeatureScreen
            featureId="text-to-image"
            userId="user-123"
          />
        )}
        options={{
          tabBarLabel: 'Generate',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="image" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FaceSwap"
        component={() => (
          <AIFeatureScreen
            featureId="face-swap"
            userId="user-123"
          />
        )}
        options={{
          tabBarLabel: 'Swap',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Restore"
        component={() => (
          <AIFeatureScreen
            featureId="photo-restoration"
            userId="user-123"
          />
        )}
        options={{
          tabBarLabel: 'Restore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="refresh" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
```

## Drawer Navigation

```tsx
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'AI Features' }}
        />
        <Drawer.Screen
          name="AIFeature"
          component={AIFeatureScreenWrapper}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Drawer Content
function DrawerContent({ navigation }) {
  const features = [
    { id: 'text-to-image', name: 'Text to Image', icon: 'image' },
    { id: 'face-swap', name: 'Face Swap', icon: 'people' },
    { id: 'photo-restoration', name: 'Photo Restoration', icon: 'refresh' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20, backgroundColor: '#6366F1' }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
          AI Features
        </Text>
      </View>

      <DrawerItemList.ScrollView>
        {features.map((feature) => (
          <DrawerItem
            key={feature.id}
            label={feature.name}
            icon={({ focused, color, size }) => (
              <Ionicons
                name={feature.icon}
                size={size}
                color={focused ? color : '#6B7280'}
              />
            )}
            onPress={() => {
              navigation.navigate('AIFeature', {
                featureId: feature.id,
                userId: 'user-123',
                featureName: feature.name,
              });
              navigation.closeDrawer();
            }}
          />
        ))}
      </DrawerItemList.ScrollView>
    </View>
  );
}
```

## Deep Linking

```tsx
import { Linking } from 'expo';

// Handle deep links
const handleDeepLink = (url) => {
  const { path, queryParams } = Linking.parse(url);

  if (path === 'feature') {
    const { featureId } = queryParams;
    navigation.navigate('AIFeature', {
      featureId,
      userId: 'user-123',
      featureName: getFeatureName(featureId),
    });
  }
};

useEffect(() => {
  const subscription = Linking.addEventListener('url', handleDeepLink);

  return () => {
    subscription.remove();
  };
}, []);
```

## Navigation Service

Create a navigation service:

```tsx
// services/navigation.ts
class NavigationService {
  private navigator: any;

  setNavigator(navigator: any) {
    this.navigator = navigator;
  }

  navigateToFeature(featureId: string, userId: string) {
    this.navigator.navigate('AIFeature', {
      featureId,
      userId,
      featureName: this.getFeatureName(featureId),
    });
  }

  navigateBack() {
    this.navigator.goBack();
  }

  private getFeatureName(featureId: string): string {
    const names: Record<string, string> = {
      'text-to-image': 'Text to Image',
      'face-swap': 'Face Swap',
      'photo-restoration': 'Photo Restoration',
    };
    return names[featureId] || featureId;
  }
}

export const navigationService = new NavigationService();
```

## Best Practices

1. **Type Safety**: Use TypeScript for navigation params
2. **Deep Linking**: Support deep links for better UX
3. **Back Handling**: Always handle back navigation properly
4. **State Persistence**: Save navigation state
5. **Error Handling**: Handle navigation errors gracefully

## Related Examples

- [Multiple Features](../advanced/multiple-features/)
- [Custom UI](../advanced/custom-ui/)
- [State Management](../integrations/state-management/)

---

Last updated: 2025-01-08
