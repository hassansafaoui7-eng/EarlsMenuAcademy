---
name: design-prompt-framework
description: Applies a structured 5-dimension design prompt framework (Pattern & Layout, Style & Aesthetic, Color & Theme, Typography, Animations & Interactions) when building or designing any UI. Trigger when the user asks to design, build, or style any interface, page, component, dashboard, landing page, or app. Also trigger for "make it look premium", "apply design system", "style this properly", or any UI/UX request.
---

# Design Prompt Framework — 5 Dimensions

When building or designing any UI, always apply all 5 dimensions below. Do not produce generic or placeholder designs. Every output must reflect intentional choices across all dimensions.

---

## DIMENSION 1: Pattern & Layout (The Skeleton)

Choose the layout pattern based on the product type:

| Product Type | Pattern |
|---|---|
| **SaaS (General)** | Hero + Features + Social Proof + CTA. Full-width hero, 3-column features, testimonial carousel, sticky CTA |
| **Micro SaaS** | Minimal & Direct + Live Demo. Centered hero with embedded demo, minimal nav, single CTA |
| **E-commerce (Luxury)** | Feature-Rich Showcase + Immersive Gallery. Full-screen hero slider, grid gallery, product zoom |
| **Fintech/Crypto** | Conversion-Optimized + Trust Signals. Split hero (visual + form), live stats, trust indicators |
| **Analytics Dashboard** | Bento Grid + Actionable Insights. Modular card system, hierarchical info, quick filters |
| **Portfolio/Agency** | Storytelling + Case Studies. Full-screen sections, horizontal scroll galleries, immersive transitions |
| **Service Business** | Hero + Problem + Services + Trust + CTA. Conversion-focused, credibility-forward, clear CTA above fold |

---

## DIMENSION 2: Style & Aesthetic (The Skin)

### Available Styles

**Glassmorphism**
- `backdrop-filter: blur(10px)`, rgba backgrounds, layered cards
- Use for: Modern apps, dashboards, overlays
- Avoid: Low-contrast backgrounds, accessibility-critical text

**Aurora UI**
- Multi-stop gradients, animated hue rotation, glow effects
- Use for: Landing pages, hero sections, creative portfolios

**Linear/Vercel Aesthetic**
- `#0A0A0A` bg, `#1A1A1A` cards, `#333` borders, white text
- Use for: Developer tools, SaaS, technical products

**Bento Grid**
- CSS Grid, varying card sizes, consistent gaps (16–24px)
- Use for: Dashboards, feature showcases, content-heavy pages

**Minimalist Luxury**
- Maximum whitespace, serif typography, subtle gold accents
- Use for: Premium service businesses, high-end brands

**Soft UI / Neumorphism 2.0**
- Soft shadows, subtle gradients, rounded corners (12–16px)
- Use for: Mobile apps, wellness/health

**Additional styles:** Brutalism, Y2K Revival, Claymorphism, Gradient Mesh, Cyberpunk, Organic/Biomorphic

---

## DIMENSION 3: Color & Theme (The Palette)

Apply the **60-30-10 rule**: 60% dominant, 30% secondary, 10% accent.

### Preset Palettes

**Trust & Professionalism** (Finance, Healthcare, Enterprise, Trades)
```css
--primary: #0F172A;    /* Navy */
--cta: #0369A1;        /* Blue */
--background: #F8FAFC; /* Light Grey */
--text: #1E293B;       /* Slate */
--accent: #3B82F6;     /* Bright Blue */
```

**Luxury & Premium** (High-end Products, Premium Services)
```css
--primary: #1C1917;    /* Stone Dark */
--cta: #CA8A04;        /* Gold */
--background: #FAFAF9; /* Cream */
--text: #292524;       /* Warm Black */
--accent: #78716C;     /* Taupe */
```

**Dark Mode Excellence** (SaaS, Developer Tools, Modern Brands)
```css
--background: #0A0A0A; /* True Black */
--surface: #1A1A1A;    /* Card Background */
--border: #333333;     /* Subtle Borders */
--text: #FFFFFF;       /* Pure White */
--text-secondary: #A3A3A3;
--accent: #3B82F6;     /* Blue or #10B981 Green */
```

**Vibrant & Modern** (Tech Startups, Creative Tools)
```css
--primary: #6366F1;    /* Indigo */
--cta: #10B981;        /* Emerald */
--background: #FFFFFF;
--text: #1E293B;
--accent: #F59E0B;     /* Amber */
```

### Color Rules
- ✅ WCAG AA minimum: 4.5:1 for text
- ✅ Semantic tokens: `--color-success`, `--color-error`, `--color-warning`
- ❌ Never more than 3 primary colors
- ❌ No pure `#000` on `#FFF` — too harsh
- ❌ No color-only information conveyance

---

## DIMENSION 4: Typography (The Voice)

### Font Pairings by Brand Personality

**Modern/Tech** (SaaS, Developer Tools)
```
Headings: Inter (Variable)
Body: Roboto or System UI
Mono: JetBrains Mono
Weights: 400 / 600 / 700
```

**Elegant/Luxury** (Fashion, Premium Services)
```
Headings: Playfair Display
Body: Montserrat
Accents: Cormorant Garamond
Weights: 300 / 400 / 700
```

**Friendly/Consumer** (Apps, E-commerce)
```
Headings: Poppins
Body: Open Sans
Weights: 400 / 600 / 800
```

**Brutalist/Bold** (Creative Agencies)
```
Headings: Space Grotesk
Body: IBM Plex Sans or JetBrains Mono
Weights: 400 / 700
```

**Editorial/Content-Heavy** (Blogs, News)
```
Headings: Merriweather
Body: Source Sans Pro
Weights: 300 / 400 / 700 / 900
```

### Typography Rules
- ✅ Body text minimum: 16px
- ✅ Line-height: 1.5–1.7 for body, 1.1–1.3 for headings
- ✅ Max 2 font families per design
- ✅ Max 5 font sizes per view
- ✅ Load via Google Fonts with `display=swap`

---

## DIMENSION 5: Animations & Interactions (The Soul)

### Micro-Interactions

**Buttons**
```css
/* Hover */
transform: scale(1.02) or translateY(-2px);
box-shadow: elevation increase;
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* Glow variant */
box-shadow: 0 0 20px rgba(accent, 0.4);
```

**Cards**
```css
/* Premium Hover */
transform: translateY(-4px);
box-shadow: increased elevation;
transition: all 300ms ease;

/* Optional: 3D tilt — max 2–3deg */
```

**Inputs**
```css
/* Focus ring */
outline: 3px solid rgba(accent, 0.5);
box-shadow: 0 0 0 4px rgba(accent, 0.15);
```

### Scroll Animations

**Staggered Reveal**
```js
// Fade up on scroll
opacity: 0 → 1 + translateY(20px → 0)
duration: 600ms
stagger: 100ms between elements
trigger: 20% in viewport
easing: ease-out
```

**Parallax** — max 20–30px movement. Use `transform` not `position`.

**Reading Progress Bar** — Fixed top, width based on scroll %, accent gradient.

### Page Transitions
```css
/* Route change */
opacity: 0 → 1 (200ms fade)
/* or */
translateX(-100% → 0) (300ms slide)
```

### Loading States
```css
/* Skeleton shimmer */
background: linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%);
animation: shimmer 1.5s infinite ease-in-out;
```

### Advanced Effects

**Border Beam** (Linear/Vercel style)
```css
background: linear-gradient(90deg, transparent, var(--accent), transparent);
animation: beam 2s infinite;
```

**Glassmorphism**
```css
backdrop-filter: blur(10px) saturate(180%);
background: rgba(255, 255, 255, 0.08);
border: 1px solid rgba(255, 255, 255, 0.15);
```

### Animation Performance Rules
- ✅ Only animate `transform` and `opacity` (GPU-accelerated)
- ✅ Use `will-change` for animated elements
- ✅ Debounce scroll events
- ✅ Interaction animations: max 300ms
- ✅ Always include `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Anti-Patterns — Avoid These

### Design
- ❌ Animations blocking user action
- ❌ Transitions >300ms for interactions
- ❌ Light grey (`#CCC`) on white — fails WCAG
- ❌ More than 3 primary colors
- ❌ More than 2 font families
- ❌ Inconsistent spacing — use 8px grid system

### UX
- ❌ Labels inside inputs (accessibility issue)
- ❌ Auto-playing carousels
- ❌ "Click here" links (not descriptive)
- ❌ Color-only information
- ❌ Tap targets smaller than 44x44px
- ❌ Hover-only interactions on mobile
- ❌ Keyboard navigation traps
- ❌ Missing `alt` text on images
- ❌ Lorem Ipsum in any output

### Performance
- ❌ Animating `width`, `height`, or `position` (causes reflow)
- ❌ Unoptimized images — use WebP + lazy loading
- ❌ Layout shifts (target CLS < 0.1)
- ❌ Heavy animations on initial page load
