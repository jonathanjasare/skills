---
name: contribute
description: Understand a software repository, identify or validate one worthwhile contribution, decide whether it should become a GitHub issue, a draft pull request, or neither, and prepare or execute the authorised workflow. Use when the user invokes contribute, /contribute, or $contribute; asks to find a contribution opportunity; wants an issue investigated or drafted; wants a bounded contribution implemented as a draft PR; supplies an issue URL or contribution idea; or asks to turn an evolve recommendation into a concrete contribution.
---

# Contribute

Produce one aligned, evidence-backed contribution that justifies maintainer attention. Prefer neither issue nor pull request over weak, duplicate, speculative, misaligned, or disproportionate work.

## Interpret the invocation

- `contribute`: inspect and recommend one candidate; do not modify or publish.
- `contribute auto`: decide issue, draft PR, or neither; present the decision and required authority before acting.
- `contribute issue [candidate]`: investigate and prepare one issue. Publish only when the user explicitly asks to create or publish it.
- `contribute pr [candidate or issue URL]`: investigate, implement one bounded contribution, verify it, and create a draft PR. This authorises repository-local edits, a focused contribution branch and commit, a push to an existing writable remote, and draft-PR creation when needed. It does not authorise creating a fork, pushing to a default or protected branch, ready-for-review, merge, deployment, or unrelated changes.
- `contribute <idea>`: treat the idea as an unverified candidate and recommend issue, PR, or neither.
- `contribute <issue URL>`: inspect the issue and current repository state, then decide whether it is actionable. Do not infer implementation authority without `pr` or an explicit request.
- `contribute from-evolve`: revalidate one current `evolve` recommendation; do not treat it as established truth.

When multiple candidates or ambiguous modes are supplied, narrow to one candidate and state the interpretation. Ask only when the choice materially changes authority or outcome.

## Respect authority

Treat inspection, recommendation, drafting, publication, source modification, branching, committing, pushing, draft-PR creation, readying, and merging as separate actions. Never merge. Never mark ready unless explicitly requested. Do not infer authority for a later action from an earlier one except for the documented `pr` workflow above.

Default and `auto` modes are read-only. Issue mode drafts by default. If duplicate search, repository access, credentials, or another required permission is unavailable, prepare the best safe artifact and report the blocker instead of bypassing it.

## Follow the contribution workflow

1. Read [references/repository-orientation.md](references/repository-orientation.md). Establish the repository contract, current state, relevant precedent, and duplicate-search surface.
2. Select one candidate from repository demand, a user idea, an issue, or an `evolve` recommendation. Do not produce a backlog.
3. Read [references/candidate-vetting.md](references/candidate-vetting.md). Build the chain:

   ```text
   Evidence -> Observation -> Consequence -> Contribution hypothesis
   -> Candidate interventions -> Vetting -> Issue, PR, or neither -> Validation
   ```

4. Read [references/issue-or-pr-decision.md](references/issue-or-pr-decision.md). Make the issue, PR, or neither decision before editing.
5. If authorised, execute only the chosen workflow. Repository-provided templates, issue forms, contribution rules, architecture, conventions, and verification override the fallbacks in this skill.
6. Read [references/contribution-quality.md](references/contribution-quality.md). Review the complete issue or diff, scope, evidence, verification, unknowns, and maintainer cost before handing off or publishing.

## Classify claims precisely

- **Direct:** the exact repository or GitHub state inspected, including literal file content or command output.
- **Declared:** a claim made by a user, issue, README, or design document that has not been corroborated.
- **Inferred:** a conclusion tied to direct or declared evidence.
- **Unknown:** a relevant claim the available evidence cannot establish.

An inspected document is direct evidence that the text exists; its behavioural claim remains declared until corroborated. Likewise, inspected source directly establishes its text and structure, while a runtime effect is inferred until execution or equivalent evidence corroborates it. Never present declared or inferred evidence as direct fact.

## Protect repository and external state

Inspect command definitions before running them. Assessment-only commands must be read-only. Implementation mode permits scoped repository edits and ordinary native verification, but not deployments, releases, secret access, destructive cleanup, snapshot acceptance, or other external effects unless explicitly authorised.

Preserve pre-existing work. Confirm the root, branch, remotes, working-tree changes, and nested repositories where accessible. Do not stash, discard, overwrite, reformat, or commit user changes; if the contribution cannot be isolated from overlapping work, stop. Before pushing, confirm the remote URL, whether it is upstream or an existing fork, and the head and base branches. If no suitable writable remote exists or a new fork is required, stop and request that separate authority. Never change global Git configuration to gain access. If Git or hosted state is unavailable, continue only as far as the evidence and authority permit and mark the remainder unknown.

## Enforce scope and stops

Produce one cohesive contribution. Prefer the smallest coherent scope that resolves the justified problem; do not equate smallest with fewest lines. Avoid opportunistic refactoring, unrelated upgrades, formatting churn, speculative abstractions, and unrequested cleanup.

Stop and report when evidence changes materially, a duplicate exists, behaviour or architecture requires maintainer judgement, verification is unavailable or inconclusive, the change expands materially, repository rules redirect the work, credentials are required, or the contribution becomes disproportionate. Do not improvise around a stop condition.

## Produce the result

- Default or `auto`: return a concise Contribution Assessment with repository understanding, one candidate, classified evidence, consequence, hypothesis, alternatives, issue/PR/neither decision, scope, validation, risks, unknowns, and required approval.
- Issue: use the repository template or form; otherwise use [assets/issue-template.md](assets/issue-template.md). Show title, final body, duplicate result, and why issue is preferable before publication.
- PR: implement the bounded change, use the repository template or [assets/pull-request-template.md](assets/pull-request-template.md), run safe native verification, review the diff, and create a draft PR when authorised. Report changed files, results, unverified areas, scope compliance, risks, and link.
- Neither: explain why no contribution is justified and what evidence could change that conclusion.

Use [examples/issue-contribution.md](examples/issue-contribution.md) and [examples/pull-request-contribution.md](examples/pull-request-contribution.md) as decision examples, not fixed output formulas.
