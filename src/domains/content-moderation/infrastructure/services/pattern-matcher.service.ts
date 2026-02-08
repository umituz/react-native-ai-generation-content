/**
 * Pattern Matcher Service
 * Utility service for regex pattern matching with security validations
 */

export interface PatternMatch {
  pattern: string;
  matched: boolean;
  matchedText?: string;
  position?: number;
}

/**
 * Validates that a regex pattern is safe to use
 * Prevents ReDoS (Regular Expression Denial of Service) attacks
 */
function isValidRegexPattern(pattern: string): boolean {
  if (!pattern || typeof pattern !== "string") {
    return false;
  }

  // Check for dangerous patterns that could cause ReDoS
  const dangerousPatterns = [
    /\([^)]*\+\([^)]*\+\)/, // Nested repeated groups
    /\([^)]*\*[^)]*\*\)/, // Multiple nested stars
    /\.\*\.*/, // Multiple wildcards
    /\.\+\.+/, // Multiple repeated wildcards
  ];

  for (const dangerous of dangerousPatterns) {
    if (dangerous.test(pattern)) {
      return false;
    }
  }

  // Limit pattern length to prevent potential attacks
  const MAX_PATTERN_LENGTH = 1000;
  if (pattern.length > MAX_PATTERN_LENGTH) {
    return false;
  }

  try {
    // Test if pattern compiles without errors
    new RegExp(pattern);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely escapes special regex characters in user input
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class PatternMatcherService {
  matchPattern(content: string, pattern: string): PatternMatch {
    // Validate inputs
    if (!content || typeof content !== "string") {
      return { pattern, matched: false };
    }

    if (!pattern || typeof pattern !== "string") {
      return { pattern, matched: false };
    }

    // Validate pattern safety before using it
    if (!isValidRegexPattern(pattern)) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn("[PatternMatcher] Invalid or unsafe pattern rejected:", pattern);
      }
      return { pattern, matched: false };
    }

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
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn("[PatternMatcher] Regex error:", error);
      }
      return { pattern, matched: false };
    }
  }

  /**
   * Safe string matching without regex (for user-provided search terms)
   */
  safeStringMatch(content: string, searchTerm: string): boolean {
    if (!content || !searchTerm) {
      return false;
    }

    try {
      const escaped = escapeRegExp(searchTerm);
      const regex = new RegExp(escaped, "gi");
      return regex.test(content);
    } catch {
      // Fallback to simple includes if regex fails
      return content.toLowerCase().includes(searchTerm.toLowerCase());
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
