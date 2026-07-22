# Jonathan's Agent Skills

Five focused workflows that make AI coding agents more deliberate: decide whether an idea is worth building, resolve decisions that block implementation, ship verified code, turn design references into an original website, or identify the next engineering improvement a repository needs.

They use the portable Agent Skills format and work with compatible coding agents including Claude Code, Codex, Cursor, and Antigravity.

## Choose a skill

| What you want to do | Skill | What it does |
| --- | --- | --- |
| Take a feature or fix from request to completed code | [`ship`](skills/ship/SKILL.md) | Inspects the repository, resolves only the uncertainty that matters, implements the smallest coherent change, runs relevant checks, critically reviews the result, and fixes blocking findings. |
| Decide whether a product or feature is worth building | [`thesis`](skills/thesis/SKILL.md) | Tests the customer problem, value, alternatives, differentiation, and smallest useful experience before significant engineering work begins. |
| Resolve a decision that the repository cannot answer | [`clarify`](skills/clarify/SKILL.md) | Inspects existing evidence first, then asks one material question at a time until implementation can continue without guessing. |
| Build an original website using other sites as design references | [`inspire`](skills/inspire/SKILL.md) | Captures one or more public sites, explains their design language, adapts the strongest principles to your product, gets approval, builds an original result, and critiques it. |
| Find the most valuable next improvement for a codebase | [`evolve`](skills/evolve/SKILL.md) | Performs a read-only, evidence-based engineering assessment, identifies the repository's primary capability constraint, and recommends a proportionate next step with a validation method. |

## Install

Run the interactive installer:

```bash
npx skills@latest add jonathanjasare/skills
```

The installer asks which skills you want and which compatible coding agent should receive them.

Choose based on how you plan to work:

| Workflow | Install these skills |
| --- | --- |
| Complete engineering workflow | `ship`, `thesis`, and `clarify` |
| Reference-led website design | `inspire` |
| Repository assessment | `evolve` |

`ship` requires `thesis` and `clarify` because it invokes them when a request contains product or implementation uncertainty. `inspire` and `evolve` are standalone skills.

The examples below use `/skill-name`, as supported by Claude Code. In Codex, use `$skill-name`. Other compatible agents may also invoke a skill from natural-language requests.

## Ship a change

Use `ship` when you want the agent to complete a feature, fix, or other repository change—not merely suggest a plan.

```text
/ship Add a dark mode toggle to settings and remember the user's choice.
```

What happens:

1. `ship` inspects the request and repository before asking questions.
2. If the customer need or value is uncertain, it runs `thesis`. If the evidence says not to build, it stops before changing code.
3. If a decision about behaviour, scope, data, interfaces, or architecture still cannot be answered from the repository, it runs `clarify`.
4. Once the request is ready, it implements the smallest coherent change using the repository's existing patterns.
5. It runs the relevant tests, type checks, lint, builds, migrations, or acceptance checks available for that change.
6. It reviews the final diff for correctness, regressions, unnecessary complexity, and drift from the requested outcome. Blocking findings are fixed and checked again.

The result reports what changed, how it was verified, what the review found, and any remaining risk. `thesis` and `clarify` are skipped when the request is already clear.

## Test a product thesis

Use `thesis` before committing engineering effort when the customer, problem, value, positioning, or need to exist is uncertain.

```text
/thesis Should we add AI-generated meeting summaries to our project management product?
```

It researches current facts and alternatives, tests the proposed customer and job, challenges the differentiation, and narrows the idea to the smallest defensible experience. It returns one decision: `Proceed`, `Proceed but Narrow`, `Pivot`, `Research Further`, or `Stop`.

`thesis` does not implement the feature. You can invoke it directly, or let `ship` invoke it when needed.

## Clarify a blocking decision

Use `clarify` when implementation is blocked by a choice that cannot be resolved from existing code, tests, documentation, or prior decisions.

```text
/clarify Should the new bulk export use CSV or JSON given the existing API and user workflow?
```

It inspects the repository first, recommends an answer when evidence supports one, and asks only questions whose answers could materially change the implementation. It asks one question at a time and stops as soon as the agent can proceed without guessing.

You can invoke `clarify` directly, or let `ship` invoke it when needed.

## Create from design references

Use `inspire` when you have one or more public websites whose design principles you want to understand and adapt to your own product.

```text
/inspire https://example.com https://another-example.com for a developer analytics product.
```

The default flow is:

1. Capture screenshots, scrolling behaviour, typography, colour, layout, and motion evidence from every supplied URL.
2. Explain why the references feel the way they do and select the strongest source for each relevant design dimension.
3. Translate those principles into creative direction that fits your product, audience, content, and brand.
4. Present a concise design playbook for approval before changing product code.
5. After approval, build an original implementation and critique it against the approved direction.

Use a stage directly only when you want to stop at that boundary:

| Command | Result |
| --- | --- |
| `/inspire capture <url>` | Creates the raw reference evidence without interpreting or building from it. |
| `/inspire direct` | Turns an existing `references/` pack into creative direction and an approval-ready design playbook. |
| `/inspire build` | Builds from an approved design playbook, validates the result, and performs a design critique. |

`inspire` uses reference sites as research. It does not copy their source code, content, logos, imagery, or distinctive brand assets.

## Assess a repository

Use `evolve` when you want to understand a repository's engineering maturity and choose the next improvement based on evidence rather than a generic best-practice checklist.

| Command | Use it for |
| --- | --- |
| `/evolve` | A quick health check using high-signal repository evidence. |
| `/evolve deep` | A complete assessment of architecture, knowledge, change safety, verification, delivery, governance, and maintainability. |
| `/evolve architecture` | A focused review of structure, boundaries, dependencies, and the constraints affecting safe change. |
| `/evolve verification` | A focused review of tests, CI, release confidence, recovery, and important user or operational outcomes. |

Every mode identifies the primary capability constraint and recommends the smallest meaningful evolution with evidence, confidence, success criteria, and a validation method. The assessment is read-only unless you separately ask the agent to implement its recommendation.

## License

MIT. See [LICENSE](LICENSE).
