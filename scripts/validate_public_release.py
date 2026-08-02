#!/usr/bin/env python3
"""Validate the public skill repository without third-party dependencies."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"
SELF = Path(__file__).resolve()
FRONTMATTER = re.compile(r"^---\r?\n(.*?)\r?\n---(?:\r?\n|$)", re.DOTALL)
MARKDOWN_LINK = re.compile(r"\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+[^)]*)?\)")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def frontmatter(path: Path, errors: list[str]) -> tuple[str, str] | None:
    match = FRONTMATTER.match(read(path))
    if not match:
        errors.append(f"{path.relative_to(ROOT)}: missing or malformed frontmatter")
        return None
    block = match.group(1)
    keys = set(re.findall(r"^([A-Za-z0-9_-]+):", block, re.MULTILINE))
    unexpected = keys - {"name", "description", "license", "allowed-tools", "metadata"}
    if unexpected:
        errors.append(f"{path.relative_to(ROOT)}: unexpected frontmatter key(s): {', '.join(sorted(unexpected))}")
    values: dict[str, str] = {}
    for key in ("name", "description"):
        item = re.search(rf"^{key}:\s*(.+?)\s*$", block, re.MULTILINE)
        if item:
            values[key] = item.group(1).strip().strip('"\'')
        else:
            errors.append(f"{path.relative_to(ROOT)}: missing {key}")
    return values.get("name", ""), values.get("description", "")


def parse_openai_yaml(path: Path, errors: list[str], skill_name: str) -> None:
    sections: dict[str, dict[str, str]] = {}
    current: str | None = None
    for line_number, line in enumerate(read(path).splitlines(), start=1):
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        section = re.fullmatch(r"([a-z_]+):", line)
        if section:
            current = section.group(1)
            if current in sections:
                errors.append(f"{path.relative_to(ROOT)}:{line_number}: duplicate section {current}")
            sections.setdefault(current, {})
            continue
        field = re.fullmatch(r"  ([a-z_]+):\s*(.+)", line)
        if field and current is not None:
            key, value = field.groups()
            if key in sections[current]:
                errors.append(f"{path.relative_to(ROOT)}:{line_number}: duplicate field {current}.{key}")
            sections[current][key] = value
            continue
        errors.append(f"{path.relative_to(ROOT)}:{line_number}: unsupported YAML shape")

    relative = path.relative_to(ROOT)
    unexpected_sections = set(sections) - {"interface", "policy"}
    if unexpected_sections:
        errors.append(f"{relative}: unexpected section(s): {', '.join(sorted(unexpected_sections))}")
    if "interface" not in sections:
        errors.append(f"{relative}: missing interface section")
    interface = sections.get("interface", {})
    for key in ("display_name", "short_description", "default_prompt"):
        value = interface.get(key)
        if value is None:
            errors.append(f"{relative}: missing interface.{key}")
            continue
        if not (value.startswith('"') and value.endswith('"')):
            errors.append(f"{relative}: interface.{key} must be a quoted string")
            continue
        try:
            value = json.loads(value)
        except json.JSONDecodeError:
            errors.append(f"{relative}: interface.{key} is not valid quoted text")
            continue
        if key == "display_name" and value.casefold() != skill_name.replace("-", " ").casefold():
            errors.append(f"{relative}: display_name does not match {skill_name}")
        if key == "short_description" and not 25 <= len(value) <= 64:
            errors.append(f"{relative}: short_description must be 25-64 characters")
        if key == "default_prompt" and f"${skill_name}" not in value:
            errors.append(f"{relative}: default_prompt must mention ${skill_name}")

    unexpected_interface = set(interface) - {"display_name", "short_description", "default_prompt"}
    if unexpected_interface:
        errors.append(f"{relative}: unexpected interface field(s): {', '.join(sorted(unexpected_interface))}")
    policy = sections.get("policy", {})
    unexpected_policy = set(policy) - {"allow_implicit_invocation"}
    if unexpected_policy:
        errors.append(f"{relative}: unexpected policy field(s): {', '.join(sorted(unexpected_policy))}")
    implicit = policy.get("allow_implicit_invocation")
    if implicit is not None and implicit not in {"true", "false"}:
        errors.append(f"{relative}: policy.allow_implicit_invocation must be true or false")


def check_skills(errors: list[str]) -> list[Path]:
    skill_files = sorted(SKILLS.glob("*/SKILL.md"))
    if not skill_files:
        errors.append("No skills/*/SKILL.md files found")
        return []

    skill_names: list[str] = []
    for skill_file in skill_files:
        parsed = frontmatter(skill_file, errors)
        if parsed is None:
            continue
        name, description = parsed
        directory_name = skill_file.parent.name
        if not re.fullmatch(r"[a-z0-9-]{1,64}", name) or name.startswith("-") or name.endswith("-") or "--" in name:
            errors.append(f"{skill_file.relative_to(ROOT)}: invalid skill name {name!r}")
        if name != directory_name:
            errors.append(f"{skill_file.relative_to(ROOT)}: name does not match directory")
        if not description or len(description) > 1024 or "<" in description or ">" in description:
            errors.append(f"{skill_file.relative_to(ROOT)}: invalid description")
        skill_names.append(directory_name)

        metadata = skill_file.parent / "agents" / "openai.yaml"
        if not metadata.is_file():
            errors.append(f"{metadata.relative_to(ROOT)}: missing metadata")
        else:
            parse_openai_yaml(metadata, errors, directory_name)

    metadata_files = sorted(SKILLS.glob("*/agents/openai.yaml"))
    known = {path.parent.name for path in skill_files}
    for metadata in metadata_files:
        if metadata.parent.parent.name not in known:
            errors.append(f"{metadata.relative_to(ROOT)}: metadata has no matching SKILL.md")
    return skill_files


def check_companions(errors: list[str]) -> None:
    ship = SKILLS / "ship" / "SKILL.md"
    if not ship.is_file():
        errors.append("ship: SKILL.md is missing")
        return
    text = read(ship)
    for companion in ("thesis", "clarify"):
        if not (SKILLS / companion / "SKILL.md").is_file():
            errors.append(f"ship: required companion {companion} is missing")
        if not re.search(rf"\b{companion}\b", text):
            errors.append(f"ship: required companion {companion} is not referenced")


def check_markdown_links(errors: list[str]) -> None:
    for path in ROOT.rglob("*.md"):
        if ".git" in path.parts:
            continue
        for match in MARKDOWN_LINK.finditer(read(path)):
            destination = unquote(match.group(1) or match.group(2))
            target = destination.split("#", 1)[0].split("?", 1)[0]
            if not target or re.match(r"(?:[a-z]+:)?//", target) or re.match(r"(?:mailto|tel|http|https):", target):
                continue
            resolved = (path.parent / target).resolve()
            try:
                resolved.relative_to(ROOT)
            except ValueError:
                errors.append(f"{path.relative_to(ROOT)}: link escapes repository: {target}")
                continue
            if not resolved.exists():
                errors.append(f"{path.relative_to(ROOT)}: broken local link: {target}")


def check_javascript(errors: list[str]) -> None:
    scripts = sorted(path for path in SKILLS.rglob("*") if path.suffix in {".js", ".mjs", ".cjs"})
    for script in scripts:
        for args in (("--check",), ("--help",)) if "scripts" in script.parts else (("--check",),):
            try:
                result = subprocess.run(
                    ["node", *args, str(script)], capture_output=True, text=True, timeout=30, check=False
                )
            except (FileNotFoundError, subprocess.TimeoutExpired) as exc:
                errors.append(f"{script.relative_to(ROOT)}: Node check failed: {exc}")
                break
            if result.returncode:
                output = (result.stderr or result.stdout).strip().splitlines()
                errors.append(f"{script.relative_to(ROOT)}: node {' '.join(args)} failed: {output[-1] if output else 'unknown error'}")


def check_public_safety(errors: list[str]) -> None:
    slash = r"[\\/]"
    path_patterns = [
        re.compile(r"(?i)[A-Z]:" + slash + r"(?:Users|AppData|Documents|Desktop|OneDrive)" + slash),
        re.compile(r"(?i)(?:^|[\s`\"'(])/(?:Users|home|private|var/folders)/"),
        re.compile(r"(?i)(?:^|[\s`\"'(])~" + slash + r"(?:\.ssh|\.aws|\.codex|\.agents)"),
    ]
    secret_patterns = [
        re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
        re.compile(r"\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b"),
        re.compile(r"\bgithub_pat_[A-Za-z0-9_]{20,}\b"),
        re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
        re.compile(r"\bxox[baprs]-[0-9A-Za-z-]{20,}\b"),
        re.compile(r"\bAIza[0-9A-Za-z_-]{20,}\b"),
        re.compile(r"(?i)\bsk-[A-Za-z0-9]{20,}\b"),
    ]
    forbidden_names = {".env", ".env.local", ".npmrc", "id_rsa", "id_ed25519"}
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts or path.resolve() == SELF:
            continue
        if path.name.lower() in forbidden_names:
            errors.append(f"{path.relative_to(ROOT)}: credential-bearing filename is not public-safe")
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        for pattern in path_patterns + secret_patterns:
            if pattern.search(text):
                errors.append(f"{path.relative_to(ROOT)}: possible private path or credential material")
                break


def main() -> int:
    errors: list[str] = []
    check_skills(errors)
    check_companions(errors)
    check_markdown_links(errors)
    check_javascript(errors)
    check_public_safety(errors)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print("Public release validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
