---
description: Sets up or updates the @umituz/react-native-ai-generation-content package in a React Native app.
---

# AI Generation Content Setup Skill

When this workflow/skill is invoked, follow these explicit instructions to configure `@umituz/react-native-ai-generation-content` which provides the core wizard screens, components, and orchestration for AI content pipelines.

## Step 1: Check and Update `package.json`
- Locate the target project's `package.json`.
- Check if `@umituz/react-native-ai-generation-content` is installed.
  - If missing: Install with `npm install @umituz/react-native-ai-generation-content`.
  - If outdated: Update it to the latest version.

## Step 2: Ensure Deep Peer Dependencies
This module connects the design system, providers, subscriptions, and backend logic. Ensure ALL the following packages are installed:
- `@umituz/react-native-design-system`
- `@umituz/react-native-firebase`
- `@umituz/react-native-subscription`
- `@umituz/react-native-video-editor`
- `expo-video`, `expo-document-picker`
- `firebase`, `@tanstack/react-query`

// turbo
## Step 3: Run Pod Install (if applicable)
If targeting iOS and inside a bare React Native project:
```bash
cd ios && pod install
```

## Step 4: Inject Core Setup (If missing)
Unlike provider SDKs that require API credentials, this core package relies on providers being correctly initialized logic-wise. 
- Ensure that the app initializes AI Orchestration or any global state for background generations.
- If the project requires `GenericWizardFlow` screens or background tasks, verify that the routing configuration points correctly to the imported components from `@umituz/react-native-ai-generation-content`.

## Step 5: Summary
State what was done, detailing the verification phase for the umituz core dependencies (`design-system`, `firebase`, `subscription`, `video-editor`) and the installation/update of this central package.
