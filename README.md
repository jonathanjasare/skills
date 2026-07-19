# Jonathan's Agent Skills

Small, composable workflows for product and engineering work. They use the portable Agent Skills format and work with Claude Code, Codex, Cursor, Antigravity CLI, and other compatible agents.

## Quickstart

```bash
npx skills@latest add jonathanjasare/skills
```

Choose the skills you want and the coding agent you use. For the complete engineering workflow, install `ship`, `thesis`, and `clarify`. Install `inspire` when you want the design workflow.

## Included skills

| Skill | Role | What it does |
| --- | --- | --- |
| `ship` | User-invoked orchestrator | Routes a request through the product, decision, implementation, verification, and review stages it needs. |
| `thesis` | Reusable product stage | Tests whether a product or feature is worth building before significant engineering effort. |
| `clarify` | Reusable decision stage | Resolves implementation decisions that repository evidence cannot answer. |
| `inspire` | User-invoked design workflow | Turns public design references into approved creative direction and an original implementation, including editorial and article experiences. |

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

`inspire` captures evidence, creates an approval-ready design playbook, waits for direction, then builds and critiques an original result. For editorial targets it covers reading experience, publication discovery, and mobile articles. It uses reference sites as research and does not clone their code, content, or brand assets.

## License

MIT. See [LICENSE](LICENSE).
