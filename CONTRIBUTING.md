# Contributing to @umituz/react-native-ai-generation-content

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Submitting Changes](#submitting-changes)

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Be constructive, respectful, and collaborative.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- React Native development environment
- Git

### Fork and Clone

```bash
# Fork the repository
git clone https://github.com/YOUR_USERNAME/react-native-ai-generation-content.git
cd react-native-ai-generation-content
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Build the Project

```bash
npm run build
# or
yarn build
```

## 🔄 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Write clear, concise code
- Follow coding standards (see below)
- Add tests for new functionality
- Update documentation

### 3. Test Your Changes

```bash
npm run test
# or
yarn test
```

### 4. Commit Changes

Use clear commit messages:

```bash
git commit -m "feat: add new text-to-video feature"
git commit -m "fix: resolve crash in face swap"
git commit -m "docs: update README with new examples"
```

Commit message prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📏 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types - use proper type definitions
- Use interfaces for object shapes
- Use type aliases for unions and primitives

```tsx
// ✅ Good
interface UserConfig {
  name: string;
  age: number;
}

type UserRole = 'admin' | 'user' | 'guest';

// ❌ Bad
const user: any = {};
```

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons
- Use arrow functions for callbacks

```tsx
// ✅ Good
const handleClick = () => {
  console.log('Clicked');
};

// ❌ Bad
function handleClick() {
  console.log('Clicked')
}
```

### Naming Conventions

- **Components**: PascalCase
```tsx
const MyComponent = () => { ... };
```

- **Functions/Variables**: camelCase
```tsx
const handleClick = () => { ... };
let userName = 'John';
```

- **Types/Interfaces**: PascalCase
```tsx
interface UserConfig { ... }
type UserRole = 'admin' | 'user';
```

- **Constants**: UPPER_SNAKE_CASE
```tsx
const MAX_UPLOAD_SIZE = 10485760;
```

### File Organization

```
src/
├── domain/              # Core types and interfaces
│   ├── interfaces.ts
│   └── entities/
├── infrastructure/      # Services and implementations
│   ├── config/
│   ├── services/
│   └── utils/
├── presentation/        # UI components and hooks
│   ├── components/
│   ├── hooks/
│   └── layouts/
└── features/           # Feature-specific code
    └── feature-name/
        ├── domain/
        ├── infrastructure/
        └── presentation/
```

## 🧪 Testing Guidelines

### Unit Tests

- Write unit tests for all new functions
- Use `@testing-library/react-native` for component tests
- Mock external dependencies

```tsx
import { renderHook } from '@testing-library/react-native';
import { useMyFeature } from './useMyFeature';

test('returns correct initial state', () => {
  const { result } = renderHook(() => useMyFeature());
  expect(result.current.state).toEqual({ isLoading: false });
});
```

### Integration Tests

- Test feature integration points
- Test with real APIs when possible
- Use test fixtures for consistency

### Test Coverage

- Aim for >80% code coverage
- Run coverage reports:
```bash
npm run test:coverage
```

## 📚 Documentation Guidelines

### Code Comments

- Document complex logic
- Use JSDoc for functions:

```tsx
/**
 * Generates an image from a text prompt
 * @param prompt - The text description
 * @param options - Generation options
 * @returns Promise with generated image URL
 */
async function generateImage(
  prompt: string,
  options?: GenerationOptions
): Promise<string> {
  // ...
}
```

### README Files

- Every feature should have a README.md
- Include:
  - Feature description
  - Installation instructions
  - Basic usage examples
  - Configuration options
  - Use cases
  - Best practices

### Type Documentation

- Export public types
- Add comments to complex types:

```tsx
/**
 * Configuration for text-to-image generation
 */
export interface TextToImageConfig {
  /** AI model to use (default: 'imagen-3') */
  model?: string;
  /** Number of images to generate (1-4) */
  numberOfImages?: number;
}
```

## 📤 Submitting Changes

### Pull Request Checklist

Before submitting a PR:

- [ ] Code follows project standards
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests passing
- [ ] No console warnings
- [ ] Changes are focused and minimal

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How were these changes tested?

## Screenshots (if applicable)
Attach screenshots

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No new warnings
```

## 🐛 Reporting Issues

When reporting bugs:

1. Use the issue template
2. Provide minimal reproduction
3. Include environment details
4. Add screenshots/videos if applicable

## 💡 Feature Requests

For feature requests:

1. Check if already requested
2. Explain the use case
3. Provide examples
4. Consider implementation complexity

## 📧 Questions?

For questions:
- Check documentation first
- Search existing issues
- Create a discussion (not an issue)

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Eligible for contributor badge

Thank you for contributing! 🙌
