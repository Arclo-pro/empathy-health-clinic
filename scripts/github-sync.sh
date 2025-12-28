#!/bin/bash
# GitHub Sync Script
# Syncs Replit changes to GitHub (source of truth)
# Uses EMPATHY_HEALTH_DEPLOYER_TOKEN for authentication

set -e

REPO="kmease-ttc/empathy-health-clinic"
BRANCH="main"
REMOTE_NAME="github"

echo "🔄 GitHub Sync Script"
echo "============================================================"

# Check for token
if [ -z "$EMPATHY_HEALTH_DEPLOYER_TOKEN" ]; then
    echo "❌ Error: EMPATHY_HEALTH_DEPLOYER_TOKEN secret not found"
    exit 1
fi

# Configure git user (required for commits)
git config user.email "deployer@empathyhealthclinic.com"
git config user.name "Empathy Health Deployer"

# Build authenticated URL (token used for auth, no hardcoded creds)
AUTH_URL="https://x-access-token:${EMPATHY_HEALTH_DEPLOYER_TOKEN}@github.com/${REPO}.git"

# Check if remote exists, add or update
if git remote get-url "$REMOTE_NAME" &>/dev/null; then
    echo "📡 Updating remote '$REMOTE_NAME'..."
    git remote set-url "$REMOTE_NAME" "$AUTH_URL"
else
    echo "📡 Adding remote '$REMOTE_NAME'..."
    git remote add "$REMOTE_NAME" "$AUTH_URL"
fi

# Fetch latest from GitHub
echo "📥 Fetching from GitHub..."
git fetch "$REMOTE_NAME" "$BRANCH" || {
    echo "❌ Failed to fetch from GitHub. Check token permissions."
    exit 1
}

# Check for uncommitted changes
if ! git diff --quiet HEAD 2>/dev/null; then
    echo "📝 Staging local changes..."
    git add -A
    
    COMMIT_MSG="${1:-chore: content update from Replit}"
    git commit -m "$COMMIT_MSG" || echo "ℹ️ No changes to commit"
fi

# Try to merge remote changes (no force)
echo "🔀 Merging remote changes..."
if ! git merge "$REMOTE_NAME/$BRANCH" --no-edit 2>/dev/null; then
    echo ""
    echo "⚠️  MERGE CONFLICT DETECTED"
    echo "============================================================"
    echo "Aborting merge to preserve repository state."
    echo "Manual resolution required."
    echo ""
    git merge --abort 2>/dev/null || true
    exit 1
fi

# Push to GitHub (no force-push)
echo "📤 Pushing to GitHub..."
if git push "$REMOTE_NAME" "HEAD:$BRANCH" 2>&1; then
    echo ""
    echo "✅ Successfully synced to GitHub!"
    echo "   Repo: https://github.com/$REPO"
    echo "   Branch: $BRANCH"
else
    echo ""
    echo "❌ Push failed. Possible causes:"
    echo "   - Token lacks push permissions"
    echo "   - Branch protection rules"
    echo "   - Remote has newer commits (pull first)"
    exit 1
fi
