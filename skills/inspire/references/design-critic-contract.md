# Design Critic contract

Use this after an approved direction has been implemented. Compare implementation screenshots and interactions with the approved `design-playbook.md`, `personality.json`, and `creative-director.json`. Critique drift, not personal taste or similarity to a source.

## Review method

1. Inspect the implementation at the target breakpoints and compare it with the approved playbook.
2. Check the hero, hierarchy, spacing rhythm, CTA clarity, typography voice, motion restraint, responsive behavior, focus states, contrast, and originality boundary.
3. For an editorial target, inspect reading width, body font size and line height, heading hierarchy, article metadata, footnotes, code overflow, tables, figures and captions, related content, topic navigation, newsletter conversion, and narrow-screen reading. Check keyboard navigation and reduced motion in every profile.
4. Verify canonical URLs, structured data, RSS, sitemap, and robots guidance when they are in scope. Mark Core Web Vitals as unverified unless real field data or a credible project-supported lab measurement exists.
5. Identify the most consequential drift first. Make every finding specific enough to guide an edit.
6. Separate observed issues from uncertain inferences. Do not declare accessibility conformance from screenshots alone.

## `design-critic.md`

Write these headings: **Direction alignment**, **What holds**, **Drift**, **Editorial quality** (editorial targets only), **Priority fixes**, **Validation gaps**, and **Next pass**. In **Editorial quality**, record each check as `pass`, `needs action`, `not applicable`, or `unverified`, with evidence.

Use findings such as `Hero asks the user to parse too many competing elements before the value proposition`, not vague statements such as `Hero is bad`. Include the relevant playbook intent and screenshot or code evidence for each drift item.

## Alignment scores

Add an `alignment` object to `design-score.json` after build. Score only traits selected by `personality.json` or the approved playbook. A score is a 0-100 heuristic for adherence to that specific target, not an objective quality measure.

```json
{
  "alignment": {
    "premiumConfidence": { "score": 92, "evidence": ["Implementation screenshot: hero"], "drift": "CTA hierarchy is slightly too assertive." },
    "developerNative": { "score": 87, "evidence": ["Implementation screenshot: workflow section"], "drift": "Replace abstract decorative visual with a product-system view." },
    "editorialRestraint": { "score": 94, "evidence": ["Implementation screenshot: full page"], "drift": "" },
    "originality": { "score": 98, "evidence": ["Distinct information architecture and target-native imagery"], "drift": "" }
  }
}
```

Use target-specific names, not a fixed `luxury` category. If a trait was not approved, do not score it. Keep the score secondary to the written critique and prioritized fixes. Ensure the `highestROI` object in `design-score.json` points to the single change with the clearest user-facing impact.
