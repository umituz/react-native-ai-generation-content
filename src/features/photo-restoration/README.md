# Photo Restoration

Restore and enhance old, blurry, or damaged photos using AI.

## Features

- Repair old and damaged photographs
- Remove scratches, tears, and stains
- Enhance blurry photos
- Colorize black and white photos
- Restore facial details and features

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { usePhotoRestoreFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function PhotoRestorationScreen() {
  const [photo, setPhoto] = useState<string | null>(null);

  const feature = usePhotoRestoreFeature({
    config: {
      restorationType: 'auto', // 'auto', ' scratches', 'blur', 'colorize'
      onProcessingStart: () => console.log('Starting restoration...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectPhoto: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setPhoto(base64);
        return base64;
      }
      return null;
    },
    onSaveResult: async (imageUrl) => {
      await saveToGallery(imageUrl);
    },
  });

  return (
    <View>
      <PhotoUploadCard
        image={photo}
        onSelectImage={feature.selectPhoto}
        title="Select Photo to Restore"
      />

      <Button
        title="Restore Photo"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <View>
          <Text>Restoring photo...</Text>
          <ProgressBar progress={feature.state.progress} />
        </View>
      )}

      {feature.state.result && (
        <ResultDisplay
          originalImage={photo}
          resultImage={feature.state.result.imageUrl}
          onSave={() => feature.saveResult()}
        />
      )}
    </View>
  );
}
```

### Using the Unified AI Feature Screen

```tsx
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

function App() {
  return (
    <AIFeatureScreen
      featureId="photo-restoration"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface PhotoRestoreFeatureConfig {
  restorationType?: 'auto' | 'scratches' | 'blur' | 'colorize' | 'all';
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: PhotoRestoreResult) => void;
  onError?: (error: string) => void;
}
```

### Restoration Options

```tsx
interface PhotoRestoreOptions {
  removeScratches?: boolean; // Remove scratches and tears
  fixBlur?: boolean; // Fix blurry photos
  colorize?: boolean; // Colorize black and white photos
  enhanceFaces?: boolean; // Restore facial details
  adjustContrast?: boolean; // Improve contrast and brightness
}
```

## Usage Flow

1. Select **Photo** - Choose an old or damaged photo
2. Choose **Restoration Type** - Select what to restore (or use auto)
3. Tap **Restore** - Start the restoration process
4. View **Comparison** - See before and after side by side
5. Save or Share - Save the restored photo

## Restoration Types

### Auto Restoration

Automatically detects and applies appropriate restoration:

```tsx
const result = await feature.process({
  restorationType: 'auto',
});
```

### Remove Scratches & Tears

```tsx
const result = await feature.process({
  removeScratches: true,
});
```

### Fix Blurry Photos

```tsx
const result = await feature.process({
  fixBlur: true,
});
```

### Colorize Black & White

```tsx
const result = await feature.process({
  colorize: true,
});
```

### Complete Restoration

Apply all restoration techniques:

```tsx
const result = await feature.process({
  removeScratches: true,
  fixBlur: true,
  colorize: true,
  enhanceFaces: true,
  adjustContrast: true,
});
```

## Component Examples

### Restoration Type Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const restorationTypes = [
  { id: 'auto', name: 'Auto', description: 'Automatic detection' },
  { id: 'scratches', name: 'Scratches', description: 'Remove scratches & tears' },
  { id: 'blur', name: 'Blur', description: 'Fix blurry photos' },
  { id: 'colorize', name: 'Colorize', description: 'Add color to B&W photos' },
];

function MyScreen() {
  const [restorationType, setRestorationType] = useState('auto');

  return (
    <GridSelector
      options={restorationTypes}
      selectedOption={restorationType}
      onSelectOption={setRestorationType}
    />
  );
}
```

### Before/After Comparison

```tsx
import { ResultDisplay } from '@umituz/react-native-ai-generation-content';

{feature.state.result && photo && (
  <ResultDisplay
    originalImage={photo}
    resultImage={feature.state.result.imageUrl}
    onSave={() => feature.saveResult()}
    onShare={() => shareImage(feature.state.result.imageUrl)}
  />
)}
```

## Use Cases

### Restoring Old Family Photos

```tsx
// Restore old family photographs
const result = await feature.process({
  removeScratches: true,
  fixBlur: true,
  adjustContrast: true,
});
```

### Colorizing Historical Photos

```tsx
// Add color to black and white photos
const result = await feature.process({
  colorize: true,
});
```

### Fixing Damaged Photos

```tsx
// Repair tears and stains
const result = await feature.process({
  removeScratches: true,
});
```

## Best Practices

1. **Scan Quality**: Use high-quality scans for best results
2. **Start with Auto**: Let AI detect issues first
3. **Multiple Passes**: Some photos may benefit from multiple restoration passes
4. **Face Focus**: Enable face enhancement for portrait photos
5. **Color Accuracy**: Colorization works best with clear reference points

## Error Handling

```tsx
const { state, process } = usePhotoRestoreFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Restoration Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [Upscaling](../upscaling) - Increase image resolution
- [HD Touch Up](../hd-touch-up) - High-detail enhancements
- [Colorization](../colorization) - Add color to B&W photos
- [Face Detection](../../../domains/face-detection) - Face detection API

## License

MIT
