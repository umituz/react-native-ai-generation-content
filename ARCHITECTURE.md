# Architecture

Clean Architecture and Domain-Driven Design for `@umituz/react-native-ai-generation-content`.

## 🎯 Architecture Purpose

Provide maintainable, scalable structure for AI generation features. Focus on separation of concerns, dependency inversion, and provider-agnostic design. Enable easy addition of new features and providers without modifying core logic.

---

## 📋 Architecture Strategy

### When to Use This Architecture

✅ **Use Cases:**
- Building AI-powered content generation features
- Supporting multiple AI providers
- Maintaining clean separation between layers
- Enabling feature addition without core changes
- Testing components in isolation

❌ **When NOT to Use:**
- Simple, single-feature apps (overhead too high)
- Projects with no external dependencies
- Rapid prototyping without long-term maintenance needs

### Architecture Strategy

1. **Follow Clean Architecture** principles strictly
2. **Maintain layer separation** at all times
3. **Depend on abstractions** not implementations
4. **Keep domain layer pure** (no external dependencies)
5. **Use dependency injection** for services
6. **Implement provider pattern** for AI services
7. **Apply middleware pattern** for cross-cutting concerns

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Layer Separation
- **MUST** maintain clear boundaries between layers
- **MUST** have dependencies point inward only
- **MUST NOT** let outer layers know about inner layers
- **MUST** define interfaces in domain layer
- **MUST** implement interfaces in infrastructure

### 2. Domain Layer Purity
- **MUST** keep domain layer free of external dependencies
- **MUST** define all interfaces in domain
- **MUST** contain business logic in domain
- **MUST NOT** import from infrastructure in domain
- **MUST NOT** import from presentation in domain

### 3. Dependency Direction
- **MUST** depend on abstractions (interfaces)
- **MUST NOT** depend on concrete implementations
- **MUST** use dependency injection
- **MUST** configure services at app startup
- **MUST** access services through interfaces

### 4. Feature Organization
- **MUST** organize features by domain
- **MUST** keep features independent
- **MUST** minimize coupling between features
- **MUST** share code through common modules
- **MUST** maintain consistent structure

### 5. Type Safety
- **MUST** use strict TypeScript configuration
- **MUST** define types for all interfaces
- **MUST** avoid `any` types
- **MUST** provide comprehensive type definitions
- **MUST** export types from index files

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Layer Violations**
   - Never import inner layers from outer layers
   - Never bypass abstraction layers
   - Never mix concerns across layers
   - Always respect layer boundaries

2. **No Hard Dependencies**
   - Never hardcode service implementations
   - Never directly instantiate providers
   - Always use dependency injection
   - Always configure externally

3. **No Domain Pollution**
   - Never add external dependencies to domain
   - Never put infrastructure code in domain
   - Never put UI code in domain
   - Keep domain pure

4. **No Circular Dependencies**
   - Never create circular imports
   - Always structure dependencies hierarchically
   - Use interfaces to break cycles

5. **No Concrete Dependencies**
   - Never depend on concrete classes
   - Always depend on interfaces
   - Use abstractions

6. **No Leaky Abstractions**
   - Never expose implementation details
   - Always hide behind interfaces
   - Maintain encapsulation

7. **No Missing Abstractions**
   - Never skip interface definition
   - Always program to interfaces
   - Define contracts explicitly

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

#### Prompt Template for AI Agents

```
You are implementing architecture features using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Follow Clean Architecture principles
2. Maintain layer separation (domain, infrastructure, presentation)
3. Depend on abstractions not implementations
4. Use dependency injection
5. Implement provider pattern for AI services
6. Apply middleware pattern for cross-cutting concerns
7. Keep domain layer pure

CRITICAL RULES:
- MUST maintain layer boundaries
- MUST keep domain layer free of external dependencies
- MUST use interfaces for all services
- MUST configure services at app startup
- MUST organize features by domain
- MUST avoid circular dependencies
- MUST use strict TypeScript

LAYER STRUCTURE:
- domain/: Core business logic, interfaces, entities
- infrastructure/: External concerns, implementations, services
- presentation/: UI components, hooks, screens
- domains/: Shared domains (prompts, moderation, creations, face-detection)
- features/: Individual AI features (25+ features)

DEPENDENCY DIRECTION:
- Presentation → Infrastructure → Domain
- Never: Domain → Infrastructure
- Never: Domain → Presentation

FEATURE STRUCTURE:
features/feature-name/
├── domain/         # Feature-specific types, constants
├── infrastructure/  # Feature services
├── presentation/    # Feature hooks, components
├── index.ts         # Public API exports
└── README.md        # Feature documentation

STRICTLY FORBIDDEN:
- No layer violations
- No hard dependencies
- No domain pollution
- No circular dependencies
- No concrete dependencies
- No leaky abstractions
- No missing abstractions

QUALITY CHECKLIST:
- [ ] Layer separation maintained
- [ ] Domain layer pure
- [ ] Dependencies point inward
- [ ] Interfaces defined
- [ ] Dependency injection used
- [ ] Provider pattern applied
- [ ] Middleware implemented
- [ ] Features independent
- [ ] Types comprehensive
- [ ] No circular imports
```

---

## 🏗️ Architecture Overview

### Clean Architecture Layers

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

### Directory Structure

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

---

## 🎯 Core Layers

### Domain Layer

**Purpose:**
- Define core interfaces and types
- No external dependencies
- Framework-agnostic
- Business logic only

**Key Components:**
- Interfaces for services and providers
- Domain entities and enums
- Error types
- Generation types

**Rules:**
- Pure TypeScript, no external imports
- All interfaces defined here
- Business logic lives here

### Infrastructure Layer

**Purpose:**
- Implement interfaces from domain layer
- Handle external dependencies
- Provide concrete implementations
- Coordinate with external APIs

**Key Components:**
- Configuration services
- Middleware chain
- AI orchestration
- Provider implementations
- Utility functions
- API wrappers

**Rules:**
- Depends on domain interfaces
- Implements domain contracts
- Manages external concerns

### Presentation Layer

**Purpose:**
- Render UI
- Handle user interactions
- Use infrastructure to execute business logic
- Display state and progress

**Key Components:**
- Feature hooks
- UI components
- Screen layouts
- Progress modals
- Input forms

**Rules:**
- Depends on infrastructure
- No business logic
- State management only

---

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

**Feature Organization Strategy:**
- Each feature is self-contained
- Minimal coupling between features
- Shared code in common modules
- Consistent structure across features

---

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

**Flow Strategy:**
1. User triggers action through UI
2. Hook captures action and state
3. Infrastructure service coordinates
4. Middleware chain processes (credits, history, moderation)
5. Provider executes API call
6. Result flows back through chain
7. UI updates with result

---

## 🔌 Architecture Patterns

### Provider Pattern

**Purpose:** Support multiple AI providers

**Strategy:**
- Define provider interface in domain
- Implement per provider (OpenAI, Google, Stability AI)
- Register providers at startup
- Execute through interface
- Add providers without modifying core

**Benefits:**
- Provider-agnostic
- Easy to add new providers
- Testable with mocks
- Fallback capabilities

### Middleware Pattern

**Purpose:** Cross-cutting concerns before/after execution

**Strategy:**
- Define middleware interface
- Implement middleware functions
- Chain middleware in order
- Execute before/after provider
- Handle errors in chain

**Common Middleware:**
- Credit checking
- History tracking
- Content moderation
- Analytics logging
- Error transformation

**Benefits:**
- Separation of concerns
- Reusable across features
- Composable behavior
- Easy to extend

### Repository Pattern

**Purpose:** Data access abstraction

**Strategy:**
- Define repository interfaces
- Implement per data source
- Use domain types for data
- Hide implementation details
- Enable testing with fakes

**Repositories:**
- Creations repository
- Prompts repository
- History repository

**Benefits:**
- Testable
- Swappable implementations
- Consistent API
- Error handling centralized

### Factory Pattern

**Purpose:** Create complex objects

**Strategy:**
- Define factory interfaces
- Implement factories for complex types
- Encapsulate creation logic
- Hide construction complexity
- Provide defaults

**Factories:**
- Generation wrapper factory
- Provider factory
- Middleware factory

**Benefits:**
- Centralized creation
- Consistent objects
- Easy to configure
- Testable

---

## 🧩 Dependency Injection

**Purpose:** Provide dependencies rather than hardcode

**Strategy:**
- Configure services at app startup
- Define service interfaces
- Inject services through hooks
- Use service locator pattern
- Enable testing with mocks

**Configuration:**
- Import configuration function
- Provide service implementations
- Register providers
- Configure middleware
- Set up repositories

**Benefits:**
- Testable
- Flexible
- Decoupled
- Configurable

---

## 🎨 Design Principles

### 1. Separation of Concerns

**Principle:** Each layer has a specific responsibility

**Application:**
- Domain: Business logic
- Infrastructure: External concerns
- Presentation: UI

### 2. Dependency Inversion

**Principle:** Depend on abstractions, not implementations

**Application:**
- Define interfaces in domain
- Implement in infrastructure
- Inject dependencies
- Use abstractions throughout

### 3. Single Responsibility

**Principle:** Each module has one reason to change

**Application:**
- One responsibility per module
- Functions do one thing
- Classes have single purpose
- Clear reasons to change

### 4. Open/Closed

**Principle:** Open for extension, closed for modification

**Application:**
- Add providers without changing core
- Add features without modifying existing
- Extend through interfaces
- Plugin architecture

### 5. DRY (Don't Repeat Yourself)

**Principle:** Shared code in common modules

**Application:**
- Shared utilities
- Common patterns
- Reusable components
- DRY hooks

---

## 🔐 Security & Privacy Architecture

### API Key Management

**Strategy:**
- Never store in code
- Use environment variables
- Implement rotation
- Secure storage
- Backend proxy recommended

### Content Moderation

**Strategy:**
- Filter input prompts
- Moderate generated content
- Implement reporting
- Configurable rules
- Audit logging

### User Data Protection

**Strategy:**
- Anonymize analytics
- Secure storage
- GDPR compliance
- Data minimization
- Right to deletion

---

## 🚀 Performance Architecture

### Lazy Loading

**Strategy:**
- Load features on demand
- Code splitting by feature
- Dynamic imports
- Reduce initial bundle

### Caching Strategy

**Strategy:**
- Cache provider responses
- Store generated content
- Invalidate appropriately
- Respect TTL
- Handle stale data

### Background Processing

**Strategy:**
- Run generations in background
- Show progress updates
- Handle app backgrounding
- Resume on foreground
- Queue management

### Memoization

**Strategy:**
- Memoize expensive computations
- Reuse component renders
- Cache selectors
- Optimize re-renders

---

## 📏 Code Organization Best Practices

### Feature Independence

**Strategy:**
- Each feature self-contained
- Minimal coupling
- Shared code in common
- Clear boundaries
- Independent testing

### Type Safety

**Strategy:**
- Strict TypeScript config
- No `any` types
- Comprehensive definitions
- Export types
- Type checking in CI

### Error Handling

**Strategy:**
- Consistent error types
- Proper propagation
- User-friendly messages
- Error classification
- Recovery strategies

---

## 🧪 Testing Architecture

### Unit Tests

**Strategy:**
- Test pure functions
- Mock external dependencies
- Focus on business logic
- Test domain layer thoroughly
- Fast execution

### Integration Tests

**Strategy:**
- Test feature integration
- Test with real providers (staging)
- Test error scenarios
- Test middleware chains
- Test data flows

### E2E Tests

**Strategy:**
- Test user flows
- Test with real UI
- Test critical paths
- Test error handling
- Test performance

---

## 📚 Further Reading

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [React Native Best Practices](https://reactnative.dev/docs/getting-started)

---

**Version**: 2.0.0 (Strategy-based Documentation)
**Last Updated**: 2025-01-08
