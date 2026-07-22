# Evolve

`evolve` performs an Engineering Capability Assessment of a software repository and answers:

> What is the next evidence-backed evolution of this repository's engineering capabilities?

## Usage

Use the invocation syntax supported by your coding agent:

```text
/evolve
/evolve quick
/evolve full
/evolve architecture
/evolve verification
/evolve full architecture
/evolve quick architecture verification
```

The default is a quick assessment. `architecture` and `verification` narrow the scope while preserving the same evidence and recommendation methodology, and they may be combined. Token order and case do not matter; conflicting depth tokens resolve to `full`, while unclear modifiers prompt a concise clarification.

The skill reads repository artifacts and produces an Engineering Evolution Report. It does not change the repository unless the user separately requests implementation.

## Deliberate exclusions

This skill does not include a CLI, dashboard, database, GitHub Action, MCP server, telemetry, scoring service, autonomous agent system, plugin framework, or external integration. It uses no numeric scoring formula and does not claim to measure team performance or culture.

## Validation notes

The skill is designed and checked against three repository profiles:

- A small healthy project should receive proportional recommendations and no penalty for missing enterprise controls or `AGENTS.md`.
- A large inconsistent application should be assessed by representative sampling and capability bottlenecks, not by size or a catalogue of missing files.
- A mature production service should not receive `Self-improving` solely for strong CI; durable learning and maintenance feedback loops must be evidenced.

The worked examples cover a small project and a mature service. The assessment method includes the sampling and uncertainty rules needed for large inconsistent applications.
