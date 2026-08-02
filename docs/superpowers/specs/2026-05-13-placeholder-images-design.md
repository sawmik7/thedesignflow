# Design Spec: Cinematic Placeholder Images

**Date:** 2026-05-13
**Topic:** Aesthetic Placeholder Integration

## Goal
Replace generic Unsplash and missing local placeholders with AI-generated cinematic images that match the "The Design Flow" brand identity (Black, White, Orange accent).

## Assets
| Image | Target Path |
|-------|-------------|
| project_brandpulse | `/public/projects/brandpulse.png` |
| project_flowai | `/public/projects/flowai.png` |
| project_nexus | `/public/projects/nexus.png` |
| project_aura | `/public/projects/aura.png` |
| project_mindstack | `/public/projects/mindstack.png` |
| project_cortex | `/public/projects/cortex.png` |
| team_founder_ai | `/public/team/founder.png` |

## Proposed Changes

### 1. File System
- Create `public/projects` and `public/team` if missing.
- Move generated PNGs to their respective paths.

### 2. Data Update (`src/data/projects.ts`)
- Update `image` paths to `.png` extensions.
- Add `poster` paths for `ProjectScrollSection` compatibility.

### 3. Component Optimization
- Update `ProjectScrollSection.tsx` to use the new local posters.
- Implement `next/image` with priority for above-fold assets.
- Add CSS-based fallback for any missing assets.

## Verification
- Run `npm run dev` and verify image loading.
- Check build output.
