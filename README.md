# Jonathan's Agent Skills

Small, composable workflows for product and engineering work. They use the portable Agent Skills format and work with Claude Code, Codex, Cursor, Antigravity CLI, and other compatible agents.

## Quickstart

```bash
npx skills@latest add jonathanjasare/skills
```

Choose the skills you want and the coding agent you use. For the complete engineering workflow, install `ship`, `thesis`, and `clarify`. Install `inspire` for design direction, `evolve` for an evidence-based engineering assessment, and `contribute` for turning one justified improvement into a maintainer-ready issue or draft pull request.

## Included skills

| Skill | Role | What it does |
| --- | --- | --- |
| `ship` | User-invoked orchestrator | Routes a request through the product, decision, implementation, verification, and review stages it needs. |
| `thesis` | Reusable product stage | Tests whether a product or feature is worth building before significant engineering effort. |
| `clarify` | Reusable decision stage | Resolves implementation decisions that repository evidence cannot answer. |
| `inspire` | User-invoked design workflow | Turns one or more public design references into approved creative direction and an original implementation. |
| `evolve` | User-invoked engineering assessment | Identifies a repository's maturity bottleneck and recommends its next evidence-backed engineering evolution. |
| `contribute` | User-invoked contribution workflow | Produces one aligned, evidence-backed GitHub issue, draft pull request, or justified neither decision. |

## Ship workflow

`ship` does not run every stage blindly. It inspects the request and routes only when needed:

```text
                     product uncertainty -> thesis
request -> ship -> implementation uncertainty -> clarify
                     ready to build -> implement -> verify -> review
```

Use the host agent's invocation syntax, such as `/ship` in Claude Code or `$ship` in Codex:

```text
/ship Add a dark mode toggle to the settings page.
```

You can also invoke the reusable stages directly:

```text
/thesis I want to build a marketplace for local tutors. Is this worth pursuing?

/clarify Should this export use CSV or JSON given the existing API and user workflow?
```

## Inspire workflow

Supply one or more public URLs and the target product:

```text
/inspire https://example.com https://another-example.com for a developer-focused analytics product.
```

`inspire` captures evidence, creates an approval-ready design playbook, waits for direction, then builds and critiques an original result. It uses reference sites as research and does not clone their code, content, or brand assets.

## Evolve workflow

Run a quick assessment with no extra setup:

```text
/evolve
```

Use `full` for deeper coverage, or focus the assessment on architecture or verification:

```text
/evolve full
/evolve architecture
/evolve verification
/evolve full architecture
```

`evolve` inspects repository evidence, assesses seven engineering capabilities, identifies the primary capability constraint, and recommends the smallest meaningful next evolution with a validation method. It reports what is observed, inferred, declared, or unknown and does not modify the repository unless you separately ask for changes.

## Contribute workflow

Inspect a repository and identify one worthwhile contribution:

```text
/contribute
```

You can supply an idea, investigate an issue, request a bounded draft PR, or revalidate an `evolve` recommendation:

```text
/contribute The setup guide uses an outdated command.
/contribute issue Improve offline error handling.
/contribute pr https://github.com/owner/repo/issues/123
/contribute from-evolve
```

`contribute` follows repository guidance, checks for duplicate work, and decides whether the evidence supports an issue, a draft pull request, or neither. Default mode is read-only, issue mode drafts before publication, and PR mode remains draft unless you explicitly request otherwise.

## License

MIT. See [LICENSE](LICENSE).
