# Project Scripts

Utility scripts for maintaining and managing the Next.js project.

---

## Fresh Install Script

**File:** `fresh-install.py`

Performs a complete clean reinstall of the project dependencies.

### What it does:
1. ✅ Kills processes on ports 3000 and 3001
2. ✅ Removes `.next` directory (Next.js build cache)
3. ✅ Removes `node_modules` directory
4. ✅ Removes `package-lock.json`
5. ✅ Runs `npm install` to reinstall dependencies
6. ✅ Starts dev server (`npm run dev`)
7. ✅ Opens browser in Chrome automatically

### Usage:

```bash
# From project root
python scripts/fresh-install.py

# Or make it executable and run directly
chmod +x scripts/fresh-install.py
./scripts/fresh-install.py
```

### When to use:
- ❌ Dependency conflicts or errors
- ❌ Weird build issues that won't go away
- ❌ After changing Node.js versions
- ❌ When `npm install` or `npm run dev` acts strange
- ❌ Hydration errors that persist after normal fixes

### Example output:
```
============================================================
🚀 Next.js Fresh Install Script
============================================================

📁 Project directory: /path/to/project

🚀 Starting fresh install process...
  - Kill processes on ports 3000 and 3001
  - Delete .next directory
  - Delete node_modules directory
  - Delete package-lock.json
  - Run npm install
  - Start dev server (npm run dev)
  - Open browser in Chrome

============================================================
🔧 Step 1: Killing processes on ports 3000 and 3001
============================================================
✅ Killed process on port 3000
✅ Port 3001 is already free

============================================================
🔧 Step 2: Removing .next directory
============================================================
  Removing .next...
✅ Removed .next

...

============================================================
✅ Fresh install completed successfully!
============================================================

🚀 Dev server is running at http://localhost:3000
🌐 Browser should open automatically

Press Ctrl+C to stop the dev server
```

### Features:
- ⚡ Runs automatically without confirmation (fast workflow)
- Graceful error handling
- Clear progress indicators
- Works from any directory (auto-detects project root)
- Handles Ctrl+C interruption gracefully
- Automatically starts dev server and opens browser

### Notes:
- Script will keep running to maintain the dev server
- Press `Ctrl+C` to stop the script and dev server
- Browser opens in Google Chrome (must be installed)
- Dev server runs on http://localhost:3000 by default

---

## Generate Tree Script

**File:** `generate-tree.py`

Generates a visual tree structure of the project directory and saves it to `docs/tree/tree.md`.

### What it does:
1. ✅ Scans entire project directory
2. ✅ Excludes: `.claude`, `.next`, `node_modules`, `.git`, `__pycache__`, `dist`, `build`
3. ✅ Excludes system files: `.DS_Store`, `Thumbs.db`
4. ✅ Generates markdown file with tree structure
5. ✅ Includes timestamp and statistics

### Usage:

```bash
# Using npm script (recommended)
npm run tree

# Or directly with Python
python3 scripts/generate-tree.py
```

### When to use:
- ✅ After major structural changes
- ✅ Before documentation updates
- ✅ To share project structure
- ✅ For onboarding new developers

### Example output:

```
mannahealth-ca/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   └── shared/
└── features/
    └── marketing/
```

### Output location:
- **File:** `docs/tree/tree.md`
- Includes generation timestamp
- Shows total item count
- Lists excluded directories

---

## Add More Scripts

Add new utility scripts to this directory and document them here.

**Naming convention:**
- Python scripts: `script-name.py`
- Shell scripts: `script-name.sh`
- Always add a README section documenting usage
