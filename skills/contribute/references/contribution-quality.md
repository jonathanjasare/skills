# Contribution quality

Optimise for maintainer comprehension and decision speed, not document length or change volume.

## Issue quality contract

A maintainer-ready issue:

- follows the repository's issue form or template
- uses repository terminology
- states classified evidence and current behaviour without overstating it
- explains the consequence and desired outcome
- preserves unresolved maintainer decisions
- compares plausible alternatives only when useful
- defines observable acceptance criteria, scope boundaries, and validation
- records duplicate search and important unknowns

Use the fallback issue asset only when no repository template or form applies.

## Pull-request quality contract

A maintainer-ready draft PR:

- implements one approved, cohesive outcome
- follows contribution guidance and nearby precedent
- contains no unrelated cleanup, formatting, upgrades, or refactors
- preserves compatibility unless the change explicitly requires otherwise
- includes proportionate tests and documentation
- reports exact verification and unverified areas
- explains risks, non-goals, and related issue context
- leaves the working tree free of contribution-created debris

Preserve pre-existing changes and distinguish them from the contribution. Review the complete diff against the merge base before committing or publishing, and stage only contribution-owned files or hunks.

## Verification

Inspect commands before running them. In PR mode, run the smallest repository-native set that establishes the contribution's important outcome and relevant regression safety. A command's presence does not prove it passes.

Do not run commands that deploy, release, publish, access secrets, rewrite approved artifacts, update snapshots, install globally, or affect external systems without explicit authority. If a required check is unsafe, unavailable, or fails ambiguously, stop before push or PR creation unless repository guidance provides a safe alternative.

Report:

- command or method
- result
- relevant coverage
- anything not run and why
- evidence that would falsify the contribution hypothesis

## Scope control

Define before implementation:

- outcome
- files or boundaries likely affected
- explicit non-goals
- verification gate
- stop conditions

More files can be appropriate when they serve one outcome. Few changed lines do not justify an incomplete fix.

## Stop conditions

Stop when repository state invalidates the analysis, a duplicate appears, desired behaviour is unclear, architecture direction is unresolved, native verification cannot establish the outcome, credentials or permissions are missing, unrelated broad changes become necessary, the requested scope expands materially, or the contribution becomes disproportionate.

Report what changed, why work stopped, what remains untouched, and the decision or evidence needed next.

## Final self-review

Before handing off or publishing, ask:

1. Is there exactly one contribution?
2. Does every material claim have an accurate evidence status?
3. Is the consequence meaningful enough for maintainer attention?
4. Were duplicates and repository direction checked?
5. Is issue, PR, or neither still the correct choice?
6. Does the artifact follow the repository's own template and vocabulary?
7. Is the scope coherent and free of unrelated work?
8. Does verification test the central hypothesis?
9. Are failures, unknowns, risk, and maintenance burden visible?
10. Is authority sufficient for the next action?
11. Would a maintainer understand and review this without reconstructing the investigation?

If any answer is no, revise, downgrade, or stop.
