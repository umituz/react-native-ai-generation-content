# Contributing

Contribution guide for `@umituz/react-native-ai-generation-content`.

## 🎯 Contributing Purpose

Enable community contributions while maintaining code quality, architectural integrity, and documentation standards. Focus on clear strategies for contributing features, fixes, and improvements.

---

## 📋 Contribution Strategy

### When to Contribute

✅ **Good Contributions:**
- Bug fixes with clear reproduction steps
- New features following architecture patterns
- Documentation improvements
- Performance optimizations
- Test coverage improvements

❌ **When NOT to Contribute:**
- Questions (use Discussions)
- Support requests (use GitHub Issues)
- Features breaking architecture (discuss first)
- Changes without tests
- Updates without documentation

### Contribution Strategy

1. **Read documentation** before starting
2. **Search issues** to avoid duplicates
3. **Discuss major changes** first
4. **Follow architecture patterns** strictly
5. **Write tests** for all changes
6. **Update documentation** with changes
7. **Use strategy-based format** for docs

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Architecture Compliance
- **MUST** follow Clean Architecture principles
- **MUST** maintain layer separation
- **MUST** depend on abstractions not implementations
- **MUST** keep domain layer pure
- **MUST** use dependency injection

### 2. Code Quality
- **MUST** follow TypeScript best practices
- **MUST** avoid `any` types
- **MUST** write tests for new code
- **MUST** maintain test coverage
- **MUST** handle errors properly

### 3. Documentation
- **MUST** update feature READMEs
- **MUST** use strategy-based format
- **MUST** include AI Agent Directions
- **MUST** document breaking changes
- **MUST** update type exports

### 4. Testing
- **MUST** add unit tests for functions
- **MUST** add integration tests for features
- **MUST** mock external dependencies
- **MUST** test error scenarios
- **MUST** ensure tests pass

### 5. Commit Standards
- **MUST** use conventional commits
- **MUST** write clear commit messages
- **MUST** reference issues
- **MUST** keep changes focused
- **MUST** not include WIP commits

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Architecture Violations**
   - Never bypass layer boundaries
   - Never add external deps to domain
   - Never mix concerns
   - Always follow established patterns

2. **No Untested Code**
   - Never commit without tests
   - Never skip error handling tests
   - Never assume external services work
   - Always test locally first

3. **No Silent Breaking Changes**
   - Never change public APIs without notice
   - Never update types without documenting
   - Always document breaking changes
   - Always update migration guide

4. **No Poor Documentation**
   - Never add code without updating docs
   - Never use code-heavy examples
   - Always follow strategy-based format
   - Always include AI directions

5. **No Vague Commits**
   - Never use "fix stuff" messages
   - Never group unrelated changes
   - Always use conventional commits
   - Always reference issues

6. **No Direct Main Commits**
   - Never commit to main branch
   - Always use feature branches
   - Always create Pull Requests
   - Always get code review

7. **No Ignored Feedback**
   - Never dismiss review comments
   - Always address concerns
   - Always update based on feedback
   - Always communicate delays

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

#### Prompt Template for AI Agents

```
You are contributing to @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Follow Clean Architecture principles
2. Maintain layer separation
3. Use strategy-based documentation
4. Add comprehensive tests
5. Follow TypeScript best practices
6. Handle errors properly
7. Update all documentation

CRITICAL RULES:
- MUST follow architecture patterns
- MUST maintain domain layer purity
- MUST avoid any types
- MUST write tests for changes
- MUST update README files
- MUST use strategy-based format
- MUST follow commit conventions

ARCHITECTURE RULES:
- Domain: No external dependencies
- Infrastructure: Implements domain interfaces
- Presentation: Uses infrastructure services
- Features: Self-contained with domain/infrastructure/presentation
- Dependencies point inward only

DOCUMENTATION FORMAT:
- Import paths only (no code examples)
- Usage strategy (when to use/not use)
- Critical rules (MUST FOLLOW)
- Prohibitions (MUST AVOID)
- AI Agent Directions (prompt templates)
- Configuration strategy
- Best practices
- Common pitfalls

TESTING REQUIREMENTS:
- Unit tests for all functions
- Integration tests for features
- Mock external dependencies
- Test error scenarios
- Maintain >80% coverage

COMMIT CONVENTIONS:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- refactor: Code refactoring
- test: Test updates
- chore: Maintenance tasks

STRICTLY FORBIDDEN:
- No architecture violations
- No untested code
- No silent breaking changes
- No poor documentation
- No vague commits
- No direct main commits
- No ignored feedback

QUALITY CHECKLIST:
- [ ] Architecture followed
- [ ] Tests added
- [ ] Documentation updated
- [ ] Types exported
- [ ] Errors handled
- [ ] Code reviewed
- [ ] All tests pass
- [ ] No warnings
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- React Native development environment
- Git

### Setup Strategy

1. **Fork the repository**
2. **Clone your fork**
3. **Install dependencies**
4. **Build the project**
5. **Run tests**

**Essential Commands:**
```bash
# Install dependencies
npm install

# Build project
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

---

## 🔄 Development Workflow

### Development Strategy

1. **Branch from main**
   - Use `feature/` for new features
   - Use `fix/` for bug fixes
   - Use `docs/` for documentation changes

2. **Make changes**
   - Follow coding standards
   - Add/update tests
   - Update documentation
   - Keep changes focused

3. **Test locally**
   - Run unit tests
   - Run integration tests
   - Check test coverage
   - Verify no warnings

4. **Commit changes**
   - Use conventional commits
   - Reference related issues
   - Write clear messages
   - Keep commits atomic

5. **Create Pull Request**
   - Describe changes clearly
   - Link related issues
   - Ensure tests pass
   - Wait for review

### Pull Request Strategy

- **Small, focused PRs** preferred
- **One PR per feature/fix**
- **Clear description** of changes
- **Link to issues** when applicable
- **All tests must pass**
- **Documentation updated**

---

## 📏 Coding Standards

### TypeScript Strategy

**Use TypeScript for all code:**
- Strict type checking enabled
- No `any` types allowed
- Interfaces for object shapes
- Type aliases for unions/primitives
- Export all public types

**Type Organization:**
- Define types in domain layer
- Export from feature index
- Document complex types
- Use generics appropriately

### Code Style Strategy

**Formatting:**
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Arrow functions for callbacks
- Trailing commas in objects/arrays

**Naming Conventions:**
- Components: PascalCase
- Functions/Variables: camelCase
- Types/Interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE
- Private members: `_camelCase`

### File Organization Strategy

**Feature Structure:**
```
features/feature-name/
├── domain/
│   ├── types.ts
│   └── constants.ts
├── infrastructure/
│   └── services.ts
├── presentation/
│   ├── hooks/
│   └── components/
├── index.ts
└── README.md
```

**Layer Organization:**
- `domain/`: Core types and interfaces
- `infrastructure/`: Services and implementations
- `presentation/`: UI components and hooks
- `features/`: Feature-specific code
- `domains/`: Shared domain modules

---

## 🧪 Testing Guidelines

### Testing Strategy

**Unit Tests:**
- Test all new functions
- Mock external dependencies
- Test error scenarios
- Use testing-library hooks
- Fast execution

**Integration Tests:**
- Test feature integration
- Test with real APIs (staging)
- Test data flows
- Test middleware chains
- Consistent fixtures

**Coverage Goals:**
- Aim for >80% coverage
- Cover critical paths
- Cover error cases
- Run coverage reports
- Monitor metrics

### Test Organization

**Test Structure:**
- Co-locate with source
- Clear test descriptions
- Arrange-Act-Assert pattern
- Descriptive assertions
- Proper cleanup

---

## 📚 Documentation Guidelines

### Documentation Strategy

**Strategy-Based Format:**
1. **Import Path** - Only code in docs
2. **Usage Strategy** - When to use/not use
3. **Critical Rules** - MUST follow (5 categories)
4. **Prohibitions** - MUST avoid (7 strict)
5. **AI Agent Directions** - Prompt templates
6. **Configuration** - Strategy not examples
7. **Best Practices** - Implementation guidance
8. **Common Pitfalls** - Problem → Solution

**Feature READMEs:**
- Every feature has README.md
- Use strategy-based format
- Include AI directions
- Document types and interfaces
- No extensive code examples

**Code Comments:**
- Document complex logic
- Use JSDoc for functions
- Explain "why" not "what"
- Keep comments current

**Type Documentation:**
- Export public types
- Comment complex types
- Document required vs optional
- Provide usage context

---

## 📤 Submitting Changes

### Pull Request Checklist

Before submitting:
- [ ] Code follows architecture
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests passing
- [ ] No console warnings
- [ ] Changes focused
- [ ] Commit messages clear
- [ ] Related issues linked

### Pull Request Template

**Description:**
- Brief description of changes
- Type of change (bug/feature/docs/breaking)
- Motivation and context
- Screenshots if applicable

**Testing:**
- How were changes tested?
- Test coverage included?
- Manual testing performed?

**Checklist:**
- Tests pass locally
- Documentation updated
- No new warnings
- Feature README updated
- Types exported

---

## 🐛 Reporting Issues

### Bug Report Strategy

**Before Reporting:**
1. Search existing issues
2. Check documentation
3. Try latest version
4. Prepare minimal reproduction

**Bug Report Contents:**
- Clear title and description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Screenshots/logs if applicable
- Minimal reproduction case

### Issue Template

**Type:** Bug / Feature / Documentation

**Description:**
Clear description of issue or feature request

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS:
- Node version:
- Package version:
- React Native version:

---

## 💡 Feature Requests

### Feature Request Strategy

**Before Requesting:**
1. Check if already requested
2. Search existing issues
3. Read documentation
4. Consider implementation complexity

**Feature Request Contents:**
- Use case description
- Proposed solution
- Alternative approaches
- Implementation complexity
- Breaking changes?
- Code examples (optional)

---

## 📧 Questions?

### Getting Help Strategy

**Before Asking:**
1. Read documentation thoroughly
2. Search existing issues
3. Check FAQ
4. Try to solve yourself

**Where to Ask:**
- **Questions**: GitHub Discussions
- **Bugs**: GitHub Issues
- **Features**: GitHub Issues
- **Security**: Private security advisory

---

## 🎉 Recognition

**Contributors receive:**
- Credit in CONTRIBUTORS.md
- Mention in release notes
- Eligibility for contributor badge
- Eternal gratitude 🙌

**Recognition Criteria:**
- Merged PRs (any size)
- Valuable issue reports
- Helpful code reviews
- Documentation improvements

---

**Version**: 2.0.0 (Strategy-based Documentation)
**Last Updated**: 2025-01-08
