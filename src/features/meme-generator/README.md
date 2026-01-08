# Meme Generator

Create memes from images with AI-generated text and styling.

## Features

- Add text to images with smart positioning
- Multiple meme templates
- Custom text and captions
- Auto-generated meme suggestions
- Style and font customization

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useMemeGeneratorFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function MemeGeneratorScreen() {
  const [image, setImage] = useState<string | null>(null);

  const feature = useMemeGeneratorFeature({
    config: {
      template: 'classic',
      onProcessingStart: () => console.log('Creating meme...'),
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
    onSaveResult: async (imageUrl) => {
      await saveToGallery(imageUrl);
    },
  });

  return (
    <View>
      <PhotoUploadCard
        image={image}
        onSelectImage={feature.selectImage}
        title="Select Image for Meme"
      />

      <MemeTemplateSelector
        selectedTemplate={feature.state.template}
        onSelectTemplate={feature.setTemplate}
      />

      <TextInput
        placeholder="Top text"
        value={feature.state.topText}
        onChangeText={feature.setTopText}
      />

      <TextInput
        placeholder="Bottom text"
        value={feature.state.bottomText}
        onChangeText={feature.setBottomText}
      />

      <Button
        title="Create Meme"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <ActivityIndicator />
      )}

      {feature.state.result && (
        <Image source={{ uri: feature.state.result.imageUrl }} />
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
      featureId="meme-generator"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface MemeGeneratorFeatureConfig {
  template?: 'classic' | 'modern' | 'minimal' | 'bold';
  font?: string; // Font family
  fontSize?: number; // Font size
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: MemeGeneratorResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface MemeGeneratorOptions {
  template: 'classic' | 'modern' | 'minimal' | 'bold';
  topText?: string;
  bottomText?: string;
  fontSize?: number;
  textColor?: string;
  strokeColor?: string;
}
```

## Meme Templates

### Classic Template

Classic top/bottom text meme:

```tsx
const result = await feature.process({
  template: 'classic',
  topText: 'WHEN YOU THINK',
  bottomText: 'ABOUT IT',
});
```

### Modern Template

Modern styling with flexible text placement:

```tsx
const result = await feature.process({
  template: 'modern',
  topText: 'Me: Writes code',
  bottomText: 'Also me: It works on my machine',
});
```

### Minimal Template

Clean, minimal design:

```tsx
const result = await feature.process({
  template: 'minimal',
  topText: 'Just vibing',
});
```

### Bold Template

Bold, impactful text:

```tsx
const result = await feature.process({
  template: 'bold',
  topText: 'ERROR 404',
  bottomText: 'MOTIVATION NOT FOUND',
});
```

## Usage Flow

1. Select **Image** - Choose an image for the meme
2. Choose **Template** - Select a meme template
3. Add **Text** - Enter top and/or bottom text
4. Customize **Style** - Adjust font, size, colors
5. Tap **Create** - Generate the meme
6. View Result - See the generated meme
7. Save or Share - Save or share the meme

## Component Examples

### Template Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const templates = [
  { id: 'classic', name: 'Classic', description: 'Top/Bottom text' },
  { id: 'modern', name: 'Modern', description: 'Contemporary style' },
  { id: 'minimal', name: 'Minimal', description: 'Clean & simple' },
  { id: 'bold', name: 'Bold', description: 'Big impact' },
];

<GridSelector
  options={templates}
  selectedOption={selectedTemplate}
  onSelectOption={setSelectedTemplate}
/>
```

### Text Inputs

```tsx
import { TextInput } from 'react-native';

<View>
  <TextInput
    placeholder="Top text"
    value={topText}
    onChangeText={setTopText}
    style={{ fontSize: 18, fontWeight: 'bold' }}
  />

  <TextInput
    placeholder="Bottom text"
    value={bottomText}
    onChangeText={setBottomText}
    style={{ fontSize: 18, fontWeight: 'bold' }}
  />
</View>
```

### Color Picker

```tsx
import { TouchableOpacity, View } from 'react-native';

const colors = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF'];

<View style={{ flexDirection: 'row' }}>
  {colors.map(color => (
    <TouchableOpacity
      key={color}
      style={{
        width: 40,
        height: 40,
        backgroundColor: color,
        borderRadius: 20,
        margin: 5,
        borderWidth: selectedColor === color ? 3 : 0,
      }}
      onPress={() => setSelectedColor(color)}
    />
  ))}
</View>
```

## Use Cases

### Funny Memes

```tsx
// Create humorous memes
const result = await feature.process({
  template: 'classic',
  topText: 'Me at 3 AM',
  bottomText: 'Let\'s learn quantum physics',
});
```

### Social Media Content

```tsx
// Generate shareable content
const result = await feature.process({
  template: 'modern',
  topText: 'Monday mood',
});
```

### Marketing

```tsx
// Create marketing memes
const result = await feature.process({
  template: 'bold',
  topText: 'NEW PRODUCT',
  bottomText: '50% OFF',
});
```

### Reaction Images

```tsx
// Turn reaction photos into memes
const result = await feature.process({
  template: 'classic',
  topText: 'When the code works',
  bottomText: 'On the first try',
});
```

## Best Practices

1. **Text Length**: Keep text short and punchy
2. **Readability**: Ensure text contrasts well with image
3. **Font Size**: Adjust based on image size and text length
4. **Relevance**: Match text to image content
5. **Humor**: Focus on relatable, funny content

## Related Features

- [Text to Image](../text-to-image) - Generate images from text
- [Image to Image](../image-to-image) - Transform images with AI
- [Style Transfer](../style-transfer) - Apply artistic styles

## License

MIT
