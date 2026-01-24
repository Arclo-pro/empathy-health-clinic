# IMAGE_STORAGE_STANDARD.md

## Purpose

This document defines the **mandatory, go-forward standard** for image storage, retrieval, and usage in this repository.

Its goals are to:
- Prevent broken images during cleanup, refactors, or deployments
- Eliminate reliance on ephemeral or temporary directories
- Keep the repo lightweight, predictable, and production-safe
- Make image handling obvious to both humans and automation agents

This standard applies to **all future development**.

---

## Core Principles

1. **Production images must be durable**
   - No production UI or content may rely on temporary or tool-managed folders.
2. **Image location must imply intent**
   - Where an image lives determines how it is used and maintained.
3. **Deleting temp folders must never break the site**
4. **Missing images must fail loudly, not silently**

---

## Approved Image Locations

### 1. `/public/site-assets/` (REQUIRED for UI & brand)

Use for:
- Logos
- Icons
- Hero images
- UI illustrations
- Social preview images (OpenGraph, Twitter)

Rules:
- Files are **committed to git**
- Files are served statically at `/site-assets/...`
- References must use absolute paths

Example:
```
<img src="/site-assets/logo.svg" alt="Logo" />
```

---

### 2. `/public/blog-assets/` (Content imagery)

Use for:
- Blog images
- Marketing visuals
- Case study illustrations

Rules:
- Commit to git only if volume is small
- Use absolute paths:
```
/blog-assets/post-name/image.webp
```

---

### 3. Object Storage / CDN (Recommended for scale)

Use for:
- Large image libraries
- Frequently changing assets
- Generated or user-uploaded content

Rules:
- Store only URLs in config or database
- Never hardcode credentials
- UI must handle missing images gracefully

---

## Forbidden Locations (DO NOT USE)

### `attached_assets/`
This directory is:
- Ephemeral
- Tool-managed
- Subject to deletion during cleanup

**No production image may ever be referenced from this folder.**

---

## Guardrails & Automation

- `attached_assets/`, `tmp/`, `cache/` must be gitignored
- Builds must fail if referenced images are missing

---

## Summary

**If deleting `attached_assets/` breaks the site, the architecture is wrong.**
