# Quick Start Guide

Quick start strategy for `@umituz/react-native-ai-generation-content`.

## 🎯 Quick Start Purpose

Get users up and running with AI generation in 5 minutes. Focus on essential steps, common patterns, and quick wins while avoiding complexity.

---

## 📋 Quick Start Strategy

### Before You Start

**Prerequisites:**
- React Native project set up
- Node.js 18+ installed
- API credentials ready
- 5 minutes available

**Quick Start Path:**
1. Install package
2. Configure services
3. Use unified screen OR custom hook
4. Run app
5. Generate content

---

## ⚡ Three-Step Setup

### Step 1: Install

**Installation Command:**
```bash
npm install @umituz/react-native-ai-generation-content
```

**Strategy:**
- Use npm, yarn, or Expo
- Verify installation succeeded
- Check package.json for entry
- Proceed to configuration

### Step 2: Configure

**Configuration Strategy:**
1. Import configureAppServices
2. Call in App.tsx or root
3. Provide network service
4. Add API credentials
5. Optional: Add credit/paywall services

**Minimum Configuration:**
```typescript
import { configureAppServices } from '@umituz/react-native-ai-generation-content';

configureAppServices({
  networkService: {
    baseUrl: 'https://your-api.com',
    apiKey: 'your-api-key',
  },
});
```

**Production Configuration:**
```typescript
configureAppServices({
  networkService: {
    baseUrl: 'https://your-api.com',
    apiKey: 'your-api-key',
  },
  creditService: {
    checkCredits: async (userId, cost) => true,
    deductCredits: async (userId, cost) => {},
  },
  paywallService: {
    showPaywall: async () => true,
  },
});
```

### Step 3: Use

**Option A: Quick Start (Unified Screen)**
```typescript
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

<AIFeatureScreen
  featureId="text-to-image"
  userId="user-123"
/>
```

**Option B: Custom Hook**
```typescript
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

const feature = useTextToImageFeature({
  config: { model: 'imagen-3' },
  userId: 'user-123',
});
```

---

## ⚠️ Critical Quick Start Rules (MUST FOLLOW)

### 1. Configuration First
- **MUST** configure before using features
- **MUST** provide valid API credentials
- **MUST** set baseUrl correctly
- **MUST** handle configuration errors
- **MUST** verify configuration works

### 2. User ID Required
- **MUST** provide userId for all features
- **MUST** use unique identifier
- **MUST** be consistent across sessions
- **MUST** handle anonymous users
- **MUST** validate userId format

### 3. State Management
- **MUST** check isReady before actions
- **MUST** handle isProcessing state
- **MUST** display errors to users
- **MUST** show progress indicators
- **MUST** disable actions when processing

### 4. Error Handling
- **MUST** handle generation errors
- **MUST** display user-friendly messages
- **MUST** provide retry options
- **MUST** log errors appropriately
- **MUST** handle network failures

### 5. Best Practices
- **MUST** start with AIFeatureScreen
- **MUST** test with real API
- **MUST** verify permissions
- **MUST** handle large results
- **MUST** implement cleanup

---

## 🚫 Quick Start Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Skipping Configuration**
   - Never use features without config
   - Never provide invalid credentials
   - Always configure first
   - Always verify config

2. **No Missing User ID**
   - Never omit userId
   - Never use empty strings
   - Always provide valid ID
   - Always handle anonymous users

3. **No Ignoring State**
   - Never ignore isProcessing
   - Never skip error checking
   - Always check isReady
   - Always handle results

4. **No Blocking UI**
   - Never block on generation
   - Always show progress
   - Always allow cancellation
   - Always remain responsive

5. **No Hardcoded Values**
   - Never hardcode API keys
   - Use environment variables
   - Secure configuration
   - Protect credentials

6. **No Missing Error Handling**
   - Never assume success
   - Always catch errors
   - Always inform users
   - Always provide recovery

7. **No Premature Complexity**
   - Never start complex
   - Start simple
   - Add features gradually
   - Learn basics first

---

## 🚀 Quick Implementation Patterns

### Pattern 1: Unified Screen (Fastest)

**When to Use:**
- Quick prototypes
- MVP development
- Standard UI requirements
- Limited time

**Implementation:**
```typescript
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

function QuickApp() {
  return (
    <AIFeatureScreen
      featureId="text-to-image"
      userId="user-123"
    />
  );
}
```

**Benefits:**
- Fastest implementation
- Full-featured UI
- Built-in error handling
- Progress tracking

### Pattern 2: Custom Hook (Flexible)

**When to Use:**
- Custom UI requirements
- Branding consistency
- Specialized workflows
- Advanced features

**Implementation:**
```typescript
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

function CustomScreen() {
  const feature = useTextToImageFeature({
    config: { model: 'imagen-3' },
    userId: 'user-123',
  });

  // Build custom UI with feature.state, feature.generate()
}
```

**Benefits:**
- Full UI control
- Flexible behavior
- Custom workflows
- Brand consistency

### Pattern 3: Multiple Features

**When to Use:**
- Feature selection
- Tab-based navigation
- Multiple AI capabilities
- Rich user experience

**Implementation:**
```typescript
function MultiFeatureApp() {
  const [activeFeature, setActiveFeature] = useState('text-to-image');

  return (
    <>
      <FeatureSelector onSelect={setActiveFeature} />
      <AIFeatureScreen
        featureId={activeFeature}
        userId="user-123"
      />
    </>
  );
}
```

---

## 🎨 Common Features Quick Start

### Image Generation

**Feature ID:** `text-to-image`

**Purpose:** Generate images from text descriptions

**Quick Start:**
```typescript
<AIFeatureScreen
  featureId="text-to-image"
  userId="user-123"
/>
```

### Face Swap

**Feature ID:** `face-swap`

**Purpose:** Swap faces between images

**Quick Start:**
```typescript
<AIFeatureScreen
  featureId="face-swap"
  userId="user-123"
/>
```

**Note:** Requires 2 images (source and target)

### Photo Restoration

**Feature ID:** `photo-restoration`

**Purpose:** Restore old or damaged photos

**Quick Start:**
```typescript
<AIFeatureScreen
  featureId="photo-restoration"
  userId="user-123"
/>
```

### Background Removal

**Feature ID:** `remove-background`

**Purpose:** Remove background from images

**Quick Start:**
```typescript
<AIFeatureScreen
  featureId="remove-background"
  userId="user-123"
/>
```

---

## 🔐 Configuration Best Practices

### Environment Variables

**Strategy:**
- Create .env file
- Add to .gitignore
- Use react-native-dotenv
- Load in app initialization

**Required Variables:**
- AI_API_KEY
- AI_BASE_URL

**Example .env:**
```env
AI_API_KEY=your_api_key_here
AI_BASE_URL=https://api.example.com
```

### Service Configuration

**Development:**
- Use test API key
- Enable debug logging
- Use test endpoints
- Skip credit checks

**Production:**
- Use production API key
- Disable debug logging
- Implement credit system
- Add paywall service
- Enable analytics

---

## ✅ Verification Checklist

### Installation Verification

- [ ] Package installed successfully
- [ ] No peer dependency warnings
- [ ] TypeScript recognizes imports
- [ ] App builds without errors

### Configuration Verification

- [ ] Services configured
- [ ] API credentials valid
- [ ] Environment variables loaded
- [ ] Network requests work

### Feature Verification

- [ ] Feature screen renders
- [ ] Can trigger generation
- [ ] Progress displays correctly
- [ ] Results return successfully
- [ ] Errors handled properly

---

## 💡 Pro Tips

### Quick Wins

**Start Simple:**
- Use AIFeatureScreen first
- Test with one feature
- Verify end-to-end flow
- Then customize

**Test Thoroughly:**
- Test on real devices
- Test with slow networks
- Test error scenarios
- Verify UI responsiveness

**Optimize Early:**
- Implement debouncing
- Add loading states
- Handle large images
- Cache results when appropriate

### Common Mistakes to Avoid

**Configuration:**
- Don't skip configuration
- Don't hardcode credentials
- Don't ignore errors
- Don't forget userId

**UI/UX:**
- Don't block UI
- Don't skip progress indicators
- Don't ignore accessibility
- Don't forget error messages

**Performance:**
- Don't generate on every keystroke
- Don't load large images synchronously
- Don't ignore memory limits
- Don't skip cleanup

---

## 🎯 Next Steps

### After Quick Start

**Immediate:**
1. Explore other features
2. Customize UI
3. Add error handling
4. Implement credit system
5. Deploy to testing

**Learning Path:**
1. Read [Installation Guide](./installation.md)
2. Explore [Feature Documentation](../src/features/)
3. Read [Architecture Guide](../ARCHITECTURE.md)
4. Check [FAQ](../FAQ.md)
5. Build custom features

### Advanced Topics

**When Ready:**
- Custom providers
- Middleware chains
- Background processing
- Content moderation
- Credit system implementation

---

## 🆘 Getting Help

### Quick Issues

**Configuration Problems:**
- Check API credentials
- Verify baseUrl
- Test network connectivity
- Review console logs

**Feature Not Working:**
- Verify featureId is correct
- Check userId is provided
- Review error messages
- Test with AIFeatureScreen first

**Build Issues:**
- Clear Metro cache
- Reinstall node_modules
- Check platform setup
- Review installation guide

### Support Resources

- [Installation Guide](./installation.md) - Detailed setup
- [FAQ](../FAQ.md) - Common questions
- [Support](../SUPPORT.md) - Get help
- [Issues](https://github.com/umituz/react-native-ai-generation-content/issues) - Report bugs

---

## 📚 Additional Resources

### Documentation
- [Main README](../README.md) - Complete documentation
- [Installation](./installation.md) - Setup guide
- [Features](../src/features/) - All features
- [Architecture](../ARCHITECTURE.md) - System design

### Examples
- [Basic Examples](./examples/basic/) - Simple usage
- [Advanced Examples](./examples/advanced/) - Complex patterns
- [Integrations](./examples/integrations/) - Third-party integrations

---

**Version**: 2.0.0 (Strategy-based Documentation)
**Last Updated**: 2025-01-08

Ready to build amazing AI-powered apps! 🚀
