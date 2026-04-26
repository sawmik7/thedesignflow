# AGENTS.md - Development Guide for hasanul-portfolio

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Overview

- **Framework**: Next.js 15.2.0 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **UI**: React 19, Tailwind CSS 4.0
- **Animations**: GSAP + @gsap/react
- **Icons**: lucide-react
- **Path Alias**: `@/*` maps to `./src/*`

---

## Commands

### Development
```bash
npm run dev          # Start dev server (http://localhost:3000)
```

### Build & Production
```bash
npm run build        # Production build
npm run start        # Start production server
```

### Linting
```bash
npm run lint         # Run ESLint on entire codebase
```

### Running a Single Test
This project does not currently have a test framework configured. If adding tests later, use:
```bash
npm test             # Run all tests
npm test -- path/to/test.ts # Run specific test file
```

---

## Code Style Guidelines

### TypeScript
- **Strict Mode**: Enabled in tsconfig.json - do not disable
- **Type Safety**: Always define return types for functions; avoid `any`
- **Interfaces vs Types**: Use interfaces for object shapes, types for unions/primitives
- **Null Handling**: Use optional chaining (`?.`) and nullish coalescing (`??`)

### Imports
- Use path alias `@/` for all local imports (e.g., `@/components/sections/Hero`)
- Group imports in this order: external libs → React → path alias → relative
- Example:
```typescript
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { Hero } from "@/components/sections/Hero";
import styles from "./Component.module.css";
```

### Component Patterns
- Use functional components with explicit return types
- Use `"use client"` directive for components using client-side APIs (hooks, browser APIs, GSAP)
- Use `useLayoutEffect` for GSAP animations (ensures DOM is ready)
- Clean up GSAP contexts with `ctx.revert()` in cleanup function
- Example:
```typescript
"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function ComponentName() {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // animation code
    }, container);
    return () => ctx.revert();
  }, []);

  return <section ref={container}>...</section>;
}
```

### Naming Conventions
- **Files**: PascalCase for components (`Hero.tsx`), camelCase for utilities (`useScroll.ts`)
- **Components**: PascalCase (`export function Hero()`)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants, camelCase otherwise
- **Classes**: Avoid; use functional components instead

### Tailwind CSS
- Use inline classes for styles (Tailwind 4.0 with @tailwindcss/postcss)
- Use CSS variables defined in `globals.css` for colors (e.g., `var(--brand-orange)`)
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Example: `className="text-lg sm:text-2xl text-[var(--foreground)]/60"`

### GSAP Usage
- Always wrap animations in `gsap.context()` for proper cleanup
- Use `@gsap/react` for React integration
- Prefer `useLayoutEffect` over `useEffect` for visual animations
- Clean up with `ctx.revert()` in the cleanup function

### Error Handling
- Use try/catch for async operations
- Never leave console.log in production code
- Use proper error boundaries for component failures

### File Structure
```
src/
├── app/           # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/  # Page sections (Hero, About, Contact, etc.)
│   └── ui/        # Reusable UI components (buttons, cards, etc.)
└── ...
```

---

## ESLint Configuration

The project uses `eslint-config-next` with:
- `core-web-vitals` rules
- `typescript` rules

Run `npm run lint` to check. Fix issues before committing.

---

## Common Patterns

### Client Components
Mark components as `"use client"` when they:
- Use React hooks (useState, useEffect, useRef)
- Use browser APIs (window, document)
- Use GSAP or other animation libraries
- Handle user events (onClick, onChange)

### CSS Variables (from globals.css)
- `--background` - Page background
- `--foreground` - Primary text
- `--brand-orange` - Accent color (#FF4D00)
- `--deep-black` - Dark backgrounds (#0A0A0A)
- `--pure-white` - Pure white (#FFFFFF)

---

## Important Notes

1. **No Tests**: Project currently has no test framework. Consider adding Vitest/Jest if needed.
2. **Next.js 15**: Uses App Router with Server Components by default. Only add `"use client"` when necessary.
3. **Tailwind 4.0**: Uses new CSS-based configuration. Check docs if adding custom utilities.
4. **GSAP**: Register plugins inside useLayoutEffect, not at top level.

---

## Elite AI Agent Workflow (G-Stack & SuperPower)

This project strictly enforces the **G-Stack** and **SuperPower** frameworks. AI Agents must adhere to the following when developing:

1. **Design First (`ui-ux-pro-max`)**: Agents MUST NOT write UI code without first establishing a precise Design System (Pattern, Style, Color, Typography).
2. **Plan Before Code**: Agents must write an `implementation_plan.md` before executing massive structural changes.
3. **Multi-Perspective Review**: All code must pass the `comprehensive-code-review` standard across 4 perspectives (Logic, Edge Cases, Architecture, UI/UX).
4. **Cinematic Motion Quality**: Follow rules from `motion-interaction-libraries`, `elite-frontend-design`, and MUST universally combine the `animation-expert` skill globally for all motion routing (Framer Motion, GSAP, Next.js).
5. **Security First**: Scan with `007` threat models before deploying backend updates.
6. **Automatic Multi-Agent Orchestration**: Multi-agent supervisors (using `agent-superpower`, `oh-my-claudecode` flows, or equivalent) should start automatically whenever needed to handle complex domain separation without asking for permission.

---

## Global AI Skills Repositories

The project recommends utilizing predefined AI Agent skills for faster development. Future agents should fetch or refer to these links to download new skills as required:
- https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills
- https://antigravityskills.com/skills?subcategory=frontend
- https://antigravityskills.com/skills
- https://github.com/guanyang/antigravity-skills/tree/main/skills

Downloaded skills are installed locally inside `.agents/skills/`. You MUST use the `view_file` tool to read their `SKILL.md` before applying their rules.