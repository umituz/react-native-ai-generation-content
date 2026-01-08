# Social Media App Example

Complete social media app with AI-powered content generation features.

## Overview

This example demonstrates a full-featured social media app with:
- AI image generation for posts
- AI filters and effects
- Face swap for fun content
- Photo enhancement
- User profiles
- Feed with generated content
- Likes and comments

## App Structure

```
SocialMediaApp/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── GenerateScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── PostDetailScreen.tsx
│   ├── components/
│   │   ├── PostCard.tsx
│   │   ├── AIButton.tsx
│   │   └── FeedFilter.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── store/
│   │   └── index.ts
│   └── types/
│       └── index.ts
├── App.tsx
└── package.json
```

## Main App Component

```tsx
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { store } from './src/store';
import { AppNavigator } from './src/navigation/AppNavigator';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Generate') {
                iconName = focused ? 'sparkles' : 'sparkles-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6366F1',
            tabBarInactiveTintColor: '#9CA3AF',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Feed' }} />
          <Tab.Screen name="Generate" component={GenerateScreen} options={{ title: 'Create' }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
```

## Home Screen (Feed)

```tsx
// src/screens/HomeScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { PostCard } from '../components/PostCard';
import { FeedFilter } from '../components/FeedFilter';
import { fetchPosts, likePost, selectPosts, selectIsLoading } from '../store/postsSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = React.useMemo(() => {
    if (selectedFilter === 'all') return posts;
    return posts.filter((post) => post.type === selectedFilter);
  }, [posts, selectedFilter]);

  const handleLike = (postId) => {
    dispatch(likePost(postId));
  };

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Feed</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter */}
      <FeedFilter
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      {/* Posts */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={() => handleLike(item.id)}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={['#6366F1']}
          />
        }
        contentContainerStyle={filteredPosts.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyState}>
              <Ionicons name="image-outline" size={64} color="#9CA3AF" />
              <Text style={styles.emptyText}>No posts yet</Text>
              <Text style={styles.emptySubtext}>
                Be the first to create AI-generated content!
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#6366F1',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
    textAlign: 'center',
  },
});
```

## Generate Screen (AI Creation)

```tsx
// src/screens/GenerateScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

const AI_FEATURES = [
  {
    id: 'text-to-image',
    name: 'Text to Image',
    icon: 'image',
    color: '#6366F1',
    description: 'Generate images from text',
  },
  {
    id: 'face-swap',
    name: 'Face Swap',
    icon: 'people',
    color: '#EC4899',
    description: 'Swap faces in photos',
  },
  {
    id: 'photo-restoration',
    name: 'Restore Photo',
    icon: 'refresh',
    color: '#10B981',
    description: 'Restore old photos',
  },
  {
    id: 'upscaling',
    name: 'Upscale',
    icon: 'resize',
    color: '#F59E0B',
    description: 'Enhance image quality',
  },
  {
    id: 'style-transfer',
    name: 'Style Transfer',
    icon: 'color-palette',
    color: '#8B5CF6',
    description: 'Apply artistic styles',
  },
  {
    id: 'remove-background',
    name: 'Remove BG',
    icon: 'crop',
    color: '#EF4444',
    description: 'Remove backgrounds',
  },
];

export default function GenerateScreen({ navigation }) {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleFeatureSelect = (featureId) => {
    setSelectedFeature(featureId);
    navigation.navigate('AIFeature', {
      featureId,
      userId: 'user-123',
      featureName: AI_FEATURES.find((f) => f.id === featureId).name,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create with AI</Text>
        <Text style={styles.headerSubtitle}>
          Choose an AI feature to create amazing content
        </Text>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresGrid}>
        {AI_FEATURES.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={[styles.featureCard, { borderLeftColor: feature.color }]}
            onPress={() => handleFeatureSelect(feature.id)}
          >
            <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
              <Ionicons name={feature.icon} size={32} color="#fff" />
            </View>
            <Text style={styles.featureName}>{feature.name}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => handleFeatureSelect('text-to-image')}
        >
          <Ionicons name="sparkles" size={24} color="#6366F1" />
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>Quick Generate</Text>
            <Text style={styles.quickActionDescription}>
              Generate an image from text
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => handleFeatureSelect('face-swap')}
        >
          <Ionicons name="people" size={24} color="#EC4899" />
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>Face Swap</Text>
            <Text style={styles.quickActionDescription}>
              Swap faces with friends
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>Tips for Best Results</Text>
        <View style={styles.tipItem}>
          <Ionicons name="bulb" size={20} color="#F59E0B" />
          <Text style={styles.tipText}>
            Be descriptive in your prompts for better results
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="bulb" size={20} color="#F59E0B" />
          <Text style={styles.tipText}>
            Use high-quality images for face swap and restoration
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="bulb" size={20} color="#F59E0B" />
          <Text style={styles.tipText}>
            Try different styles to find your favorite
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#6366F1',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 15,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 5,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 15,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  quickActionContent: {
    flex: 1,
    marginLeft: 15,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 3,
  },
  quickActionDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  tipsSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
    lineHeight: 20,
  },
});
```

## Post Card Component

```tsx
// src/components/PostCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

export function PostCard({ post, onLike, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: post.author.avatar }}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.authorName}>{post.author.name}</Text>
          <Text style={styles.timestamp}>
            {moment(post.createdAt).fromNow()}
          </Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* AI Badge */}
      {post.aiGenerated && (
        <View style={styles.aiBadge}>
          <Ionicons name="sparkles" size={14} color="#6366F1" />
          <Text style={styles.aiBadgeText}>AI Generated</Text>
        </View>
      )}

      {/* Content */}
      {post.caption && (
        <Text style={styles.caption}>{post.caption}</Text>
      )}

      {/* Image */}
      <Image source={{ uri: post.imageUrl }} style={styles.image} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onLike}>
          <Ionicons
            name={post.liked ? 'heart' : 'heart-outline'}
            size={24}
            color={post.liked ? '#EC4899' : '#374151'}
          />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#374151" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="send-outline" size={24} color="#374151" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Ionicons
            name={post.saved ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={post.saved ? '#6366F1' : '#374151'}
          />
        </TouchableOpacity>
      </View>

      {/* Feature Badge */}
      {post.aiFeature && (
        <View style={styles.featureBadge}>
          <Text style={styles.featureBadgeText}>
            Created with {post.aiFeature}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  moreButton: {
    padding: 4,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
    marginBottom: 8,
  },
  aiBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: 4,
  },
  caption: {
    fontSize: 14,
    color: '#111827',
    paddingHorizontal: 12,
    marginBottom: 8,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 6,
  },
  saveButton: {
    marginLeft: 'auto',
  },
  featureBadge: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  featureBadgeText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
```

## Redux Store

```tsx
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Features

1. **Home Feed**
   - View AI-generated content from other users
   - Filter by AI feature type
   - Like, comment, and save posts
   - Pull to refresh

2. **AI Generation**
   - Multiple AI features in one place
   - Quick actions for common tasks
   - Tips for best results

3. **User Profiles**
   - View user's generated content
   - See stats and achievements

4. **Post Details**
   - Full post view
   - Comments section
   - Share functionality

## Best Practices

1. **Performance**: Use virtualized lists for large feeds
2. **Caching**: Cache generated images locally
3. **Pagination**: Implement infinite scroll for feed
4. **Optimistic Updates**: Update UI immediately, sync with server
5. **Error Handling**: Show friendly error messages
6. **Loading States**: Show skeletons while loading

## Related Examples

- [Multiple Features](../../advanced/multiple-features/)
- [Navigation](../navigation/)
- [State Management](../state-management/)

---

Last updated: 2025-01-08
