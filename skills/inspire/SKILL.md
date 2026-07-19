---
name: inspire
description: Capture one or more public websites with Playwright, infer their design language from screenshots and measured evidence, create target-aware creative direction and an approval-ready playbook, blend selected design strengths into a Design DNA, build an original branded website, and critique the result against the approved direction. Use when the user invokes /inspire or $inspire with one or more URLs, asks to capture references, create creative direction, build from approved references, critique a built design, analyze or blend reference sites, extract design language, or build a website inspired by web design without cloning it.
---

# Inspire

Turn reference sites into an original, implementable design direction. Treat source sites as research, never templates.

## Default behavior

- For one or more supplied URLs, capture evidence, infer design language, create creative direction and an approval-ready design brief. Do not ask the user to restate the task.
- Present the brief and get approval before editing product code. Continue immediately only when the user explicitly says to build immediately, skip approval, or equivalent.
- Stop after analysis if the user explicitly requests research, a reference pack, or no implementation.
- With multiple URLs, create a purposeful blend. Assign each design dimension to the strongest source rather than averaging sites into a generic result. Respect explicit user source preferences over automatic assignments.
- Apply supplied branding; otherwise use the target project's existing brand and content conventions. Ask only if no target repository or usable brand context exists.

## Modes

Use these lightweight modes to stop at a useful boundary. They are skill modes, not separate products.

- `inspire capture <url> [url ...]`: capture raw evidence only. Do not infer, direct, or edit product code.
- `inspire direct`: consume an existing `references/` pack, infer design language, write the creative direction and `design-playbook.md`, then request approval.
- `inspire build`: require an approved `design-playbook.md` or an explicit user bypass, then implement and critique.
- `inspire <url> [url ...]`: run capture then direct; wait for approval before build.

Use the host agent's invocation syntax for the `inspire` skill (for example `/inspire` or `$inspire`).

Do not add a separate reverse-inspire or comparison mode. Include a reusable implementation prompt in the playbook and use multi-source Design DNA for source selection.

## Capture one or more sources

1. Inspect the target repository, local instructions, and package manager. Preserve existing architecture and unrelated changes.
2. Confirm a Playwright-capable Node runtime. Prefer the project's installed `playwright`; otherwise use an available bundled runtime. Ask before installing dependencies.
3. Run the multi-source capture script. Pass every URL before flags:

   ```powershell
   node <skill-directory>/scripts/capture-design-language.mjs https://example.com https://example.org --out <workspace>/references
   ```

   Optional flags: `--width`, `--height`, `--settle-ms`, `--max-elements`, and `--headed`.
4. Check `capture-design-language-report.json` and each source's `capture-report.json`. Describe partial captures rather than inventing evidence.
5. Visually inspect representative top, middle, bottom, and full-page screenshots for every completed source. Read [references/design-language-contract.md](references/design-language-contract.md) and [references/creative-direction-contract.md](references/creative-direction-contract.md) before writing semantic artifacts.

Capture only user-supplied public pages. Do not bypass authentication, paywalls, bot protection, robots guidance, or other access controls. Do not copy source code, private content, logos, product names, text, imagery, or icon sets.

## Infer design language

Use screenshots as the primary evidence for feeling and storytelling; use the raw CSS and layout JSON as supporting evidence. Create the following at the root of `references/`:

1. `design-system.json`: concise semantic values for tone, density, motion, contrast, border radius, section spacing, CTA style, and headline style.
2. `design-dna.json`: when multiple sources are supplied, name the source chosen for typography, animation, cards, navigation, spacing, and other relevant categories, with a short rationale and transformation instruction. Include one source only when it genuinely leads a category.
3. `design-score.json`: score hierarchy, motion, whitespace, accessibility, contrast, and the final implementation's originality on a 0-10 heuristic scale. Include evidence, uncertainty, and the highest-value improvements. Do not score source-site originality; score originality only after the new site exists.
4. `personality.json`: define what the target should feel like and explicitly avoid. Use emotional and editorial language rather than CSS values.
5. `brand-fit.json`: map reference traits to the target product as `keep`, `adapt`, `replace`, or `avoid`, including a target-native expression and reason.
6. `creative-director.json`: make the central recommendation: what should stay, change, or disappear for this product and why.
7. `design-playbook.md`: turn the direction into a concise, approval-ready rationale and implementation guide. Include assumptions, the creative thesis, why the direction works, the source principles to preserve, the target-domain replacements, execution cues, a reusable implementation prompt, and the originality boundary.

Do not reduce a design language to extracted colors or pixel values. Infer why it feels premium, editorial, technical, calm, energetic, or trustworthy, but label judgments as inferences and tie them to screenshot evidence. Do not claim automated accessibility conformance; validate it separately when building.

## Creative director and approval

Use the target product, audience, brand, and repository context to answer: "If these references were redesigned for this product, what should stay, what should change, and why?" Do not merely list visual attributes.

1. Keep only principles that support the target: pacing, whitespace, hierarchy, typography voice, confidence, or interaction intent.
2. Replace source-specific subject matter that does not fit the target. For example, translate architecture photography for an AI developer tool into code, terminal, workflow, dashboard, or product-system visuals while retaining the underlying composition and pace.
3. Prefer user-provided assets and existing product visuals. Do not repurpose source assets or invent copyrighted brand material.
4. Present `design-playbook.md` in the conversation and explicitly ask for approval or corrections. Do not edit product code while the playbook status is `needs_approval`.
5. If the user approves, update the brief status to `approved` and proceed. If they correct the direction, revise the semantic and creative-director artifacts, then present the new brief. If they explicitly request immediate building, record `approval: bypassed_by_user` and proceed.

## Build and score

1. Start only after approved creative direction or an explicit user bypass. Read the semantic artifacts, raw evidence, target project, and user brand context.
2. State a short implementation intent: principles to retain, source dimensions to transform, project-native components to preserve, and originality moves.
3. Build an original design. Change several major dimensions: information architecture, copy, brand system, component geometry, imagery, and motion choreography. The result must not be mistaken for a source at a glance.
4. Validate responsive states, keyboard and focus behavior, contrast, motion preferences, key interactions, and repository-focused checks.
5. Capture representative screenshots of the implementation. Read [references/design-critic-contract.md](references/design-critic-contract.md), write `design-critic.md`, and update `design-score.json` with implementation alignment and prioritized next improvements. Treat scores as review prompts, not objective measurements.
6. Report files changed, validation performed, selected Design DNA, Design Critic findings, and the highest-impact remaining improvements.

## Originality test

Before handoff, verify all of the following:

- No source code, trademark, copy, image, illustration, or distinctive icon set was reused without permission.
- Page hierarchy and section sequence are not one-to-one reproductions.
- Colors and typography are adapted to the user's brand rather than copied as a combination.
- Motion preserves intent without recreating signature choreography.
- Screenshots stay in research artifacts and are not shipped.

If a user requests a pixel-identical clone, preserve useful principles but build an original implementation unless they show authorization to reproduce the source.

## Output contract

```text
references/
|-- sources/
|   |-- 01-example-com/          # one complete raw evidence bundle per URL
|   `-- 02-example-org/
|-- sources.json
|-- capture-design-language-report.json
|-- design-system.json
|-- design-dna.json
|-- design-score.json
|-- personality.json
|-- brand-fit.json
|-- creative-director.json
|-- design-playbook.md
`-- design-critic.md             # after build only
```

Raw source bundles contain screenshots, scroll recording, colors, typography, layout, animation, capture report, and provenance. Keep raw observations separate from semantic inference.
