/**
 * Moderation Wrapper
 * Generic content moderation interface (app provides implementation)
 */

export interface ModerationResult {
  allowed: boolean;
  error?: string;
  violations?: Array<{
    rule: string;
    suggestion?: string;
  }>;
}

export interface ModerationConfig {
  check: (content: string) => Promise<ModerationResult>;
}

export class ModerationWrapper {
  private static config: ModerationConfig | null = null;

  static configure(config: ModerationConfig): void {
    this.config = config;
  }

  static async checkContent(content: string): Promise<ModerationResult> {
    if (!this.config) {
      return { allowed: true };
    }

    return this.config.check(content);
  }

  static isConfigured(): boolean {
    return this.config !== null;
  }
}
