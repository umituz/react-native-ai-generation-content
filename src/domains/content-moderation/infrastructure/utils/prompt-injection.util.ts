/**
 * Prompt Injection Detection Utilities
 * Detects various forms of prompt injection attacks
 */

/**
 * Multi-layered prompt injection detection
 * Combines regex with string matching for better security
 */
export function containsPromptInjection(content: string): boolean {
  const lowerContent = content.toLowerCase();

  // Critical injection patterns (string-based for safety)
  const criticalPatterns = [
    "ignore all instructions",
    "ignore previous instructions",
    "disregard all instructions",
    "forget all instructions",
    "you are now a",
    "jailbreak",
    "dan mode",
    "developer mode",
    "system:",
    "[system]",
    "<<system>>",
  ];

  for (const pattern of criticalPatterns) {
    if (lowerContent.includes(pattern)) {
      return true;
    }
  }

  // Additional regex patterns for more complex matching
  const regexPatterns = [
    /act\s+as\s+(if|though)\s+you/gi,
    /pretend\s+(you\s+are|to\s+be)/gi,
    /bypass\s+(your\s+)?(safety|content|moderation)/gi,
    /override\s+(your\s+)?(restrictions?|limitations?|rules?)/gi,
  ];

  return regexPatterns.some(pattern => {
    try {
      return pattern.test(content);
    } catch {
      return false;
    }
  });
}
