# Installation Guide

Complete installation guide for `@umituz/react-native-ai-generation-content`.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## Requirements

### React Native

- React Native 0.70 or higher
- Node.js 18 or higher
- iOS 13+ / Android 8+ (for apps)

### Dependencies

The library has minimal dependencies:

```json
{
  "react": ">=18.0.0",
  "react-native": ">=0.70.0"
}
```

### Optional Dependencies

For full functionality, you may want:

```json
{
  "react-native-image-picker": "^7.0.0",
  "react-native-video": "^6.0.0",
  "expo-av": "^14.0.0",
  "@react-native-async-storage/async-storage": "^1.23.0"
}
```

## Installation

### Using npm

```bash
npm install @umituz/react-native-ai-generation-content
```

### Using yarn

```bash
yarn add @umituz/react-native-ai-generation-content
```

### Using Expo

```bash
npx expo install @umituz/react-native-ai-generation-content
```

## Platform-Specific Setup

### iOS

#### Pod Install

After installation, navigate to iOS directory and install pods:

```bash
cd ios
pod install
cd ..
```

#### Info.plist

No special permissions required for basic usage.

For camera access (if using image picker):

```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to take photos for AI generation</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need photo library access to select photos for AI generation</string>
```

### Android

#### Permissions

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

For camera access (if using image picker):

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

#### ProGuard

If using ProGuard, add to `proguard-rules.pro`:

```proguard
-keep class com.umituz.ai.** { *; }
-dontwarn com.umituz.ai.**
```

## Configuration

### Basic Setup

```tsx
// App.tsx
import { configureAppServices } from '@umituz/react-native-ai-generation-content';

export default function App() {
  useEffect(() => {
    configureAppServices({
      networkService: {
        baseUrl: 'https://your-api.com',
        apiKey: process.env.AI_API_KEY,
      },
    });
  }, []);

  return (
    // Your app
  );
}
```

### Environment Variables

Create a `.env` file:

```env
AI_API_KEY=your_api_key_here
AI_BASE_URL=https://api.example.com
```

Load with `react-native-dotenv`:

```tsx
import { configureAppServices } from '@umituz/react-native-ai-generation-content';
import ENV from '@env';

configureAppServices({
  networkService: {
    baseUrl: ENV.AI_BASE_URL,
    apiKey: ENV.AI_API_KEY,
  },
});
```

### TypeScript

The library is written in TypeScript. No additional setup needed.

Ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true
  }
}
```

## Verification

### Test Installation

Create a test file:

```tsx
// TestGeneration.tsx
import React from 'react';
import { View, Button, Image, Text, ActivityIndicator } from 'react-native';
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

export default function TestGeneration() {
  const feature = useTextToImageFeature({
    config: {},
    userId: 'test-user',
  });

  return (
    <View style={{ padding: 20 }}>
      <Text>Test AI Generation</Text>

      <Button
        title="Generate Test Image"
        onPress={() => feature.generate({ prompt: 'A sunset' })}
        disabled={!feature.isReady}
      />

      {feature.state.isProcessing && (
        <ActivityIndicator />
      )}

      {feature.state.result?.imageUrl && (
        <Image
          source={{ uri: feature.state.result.imageUrl }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
}
```

Run it:

```bash
npm run ios
# or
npm run android
```

### Check Version

Verify installed version:

```bash
npm list @umituz/react-native-ai-generation-content
```

## Troubleshooting

### Common Issues

#### Issue: "Network service not configured"

**Solution:**
```tsx
import { configureAppServices } from '@umituz/react-native-ai-generation-content';

configureAppServices({
  networkService: {
    baseUrl: 'https://your-api.com',
    apiKey: 'your-key',
  },
});
```

#### Issue: "Cannot resolve module"

**Solution:**
```bash
# Clear cache
npm start -- --reset-cache

# Reinstall
rm -rf node_modules
npm install
```

#### Issue: iOS build fails

**Solution:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

#### Issue: Android build fails

**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Getting Help

If you're still having trouble:

1. Check [FAQ](../FAQ.md)
2. Search [GitHub Issues](https://github.com/umituz/react-native-ai-generation-content/issues)
3. Ask in [Discord](https://discord.gg/your-server)
4. Create a [new issue](https://github.com/umituz/react-native-ai-generation-content/issues/new)

## Next Steps

After installation:

1. [Quick Start Guide](./quick-start.md)
2. [Your First Generation](./tutorials/getting-started.md)
3. [Feature Documentation](../src/features/)

## Upgrading

### From 1.x to 2.x

See [Migration Guide](../MIGRATION_GUIDE.md) for detailed instructions.

### From 2.x to 3.x

See [Migration Guide](../MIGRATION_GUIDE.md) for detailed instructions.

## Uninstallation

### Remove Package

```bash
npm uninstall @umituz/react-native-ai-generation-content
# or
yarn remove @umituz/react-native-ai-generation-content
```

### iOS

```bash
cd ios
pod install
```

### Android

No additional steps needed.

---

## Additional Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

Last updated: 2025-01-08
