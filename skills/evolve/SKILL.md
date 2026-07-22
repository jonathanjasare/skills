---
name: evolve
description: Inspect a software repository, assess the engineering capabilities evidenced by its artifacts, assign an explainable maturity level, identify the primary capability constraint, and recommend the next evidence-backed evolution. Use when the user invokes evolve, /evolve, or $evolve; requests a quick or full Engineering Capability Assessment; or asks for an architecture- or verification-focused maturity assessment and roadmap.
---

# Evolve

Answer: **What is the next evidence-backed evolution of this repository's engineering capabilities?**

Assess the repository. Do not modify it unless the user separately asks to implement a recommendation.

## Select depth and scope

- Use `quick` by default.
- Use `full` when explicitly requested or when the requested decision requires broad evidence.
- Treat `architecture` and `verification` as focus scopes, not separate methodologies. Combine them with either depth when requested, such as `evolve full architecture`.
- Normalize invocation tokens regardless of order or case. If both depth tokens appear, use `full` and state the normalization. If both focus tokens appear, cover both and their material dependencies. Treat other modifiers as context only when their meaning is clear; otherwise ask one concise clarification instead of inventing a scope.
- For a focus scope, inspect enough surrounding context to identify dependencies and avoid isolated recommendations.
- Keep a quick assessment quick, but deepen sampling around deployment or release paths, runtime-consumed generated artifacts, sensitive integrations, or an important user path whose verification is missing or unclear. Escalate to `full` only when the decision remains unsupported across the repository.

Before inspection, record whether Git metadata is accessible, absent, or unknown, and whether the topology is single-project, monorepo, or multi-project. State the root or roots in scope and explicitly include or exclude nested repositories and worktrees. Git metadata is optional evidence; its absence is not a capability gap.

## Inspect progressively

Inspect high-signal artifacts before source details:

1. Repository-local instructions
2. README and contribution guidance
3. Repository tree
4. Manifests and build configuration
5. Architecture documents and ADRs
6. Tests and verification configuration
7. CI, release, and deployment workflows
8. Infrastructure configuration
9. Ownership, security, and governance files
10. Representative source modules

Do not read every file by default. Sample artifacts according to repository size, purpose, risk, and assessment scope.

## Gate assessment commands

Assessment-only permission is read-only. Run an inspection command only when it is reasonably established not to change the workspace or external state. Before invoking repository scripts, classify them as read-only inspection or potentially mutating.

Do not presume builds, tests, linters, type checks, generated-artifact checks, creative renders, snapshot validation, installers, or release and deployment commands are read-only; they may create caches, outputs, lockfile changes, snapshots, services, or remote effects. If safety is unclear, inspect their definitions instead and record the command not run and why. Never change global Git configuration, including `safe.directory`, to gain assessment access. If Git history or status is unavailable, continue from artifacts and mark that evidence unknown.

## Apply the methodology

Read these references before assessing:

- [references/capability-model.md](references/capability-model.md) for the seven capabilities and proportional expectations.
- [references/maturity-model.md](references/maturity-model.md) for level criteria and bottleneck-based maturity determination.
- [references/assessment-method.md](references/assessment-method.md) for evidence classification, confidence, coverage, findings, and constraints.
- [references/recommendation-method.md](references/recommendation-method.md) before proposing interventions.

Keep the reasoning chain explicit:

```text
Evidence -> Observation -> Finding -> Constraint -> Improvement hypothesis
-> Candidate interventions -> Recommendation -> Validation method
```

Do not turn a missing file, tool, test, or document directly into a recommendation. Facts are not findings. Recommendations are testable hypotheses, not guaranteed truths.

Classify the statement being used, not the file as a whole:

- **Observed**: the existence, content, or result directly inspected in a repository artifact or command.
- **Declared**: a claim made by repository documentation or supplied context that direct inspection does not itself establish.
- **Inferred**: reasoned conclusion tied to observed or declared evidence.
- **Unknown**: relevant claim the available evidence cannot establish.

For example, the presence of a README sentence is observed; its uncorroborated claim about release frequency is declared. Split mixed statements or label both statuses.

Never infer team productivity, culture, meeting quality, delivery speed, historical practices, authorship method, or undocumented organisational processes from repository artifacts alone.

## Determine maturity and constraint

Assess:

1. Architecture clarity
2. Knowledge discoverability
3. Change safety
4. Verification capability
5. Delivery automation
6. Governance and ownership
7. Maintainability and evolution

Rate all seven capabilities in every assessment. A focus scope changes the depth of findings, not whether the other capabilities are checked for material constraints.

Report maturity using: `Fragile`, `Documented`, `Repeatable`, `Adaptive`, or `Self-improving`.

Do not average dimension ratings. Use the bottleneck method in the maturity reference: the overall level is the highest level the repository can consistently support across its essential capabilities. Explain which gaps constrain it.

Identify exactly one primary capability constraint. Add no more than two secondary constraints when they materially affect the roadmap. The primary constraint is the gap with the greatest system-wide effect, not necessarily the lowest-rated dimension.

If the overall level is `Self-improving`, do not invent a higher level or force a gap. Use `Sustain Self-improving` as the target. Identify an evidenced constraint normally when one exists; otherwise state `No consequential primary constraint evidenced`, name one material watch condition, and allow zero new recommendations.

## Recommend proportionally

Provide at most one primary recommendation and two supporting recommendations. Put optional later work in a separate, clearly deferred section.

Tie every recommendation to evidence, a constrained capability, an improvement hypothesis, effort, risk, confidence, validation, success criteria, and a rollback or removal condition. Reject unsupported, fashionable, duplicative, disproportionate, or untestable interventions.

Focus the roadmap on reaching the next maturity level, or sustaining validated learning loops at the terminal level. Do not prescribe advanced practices merely because they exist.

## Write the report

- For `quick`, use [templates/quick-assessment.md](templates/quick-assessment.md).
- For `full`, use [templates/full-assessment.md](templates/full-assessment.md).
- For a focus scope, keep the selected template but limit detailed findings to that capability and its material dependencies.

State important unknowns and assessment boundaries. Use qualitative confidence (`low`, `medium`, or `high`) and describe evidence coverage; do not use unexplained percentages or false precision.

Return the Engineering Evolution Report in the conversation unless the user asks for a file.
