# Worked example: contribution should become a draft pull request

## Request

```text
/contribute pr https://github.com/example/slugger/issues/418
```

## Repository orientation

- The repository is a TypeScript slug-generation library.
- The issue reports that an all-whitespace title produces an empty slug although the public API documents a caller-provided fallback.
- `CONTRIBUTING.md` permits bug-fix PRs and requires unit tests, type checking, and linting.
- A pull-request template exists and PRs normally include a regression test beside `slug.test.ts`.
- Hosted search finds no open or merged duplicate PR.

## Evidence

| Status | Evidence | Claim | Limit |
| --- | --- | --- | --- |
| Direct | Issue #418 and executed reproduction | The issue reports the mismatch, and the reproduced call returns `""`. | Other option combinations were not yet tested. |
| Direct | Public API documentation | The documentation states that fallback applies when normalization produces no characters. | Documentation could be stale, so implementation precedent was checked. |
| Direct | `slug.ts` and nearby tests | The fallback is applied before trimming, while neighbouring options are applied after normalization. | Does not prove maintainer intent alone. |
| Direct | Issue/PR search | No duplicate active contribution was found. | Private branches are unknown. |

## Contribution hypothesis

Applying the existing fallback after normalization, as documented and consistent with neighbouring options, should restore the public contract without changing non-empty inputs. A focused regression test can prove the defect and guard compatibility.

## Decision and scope

**Draft PR.** Desired behaviour is explicit, implementation precedent is clear, native tests exist, the fix is bounded, and the invocation authorises implementation and draft-PR creation.

In scope:

- move the existing fallback check after normalization
- add regression coverage for whitespace-only input and unchanged non-empty behaviour
- update no documentation because behaviour already matches the documented contract

Non-goals:

- new fallback options
- normalization refactors
- dependency upgrades

Stop if the regression test reveals different behaviour across public option combinations or if the fix requires a public API decision.

## Implementation summary

- Normalized the input before testing whether fallback is required.
- Added one focused regression test and retained existing option coverage.
- Used existing helpers and changed no unrelated files.

## Verification

| Check | Result | Coverage |
| --- | --- | --- |
| `npm test -- slug.test.ts` | Passed | Regression and neighbouring slug behaviour |
| `npm run typecheck` | Passed | Public TypeScript contract |
| `npm run lint` | Passed | Repository style rules |

The complete diff contains the implementation and regression test only. No check required external state.

## Draft pull-request body

### Summary

Apply the documented fallback when normalization leaves a slug empty.

### Why

Whitespace-only input currently bypasses the fallback because the check runs before trimming. This contradicts the documented behaviour and issue #418's reproduction.

### Repository evidence

- Issue #418 reproduces the empty result.
- The public API defines fallback for inputs that normalize to no characters.
- Existing option handling establishes post-normalization precedent.

### What changed

- moved the fallback decision after normalization
- added regression coverage for whitespace-only input

### What did not change

- public API shape
- behaviour for non-empty normalized input
- normalization rules

### Verification

- `npm test -- slug.test.ts`
- `npm run typecheck`
- `npm run lint`

All passed.

### Risks

Low. The principal risk is changing an undocumented edge case relied upon by callers; the public contract and issue evidence support the corrected behaviour. Revert the focused change if broader compatibility evidence contradicts it.

### Related issue

Closes #418.
