# Maturity model

Use five ordinal levels. A higher level requires evidence for its defining capability, not merely more artifacts.

## Observable criteria by capability

### Architecture clarity

- **Fragile:** Important boundaries and dependencies are implicit, contradictory, or recoverable only through broad code reading.
- **Documented:** Purpose and major components are described, but important boundaries or constraints require interpretation.
- **Repeatable:** Common changes follow stable boundaries and dependency rules that code and guidance consistently express.
- **Adaptive:** Architecture contains deliberate seams for expected change and supports proportional migration or compatibility strategies.
- **Self-improving:** Architectural decisions and boundaries are revised from validated lessons; obsolete structures are deliberately retired.

### Knowledge discoverability

- **Fragile:** Setup, conventions, or important procedures are missing, stale, or dependent on individual knowledge.
- **Documented:** Basic purpose, setup, and conventions are discoverable, with material gaps or manual interpretation.
- **Repeatable:** Common tasks have trustworthy, reproducible guidance located near the work.
- **Adaptive:** Guidance covers important exceptions and evolves with architecture, operations, and user outcomes.
- **Self-improving:** Feedback routinely updates durable guidance and removes stale or duplicative knowledge.

### Change safety

- **Fragile:** Change impact is difficult to predict; risky operations depend on manual care without reliable recovery.
- **Documented:** Important risks and procedures are described, but safeguards are incomplete or inconsistently enforced.
- **Repeatable:** Common changes use stable review, migration, compatibility, and rollback paths.
- **Adaptive:** Safeguards vary with risk and support incremental change, controlled exposure, and recovery.
- **Self-improving:** Failures and near misses systematically strengthen boundaries, tests, migration paths, and rollback mechanisms.

### Verification capability

- **Fragile:** Important behavior cannot be checked reliably or checks are mostly manual and ambiguous.
- **Documented:** Verification commands and some expected behavior are defined, but material outcomes remain weakly covered.
- **Repeatable:** Common changes have reproducible checks with meaningful assertions and stable local or CI execution.
- **Adaptive:** Verification is risk-based, covers important integration or operational outcomes, and gives useful feedback.
- **Self-improving:** Escaped defects and production lessons reliably become maintained verification or prevention mechanisms.

### Delivery automation

- **Fragile:** Builds or releases rely on undocumented, inconsistent, or person-dependent steps.
- **Documented:** Delivery steps are described and partly scripted, with important manual interpretation.
- **Repeatable:** Builds and ordinary releases are reproducible with clear artifacts, authority, and recovery steps.
- **Adaptive:** Delivery controls, rollout, validation, and rollback are proportional to risk and environment.
- **Self-improving:** Delivery feedback leads to measured, maintained improvements and retirement of obsolete steps.

### Governance and ownership

- **Fragile:** Responsibility and change authority are unclear where they matter.
- **Documented:** Basic ownership and policies are stated, with gaps around sensitive or lifecycle decisions.
- **Repeatable:** Review, ownership, security, dependency, and release responsibilities are consistently actionable.
- **Adaptive:** Governance scales with risk, supports exceptions, and stays aligned with architecture and operations.
- **Self-improving:** Governance changes from evidence, and ineffective controls are simplified or removed.

### Maintainability and evolution

- **Fragile:** Complexity, dependencies, or obsolete paths accumulate without a reliable maintenance mechanism.
- **Documented:** Known maintenance needs and conventions are visible, but cleanup and evolution remain irregular.
- **Repeatable:** Dependency updates, deprecation, cleanup, and common refactors follow sustainable paths.
- **Adaptive:** The repository anticipates change, contains complexity, and balances feature work with targeted maintenance.
- **Self-improving:** Accepted lessons become durable improvements across code, tests, tools, documentation, workflows, and maintenance loops.

## Determine the overall level

Do not calculate an average.

1. Identify the capabilities essential to the repository's purpose and risk.
2. Find the highest level consistently supported across those essential capabilities.
3. Test whether a critical gap prevents the repository from operating at that level.
4. Set the overall level to the constrained level and explain the bottleneck.

A single nonessential low rating need not constrain the repository. A critical weakness can constrain it even when most dimensions are stronger.

## Determine the next level

Describe the minimum capability outcomes required to move one level higher. Do not require every dimension to become identical. Prioritise the constraint that prevents consistent operation at the next level.

For `Self-improving`, use `Sustain Self-improving` rather than inventing a sixth level. Identify an evidenced constraint when one exists. Otherwise report no consequential primary constraint, name the most material condition that could invalidate the level, and do not force a new intervention.

## Level 5 guardrail

Award `Self-improving` only when repository evidence shows maintained learning loops: lessons enter durable artifacts, their effect can be validated, and obsolete guidance, tooling, or scaffolding is intentionally retired. Extensive automation or documentation alone is insufficient.
