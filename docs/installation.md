# Installation Guide

Installation strategy and setup for `@umituz/react-native-ai-generation-content`.

## 🎯 Installation Purpose

Guide users through installing and configuring the library properly. Focus on correct setup, configuration strategy, and verification steps while minimizing extensive code examples.

---

## 📋 Installation Strategy

### Pre-Installation Checklist

**Before Installing:**
- Verify React Native version (0.70+)
- Verify Node.js version (18+)
- Check platform requirements (iOS 13+ / Android 8+)
- Plan your configuration strategy
- Prepare API credentials

**Installation Strategy:**
1. **Choose package manager** (npm/yarn/expo)
2. **Install package** using appropriate command
3. **Configure platform-specific settings**
4. **Set up environment variables**
5. **Configure services**
6. **Verify installation**

---

## ⚠️ Critical Installation Rules (MUST FOLLOW)

### 1. Version Compatibility
- **MUST** use React Native 0.70 or higher
- **MUST** use Node.js 18 or higher
- **MUST** verify platform compatibility
- **MUST** check dependency conflicts
- **MUST** update dependencies if needed

### 2. Configuration Setup
- **MUST** configure app services before use
- **MUST** provide valid API credentials
- **MUST** set up environment variables
- **MUST** configure network service
- **MUST** implement credit system (if needed)

### 3. Platform Requirements
- **MUST** install pods for iOS
- **MUST** add required permissions
- **MUST** configure Android manifest
- **MUST** set up ProGuard (if using)
- **MUST** test on target platforms

### 4. TypeScript Configuration
- **MUST** enable strict mode
- **MUST** configure module resolution
- **MUST** set proper compiler options
- **MUST** include type definitions
- **MUST** verify no type errors

### 5. Verification
- **MUST** test basic functionality
- **MUST** verify configuration
- **MUST** check network connectivity
- **MUST** validate API credentials
- **MUST** test on target platforms

---

## 🚫 Installation Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Skipping Configuration**
   - Never use without configuring
   - Never skip environment setup
   - Always configure services first
   - Always test configuration

2. **No Hardcoded Credentials**
   - Never hardcode API keys
   - Never commit secrets
   - Always use environment variables
   - Always use secure storage

3. **No Incompatible Versions**
   - Never use old React Native
   - Never ignore peer dependencies
   - Always check compatibility
   - Always update if needed

4. **No Missing Permissions**
   - Never skip platform permissions
   - Never ignore manifest setup
   - Always add required permissions
   - Always test permissions

5. **No Skipping Verification**
   - Never assume it works
   - Always test installation
   - Always verify configuration
   - Always check connectivity

6. **No Breaking Changes**
   - Never update without reading changelog
   - Always check migration guide
   - Always test updates
   - Always backup before updating

7. **No Missing Dependencies**
   - Never skip pod install (iOS)
   - Never ignore dependency warnings
   - Always install all dependencies
   - Always verify installations

---

## 🔧 Requirements

### React Native Requirements

**Minimum Versions:**
- React Native: 0.70+
- Node.js: 18+
- iOS: 13+ (for iOS apps)
- Android: 8+ (for Android apps)

**Platform Support:**
- iOS (React Native 0.70+)
- Android (React Native 0.70+)
- Expo (managed workflow compatible)

### Dependencies

**Core Dependencies:**
- React: 18.0.0 or higher
- React Native: 0.70.0 or higher

**Optional Dependencies:**
- Image picker for photo selection
- Video player for video features
- Async storage for local caching
- Expo AV for Expo projects

---

## 📦 Installation Methods

### Using npm

**Installation Command:**
```bash
npm install @umituz/react-native-ai-generation-content
```

**Strategy:**
- Use npm for standard React Native projects
- Check package.json for version
- Run npm install to add package
- Verify installation succeeded

### Using yarn

**Installation Command:**
```bash
yarn add @umituz/react-native-ai-generation-content
```

**Strategy:**
- Use yarn if project uses yarn
- Check yarn.lock for consistency
- Run yarn add to add package
- Verify installation succeeded

### Using Expo

**Installation Command:**
```bash
npx expo install @umituz/react-native-ai-generation-content
```

**Strategy:**
- Use for Expo managed projects
- Verify Expo compatibility
- Check peer dependencies
- Follow Expo-specific setup

---

## 📱 Platform-Specific Setup

### iOS Setup Strategy

**Pod Installation:**
- Navigate to ios/ directory
- Run pod install command
- Wait for pods to install
- Return to project root

**Required Commands:**
```bash
cd ios
pod install
cd ..
```

**Info.plist Permissions:**
- No special permissions for basic usage
- Add camera permission if using image picker
- Add photo library permission if needed
- Provide clear usage descriptions

**Permission Keys:**
- NSCameraUsageDescription
- NSPhotoLibraryUsageDescription
- NSPhotoLibraryAddUsageDescription (if saving)

### Android Setup Strategy

**Manifest Permissions:**
- Edit AndroidManifest.xml
- Add Internet permission
- Add camera permissions if needed
- Add storage permissions if needed

**Required Permission:**
- INTERNET (required for API calls)

**Optional Permissions:**
- CAMERA (for image picker)
- READ_EXTERNAL_STORAGE (for photo access)
- WRITE_EXTERNAL_STORAGE (for saving)

**ProGuard Configuration:**
- Add to proguard-rules.pro if using ProGuard
- Keep library classes
- Don't warn about library classes

---

## ⚙️ Configuration Strategy

### Basic Configuration

**Configuration Steps:**
1. Import configureAppServices function
2. Call in app initialization
3. Provide network service configuration
4. Provide API credentials
5. Optional: Add credit service
6. Optional: Add paywall service

**Configuration Location:**
- Call in App.tsx or root component
- Use useEffect for setup
- Configure before using features
- Provide environment variables

### Environment Variables Strategy

**Environment Setup:**
- Create .env file in project root
- Add API keys and URLs
- Use react-native-dotenv or similar
- Add .env to .gitignore
- Load variables in app

**Required Variables:**
- AI_API_KEY - Your API key
- AI_BASE_URL - Your API base URL

**Optional Variables:**
- AI_TIMEOUT - Request timeout
- AI_MAX_RETRIES - Retry attempts

### TypeScript Configuration

**Required tsconfig.json Settings:**
- esModuleInterop: true
- allowSyntheticDefaultImports: true
- strict: true
- moduleResolution: node
- resolveJsonModule: true

**Type Verification:**
- Run TypeScript compiler
- Check for type errors
- Verify imports resolve
- Test autocomplete in IDE

---

## ✅ Verification Strategy

### Installation Verification

**Check Package Version:**
```bash
npm list @umituz/react-native-ai-generation-content
```

**Verification Steps:**
1. Check package.json includes library
2. Verify node_modules contains package
3. No installation warnings or errors
4. TypeScript recognizes imports
5. Platform builds successfully

### Configuration Verification

**Test Configuration:**
- Create simple test component
- Import feature hook
- Configure services
- Test basic functionality
- Check console for errors

**Verification Checklist:**
- [ ] Package installed
- [ ] TypeScript recognizes imports
- [ ] Services configured
- [ ] Environment variables loaded
- [ ] Network requests work
- [ ] No console errors

### Platform Verification

**iOS Verification:**
- Build succeeds
- Pods installed correctly
- App launches without crash
- Features work as expected

**Android Verification:**
- Build succeeds
- Gradle sync succeeds
- App launches without crash
- Features work as expected

---

## 🔧 Troubleshooting Strategy

### Common Issues

#### "Network service not configured"

**Cause:** Services not configured before use

**Solution Strategy:**
1. Import configureAppServices
2. Call in app initialization
3. Provide valid configuration
4. Verify API credentials
5. Check network connectivity

#### "Cannot resolve module"

**Cause:** Cache or installation issue

**Solution Strategy:**
1. Clear Metro bundler cache
2. Restart bundler with --reset-cache
3. Reinstall node_modules
4. Clean platform builds
5. Rebuild project

**Commands:**
```bash
# Clear cache
npm start -- --reset-cache

# Reinstall
rm -rf node_modules
npm install
```

#### iOS build fails

**Cause:** Pod or configuration issue

**Solution Strategy:**
1. Clean iOS build
2. Deintegrate pods
3. Reinstall pods
4. Clean build folder
5. Rebuild

**Commands:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

#### Android build fails

**Cause:** Gradle or dependency issue

**Solution Strategy:**
1. Clean Android build
2. Clear Gradle cache
3. Rebuild project
4. Check dependencies
5. Verify Android version

**Commands:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Getting Help Strategy

**Before Seeking Help:**
1. Read this installation guide
2. Check FAQ for common issues
3. Search existing GitHub issues
4. Verify all steps completed
5. Gather error messages and logs

**Where to Get Help:**
- [FAQ](../FAQ.md) - Common questions
- [GitHub Issues](https://github.com/umituz/react-native-ai-generation-content/issues) - Bug reports
- [Discord](https://discord.gg/your-server) - Community help
- [Support](../SUPPORT.md) - Support options

---

## 🚀 Next Steps

### After Installation

**Immediate Next Steps:**
1. Read [Quick Start Guide](./quick-start.md)
2. Set up first feature
3. Test basic generation
4. Explore features
5. Read feature documentation

**Learning Path:**
1. Complete quick start tutorial
2. Try example implementations
3. Read feature-specific docs
4. Implement in your app
5. Explore advanced features

### Recommended Reading

**Essential Documentation:**
- [Quick Start](./quick-start.md) - Get started quickly
- [README](../README.md) - Main documentation
- [ARCHITECTURE](../ARCHITECTURE.md) - Architecture overview
- [FAQ](../FAQ.md) - Common questions

**Feature Documentation:**
- [Text to Image](../src/features/text-to-image/README.md) - Image generation
- [Face Swap](../src/features/face-swap/README.md) - Face swapping
- [All Features](../src/features/) - Complete feature list

---

## 🔄 Upgrading Strategy

### Version Upgrades

**Before Upgrading:**
1. Read current version notes
2. Read new version changelog
3. Check migration guide
4. Backup your project
5. Plan for breaking changes

**Upgrade Process:**
1. Update package version
2. Install updated package
3. Follow migration guide
4. Update configuration
5. Test thoroughly
6. Fix breaking changes

**Migration Guides:**
- [Migration Guide](../MIGRATION_GUIDE.md) - Version migration

---

## 🗑️ Uninstallation Strategy

### Remove Package

**Uninstall Commands:**
```bash
npm uninstall @umituz/react-native-ai-generation-content
# or
yarn remove @umituz/react-native-ai-generation-content
```

### Platform Cleanup

**iOS Cleanup:**
```bash
cd ios
pod install
```

**Android Cleanup:**
- No additional steps needed
- Build will automatically update

---

## 📚 Additional Resources

### Official Documentation
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### Package Resources
- [README](../README.md) - Main documentation
- [FAQ](../FAQ.md) - Common questions
- [Support](../SUPPORT.md) - Get help

---

**Version**: 2.0.0 (Strategy-based Documentation)
**Last Updated**: 2025-01-08
