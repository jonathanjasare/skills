# Design language contract

Use this contract after capturing sources. Raw CSS evidence measures what is present; semantic artifacts explain the likely design intent. Mark all semantic judgments as inferences.

For the target-aware creative direction, personality, brand-fit mapping, and approval brief, read [creative-direction-contract.md](creative-direction-contract.md). Use the editorial additions only when the target is an editorial or reading-first experience.

## `reference-map.json`

Make capture coverage explicit before making inferences. Include every evidence bundle and preserve uncertainty about its role.

```json
{
  "sources": [
    {
      "id": "01-example-com",
      "url": "https://example.com/article/example",
      "role": "article",
      "viewport": "desktop",
      "bundle": "sources/01-example-com",
      "completeness": "complete",
      "notes": "Role inferred from visible article metadata and byline."
    }
  ]
}
```

Use `homepage`, `article`, `topic_or_category`, `author`, `search`, or `unknown` for `role`. Keep narrow viewport article evidence distinct from desktop evidence.

## `design-system.json`

Create one concise, implementation-oriented summary. Keep these exact top-level keys and use the controlled vocabulary where it helps:

```json
{
  "tone": "luxury | premium | minimal | editorial | technical | developer | finance | startup | healthcare | other",
  "density": "airy | balanced | dense",
  "motion": "still | restrained | measured | energetic",
  "contrast": "low | medium | high",
  "borderRadius": "minimal | soft | rounded | mixed",
  "sectionSpacing": "compact | regular | large | very large",
  "ctaStyle": "solid | ghost | text | mixed",
  "headlineStyle": "editorial | geometric | utility | expressive | mixed",
  "confidence": 0.0,
  "evidence": {
    "tone": ["sources/01-example/screenshots/full-page.png"],
    "motion": ["sources/01-example/animations.json"]
  },
  "inferenceNotes": ["Why the selected combination creates its feeling."]
}
```

Use a single primary value where the system is coherent. Use `mixed` or `other` only when supported by evidence. Do not copy a source palette or font pairing wholesale.

## `design-thesis.md`

Explain the visible system as a human would experience it, not as a CSS inventory. Start with a one-sentence claim in this form:

```text
This site feels <quality> because <three or more connected mechanisms>.
```

Then use these headings: **Observed mechanisms**, **Why the mechanisms work together**, **Transferable principles**, and **Evidence and uncertainty**. Tie each mechanism to screenshots or raw evidence. Use terms such as pacing, deliberate omission, narrative sequence, hierarchy, typographic voice, and confidence only when the capture supports them. Keep source diagnosis separate from the target's creative thesis.

## `editorial-profile.json`

Create this only for an editorial target. Record each item as an observed reference pattern, a target-owned expression, and a concrete acceptance check.

```json
{
  "profile": "editorial",
  "readingWidth": { "observed": "Narrow long-form measure", "targetExpression": "Use a readable max-width without copying source values.", "acceptance": "Body copy remains comfortable at desktop and mobile widths." },
  "bodyTypography": { "observed": "High-legibility text contrast and generous leading", "targetExpression": "Use the target's own type system.", "acceptance": "Font size and line height support sustained reading." },
  "headingRhythm": { "observed": "Headings reset pace without detaching from the following copy", "targetExpression": "Use a target-specific scale and spacing rhythm.", "acceptance": "No heading is stranded or visually confused with body copy." },
  "articleMetadata": { "observed": "Byline, date, topic, and reading context are easy to scan", "targetExpression": "Expose relevant publication metadata.", "acceptance": "Metadata is semantic, legible, and not duplicated." },
  "longFormBlocks": ["footnotes", "code", "tables", "figures_and_captions"],
  "discovery": ["related_articles", "topic_navigation", "newsletter_conversion"],
  "mobileReading": { "observed": "Reading order and measure remain clear on narrow screens", "targetExpression": "Preserve hierarchy and prevent horizontal overflow.", "acceptance": "Article routes remain usable at a narrow viewport." }
}
```

Mark features absent from the target or source as `not_applicable`; do not manufacture them.

## `design-dna.json`

Write this for multi-source captures and, for a single source, use it to identify transformed principles rather than duplicating components.

```json
{
  "sources": [{ "id": "01-example", "url": "https://example.com" }],
  "blend": {
    "typography": { "source": "01-example", "strength": 5, "principle": "Short editorial headlines with utilitarian supporting copy.", "transformation": "Use the target brand's own type scale and pairing." },
    "animations": { "source": "02-other", "strength": 4, "principle": "Slow, contextual reveals.", "transformation": "Create new timing and choreography." },
    "cards": { "source": "03-third", "strength": 4, "principle": "Clear information grouping without ornamental chrome.", "transformation": "Use a distinct component geometry." },
    "navigation": { "source": "01-example", "strength": 4, "principle": "Persistent orientation during a long narrative.", "transformation": "Use target-specific labels and layout." },
    "spacing": { "source": "02-other", "strength": 5, "principle": "Generous sectional breathing room.", "transformation": "Adopt a new spacing scale." }
  },
  "antiPatterns": ["Avoid a one-to-one section sequence or a copied visual signature."],
  "blendRationale": "Why these complementary strengths support the target product."
}
```

Choose a source only if it leads that dimension. A strength is a 1-5 comparative usefulness rating, not a claim of objective quality.

## `design-score.json`

Use scores as review prompts, not facts. Cite evidence and uncertainty. Before implementation, set `implementation.originality` to `null`; do not score source-site originality. Select dimensions for the target rather than forcing a generic checklist. Do not calculate or present an overall score.

```json
{
  "scale": "0-10 heuristic; higher is stronger for the stated target and evidence scope",
  "reference": {
    "hierarchy": { "score": 9.0, "evidence": [], "uncertainty": "Desktop-only capture." },
    "editorial": { "score": 9.0, "evidence": [], "uncertainty": "Not applicable for non-editorial targets." },
    "trust": { "score": 8.0, "evidence": [], "uncertainty": "Visual assessment only." },
    "conversion": { "score": 6.0, "evidence": [], "uncertainty": "No conversion data available." },
    "accessibility": { "score": 7.0, "evidence": [], "uncertainty": "Visual assessment; not a conformance audit." },
    "motion": { "score": 8.0, "evidence": [], "uncertainty": "Runtime interaction not exhaustively tested." }
  },
  "implementation": {
    "hierarchy": null,
    "editorial": null,
    "trust": null,
    "conversion": null,
    "accessibility": null,
    "motion": null,
    "originality": null
  },
  "highestROI": {
    "action": "Increase separation between the two visually competing article sections.",
    "expectedImpact": "Improves reading rhythm and hierarchy.",
    "evidence": [],
    "scope": "implementation"
  },
  "improvementPriorities": ["Only lower-priority, concrete, evidence-based actions."],
  "assessedAt": "ISO-8601 timestamp"
}
```

After implementation, update every applicable implementation score. Use `not_applicable` instead of inventing a score. Score originality against the explicit originality test in `SKILL.md`, never against similarity to a reference.

For a post-build critique and target-specific alignment scores, read [design-critic-contract.md](design-critic-contract.md).

## Screenshot-led review

For each completed source, inspect a top, middle, bottom, and full-page capture. Describe:

- pacing and rhythm;
- hierarchy and whitespace;
- emotional register and confidence;
- movement and feedback purpose;
- typography voice and storytelling arc.

Use raw color, typography, layout, and animation JSON to challenge or support observations. Never let an extracted hex value decide the visual story by itself.
