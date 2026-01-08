# Creations Domain

Gallery and management system for AI-generated content.

## 📍 Import Path

```typescript
import {
  useCreations,
  useCreationDetails,
  useCreationActions,
  saveCreation,
  CreationsGallery,
  CreationCard
} from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/domains/creations/`

## 🎯 Domain Purpose

Comprehensive system for managing AI-generated content. Store, organize, filter, and share AI creations across all generation types with gallery views, favorites, metadata management, and advanced filtering capabilities.

---

## 📋 Usage Strategy

### When to Use This Domain

✅ **Use Cases:**
- Storing AI-generated images, videos, audio
- Building creation galleries
- Organizing content with tags/filters
- Sharing creations to social media
- Managing user content libraries

❌ **When NOT to Use:**
- Replacing cloud storage (use proper backend)
- Storing large files locally only
- Real-time collaboration (use specialized tools)
- Content delivery (use CDN)

### Implementation Strategy

1. **Save creations** immediately after generation
2. **Organize with tags** for easy filtering
3. **Implement filtering** by type, date, feature
4. **Add gallery view** for browsing
5. **Enable sharing** to social platforms
6. **Track metadata** for all creations
7. **Implement favorites** for easy access

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Storage Requirements
- **MUST** save creations immediately after generation
- **MUST** store metadata with creations
- **MUST** implement proper error handling
- **MUST** handle storage limits
- **MUST** implement cleanup for old creations

### 2. Organization
- **MUST** tag creations properly
- **MUST** organize by type and feature
- **MUST** enable filtering and sorting
- **MUST** implement search functionality
- **MUST** support favorites

### 3. Performance
- **MUST** implement lazy loading
- **MUST** cache thumbnails
- **MUST** paginate large galleries
- **MUST** optimize image loading
- **MUST** handle large datasets

### 4. User Experience
- **MUST** provide clear gallery UI
- **MUST** enable quick actions
- **MUST** show creation metadata
- **MUST** implement sharing functionality
- **MUST** support deletion and management

### 5. Privacy & Security
- **MUST** respect user privacy
- **MUST** implement proper permissions
- **MUST** secure sensitive content
- **MUST** handle user data properly
- **MUST** comply with regulations

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Metadata**
   - Always save generation parameters
   - Never save without context
   - Track prompt, model, settings

2. **No Poor Organization**
   - Always tag and categorize
   - Never dump all creations together
   - Implement proper filtering

3. **No Performance Issues**
   - Never load all creations at once
   - Always implement pagination
   - Cache thumbnails efficiently

4. **No Data Loss**
   - Never delete without user action
   - Always confirm deletions
   - Implement backup/restore

5. **No Privacy Violations**
   - Never expose private content
   - Always check permissions
   - Implement proper access control

6. **No Blocking UI**
   - Never block on large operations
   - Always show progress
   - Implement background processing

7. **No Missing Context**
   - Always show when/what created
   - Display generation parameters
   - Provide creation history

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

#### Prompt Template for AI Agents

```
You are implementing creation management using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import creation management functions
2. Save creations immediately after generation
3. Organize with tags and metadata
4. Implement filtering and sorting
5. Add gallery view with lazy loading
6. Enable sharing functionality
7. Handle deletions properly
8. Optimize for performance

CRITICAL RULES:
- MUST save with complete metadata
- MUST organize by type and feature
- MUST implement pagination/lazy loading
- MUST provide clear gallery UI
- MUST handle large datasets efficiently
- MUST respect user privacy

CREATION TYPES:
- Image: Generated images
- Video: Generated videos
- Audio: Generated audio

FILTERING OPTIONS:
- type: image | video | audio | all
- featureType: text-to-image | face-swap | etc.
- tags: Custom tags array
- dateFrom/dateTo: Date range
- isFavorite: Boolean filter
- sortBy: createdAt | updatedAt
- sortOrder: asc | desc

ACTIONS:
- saveToGallery: Save to device
- shareToSocialMedia: Share to platforms
- download: Download to device
- delete: Remove creation
- duplicate: Copy creation
- exportMetadata: Export metadata

STRICTLY FORBIDDEN:
- No missing metadata
- No poor organization
- No performance issues
- No data loss
- No privacy violations
- No blocking UI
- No missing context

QUALITY CHECKLIST:
- [ ] Creations saved with metadata
- [ ] Tags and categories implemented
- [ ] Filtering and sorting working
- [ ] Gallery with lazy loading
- [ ] Sharing functionality
- [ ] Delete with confirmation
- [ ] Performance optimized
- [ ] Privacy protected
- [ ] Error handling
- [ ] User feedback
```

---

## 🛠️ Configuration Strategy

### Creation Structure

```typescript
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

### Filter Options

```typescript
interface CreationsFilter {
  type?: 'image' | 'video' | 'audio' | 'all';
  featureType?: string;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  isFavorite?: boolean;
  sortBy?: 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
```

---

## 📊 Core Components

### Hooks
- `useCreations` - Main gallery management
- `useCreationDetails` - Individual creation details
- `useCreationActions` - Actions (save, share, delete)

### Components
- `CreationsGallery` - Gallery grid view
- `CreationCard` - Individual creation card
- `CreationFilterBar` - Filter controls

### Repositories
- `CreationsRepository` - Data access layer
- Custom repositories supported

---

## 🎨 Best Practices

### Metadata
- Save all generation parameters
- Include prompt, model, settings
- Track creation timestamp
- Store feature-specific data

### Organization
- Use consistent tagging
- Categorize by feature type
- Enable smart collections
- Implement search

### Performance
- Lazy load galleries
- Cache thumbnails
- Paginate large datasets
- Optimize image loading
- Background operations

---

## 🐛 Common Pitfalls

❌ **Missing metadata**: Always save context
❌ **Poor performance**: Implement pagination
❌ **No organization**: Tag and filter properly
❌ **Data loss**: Confirm deletions, backup
❌ **Privacy issues**: Check permissions

---

## 📚 Related Domains

- [Prompts](../prompts) - AI prompt management
- [Content Moderation](../content-moderation) - Content moderation
- [Face Detection](../face-detection) - Face detection API

---

**Last Updated**: 2025-01-08
**Version**: 2.0.0 (Strategy-based Documentation)
