# Migration Guide

Strategy-based guide for migrating between versions of `@umituz/react-native-ai-generation-content`.

## 🎯 Purpose

Clear guidance for migrating between versions. Focus on breaking changes, required actions, and testing strategies. Minimize code changes while maximizing compatibility.

---

## 📋 Table of Contents

- [v1.x to v2.x](#v1x-to-v2x)
- [v2.x to v3.x](#v2x-to-v3x)
- [Common Issues](#common-issues)
- [Testing Strategy](#testing-strategy)
- [Rollback](#rollback)

---

## v1.x to v2.x

### Breaking Changes

#### 1. Hook Naming Convention

**Change**: All hooks renamed with "Feature" suffix

**Old (v1.x)**:
```typescript
useTextToImage
useFaceSwap
usePhotoRestoration
```

**New (v2.x)**:
```typescript
useTextToImageFeature
useFaceSwapFeature
usePhotoRestoreFeature
```

**Action Required**: Update all hook imports

#### 2. Configuration Structure

**Change**: Config wrapped in `config` property, userId required

**Old (v1.x)**:
```typescript
const feature = useTextToImageFeature({
  model: 'imagen-3',
  onPromptChange: (prompt) => console.log(prompt),
});
```

**New (v2.x)**:
```typescript
const feature = useTextToImageFeature({
  config: {
    model: 'imagen-3',
    onPromptChange: (prompt) => console.log(prompt),
  },
  userId: 'user-123', // Now required
});
```

**Action Required**: Wrap config in `config` property, add userId

#### 3. Result Object Structure

**Change**: Consistent structure with `success` property

**Old (v1.x)**:
```typescript
interface Result {
  imageUrl?: string;
  error?: string;
}
```

**New (v2.x)**:
```typescript
interface Result {
  success: boolean;
  imageUrl?: string;
  imageUrls?: string[];
  error?: string;
  metadata?: {
    prompt: string;
    model: string;
    timestamp: string;
  };
}
```

**Action Required**: Update result handling to check `success`

#### 4. Service Configuration

**Change**: Explicit service configuration

**Old (v1.x)**:
```typescript
configureAppServices({
  apiUrl: 'https://api.example.com',
  apiKey: 'your-key',
});
```

**New (v2.x)**:
```typescript
configureAppServices({
  networkService: {
    baseUrl: 'https://api.example.com',
    apiKey: 'your-key',
    timeout: 30000,
  },
  creditService: {
    checkCredits: async (userId, cost) => { /* ... */ },
    deductCredits: async (userId, cost) => { /* ... */ },
  },
});
```

**Action Required**: Update configuration structure

---

### New Features (v2.x)

#### Unified AI Feature Screen

**New component** for quick feature integration:

```typescript
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

<AIFeatureScreen
  featureId="text-to-image"
  userId="user-123"
/>
```

#### Content Moderation

**New domain** for content filtering:

```typescript
import { ModerationWrapper } from '@umituz/react-native-ai-generation-content';

const wrapper = new ModerationWrapper({
  enabled: true,
  onViolation: (result) => {
    Alert.alert('Content Warning', result.warning);
  },
});
```

#### Creations Gallery

**New domain** for content management:

```typescript
import { useCreations } from '@umituz/react-native-ai-generation-content';

const { creations, loadMore } = useCreations({
  userId: 'user-123',
  type: 'image',
});
```

---

### Migration Steps (v1.x → v2.x)

**Step 1**: Update package.json
```json
{
  "dependencies": {
    "@umituz/react-native-ai-generation-content": "^2.0.0"
  }
}
```

**Step 2**: Update hook names (automated)
```bash
find . -name "*.tsx" -type f -exec sed -i 's/useTextToImage/useTextToImageFeature/g' {} \;
find . -name "*.tsx" -type f -exec sed -i 's/useFaceSwap/useFaceSwapFeature/g' {} \;
```

**Step 3**: Update config objects
```typescript
// Wrap in config property
const feature = useFeature({
  config: { /* options */ },
  userId: 'user-123',
});
```

**Step 4**: Update result handling
```typescript
if (result.success) {
  console.log(result.imageUrl);
} else {
  console.error(result.error);
}
```

**Step 5**: Configure services
```typescript
configureAppServices({
  networkService: { /* ... */ },
  creditService: { /* ... */ },
});
```

---

## v2.x to v3.x

### Breaking Changes

#### 1. Provider Registration

**Change**: Explicit capabilities declaration required

**Old (v2.x)**:
```typescript
providerRegistry.registerProvider({
  id: 'my-provider',
  execute: async (request) => { /* ... */ },
});
```

**New (v3.x)**:
```typescript
providerRegistry.registerProvider({
  id: 'my-provider',
  name: 'My Provider',
  capabilities: {
    textToImage: true,
    textToVideo: false,
    imageToImage: true,
    // Declare all capabilities
  },
  execute: async (request) => { /* ... */ },
});
```

**Action Required**: Add capabilities to provider registration

#### 2. Generation Options

**Change**: Explicit types for options

**Old (v2.x)**:
```typescript
await feature.generate({
  style: 'oil-painting',
  intensity: 0.8,
});
```

**New (v3.x)**:
```typescript
await feature.process({
  style: 'oil-painting',
  intensity: 0.8,
  // Options are now strongly typed
});
```

**Action Required**: Use proper types, change `generate` to `process`

#### 3. Error Handling

**Change**: Specific error types

**Old (v2.x)**:
```typescript
try {
  await feature.process();
} catch (error) {
  console.error('Error:', error);
}
```

**New (v3.x)**:
```typescript
import { AIErrorType } from '@umituz/react-native-ai-generation-content';

try {
  await feature.process();
} catch (error) {
  if (error.type === AIErrorType.INSUFFICIENT_CREDITS) {
    // Handle credits
  } else if (error.type === AIErrorType.PROVIDER_ERROR) {
    // Handle provider error
  }
}
```

**Action Required**: Use specific error types

---

### Migration Steps (v2.x → v3.x)

**Step 1**: Update provider registrations
```typescript
providerRegistry.registerProvider({
  capabilities: {
    textToImage: true,
    faceSwap: true,
  },
});
```

**Step 2**: Update generation calls
```typescript
await feature.process(options);
```

**Step 3**: Update error handling
```typescript
if (error.type === AIErrorType.INSUFFICIENT_CREDITS) {
  // Handle
}
```

---

## Common Issues

### "userId is required"

**Cause**: userId not provided to feature hook

**Solution**:
```typescript
const feature = useFeature({
  config: { /* ... */ },
  userId: 'user-123', // Add this
});
```

### "Network service not configured"

**Cause**: Services not configured

**Solution**:
```typescript
configureAppServices({
  networkService: {
    baseUrl: 'https://api.example.com',
    apiKey: 'your-key',
  },
});
```

### Type errors with options

**Cause**: Using incorrect option types

**Solution**:
```typescript
import type { TextToImageOptions } from '@umituz/react-native-ai-generation-content';

const options: TextToImageOptions = {
  style: 'realistic',
  aspectRatio: '16:9',
};
```

---

## Testing Strategy

### Pre-Migration Testing

1. **Backup current code**
   ```bash
   git commit -m "Backup before migration"
   ```

2. **Test current functionality**
   - Document all working features
   - Record expected behavior
   - Create test cases

### Post-Migration Testing

**Test Checklist**:

1. **Configuration**
   - [ ] App services configure without errors
   - [ ] API keys load correctly
   - [ ] Network requests work

2. **Feature Hooks**
   - [ ] All hooks import correctly
   - [ ] Hooks receive proper config
   - [ ] userId is passed correctly

3. **Generation**
   - [ ] Can trigger generation
   - [ ] Progress displays correctly
   - [ ] Results return successfully

4. **Error Handling**
   - [ ] Network errors caught
   - [ ] API errors displayed
   - [ ] Insufficient credits handled

5. **UI Components**
   - [ ] Screens render correctly
   - [ ] Progress modals work
   - [ ] Results display properly

### Rollback if Needed

```bash
# Install previous version
npm install @umituz/react-native-ai-generation-content@1.17.228

# Revert code changes
git checkout HEAD~1

# Reinstall dependencies
npm install
```

---

## Version Compatibility

| Version | React Native | TypeScript | Status      |
|---------|--------------|------------|-------------|
| 1.x     | 0.60+        | 4.0+       | Deprecated  |
| 2.x     | 0.65+        | 4.5+       | Maintained  |
| 3.x     | 0.70+        | 5.0+       | Latest      |

---

## Best Practices

### Migration Strategy

1. **Plan migration** carefully
2. **Test thoroughly** after each step
3. **Use version control** for easy rollback
4. **Update documentation** as you go
5. **Communicate changes** to team

### Testing Strategy

1. **Unit tests** for feature hooks
2. **Integration tests** for flows
3. **E2E tests** for critical paths
4. **Manual testing** for UI

---

## Need Help?

- **GitHub Issues**: [Report Issue](https://github.com/umituz/react-native-ai-generation-content/issues)
- **Documentation**: [README.md](./README.md)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **FAQ**: [FAQ.md](./FAQ.md)

---

**Version**: 2.0.0 (Strategy-based Documentation)
**Last Updated**: 2025-01-08
