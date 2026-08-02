# Assessment method

## 1. Establish the profile

Record repository purpose, topology, runtime, delivery model, risk, and the assessment depth and focus. Record whether Git metadata is accessible, absent, or unknown, and whether the topology is single-project, monorepo, or multi-project. State the roots in scope and whether nested repositories or worktrees are included. Mark unsupported profile claims as unknown.

## 2. Build an evidence ledger

For every material item record:

| Field | Meaning |
| --- | --- |
| Artifact | File, command, or supplied context |
| Classification | Observed, Declared, Inferred, or Unknown |
| Observation | Neutral statement of what the evidence shows |
| Capability | Relevant capability dimension |
| Relevance | Why it matters to the assessment |
| Limit | What the evidence cannot establish |

Classify the statement being used rather than assigning one status to an entire artifact:

- The existence and literal content of an inspected file or command result are `Observed`.
- A claim made by documentation or supplied context is `Declared` until corroborated by implementation or a relevant check.
- A conclusion drawn from observed or declared evidence is `Inferred`.
- A relevant claim the available evidence cannot establish is `Unknown`.

For a mixed item, split the ledger row or record both statuses. Prefer repository artifacts over generic assumptions.

## 3. Sample according to depth

### Quick

Inspect high-signal instructions, README, tree, manifests, representative tests, automation, and only enough source to validate the likely constraint. Deepen sampling around deployment or release paths, runtime-consumed generated artifacts, sensitive integrations, or an important user path whose verification is missing or unclear. This targeted escalation does not require a full audit. Stop when additional reading is unlikely to change the maturity estimate or primary recommendation. State coverage gaps.

### Full

Inspect representative architecture, source boundaries, tests, delivery, ownership, infrastructure, and maintenance artifacts. Sample across major packages or services and important risk paths. Do not substitute file volume for coverage.

### Focused

Inspect the selected capability deeply and its material dependencies. For architecture, include verification and delivery constraints when they affect safe change. For verification, include architecture and user or operational outcomes needed to judge test value.

## 4. Gate commands

Treat assessment-only work as read-only. Run a command only after reasonably establishing that it will not change the workspace or external state. File listing, text search, and file reads are normally inspection commands; repository scripts require inspection before execution.

Do not assume builds, tests, linters, type checks, generated-artifact validation, creative renders, snapshot tools, installers, services, or release and deployment commands are safe: they may write caches, outputs, lockfiles, snapshots, or remote state. When safety is unclear, inspect definitions and prior configuration instead, then record what was not run and why. Do not change global Git configuration, including `safe.directory`, to obtain history or status. Continue artifact-only when Git is unavailable and mark history and working-tree state unknown.

## 5. Turn observations into findings

A finding must connect evidence to a capability consequence.

Use:

```text
Because [observed/declared evidence], the repository can/cannot reliably [capability outcome],
which matters because [system consequence]. Confidence: [low|medium|high].
```

Countercheck each finding against evidence that weakens or contradicts it. Downgrade confidence when sampling is narrow, documentation is unverified, generated files dominate, or external systems are unavailable.

## 6. Rate maturity

Rate all seven dimensions against observable criteria, even in a quick or focused assessment. Cite decisive evidence and the principal unknown; use `Unknown` where evidence cannot support a rating. Determine the overall level with the bottleneck method, not a numerical average.

Use qualitative confidence:

- **High:** representative direct evidence with little contradiction.
- **Medium:** useful direct evidence with material sampling or external-system gaps.
- **Low:** sparse, indirect, stale, or contradictory evidence.

Describe evidence coverage as the areas inspected and omitted. Do not convert coverage or confidence into arbitrary percentages.

## 7. Identify constraints

List candidate gaps, then select the primary constraint by system-wide effect on understanding, safe change, verification, maintenance, delivery, recovery, and evolution.

Test the choice:

- Would improving it unlock multiple other capabilities?
- Does it explain recurring evidence better than a narrower symptom?
- Is it consequential for this repository's actual purpose and risk?
- Could another constraint nullify the benefit?

Select no more than two secondary constraints when needed to sequence the roadmap.

At `Self-improving`, do not manufacture a constraint. If none is consequentially evidenced, report no primary constraint, identify one watch condition, and use the sustain branch in the maturity model.

## 8. State boundaries and unknowns

Explicitly exclude claims not supported by repository evidence. Common unknowns include external branch protection, hosted CI settings, production monitoring, incident history, actual release frequency, team practices, and documentation freshness.

## 9. Stop condition

Finish when evidence supports an explainable maturity estimate, one primary constraint, a proportional next-level roadmap, and explicit unknowns. At `Self-improving`, finish instead with an evidenced constraint and sustain recommendation, or with no forced intervention plus a material watch condition. Do not continue reading merely to make the report longer.
