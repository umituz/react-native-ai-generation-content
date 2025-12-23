export type AIPromptCategory =
  | 'face-swap'
  | 'photo-restoration'
  | 'image-enhancement'
  | 'style-transfer'
  | 'background-removal'
  | 'object-detection'
  | 'text-generation'
  | 'colorization'
  | 'content-generation'
  | 'text-processing'
  | 'future-prediction';

export type AIPromptVariableType = 'string' | 'number' | 'boolean' | 'select' | 'array';

export type AIPromptError =
  | 'TEMPLATE_NOT_FOUND'
  | 'INVALID_VARIABLES'
  | 'GENERATION_FAILED'
  | 'STORAGE_ERROR'
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'SERVICE_UNAVAILABLE';

export type AIPromptResult<T> =
  | { success: true; data: T }
  | { success: false; error: AIPromptError; message?: string };