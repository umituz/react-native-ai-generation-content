# Scenarios Domain

**Architecture Philosophy:** Data in Apps, Mechanism in Package

## Overview

This domain provides the **mechanism** for scenario-based AI generation. Scenario **data** (prompts, titles, descriptions) lives in individual apps, not in this package.

## What This Package Provides

### ✅ Mechanism (Infrastructure)
- `ScenarioRegistry` - Register and retrieve scenarios
- `WizardConfigResolver` - Resolve wizard configuration from scenario
- `WizardInputDetector` - Detect input type (single/dual image)
- `ScenarioCategory` enum - Category definitions
- `ScenarioData` interface - Type definitions
- Category groups (TRUE_SOLO_CATEGORIES, COUPLE_CATEGORIES, etc.)

### ❌ NOT Provided (App Responsibility)
- Scenario prompts (text content)
- Scenario titles and descriptions
- Scenario translations
- App-specific scenario data

## Usage Pattern

### 1. In Main App - Define Scenario Data

```typescript
// src/config/scenarios.config.ts
import { ScenarioData, ScenarioCategory } from '@umituz/react-native-ai-generation-content';

export const APP_SCENARIOS: ScenarioData[] = [
  {
    id: 'romantic_sunset',
    category: ScenarioCategory.INTIMATE,
    title: 'Sunset Romance',
    prompt: 'A couple watching sunset on the beach, golden hour lighting...',
    inputType: 'dual', // or 'single'
    outputType: 'video', // or 'image'
    model: 'fal-ai/kling-video/v1.5/pro/image-to-video',
  },
  // ... more scenarios
];
```

### 2. Register Scenarios on App Start

```typescript
// App.tsx
import { scenarioRegistry } from '@umituz/react-native-ai-generation-content';
import { APP_SCENARIOS } from './config/scenarios.config';

scenarioRegistry.registerMultiple(APP_SCENARIOS);
```

### 3. Use Scenarios in Components

```typescript
import {
  scenarioRegistry,
  getScenarioWizardConfig
} from '@umituz/react-native-ai-generation-content';

// Get all scenarios for a category
const scenarios = scenarioRegistry.getByCategory(ScenarioCategory.INTIMATE);

// Get wizard config for a scenario
const wizardConfig = getScenarioWizardConfig('romantic_sunset');
```

## Category Groups

### TRUE_SOLO_CATEGORIES
Pure single-person categories with scenarios requiring one photo only.

### COUPLE_CATEGORIES
Couple categories with scenarios requiring two photos (dual image input).

### SINGLE_PERSON_CATEGORIES (Deprecated)
Legacy mixed categories. Use `TRUE_SOLO_CATEGORIES` for single-photo apps.

### ALL_CATEGORIES
All available categories combined.

## Folder Structure

```
src/domains/scenarios/
├── configs/               # Wizard configuration
│   ├── wizard-input-detector.ts
│   ├── wizard-config-resolver.ts
│   └── wizard-step-factories.ts
├── domain/               # Types and enums
│   ├── scenario-category.enum.ts
│   ├── category-groups.ts
│   └── scenario-ids/     # ID constants (optional)
├── infrastructure/       # Registry and utilities
│   ├── scenario-registry.ts
│   └── scenario-helpers.ts
└── README.md            # This file
```

## Design Principles

### 1. Separation of Concerns
- **Package:** Provides generic, reusable mechanisms
- **App:** Provides specific, business-logic data

### 2. No Hard-Coded Content
- Package never contains user-facing text
- All prompts, titles, descriptions in apps
- Package only provides types and infrastructure

### 3. 100+ Apps Philosophy
- One package serves all apps
- Each app has unique scenarios
- Zero code duplication across apps

## Examples

### Video Generation App (future_us_app)
```typescript
const COUPLE_SCENARIOS: ScenarioData[] = [
  {
    id: 'romantic_kiss',
    category: ScenarioCategory.INTIMATE,
    inputType: 'dual',
    outputType: 'video',
    model: 'fal-ai/kling-video/v1.5/pro/image-to-video',
    // ... data
  }
];
```

### Image Generation App (ai_portrait_generator)
```typescript
const SOLO_SCENARIOS: ScenarioData[] = [
  {
    id: 'fantasy_warrior',
    category: ScenarioCategory.SOLO_FANTASY,
    inputType: 'single',
    outputType: 'image',
    model: 'fal-ai/flux/dev',
    // ... data
  }
];
```

## Migration Guide

### From Package Data to App Data

**Before (Wrong):**
```typescript
// Package contained scenario data
import { ROMANTIC_SCENARIOS } from '@umituz/react-native-ai-generation-content';
```

**After (Correct):**
```typescript
// App defines its own scenarios
import { ScenarioData } from '@umituz/react-native-ai-generation-content';

const MY_SCENARIOS: ScenarioData[] = [/* app-specific */];
scenarioRegistry.registerMultiple(MY_SCENARIOS);
```

## Benefits

1. **Scalability:** Each app has unique scenarios without package bloat
2. **Flexibility:** Apps can override, extend, or customize freely
3. **Maintainability:** Package changes don't affect app content
4. **I18n Ready:** Apps translate their own scenario data
5. **No Breaking Changes:** Package updates are safe (mechanism-only)

---

**Remember:** Scenarios are **data**, this package provides **mechanism**. Keep data in apps!
