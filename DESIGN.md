# Design

## Visual System

### Color Palette
- **Deep Obsidian (Background)**: `#050505` (RGB: 5, 5, 5) — Pure premium dark black.
- **Luxurious Cream (Foreground / Text)**: `#F0EDE6` (RGB: 240, 237, 230) — Gentle, warm off-white that reduces eye strain and looks elegant.
- **Champagne Gold (Primary Accent)**: `#C8A96E` (RGB: 200, 169, 110) — The signature color for highlight statements, borders, selections, and high-prestige elements.
- **Hot Orange (Brand Highlight)**: `#FF4D00` (RGB: 255, 77, 0) — High-energy trigger color for vital CTAs, active scrolls, and focus-visible outlines.
- **Surface Carbon (Cards / Containers)**: `#0D0D0D` (RGB: 13, 13, 13) — Container background color.
- **Muted Tone**: `rgba(240, 237, 230, 0.45)` — Used for secondary descriptions and labels.
- **Subtle Border**: `rgba(240, 237, 230, 0.12)` — Delicate separator line.

### Typography
- **Primary Sans / Headings**: `"Plus Jakarta Sans"` — Highly legible, modern, geometric sans-serif used for headers, pricing, services, and structural text.
- **Editorial Serif**: `"Calendas Plus Webfont"`, `"Calendas Plus"`, `"Playfair Display"`, Georgia, serif — Classic high-end luxury serif used exclusively for large hero titles and typographic sliders to convey creative flair.
- **Cursive Accent**: `"Caveat"`, cursive — Warm hand-written details to offset geometric rigidity.
- **Monospace**: `"JetBrains Mono"`, monospace — Used for numbers, stats, and small utility texts.
- **Hierarchy constraint**: Line length capped at 65–75ch for body prose, with visual scale steps of 1.25x ratio.

### Spacing & Layout
- **Dynamic Breathing Room**: Section margins mapped via `clamp(80px, 12vw, 180px)` to provide extreme responsiveness.
- **Tactile Grid Layouts**: 3-column asymmetric layouts for hero sliders, combined with clean flex rows and grid structures elsewhere. No identical cards or flat containers.
- **Textured Surfaces**: Background dot-grid patterns (`radial-gradient`), grid patterns, and subtle film grain overlay (`grain-overlay` at 2.5% opacity) to give the application material depth.

### Motion Energy
- **Signature Ease**: `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-smooth`) — Used for fast transitions and UI reactions.
- **Exponential Scroll Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out`) — Matches Lenis smooth scroll and GSAP scroll triggers for organic, decelerating animations.
- **Banned Motion**: Elastic, bouncy, or linear animations. All transitions must respect `prefers-reduced-motion` settings.

### Glass System
- **Background**: `rgba(255, 255, 255, 0.03)`
- **Border**: `rgba(255, 255, 255, 0.08)`
- **Blur**: `blur(18px) saturate(160%)`
- **Highlight**: `inset 0 1px 0 rgba(255, 255, 255, 0.06)`

---

## Component Specifications

### Buttons
- **Prestige Action**: Full border or solid fill with high-contrast text, scaling slightly on hover. Smooth HSL background transitions.
- **Focus Guard**: Orange `outline: 2px solid var(--brand-orange)` on keyboard focus.

### Cursor / Interactive Details
- Custom cursor with `cursor: none` applied globally, rendering an elegant dynamic cursor that adapts to hovered elements.
