# FlowPilot

> An AI-powered workspace that helps teams organize ideas, tasks, and decisions in one place — from chaos to flow.

FlowPilot is a marketing landing page for a productivity SaaS product. It showcases the core value proposition of a collaborative workspace where teams can capture ideas, assign tasks, and log decisions without switching between multiple tools. The page is built with performance, accessibility, and a premium animated experience in mind.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Tools & Frameworks](#tools--frameworks)
- [Design Decisions](#design-decisions)
- [Implementation Decisions](#implementation-decisions)
- [How AI-Assisted Tools Were Used](#how-ai-assisted-tools-were-used)
- [What Would Be Improved With More Time](#what-would-be-improved-with-more-time)

---

## Project Overview

FlowPilot solves a common problem for modern teams: ideas get lost in chat threads, tasks live in spreadsheets, and decisions are buried in email. The product brings all three into a single AI-powered workspace.

This repository contains the **marketing landing page** — a full-screen, animated, responsive page designed to communicate the product's value and convert visitors into early-access signups.

### Page Sections

| Section | Purpose |
|---|---|
| **Nav** | Fixed header with scroll-aware transparency, mobile drawer, EN/ES toggle, and dark mode toggle |
| **Hero** | Main headline, subheadline, CTA button, animated UI mockup |
| **Features** | Bento-style asymmetric grid showing 3 core product features |
| **Social Proof** | Partner logo strip, editorial stats, testimonial cards |
| **Benefits** | Animated metric counters + value proposition bullets |
| **Final CTA** | Email capture form for early access |
| **Footer** | Navigation links and product information |

---

## Setup Instructions

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Install

```bash
git clone <https://github.com/carlosarley/FlowPilot.git>
cd flowpilot
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Tools & Frameworks

| Category | Tool | Version | Why |
|---|---|---|---|
| Framework | Next.js | 16.2.3 | App Router, SSR, built-in image/font optimization |
| Language | TypeScript | 5 | Type safety across all components and translations |
| UI Library | React | 19.2.4 | Component model, Context API for state |
| Styling | Tailwind CSS | 4 | Utility-first, fast iteration, dark mode via class strategy |
| Animations | Framer Motion | 12.38.0 | Declarative animations, scroll-triggered, `MotionValue` for counters |
| Component Primitives | shadcn/ui + @base-ui/react | latest | Accessible, unstyled base components (Avatar, Badge, Card, Button) |
| Icons | Lucide React | 1.8.0 | Consistent SVG icon set |
| Dark Mode | next-themes | 0.4.6 | SSR-safe theme management, system preference detection |
| Fonts | Google Fonts (next/font) | — | Outfit (headings) + Plus Jakarta Sans (body), zero layout shift |

---

## Design Decisions

### Typography
Two complementary Google Fonts were chosen to create a visual hierarchy that feels modern without being generic:
- **Outfit** — for headlines. Geometric, confident, and product-forward.
- **Plus Jakarta Sans** — for body text. Warm and readable at all sizes.

Font sizes use CSS `clamp()` for fluid scaling across breakpoints with no breakpoint jumps.

### Color System
Colors are defined in the **OKLCH color space** — a perceptually uniform model that ensures consistent contrast between light and dark mode without hand-tuning.

- **Primary (Teal):** `oklch(0.60 0.118 184.7)` — trust, productivity, tech
- **Accent (Orange):** `oklch(0.646 0.222 41.116)` — energy, action, CTAs
- **Background:** Slate-950 in dark mode, white in light mode

The AI-slop color palette (cyan-on-dark, neon purple gradients) was deliberately avoided in favor of a grounded, editorial feel.

### Layout
- **Bento grid** for the Features section — asymmetric card widths signal intentional hierarchy instead of generic icon+text grids
- **Asymmetric two-column** layout for the Hero on desktop (text left, mockup right)
- A **dot grid background** (radial-gradient with CSS mask) replaces blob backgrounds for a cleaner, more structured aesthetic
- Decorative large-opacity numbers (01/02/03) on feature cards add depth without cluttering the content

### Dark Mode
Dark mode is implemented via the `class` strategy on the `<html>` element:
- Defaults to the user's OS preference (`system`)
- Can be toggled manually and persists across sessions
- All color tokens have explicit dark variants — no accidental color inversions

### Multi-Language (EN/ES)
All user-visible copy lives in a single TypeScript file (`/src/lib/translations.ts`) with a fully typed `T` interface. This means:
- TypeScript will throw a compile error if a translation key is missing in either language
- Switching languages is instant (no page reload)
- The `<html lang="">` attribute is updated dynamically for SEO and screen readers
- Language preference persists in `localStorage` under the key `fp-lang`

### SEO
- `metadata` export in `layout.tsx` sets title, description, and Open Graph tags
- `themeColor` is set to the primary teal for mobile browser chrome
- `viewportFit: "cover"` supports iPhone notch/dynamic island devices
- Fonts use `display: swap` to prevent invisible text during font load

---

## Implementation Decisions

### Animation Strategy
Framer Motion was used for all animations with two specific patterns:

1. **Scroll-triggered fade-ins** — `whileInView` with `once: true` so elements animate in once as the user scrolls. All variants are defined in `useAnimationVariants.ts` and reused across components (no one-off inline animations).

2. **Zero re-render counters** — The `AnimatedCounter` component uses `useMotionValue` + `useTransform` instead of `useState`. This means the number increments without triggering React re-renders, keeping performance high for multiple simultaneous counters.

`prefers-reduced-motion` is respected: animations are reduced to near-zero duration for users who have enabled that OS accessibility setting.

### State Management
React Context was chosen over Zustand or Redux for two reasons:
- The state surface is small (theme + language)
- No complex derived state or cross-component actions are needed

This keeps the bundle lean and avoids adding a state management dependency for something Context handles well.

### Component Architecture
- `page.tsx` is a Server Component — it only composes section components in order
- `"use client"` is used only where strictly necessary (interactive components: Nav, ThemeToggle, LanguageToggle, AnimatedCounter, FinalCTA)
- Scroll detection runs with `passive: true` to avoid blocking the main thread
- Mobile menu locks `document.body` overflow to prevent scroll-behind behavior

### Accessibility
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Single `<h1>` in the Hero; heading hierarchy maintained across all sections
- `aria-label` on all icon-only interactive elements
- `aria-pressed` on toggle buttons (theme, language)
- Focus-visible rings with teal-500 color
- Touch targets are at minimum 44×44px across all interactive elements

---

## How AI-Assisted Tools Were Used

This project was built using **Claude Code** (Anthropic's AI-assisted CLI) as the primary development tool.

### What Claude helped with

**Design direction**
Claude was used to evaluate color choices, typography pairings, and layout patterns before writing any code. Decisions like using OKLCH colors, choosing the Bento grid for Features, and avoiding the standard "AI look" (cyan/purple gradients) came from guided design discussions.

**Component scaffolding**
Claude generated the initial structure for components like `AnimatedCounter`, `LanguageContext`, and the `useAnimationVariants` hook — complex patterns that would have taken significant time to build from scratch correctly (especially the MotionValue approach for zero re-renders).

**Copy and microcopy**
All headline text, feature descriptions, testimonials, and button labels were written and refined through Claude, then reviewed against the Humanizer pattern list to remove AI-typical phrasing.

**SEO implementation**
The complete `metadata` configuration (Open Graph, viewport, themeColor, font loading strategy) was implemented with Claude's guidance on Next.js App Router best practices.

**Multi-language architecture**
The typed `translations.ts` pattern — where TypeScript enforces completeness across both languages at compile time — was a design suggested and implemented with Claude's assistance.

**Dark mode + hydration safety**
The `mounted` flag pattern in `ThemeToggle` (to prevent server/client hydration mismatch with next-themes) was a Claude recommendation to avoid a known Next.js SSR edge case.

### What was reviewed and corrected
Claude's initial suggestions for animation timing were too aggressive (too fast, too many elements). These were manually adjusted to feel more deliberate. The dot-grid background pattern was a human decision — Claude suggested blobs.

---

## What Would Be Improved With More Time

### 1. Dedicated feature subpages
Each feature (Ideas, Tasks, Decisions) deserves its own page with a full explanation, screenshots, and use cases. A single landing page can only skim the surface — deeper pages would help users understand the product before signing up.

### 2. Build the actual product
The most valuable next step is moving from a landing page to a working application:
- Ideas board: freeform capture with tagging and AI-assisted categorization
- Task view: Kanban or list view with assignees and due dates
- Decisions log: structured records with context, options considered, and outcome
- AI features: summarize a thread of ideas, auto-generate tasks from a meeting note

### 3. Interactive product demo
An embedded, interactive mockup (not just a static screenshot) would let visitors click through the product before signing up. This dramatically increases conversion for SaaS landing pages.

### 4. Richer animations
The current animations are solid but conservative. With more time:
- A scroll-driven timeline showing how FlowPilot fits into a team's day
- A live "chaos → flow" demo: scattered sticky notes that organize themselves on scroll
- Parallax depth on the hero mockup

### 5. Real testimonials and social proof
The current testimonials are placeholder. A proper early-access beta with real users would provide authentic quotes, company logos, and usage statistics that are far more convincing than placeholders.

### 6. Blog / content section
SEO-driven content (e.g., "How high-performing teams make decisions", "The cost of scattered ideas") would bring organic traffic and establish FlowPilot's authority in the productivity space.

### 7. Analytics and A/B testing
The CTA copy, hero headline, and button colors are all candidates for A/B testing. Integrating a lightweight analytics layer (Plausible or PostHog) would enable data-driven iteration on conversion.

### 8. Internalization infrastructure
The current EN/ES implementation is hand-rolled. For a production app with more languages, migrating to a proper i18n library (next-intl or next-i18next) with locale-based routing (`/en`, `/es`) would be the right move.

### 9. Performance audit
The current build is fast, but a Lighthouse audit under real network conditions (3G throttling) would identify opportunities — especially around the Framer Motion bundle size and any unused shadcn components.

### 10. Accessibility audit with real assistive technology
The code follows WCAG AA patterns, but a real screen-reader pass (NVDA or VoiceOver) often surfaces issues that automated checks miss — especially with the animated number counters and the language toggle.
