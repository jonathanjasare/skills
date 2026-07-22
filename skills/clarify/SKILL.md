---
name: clarify
description: Resolve implementation decisions that cannot be answered by inspecting the repository.
---

# Clarify

Inspect relevant code, tests, documentation, and prior decisions first.

Ask only questions whose answers could change behaviour, scope, interfaces, data, architecture, migration, or acceptance criteria.

Ask one question at a time. State the decision, recommend an answer, explain its consequence, and wait.

Stop asking when implementation no longer requires guessing. Five questions is a soft ceiling, not a target.

When a material decision cannot be resolved by inspection, research, or user judgment, run the smallest bounded experiment that can produce an observable answer. Set the question and budget first; stop when answered; record the decision; discard experimental code.

Persist only durable decisions in the repository or issue tracker.
