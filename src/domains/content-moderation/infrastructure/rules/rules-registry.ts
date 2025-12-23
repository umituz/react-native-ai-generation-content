/**
 * Rules Registry
 * Manages moderation rules - allows adding/removing custom rules
 */

import type {
  ContentType,
  ModerationRule,
} from "../../domain/entities/moderation.types";
import { defaultModerationRules } from "./default-rules.data";

class RulesRegistry {
  private rules: ModerationRule[] = [...defaultModerationRules];

  getRules(): ModerationRule[] {
    return this.rules;
  }

  getRulesByContentType(contentType: ContentType): ModerationRule[] {
    return this.rules.filter(
      (rule) => rule.enabled && rule.contentTypes.includes(contentType)
    );
  }

  getRuleById(id: string): ModerationRule | undefined {
    return this.rules.find((rule) => rule.id === id);
  }

  addRule(rule: ModerationRule): void {
    const existing = this.getRuleById(rule.id);
    if (existing) {
      this.updateRule(rule.id, rule);
      return;
    }
    this.rules.push(rule);
  }

  addRules(rules: ModerationRule[]): void {
    rules.forEach((rule) => this.addRule(rule));
  }

  updateRule(id: string, updates: Partial<ModerationRule>): boolean {
    const index = this.rules.findIndex((rule) => rule.id === id);
    if (index === -1) return false;

    this.rules[index] = { ...this.rules[index], ...updates };
    return true;
  }

  removeRule(id: string): boolean {
    const index = this.rules.findIndex((rule) => rule.id === id);
    if (index === -1) return false;

    this.rules.splice(index, 1);
    return true;
  }

  enableRule(id: string): boolean {
    return this.updateRule(id, { enabled: true });
  }

  disableRule(id: string): boolean {
    return this.updateRule(id, { enabled: false });
  }

  resetToDefaults(): void {
    this.rules = [...defaultModerationRules];
  }

  clearAllRules(): void {
    this.rules = [];
  }
}

export const rulesRegistry = new RulesRegistry();
