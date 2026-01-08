# Image Captioning

Generate descriptive captions for images using AI.

## Features

- Generate detailed image descriptions
- Multiple caption styles (detailed, brief, creative)
- Support for various image types
- Keyword extraction
- Scene and object recognition

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useImageCaptioning } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function ImageCaptioningScreen() {
  const [image, setImage] = useState<string | null>(null);

  const feature = useImageCaptioning({
    config: {
      captionStyle: 'detailed',
      onProcessingStart: () => console.log('Generating caption...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectImage: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setImage(base64);
        return base64;
      }
      return null;
    },
  });

  return (
    <View>
      <PhotoUploadCard
        image={image}
        onSelectImage={feature.selectImage}
        title="Select Image to Caption"
      />

      <CaptionStyleSelector
        selectedStyle={feature.state.captionStyle}
        onSelectStyle={feature.setCaptionStyle}
      />

      <Button
        title="Generate Caption"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <ActivityIndicator />
      )}

      {feature.state.result && (
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Caption:
          </Text>
          <Text>{feature.state.result.caption}</Text>

          {feature.state.result.keywords && (
            <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                Keywords:
              </Text>
              {feature.state.result.keywords.map(keyword => (
                <Text key={keyword}>• {keyword}</Text>
              ))}
            </View>
          )}

          <Button
            title="Copy Caption"
            onPress={() => Clipboard.setString(feature.state.result.caption)}
          />
        </View>
      )}
    </View>
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface ImageCaptioningFeatureConfig {
  captionStyle?: 'detailed' | 'brief' | 'creative' | 'factual';
  language?: string; // Caption language (default: 'en')
  includeKeywords?: boolean; // Include extracted keywords
  maxCaptionLength?: number; // Maximum caption length
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: ImageCaptioningResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface ImageCaptioningOptions {
  captionStyle: 'detailed' | 'brief' | 'creative' | 'factual';
  language?: string;
  includeKeywords?: boolean;
  includeObjects?: boolean; // List detected objects
  includeScene?: boolean; // Describe scene setting
}
```

## Caption Styles

### Detailed

Comprehensive, descriptive captions:

```tsx
const result = await feature.process({
  captionStyle: 'detailed',
  includeObjects: true,
  includeScene: true,
});

// Example: "A serene beach scene at sunset with gentle waves rolling onto the shore.
//           The sky is painted in vibrant shades of orange and pink as the sun dips
//           below the horizon. Seagulls can be seen flying in the distance."
```

### Brief

Short, concise captions:

```tsx
const result = await feature.process({
  captionStyle: 'brief',
});

// Example: "Beach sunset with orange sky"
```

### Creative

Artistic and creative descriptions:

```tsx
const result = await feature.process({
  captionStyle: 'creative',
});

// Example: "Nature's daily masterpiece unfolds as the sun bids farewell,
//           painting the sky in a breathtaking symphony of warm hues."
```

### Factual

Objective, factual descriptions:

```tsx
const result = await feature.process({
  captionStyle: 'factual',
});

// Example: "A beach at sunset. Visible elements include sand, ocean water,
//           sky, sun, and birds. Lighting is natural with warm tones."
```

## Result Structure

```tsx
interface ImageCaptioningResult {
  caption: string;
  keywords?: string[];
  objects?: string[];
  scene?: string;
  confidence: number;
  language: string;
}
```

## Usage Flow

1. Select **Image** - Choose an image to caption
2. Choose **Caption Style** - Select the desired style
3. Configure **Options** - Enable/disable keywords, objects, scene
4. Tap **Generate** - Create the caption
5. View Result - See the generated caption and metadata
6. Copy or Share - Copy to clipboard or share

## Component Examples

### Caption Style Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const styles = [
  { id: 'detailed', name: 'Detailed', description: 'Comprehensive description' },
  { id: 'brief', name: 'Brief', description: 'Short and concise' },
  { id: 'creative', name: 'Creative', description: 'Artistic description' },
  { id: 'factual', name: 'Factual', description: 'Objective description' },
];

<GridSelector
  options={styles}
  selectedOption={selectedStyle}
  onSelectOption={setSelectedStyle}
/>
```

### Caption Display

```tsx
import { View, Text } from 'react-native';

function CaptionDisplay({ result }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        {result.caption}
      </Text>

      {result.keywords && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
            Keywords:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {result.keywords.map(keyword => (
              <View
                key={keyword}
                style={{
                  backgroundColor: '#E0E0E0',
                  borderRadius: 16,
                  padding: 8,
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                <Text>{keyword}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {result.objects && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
            Objects:
          </Text>
          <Text>{result.objects.join(', ')}</Text>
        </View>
      )}

      {result.scene && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
            Scene:
          </Text>
          <Text>{result.scene}</Text>
        </View>
      )}

      <Text style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
        Confidence: {Math.round(result.confidence * 100)}%
      </Text>
    </View>
  );
}
```

### Copy to Clipboard

```tsx
import { Clipboard, Alert } from 'react-native';

const handleCopy = async (caption: string) => {
  await Clipboard.setString(caption);
  Alert.alert('Copied', 'Caption copied to clipboard');
};
```

## Use Cases

### Social Media Captions

```tsx
// Generate Instagram/Twitter captions
const result = await feature.process({
  captionStyle: 'creative',
  maxCaptionLength: 2200, // Instagram limit
});
```

### Accessibility

```tsx
// Generate alt text for accessibility
const result = await feature.process({
  captionStyle: 'factual',
  maxCaptionLength: 125, // Recommended alt text length
});
```

### Content Management

```tsx
// Auto-generate image descriptions for CMS
const result = await feature.process({
  captionStyle: 'detailed',
  includeKeywords: true,
  includeObjects: true,
});
```

### SEO

```tsx
// Generate SEO-friendly image descriptions
const result = await feature.process({
  captionStyle: 'detailed',
  includeKeywords: true,
});
```

## Best Practices

1. **Image Quality**: Clear, high-quality images produce better captions
2. **Style Selection**: Match style to your use case
3. **Length Control**: Use maxCaptionLength for platform limits
4. **Review**: Always review and edit generated captions
5. **Keywords**: Enable keywords for better categorization

## Related Features

- [Text to Image](../text-to-image) - Generate images from descriptions
- [Script Generator](../script-generator) - Generate content scripts
- [Audio Generation](../audio-generation) - Generate audio content

## License

MIT
