/**
 * Content Security Utilities
 * Provides security validation for content including malicious code detection
 */

/**
 * HTML entity encoding detection
 * More reliable than regex for detecting encoded malicious content
 */
export function containsHTMLEntities(content: string): boolean {
  const htmlEntities = [
    /&lt;/gi, /&gt;/gi, /&quot;/gi, /&amp;/gi, /&apos;/gi,
    /&#\d+;/gi, /&#x[0-9a-fA-F]+;/gi,
  ];
  return htmlEntities.some(entity => entity.test(content));
}

/**
 * Safe string matching for malicious code detection
 * Uses string operations instead of regex where possible
 */
export function containsMaliciousPatterns(content: string): boolean {
  const lowerContent = content.toLowerCase();

  // Check for script tags (case-insensitive)
  const scriptPatterns = ["<script", "</script>", "javascript:", "onclick=", "onerror=", "onload="];
  for (const pattern of scriptPatterns) {
    if (lowerContent.includes(pattern)) {
      return true;
    }
  }

  // Check for HTML entities (potential evasion)
  if (containsHTMLEntities(content)) {
    return true;
  }

  return false;
}
