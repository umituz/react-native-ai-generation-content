# Error Handling Example

Comprehensive error handling strategies for AI generation features.

## Overview

This example demonstrates robust error handling patterns including:
- Network errors
- API errors
- Validation errors
- Timeout handling
- User-friendly error messages
- Retry mechanisms

## Full Code

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  useTextToImageFeature,
  GenerationError,
  ErrorType,
} from '@umituz/react-native-ai-generation-content';

type ErrorState = {
  hasError: boolean;
  error: GenerationError | null;
  canRetry: boolean;
  retryCount: number;
};

export default function ErrorHandlingExample() {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    canRetry: false,
    retryCount: 0,
  });

  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
      timeout: 60000, // 60 seconds
      maxRetries: 3,
      retryDelay: 2000, // 2 seconds
      onValidationError: (error) => {
        handleError(error, false);
      },
      onNetworkError: (error) => {
        handleError(error, true);
      },
      onAPIError: (error) => {
        handleError(error, true);
      },
      onTimeoutError: (error) => {
        handleError(error, true);
      },
      onError: (error) => {
        handleError(error, true);
      },
    },
    userId: 'user-123',
  });

  const handleError = (error: GenerationError, canRetry: boolean) => {
    setErrorState({
      hasError: true,
      error,
      canRetry,
      retryCount: errorState.retryCount,
    });
  };

  const handleRetry = async () => {
    if (errorState.retryCount >= 3) {
      Alert.alert(
        'Max Retries',
        'Maximum retry attempts reached. Please try again later.'
      );
      return;
    }

    setErrorState({
      ...errorState,
      hasError: false,
      retryCount: errorState.retryCount + 1,
    });

    try {
      await feature.generate({
        style: 'realistic',
        aspectRatio: '16:9',
      });
    } catch (error) {
      handleError(error as GenerationError, true);
    }
  };

  const handleCancel = () => {
    setErrorState({
      hasError: false,
      error: null,
      canRetry: false,
      retryCount: 0,
    });
    feature.reset();
  };

  const getErrorMessage = (error: GenerationError): string => {
    switch (error.type) {
      case ErrorType.NETWORK_ERROR:
        return 'Network connection failed. Please check your internet connection.';
      case ErrorType.API_ERROR:
        return 'Service is currently unavailable. Please try again later.';
      case ErrorType.VALIDATION_ERROR:
        return error.message || 'Invalid input. Please check your prompt.';
      case ErrorType.TIMEOUT_ERROR:
        return 'Request timed out. Please try again.';
      case ErrorType.QUOTA_EXCEEDED:
        return 'You have exceeded your quota. Please upgrade your plan.';
      case ErrorType.INVALID_API_KEY:
        return 'Invalid API key. Please check your configuration.';
      case ErrorType.RATE_LIMIT:
        return 'Too many requests. Please wait and try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  const getErrorTitle = (error: GenerationError): string => {
    switch (error.type) {
      case ErrorType.NETWORK_ERROR:
        return 'Connection Error';
      case ErrorType.API_ERROR:
        return 'Service Error';
      case ErrorType.VALIDATION_ERROR:
        return 'Invalid Input';
      case ErrorType.TIMEOUT_ERROR:
        return 'Request Timeout';
      case ErrorType.QUOTA_EXCEEDED:
        return 'Quota Exceeded';
      case ErrorType.INVALID_API_KEY:
        return 'Configuration Error';
      case ErrorType.RATE_LIMIT:
        return 'Rate Limited';
      default:
        return 'Error';
    }
  };

  const getErrorIcon = (error: GenerationError): string => {
    switch (error.type) {
      case ErrorType.NETWORK_ERROR:
        return '📡';
      case ErrorType.API_ERROR:
        return '⚠️';
      case ErrorType.VALIDATION_ERROR:
        return '⚠️';
      case ErrorType.TIMEOUT_ERROR:
        return '⏰';
      case ErrorType.QUOTA_EXCEEDED:
        return '📊';
      case ErrorType.INVALID_API_KEY:
        return '🔑';
      case ErrorType.RATE_LIMIT:
        return '⏳';
      default:
        return '❌';
    }
  };

  const generate = async () => {
    setErrorState({
      ...errorState,
      hasError: false,
    });

    try {
      await feature.generate({
        style: 'realistic',
        aspectRatio: '16:9',
      });
    } catch (error) {
      handleError(error as GenerationError, true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>AI Image Generator</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your prompt..."
          onChangeText={feature.setPrompt}
          value={feature.state.prompt}
          multiline
        />

        <TouchableOpacity
          style={[styles.button, !feature.isReady && styles.buttonDisabled]}
          onPress={generate}
          disabled={!feature.isReady}
        >
          {feature.state.isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generate</Text>
          )}
        </TouchableOpacity>

        {/* Success Result */}
        {feature.state.result?.imageUrl && !errorState.hasError && (
          <View style={styles.resultSection}>
            <Image
              source={{ uri: feature.state.result.imageUrl }}
              style={styles.resultImage}
            />
          </View>
        )}
      </View>

      {/* Error Modal */}
      <Modal
        visible={errorState.hasError && !!errorState.error}
        animationType="slide"
        transparent
      >
        <View style={styles.errorModal}>
          <View style={styles.errorContent}>
            <View style={styles.errorIconContainer}>
              <Text style={styles.errorIcon}>
                {errorState.error && getErrorIcon(errorState.error)}
              </Text>
            </View>

            <Text style={styles.errorTitle}>
              {errorState.error && getErrorTitle(errorState.error)}
            </Text>

            <Text style={styles.errorMessage}>
              {errorState.error && getErrorMessage(errorState.error)}
            </Text>

            {/* Error Details (Debug) */}
            {__DEV__ && errorState.error && (
              <View style={styles.errorDetails}>
                <Text style={styles.errorDetailsTitle}>Error Details:</Text>
                <Text style={styles.errorDetailsText}>
                  Type: {errorState.error.type}
                </Text>
                <Text style={styles.errorDetailsText}>
                  Message: {errorState.error.message}
                </Text>
                {errorState.error.details && (
                  <Text style={styles.errorDetailsText}>
                    Details: {JSON.stringify(errorState.error.details)}
                  </Text>
                )}
              </View>
            )}

            {/* Retry Count */}
            {errorState.canRetry && errorState.retryCount > 0 && (
              <Text style={styles.retryText}>
                Retry attempt {errorState.retryCount}/3
              </Text>
            )}

            {/* Actions */}
            <View style={styles.errorActions}>
              {errorState.canRetry ? (
                <>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.retryButton]}
                    onPress={handleRetry}
                  >
                    <Text style={styles.retryButtonText}>Retry</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={handleCancel}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.actionButton, styles.okButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Support Link */}
            {errorState.error?.type === ErrorType.QUOTA_EXCEEDED && (
              <TouchableOpacity style={styles.supportLink}>
                <Text style={styles.supportLinkText}>Upgrade Plan →</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  resultSection: {
    marginTop: 20,
  },
  resultImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  errorModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorIcon: {
    fontSize: 40,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  errorDetails: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginBottom: 15,
  },
  errorDetailsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  errorDetailsText: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  retryText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
    marginBottom: 15,
  },
  errorActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#6366F1',
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  okButton: {
    backgroundColor: '#6366F1',
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  supportLink: {
    marginTop: 15,
  },
  supportLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
});
```

## Error Types

### Network Error
- **Cause**: No internet connection or server unreachable
- **Can Retry**: Yes
- **User Action**: Check internet connection and retry

### API Error
- **Cause**: Server error or service unavailable
- **Can Retry**: Yes
- **User Action**: Wait and retry, or contact support

### Validation Error
- **Cause**: Invalid input (empty prompt, invalid parameters)
- **Can Retry**: No (user must fix input)
- **User Action**: Correct the input

### Timeout Error
- **Cause**: Request took too long
- **Can Retry**: Yes
- **User Action**: Retry with shorter prompt or different settings

### Quota Exceeded
- **Cause**: Usage limit reached
- **Can Retry**: No (must upgrade)
- **User Action**: Upgrade plan or wait for reset

### Invalid API Key
- **Cause**: Wrong API configuration
- **Can Retry**: No (must fix config)
- **User Action**: Check API key settings

### Rate Limit
- **Cause**: Too many requests
- **Can Retry**: Yes (after wait)
- **User Action**: Wait and retry

## Best Practices

1. **User-Friendly Messages**: Translate technical errors to user-friendly language
2. **Actionable Advice**: Tell users what to do next
3. **Retry Logic**: Implement exponential backoff for retries
4. **Error Logging**: Log errors for debugging (development only)
5. **Graceful Degradation**: App should remain functional after errors
6. **Recovery Options**: Provide clear recovery paths
7. **Support Links**: Link to support for critical errors

## Advanced Patterns

### Global Error Handler

```tsx
// ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to error tracking service
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorScreen error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Error Tracking

```tsx
import * as Sentry from '@sentry/react-native';

const handleError = (error: GenerationError) => {
  Sentry.captureException(error, {
    tags: {
      errorType: error.type,
      feature: 'text-to-image',
    },
  });
};
```

### Retry with Exponential Backoff

```tsx
const retryWithBackoff = async (
  fn: () => Promise<void>,
  maxRetries: number = 3
) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await fn();
      return;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve =>
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
};
```

## Related Examples

- [Text to Image](../../basic/text-to-image/)
- [Custom UI](../custom-ui/)
- [State Management](../integrations/state-management/)

---

Last updated: 2025-01-08
