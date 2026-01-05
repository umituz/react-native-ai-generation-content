declare const __DEV__: boolean;
declare const console: {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
};

// React Native + React 19 compatibility fix
// https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/67742
declare module 'react-native' {
  import type {
    ComponentType,
    ReactElement,
    JSXElementConstructor,
    ReactNode,
  } from 'react';

  export interface ViewProps {
    children?: ReactNode;
    style?: any;
    testID?: string;
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityRole?: string;
    accessibilityState?: any;
    onLayout?: (event: any) => void;
    pointerEvents?: 'box-none' | 'box-only' | 'auto' | 'none';
    hitSlop?: any;
    removeClippedSubviews?: boolean;
    collapsable?: boolean;
    needsOffscreenAlphaCompositing?: boolean;
    renderToHardwareTextureAndroid?: boolean;
    shouldRasterizeIOS?: boolean;
    onAccessibilityTap?: () => void;
    onMagicTap?: () => void;
    [key: string]: any;
  }

  export interface TextProps {
    children?: ReactNode;
    style?: any;
    testID?: string;
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
    allowFontScaling?: boolean;
    adjustsFontSizeToFit?: boolean;
    minimumFontScale?: number;
    maxFontSizeMultiplier?: number;
    selectable?: boolean;
    selectionColor?: string;
    accessibilityLabel?: string;
    [key: string]: any;
  }

  export const View: ComponentType<ViewProps>;
  export const Text: ComponentType<TextProps>;
  export const Image: ComponentType<any>;
  export const ScrollView: ComponentType<any>;
  export const FlatList: ComponentType<any>;
  export const SectionList: ComponentType<any>;
  export const TextInput: ComponentType<any>;
  export const TouchableOpacity: ComponentType<any>;
  export const TouchableHighlight: ComponentType<any>;
  export const TouchableWithoutFeedback: ComponentType<any>;
  export const Pressable: ComponentType<any>;
  export const ActivityIndicator: ComponentType<any>;
  export const Modal: ComponentType<any>;
  export const SafeAreaView: ComponentType<any>;
  export const KeyboardAvoidingView: ComponentType<any>;
  export const StatusBar: ComponentType<any>;
  export const Animated: {
    View: ComponentType<any>;
    Text: ComponentType<any>;
    Image: ComponentType<any>;
    ScrollView: ComponentType<any>;
    [key: string]: any;
  };
}
