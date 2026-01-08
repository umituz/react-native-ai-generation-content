# Content Moderation Domain

Content moderation and filtering system for AI-generated content.

## 📍 Import Path

```typescript
import {
  ModerationWrapper,
  moderateText,
  moderateImage,
  moderateVideo,
  moderateVoice
} from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/domains/content-moderation/`

## 🎯 Domain Purpose

Provide comprehensive content moderation capabilities for AI-generated content. Ensure that generated content meets safety guidelines and community standards through configurable rules, policy violation detection, and multi-modal content filtering.

---

## 📋 Usage Strategy

### When to Use This Domain

✅ **Use Cases:**
- Filtering inappropriate text prompts
- Detecting policy violations in images
- Moderating user-generated content
- Ensuring community safety standards
- Compliance with content regulations

❌ **When NOT to Use:**
- Censoring legitimate content
- Over-blocking creative expression
- Replacing human moderation entirely
- Real-time chat moderation (use specialized tools)

### Implementation Strategy

1. **Enable moderation** early in development
2. **Configure rules** based on use case
3. **Set thresholds** appropriately (strict vs lenient)
4. **Implement callbacks** for violations
5. **Test thoroughly** with edge cases
6. **Monitor false positives/negatives**
7. **Adjust rules** based on feedback

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Configuration Requirements
- **MUST** enable moderation for user-generated content
- **MUST** configure rules based on platform policies
- **MUST** set appropriate confidence thresholds
- **MUST** implement violation callbacks
- **MUST** handle moderation results properly

### 2. Rule Categories
- **MUST** cover profanity filtering
- **MUST** cover hate speech detection
- **MUST** cover violent content
- **MUST** cover sexual content
- **MUST** cover harassment/bullying

### 3. Threshold Settings
- **MUST** balance strictness with user experience
- **MUST** test thresholds with real content
- **MUST** allow adjustment based on feedback
- **MUST** consider platform-specific requirements
- **MUST** document threshold rationale

### 4. User Experience
- **MUST** provide clear violation messages
- **MUST** allow appeals/overrides when appropriate
- **MUST** explain why content was flagged
- **MUST** offer guidance on corrections
- **MUST** respect user context

### 5. Performance
- **MUST** implement efficient moderation checks
- **MUST** cache moderation results when appropriate
- **MUST** handle high-volume content
- **MUST NOT** block main thread excessively
- **MUST** optimize for speed

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Disabled Moderation**
   - Always enable moderation for public platforms
   - Never ship without moderation in production
   - Document why if disabled (private/internal only)

2. **No Hardcoded Rules**
   - Never hardcode moderation logic
   - Use configurable rules system
   - Allow runtime adjustment

3. **No Silent Blocking**
   - Always explain why content was blocked
   - Never silently filter content
   - Provide clear feedback to users

4. **No Over-Blocking**
   - Avoid false positives
   - Test thoroughly before deploying
   - Implement appeal process

5. **No Context Ignoring**
   - Always consider content context
   - Never apply rules blindly
   - Allow for exceptions when appropriate

6. **No Privacy Violations**
   - Never store moderation data unnecessarily
   - Anonymize logged content
   - Comply with privacy regulations

7. **No Biased Rules**
   - Ensure rules are fair and unbiased
   - Test for demographic bias
   - Regularly audit moderation outcomes

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

#### Prompt Template for AI Agents

```
You are implementing content moderation using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import moderation functions from package
2. Enable moderation for user-generated content
3. Configure rules based on platform policies
4. Set appropriate confidence thresholds
5. Implement violation callbacks
6. Test with edge cases
7. Monitor false positives/negatives
8. Adjust rules based on feedback

CRITICAL RULES:
- MUST enable moderation before production
- MUST implement clear violation messaging
- MUST allow appeals/overrides when appropriate
- MUST explain why content was flagged
- MUST test thoroughly with real content
- MUST document threshold rationale

MODERATION TYPES:
- Text: Filter inappropriate text content
- Image: Detect and filter inappropriate images
- Video: Moderate video content
- Voice: Filter audio content

RULE CATEGORIES:
- Profanity: Filter bad language
- Hate Speech: Detect hateful content
- Violence: Flag violent content
- Sexual: Detect sexual content
- Harassment: Flag bullying/harassment

THRESHOLDS:
- Strict: 0.3 (more blocking, safer)
- Balanced: 0.5 (default)
- Lenient: 0.8 (less blocking, more risk)

STRICTLY FORBIDDEN:
- No disabled moderation in production
- No hardcoded rules
- No silent blocking
- No over-blocking
- No context ignoring
- No privacy violations
- No biased rules

QUALITY CHECKLIST:
- [ ] Moderation enabled
- [ ] Rules configured
- [ ] Thresholds set appropriately
- [ ] Violation callbacks implemented
- [ ] Clear user messaging
- [ ] Appeal process in place
- [ ] Testing with edge cases
- [ ] Monitoring implemented
- [ ] Feedback mechanism
- [ ] Regular audits
```

---

## 🛠️ Configuration Strategy

### Moderation Config

```typescript
interface ModerationConfig {
  enabled: boolean;
  rules?: ModerationRule[];
  threshold?: number; // 0-1, default: 0.5
  onViolation?: (result: ModerationResult) => void;
  allowOverride?: boolean;
}
```

### Strict vs Lenient

**Strict (Safe Platforms)**
```typescript
{
  threshold: 0.3,
  allowOverride: false,
  rules: [
    { category: 'profanity', severity: 'low', action: 'block' },
    { category: 'hate-speech', severity: 'high', action: 'block' },
    // ... all categories, block on low severity
  ]
}
```

**Lenient (Creative Platforms)**
```typescript
{
  threshold: 0.8,
  allowOverride: true,
  rules: [
    { category: 'hate-speech', severity: 'high', action: 'block' },
    { category: 'sexual', severity: 'high', action: 'warn' },
    // ... only high severity, allow warnings
  ]
}
```

---

## 📊 Moderation Types

### Text Moderation
- Detect profanity, hate speech, harassment
- Return filtered text and violation positions
- Support for multiple languages

### Image Moderation
- Detect nudity, violence, gore
- Return bounding boxes for violations
- Face detection integration

### Video Moderation
- Frame-by-frame analysis
- Timestamp violation reporting
- Configurable frame intervals

### Voice Moderation
- Transcribe and analyze speech
- Detect profanity and hate speech
- Timestamp violations

---

## 🔐 Privacy & Ethics

### Privacy
- Anonymize moderation data
- Store minimal information
- Comply with GDPR/CCPA

### Ethics
- Avoid biased moderation
- Regular bias audits
- Fair appeal process
- Transparent policies

---

## 🐛 Common Pitfalls

❌ **Over-blocking**: Too many false positives → Adjust thresholds
❌ **Under-blocking**: Missed violations → Lower thresholds, add rules
❌ **Slow moderation**: Performance issues → Optimize, cache results
❌ **Poor messaging**: User confusion → Clear violation explanations

---

## 📚 Related Domains

- [Prompts](../prompts) - AI prompt management
- [Creations](../creations) - Manage AI-generated creations
- [Face Detection](../face-detection) - Face detection API

---

**Last Updated**: 2025-01-08
**Version**: 2.0.0 (Strategy-based Documentation)
