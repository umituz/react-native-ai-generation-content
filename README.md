# @umituz/react-native-ai-generation-content

> Provider-agnostic AI generation orchestration for React Native

Comprehensive React Native library for AI-powered content generation. Support multiple providers with 25+ AI features including image generation, video creation, text-to-speech, face swap, and more.

## 🎯 Library Purpose

Provider-agnostic AI generation orchestration layer. Focus on business logic and user experience while handling multiple AI providers seamlessly. Clean architecture with domain-driven design for maintainable, scalable AI features.

---

## 📋 Feature Overview

### Image Generation
- **Text to Image**: Generate images from descriptions
- **Image to Image**: Transform images with prompts
- **Style Transfer**: Apply artistic styles
- **Photo Restoration**: Restore old photos
- **Upscaling**: Increase resolution
- **HD Touch Up**: Enhance quality

### Face & Person Features
- **Face Swap**: Swap faces between images
- **AI Hug**: Generate hug images (2 people)
- **AI Kiss**: Generate kiss images (2 people)
- **Couple Future**: Future predictions for couples
- **Future Prediction**: Individual future scenarios

### Video & Animation
- **Text to Video**: Generate videos from text
- **Image to Video**: Convert images to video

### Background & Editing
- **Remove Background**: Remove image backgrounds
- **Replace Background**: Replace with new background
- **Inpainting**: Fill masked areas
- **Remove Object**: Remove unwanted objects
- **Colorization**: Add color to B&W photos

### Creative & Audio
- **Meme Generator**: Create memes with text
- **Sketch to Image**: Convert sketches to images
- **Anime Selfie**: Anime style conversion
- **Audio Generation**: Generate audio content
- **Text to Voice**: Text-to-speech synthesis
- **Script Generator**: Generate content scripts

### Analysis
- **Image Captioning**: Generate image descriptions

---

## 📦 Installation

```bash
npm install @umituz/react-native-ai-generation-content
```

## 🚀 Quick Start

### Configuration

```typescript
import { configureAppServices } from '@umituz/react-native-ai-generation-content';

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

### Basic Usage

```typescript
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

const feature = useTextToImageFeature({
  config: {
    model: 'imagen-3',
    onProcessingComplete: (result) => {
      console.log('Generated:', result.imageUrl);
    },
  },
  userId: 'user-123',
});

// Use feature.state, feature.generate(), etc.
```

---

## ⚠️ Critical Rules

### MUST FOLLOW

1. **Configuration**
   - MUST configure app services before using features
   - MUST provide valid userId for tracking
   - MUST implement credit checking
   - MUST handle errors properly

2. **State Management**
   - MUST check isReady before enabling actions
   - MUST handle isProcessing state
   - MUST display progress to users
   - MUST implement error handling

3. **Performance**
   - MUST implement debouncing (300ms)
   - MUST cache results locally
   - MUST handle large files properly
   - MUST NOT block main thread

4. **Privacy & Ethics**
   - MUST obtain consent for person-based features
   - MUST implement content moderation
   - MUST comply with regulations
   - MUST provide clear usage terms

---

## 🚫 Prohibitions

### MUST AVOID

❌ **NEVER**:
- Skip configuration
- Use without userId
- Ignore error handling
- Process without user action
- Violate privacy/consent
- Block main thread
- Hardcode API keys

---

## 🤖 AI Agent Directions

When implementing with AI code generation:

```
REQUIREMENTS:
1. Import from @umituz/react-native-ai-generation-content
2. Configure app services first
3. Use feature-specific hooks
4. Implement proper state management
5. Handle errors gracefully
6. Show progress to users
7. Implement cleanup on unmount

CRITICAL RULES:
- MUST configure before using features
- MUST provide valid userId
- MUST check isReady before actions
- MUST handle isProcessing state
- MUST implement error handling
- MUST respect user privacy

FEATURE HOOKS:
- useTextToImageFeature: Image generation
- useFaceSwapFeature: Face swapping
- useTextToVoiceFeature: Text-to-speech
- useAIHugFeature: AI hug generation
- And 21+ more features

STRICTLY FORBIDDEN:
- No skipping configuration
- No missing userId
- No ignoring errors
- No auto-processing
- No privacy violations
- No blocked UI
- No hardcoded credentials
```

---

## 📚 Documentation Structure

```
@umituz/react-native-ai-generation-content/
├── src/
│   ├── features/           # 25 AI features (each with README)
│   │   ├── text-to-image/
│   │   ├── face-swap/
│   │   ├── ai-hug/
│   │   └── ...
│   ├── domains/           # Shared domains
│   │   ├── content-moderation/
│   │   ├── prompts/
│   │   ├── creations/
│   │   └── face-detection/
│   └── features/shared/   # Shared functionality
├── docs/                  # Additional documentation
├── ARCHITECTURE.md        # Architecture details
├── FAQ.md                # Common questions
└── MIGRATION_GUIDE.md    # Migration guide
```

### Feature Documentation

Each feature has comprehensive documentation:
- **Import paths** (only code in README)
- **Usage strategy** (when to use/not use)
- **Critical rules** (MUST follow)
- **Prohibitions** (MUST avoid)
- **AI agent directions** (prompt templates)
- **Configuration strategy**
- **State management**
- **Best practices**
- **Common pitfalls**

**Example**: See `src/features/text-to-image/README.md`

---

## 🎨 Architecture

### Clean Architecture

```
┌─────────────────────────────┐
│   Presentation Layer        │
│   (Components, Hooks)        │
└─────────────────────────────┘
              ↓
┌─────────────────────────────┐
│      Domain Layer           │
│   (Types, Interfaces)       │
└─────────────────────────────┘
              ↓
┌─────────────────────────────┐
│   Infrastructure Layer      │
│  (Services, Repositories)    │
└─────────────────────────────┘
```

### Key Principles

- **Separation of Concerns**: Each layer has specific responsibility
- **Dependency Inversion**: Depend on abstractions, not implementations
- **Provider Agnostic**: Support multiple AI providers
- **Type Safety**: Comprehensive TypeScript types
- **Testability**: Clean, testable code

---

## 🔐 Security & Privacy

### API Keys
- Never store in code
- Use environment variables
- Implement rotation

### Content Moderation
- Enable for user-generated content
- Configure rules appropriately
- Monitor for violations

### User Data
- Anonymize analytics
- Secure storage
- GDPR/CCPA compliance

---

## 📈 Performance

### Optimization
- Lazy load features
- Cache results
- Optimize images
- Background processing

### Best Practices
- Implement debouncing
- Use pagination
- Compress uploads
- Monitor performance

---

## 🤝 Contributing

Contributions welcome! Please:
- Follow code style
- Add tests
- Update docs
- Submit PR

See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

MIT

---

## 📞 Support

- **Issues**: GitHub Issues
- **Docs**: `/docs` folder
- **FAQ**: [FAQ.md](FAQ.md)
- **Migration**: [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)

---

**Version**: 2.0.0 (Strategy-based Documentation)
**Last Updated**: 2025-01-08
