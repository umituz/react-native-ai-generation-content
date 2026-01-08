# Architecture

This document describes the architecture of `@umituz/react-native-ai-generation-content`.

## 🏗️ Overview

The library follows **Clean Architecture** principles with a **Domain-Driven Design** approach. It's organized into layers with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  (Components, Hooks, Screens, Layouts)                  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     Domain Layer                        │
│  (Types, Interfaces, Entities)                         │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                   │
│  (Services, Repositories, APIs, Utils)                  │
└─────────────────────────────────────────────────────────┘
```

## 📁 Directory Structure

```
src/
├── domain/                    # Core domain layer
│   ├── interfaces.ts         # Core interfaces and types
│   └── entities/             # Domain entities
│
├── infrastructure/           # Infrastructure layer
│   ├── config/              # Configuration services
│   ├── middleware/          # Request/response middleware
│   ├── orchestration/       # AI generation orchestration
│   ├── services/            # Core AI services
│   ├── utils/               # Utility functions
│   └── wrappers/            # API wrappers
│
├── presentation/            # Presentation layer
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Layout components
│   ├── screens/             # Screen components
│   └── types/               # Presentation types
│
├── domains/                 # Domain-specific modules
│   ├── prompts/            # AI prompt management
│   ├── content-moderation/ # Content moderation
│   ├── creations/          # AI-generated content gallery
│   └── face-detection/     # Face detection API
│
└── features/               # Individual AI features
    ├── text-to-image/      # Each feature has:
    ├── face-swap/          # - domain/
    ├── style-transfer/     # - infrastructure/
    └── ...                 # - presentation/
```

## 🎯 Core Layers

### 1. Domain Layer

The core of the application containing business logic and types:

**Purpose:**
- Define core interfaces and types
- No external dependencies
- Framework-agnostic

**Key Files:**
```
domain/
├── interfaces.ts          # Core interfaces (IAIProvider, IAppServices)
└── entities/
    ├── generation.ts      # Generation types and enums
    ├── processing-modes.ts # Processing mode types
    └── errors.ts          # Error types
```

**Example:**
```tsx
// Core interface
export interface IAIProvider {
  id: string;
  name: string;
  capabilities: ProviderCapabilities;
  execute(request: GenerationRequest): Promise<GenerationResult>;
}

// Domain entity
export enum GenerationStatus {
  IDLE = 'idle',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
```

### 2. Infrastructure Layer

External concerns and implementations:

**Purpose:**
- Implement interfaces from domain layer
- Handle external dependencies
- Provide concrete implementations

**Key Modules:**

#### Configuration (`infrastructure/config/`)
```tsx
// App services configuration
export const configureAppServices = (services: AppServicesConfig) => {
  // Configure network, auth, analytics, etc.
};
```

#### Orchestration (`infrastructure/orchestration/`)
```tsx
// Generation orchestration
export const generationOrchestrator = {
  execute: async (request) => {
    // Coordinate generation process
  },
};
```

#### Services (`infrastructure/services/`)
```tsx
// AI generation services
export const executeImageFeature = async (options) => {
  // Execute image generation
};
```

#### Utils (`infrastructure/utils/`)
```tsx
// Utility functions
export const classifyError = (error: unknown): AIErrorType => {
  // Classify errors
};
```

### 3. Presentation Layer

UI components and hooks:

**Purpose:**
- Render UI
- Handle user interactions
- Use infrastructure to execute business logic

**Key Modules:**

#### Hooks (`presentation/hooks/`)
```tsx
// Custom hooks
export const useGeneration = (options: UseGenerationOptions) => {
  // Hook for generation
};

export const useBackgroundGeneration = () => {
  // Background generation hook
};
```

#### Components (`presentation/components/`)
```tsx
// UI components
export const GenerationProgressModal = (props) => {
  // Progress modal component
};

export const DualImagePicker = (props) => {
  // Image picker component
};
```

#### Screens (`presentation/screens/`)
```tsx
// Screen components
export const AIFeatureScreen = (props: AIFeatureScreenProps) => {
  // Unified AI feature screen
};
```

## 🎨 Feature Structure

Each AI feature follows the same structure:

```
features/feature-name/
├── domain/
│   ├── types.ts          # Feature-specific types
│   └── constants.ts      # Feature constants
├── infrastructure/
│   └── services.ts       # Feature services
├── presentation/
│   ├── hooks/            # Feature hooks
│   └── components/       # Feature components
├── index.ts              # Public API exports
└── README.md             # Feature documentation
```

**Example (Text-to-Image):**
```
features/text-to-image/
├── domain/
│   ├── types.ts          # TextToImageOptions, TextToImageResult
│   └── constants.ts      # Default styles, aspect ratios
├── infrastructure/
│   └── services.ts       # executeTextToImage()
├── presentation/
│   ├── hooks/
│   │   └── useTextToImageFeature.ts
│   └── components/
│       └── StyleSelector.tsx
├── index.ts
└── README.md
```

## 🔄 Data Flow

### Generation Request Flow

```
User Action
    │
    ▼
Presentation Hook (useGeneration)
    │
    ▼
Infrastructure Service (generationOrchestrator)
    │
    ▼
Middleware Chain (credit check, history tracking)
    │
    ▼
Provider (execute)
    │
    ▼
External API
    │
    ▼
Result Processing
    │
    ▼
UI Update
```

### Example Flow

```tsx
// 1. User interacts with UI
<Button onPress={handleGenerate} />

// 2. Presentation hook handles action
const { generate } = useGeneration({ ... });

// 3. Infrastructure service executes
const result = await generationOrchestrator.execute({ ... });

// 4. Middleware chain processes
creditMiddleware → historyMiddleware → provider

// 5. Provider calls external API
provider.execute(request)

// 6. Result flows back
result → middleware → service → hook → UI
```

## 🔌 Key Concepts

### Provider Pattern

The library uses a provider pattern for AI services:

```tsx
interface IAIProvider {
  id: string;
  capabilities: ProviderCapabilities;
  execute(request): Promise<Result>;
}

// Register providers
providerRegistry.registerProvider(openaiProvider);
providerRegistry.registerProvider(stabilityProvider);
```

### Middleware Pattern

Middleware processes requests before and after execution:

```tsx
interface GenerationMiddleware {
  before?(context: MiddlewareContext): Promise<void>;
  after?(context: MiddlewareResultContext): Promise<void>;
}

// Create middleware chain
const chain = new MiddlewareChain([
  creditMiddleware,
  historyMiddleware,
  moderationMiddleware,
]);
```

### Repository Pattern

Repositories manage data access:

```tsx
interface ICreationsRepository {
  save(creation: Creation): Promise<void>;
  getAll(filters): Promise<Creation[]>;
  getById(id: string): Promise<Creation>;
  delete(id: string): Promise<void>;
}
```

### Factory Pattern

Factories create complex objects:

```tsx
const factory = new GenerationWrapperFactory();
const wrapper = factory.create(config);
```

## 🧩 Dependency Injection

Services are injected rather than hardcoded:

```tsx
// Configure app services
configureAppServices({
  networkService: myNetworkService,
  creditService: myCreditService,
  // ...
});

// Services are available throughout
const networkService = getNetworkService();
```

## 🎯 Design Principles

### 1. Separation of Concerns
Each layer has a specific responsibility
- Domain: Business logic
- Infrastructure: External concerns
- Presentation: UI

### 2. Dependency Inversion
- Depend on abstractions (interfaces)
- Not on concrete implementations

### 3. Single Responsibility
- Each class/module has one reason to change
- Functions do one thing well

### 4. Open/Closed
- Open for extension (new providers)
- Closed for modification (core logic)

### 5. DRY (Don't Repeat Yourself)
- Shared code in utils
- Common patterns in hooks

## 🔐 Security & Privacy

### API Keys
- Never store API keys in code
- Use environment variables
- Implement key rotation

### Content Moderation
- Filter input prompts
- Moderate generated content
- Implement reporting mechanisms

### User Data
- Anonymize analytics data
- Secure storage of user content
- GDPR compliance considerations

## 🚀 Performance Optimization

### Lazy Loading
- Load feature modules on demand
- Code splitting by feature

### Caching
- Cache provider responses
- Store generated content locally

### Background Processing
- Run generations in background
- Show progress updates

### Memoization
- Memoize expensive computations
- Reuse component renders

## 📏 Code Organization Best Practices

### Feature Independence
- Each feature is self-contained
- Minimal coupling between features
- Shared code in common modules

### Type Safety
- Strict TypeScript configuration
- No `any` types
- Comprehensive type definitions

### Error Handling
- Consistent error types
- Proper error propagation
- User-friendly error messages

## 🧪 Testing Strategy

### Unit Tests
- Test pure functions
- Mock external dependencies
- Focus on business logic

### Integration Tests
- Test feature integration
- Test with real providers (staging)
- Test error scenarios

### E2E Tests
- Test user flows
- Test with real UI
- Test critical paths

## 📚 Further Reading

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [React Native Best Practices](https://reactnative.dev/docs/getting-started)
