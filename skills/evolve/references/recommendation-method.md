# Recommendation method

Treat every recommendation as a testable improvement hypothesis.

## Derive interventions

For the primary constraint:

1. State the constrained capability outcome.
2. Form an improvement hypothesis.
3. Generate at least two candidate interventions when alternatives are plausible.
4. Compare leverage, effort, maintenance, risk, fit, and reversibility.
5. Recommend the highest-leverage proportional intervention.

A larger intervention is valid when evidence shows a superficial change will not resolve the constraint.
Record the comparison compactly in the report when alternatives are plausible. If no credible alternative exists, say so rather than inventing one.

## Required recommendation fields

Include:

- **Supporting evidence:** decisive artifacts or findings.
- **Evidence classification:** observed, declared, or inferred.
- **Constrained capability:** affected dimension and outcome.
- **Improvement hypothesis:** why this intervention should improve the capability.
- **Expected benefit:** practical change in understanding, safety, verification, maintenance, delivery, or recovery.
- **Implementation effort:** `small`, `medium`, or `large`, with the main cost driver.
- **Change risk:** `low`, `medium`, or `high`, with the principal failure mode.
- **Confidence:** `low`, `medium`, or `high`, tied to evidence quality.
- **Validation method:** how to test the hypothesis.
- **Success criteria:** observable evidence that the capability improved.
- **Rollback or removal condition:** when to revert, simplify, or delete the intervention.
- **Candidate comparison:** compare plausible options on leverage, effort, maintenance, risk, fit, and reversibility; state why the selected intervention wins. State when no credible alternative exists.

## Reject or downgrade when

- Evidence does not show a consequential problem.
- The intervention solves a hypothetical future issue.
- A fashionable tool is prescribed without a demonstrated capability need.
- Existing mechanisms already provide the capability.
- Maintenance cost is disproportionate to repository size, purpose, or risk.
- Success cannot be validated.
- The change optimises an artifact rather than an engineering capability.
- It treats a symptom while leaving the primary constraint intact.

## Prioritise

Return no more than:

1. One primary recommendation that directly addresses the primary constraint.
2. Up to two supporting recommendations that enable or protect the primary evolution.
3. Optional later work clearly deferred beyond the next maturity level.

Order the roadmap by dependency and learning value. Prefer an early intervention that tests the central hypothesis before committing to expensive follow-on work.

At `Self-improving`, zero recommendations is valid when no consequential constraint or useful sustaining experiment is evidenced. Report the watch condition instead of proposing maintenance ceremony for its own sake.

## Validate the evolution

Choose validation that matches the capability:

- Architecture clarity: a representative change crosses fewer unclear boundaries; maintainers can locate ownership and impact from durable artifacts.
- Knowledge discoverability: a clean-environment setup or common task succeeds from repository guidance.
- Change safety: a risky change has an exercised compatibility, migration, or rollback path.
- Verification: an intentionally introduced regression is caught by a meaningful check.
- Delivery automation: a release candidate is built, promoted, validated, and recoverable reproducibly.
- Governance: sensitive changes route to the right owner and authority without ambiguity.
- Maintainability: obsolete paths are removed and lessons produce maintained changes with visible effect.

If validation fails, revisit the hypothesis before adding more tooling.
