#!/usr/bin/env python3
"""Generate an ASCII project tree for selected paths and save it as markdown."""
from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable, List, Set


def format_size(size: int) -> str:
    """Format file size in human-readable format."""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size < 1024.0:
            return f"{size:.1f}{unit}".rjust(8)
        size /= 1024.0
    return f"{size:.1f}TB".rjust(8)


def count_items(directory: Path, show_hidden: bool, exclude: Set[str]) -> int:
    """Count items in a directory."""
    count = 0
    for entry in directory.iterdir():
        name = entry.name
        if not show_hidden and name.startswith("."):
            continue
        if name in exclude:
            continue
        count += 1
    return count


def list_entries(directory: Path, show_hidden: bool, exclude: Set[str]) -> List[Path]:
    entries: List[Path] = []
    for entry in directory.iterdir():
        name = entry.name
        if not show_hidden and name.startswith("."):
            continue
        if name in exclude:
            continue
        entries.append(entry)
    return sorted(entries, key=lambda p: (p.is_file(), p.name.lower()))


def build_tree(directory: Path, prefix: str, show_hidden: bool, exclude: Set[str], show_info: bool) -> List[str]:
    lines: List[str] = []
    entries = list_entries(directory, show_hidden, exclude)
    for idx, entry in enumerate(entries):
        is_last = idx == len(entries) - 1
        connector = "`-- " if is_last else "|-- "
        next_prefix = "    " if is_last else "|   "

        if entry.is_dir():
            if show_info:
                item_count = count_items(entry, show_hidden, exclude)
                info = f"[DIR] ({item_count:3d} items) "
                lines.append(f"{prefix}{connector}{info}{entry.name}/")
            else:
                lines.append(f"{prefix}{connector}{entry.name}/")
            lines.extend(build_tree(entry, prefix + next_prefix, show_hidden, exclude, show_info))
        else:
            if show_info:
                try:
                    size = entry.stat().st_size
                    size_str = format_size(size)
                    info = f"[FILE] {size_str} "
                    lines.append(f"{prefix}{connector}{info}{entry.name}")
                except OSError:
                    lines.append(f"{prefix}{connector}[FILE] (error)   {entry.name}")
            else:
                lines.append(f"{prefix}{connector}{entry.name}")
    return lines


def generate_tree(root: Path, include: Iterable[str], show_hidden: bool, exclude: Iterable[str], show_info: bool) -> List[str]:
    lines: List[str] = []
    exclude_set = set(exclude)

    include_paths = list(include)
    for idx, rel_path in enumerate(include_paths):
        target = (root / rel_path).resolve()
        try:
            target.relative_to(root.resolve())
        except ValueError:
            raise ValueError(f"Include path '{rel_path}' must be inside the root directory")

        if not target.exists():
            lines.append(f"{rel_path} (missing)")
        elif target.is_dir():
            if show_info:
                item_count = count_items(target, show_hidden, exclude_set)
                info = f"[DIR] ({item_count:3d} items) "
                lines.append(f"{info}{rel_path.rstrip('/')}/")
            else:
                lines.append(f"{rel_path.rstrip('/')}/")
            lines.extend(build_tree(target, prefix="", show_hidden=show_hidden, exclude=exclude_set, show_info=show_info))
        else:
            if show_info:
                try:
                    size = target.stat().st_size
                    size_str = format_size(size)
                    info = f"[FILE] {size_str} "
                    lines.append(f"{info}{rel_path.rstrip('/')}")
                except OSError:
                    lines.append(f"[FILE] (error)   {rel_path.rstrip('/')}")
            else:
                lines.append(rel_path.rstrip('/'))

        if idx != len(include_paths) - 1:
            lines.append("")
    return lines


def main() -> None:
    project_root = Path(__file__).resolve().parents[3]

    parser = argparse.ArgumentParser(description="Generate a markdown project tree for selected paths.")
    parser.add_argument(
        "--root",
        type=Path,
        default=project_root,
        help="Root directory to treat as the project root (default: repository root)",
    )
    parser.add_argument(
        "--include",
        nargs="+",
        default=["app", "components", "developer", "features", "lib", "public"],
        help="Relative paths (from root) to include in the tree",
    )
    parser.add_argument(
        "--exclude",
        nargs="+",
        default=["node_modules", ".git", ".next"],
        help="Entry names to exclude anywhere in the tree",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Output markdown file (default: dev/project-tree.md under the root)",
    )
    parser.add_argument(
        "--show-hidden",
        action="store_true",
        help="Include dotfiles and dot-directories",
    )
    parser.add_argument(
        "--show-info",
        action="store_true",
        help="Show file sizes and directory item counts",
    )

    args = parser.parse_args()
    root = args.root.resolve()
    output_path = args.output or (root / "developer" / "project-tree.md")

    tree_lines = generate_tree(root, args.include, args.show_hidden, args.exclude, args.show_info)

    header = [
        "# Project Tree",
        "",
        f"root: {root}",
        f"include: {', '.join(args.include)}",
        f"exclude: {', '.join(args.exclude) if args.exclude else '(none)'}",
    ]
    if args.show_info:
        header.append("info: [FILE/DIR] size/count")
    header.extend(["", "```"])

    footer = ["```", ""]

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(header + tree_lines + footer))

    print(f"Wrote tree to {output_path}")


if __name__ == "__main__":
    main()
