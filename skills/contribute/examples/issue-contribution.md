# Worked example: contribution should become an issue

## Request

```text
/contribute Add an offline mode to the command-line client.
```

## Repository orientation

- The repository is a maintained command-line client with a public plugin API.
- `CONTRIBUTING.md` requires an issue before user-facing behaviour changes.
- The command resolver currently fetches registry metadata before resolving plugins.
- Two open issues request better behaviour on unreliable networks, but neither defines offline semantics.
- Existing cache code stores metadata for performance, not as a documented source of truth.

## Evidence

| Status | Evidence | Claim | Limit |
| --- | --- | --- | --- |
| Direct | `CONTRIBUTING.md` | Behaviour changes require prior issue discussion. | Does not decide the desired behaviour. |
| Direct | Resolver and cache modules | Resolution reads the registry before cached metadata. | Source inspection does not establish every runtime failure. |
| Declared | Two user issues | Network loss prevents some workflows. | Reproduction environments were not supplied. |
| Inferred | Cache shape and public plugin API | Several compatibility policies could plausibly define offline mode. | Maintainer product intent is unknown. |

## Contribution hypothesis

Because users report blocked workflows and the resolver has cached metadata, defining supported offline resolution could improve resilience. The correct cache age, command coverage, error semantics, and plugin compatibility policy require maintainer judgement before implementation.

## Candidate interventions

1. Fall back silently to any cached metadata. Rejected because stale behaviour and security expectations are unclear.
2. Add an explicit `--offline` mode with freshness rules. Plausible, but flag scope and cache policy require product direction.
3. Improve network errors only. Smaller, but it does not provide the requested capability.

## Decision

**Issue.** The problem has support, but desired behaviour affects a public contract and several credible policies exist. The repository explicitly requires prior discussion. Direct implementation was rejected because a PR would encode unresolved product decisions.

Duplicate search found related reliability reports but no issue defining offline semantics. The user authorised assessment, not publication, so the issue remains a draft.

## Proposed issue

**Title:** Define supported offline resolution behaviour

### Summary

Network-dependent plugin resolution blocks some documented workflows when registry access is unavailable. Define whether the client should support an explicit offline path and what guarantees that path should provide.

### Repository evidence

- The resolver currently fetches registry metadata before plugin resolution.
- The cache is described and implemented as a performance mechanism, without offline correctness guarantees.
- Related issues report unreliable-network failures but do not establish cache freshness or compatibility policy.

### Current behaviour

When registry access fails, resolution stops before cached metadata can provide a supported result.

### Why this matters

Users cannot reliably run otherwise local workflows during network loss. A naïve fallback could also introduce stale or unsafe plugin resolution.

### Desired outcome

Define the commands covered by offline behaviour, how users opt in, acceptable cache freshness, failure messaging, and compatibility expectations.

### Possible approach

Consider an explicit offline option backed by validated cached metadata. Implementation should follow the policy agreed here.

### Alternatives considered

- Silent fallback: simpler but hides staleness and changes behaviour implicitly.
- Error-message-only improvement: useful but does not support offline execution.

### Acceptance criteria

- [ ] Supported offline commands and opt-in behaviour are defined.
- [ ] Cache freshness and missing-data behaviour are defined.
- [ ] Security and plugin compatibility expectations are documented.
- [ ] The agreed behaviour has a testable validation plan.

### Scope boundaries

This issue does not select a cache format or approve implementation before offline semantics are agreed.

### Validation

The eventual implementation should exercise supported commands with registry access blocked, stale data, and missing metadata.

### Open questions

- Should offline behaviour be explicit or automatic?
- What metadata age is acceptable?
- Which commands must remain network-required?
