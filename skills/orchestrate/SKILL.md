---
name: orchestrate
description: Codex-only orchestration that keeps a GPT-5.6 Sol parent responsible for judgment and completion while delegating small, independent, executable packages to explicitly routed GPT-5.6 Luna workers. Use when the user invokes orchestrate or explicitly asks Sol to coordinate Luna workers for bounded parallel work in Codex. Do not apply this skill in Claude Code, Cursor, Antigravity, or other hosts.
---

# Orchestrate

Remain the primary agent. Treat delegation as an execution optimization, not a new workflow or decision layer.

Use this skill only in Codex. If the host is not Codex or cannot be verified as Codex, do not apply Orchestrate. Complete the underlying request through the host's normal workflow without spawning Sol or Luna or claiming orchestration occurred.

## Check routing before delegating

Use only runtime-provided metadata to choose a route:

| Parent identity | Luna routing | Route |
| --- | --- | --- |
| Explicitly `gpt-5.6-sol` | Explicitly available | Continue to selective delegation. |
| Explicitly `gpt-5.6-sol` | Unavailable, rejected, or unverifiable | Work directly in Sol. |
| Anything else or unverifiable | Any state | Work directly under the current Codex agent's ordinary authority. Do not spawn Sol or Luna. |

Do not infer either model from behavior, a task name, or a custom role. Do not probe by starting a generic worker. Set `gpt-5.6-luna` on every spawn and never silently substitute another model. Never call direct work delegated or orchestrated.

## Delegate selectively

After the gate passes, delegate only when all are true:

- The work separates into independent packages.
- Each package has concrete inputs, bounded scope, an objective finish state, and a direct check.
- Luna can execute it without product, architecture, security, migration, or acceptance judgment.
- Packaging, waiting, and integration should cost less than Sol doing the work directly.

Otherwise work directly in Sol.

Never delegate problem framing, user questions, planning, cross-cutting decisions, integration, final verification, or the completion verdict. Do not delegate tiny tasks, overlapping edits, or work that requires workers to coordinate with each other.

Use Luna at `medium` effort by default. Use `high` only for a bounded package with a measured need for more reasoning. If a package appears to need `xhigh` or `max`, keep it with Sol.

## Send a minimal work package

Default to fresh context rather than inherited history. Include only what Luna needs:

```text
Objective: <one finish state>
Scope: <named files, inputs, or subsystem>
Constraints: <must preserve, must not change, authority limits>
Check: <specific command or observable result>
Return: <changed files, check result, blockers>
```

Make the package executable without follow-up questions. Tell Luna to stop and return the blocker if a missing decision would expand scope or change behavior. Do not ask it to commit, push, merge, contact users, or declare the overall task complete.

Use no inherited turns when the package is self-contained. If context inheritance is necessary, pass the smallest recent slice that makes the package executable; never fork the full conversation by default.

## Coordinate cheaply

- Start the smallest useful number of workers. Add another only for a genuinely independent package with disjoint ownership when its expected time or token saving exceeds its packaging, coordination, integration, and verification cost.
- Never exceed the runtime's available capacity or the number of independent packages. Do not fill worker slots merely because they exist.
- While a worker runs, do only non-overlapping work that Sol already owns.
- Treat silence or a wait timeout as inconclusive. Do not redo delegated work or poll repeatedly without evidence of failure.
- Send a follow-up only to provide newly discovered, task-critical information.
- Do not recursively delegate from Luna.

## Integrate in Sol

Inspect every returned artifact and diff. Reject scope drift, resolve conflicts, and run the repository's relevant verification. Sol decides whether the result is correct, fixes or replaces weak work, and communicates completion to the user.

Delegation never lowers the acceptance bar. If integration or verification costs erase the expected savings, stop delegating and finish directly.
