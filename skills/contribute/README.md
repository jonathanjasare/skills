# Contribute

`contribute` turns repository evidence into one focused GitHub contribution: an issue, a draft pull request, or a justified decision to create neither.

## Usage

Use the invocation syntax supported by your coding agent:

```text
/contribute
/contribute auto
/contribute issue Improve offline error handling
/contribute pr https://github.com/owner/repo/issues/123
/contribute The setup guide uses an outdated command
/contribute from-evolve
```

Default and `auto` modes inspect and recommend without modifying the repository. Issue mode drafts by default and publishes only when explicitly requested. PR mode authorises bounded local edits, a focused branch and commit, a push to an existing writable remote, and draft-PR creation when repository access, duplicate checking, and verification permit them. Creating a fork requires separate authority. The skill never merges automatically.

## Deliberate exclusions

This skill does not include a CLI, dashboard, database, GitHub Action, MCP server, telemetry, backlog manager, autonomous agent system, scoring service, custom Git wrapper, monitoring loop, or automatic merge mechanism. It relies on the host agent's existing repository, Git, and GitHub capabilities.

## Validation notes

The skill is designed for these decision boundaries:

| Scenario | Expected behaviour |
| --- | --- |
| Clear bounded bug with native tests | Focused draft PR when authorised |
| Feature requiring product judgement | Issue preserving maintainer decisions |
| Existing duplicate issue or PR | Neither; link the existing work |
| Speculative improvement with weak evidence | Neither |
| Verified documentation defect | Issue or focused PR according to clarity and authority |
| Large refactor described as small | Stop or issue; do not hide the broader scope |
| Strict contribution guidance | Follow repository prerequisites and templates |
| Recommendation from `evolve` | Revalidate before choosing issue, PR, or neither |

The worked examples exercise the issue-versus-PR distinction. Forward testing should additionally verify duplicate handling, weak-evidence rejection, repository-template precedence, authority boundaries, and stop conditions.
