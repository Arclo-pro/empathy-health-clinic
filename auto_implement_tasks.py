#!/usr/bin/env python3
"""
Autonomous SEO Task Implementation Engine

Automatically implements high-priority SEO tasks from tasks_final.csv:
- Creates landing pages for insurance providers, Orlando services
- Optimizes existing pages (titles, meta, content)
- Fixes technical SEO issues
- Deploys changes safely with logging

Designed to run daily after the SEO pipeline generates recommendations.

Safety features:
- Git commit before making any changes (automatic rollback capability)
- MAX_TASKS_PER_RUN limit
- Priority threshold filtering
- Detailed change logging
- Email notification of changes
"""
import os, csv, json, subprocess
from datetime import datetime
from typing import List, Dict, Any

# Configuration
MAX_TASKS_PER_RUN = 3  # Safety limit: max tasks to implement per day (conservative)
PRIORITY_THRESHOLD = 2.0  # Only implement high-priority tasks (score >= 2.0)
DRY_RUN = os.getenv("AUTO_IMPLEMENT_DRY_RUN", "false").lower() == "true"

# Git safety settings
GIT_AUTO_COMMIT = os.getenv("GIT_AUTO_COMMIT", "true").lower() == "true"
GIT_COMMIT_MESSAGE_PREFIX = "[AUTO-SEO]"

class TaskImplementer:
    def __init__(self):
        self.tasks_file = "tasks_final.csv"
        self.implemented = []
        self.failed = []
        self.skipped = []
        self.git_diff = ""
        self.checkpoint_created = False
    
    def create_git_checkpoint(self) -> bool:
        """Create a git checkpoint before making changes (for rollback)"""
        if not GIT_AUTO_COMMIT:
            print("⚠️  Git auto-commit disabled, skipping checkpoint")
            return False
        
        try:
            # Check if there are uncommitted changes first
            result = subprocess.run(
                ["git", "status", "--porcelain"],
                capture_output=True,
                text=True,
                timeout=10
            )
            
            if result.stdout.strip():
                # Commit any existing uncommitted changes as a checkpoint
                subprocess.run(["git", "add", "."], check=True, timeout=10)
                subprocess.run(
                    ["git", "commit", "-m", f"{GIT_COMMIT_MESSAGE_PREFIX} Pre-implementation checkpoint"],
                    check=True,
                    timeout=10
                )
                print("✅ Created git checkpoint (uncommitted changes committed)")
                self.checkpoint_created = True
                return True
            else:
                print("✅ Working directory clean, no checkpoint needed")
                return True
        except subprocess.CalledProcessError as e:
            print(f"⚠️  Failed to create git checkpoint: {e}")
            return False
        except Exception as e:
            print(f"⚠️  Git checkpoint error: {e}")
            return False
    
    def capture_git_diff(self) -> str:
        """Capture git diff of the last commit (for email audit trail)"""
        try:
            # Use 'git show HEAD' to get the diff of the last commit
            # This works even after committing changes
            result = subprocess.run(
                ["git", "show", "HEAD", "--stat", "--patch"],
                capture_output=True,
                text=True,
                timeout=10
            )
            return result.stdout
        except Exception as e:
            print(f"⚠️  Failed to capture git diff: {e}")
            return ""
    
    def commit_changes(self, message: str) -> bool:
        """Commit implemented changes"""
        if not GIT_AUTO_COMMIT:
            print("⚠️  Git auto-commit disabled, changes not committed")
            return False
        
        try:
            subprocess.run(["git", "add", "."], check=True, timeout=10)
            subprocess.run(
                ["git", "commit", "-m", f"{GIT_COMMIT_MESSAGE_PREFIX} {message}"],
                check=True,
                timeout=10
            )
            print(f"✅ Committed changes: {message}")
            return True
        except subprocess.CalledProcessError:
            print("ℹ️  No changes to commit")
            return False
        except Exception as e:
            print(f"⚠️  Failed to commit changes: {e}")
            return False
        
    def load_tasks(self) -> List[Dict[str, Any]]:
        """Load prioritized tasks from CSV"""
        if not os.path.exists(self.tasks_file):
            print(f"⚠️ {self.tasks_file} not found")
            return []
        
        with open(self.tasks_file, 'r') as f:
            reader = csv.DictReader(f)
            tasks = list(reader)
        
        # Filter high-priority tasks
        filtered = []
        for task in tasks:
            try:
                score = float(task.get('priority_score', 0))
                if score >= PRIORITY_THRESHOLD:
                    filtered.append(task)
            except (ValueError, TypeError):
                continue
        
        # Sort by priority (highest first) and limit
        filtered.sort(key=lambda x: float(x.get('priority_score', 0)), reverse=True)
        return filtered[:MAX_TASKS_PER_RUN]
    
    def implement_create_landing(self, task: Dict[str, Any]) -> bool:
        """Create a new landing page"""
        query = task.get('target_query', '')
        url = task.get('suggested_url', '')
        
        print(f"\n📝 Creating landing page for: {query}")
        print(f"   Target URL: {url}")
        
        if DRY_RUN:
            print("   [DRY RUN] Would create page")
            return True
        
        # Parse URL to determine page type
        if 'takes-cigna' in url or 'takes-bcbs' in url or 'takes-umr' in url:
            return self._create_insurance_landing(query, url)
        elif 'orlando' in query:
            return self._create_orlando_service_landing(query, url)
        else:
            print(f"   ⚠️ Unknown landing page type, skipping")
            return False
    
    def _create_insurance_landing(self, query: str, url: str) -> bool:
        """Create insurance provider landing page"""
        # Extract insurance provider from query with better matching
        query_lower = query.lower()
        provider = None
        slug = None
        
        # Common insurance providers
        if 'cigna' in query_lower:
            provider = "Cigna"
            slug = "psychiatrist-orlando-takes-cigna"
        elif 'bcbs' in query_lower or 'blue cross' in query_lower or 'blue shield' in query_lower:
            provider = "Blue Cross Blue Shield (BCBS)"
            slug = "psychiatrist-orlando-takes-bcbs"
        elif 'umr' in query_lower:
            provider = "UMR"
            slug = "psychiatrist-orlando-takes-umr"
        elif 'aetna' in query_lower:
            provider = "Aetna"
            slug = "psychiatrist-orlando-takes-aetna"
        elif 'united' in query_lower or 'uhc' in query_lower:
            provider = "United Healthcare"
            slug = "psychiatrist-orlando-takes-united-healthcare"
        elif 'medicare' in query_lower:
            provider = "Medicare"
            slug = "psychiatrist-orlando-takes-medicare"
        elif 'medicaid' in query_lower:
            provider = "Medicaid"
            slug = "psychiatrist-orlando-takes-medicaid"
        else:
            print(f"   ⚠️ Unknown insurance provider in query: {query}")
            self.skipped.append({"reason": "unknown_provider", "query": query})
            return False
        
        # Check if page already exists
        possible_paths = [
            f"client/src/pages/{provider.replace(' ', '')}Orlando.tsx",
            f"client/src/pages/{slug.replace('-', '_')}.tsx"
        ]
        
        for path in possible_paths:
            if os.path.exists(path):
                print(f"   ℹ️  Page already exists at {path}, skipping creation")
                self.skipped.append({"reason": "already_exists", "query": query, "path": path})
                return True
        
        # Create page using TypeScript script via tsx
        cmd = [
            "npx", "tsx", "scripts/create-insurance-landing.ts",
            "--provider", provider,
            "--slug", slug
        ]
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            if result.returncode == 0:
                print(f"   ✅ Created {slug} page")
                print(f"      Output: {result.stdout[:200]}")
                return True
            else:
                print(f"   ❌ Failed: {result.stderr[:200]}")
                return False
        except subprocess.TimeoutExpired:
            print(f"   ❌ Timeout after 60 seconds")
            return False
        except Exception as e:
            print(f"   ❌ Error: {e}")
            return False
    
    def _create_orlando_service_landing(self, query: str, url: str) -> bool:
        """Create Orlando service landing page"""
        # List of already implemented Orlando pages
        implemented_pages = {
            "psychiatrist-orlando": "client/src/pages/PsychiatristOrlando.tsx",
            "adhd-psychiatrist-orlando": "client/src/pages/ADHDPsychiatristOrlando.tsx",
            "anxiety-psychiatrist-orlando": "client/src/pages/AnxietyPsychiatristOrlando.tsx",
            "child-psychiatrist-orlando": "client/src/pages/ChildPsychiatristOrlando.tsx",
            "bipolar-psychiatrist-orlando": "client/src/pages/BipolarPsychiatristOrlando.tsx",
            "medication-management-orlando": "client/src/pages/MedicationManagementOrlando.tsx",
            "telepsychiatry-orlando": "client/src/pages/TelepsychiatryOrlando.tsx",
            "same-day-psychiatrist-orlando": "client/src/pages/SameDayPsychiatristOrlando.tsx"
        }
        
        # Check if this specific Orlando page exists
        for slug, path in implemented_pages.items():
            if slug in url.lower() or slug.replace('-', ' ') in query.lower():
                if os.path.exists(path):
                    print(f"   ✅ Orlando page already exists: {path}")
                    return True
                else:
                    print(f"   ⚠️  Expected page not found: {path}")
                    self.skipped.append({"reason": "missing_file", "query": query, "expected_path": path})
                    return False
        
        # If we get here, it's a new Orlando service page we haven't created yet
        print(f"   ⚠️  New Orlando service page needed (not yet implemented): {query}")
        self.skipped.append({"reason": "new_orlando_page", "query": query})
        return False
    
    def implement_improve_landing(self, task: Dict[str, Any]) -> bool:
        """Improve existing landing page"""
        query = task.get('target_query', '')
        url = task.get('suggested_url', '')
        position = task.get('serp_position', '')
        
        print(f"\n🔧 Improving landing page: {query}")
        print(f"   Current position: #{position}")
        print(f"   URL: {url}")
        
        if DRY_RUN:
            print("   [DRY RUN] Would optimize page")
            return True
        
        # Call TypeScript script to optimize page via tsx
        cmd = [
            "npx", "tsx", "scripts/optimize-landing.ts",
            "--url", url,
            "--query", query,
            "--position", str(position)
        ]
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            if result.returncode == 0:
                print(f"   ✅ Optimized {url}")
                print(f"      Output: {result.stdout[:200]}")
                return True
            else:
                print(f"   ❌ Failed: {result.stderr[:200]}")
                return False
        except subprocess.TimeoutExpired:
            print(f"   ❌ Timeout after 60 seconds")
            return False
        except Exception as e:
            print(f"   ❌ Error: {e}")
            return False
    
    def implement_tech_fix(self, task: Dict[str, Any]) -> bool:
        """Fix technical SEO issue"""
        url = task.get('suggested_url', '')
        issues = task.get('tech_issues', '')
        
        print(f"\n🔨 Fixing tech issues: {url}")
        print(f"   Issues: {issues}")
        
        if DRY_RUN:
            print("   [DRY RUN] Would fix issues")
            return True
        
        # Call TypeScript script to fix tech issues via tsx
        cmd = [
            "npx", "tsx", "scripts/fix-tech-issues.ts",
            "--url", url,
            "--issues", issues
        ]
        
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            if result.returncode == 0:
                print(f"   ✅ Fixed issues on {url}")
                print(f"      Output: {result.stdout[:200]}")
                return True
            else:
                print(f"   ❌ Failed: {result.stderr[:200]}")
                return False
        except subprocess.TimeoutExpired:
            print(f"   ❌ Timeout after 60 seconds")
            return False
        except Exception as e:
            print(f"   ❌ Error: {e}")
            return False
    
    def implement_task(self, task: Dict[str, Any]) -> bool:
        """Route task to appropriate handler"""
        action = task.get('action', '').lower()
        
        if 'create-landing' in action:
            return self.implement_create_landing(task)
        elif 'improve-landing' in action:
            return self.implement_improve_landing(task)
        elif 'tech-fix' in action:
            return self.implement_tech_fix(task)
        else:
            print(f"\n⚠️ Unknown action: {action}, skipping")
            return False
    
    def run(self):
        """Main execution flow"""
        print("=" * 80)
        print("AUTONOMOUS SEO TASK IMPLEMENTATION")
        print("=" * 80)
        print(f"Timestamp: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}")
        print(f"Max tasks per run: {MAX_TASKS_PER_RUN}")
        print(f"Priority threshold: {PRIORITY_THRESHOLD}")
        print(f"Dry run mode: {DRY_RUN}")
        print(f"Git auto-commit: {GIT_AUTO_COMMIT}")
        print()
        
        # Load tasks
        tasks = self.load_tasks()
        
        if not tasks:
            print("📭 No high-priority tasks to implement")
            return
        
        print(f"📋 Found {len(tasks)} high-priority tasks to implement")
        print()
        
        # SAFETY: Create git checkpoint before making ANY changes
        if not DRY_RUN:
            print("🔒 Creating git checkpoint for rollback capability...")
            if not self.create_git_checkpoint():
                print("⚠️  Failed to create git checkpoint, proceeding anyway")
            print()
        
        # Implement each task
        for i, task in enumerate(tasks, 1):
            score = task.get('priority_score', 0)
            action = task.get('action', '')
            query = task.get('target_query', '')
            
            print(f"[{i}/{len(tasks)}] Priority: {score} | {action} | {query}")
            
            try:
                success = self.implement_task(task)
                if success:
                    self.implemented.append(task)
                else:
                    self.failed.append(task)
            except Exception as e:
                print(f"   ❌ Unexpected error: {e}")
                self.failed.append(task)
        
        # Commit all changes together (if any were made)
        if self.implemented and not DRY_RUN:
            commit_msg = f"Implemented {len(self.implemented)} SEO tasks: " + ", ".join(
                t.get('action', 'unknown') for t in self.implemented[:3]
            )
            if len(self.implemented) > 3:
                commit_msg += f" and {len(self.implemented) - 3} more"
            
            self.commit_changes(commit_msg)
            
            # Capture diff for email report
            self.git_diff = self.capture_git_diff()
        
        # Summary
        print()
        print("=" * 80)
        print("IMPLEMENTATION SUMMARY")
        print("=" * 80)
        print(f"✅ Implemented: {len(self.implemented)}")
        print(f"❌ Failed: {len(self.failed)}")
        print(f"⏭️  Skipped: {len(self.skipped)}")
        
        if self.implemented:
            print("\n✅ Successfully implemented:")
            for task in self.implemented:
                print(f"   - {task.get('action')}: {task.get('target_query')}")
        
        if self.failed:
            print("\n❌ Failed to implement:")
            for task in self.failed:
                print(f"   - {task.get('action')}: {task.get('target_query')}")
        
        if self.skipped:
            print("\n⏭️  Skipped tasks:")
            for task in self.skipped[:5]:  # Show first 5
                reason = task.get('reason', 'unknown')
                query = task.get('query', 'unknown')
                print(f"   - {reason}: {query}")
            if len(self.skipped) > 5:
                print(f"   ... and {len(self.skipped) - 5} more")
        
        # Git status
        if not DRY_RUN and self.checkpoint_created:
            print("\n🔄 Rollback instructions (if needed):")
            print("   git reset --hard HEAD~1  # Undo autonomous changes")
            print("   git reset --hard HEAD~2  # Undo checkpoint too")
        
        # Write comprehensive summary to file for email report
        summary = {
            "timestamp": datetime.utcnow().isoformat(),
            "dry_run": DRY_RUN,
            "total_tasks_analyzed": len(tasks),
            "implemented": len(self.implemented),
            "failed": len(self.failed),
            "skipped": len(self.skipped),
            "git_checkpoint_created": self.checkpoint_created,
            "git_diff_available": bool(self.git_diff),
            "details": {
                "implemented": [
                    {
                        "action": t.get('action'),
                        "query": t.get('target_query'),
                        "priority": t.get('priority_score')
                    } 
                    for t in self.implemented
                ],
                "failed": [
                    {
                        "action": t.get('action'),
                        "query": t.get('target_query'),
                        "priority": t.get('priority_score')
                    } 
                    for t in self.failed
                ],
                "skipped": self.skipped[:10]  # First 10 skipped items
            },
            "git_diff": self.git_diff[:5000] if self.git_diff else ""  # First 5000 chars
        }
        
        with open("implementation_summary.json", "w") as f:
            json.dump(summary, f, indent=2)
        
        print("\n📄 Summary saved to implementation_summary.json")
        print()

if __name__ == "__main__":
    implementer = TaskImplementer()
    implementer.run()
