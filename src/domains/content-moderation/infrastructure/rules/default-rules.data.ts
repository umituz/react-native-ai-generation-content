/**
 * Default Moderation Rules
 * Built-in rules for content filtering - can be extended via config
 */

import type { ModerationRule } from "../../domain/entities/moderation.types";

const explicitContentRules: ModerationRule[] = [
  {
    id: "explicit-001",
    name: "Sexual Content",
    description: "Detects explicit sexual content and nudity",
    contentTypes: ["text", "image"],
    severity: "critical",
    violationType: "explicit_content",
    patterns: [
      "\\bsex\\b",
      "\\bsexual\\b",
      "\\bsexually\\b",
      "\\bnude\\b",
      "\\bnudity\\b",
      "\\bnaked\\b",
      "\\bnsfw\\b",
      "\\berotic\\b",
      "\\bporn\\b",
      "\\bporno\\b",
      "\\bpornography\\b",
      "\\bxxx\\b",
      "\\badult content\\b",
      "\\bexplicit\\b",
      "\\bintercourse\\b",
      "\\bintimate\\b.*\\brelation\\b",
      "\\bhaving sex\\b",
      "\\bmake love\\b",
      "\\bmaking love\\b",
      "\\borgasm\\b",
      "\\bmasturbat\\w*\\b",
      "\\bsexy\\b",
      "\\bsensual\\b",
    ],
    enabled: true,
  },
  {
    id: "explicit-002",
    name: "Body Parts Focus",
    description: "Detects inappropriate body part references",
    contentTypes: ["text", "image"],
    severity: "high",
    violationType: "explicit_content",
    patterns: [
      "\\bbreasts?\\b",
      "\\bboobs?\\b",
      "\\btits?\\b",
      "\\bbutt\\b",
      "\\bass\\b",
      "\\bbuttocks\\b",
      "\\bchest\\b.*\\b(exposed|revealing|bare)\\b",
      "\\bcleavage\\b",
      "\\bgenitals?\\b",
      "\\bpenis\\b",
      "\\bvagina\\b",
      "\\bgroin\\b",
    ],
    enabled: true,
  },
  {
    id: "explicit-003",
    name: "Vulgar Language",
    description: "Detects vulgar and profane sexual terms",
    contentTypes: ["text", "image"],
    severity: "critical",
    violationType: "explicit_content",
    patterns: [
      "\\bf+u+c+k+\\b",
      "\\bfuck\\w*\\b",
      "\\bsh[i1]t\\b",
      "\\bd[i1]ck\\b",
      "\\bcock\\b",
      "\\bpussy\\b",
      "\\bcunt\\b",
      "\\bwh[o0]re\\b",
      "\\bslut\\b",
      "\\bbitch\\b",
      "\\bhentai\\b",
      "\\bhooker\\b",
      "\\bprostitut\\w*\\b",
    ],
    enabled: true,
  },
];

const violenceRules: ModerationRule[] = [
  {
    id: "violence-001",
    name: "Graphic Violence",
    description: "Detects graphic violence and gore",
    contentTypes: ["text", "image", "video"],
    severity: "critical",
    violationType: "violence",
    patterns: [
      "\\bgore\\b",
      "\\bblood\\b.*\\b(splatter|dripping|pool)\\b",
      "\\bmurder\\b",
      "\\bkilling\\b",
      "\\btorture\\b",
      "\\bdismember\\b",
      "\\bbeheading\\b",
    ],
    enabled: true,
  },
  {
    id: "violence-002",
    name: "Weapons Focus",
    description: "Detects inappropriate weapon usage context",
    contentTypes: ["text", "image", "video"],
    severity: "medium",
    violationType: "violence",
    patterns: [
      "\\bgun\\b.*\\b(pointing|aimed|shooting)\\b",
      "\\bweapon\\b.*\\b(attack|assault|harm)\\b",
      "\\bknife\\b.*\\b(stabbing|cutting|slashing)\\b",
    ],
    enabled: true,
  },
];

const hateSpeechRules: ModerationRule[] = [
  {
    id: "hate-001",
    name: "Discriminatory Language",
    description: "Detects hate speech and discriminatory content",
    contentTypes: ["text", "voice"],
    severity: "critical",
    violationType: "hate_speech",
    patterns: [
      "\\bhate\\b.*\\b(speech|crime|group)\\b",
      "\\bracist\\b",
      "\\bsexist\\b",
      "\\bbigot\\b",
      "\\bxenophobia\\b",
    ],
    enabled: true,
  },
];

const illegalActivityRules: ModerationRule[] = [
  {
    id: "illegal-001",
    name: "Drug Content",
    description: "Detects drug-related content",
    contentTypes: ["text", "image", "video"],
    severity: "high",
    violationType: "illegal_activity",
    patterns: [
      "\\bdrug\\b.*\\b(dealing|trafficking|manufacturing)\\b",
      "\\bcocaine\\b",
      "\\bheroin\\b",
      "\\bmethamphetamine\\b",
      "\\billegal\\b.*\\b(substance|drug)\\b",
    ],
    enabled: true,
  },
];

const personalInfoRules: ModerationRule[] = [
  {
    id: "pii-001",
    name: "Personal Information",
    description: "Detects personal identifiable information",
    contentTypes: ["text", "image"],
    severity: "medium",
    violationType: "personal_info",
    patterns: [
      "\\b\\d{3}-\\d{2}-\\d{4}\\b",
      "\\b\\d{16}\\b",
      "\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b",
      "\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b",
    ],
    enabled: true,
  },
];

export const defaultModerationRules: ModerationRule[] = [
  ...explicitContentRules,
  ...violenceRules,
  ...hateSpeechRules,
  ...illegalActivityRules,
  ...personalInfoRules,
];
