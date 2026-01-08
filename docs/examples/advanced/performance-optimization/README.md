# Performance Optimization Example

Optimizing AI generation features for better performance and user experience.

## Overview

This example demonstrates performance optimization techniques:
- Image compression and caching
- Memoization and lazy loading
- Request debouncing and throttling
- Memory management
- Code splitting
- Efficient state updates

## Image Optimization

### Image Compression

```tsx
// utils/imageOptimizer.ts
import * as ImageManipulator from 'expo-image-manipulator';

export interface OptimizedImage {
  uri: string;
  width: number;
  height: number;
  size: number; // in bytes
}

export async function optimizeImage(
  uri: string,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'jpeg' | 'png';
  } = {}
): Promise<OptimizedImage> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    format = 'jpeg',
  } = options;

  // Get original image dimensions
  const originalImage = await ImageManipulator.manipulateAsync(uri, [], {
    compress: 1,
    format: ImageManipulator.SaveFormat.JPEG,
  });

  // Calculate new dimensions maintaining aspect ratio
  const widthRatio = maxWidth / originalImage.width;
  const heightRatio = maxHeight / originalImage.height;
  const scale = Math.min(widthRatio, heightRatio, 1);

  const newWidth = Math.round(originalImage.width * scale);
  const newHeight = Math.round(originalImage.height * scale);

  // Compress image
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [
      {
        resize: {
          width: newWidth,
          height: newHeight,
        },
      },
    ],
    {
      compress: quality,
      format: format === 'jpeg' ? ImageManipulator.SaveFormat.JPEG : ImageManipulator.SaveFormat.PNG,
    }
  );

  // Get file size
  const response = await fetch(result.uri);
  const blob = await response.blob();
  const size = blob.size;

  return {
    uri: result.uri,
    width: newWidth,
    height: newHeight,
    size,
  };
}

export async function optimizeForFeature(
  uri: string,
  featureId: string
): Promise<OptimizedImage> {
  const featureRequirements: Record<string, any> = {
    'text-to-image': { maxWidth: 1024, maxHeight: 1024, quality: 0.9 },
    'face-swap': { maxWidth: 1920, maxHeight: 1080, quality: 1.0 },
    'photo-restoration': { maxWidth: 2048, maxHeight: 2048, quality: 1.0 },
    'upscaling': { maxWidth: 3840, maxHeight: 2160, quality: 0.95 },
    'style-transfer': { maxWidth: 1024, maxHeight: 1024, quality: 0.9 },
    'remove-background': { maxWidth: 1920, maxHeight: 1080, quality: 1.0 },
  };

  const requirements = featureRequirements[featureId] || {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.9,
  };

  return optimizeImage(uri, requirements);
}
```

### Image Caching

```tsx
// utils/imageCache.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FileSystem } from 'expo-file-system';
import { MD5 } from 'crypto-js';

interface CacheEntry {
  uri: string;
  timestamp: number;
  size: number;
  expiresAt: number;
}

class ImageCache {
  private cacheDir = `${FileSystem.cacheDirectory}images/`;
  private maxCacheSize = 100 * 1024 * 1024; // 100MB
  private maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

  async initialize() {
    const dirInfo = await FileSystem.getInfoAsync(this.cacheDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(this.cacheDir, { intermediates: true });
    }
    await this.cleanup();
  }

  async get(key: string): Promise<string | null> {
    const cacheKey = this.getCacheKey(key);
    const metadata = await this.getMetadata(cacheKey);

    if (!metadata) {
      return null;
    }

    // Check if expired
    if (Date.now() > metadata.expiresAt) {
      await this.remove(cacheKey);
      return null;
    }

    // Check if file exists
    const fileInfo = await FileSystem.getInfoAsync(metadata.uri);
    if (!fileInfo.exists) {
      await this.remove(cacheKey);
      return null;
    }

    // Update access time
    await this.updateMetadata(cacheKey, { timestamp: Date.now() });

    return metadata.uri;
  }

  async set(key: string, uri: string, ttl: number = this.maxAge): Promise<void> {
    const cacheKey = this.getCacheKey(key);
    const ext = uri.split('.').pop();
    const cachedPath = `${this.cacheDir}${cacheKey}.${ext}`;

    // Copy file to cache
    await FileSystem.copyAsync({
      from: uri,
      to: cachedPath,
    });

    // Get file size
    const fileInfo = await FileSystem.getInfoAsync(cachedPath);

    // Save metadata
    const metadata: CacheEntry = {
      uri: cachedPath,
      timestamp: Date.now(),
      size: fileInfo.size || 0,
      expiresAt: Date.now() + ttl,
    };

    await this.saveMetadata(cacheKey, metadata);

    // Check cache size and cleanup if needed
    await this.checkCacheSize();
  }

  private async cleanup(): Promise<void> {
    const metadata = await this.getAllMetadata();
    const now = Date.now();

    for (const [key, entry] of Object.entries(metadata)) {
      if (now > entry.expiresAt) {
        await this.remove(key);
      }
    }
  }

  private async checkCacheSize(): Promise<void> {
    const metadata = await this.getAllMetadata();
    let totalSize = Object.values(metadata).reduce((sum, entry) => sum + entry.size, 0);

    if (totalSize > this.maxCacheSize) {
      // Sort by access time (oldest first)
      const entries = Object.entries(metadata).sort(
        ([, a], [, b]) => a.timestamp - b.timestamp
      );

      // Remove oldest entries until we're under the limit
      for (const [key, entry] of entries) {
        await this.remove(key);
        totalSize -= entry.size;
        if (totalSize <= this.maxCacheSize * 0.8) {
          break; // Keep 20% buffer
        }
      }
    }
  }

  private async remove(key: string): Promise<void> {
    const metadata = await this.getMetadata(key);
    if (metadata) {
      await FileSystem.deleteAsync(metadata.uri, { idempotent: true });
    }
    await AsyncStorage.removeItem(`cache_${key}`);
  }

  private getCacheKey(key: string): string {
    return MD5(key).toString();
  }

  private async getMetadata(key: string): Promise<CacheEntry | null> {
    const data = await AsyncStorage.getItem(`cache_${key}`);
    return data ? JSON.parse(data) : null;
  }

  private async saveMetadata(key: string, metadata: CacheEntry): Promise<void> {
    await AsyncStorage.setItem(`cache_${key}`, JSON.stringify(metadata));
  }

  private async updateMetadata(
    key: string,
    updates: Partial<CacheEntry>
  ): Promise<void> {
    const metadata = await this.getMetadata(key);
    if (metadata) {
      await this.saveMetadata(key, { ...metadata, ...updates });
    }
  }

  private async getAllMetadata(): Promise<Record<string, CacheEntry>> {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((key) => key.startsWith('cache_'));
    const entries = await AsyncStorage.multiGet(cacheKeys);

    const metadata: Record<string, CacheEntry> = {};
    for (const [key, value] of entries) {
      if (value) {
        const cacheKey = key.replace('cache_', '');
        metadata[cacheKey] = JSON.parse(value);
      }
    }

    return metadata;
  }

  async clear(): Promise<void> {
    const metadata = await this.getAllMetadata();
    for (const key of Object.keys(metadata)) {
      await this.remove(key);
    }
  }

  async getStats(): Promise<{ size: number; count: number }> {
    const metadata = await this.getAllMetadata();
    const size = Object.values(metadata).reduce((sum, entry) => sum + entry.size, 0);
    return {
      size,
      count: Object.keys(metadata).length,
    };
  }
}

export const imageCache = new ImageCache();
```

## Memoization and Lazy Loading

```tsx
// components/OptimizedImageGallery.tsx
import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const ITEM_WIDTH = (SCREEN_WIDTH - 32) / NUM_COLUMNS;

interface ImageItem {
  id: string;
  uri: string;
  thumbnail?: string;
  title?: string;
}

interface OptimizedImageGalleryProps {
  images: ImageItem[];
  onImagePress?: (image: ImageItem) => void;
}

// Memoized individual image item
const ImageGalleryItem = memo(({ item, onPress, index }) => {
  const [loaded, setLoaded] = React.useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handlePress = useCallback(() => {
    onPress(item, index);
  }, [item, index, onPress]);

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.thumbnail || item.uri }}
        style={[styles.image, !loaded && styles.imagePlaceholder]}
        onLoad={handleLoad}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id &&
         prevProps.index === nextProps.index;
});

ImageGalleryItem.displayName = 'ImageGalleryItem';

export const OptimizedImageGallery = memo(({ images, onImagePress }: OptimizedImageGalleryProps) => {
  const navigation = useNavigation();

  const handleImagePress = useCallback((image: ImageItem, index: number) => {
    if (onImagePress) {
      onImagePress(image);
    } else {
      navigation.navigate('ImageDetail', { image, index });
    }
  }, [navigation, onImagePress]);

  const keyExtractor = useCallback((item: ImageItem) => item.id, []);

  const renderItem = useCallback(({ item, index }) => (
    <ImageGalleryItem
      item={item}
      index={index}
      onPress={handleImagePress}
    />
  ), [handleImagePress]);

  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  }), []);

  const memoizedImages = useMemo(() => images, [images]);

  return (
    <FlatList
      data={memoizedImages}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={NUM_COLUMNS}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={21}
      initialNumToRender={12}
      contentContainerStyle={styles.list}
    />
  );
});

OptimizedImageGallery.displayName = 'OptimizedImageGallery';

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
  item: {
    width: ITEM_WIDTH - 4,
    height: ITEM_WIDTH - 4,
    margin: 2,
    backgroundColor: '#F3F4F6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: '#F3F4F6',
  },
});
```

## Debouncing and Throttling

```tsx
// hooks/useDebouncedValue.ts
import { useState, useEffect } from 'react';

export function useDebouncedValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

```tsx
// hooks/useThrottledCallback.ts
import { useCallback, useRef } from 'react';

export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 1000
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        lastRun.current = now;
        return callback(...args);
      }
    },
    [callback, delay]
  ) as T;
}
```

## Memory Management

```tsx
// hooks/useMemoryManagement.ts
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useMemoryManagement() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to foreground
      // Clear unnecessary caches, reload critical data
      clearNonEssentialCaches();
    }

    appState.current = nextAppState;
  };

  const clearNonEssentialCaches = async () => {
    // Clear image caches, but keep recent ones
    // Clear request caches
    // Clear any other non-essential data
  };
}

// Usage in component
export function OptimizedComponent() {
  useMemoryManagement();

  // Component logic
  return <View>...</View>;
}
```

## Performance Monitoring

```tsx
// utils/performanceMonitor.ts
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  startMeasure(label: string): () => void {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (!this.metrics.has(label)) {
        this.metrics.set(label, []);
      }

      this.metrics.get(label)!.push(duration);

      // Log slow operations
      if (duration > 100) {
        console.warn(`[Performance] Slow operation: ${label} took ${duration.toFixed(2)}ms`);
      }
    };
  }

  getStats(label: string) {
    const measurements = this.metrics.get(label);
    if (!measurements || measurements.length === 0) {
      return null;
    }

    const avg = measurements.reduce((sum, val) => sum + val, 0) / measurements.length;
    const min = Math.min(...measurements);
    const max = Math.max(...measurements);

    return {
      count: measurements.length,
      avg: avg.toFixed(2),
      min: min.toFixed(2),
      max: max.toFixed(2),
    };
  }

  logStats() {
    console.log('=== Performance Stats ===');
    for (const [label, measurements] of this.metrics.entries()) {
      const stats = this.getStats(label);
      console.log(`${label}:`, stats);
    }
  }

  clear() {
    this.metrics.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

## Optimized Feature Hook

```tsx
// hooks/useOptimizedTextToImage.ts
import { useCallback, useMemo, useRef } from 'react';
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';
import { useDebouncedValue } from './useDebouncedValue';
import { useThrottledCallback } from './useThrottledCallback';
import { imageCache } from '../utils/imageCache';
import { optimizeForFeature } from '../utils/imageOptimizer';

export function useOptimizedTextToImage(userId: string) {
  const generationCount = useRef(0);

  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
      enableCache: true,
    },
    userId,
  });

  // Debounce prompt changes
  const debouncedPrompt = useDebouncedValue(feature.state.prompt, 500);

  // Throttle generate calls
  const throttledGenerate = useThrottledCallback(async (params) => {
    const endMeasure = performanceMonitor.startMeasure('text-to-image-generation');

    try {
      const result = await feature.generate(params);

      // Cache the result
      if (result?.imageUrl) {
        await imageCache.set(result.imageUrl, result.imageUrl);
      }

      return result;
    } finally {
      endMeasure();
      generationCount.current += 1;

      // Log stats every 10 generations
      if (generationCount.current % 10 === 0) {
        performanceMonitor.logStats();
      }
    }
  }, 2000);

  // Optimize image before generation
  const optimizeImage = useCallback(async (uri: string) => {
    return optimizeForFeature(uri, 'text-to-image');
  }, []);

  // Memoized values
  const isReady = useMemo(() => {
    return feature.isReady && debouncedPrompt.length >= 10;
  }, [feature.isReady, debouncedPrompt]);

  const estimatedTime = useMemo(() => {
    const promptLength = debouncedPrompt.length;
    if (promptLength < 50) return '10-20s';
    if (promptLength < 100) return '20-30s';
    return '30-45s';
  }, [debouncedPrompt]);

  return {
    ...feature,
    debouncedPrompt,
    isReady,
    estimatedTime,
    generate: throttledGenerate,
    optimizeImage,
  };
}
```

## Best Practices

1. **Image Optimization**:
   - Compress images before sending
   - Use appropriate dimensions for each feature
   - Cache optimized images

2. **Caching Strategy**:
   - Cache aggressively for expensive operations
   - Implement TTL for cached items
   - Clean up old cache entries

3. **Performance Monitoring**:
   - Monitor critical operations
   - Log performance bottlenecks
   - Track improvement over time

4. **Memory Management**:
   - Clear caches on app background
   - Remove unused listeners
   - Avoid memory leaks

5. **Rendering Optimization**:
   - Use memo and useMemo
   - Implement virtualization for lists
   - Lazy load components

## Performance Checklist

- [ ] Enable image compression
- [ ] Implement image caching
- [ ] Use memoization for expensive computations
- [ ] Debounce user input
- [ ] Throttle expensive operations
- [ ] Monitor performance metrics
- [ ] Clean up resources on unmount
- [ ] Optimize list rendering
- [ ] Use code splitting
- [ ] Implement lazy loading

## Related Examples

- [Text to Image](../../basic/text-to-image/)
- [Custom UI](../custom-ui/)
- [State Management](../integrations/state-management/)

---

Last updated: 2025-01-08
