# Prompts Domain

AI prompt management and generation system for AI features.

## 📍 Import Path

```typescript
import {
  usePromptGeneration,
  useTemplateRepository,
  PromptGenerationService,
  AIPromptTemplate
} from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/domains/prompts/`

## 🎯 Domain Purpose

Comprehensive system for managing, generating, and templating AI prompts across all AI generation features. Includes prompt history tracking, template management, and AI service processing with type safety and extensibility.

---

## 📋 Usage Strategy

### When to Use This Domain

✅ **Use Cases:**
- Managing prompt templates for AI features
- Tracking prompt generation history
- Customizing prompts for specific use cases
- Analyzing prompt effectiveness
- Reusing successful prompts

❌ **When NOT to Use:**
- Bypassing prompt engineering (still important!)
- Ignoring prompt optimization
- Over-templating (lose flexibility)
- Not tracking prompt performance

### Implementation Strategy

1. **Create templates** for common use cases
2. **Organize templates** by category/feature
3. **Track prompt history** for analytics
4. **A/B test prompts** for effectiveness
5. **Iterate on templates** based on results
6. **Document prompt patterns**
7. **Share successful prompts**

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Template Management
- **MUST** organize templates by feature/category
- **MUST** use clear variable names
- **MUST** document template purpose
- **MUST** version templates properly
- **MUST** test templates before deployment

### 2. Prompt History
- **MUST** track all generated prompts
- **MUST** log generation parameters
- **MUST** record success/failure rates
- **MUST** enable prompt analytics
- **MUST** implement history cleanup

### 3. Type Safety
- **MUST** use TypeScript for all templates
- **MUST** define proper interfaces
- **MUST** validate prompt variables
- **MUST** handle type conversions
- **MUST** avoid `any` types

### 4. Performance
- **MUST** cache frequently used templates
- **MUST** optimize prompt generation
- **MUST** implement lazy loading
- **MUST** handle concurrent requests
- **MUST NOT** store excessive history

### 5. Best Practices
- **MUST** use descriptive variable names
- **MUST** provide fallback values
- **MUST** validate user input
- **MUST** escape special characters
- **MUST** handle edge cases

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Hardcoded Prompts**
   - Always use templates
   - Never hardcode prompt text
   - Centralize prompt management

2. **No Undefined Variables**
   - Always validate template variables
   - Provide fallback values
   - Handle missing variables gracefully

3. **No Excessive History**
   - Clean up old prompt history
   - Implement retention policies
   - Archive old prompts periodically

4. **No Duplicate Templates**
   - Reuse existing templates
   - Don't recreate similar templates
   - Consolidate when possible

5. **No Poor Variable Names**
   - Use clear, descriptive names
   - Avoid abbreviations
   - Follow naming conventions

6. **No Missing Validation**
   - Always validate user input
   - Sanitize prompt variables
   - Prevent injection attacks

7. **No Undefined Behavior**
   - Document template behavior
   - Handle edge cases
   - Provide clear error messages

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

#### Prompt Template for AI Agents

```
You are implementing prompt management using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import prompt management functions
2. Create and organize prompt templates
3. Track prompt generation history
4. Use hooks for prompt generation
5. Validate prompt variables
6. Implement caching for performance
7. Test prompts thoroughly
8. Document template patterns

CRITICAL RULES:
- MUST organize templates by feature/category
- MUST use clear variable names
- MUST validate template variables
- MUST provide fallback values
- MUST track prompt history
- MUST implement history cleanup

TEMPLATE STRUCTURE:
- id: Unique identifier
- name: Descriptive name
- template: Prompt template with {variables}
- variables: Array of variable names
- category: Feature category

HOOKS:
- usePromptGeneration: Generate prompts from templates
- useTemplateRepository: Manage templates
- useFaceSwap: Face swap prompts
- usePhotoRestoration: Restoration prompts
- useStyleTransfer: Style transfer prompts

BEST PRACTICES:
- Organize templates by category
- Use descriptive variable names
- Provide fallback values
- Validate user input
- Track prompt history
- Test thoroughly

STRICTLY FORBIDDEN:
- No hardcoded prompts
- No undefined variables
- No excessive history
- No duplicate templates
- No poor variable names
- No missing validation
- No undefined behavior

QUALITY CHECKLIST:
- [ ] Templates organized
- [ ] Variables validated
- [ ] Fallback values provided
- [ ] History tracked
- [ ] Caching implemented
- [ ] Error handling
- [ ] Documentation complete
- [ ] Testing done
- [ ] Performance optimized
- [ ] Type safety maintained
```

---

## 🛠️ Configuration Strategy

### Template Structure

```typescript
interface AIPromptTemplate {
  id: string;
  name: string;
  template: string; // "Create {style} image of {subject}"
  variables: string[]; // ['style', 'subject']
  category: string;
  metadata?: {
    author?: string;
    version?: string;
    [key: string]: any;
  };
}
```

### Feature-Specific Configs

**FaceSwapConfig**
```typescript
{
  enhanceFace: boolean;
  matchSkinTone: boolean;
}
```

**PhotoRestorationConfig**
```typescript
{
  removeScratches: boolean;
  fixBlur: boolean;
  colorize: boolean;
}
```

**StyleTransferConfig**
```typescript
{
  style: string; // 'oil-painting' | 'watercolor' | etc.
  intensity: number; // 0-1
}
```

---

## 📊 Core Components

### Hooks
- `usePromptGeneration` - Generate prompts from templates
- `useTemplateRepository` - Manage prompt templates
- `useFaceSwap` - Face swap prompts
- `usePhotoRestoration` - Photo restoration prompts
- `useStyleTransfer` - Style transfer prompts
- `useImageEnhancement` - Image enhancement prompts

### Services
- `PromptGenerationService` - Core prompt generation
- `AIServiceProcessor` - Process prompts through AI services

### Repositories
- `TemplateRepository` - Manage prompt templates
- `PromptHistoryRepository` - Track prompt history

---

## 🎨 Best Practices

### Template Organization
- Group by feature/category
- Use consistent naming
- Document purposes
- Version properly

### Variable Naming
- Use clear, descriptive names
- Avoid abbreviations
- Be consistent
- Provide examples

### Prompt History
- Set retention policies
- Clean up regularly
- Archive old prompts
- Analyze patterns

---

## 🐛 Common Pitfalls

❌ **Hardcoded prompts**: Use templates instead
❌ **Poor variables**: Use descriptive names
❌ **No validation**: Always validate input
❌ **Excessive history**: Implement cleanup
❌ **Duplicate templates**: Reuse existing ones

---

## 📚 Related Domains

- [Content Moderation](../content-moderation) - Moderate generated content
- [Face Detection](../face-detection) - Detect faces in images
- [Creations](../creations) - Manage AI-generated creations

---

**Last Updated**: 2025-01-08
**Version**: 2.0.0 (Strategy-based Documentation)
