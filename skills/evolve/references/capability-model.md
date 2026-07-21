# Capability model

Assess capabilities, not prescribed files or technologies. A mechanism is valuable only when it makes an important engineering outcome more reliable.

## 1. Architecture clarity

Assess whether a maintainer can identify system boundaries, responsibilities, dependencies, data flow, and important design constraints.

Useful evidence includes repository structure, module boundaries, architecture notes, ADRs, dependency direction, interfaces, and representative code. Do not require formal diagrams when code and naming communicate the architecture adequately.

## 2. Knowledge discoverability

Assess whether purpose, setup, conventions, common tasks, constraints, and operational knowledge can be found and trusted.

Useful evidence includes READMEs, local instructions, contribution guides, examples, scripts, ADRs, runbooks, naming, and coherent structure. Do not treat the absence of `AGENTS.md` as a finding by itself.

## 3. Change safety

Assess whether maintainers can predict the impact of a change, isolate it, review it, migrate safely, and reverse it when necessary.

Useful evidence includes modularity, compatibility practices, migration patterns, feature controls, rollback paths, review boundaries, and tests around risky behavior. Test count alone does not establish change safety.

## 4. Verification capability

Assess whether the repository can establish that important behavior works and detect meaningful regressions.

Useful evidence includes test strategy, assertions, representative test depth, type or static checks, contract tests, acceptance checks, observability validation, and reproducible commands. Distinguish test presence from useful outcome coverage.

## 5. Delivery automation

Assess whether builds, releases, deployments, migrations, and recovery are reproducible and appropriately controlled.

Useful evidence includes CI, release workflows, deployment configuration, environment promotion, artifact provenance, rollback, and release verification. Automation volume is not maturity; authority and recovery must remain safe.

## 6. Governance and ownership

Assess whether responsibility, authority, sensitive changes, dependencies, security expectations, and lifecycle decisions are clear enough for the repository's risk.

Useful evidence includes ownership files, review rules, security policy, dependency policy, release authority, maintenance status, and code boundaries. A small low-risk project may need little formal governance.

## 7. Maintainability and evolution

Assess whether the system can absorb change without accumulating uncontrolled complexity and whether lessons become durable improvements.

Useful evidence includes dependency hygiene, deprecation and cleanup, architectural seams, maintenance scripts, incident-derived tests, decision updates, feedback loops, and deliberate removal of obsolete guidance or scaffolding.

## Proportionality

Profile the repository before judging it:

- Purpose and users
- Size and topology
- Runtime and deployment model
- Data sensitivity and operational consequence
- Change frequency when reliably declared
- Maintenance status

Expect controls proportional to risk. Do not penalise a small library for lacking production deployment governance. Do not excuse a safety-critical service because its repository is compact. Large size is context, not evidence of low maturity.

For asset-heavy, creative, or generated-artifact projects, judge reproducibility and verification at the delivered or runtime-consumed artifact. Do not assume source-only checks or application deployment controls are the relevant outcome.

## Capability interactions

Capabilities compensate only within limits:

- Documentation cannot substitute for verification of important behavior.
- CI cannot substitute for safe authority, release controls, or recovery.
- Tests cannot make tightly coupled architecture easy to evolve.
- Automation cannot resolve unclear ownership.
- Clear architecture without discoverable setup still leaves common changes dependent on individual knowledge.

Use these interactions to identify the primary system constraint.
