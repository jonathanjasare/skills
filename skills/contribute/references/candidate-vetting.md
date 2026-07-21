# Candidate vetting

Select one contribution through evidence, not a catalogue of possible improvements.

## Form the contribution hypothesis

Use this chain:

```text
Because [evidence], [current behaviour] causes [consequence].
If [bounded intervention], then [maintainer/user outcome] should improve,
which can be tested by [validation].
```

Do not turn a missing file, test, abstraction, tool, or feature directly into a contribution.

## Evaluate candidate sources

- **Repository demand:** confirm the request remains open, relevant, and unclaimed.
- **User idea:** confirm it is not already implemented, duplicate, contradictory, or dependent on hidden product choices.
- **Issue URL:** verify current issue state, scope, maintainer guidance, and whether a PR is invited.
- **From `evolve`:** re-check current evidence, affected capability, proportionality, and whether contribution is the correct next action.
- **Skill-discovered:** require unusually strong alignment, bounded scope, useful impact, verification, and no duplicate. Do not generate generic improvement lists.

## Adversarially challenge the candidate

Ask:

1. Is the evidence current, relevant, and strong enough?
2. Is the behaviour actually problematic or intentional?
3. Does an existing mechanism already provide the outcome?
4. Is duplicate or conflicting work active?
5. Does repository direction support the change?
6. What user, reliability, security, performance, documentation, or maintenance consequence is demonstrated?
7. Does the intervention address the cause rather than a symptom?
8. Is maintainer review cost justified?
9. Can the repository verify the result?
10. Is a smaller coherent solution available?
11. Does a broader change require prior agreement?
12. What ongoing maintenance burden is introduced?
13. Is doing nothing preferable now?

Actively seek counterevidence. Lower confidence or choose neither when the conclusion depends on unavailable hosted state, unexecuted reproduction, stale documentation, or narrow source sampling.

## Compare plausible interventions

Compare evidence fit, outcome, scope clarity, verification, implementation risk, maintenance burden, reversibility, review cost, and repository precedent. Do not invent acceptance probabilities or numeric scores.

Select the highest-value intervention whose evidence, alignment, scope, and verification justify maintainer attention. A larger change is valid only when a smaller intervention cannot resolve the evidenced problem and maintainer direction supports the scope.

## Reject or downgrade

Choose neither, or issue instead of PR, when evidence is weak, the concern is hypothetical, behaviour is intentional, equivalent capability exists, duplicate work exists, repository direction conflicts, product or architecture decisions remain hidden, verification is unavailable, scope is disproportionate, or maintenance cost exceeds likely value.

One invocation yields one cohesive contribution. Put related future possibilities outside the scope rather than turning them into a backlog.
