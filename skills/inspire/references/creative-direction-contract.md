# Creative direction contract

Use this contract after design-language inference and before any product-code edits. The aim is not to reproduce references; it is to make a defensible recommendation for the target product.

## Target context

Infer the target from the user's prompt and repository. Record assumptions when audience, product category, or brand are not explicit. Do not invent a company history, customer claims, or brand assets.

## `personality.json`

Write a small editorial target for the new design. Use feelings and avoidances that help creative judgment.

```json
{
  "feelsLike": ["confident", "premium", "technical", "quiet", "architectural"],
  "avoids": ["playful", "generic startup", "bright", "cartoon"],
  "audienceSignal": "A capable practitioner should feel oriented and in control.",
  "evidence": ["references/sources/01-example/screenshots/full-page.png"],
  "confidence": 0.78
}
```

Use 3-6 distinct entries in each list. Avoid vague doubles such as `premium` and `high-end` together. These are direction labels, not claims about the reference or target.

## `brand-fit.json`

Map every meaningful reference trait to a decision for the target. Use `keep`, `adapt`, `replace`, or `avoid`.

```json
{
  "target": { "product": "AI developer tool", "audience": "technical teams" },
  "decisions": [
    {
      "referenceTrait": "Slow, spacious editorial pacing",
      "decision": "adapt",
      "targetExpression": "Generous product-story sections with concise technical proof.",
      "reason": "Preserves confidence without making the tool feel distant.",
      "evidence": ["references/sources/01-example/screenshots/full-page.png"]
    },
    {
      "referenceTrait": "Architecture photography",
      "decision": "replace",
      "targetExpression": "Code, terminal, workflow, dashboard, or product-system visuals.",
      "reason": "The target needs product relevance while retaining the source's composed visual rhythm.",
      "evidence": []
    }
  ],
  "nonNegotiables": ["Do not reuse source assets, copy, or one-to-one layouts."]
}
```

Every `keep` decision must identify an abstract principle, not a source asset or distinctive component.

## `creative-director.json`

This is the decision layer. It must directly answer what stays, changes, and why.

```json
{
  "target": { "product": "AI developer tool", "audience": "technical teams", "brandContext": "Repository-derived or user-supplied context" },
  "creativeThesis": "Make advanced technical work feel calm, deliberate, and legible.",
  "northStar": "Premium developer-tool confidence without borrowing luxury-industry subject matter.",
  "keep": [{ "principle": "Editorial hierarchy", "why": "Makes complex capability feel considered.", "implementation": "Use a target-owned type scale and terse technical copy." }],
  "change": [{ "principle": "Narrative pacing", "why": "The target needs faster proof of value.", "implementation": "Bring a product workflow into the first viewport." }],
  "replace": [{ "sourcePattern": "Architecture imagery", "reason": "Weak domain fit.", "targetExpression": "Live product surfaces, code, and system diagrams." }],
  "avoid": ["One-to-one section sequence", "source brand cues", "generic neon AI imagery"],
  "approval": "needs_approval"
}
```

Base every decision on target fit and screenshot evidence. Do not treat a reference's prestige as a reason to retain it.

## `design-playbook.md` and approval

Write a concise playbook with these headings: **Creative thesis**, **Why this works**, **Target personality**, **Keep**, **Change**, **Replace**, **Execution cues**, **Implementation prompt**, **Originality boundary**, and **Assumptions**. Explain the rationale in plain language; for example, why whitespace, hierarchy, typography, pacing, or restrained motion support the target. The implementation prompt must describe the target direction without reproducing source copy, assets, or layouts. End it with:

```text
Status: needs_approval
```

Present the playbook to the user and wait. On approval, replace the status with `approved` and set `creative-director.json.approval` to `approved`. On explicit bypass, record `bypassed_by_user` in both. Never imply approval from silence.
