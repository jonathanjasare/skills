# Design language contract

Use this contract after capturing sources. Raw CSS evidence measures what is present; semantic artifacts explain the likely design intent. Mark all semantic judgments as inferences.

For the target-aware creative direction, personality, brand-fit mapping, and approval brief, read [creative-direction-contract.md](creative-direction-contract.md).

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

Use scores as review prompts, not facts. Cite evidence and uncertainty. Before implementation, set `implementation.originality` to `null`; do not score source-site originality.

```json
{
  "scale": "0-10 heuristic; higher is stronger for the stated target and evidence scope",
  "reference": {
    "hierarchy": { "score": 9.0, "evidence": [], "uncertainty": "Desktop-only capture." },
    "motion": { "score": 8.0, "evidence": [], "uncertainty": "Runtime interaction not exhaustively tested." },
    "whitespace": { "score": 9.0, "evidence": [], "uncertainty": "" },
    "accessibility": { "score": 7.0, "evidence": [], "uncertainty": "Visual assessment; not a conformance audit." },
    "contrast": { "score": 8.0, "evidence": [], "uncertainty": "" }
  },
  "implementation": {
    "hierarchy": null,
    "motion": null,
    "whitespace": null,
    "accessibility": null,
    "contrast": null,
    "originality": null
  },
  "improvementPriorities": ["Concrete, evidence-based next action."],
  "assessedAt": "ISO-8601 timestamp"
}
```

After implementation, update every implementation score. Score originality against the explicit originality test in `SKILL.md`, never against similarity to a reference.

For a post-build critique and target-specific alignment scores, read [design-critic-contract.md](design-critic-contract.md).

## Screenshot-led review

For each completed source, inspect a top, middle, bottom, and full-page capture. Describe:

- pacing and rhythm;
- hierarchy and whitespace;
- emotional register and confidence;
- movement and feedback purpose;
- typography voice and storytelling arc.

Use raw color, typography, layout, and animation JSON to challenge or support observations. Never let an extracted hex value decide the visual story by itself.
