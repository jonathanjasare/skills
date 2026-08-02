# Worked example: small healthy project

## Scenario

A single-package TypeScript date-formatting library has 1,400 lines of source, a clear README, typed public exports, 18 focused unit tests, `npm` scripts for lint, type checking, tests, and build, and a simple release checklist. It has two maintainers and no CI, ADRs, deployment configuration, `CODEOWNERS`, or `AGENTS.md`.

## Engineering Evolution Report

**Depth:** Quick
**Focus:** Repository-wide

### Repository profile

- Assessment unit: one Git repository root containing a single package; no nested repositories or worktrees included.
- Small, low-operational-risk library with one public API surface.
- Published package consumers are the important external outcome.
- Hosted repository settings and actual publication procedure are unknown.

### Current maturity

**Overall: Repeatable**

The repository provides reproducible local paths for common changes and meaningful checks around its core logic. Delivery governance is light, but proportional to a small library and not a critical bottleneck. The main limitation is that the published package boundary is not verified as a consumer experiences it.

### Capability snapshot

| Capability | Level | Decisive evidence | Principal unknown |
| --- | --- | --- | --- |
| Architecture clarity | Repeatable | One coherent package and typed public boundary. | How future feature growth would affect the boundary. |
| Knowledge discoverability | Repeatable | README covers setup and public usage. | Freshness between releases. |
| Change safety | Repeatable | Typed exports and focused edge-case tests. | Compatibility of the packed artifact. |
| Verification capability | Repeatable | Separate lint, type-check, test, and build definitions with meaningful unit assertions. | Commands were not executed in this assessment. |
| Delivery automation | Documented | A release checklist and package build are defined. | Actual publication and recovery path. |
| Governance and ownership | Unknown | Two maintainers are declared in supplied context. | Publication authority and hosted review controls. |
| Maintainability and evolution | Repeatable | Compact structure and typed public seam support routine change. | Dependency-update and deprecation history. |

### Confidence and evidence coverage

**Confidence: High**

Observed the README, manifest scripts, exports, all tests, build configuration, and release checklist. Repository scripts were not executed because the assessment did not establish that they were workspace-read-only. Registry permissions and hosted branch controls were unavailable.

### Evidence summary

| Classification | Evidence | Observation | Relevance | Limit |
| --- | --- | --- | --- | --- |
| Observed | `README.md` | Setup and API examples are present and internally consistent. | Knowledge is discoverable for the project's scope. | Examples were inspected, not executed. |
| Observed | `package.json` scripts | Separate lint, type-check, test, and build commands are defined. | Common verification has a reproducible interface. | Command execution was outside this assessment. |
| Observed | Unit tests | Core formatting behavior and edge cases are asserted. | Important implementation behavior is protected. | Packed consumer behavior is outside their scope. |
| Observed | Build and export configuration | Package artifacts are configured, but no test installs the packed artifact. | Consumer-facing change safety has a gap. | Downstream checks may exist outside the repository. |
| Unknown | Hosted settings | Publication authority and branch protection were unavailable. | Governance cannot be established from repository artifacts. | Absence of evidence is not evidence of weak control. |

### Strongest capability

**Knowledge discoverability.** A new maintainer can understand the package purpose and find setup and public API guidance without extra repository-specific instruction files.

### Primary constraint

**Verification of the published contract.** The tests verify source behavior but not whether the packed artifact exposes the documented imports and types. A packaging regression could pass every current check and affect all consumers.

### Next maturity target

**Target: Adaptive**

The next step is not enterprise governance. The library needs risk-aligned verification of its external package outcome and a release path that uses that check.

### Primary evolution

- **Recommendation:** Add one consumer smoke test that packs the library, installs the tarball in a temporary fixture, imports the documented entry points, and type-checks a representative usage.
- **Supporting evidence and classification:** Observed build/export configuration and absence of packed-artifact verification.
- **Constrained capability:** Verification capability and change safety at the public package boundary.
- **Improvement hypothesis:** Testing the artifact consumers install will catch export, declaration, and packaging regressions missed by source tests.
- **Expected benefit:** Higher confidence in releases without adding broad infrastructure.
- **Implementation effort:** Small; the main cost driver is maintaining one temporary consumer fixture across supported module formats.
- **Change risk:** Low; the principal failure mode is a brittle fixture that fails for packaging details consumers do not rely on.
- **Confidence:** High; the unverified package boundary is directly visible in the inspected build, export, and test configuration.
- **Validation method:** Break an export mapping intentionally and confirm the smoke test fails while existing unit tests still pass.
- **Success criteria:** The documented import and a representative type usage work from the packed artifact on every release check.
- **Rollback or removal condition:** Remove or simplify the fixture if it becomes flaky without catching packaging defects; retain equivalent artifact-level coverage.
- **Candidate comparison:** A consumer fixture has higher fit and lower maintenance than a full CI matrix, while checking configuration alone cannot exercise the installed contract. The fixture is selected for leverage and reversibility; the matrix is deferred because no platform-specific risk is evidenced.

### Supporting evolutions

No independent supporting evolution is justified. Add the smoke-test command to the release checklist as part of the primary evolution. Avoid adding ownership or architecture files solely to satisfy a maturity model.

### Unknowns

- Registry publishing authority
- Actual release frequency
- Whether downstream consumers already provide contract feedback

This example does not criticise the missing `AGENTS.md`, CI, ADRs, or `CODEOWNERS`; those absences do not currently demonstrate a consequential capability gap.
