# Background Processing Example

Running AI generation tasks in the background with React Native.

## Overview

This example demonstrates how to run AI generation tasks in the background:
- Background task execution
- Progress updates via notifications
- Headless JS for iOS/Android
- Task persistence and recovery
- Batch processing

## Setup

### iOS Setup

```bash
# 1. Enable background modes in Xcode
# - Background fetch
# - Background processing

# 2. Add to AppDelegate.mm
#import "RCTHeadlessTaskManager.h"

- (void)application:(UIApplication *)application
  performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  [RCTHeadlessTaskManager registerFetchWithCompletionHandler:completionHandler];
}
```

### Android Setup

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

<service
  android:name=".HeadlessTaskService"
  android:enabled="true"
  android:exported="false" />
```

## Background Task Service

```tsx
// services/BackgroundTaskService.ts
import { Platform } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const BACKGROUND_TASK_NAME = 'AI_GENERATION_TASK';
const TASK_INTERVAL = 60000; // 1 minute

export interface BackgroundTask {
  id: string;
  featureId: string;
  params: any;
  userId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: any;
  error?: string;
  createdAt: number;
  updatedAt: number;
}

class BackgroundTaskService {
  private tasks: Map<string, BackgroundTask> = new Map();

  async initialize() {
    if (Platform.OS === 'ios') {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
        minimumInterval: TASK_INTERVAL,
        stopOnTerminate: false,
        startOnBoot: true,
      });
    }

    TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
      await this.processPendingTasks();
      return BackgroundFetch.BackgroundFetchResult.NewData;
    });
  }

  async addTask(task: Omit<BackgroundTask, 'id' | 'status' | 'progress' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newTask: BackgroundTask = {
      ...task,
      id: taskId,
      status: 'pending',
      progress: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.tasks.set(taskId, newTask);
    await this.persistTasks();

    // Start processing if in background
    if (Platform.OS === 'ios') {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME);
    }

    return taskId;
  }

  async processPendingTasks() {
    const pendingTasks = Array.from(this.tasks.values()).filter(
      (task) => task.status === 'pending'
    );

    for (const task of pendingTasks) {
      await this.processTask(task);
    }
  }

  private async processTask(task: BackgroundTask) {
    try {
      this.updateTaskStatus(task.id, 'processing', 0);

      // Import the feature dynamically
      const { AIFeatureManager } = await import('@umituz/react-native-ai-generation-content');

      const feature = AIFeatureManager.getFeature(task.featureId);

      // Process with progress updates
      const result = await feature.process({
        ...task.params,
        onProgress: (progress) => {
          this.updateTaskStatus(task.id, 'processing', progress);
        },
      });

      this.updateTaskStatus(task.id, 'completed', 100, result);

      // Send notification
      await this.sendCompletionNotification(task);
    } catch (error) {
      this.updateTaskStatus(task.id, 'failed', 0, undefined, error.message);
      await this.sendErrorNotification(task, error.message);
    }
  }

  private updateTaskStatus(
    taskId: string,
    status: BackgroundTask['status'],
    progress: number,
    result?: any,
    error?: string
  ) {
    const task = this.tasks.get(taskId);
    if (!task) return;

    task.status = status;
    task.progress = progress;
    task.result = result;
    task.error = error;
    task.updatedAt = Date.now();

    this.tasks.set(taskId, task);
    this.persistTasks();
  }

  getTask(taskId: string): BackgroundTask | undefined {
    return this.tasks.get(taskId);
  }

  getAllTasks(): BackgroundTask[] {
    return Array.from(this.tasks.values());
  }

  getPendingTasks(): BackgroundTask[] {
    return Array.from(this.tasks.values()).filter(
      (task) => task.status === 'pending'
    );
  }

  async clearCompletedTasks() {
    const tasks = Array.from(this.tasks.entries());
    tasks.forEach(([id, task]) => {
      if (task.status === 'completed' || task.status === 'failed') {
        this.tasks.delete(id);
      }
    });
    await this.persistTasks();
  }

  private async persistTasks() {
    // Persist to AsyncStorage or database
    const AsyncStorage = await import('@react-native-async-storage/async-storage').then(m => m.default);
    await AsyncStorage.setItem('background_tasks', JSON.stringify(Array.from(this.tasks.entries())));
  }

  private async loadTasks() {
    const AsyncStorage = await import('@react-native-async-storage/async-storage').then(m => m.default);
    const data = await AsyncStorage.getItem('background_tasks');
    if (data) {
      const tasks = JSON.parse(data);
      this.tasks = new Map(tasks);
    }
  }

  private async sendCompletionNotification(task: BackgroundTask) {
    const { Notifications } = await import('expo-notifications');

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '✨ Generation Complete!',
        body: `Your ${task.featureId} task has finished successfully.`,
        data: { taskId: task.id },
      },
      trigger: null,
    });
  }

  private async sendErrorNotification(task: BackgroundTask, error: string) {
    const { Notifications } = await import('expo-notifications');

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '❌ Generation Failed',
        body: error || 'An error occurred during generation.',
        data: { taskId: task.id },
      },
      trigger: null,
    });
  }
}

export const backgroundTaskService = new BackgroundTaskService();
```

## Background Task Component

```tsx
// components/BackgroundTaskManager.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  useTextToImageFeature,
  useFaceSwapFeature,
} from '@umituz/react-native-ai-generation-content';
import { backgroundTaskService, BackgroundTask } from '../services/BackgroundTaskService';

export default function BackgroundTaskManager() {
  const [tasks, setTasks] = useState<BackgroundTask[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<string>('text-to-image');

  useEffect(() => {
    // Initialize background service
    backgroundTaskService.initialize();

    // Load existing tasks
    loadTasks();

    // Poll for updates
    const interval = setInterval(loadTasks, 2000);

    return () => clearInterval(interval);
  }, []);

  const loadTasks = () => {
    const allTasks = backgroundTaskService.getAllTasks();
    setTasks(allTasks.sort((a, b) => b.updatedAt - a.updatedAt));
  };

  const startBackgroundGeneration = async () => {
    const taskId = await backgroundTaskService.addTask({
      featureId: selectedFeature,
      params: {
        prompt: 'A beautiful sunset over mountains',
        style: 'realistic',
      },
      userId: 'user-123',
    });

    Alert.alert('Task Started', `Task ${taskId} added to background queue`);
    loadTasks();
  };

  const startBatchProcessing = async () => {
    const prompts = [
      'A beautiful sunset',
      'A futuristic city',
      'A peaceful forest',
    ];

    for (const prompt of prompts) {
      await backgroundTaskService.addTask({
        featureId: 'text-to-image',
        params: {
          prompt,
          style: 'realistic',
        },
        userId: 'user-123',
      });
    }

    Alert.alert('Batch Started', `${prompts.length} tasks added to queue`);
    loadTasks();
  };

  const clearCompleted = async () => {
    await backgroundTaskService.clearCompletedTasks();
    loadTasks();
  };

  const getStatusIcon = (status: BackgroundTask['status']) => {
    switch (status) {
      case 'pending':
        return 'time';
      case 'processing':
        return 'reload';
      case 'completed':
        return 'checkmark-circle';
      case 'failed':
        return 'close-circle';
    }
  };

  const getStatusColor = (status: BackgroundTask['status']) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'processing':
        return '#6366F1';
      case 'completed':
        return '#10B981';
      case 'failed':
        return '#EF4444';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Background Tasks</Text>
        <Text style={styles.headerSubtitle}>
          Run AI generations in the background
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.featureSelector}>
          {['text-to-image', 'face-swap', 'upscaling'].map((feature) => (
            <TouchableOpacity
              key={feature}
              style={[
                styles.featureButton,
                selectedFeature === feature && styles.featureButtonSelected,
              ]}
              onPress={() => setSelectedFeature(feature)}
            >
              <Text
                style={[
                  styles.featureButtonText,
                  selectedFeature === feature && styles.featureButtonTextSelected,
                ]}
              >
                {feature}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={startBackgroundGeneration}
        >
          <Ionicons name="play" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Start Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.batchButton]}
          onPress={startBatchProcessing}
        >
          <Ionicons name="layers" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Batch Process (3)</Text>
        </TouchableOpacity>
      </View>

      {/* Tasks List */}
      <ScrollView style={styles.tasksList}>
        <View style={styles.tasksHeader}>
          <Text style={styles.tasksTitle}>
            Tasks ({tasks.length})
          </Text>
          <TouchableOpacity onPress={clearCompleted}>
            <Text style={styles.clearButton}>Clear Completed</Text>
          </TouchableOpacity>
        </View>

        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="clipboard-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyText}>No background tasks</Text>
            <Text style={styles.emptySubtext}>
              Tasks will appear here when you start them
            </Text>
          </View>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <View style={styles.taskInfo}>
                  <Ionicons
                    name={getStatusIcon(task.status) as any}
                    size={24}
                    color={getStatusColor(task.status)}
                  />
                  <View style={styles.taskDetails}>
                    <Text style={styles.taskFeature}>{task.featureId}</Text>
                    <Text style={styles.taskId}>{task.id}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                  <Text style={styles.statusText}>{task.status}</Text>
                </View>
              </View>

              {task.status === 'processing' && (
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${task.progress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{task.progress}%</Text>
              )}

              {task.status === 'completed' && task.result && (
                <View style={styles.resultSection}>
                  <Text style={styles.resultTitle}>Result:</Text>
                  <Text style={styles.resultUrl} numberOfLines={1}>
                    {task.result.imageUrl}
                  </Text>
                </View>
              )}

              {task.status === 'failed' && task.error && (
                <View style={styles.errorSection}>
                  <Text style={styles.errorTitle}>Error:</Text>
                  <Text style={styles.errorText}>{task.error}</Text>
                </View>
              )}

              <Text style={styles.timestamp}>
                Updated: {new Date(task.updatedAt).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  controls: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  featureSelector: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  featureButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  featureButtonSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  featureButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  featureButtonTextSelected: {
    color: '#4F46E5',
  },
  actionButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  batchButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  tasksList: {
    flex: 1,
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  taskCard: {
    backgroundColor: '#F9FAFB',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  taskDetails: {
    flex: 1,
  },
  taskFeature: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  taskId: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginBottom: 10,
  },
  resultSection: {
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 4,
  },
  resultUrl: {
    fontSize: 11,
    color: '#047857',
  },
  errorSection: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  errorTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 11,
    color: '#B91C1C',
  },
  timestamp: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});
```

## Best Practices

1. **Battery Optimization**: Minimize background processing frequency
2. **Task Queue**: Implement proper task queuing and scheduling
3. **Error Handling**: Handle failures gracefully with retry logic
4. **Notifications**: Keep users informed without spamming
5. **Persistence**: Save task state for app restarts
6. **Cleanup**: Remove old completed tasks periodically
7. **Testing**: Test background tasks thoroughly on both platforms

## Limitations

### iOS
- Background tasks limited to ~30 seconds
- May be terminated by the system
- Requires background modes enabled

### Android
- More flexible background execution
- Can use foreground services for long tasks
- Doze mode may affect execution

## Use Cases

- Batch image generation
- Long-running upscaling tasks
- Video processing
- Multiple face swaps
- Scheduled content creation

## Related Examples

- [Text to Image](../../basic/text-to-image/)
- [Error Handling](../error-handling/)
- [State Management](../integrations/state-management/)

---

Last updated: 2025-01-08
