# React Native AI - Generation Content Skills

Claude Code skills for `@umituz/react-native-ai-generation-content` - Core AI orchestration system.

## Installation

```bash
npx skills add /Users/umituz/Desktop/github/umituz/apps/mobile/npm-packages/react-native-ai-generation-content/skills/SKILL.md -g
```

## Usage

Say: **"Setup AI generation content system in my app"**

## Features

- **Wizard Flows**: Multi-step AI generation wizards
- **Background Tasks**: Async generation with progress tracking
- **Creation Gallery**: History and management of creations
- **Video Processing**: Video generation and editing
- **Cost Tracking**: Monitor generation costs
- **Provider Abstraction**: Unified interface for multiple AI providers

## Components

- `GenericWizardFlow` - Reusable wizard component
- `CreationsGalleryScreen` - Gallery with filtering/search
- `TextToVideoWizardFlow` - Video generation wizard
- `VideoEditor` - Video editing capabilities

## Hooks

- `useGenerationOrchestrator` - Background generation management
- `useCreations` - Creation history and filtering
- `useGenerationCosts` - Cost tracking
- `useWizardStep` - Wizard step logic

## Dependencies

Requires:
- @umituz/react-native-design-system
- @umituz/react-native-firebase
- @umituz/react-native-subscription
- @umituz/react-native-video-editor
- expo-video, expo-document-picker
