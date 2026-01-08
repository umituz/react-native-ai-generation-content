# Creations Domain

Gallery and management system for AI-generated content.

## Overview

The Creations domain provides a comprehensive system for managing AI-generated content. It includes features for storing, organizing, filtering, and sharing AI creations across all generation types.

## Features

- **Content Storage**: Store AI-generated images, videos, and audio
- **Organization**: Organize creations by type, date, and custom tags
- **Filtering & Sorting**: Advanced filtering and sorting options
- **Gallery View**: Beautiful gallery grid for browsing creations
- **Sharing**: Share creations to social media and other platforms
- **Favorites**: Mark and organize favorite creations
- **Metadata Management**: Track generation parameters and metadata

## Installation

This domain is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using Creations Hook

```tsx
import { useCreations } from '@umituz/react-native-ai-generation-content';

function CreationsGallery() {
  const {
    creations,
    loading,
    error,
    filters,
    setFilters,
    loadMore,
    refresh,
    deleteCreation,
    toggleFavorite,
  } = useCreations({
    userId: 'user-123',
    type: 'image', // 'image' | 'video' | 'audio' | 'all'
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatGrid
      data={creations}
      renderItem={({ item }) => (
        <CreationCard
          creation={item}
          onPress={() => viewCreation(item)}
          onDelete={() => deleteCreation(item.id)}
          onFavorite={() => toggleFavorite(item.id)}
        />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
}
```

### Saving Creations

```tsx
import { saveCreation } from '@umituz/react-native-ai-generation-content';

// After generating content
const result = await generateImage({ prompt: '...' });

await saveCreation({
  userId: 'user-123',
  type: 'image',
  url: result.imageUrl,
  metadata: {
    prompt: '...',
    model: 'imagen-3',
    aspectRatio: '16:9',
    style: 'realistic',
    createdAt: new Date().toISOString(),
  },
});
```

## Data Models

### Creation

```tsx
interface Creation {
  id: string;
  userId: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnailUrl?: string;
  metadata: {
    prompt?: string;
    model?: string;
    featureType?: string;
    [key: string]: any;
  };
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### CreationsFilter

```tsx
interface CreationsFilter {
  type?: 'image' | 'video' | 'audio' | 'all';
  featureType?: string; // e.g., 'text-to-image', 'face-swap'
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  isFavorite?: boolean;
  sortBy?: 'createdAt' | 'updatedAt' | 'name';
  sortOrder?: 'asc' | 'desc';
}
```

## Hooks

### useCreations

Main hook for managing creations:

```tsx
const {
  creations,
  loading,
  error,
  hasMore,
  filters,
  setFilters,
  loadMore,
  refresh,
  deleteCreation,
  toggleFavorite,
  updateTags,
  getCreation,
} = useCreations(options);
```

### useCreationDetails

Get details of a specific creation:

```tsx
import { useCreationDetails } from '@umituz/react-native-ai-generation-content';

function CreationDetailScreen({ creationId }) {
  const { creation, loading, error, updateMetadata, share } = useCreationDetails({
    creationId,
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Image source={{ uri: creation.url }} />
      <Text>Prompt: {creation.metadata.prompt}</Text>
      <Text>Created: {new Date(creation.createdAt).toLocaleDateString()}</Text>
      <Button title="Share" onPress={() => share(creation)} />
    </View>
  );
}
```

### useCreationActions

Actions for creations:

```tsx
import { useCreationActions } from '@umituz/react-native-ai-generation-content';

const {
  saveToGallery,
  shareToSocialMedia,
  download,
  delete: deleteCreation,
  duplicate,
  exportMetadata,
} = useCreationActions();

// Save to device gallery
await saveToGallery(creation);

// Share to social media
await shareToSocialMedia({
  creation,
  platform: 'instagram', // 'instagram' | 'facebook' | 'twitter' | 'whatsapp'
});

// Download to device
await download(creation);

// Delete creation
await deleteCreation(creation.id);

// Duplicate creation
await duplicate(creation);

// Export metadata
const metadata = await exportMetadata(creation);
```

## Components

### CreationsGallery

```tsx
import { CreationsGallery } from '@umituz/react-native-ai-generation-content';

<CreationsGallery
  userId="user-123"
  type="image"
  filters={{
    featureType: 'text-to-image',
    isFavorite: false,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }}
  onCreationPress={(creation) => console.log('Pressed:', creation)}
  onCreationLongPress={(creation) => console.log('Long pressed:', creation)}
  onRefresh={() => console.log('Refreshed')}
/>
```

### CreationCard

```tsx
import { CreationCard } from '@umituz/react-native-ai-generation-content';

<CreationCard
  creation={creation}
  onPress={() => viewCreation(creation)}
  onLongPress={() => showOptions(creation)}
  showMetadata
  showFavoriteButton
  onFavoriteToggle={() => toggleFavorite(creation.id)}
/>
```

### CreationFilterBar

```tsx
import { CreationFilterBar } from '@umituz/react-native-ai-generation-content';

<CreationFilterBar
  filters={filters}
  onFiltersChange={setFilters}
  availableTypes={['image', 'video', 'audio']}
  availableFeatures={['text-to-image', 'face-swap', 'style-transfer']}
  availableTags={['portrait', 'landscape', 'artistic']}
/>
```

## Filtering Examples

### Filter by Type

```tsx
setFilters({
  type: 'image',
});
```

### Filter by Feature

```tsx
setFilters({
  featureType: 'text-to-image',
});
```

### Filter by Date Range

```tsx
setFilters({
  dateFrom: new Date('2024-01-01'),
  dateTo: new Date('2024-12-31'),
});
```

### Filter by Tags

```tsx
setFilters({
  tags: ['portrait', 'artistic'],
});
```

### Filter by Favorites

```tsx
setFilters({
  isFavorite: true,
});
```

### Sort Options

```tsx
setFilters({
  sortBy: 'createdAt',
  sortOrder: 'desc', // Newest first
});
```

## Advanced Usage

### Custom Storage Backend

```tsx
import { CreationsRepository } from '@umituz/react-native-ai-generation-content';

class CustomCreationsRepository extends CreationsRepository {
  async save(creation: Creation): Promise<void> {
    // Custom save logic (e.g., to your own backend)
    await api.post('/creations', creation);
  }

  async getAll(filters: CreationsFilter): Promise<Creation[]> {
    // Custom fetch logic
    const response = await api.get('/creations', { params: filters });
    return response.data;
  }
}
```

### Batch Operations

```tsx
import { batchDeleteCreations, batchUpdateTags } from '@umituz/react-native-ai-generation-content';

// Delete multiple creations
await batchDeleteCreations(['id1', 'id2', 'id3']);

// Update tags for multiple creations
await batchUpdateTags({
  creationIds: ['id1', 'id2', 'id3'],
  tags: ['portrait', 'professional'],
  mode: 'replace', // 'replace' | 'append' | 'remove'
});
```

### Export Creations

```tsx
import { exportCreations, exportCreationMetadata } from '@umituz/react-native-ai-generation-content';

// Export creations to ZIP
const zipFile = await exportCreations({
  creationIds: ['id1', 'id2', 'id3'],
  includeMetadata: true,
  format: 'zip',
});

// Export metadata as JSON
const metadata = await exportCreationMetadata({
  creationIds: ['id1', 'id2', 'id3'],
  format: 'json',
});
```

## Best Practices

1. **Metadata**: Always save relevant metadata for future reference
2. **Tagging**: Use consistent tagging for easy organization
3. **Cleanup**: Regularly clean up unwanted creations
4. **Backup**: Implement backup for important creations
5. **Privacy**: Respect user privacy when storing creations

## Related Features

- [Prompts](../prompts) - AI prompt management
- [Content Moderation](../content-moderation) - Content moderation
- [Face Detection](../face-detection) - Face detection API

## License

MIT
