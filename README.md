# Jonathan's Agent Skills

Reusable skills that help AI coding agents plan and complete product, design, and engineering work.

They use the Agent Skills format. The installer supports Claude Code, Codex, Cursor, and Antigravity. `orchestrate` is Codex-specific because it uses Codex subagents.

## Install

```bash
npx skills@latest add jonathanjasare/skills
```

The installer asks which skills you want and which AI agent to install them for. Ship needs `thesis` and `clarify`, so install all three together. Every other skill works on its own. Install `orchestrate` only for Codex.

Examples below use `/skill-name` for Claude Code. In Codex, use `$skill-name`.

## Choose a skill

| Your goal | Skill | What it does |
| --- | --- | --- |
| Take an idea or coding request from start to finish | [`ship`](skills/ship/SKILL.md) | Checks whether the idea and its differentiation are supported, asks only blocking questions, then builds, tests, and reviews the result. |
| Decide whether a product or feature is worth building | [`thesis`](skills/thesis/SKILL.md) | Checks whether users have a real problem and whether the idea is worth pursuing, then recommends what to do next. |
| Answer a question that must be settled before coding | [`clarify`](skills/clarify/SKILL.md) | Reads the code first, then asks only questions that must be answered before work can continue. |
| Delegate bounded Codex work while keeping the primary agent in control | [`orchestrate`](skills/orchestrate/SKILL.md) (Codex only) | Prefers Luna for small, independent work packages, uses Terra when Luna is unavailable, and keeps final decisions with the primary agent. |
| Create an original website from design references | [`inspire`](skills/inspire/SKILL.md) | Studies public websites, adapts selected design principles to your product, builds an original website, and reviews it. |
| Find the most valuable next improvement for a codebase | [`evolve`](skills/evolve/SKILL.md) | Finds the main engineering weakness holding the repository back and recommends the smallest worthwhile improvement. |

## How Ship works

Use `ship` as the single entry point for a product idea or engineering request:

```text
/ship Add a dark mode toggle to settings and remember the user's choice.
```

`ship` reads the request and the existing code, then decides what to do:

- A new product or substantial feature lacks current evidence about its users, direct alternatives, or differentiated value: run `thesis`. Stop before coding if the evidence is weak.
- An important decision about what to build or how it should work is missing: run `clarify`.
- The request is clear and worthwhile: start coding.

Compatible agents can select Ship automatically for idea-to-release requests. Explicit `/ship` or `$ship` invocation remains the most portable option across clients.

If Ship decides to continue, it makes the change, runs the relevant tests and checks, reviews the result for bugs or needless complexity, and fixes important problems before reporting back.

You can also use `thesis` or `clarify` on their own:

```text
/thesis Should we add AI-generated meeting summaries to our product?
/clarify Should this export use CSV or JSON given the existing API?
```

## Orchestrate (Codex only)

Use `orchestrate` explicitly in Codex when substantial work divides cleanly:

```text
$orchestrate Add CSV import and independently update its focused tests.
```

The primary agent keeps control of scope, decisions, integration, verification, and completion. Orchestrate prefers Luna when Codex exposes it as a worker and falls back to Terra when necessary. It delegates only when the expected benefit exceeds the coordination and verification cost. Otherwise the task runs directly without claiming delegation occurred.

## Inspire

Supply one or more public URLs and describe the target product:

```text
/inspire https://example.com https://another-example.com for a developer analytics product.
```

The usual flow takes screenshots and measurements, explains why the designs work, adapts those ideas to your product, and gives you a plan to approve. Once approved, Inspire builds an original website and reviews it. It does not copy source code, content, logos, images, or recognisable brand elements.

Use one part of the flow on its own when you do not want the full process:

| Command | Result |
| --- | --- |
| `/inspire capture <url>` | Save screenshots, scrolling behaviour, colours, fonts, and layout details. |
| `/inspire direct` | Use an existing `references/` folder to create a design plan for your approval. |
| `/inspire build` | Build the approved design, run available checks, and review the result. |

## Evolve

Use `evolve` to inspect a repository and decide what to improve next:

| Command | Result |
| --- | --- |
| `/evolve` | Quick repository health check. |
| `/evolve deep` | Full review of code structure, documentation, testing, releases, ownership, and long-term maintenance. |
| `/evolve architecture` | Review how the code is organised and how its parts connect. |
| `/evolve verification` | Review how tests, automated checks, releases, and recovery protect users. |

Every mode finds the biggest weakness, suggests the smallest useful improvement, and explains how to check that it worked. Evolve does not change code unless you ask it to.

## Validation

Every push and pull request checks the skill metadata, companion references, local Markdown links, bundled Node scripts, and common credential or personal-path leaks:

```bash
python scripts/validate_public_release.py
```

## License

MIT. See [LICENSE](LICENSE).
