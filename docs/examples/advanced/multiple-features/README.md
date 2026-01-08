# Multiple Features Example

Example of using multiple AI features in one app.

## Overview

This example shows how to integrate multiple AI features:
- Text to Image
- Face Swap
- Photo Restoration
- Upscaling

## Full Code

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

const FEATURES = [
  {
    id: 'text-to-image',
    name: 'Text to Image',
    description: 'Generate images from text',
    icon: '✨',
    color: '#6366F1',
  },
  {
    id: 'face-swap',
    name: 'Face Swap',
    description: 'Swap faces in photos',
    icon: '🔄',
    color: '#EC4899',
  },
  {
    id: 'photo-restoration',
    name: 'Photo Restoration',
    description: 'Restore old photos',
    icon: '🖼️',
    color: '#10B981',
  },
  {
    id: 'upscaling',
    name: 'Upscaling',
    description: 'Enhance image quality',
    icon: '🔍',
    color: '#F59E0B',
  },
];

export default function MultipleFeaturesExample() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const openFeature = (featureId: string) => {
    setSelectedFeature(featureId);
  };

  const closeFeature = () => {
    setSelectedFeature(null);
  };

  return (
    <View style={styles.container}>
      {/* Home Screen */}
      {!selectedFeature && (
        <ScrollView style={styles.homeScreen}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appName}>AI Features</Text>
            <Text style={styles.appDescription}>
              Explore AI-powered features
            </Text>
          </View>

          {/* Feature Grid */}
          <View style={styles.featureGrid}>
            {FEATURES.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={[styles.featureCard, { borderLeftColor: feature.color }]}
                onPress={() => openFeature(feature.id)}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureName}>{feature.name}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Feature Screen */}
      {selectedFeature && (
        <View style={styles.featureScreen}>
          <AIFeatureScreen
            featureId={selectedFeature}
            userId="user-123"
          />

          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={closeFeature}>
            <Text style={styles.backButtonText}>← Back to Features</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  homeScreen: {
    flex: 1,
  },
  header: {
    padding: 30,
    backgroundColor: '#6366F1',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  appDescription: {
    fontSize: 16,
    color: '#E0E7FF',
  },
  featureGrid: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 10,
    textAlign: 'center',
  },
  featureName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  featureScreen: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
```

## Navigation Integration

### React Navigation

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AIFeature"
          component={({ route }) => (
            <AIFeatureScreen
              featureId={route.params.featureId}
              userId={route.params.userId}
            />
          )}
          options={({ route }) => ({
            title: route.params.featureName,
            headerLeft: () => (
              <BackButton onPress={() => navigation.goBack()} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const features = [
    { id: 'text-to-image', name: 'Text to Image' },
    { id: 'face-swap', name: 'Face Swap' },
    { id: 'photo-restoration', name: 'Photo Restoration' },
  ];

  return (
    <ScrollView>
      {features.map((feature) => (
        <TouchableOpacity
          key={feature.id}
          onPress={() =>
            navigation.navigate('AIFeature', {
              featureId: feature.id,
              userId: 'user-123',
              featureName: feature.name,
            })
          }
        >
          <Text>{feature.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
```

## Tab Navigation

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Generate"
        component={() => (
          <AIFeatureScreen
            featureId="text-to-image"
            userId="user-123"
          />
        )}
        options={{ tabBarLabel: 'Generate' }}
      />
      <Tab.Screen
        name="Swap"
        component={() => (
          <AIFeatureScreen
            featureId="face-swap"
            userId="user-123"
          />
        )}
        options={{ tabBarLabel: 'Face Swap' }}
      />
      <Tab.Screen
        name="Restore"
        component={() => (
          <AIFeatureScreen
            featureId="photo-restoration"
            userId="user-123"
          />
        )}
        options={{ tabBarLabel: 'Restore' }}
      />
    </Tab.Navigator>
  );
}
```

## Custom Feature Selection UI

### Grid Layout

```tsx
function FeatureGrid() {
  return (
    <GridView
      data={FEATURES}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => openFeature(item.id)}
        >
          <Image source={item.icon} style={styles.gridIcon} />
          <Text style={styles.gridTitle}>{item.name}</Text>
        </TouchableOpacity>
      )}
      numColumns={2}
    />
  );
}
```

### List Layout

```tsx
function FeatureList() {
  return (
    <FlatList
      data={FEATURES}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => openFeature(item.id)}
        >
          <Text style={styles.listTitle}>{item.name}</Text>
          <Text style={styles.listDescription}>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
```

## Feature Cards

### Enhanced Feature Cards

```tsx
function EnhancedFeatureCard({ feature }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => openFeature(feature.id)}
    >
      {/* Icon */}
      <View style={styles.cardIcon}>
        <Image source={feature.icon} style={styles.cardIconImage} />
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{feature.name}</Text>
        <Text style={styles.cardDescription}>
          {feature.description}
        </Text>

        {/* Tags */}
        <View style={styles.cardTags}>
          {feature.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Arrow */}
      <Text style={styles.cardArrow}>→</Text>
    </TouchableOpacity>
  );
}
```

## Features

### Category Selection

Group features by category:

```tsx
const CATEGORIES = {
  'Text Generation': ['text-to-image', 'text-to-video', 'text-to-voice'],
  'Image Processing': ['face-swap', 'photo-restoration', 'upscaling'],
  'Special Effects': ['ai-hug', 'ai-kiss', 'anime-selfie'],
};
```

### Search

Add search functionality:

```tsx
import { useState } from 'react';
import { SearchBar } from 'react-native-elements';

function FeatureBrowser() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFeatures = FEATURES.filter((feature) =>
    feature.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <SearchBar
        placeholder="Search features..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FeatureGrid features={filteredFeatures} />
    </View>
  );
}
```

### Favorites

Add favorite functionality:

```tsx
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FeatureBrowser() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = async (featureId) => {
    if (favorites.includes(featureId)) {
      setFavorites(favorites.filter((id) => id !== featureId));
    } else {
      setFavorites([...favorites, featureId]);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <FeatureGrid
      features={FEATURES}
      onFavorite={toggleFavorite}
      favorites={favorites}
    />
  );
}
```

## Best Practices

1. **Navigation**: Use React Navigation for smooth navigation
2. **State Management**: Consider Redux/MobX for complex apps
3. **Performance**: Memoize components, lazy load features
4. **UX**: Show loading states, handle errors gracefully
5. **Testing**: Test navigation flows

## Related Examples

- [Single Feature](../text-to-image/)
- [Custom UI](../../advanced/custom-ui/)
- [Navigation](../../integrations/navigation/)

---

Last updated: 2025-01-08
