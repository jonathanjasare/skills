---
name: orchestrate
description: Codex-only orchestration that keeps the primary agent responsible for judgment and completion while delegating small, independent, executable packages to the best supported worker route, preferring GPT-5.6 Luna and falling back to GPT-5.6 Terra. Use when the user invokes orchestrate or asks Codex to coordinate bounded parallel work. Do not apply this skill in Claude Code, Cursor, Antigravity, or other hosts.
---

# Orchestrate

Remain the primary agent. Treat delegation as an execution optimization, not a new workflow or decision layer.

Use this skill only in Codex. If the host is not Codex or cannot be verified as Codex, do not apply Orchestrate. Complete the underlying request through the host's normal workflow without claiming Codex orchestration occurred.

## Choose a supported worker route

Use the worker models explicitly exposed by the runtime. The parent model's exact identity is not a prerequisite for delegation; keep the current primary agent in control and name its model only when the runtime identifies it.

| Runtime support | Route |
| --- | --- |
| `gpt-5.6-luna` is explicitly available | Use Luna. |
| Luna is unavailable and `gpt-5.6-terra` is explicitly available | Use Terra as the fallback. |
| Neither worker is explicitly available | Work directly in the primary agent. |

Set the selected model explicitly on every spawn. Do not probe with an unavailable model or silently claim that Terra is Luna. Mention the fallback only when the user requested a specific worker, the route changes their expectations, or unavailable delegation materially affects the result. Never call direct work delegated or orchestrated.

## Delegate selectively

After selecting a supported route, delegate only when all are true:

- The work separates into independent packages.
- Each package has concrete inputs, bounded scope, an objective finish state, and a direct check.
- The worker can execute it without product, architecture, security, migration, or acceptance judgment.
- Packaging, waiting, and integration should cost less than the primary agent doing the work directly.

Otherwise work directly in the primary agent.

Never delegate problem framing, user questions, planning, cross-cutting decisions, integration, final verification, or the completion verdict. Do not delegate tiny tasks, overlapping edits, or work that requires workers to coordinate with each other.

Use the selected worker at `medium` effort by default. Use `high` only for a bounded package with a measured need for more reasoning. If a package appears to need `xhigh` or `max`, keep it with the primary agent.

## Send a minimal work package

Default to fresh context rather than inherited history. Include only what the worker needs:

```text
Objective: <one finish state>
Scope: <named files, inputs, or subsystem>
Constraints: <must preserve, must not change, authority limits>
Check: <specific command or observable result>
Return: <changed files, check result, blockers>
```

Make the package executable without follow-up questions. Tell the worker to stop and return the blocker if a missing decision would expand scope or change behavior. Do not ask it to commit, push, merge, contact users, or declare the overall task complete.

Use no inherited turns when the package is self-contained. If context inheritance is necessary, pass the smallest recent slice that makes the package executable; never fork the full conversation by default.

## Coordinate cheaply

- Start the smallest useful number of workers. Add another only for a genuinely independent package with disjoint ownership when its expected time or token saving exceeds its packaging, coordination, integration, and verification cost.
- Never exceed the runtime's available capacity or the number of independent packages. Do not fill worker slots merely because they exist.
- While a worker runs, do only non-overlapping work that the primary agent already owns.
- Treat silence or a wait timeout as inconclusive. Do not redo delegated work or poll repeatedly without evidence of failure.
- Send a follow-up only to provide newly discovered, task-critical information.
- Do not recursively delegate from workers.

## Integrate in the primary agent

Inspect every returned artifact and diff. Reject scope drift, resolve conflicts, and run the repository's relevant verification. The primary agent decides whether the result is correct, fixes or replaces weak work, and communicates completion to the user.

Delegation never lowers the acceptance bar. If integration or verification costs erase the expected savings, stop delegating and finish directly.
