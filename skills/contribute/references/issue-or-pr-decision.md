# Issue, pull request, or neither

Make the contribution-type decision before editing or publishing.

## Choose an issue

Use an issue when the problem is supported but maintainer judgement remains about desired behaviour, product direction, architecture, public contracts, scope, or implementation choice. Also prefer an issue when repository guidance requires prior discussion, verification cannot yet establish the result, permissions prevent implementation, or the user explicitly requests discussion.

An issue preserves unresolved decisions. Do not disguise a fixed implementation plan as an open question, and do not use an issue merely to record a speculative idea.

## Choose a draft pull request

Use a PR when:

- current behaviour and desired outcome are clear
- repository guidance permits implementation
- precedent supports a bounded approach
- native verification can establish the important result
- duplicate or conflicting work is absent
- no hidden product or architecture decision is required
- the user authorised implementation and draft-PR creation

PRs remain draft unless the user explicitly requests ready-for-review. Never merge automatically.

If required hosted duplicate search alone is unavailable, the PR decision is provisional. Under `contribute pr` authority, complete only safe, isolated local work that remains useful; stop before push or draft-PR creation and report duplicate status as unknown.

## Choose neither

Choose neither when evidence is weak, the concern is speculative or intentional, equivalent or duplicate work exists, repository guidance redirects or prohibits it, assumptions remain unresolved, verification is inadequate, scope or maintenance burden is disproportionate, or maintainer attention is not justified.

State the decisive reason and what evidence could make a narrower contribution viable later.

## Resolve forced-mode conflicts

`issue` and `pr` are requested workflows, not commands to produce a low-quality artifact. If evidence supports a different outcome, explain the conflict and stop before publishing or editing. For example, a `pr` request becomes an issue recommendation when public API behaviour requires maintainer judgement.

## Apply authority precisely

| Invocation or request | Inspection | Draft text | Edit source | Branch/commit | Push existing writable remote | Publish issue | Create draft PR | Ready/merge |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `contribute` / `auto` / idea / issue URL / `from-evolve` | Yes | Yes | No | No | No | No | No | No |
| `contribute issue` | Yes | Yes | No | No | No | Only when explicitly asked to publish/create | No | No |
| `contribute pr` | Yes | Yes | Yes, bounded | Yes, focused | Yes, after external-write checks | No | Yes, draft | No |

Explicit user wording can grant a listed action without changing unrelated permissions. Credentials, repository rights, and safety constraints still apply.

Before an external write, confirm the exact repository, upstream/fork relationship, head and base branches, title/body, duplicate result, and action. `contribute pr` permits pushing to a suitable existing writable remote; creating a new fork requires separate authority. Do not deploy, release, accept snapshots, access secrets, or modify unrelated external state as part of contribution creation without separate authority.
