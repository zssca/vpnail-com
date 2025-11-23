#!/usr/bin/env python3
"""
Fresh Install Script for Next.js Project

This script performs a complete clean reinstall:
1. Kills processes on ports 3000 and 3001
2. Removes .next directory
3. Removes node_modules directory
4. Removes package-lock.json
5. Reinstalls dependencies with npm install
6. Starts dev server (npm run dev)
7. Opens browser in Chrome

Usage:
    python scripts/fresh-install.py
"""

import json
import os
import sys
import shutil
import subprocess
import time
import platform
from datetime import datetime
from pathlib import Path


def print_step(message):
    """Print a formatted step message"""
    print(f"\n{'='*60}")
    print(f"🔧 {message}")
    print(f"{'='*60}")


def print_success(message):
    """Print a success message"""
    print(f"✅ {message}")


def print_error(message):
    """Print an error message"""
    print(f"❌ {message}", file=sys.stderr)


def print_warning(message):
    """Print a warning message"""
    print(f"⚠️  {message}")


TREE_EXCLUDE_DIRS = {".claude", ".next", "node_modules", ".git", "__pycache__", "dist", "build"}
TREE_EXCLUDE_FILES = {".DS_Store", "Thumbs.db"}


def update_packages_to_latest(project_root):
    """Update dependencies and devDependencies to their latest versions"""
    # Packages to exclude from auto-update (can cause breaking changes)
    EXCLUDED_PACKAGES = {
        "next",           # Next.js - manual updates only
        "react",          # React - manual updates only
        "react-dom",      # React DOM - manual updates only
        "typescript",     # TypeScript - manual updates only
        "lucide-react",   # Known issues with auto-update
    }

    package_json_path = project_root / "package.json"

    if not package_json_path.exists():
        print_error("package.json not found - cannot update dependencies")
        return False

    try:
        with package_json_path.open() as package_file:
            package_data = json.load(package_file)
    except json.JSONDecodeError as e:
        print_error(f"Failed to parse package.json: {e}")
        return False

    dependencies = package_data.get("dependencies", {})
    dev_dependencies = package_data.get("devDependencies", {})

    def run_update(packages, is_dev=False):
        if not packages:
            label = "dev dependencies" if is_dev else "dependencies"
            print_success(f"No {label} to update")
            return True

        # Filter out excluded packages
        packages_to_update = {name: version for name, version in packages.items()
                              if name not in EXCLUDED_PACKAGES}
        excluded_found = [name for name in packages.keys() if name in EXCLUDED_PACKAGES]

        if excluded_found:
            print(f"  Skipping excluded packages: {', '.join(excluded_found)}")

        if not packages_to_update:
            dep_label = "dev dependencies" if is_dev else "dependencies"
            print_success(f"No {dep_label} to update (all excluded)")
            return True

        package_specs = [f"{name}@latest" for name in packages_to_update.keys()]
        dep_label = "dev dependencies" if is_dev else "dependencies"
        print(f"  Updating {dep_label} to latest versions ({len(package_specs)} packages)...")

        command = ["npm", "install"]
        if is_dev:
            command.append("--save-dev")
        command.extend(package_specs)

        try:
            result = subprocess.run(
                command,
                cwd=project_root,
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                print_success(f"Updated {dep_label}")
                return True
            else:
                error_output = result.stderr.strip() or result.stdout.strip()
                print_error(f"Failed to update {dep_label}")
                if error_output:
                    # Show last 20 lines of error
                    error_lines = error_output.split('\n')
                    relevant_errors = '\n'.join(error_lines[-20:])
                    print(f"\nError output (last 20 lines):\n{relevant_errors}")
                return False

        except Exception as exc:
            print_error(f"Error updating {dep_label}: {exc}")
            return False

    deps_updated = run_update(dependencies)
    dev_deps_updated = run_update(dev_dependencies, is_dev=True)

    return deps_updated and dev_deps_updated


def kill_port(port):
    """Kill process running on specified port"""
    try:
        # Find process on port
        result = subprocess.run(
            ["lsof", "-ti", f":{port}"],
            capture_output=True,
            text=True
        )

        if result.stdout.strip():
            pids = result.stdout.strip().split('\n')
            for pid in pids:
                subprocess.run(["kill", "-9", pid], check=False)
            print_success(f"Killed process on port {port}")
        else:
            print_success(f"Port {port} is already free")

    except Exception as e:
        print_warning(f"Could not kill port {port}: {e}")


def remove_directory(path):
    """Remove directory if it exists"""
    if path.exists():
        print(f"  Removing {path}...")
        try:
            shutil.rmtree(path)
            print_success(f"Removed {path}")
        except Exception as e:
            print_error(f"Failed to remove {path}: {e}")
            return False
    else:
        print_success(f"{path} doesn't exist, skipping")
    return True


def remove_file(path):
    """Remove file if it exists"""
    if path.exists():
        print(f"  Removing {path}...")
        try:
            path.unlink()
            print_success(f"Removed {path}")
        except Exception as e:
            print_error(f"Failed to remove {path}: {e}")
            return False
    else:
        print_success(f"{path} doesn't exist, skipping")
    return True


def run_npm_install(project_root):
    """Run npm install"""
    print("  Running npm install...")
    try:
        result = subprocess.run(
            ["npm", "install"],
            cwd=project_root,
            capture_output=True,
            text=True
        )

        if result.returncode == 0:
            print_success("npm install completed successfully")
            return True
        else:
            print_error("npm install failed")
            error_output = result.stderr.strip() or result.stdout.strip()
            if error_output:
                error_lines = error_output.split('\n')
                relevant_errors = '\n'.join(error_lines[-20:])
                print(f"\nError output (last 20 lines):\n{relevant_errors}")
            return False

    except Exception as e:
        print_error(f"Failed to run npm install: {e}")
        return False


def open_browser(url="http://localhost:3000"):
    """Open URL in Chrome browser (new incognito window)"""
    print(f"  Opening {url} in Chrome incognito window...")

    try:
        system = platform.system()

        if system == "Darwin":  # macOS
            command = ["open", "-na", "Google Chrome", "--args", "--incognito", "--new-window", url]
            subprocess.run(command, check=False)
        elif system == "Linux":
            command = ["google-chrome", "--incognito", "--new-window", url]
            subprocess.run(command, check=False)
        elif system == "Windows":
            # Use start to launch a new window via shell
            command = "start chrome --incognito --new-window \"{}\"".format(url)
            subprocess.run(command, shell=True, check=False)
        else:
            raise RuntimeError(f"Unsupported platform: {system}")

        print_success("Browser opened in incognito mode")

    except Exception as e:
        print_warning(f"Could not open browser automatically: {e}")
        print(f"  Please open manually: {url}")


def should_exclude_from_tree(path: Path) -> bool:
    """Return True if path should be excluded from the tree output"""
    if path.is_dir() and path.name in TREE_EXCLUDE_DIRS:
        return True
    if path.is_file() and path.name in TREE_EXCLUDE_FILES:
        return True
    return False


def build_tree_lines(directory: Path, prefix: str = "") -> list[str]:
    """Recursively build tree lines for the given directory"""
    try:
        items = sorted(directory.iterdir(), key=lambda item: (not item.is_dir(), item.name.lower()))
    except PermissionError:
        return []

    items = [item for item in items if not should_exclude_from_tree(item)]

    lines = []
    for index, item in enumerate(items):
        is_last = index == len(items) - 1
        connector = "└── " if is_last else "├── "
        extension = "    " if is_last else "│   "
        display_name = f"{item.name}/" if item.is_dir() else item.name
        lines.append(f"{prefix}{connector}{display_name}")

        if item.is_dir():
            lines.extend(build_tree_lines(item, prefix + extension))

    return lines


def generate_project_tree(project_root: Path) -> bool:
    """Generate docs/tree/tree.md representing the project structure"""
    print("  Generating project tree markdown...")
    output_file = project_root / "docs" / "tree" / "tree.md"

    try:
        output_file.parent.mkdir(parents=True, exist_ok=True)
        tree_lines = [f"{project_root.name}/"]
        tree_lines.extend(build_tree_lines(project_root))

        excluded_dirs = ", ".join(sorted(TREE_EXCLUDE_DIRS))
        total_items = max(len(tree_lines) - 1, 0)
        tree_content = "\n".join(tree_lines)

        markdown = f"""# Project Tree Structure

Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

Excluded directories: {excluded_dirs}

```
{tree_content}
```

---

**Total items:** {total_items}
"""

        output_file.write_text(markdown)
        print_success(f"Tree generated at {output_file}")
        print(f"  Total items: {total_items}")
        return True

    except Exception as exc:
        print_error(f"Failed to generate tree: {exc}")
        return False


def start_dev_server(project_root):
    """Start npm run dev in background and return process"""
    print("  Starting dev server (npm run dev)...")

    try:
        # Start dev server in background with output visible
        process = subprocess.Popen(
            ["npm", "run", "dev"],
            cwd=project_root,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            universal_newlines=True
        )

        print_success("Dev server starting...")
        print("  Waiting for server to be ready...")

        # Wait up to 30 seconds for server to start
        max_wait = 30
        waited = 0
        server_ready = False

        while waited < max_wait and process.poll() is None:
            time.sleep(1)
            waited += 1
            # Check if port 3000 is listening
            try:
                result = subprocess.run(
                    ["lsof", "-ti", ":3000"],
                    capture_output=True,
                    text=True,
                    timeout=1
                )
                if result.stdout.strip():
                    server_ready = True
                    break
            except:
                pass

        if process.poll() is not None:
            print_error("Dev server process died during startup")
            return None

        if server_ready:
            print_success(f"Dev server ready (took {waited} seconds)")
            return process
        else:
            print_warning(f"Dev server may still be starting (waited {waited}s)")
            return process

    except Exception as e:
        print_error(f"Failed to start dev server: {e}")
        return None


def main():
    """Main execution function"""
    print("\n" + "="*60)
    print("🚀 Next.js Fresh Install Script")
    print("="*60)

    # Get project root (parent directory of scripts folder)
    project_root = Path(__file__).parent.parent
    os.chdir(project_root)

    print(f"\n📁 Project directory: {project_root}")

    # No confirmation - just run automatically
    print("\n🚀 Starting fresh install process...")
    print("  - Kill processes on ports 3000 and 3001")
    print("  - Delete .next directory")
    print("  - Delete node_modules directory")
    print("  - Delete package-lock.json")
    print("  - Update dependencies to @latest (excluding critical packages)")
    print("  - Run npm install")
    print("  - Generate docs/tree/tree.md")
    print("  - Start dev server (npm run dev)")
    print("  - Open browser in Chrome incognito window")
    print()
    print("⚠️  Critical packages excluded from auto-update:")
    print("    next, react, react-dom, typescript, lucide-react")
    print()

    # Step 1: Kill ports
    print_step("Step 1: Killing processes on ports 3000 and 3001")
    kill_port(3000)
    kill_port(3001)
    time.sleep(1)  # Wait a moment for processes to die

    # Step 2: Remove .next directory
    print_step("Step 2: Removing .next directory")
    next_dir = project_root / ".next"
    if not remove_directory(next_dir):
        print_error("Failed to remove .next directory")
        sys.exit(1)

    # Step 3: Remove node_modules directory
    print_step("Step 3: Removing node_modules directory")
    node_modules = project_root / "node_modules"
    if not remove_directory(node_modules):
        print_error("Failed to remove node_modules directory")
        sys.exit(1)

    # Step 4: Remove package-lock.json
    print_step("Step 4: Removing package-lock.json")
    package_lock = project_root / "package-lock.json"
    if not remove_file(package_lock):
        print_error("Failed to remove package-lock.json")
        sys.exit(1)

    # Step 5: Update dependencies to latest versions
    print_step("Step 5: Updating dependencies to latest versions")
    if not update_packages_to_latest(project_root):
        print_error("Failed to update dependencies to latest versions")
        sys.exit(1)

    # Step 6: Run npm install
    print_step("Step 6: Running npm install")
    if not run_npm_install(project_root):
        print_error("Failed to install dependencies")
        sys.exit(1)

    # Step 7: Generate project tree
    print_step("Step 7: Generating project tree")
    if not generate_project_tree(project_root):
        print_warning("Failed to generate project tree (non-critical, continuing...)")

    # Step 8: Start dev server
    print_step("Step 8: Starting dev server")
    dev_server_process = start_dev_server(project_root)
    if not dev_server_process:
        print_error("Failed to start dev server")
        sys.exit(1)

    # Step 9: Open browser
    print_step("Step 9: Opening browser in Chrome incognito window")
    open_browser("http://localhost:3000")

    # Success
    print("\n" + "="*60)
    print("✅ Fresh install completed successfully!")
    print("="*60)
    print("\n🚀 Dev server is running at http://localhost:3000")
    print("🌐 Browser should open automatically")
    print("\nPress Ctrl+C to stop the dev server")
    print()

    # Keep script running and monitor dev server
    try:
        while True:
            # Check if dev server is still running
            if dev_server_process.poll() is not None:
                print_error("\n⚠️  Dev server process stopped unexpectedly!")
                print(f"Exit code: {dev_server_process.returncode}")
                sys.exit(1)
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Shutting down dev server...")
        dev_server_process.terminate()
        try:
            dev_server_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            print("  Force killing dev server...")
            dev_server_process.kill()
        print("Goodbye!")
        sys.exit(0)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Aborted by user (Ctrl+C)")
        sys.exit(1)
    except Exception as e:
        print_error(f"Unexpected error: {e}")
        sys.exit(1)
