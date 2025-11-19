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

import os
import sys
import shutil
import subprocess
import time
import platform
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
            print_error(f"npm install failed:\n{result.stderr}")
            return False

    except Exception as e:
        print_error(f"Failed to run npm install: {e}")
        return False


def open_browser(url="http://localhost:3000"):
    """Open URL in Chrome browser"""
    print(f"  Opening {url} in Chrome...")

    try:
        system = platform.system()

        if system == "Darwin":  # macOS
            subprocess.run(["open", "-a", "Google Chrome", url], check=False)
        elif system == "Linux":
            subprocess.run(["google-chrome", url], check=False)
        elif system == "Windows":
            subprocess.run(["start", "chrome", url], shell=True, check=False)

        print_success("Browser opened")

    except Exception as e:
        print_warning(f"Could not open browser automatically: {e}")
        print(f"  Please open manually: {url}")


def start_dev_server(project_root):
    """Start npm run dev in background"""
    print("  Starting dev server (npm run dev)...")

    try:
        # Start dev server in background
        process = subprocess.Popen(
            ["npm", "run", "dev"],
            cwd=project_root,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        print_success("Dev server starting...")
        print("  Waiting for server to be ready (10 seconds)...")

        # Wait for server to start
        time.sleep(10)

        print_success("Dev server should be ready")
        return True

    except Exception as e:
        print_error(f"Failed to start dev server: {e}")
        return False


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
    print("  - Run npm install")
    print("  - Start dev server (npm run dev)")
    print("  - Open browser in Chrome")
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

    # Step 5: Run npm install
    print_step("Step 5: Running npm install")
    if not run_npm_install(project_root):
        print_error("Failed to install dependencies")
        sys.exit(1)

    # Step 6: Start dev server
    print_step("Step 6: Starting dev server")
    if not start_dev_server(project_root):
        print_error("Failed to start dev server")
        sys.exit(1)

    # Step 7: Open browser
    print_step("Step 7: Opening browser in Chrome")
    open_browser("http://localhost:3000")

    # Success
    print("\n" + "="*60)
    print("✅ Fresh install completed successfully!")
    print("="*60)
    print("\n🚀 Dev server is running at http://localhost:3000")
    print("🌐 Browser should open automatically")
    print("\nPress Ctrl+C to stop the dev server")
    print()

    # Keep script running so dev server stays alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Shutting down dev server...")
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
