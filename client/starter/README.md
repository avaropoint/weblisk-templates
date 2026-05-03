# Starter

The default client template — a complete website described entirely as
blueprints. No hand-written HTML, CSS, or JavaScript. Everything is
generated from YAML declarations.

**Targets:** Lighthouse 100 across all audits, WCAG 2.2 AA, SEO/AEO/AIO
optimized, deterministic output from the same blueprints every time.

## Quick Start

```bash
weblisk new my-site
cd my-site
weblisk build
weblisk dev
# → http://localhost:3000 — Lighthouse 100, WCAG AA, full structured data
```

## What's Included

```
blueprints/
  global.yaml           # Identity, brand, policies, weblisk dependency
  code.yaml             # Generation rules, import map, head order, SEO, perf
  theme.yaml            # Design tokens, scales, focus styles, dark mode
  pages/
    home.yaml           # Landing: hero, features, contact — full structured data
    about.yaml          # About: content, team grid — breadcrumbs, Organization schema
  components/
    nav.yaml            # Navigation: skip-to-content, focus trap, variants
    footer.yaml         # Footer: brand, links, contact, copyright
  islands/
    contact-form.yaml   # Contact form: validation, accessibility, data schema
  content/
    features.yaml       # Feature list with icon alt text
    team.yaml           # Team data with avatar/social placeholders
  assets/
    logo.yaml           # Logo variants, favicon gen, PWA manifest
    media.yaml          # Font loading, responsive image rules
assets/
  logo.svg              # Brand logo (32x32 SVG)
```

## How It Works

```
YAML blueprints → LLM generation → HTML/CSS/JS output
(source code)      (compiler)       (build artifact)
```

1. **Edit blueprints** — Describe what you want in YAML
2. **Build** — `weblisk build` sends blueprints to the configured LLM
3. **Preview** — `weblisk dev` serves the generated output
4. **Iterate** — Change a blueprint, rebuild, preview instantly

The `public/` directory (generated output) is in `.gitignore`. Your
source of truth is always `blueprints/`.

## Adding a Page

Create a new file in `blueprints/pages/`:

```yaml
# blueprints/pages/pricing.yaml
type: page
route: /pricing
title: "Pricing"
layout: default

sections:
  - type: content
    heading: "Simple pricing for everyone"
  - type: grid
    source: content/plans.yaml
    columns: 3
```

Then create the content it references:

```yaml
# blueprints/content/plans.yaml
items:
  - name: Starter
    price: Free
    features: [1 project, Community support]
  - name: Pro
    price: $29/mo
    features: [Unlimited projects, Priority support, Analytics]
```

Run `weblisk build` — the page exists.

## Adding Interactivity

Create an island blueprint:

```yaml
# blueprints/islands/newsletter.yaml
type: island
name: newsletter
protocol: none               # client-only (no agent)

fields:
  - name: email
    type: email
    required: true

behavior:
  validate: on-blur
  submit: mailto

ui:
  success: "Thanks! You're subscribed."
  error: "Please enter a valid email."
```

Reference it in a page section:

```yaml
sections:
  - type: island
    blueprint: islands/newsletter
```

## Going Full Stack

To add server-side functionality, see the `server/starter` template:

```bash
weblisk new my-app --template server/starter
```

## Blueprint Reference

This template follows the standards documented in
[weblisk-blueprints](https://github.com/avaropoint/weblisk-blueprints):

| Standard | Governs |
|----------|---------|
| `global.md` | Project identity, brand, policies |
| `code.md` | Code generation conventions |
| `theme.md` | Design tokens, typography, spacing |
| `pages.md` | Routes, layouts, sections, SEO |
| `components.md` | Reusable UI with props, slots, variants |
| `islands.md` | Interactive regions, agent binding |
| `assets.md` | Static files, generated media |
