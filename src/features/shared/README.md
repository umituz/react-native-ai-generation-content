# Shared Features

Common functionality and utilities shared across multiple AI features.

## 📍 Import Path

```typescript
import {
  useDualImageVideoProcessing,
  DualImagePicker,
  DualVideoPicker
} from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/shared/`

## 🎯 Shared Purpose

Provide reusable components, hooks, and utilities for common AI feature patterns. Focus on dual image/video processing for features requiring two inputs, with shared state management, validation, and error handling.

---

## 📋 Usage Strategy

### When to Use Shared Features

✅ **Use Cases:**
- Features requiring two images/videos
- Common state management patterns
- Shared validation logic
- Reusable UI components
- Dual input processing

❌ **When NOT to Use:**
- Single input features (use feature-specific hooks)
- Complex custom logic (build custom solution)
- Feature-specific requirements

### Implementation Strategy

1. **Identify common patterns** across features
2. **Use shared hooks** for dual processing
3. **Implement validation** consistently
4. **Handle errors** uniformly
5. **Track progress** with shared UI
6. **Reset states** properly
7. **Customize** when needed

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Dual Processing
- **MUST** validate both inputs before processing
- **MUST** handle missing inputs gracefully
- **MUST** provide clear input labels
- **MUST** implement input selection
- **MUST** check `isReady` before processing

### 2. State Management
- **MUST** track both inputs independently
- **MUST** handle processing state
- **MUST** track progress percentage
- **MUST** display errors clearly
- **MUST** reset state properly

### 3. Validation
- **MUST** validate input types
- **MUST** check file sizes
- **MUST** verify input quality
- **MUST** provide validation feedback
- **MUST** prevent invalid operations

### 4. User Experience
- **MUST** provide clear UI labels
- **MUST** show progress indicators
- **MUST** handle long operations
- **MUST** allow cancellation
- **MUST** confirm before processing

### 5. Error Handling
- **MUST** handle processing errors
- **MUST** provide user-friendly messages
- **MUST** offer retry options
- **MUST** log errors appropriately
- **MUST** recover gracefully

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Validation**
   - Always validate both inputs
   - Never process without checking
   - Provide clear validation messages

2. **No Confusing UI**
   - Always label inputs clearly
   - Never mix up source/target
   - Show which input is which

3. **No Silent Failures**
   - Always explain what went wrong
   - Never fail silently
   - Provide actionable guidance

4. **No Blocking Operations**
   - Never block main thread
   - Always show progress
   - Allow cancellation

5. **No State Leaks**
   - Always cleanup properly
   - Reset state when done
   - Clear temporary data

6. **No Missing Context**
   - Always explain what's happening
   - Show current operation
   - Provide progress feedback

7. **No Partial Processing**
   - Always complete or fail cleanly
   - Never leave partial state
   - Handle cancellation properly

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

#### Prompt Template for AI Agents

```
You are implementing dual image/video processing using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import shared processing hooks
2. Implement dual input selection
3. Validate both inputs
4. Handle processing state
5. Show progress indicators
6. Handle errors gracefully
7. Implement confirmation dialog
8. Reset state properly

CRITICAL RULES:
- MUST validate both inputs before processing
- MUST provide clear UI labels
- MUST handle missing inputs
- MUST show progress during processing
- MUST implement error handling
- MUST allow user cancellation

SHARED HOOKS:
- useDualImageVideoProcessing: Main dual processing hook
- DualImagePicker: Image selection component
- DualVideoPicker: Video selection component

CONFIGURATION:
- featureType: 'face-swap' | 'ai-hug' | 'ai-kiss' | etc.
- inputType: 'image' | 'video'
- defaultOptions: Feature-specific options
- onProcessingStart: Callback when processing starts
- onProcessingComplete: Callback when processing completes
- onError: Error callback

STATE MANAGEMENT:
- sourceImageOrVideo: First input
- targetImageOrVideo: Second input
- isProcessing: Processing state
- progress: Progress percentage (0-100)
- error: Error message if failed
- result: Processing result
- isReady: Both inputs provided and valid

VALIDATION:
- Check both inputs provided
- Verify input types match
- Validate file sizes
- Check input quality
- Provide clear feedback

STRICTLY FORBIDDEN:
- No missing validation
- No confusing UI
- No silent failures
- No blocking operations
- No state leaks
- No missing context
- No partial processing

QUALITY CHECKLIST:
- [ ] Both inputs validated
- [ ] Clear UI labels
- [ ] Progress tracking
- [ ] Error handling
- [ ] Confirmation dialog
- [ ] State reset
- [ ] Cancellation support
- [ ] User feedback
- [ ] Clean state management
- [ ] Proper cleanup
```

---

## 🛠️ Configuration Strategy

### Dual Processing Types

```typescript
type DualInputType = 'image' | 'video';

interface DualImageVideoProcessingStartData {
  sourceImageOrVideo: string; // Base64
  targetImageOrVideo: string; // Base64
  options?: Record<string, any>;
}

interface DualImageVideoResult {
  success: boolean;
  result?: {
    imageUrl?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    metadata?: Record<string, any>;
  };
  error?: string;
}
```

### Feature Config

```typescript
interface DualImageVideoFeatureConfig {
  featureType: string;
  inputType: DualInputType;
  defaultOptions?: Record<string, any>;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: DualImageVideoResult) => void;
  onError?: (error: string) => void;
}
```

---

## 📊 Features Using Shared

### Dual Image Features
- **Face Swap**: Swap faces between images
- **AI Hug**: Generate hug images
- **AI Kiss**: Generate kiss images
- **Couple Future**: Future predictions

### Shared Components
- `DualImagePicker` - Image selection UI
- `DualVideoPicker` - Video selection UI
- `DualImageVideoState` - State management

---

## 🎨 Best Practices

### Input Labeling
- "First Image/Video" vs "Second Image/Video"
- "Source" vs "Target" for swap features
- "Person 1" vs "Person 2" for couple features
- Always show which is which

### Validation
- Check both inputs present
- Validate file types
- Check file sizes
- Verify quality
- Provide clear feedback

### User Experience
- Show input previews
- Display progress clearly
- Confirm before processing
- Allow cancellation
- Explain errors clearly

---

## 🐛 Common Pitfalls

❌ **Mixed up inputs**: Clear labels, visual indicators
❌ **Missing validation**: Always check both inputs
❌ **No feedback**: Show progress, errors clearly
❌ **State issues**: Proper cleanup and reset

---

## 📚 Related Features

- [Face Swap](../face-swap) - Uses dual image processing
- [AI Hug](../ai-hug) - Uses dual image processing
- [AI Kiss](../ai-kiss) - Uses dual image processing
- [Couple Future](../couple-future) - Uses dual image processing

---

**Last Updated**: 2025-01-08
**Version**: 2.0.0 (Strategy-based Documentation)
