/**
 * AI Script Generator Types
 */

export interface VideoTypeOption {
  readonly id: string;
  readonly name: string;
  readonly emoji: string;
}

export interface ScriptSection {
  readonly id: string;
  readonly type: "hook" | "intro" | "main" | "transition" | "cta";
  readonly title: string;
  readonly content: string;
  readonly duration: number; // in seconds
  readonly notes?: string;
}

export interface ScriptGenerationRequest {
  readonly topic: string;
  readonly videoType: string;
  readonly duration: number;
  readonly targetAudience?: string;
  readonly keyPoints?: string;
}

export interface ScriptGenerationResponse {
  readonly script: readonly ScriptSection[];
}
