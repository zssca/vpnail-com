#!/usr/bin/env python3
"""
Generate project directory tree and save to docs/tree/tree.md
Excludes: .claude, .next, node_modules, .git
"""

import os
from pathlib import Path
from datetime import datetime

# Configuration
ROOT_DIR = Path(__file__).parent.parent
OUTPUT_FILE = ROOT_DIR / "docs" / "tree" / "tree.md"
EXCLUDE_DIRS = {".claude", ".next", "node_modules", ".git", "__pycache__", "dist", "build"}
EXCLUDE_FILES = {".DS_Store", "Thumbs.db"}

def should_exclude(path: Path) -> bool:
    """Check if path should be excluded"""
    # Exclude directories
    if path.is_dir() and path.name in EXCLUDE_DIRS:
        return True
    # Exclude files
    if path.is_file() and path.name in EXCLUDE_FILES:
        return True
    return False

def generate_tree(directory: Path, prefix: str = "", is_last: bool = True) -> list[str]:
    """Generate tree structure recursively"""
    lines = []

    # Get all items in directory
    try:
        items = sorted(directory.iterdir(), key=lambda x: (not x.is_dir(), x.name.lower()))
    except PermissionError:
        return lines

    # Filter out excluded items
    items = [item for item in items if not should_exclude(item)]

    for i, item in enumerate(items):
        is_last_item = i == len(items) - 1

        # Tree characters
        if is_last:
            connector = "└── " if is_last_item else "├── "
            extension = "    " if is_last_item else "│   "
        else:
            connector = "└── " if is_last_item else "├── "
            extension = "    " if is_last_item else "│   "

        # Add directory marker
        name = item.name
        if item.is_dir():
            name += "/"

        lines.append(f"{prefix}{connector}{name}")

        # Recurse into directories
        if item.is_dir():
            lines.extend(generate_tree(item, prefix + extension, is_last_item))

    return lines

def main():
    """Main function"""
    print("🌳 Generating project tree...")

    # Ensure output directory exists
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    # Generate tree
    tree_lines = [f"{ROOT_DIR.name}/"]
    tree_lines.extend(generate_tree(ROOT_DIR))

    # Create markdown content
    tree_content = '\n'.join(tree_lines)
    excluded_dirs = ', '.join(sorted(EXCLUDE_DIRS))
    total_items = len(tree_lines) - 1

    content = f"""# Project Tree Structure

Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

Excluded directories: {excluded_dirs}

```
{tree_content}
```

---

**Total items:** {total_items}
"""

    # Write to file
    OUTPUT_FILE.write_text(content)

    print(f"✅ Tree generated successfully!")
    print(f"📁 Output: {OUTPUT_FILE}")
    print(f"📊 Total items: {len(tree_lines) - 1}")

if __name__ == "__main__":
    main()
