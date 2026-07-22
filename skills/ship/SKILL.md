---
name: ship
description: User-invoked orchestrator that routes and completes a product or engineering request through the minimum reliable workflow. Use when the user invokes ship or asks to take a request from idea or requirement through implementation, verification, and review.
---

# Ship

Inspect only enough code, tests, documentation, and history to classify the request. Discover facts before asking the user.

Require the `thesis` and `clarify` skills to be installed as companion stages. If a required route is reached and its skill is unavailable, explain the incomplete installation and stop before guessing or substituting a weaker process.

Route:

- Uncertainty about customer, job, value, positioning, or whether to build → invoke the `thesis` skill.
- An unresolved decision could change behaviour, scope, interface, data, architecture, migration, or acceptance criteria → invoke the `clarify` skill.
- Otherwise build.

Print:

`Route: <stages> — <reason>`

If `thesis` returns Pivot, Research Further, or Stop, do not edit code. If it returns Proceed or Proceed but Narrow, continue within the supported scope. After `clarify`, continue without reopening settled decisions unless new evidence invalidates them.

Before a high-risk or multi-session change, persist a compact plan containing outcome, non-goals, acceptance criteria, risks, rollback, and verification. Skip the plan for bounded work.

Build the smallest coherent change using existing patterns. Run relevant tests, type checks, lint, build, migrations, and acceptance checks. Distinguish failures caused by the change from pre-existing failures.

Review the diff against the request and checks. For medium- or high-risk changes, use a fresh read-only review subagent when the host supports one. Otherwise perform a fresh second review pass using only the request or plan, diff, verification results, and relevant standards, without relying on the implementer's rationale. Check conformance, correctness, regressions, security or migration risks where applicable, and also assess:

- Is this the smallest coherent solution, or is there a lower-complexity implementation that meets the same acceptance criteria?
- Has the change introduced unnecessary abstraction, coupling, configuration, or architecture drift?
- Does the final diff still satisfy the validated outcome and explicit non-goals?
- Would a cautious maintainer request changes based on concrete evidence?

Classify each finding as blocking or follow-up. Do not reopen settled product decisions unless the diff or verification produces new contradictory evidence. Avoid subagents for trivial changes.

Fix blocking findings, rerun affected checks, and review once more. On approval, update durable documentation only when behaviour or architecture changed, and remove temporary artifacts.

Return only:

```text
Outcome:
Verification:
Review:
Residual risk:
```

Done when the implementation is approved or the supported product decision is not to build.
