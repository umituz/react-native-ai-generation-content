/**
 * Pattern Matcher Service
 * Utility service for regex pattern matching
 */

export interface PatternMatch {
  pattern: string;
  matched: boolean;
  matchedText?: string;
  position?: number;
}

class PatternMatcherService {
  matchPattern(content: string, pattern: string): PatternMatch {
    try {
      const regex = new RegExp(pattern, "gi");
      const match = regex.exec(content);

      if (match) {
        return {
          pattern,
          matched: true,
          matchedText: match[0],
          position: match.index,
        };
      }

      return { pattern, matched: false };
    } catch {
      return { pattern, matched: false };
    }
  }

  matchAnyPattern(content: string, patterns: string[]): PatternMatch[] {
    return patterns.map((pattern) => this.matchPattern(content, pattern));
  }

  matchAllPatterns(content: string, patterns: string[]): boolean {
    return patterns.every(
      (pattern) => this.matchPattern(content, pattern).matched
    );
  }

  hasAnyMatch(content: string, patterns: string[]): boolean {
    return patterns.some(
      (pattern) => this.matchPattern(content, pattern).matched
    );
  }
}

export const patternMatcherService = new PatternMatcherService();
