# Worked example: mature production service

## Scenario

A multi-service payments repository contains documented boundaries and ADRs, service ownership, contract and integration tests, mandatory CI, signed artifacts, staged deployments, canary validation, rollback automation, runbooks, dependency updates, and production dashboards. Three incident summaries describe recurrence caused by configuration drift. Two summaries propose regression checks, but those checks and related runbook changes cannot be found in the repository.

## Engineering Evolution Report

**Depth:** Full
**Focus:** Repository-wide

## Executive evolution

The repository operates at **Adaptive** maturity: it supports risk-based verification, controlled delivery, and recovery, but does not yet demonstrate a reliable loop that turns accepted incident lessons into maintained engineering changes. The next evolution is to make incident follow-through traceable and verifiable, rather than adding more CI or governance.

## Assessment boundaries

- Assessment unit: one multi-service Git repository root; no nested repositories or worktrees included.
- Inspected representative services, ADRs, tests, delivery workflows, ownership, runbooks, and three supplied incident summaries.
- Did not execute repository scripts because their workspace and external effects were not established as read-only; inspected definitions and maintained outputs instead.
- Did not inspect hosted branch settings, production secrets, alert history, or organisational incident process.
- Repository evidence cannot establish incident response quality, team culture, or actual delivery speed.

## Evidence coverage

| Area | Representative evidence | Limit |
| --- | --- | --- |
| Architecture | Service boundaries, ADRs, dependency rules | Two low-change services sampled lightly |
| Verification | Unit, contract, integration, and canary checks | Production data quality not inspected |
| Delivery | Signed build, staged rollout, rollback workflow | Hosted environment permissions unavailable |
| Governance | Ownership and sensitive-path review rules | Actual reviewer participation unknown |
| Learning | Runbooks and three incident summaries | External incident tracker unavailable |

**Overall confidence: Medium.** Direct repository evidence is broad, but external incident and platform state is unavailable.

## Maturity by dimension

| Capability | Level | Confidence | Decisive evidence | Principal unknown |
| --- | --- | --- | --- | --- |
| Architecture clarity | Adaptive | High | Maintained boundaries and ADRs align with representative code. | Unrecorded exceptions in unsampled services. |
| Knowledge discoverability | Adaptive | Medium | Local guidance and runbooks cover common and failure paths. | Runbook use and freshness outside sampled incidents. |
| Change safety | Adaptive | High | Compatibility checks, staged rollout, and automated rollback. | Emergency-change behavior. |
| Verification capability | Adaptive | High | Risk-based contract, integration, and canary verification. | Coverage of configuration drift across environments. |
| Delivery automation | Adaptive | High | Reproducible artifacts, promotion, validation, and recovery. | Hosted authority settings. |
| Governance and ownership | Adaptive | Medium | Service and sensitive-path ownership are explicit. | Actual enforcement outside repository evidence. |
| Maintainability and evolution | Adaptive | Medium | Sustainable maintenance paths anticipate change, but accepted incident actions are not durably traceable into a learning loop. | External actions may exist outside the repository. |

## Overall maturity

**Current level: Adaptive**

Essential capabilities support safe, risk-aligned change and delivery. `Self-improving` is not supported because repository evidence does not show that accepted lessons consistently become maintained tests, tools, documentation, architecture, or workflow changes. Strong automation does not compensate for this missing learning loop.

## Evidence-based findings

1. **Observed:** Three incident summaries identify configuration drift; two declare follow-up regression checks. **Observed:** No matching checks or runbook changes were found through targeted search. **Finding:** accepted lessons are not reliably visible as durable repository improvements. **Limit:** actions may exist in an unavailable external tracker. **Confidence:** medium.
2. **Observed:** Delivery already includes staged validation and automated rollback. **Finding:** adding another deployment platform would duplicate capability rather than address the learning constraint. **Confidence:** high.

## Constraints

### Primary constraint

**Maintainability and evolution: incident learning is not durably closed in repository evidence.** This weakens future verification, operational knowledge, and confidence that repeated failures will be prevented.

### Secondary constraint

**Configuration verification coverage.** Drift is the recurring symptom, but improving checks without a maintained follow-through mechanism risks another one-off fix.

## Next maturity target

**Target: Self-improving**

Show a maintained loop in which accepted lessons receive an owner, become a concrete repository change or explicit rejection, are validated, and cause obsolete guidance or safeguards to be removed when no longer useful.

## Prioritised recommendations

### Primary evolution

- **Recommendation:** Add a lightweight incident-learning record linked from each affected service, requiring the accepted lesson, owner, durable change, validation evidence, and closure or rejection rationale.
- **Supporting evidence and classification:** Observed incident summaries, declared follow-ups, and missing repository implementations.
- **Constrained capability:** Maintainability and evolution.
- **Improvement hypothesis:** Making accepted lessons traceable to validated repository changes will reduce lost follow-through and reveal ineffective actions.
- **Expected benefit:** Incidents improve verification and operational knowledge instead of producing disconnected documents.
- **Implementation effort:** Medium; the main cost drivers are alignment and backfilling the three sampled incidents.
- **Change risk:** Low; the principal failure mode is creating ceremony without enforceable linkage to durable changes.
- **Confidence:** Medium; an external tracker may already contain part of the capability.
- **Validation method:** Follow the next qualifying incident from accepted lesson to merged change, validation result, and explicit closure.
- **Success criteria:** Every accepted action is implemented and validated, or explicitly rejected with rationale; sampled records link to maintained artifacts.
- **Rollback or removal condition:** Remove the record format if it duplicates an authoritative system without improving closure; preserve the linkage and validation outcome in that system.
- **Candidate comparison:** A lightweight repository-linked record has higher fit and reversibility than a new incident platform. A test-only fix is cheaper but lower leverage because it leaves repeated follow-through loss intact. The record is selected; the platform and test-only options are rejected.

### Supporting evolutions

1. **Environment-configuration contract check.** Supporting evidence: observed recurring configuration drift. Constrained capability: verification and change safety. Hypothesis and benefit: a targeted contract check will prevent the demonstrated mismatch before rollout. Effort: medium, driven by modelling environment-specific constraints. Risk: low, with brittle or over-broad rules as the principal failure mode. Confidence: high from the repeated incident pattern. Validate by reproducing one historical mismatch; success means the mismatch is caught before deployment. Simplify or replace the check if false positives obscure real drift while preserving equivalent outcome coverage. A broad configuration platform was rejected as higher-maintenance and less reversible than the targeted check.

No second supporting evolution is justified by the inspected evidence.

### Later improvements

Defer additional delivery tooling. Current evidence shows strong delivery capability and no constraint it would resolve.

## Ordered evolution roadmap

| Order | Evolution | Learning purpose | Validation gate |
| --- | --- | --- | --- |
| 1 | Reconcile the three sampled incidents with durable changes or explicit rejections | Test whether follow-through is genuinely missing | Each action has an evidenced disposition |
| 2 | Implement the configuration contract check | Address the demonstrated recurring failure | Historical mismatch is caught |
| 3 | Apply the learning record to the next incident | Validate the ongoing loop | Change and validation are linked and maintained |
| 4 | Review and remove ineffective safeguards | Demonstrate improvement rather than accumulation | Obsolete mechanism is simplified or deleted |

## Unknowns

- External incident-tracker actions could raise confidence or invalidate the primary finding.
- Production alert quality and incident recurrence rate were unavailable.
- Hosted policy enforcement could change governance confidence but not the current primary constraint.
