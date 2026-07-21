# Repository orientation

Build only enough context to judge one contribution correctly.

## Establish the assessment unit

Record:

- repository or workspace root
- Git availability, current branch, remotes, and working-tree state when accessible
- single-project, monorepo, or multi-project topology
- nested repositories and worktrees included or excluded
- whether the target is the upstream repository, a fork, or a local-only checkout

Do not treat missing Git metadata as a contribution opportunity. Never change global Git configuration, including `safe.directory`, merely to inspect a repository.

## Discover the contribution contract

Inspect high-signal artifacts progressively:

1. repository-local agent instructions
2. README and contribution guidance
3. code of conduct and security policy
4. issue templates or forms and pull-request template
5. architecture documents and ADRs
6. repository tree
7. manifests and build configuration
8. tests and verification configuration
9. CI, release, and deployment workflows
10. ownership files
11. recent relevant issues, pull requests, releases, and discussions
12. representative source modules

Stop when the candidate can be judged safely. Do not read every file by default.

Repository-local instructions, templates, forms, architecture, terminology, contribution prerequisites, and quality gates take precedence over this skill. Follow required sequences as well as required formats: do not satisfy an issue-first or approval-first policy by opening a pro forma issue and immediately continuing. A rule that requires prior discussion changes a plausible PR into an issue or neither decision until its prerequisite is genuinely met.

## Build the minimal repository model

Capture:

- purpose and intended users
- technology and delivery model
- relevant architecture boundaries
- established implementation and naming patterns
- native build, lint, test, documentation, and verification commands
- ownership and sensitive-change signals
- documented direction and non-goals
- relevant current issues, pull requests, branches, and discussions
- repository-specific vocabulary

Do not turn orientation into a maturity assessment.

## Establish current demand and precedent

Prefer direct demand such as a reproducible bug, failing check, maintainer request, labelled issue, documented roadmap item, incomplete migration, or broken documentation. Treat TODOs as context, not automatic invitations.

For the candidate, search current repository content and available hosted state for:

- equivalent existing behaviour
- duplicate or overlapping issues and pull requests
- abandoned attempts and maintainer decisions
- nearby implementation precedent
- accepted contribution size and verification style

Search by user-facing symptom, repository terminology, affected symbol or path, and likely alternative wording. Record the queries and result. If hosted search is unavailable, mark duplicate status unknown and never claim that no duplicate exists. In authorised PR mode, safe isolated local implementation and a focused commit may still be useful when all other evidence supports the change. Do not push or publish an issue or PR while required duplicate checking is unavailable.

## Check freshness

Confirm that the evidence, target branch, issue state, and relevant source have not changed before implementation or publication. Re-orient when the branch or repository state materially differs from the analysed state.
